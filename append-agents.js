const fs = require('fs');
const content = 
## 7. image-size Dependency Versioning (Critical)
- **Rule**: NEVER upgrade the \image-size\ npm package to version \2.x\ in this project. You MUST stick to \^1.1.1\.
- **Reasoning**: In Node.js 24 and the current Electron environment, \image-size@2.x\ combined with \util.promisify\ throws a fatal synchronous \TypeError: The "list" argument must be an instance of SharedArrayBuffer...\ when reading images. This breaks image dimension extraction entirely, causing the wallpaper engine and window resizer to silently fail or skip all media.

## 8. Electron Hardware Acceleration & Video Crashes (Critical)
- **Rule**: To fix video playback crashes in Electron (e.g. mp4 files causing the app to crash on play), you MUST use \pp.commandLine.appendSwitch('disable-accelerated-video-decode');\ instead of \pp.disableHardwareAcceleration();\.
- **Reasoning**: Disabling hardware acceleration globally entirely breaks the \lwaysOnTop\ and \	ransparent\ window capabilities on Windows Desktop Window Manager (DWM). Using the specific video decode switch fixes the Chromium media crash while preserving the necessary GPU compositing for frameless transparent popups to stay on top.
;
fs.appendFileSync('.agents/AGENTS.md', content, 'utf8');
