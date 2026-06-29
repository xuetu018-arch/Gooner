const { exec } = require('child_process');
const fs = require('fs/promises');
const path = require('path');
const { promisify } = require('util');
const { imageSize } = require('image-size');
const { app } = require('electron');

const execAsync = promisify(exec);
const sizeOfAsync = promisify(imageSize);

const psScriptContent = `
using System;
using System.Runtime.InteropServices;
namespace WH {
    public class W {
        [StructLayout(LayoutKind.Sequential)]
        public struct RECT {
            public int Left; public int Top; public int Right; public int Bottom;
        }
        [ComImport]
        [Guid("B92B56A9-8B55-4E14-9A89-0199BBB6F93B")]
        [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
        public interface IDesktopWallpaper {
            void SetWallpaper([MarshalAs(UnmanagedType.LPWStr)] string monitorID, [MarshalAs(UnmanagedType.LPWStr)] string wallpaper);
            [return: MarshalAs(UnmanagedType.LPWStr)]
            string GetWallpaper([MarshalAs(UnmanagedType.LPWStr)] string monitorID);
            [return: MarshalAs(UnmanagedType.LPWStr)]
            string GetMonitorDevicePathAt(uint monitorIndex);
            [return: MarshalAs(UnmanagedType.U4)]
            uint GetMonitorDevicePathCount();
            void GetMonitorRECT([MarshalAs(UnmanagedType.LPWStr)] string monitorID, out RECT displayRect);
        }
        [ComImport]
        [Guid("C2CF3110-460E-4fc1-B9D0-8A1C0C9CC4BD")]
        public class DesktopWallpaperClass { }
        public static string[] List() {
            var w = (IDesktopWallpaper)new DesktopWallpaperClass();
            uint c = w.GetMonitorDevicePathCount();
            string[] result = new string[c];
            for(uint i = 0; i < c; i++) {
                string p = w.GetMonitorDevicePathAt(i);
                RECT r;
                w.GetMonitorRECT(p, out r);
                result[i] = p + "|" + (r.Right - r.Left) + "|" + (r.Bottom - r.Top);
            }
            return result;
        }
        public static void Set(string m, string p) {
            var w = (IDesktopWallpaper)new DesktopWallpaperClass();
            w.SetWallpaper(m, p);
        }
    }
}
`;

class WallpaperService {
  constructor({ getConfig, getMediaLibrary }) {
    this.getConfig = getConfig;
    this.getMediaLibrary = getMediaLibrary;
    this.timer = null;
    this.scriptPath = path.join(app.getPath('userData'), 'wallpaper-helper.ps1');
    this.initialized = false;
  }

  async initScript() {
    if (this.initialized) return;
    try {
      const content = `
Add-Type -TypeDefinition @"
${psScriptContent}
"@
if ($args[0] -eq "list") {
    [WH.W]::List()
} elseif ($args[0] -eq "set") {
    [WH.W]::Set($args[1], $args[2])
}
`;
      await fs.writeFile(this.scriptPath, content, 'utf8');
      this.initialized = true;
    } catch (error) {
      console.error('Failed to write wallpaper helper script:', error);
    }
  }

  async getMonitors() {
    try {
      const { stdout } = await execAsync(`powershell -ExecutionPolicy Bypass -File "${this.scriptPath}" list`, { windowsHide: true });
      const lines = stdout.trim().split('\n').map(l => l.trim()).filter(Boolean);
      return lines.map(line => {
        const [id, w, h] = line.split('|');
        return {
          id,
          width: Math.abs(parseInt(w, 10)),
          height: Math.abs(parseInt(h, 10))
        };
      });
    } catch (e) {
      console.error('Failed to get monitors for wallpaper:', e);
      return [];
    }
  }

  async setWallpaper(monitorId, imagePath) {
    try {
      await execAsync(`powershell -ExecutionPolicy Bypass -File "${this.scriptPath}" set "${monitorId}" "${imagePath}"`, { windowsHide: true });
    } catch (e) {
      console.error('Failed to set wallpaper:', e);
    }
  }

  async tick(force = false) {
    console.log('[WallpaperService] Tick triggered', { force });
    const config = this.getConfig();
    if (!config.wallpaper || (!config.wallpaper.enabled && !force)) {
      console.log('[WallpaperService] Wallpaper disabled or missing config, skipping.');
      return '未开启自动更换壁纸';
    }

    const mediaLibrary = this.getMediaLibrary();
    if (mediaLibrary.length === 0) {
      return '媒体库为空！请先去设置里添加包含图片的文件夹并保存/扫描。';
    }

    const images = mediaLibrary.filter(m => m.type === 'image');
    if (images.length === 0) {
      console.log('[WallpaperService] No images found in media library, skipping.');
      return `媒体库中有 ${mediaLibrary.length} 个媒体，但全都是视频，没有找到图片！(由于性能考虑，目前壁纸只能是图片)`;
    }

    await this.initScript();
    const monitors = await this.getMonitors();
    if (monitors.length === 0) {
      console.log('[WallpaperService] No monitors detected, skipping.');
      return '未检测到任何显示器';
    }

    let changedCount = 0;
    let errors = [];
    for (const monitor of monitors) {
      let bestImage = null;
      let lastRejection = '未知原因';

      for (let i = 0; i < 50; i++) {
        const candidate = images[Math.floor(Math.random() * images.length)];
        try {
          const dimensions = await sizeOfAsync(candidate.path);
          if (!dimensions || !dimensions.width || !dimensions.height) {
            lastRejection = `无法读取图片尺寸: ${candidate.path}`;
            continue;
          }
          
          const ratio = dimensions.width / dimensions.height;
          const targetRatio = monitor.width / monitor.height;
          
          if (isNaN(targetRatio)) {
            lastRejection = `显示器分辨率读取错误(长宽为0或非数字): 宽=${monitor.width}, 高=${monitor.height}`;
            continue;
          }

          const ratioDeviation = Math.abs(ratio - targetRatio) / targetRatio;
          if (ratioDeviation > config.wallpaper.maxRatioDeviation) {
            lastRejection = `长宽比偏差 ${ratioDeviation.toFixed(2)} 大于允许的最大偏差 ${config.wallpaper.maxRatioDeviation}`;
            continue;
          }

          const shortEdge = Math.min(dimensions.width, dimensions.height);
          const minRes = config.wallpaper.minResolution > 0 
            ? config.wallpaper.minResolution 
            : Math.min(monitor.width, monitor.height) * 0.9;
          
          if (shortEdge < minRes) {
            lastRejection = `分辨率过低: 短边 ${shortEdge} 小于 最低限制 ${minRes}`;
            continue;
          }

          bestImage = candidate.path;
          break;
        } catch (e) {
          console.error(`[WallpaperService] Failed to read image size for ${candidate.path}:`, e.message);
          lastRejection = `图片文件损坏或无法读取: ${e.message}`;
          continue;
        }
      }
      
      if (bestImage) {
        console.log(`[WallpaperService] Setting wallpaper for monitor ${monitor.id} to ${bestImage}`);
        await this.setWallpaper(monitor.id, bestImage);
        changedCount++;
      } else {
        console.log(`[WallpaperService] No suitable image found for monitor ${monitor.id}`);
        errors.push(`显示器 ${monitor.id} (${monitor.width}x${monitor.height}) 未找到合适图片，最后一个被拒绝的图片原因：${lastRejection}`);
      }
    }
    
    if (changedCount > 0) {
      return `成功为 ${changedCount} 个显示器更换了壁纸！` + (errors.length > 0 ? ` (${errors.join(', ')})` : '');
    } else {
      return `未更换任何壁纸：${errors.join(', ')}`;
    }
  }

  scheduleNextTick() {
    clearTimeout(this.timer);
    const config = this.getConfig();
    if (!config.wallpaper || !config.wallpaper.enabled) {
      return;
    }
    const ms = Math.max(1, config.wallpaper.intervalMinutes) * 60 * 1000;
    this.timer = setTimeout(() => {
      this.tick().finally(() => this.scheduleNextTick());
    }, ms);
  }

  start() {
    this.scheduleNextTick();
  }

  stop() {
    clearTimeout(this.timer);
    this.timer = null;
  }
  
  onConfigChange(oldConfig, newConfig) {
    if (newConfig.wallpaper.enabled && !oldConfig.wallpaper.enabled) {
      // instantly change wallpaper when enabled
      this.tick().finally(() => this.scheduleNextTick());
    } else if (!newConfig.wallpaper.enabled) {
      this.stop();
    } else {
      // always reschedule to reflect interval changes
      this.scheduleNextTick();
    }
  }
}

module.exports = {
  WallpaperService
};
