const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
async function run() {
  const { stdout, stderr } = await execAsync('powershell -ExecutionPolicy Bypass -Command "Add-Type -TypeDefinition \"using System; using System.Runtime.InteropServices; namespace WH { public class W { [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left; public int Top; public int Right; public int Bottom; } [ComImport] [Guid(\\"B92B56A9-8B55-4E14-9A89-0199BBB6F93B\\")] [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] public interface IDesktopWallpaper { void SetWallpaper([MarshalAs(UnmanagedType.LPWStr)] string monitorID, [MarshalAs(UnmanagedType.LPWStr)] string wallpaper); [return: MarshalAs(UnmanagedType.LPWStr)] string GetWallpaper([MarshalAs(UnmanagedType.LPWStr)] string monitorID); [return: MarshalAs(UnmanagedType.LPWStr)] string GetMonitorDevicePathAt(uint monitorIndex); [return: MarshalAs(UnmanagedType.U4)] uint GetMonitorDevicePathCount(); void GetMonitorRECT([MarshalAs(UnmanagedType.LPWStr)] string monitorID, out RECT displayRect); } [ComImport] [Guid(\\"C2CF3110-460E-4fc1-B9D0-8A1C0C9CC4BD\\")] public class DesktopWallpaperClass { } public static void List() { var w = (IDesktopWallpaper)new DesktopWallpaperClass(); uint c = w.GetMonitorDevicePathCount(); for(uint i = 0; i < c; i++) { string p = w.GetMonitorDevicePathAt(i); RECT r; w.GetMonitorRECT(p, out r); Console.WriteLine(p + \\"|\\" + (r.Right - r.Left) + \\"|\\" + (r.Bottom - r.Top)); } } } }\"; [WH.W]::List()"');
  console.log('STDOUT', stdout);
  console.log('STDERR', stderr);
}
run().catch(console.error);
