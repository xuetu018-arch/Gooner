# Gooner Project Agent Rules

This file documents historical mistakes and learned rules specific to the Gooner project to prevent regressions and improve agentic reliability.

## 1. Electron Window `alwaysOnTop` (Critical)
- **Rule**: When configuring an Electron `BrowserWindow` to be strictly always-on-top on Windows, setting `alwaysOnTop: true` in the constructor is NOT enough. You MUST also explicitly call `window.setAlwaysOnTop(true, 'screen-saver')` after window creation.
- **Reasoning**: This prevents full-screen applications or other aggressive top-level windows from obscuring the media popups. This fix has been repeatedly overwritten by careless file replacements. DO NOT overwrite it.

## 2. Safe Code Replacements (Critical)
- **Rule**: When using code replacement tools (e.g. `replace_file_content`), thoroughly check the surrounding context. 
  - Ensure closing brackets (`}`) or parenthesis are not swallowed.
  - Pay attention to custom bug fixes implemented in previous turns (like the `alwaysOnTop` fix) and NEVER silently revert them when refactoring a function.
- **Reasoning**: Careless block replacements previously caused syntax errors (`Unexpected token ')'`) that completely froze the frontend UI, and also lost the `screen-saver` level fix.

## 3. Avoid Powershell String Manipulation for File Edits
- **Rule**: Do NOT use Powershell array slicing or `Get-Content`/`Set-Content` to remove lines or fix syntax errors in source files.
- **Reasoning**: Powershell string manipulation scripts frequently cause encoding issues (e.g., corrupting UTF-8 characters into mojibake), which previously resulted in corrupted strings in `main.js` and caused a fatal crash. Always use the built-in `replace_file_content` or `multi_replace_file_content` tools instead.

## 4. Career UI & Stats System Architecture
- **Rule**: Progression metrics (stamps, progress bars, grand slams) must always be calculated using **Play Time** (`playTimeSeconds`), not Uptime or Session Counts.
- **Rule**: The daily progress bar logic is progressive (aiming for the next immediate tier instead of the absolute maximum). Current established tiers: Bronze (>0s), Silver (1h), Gold (4h), Ultimate (24h).
- **Rule**: Translations and variable text options (like randomized stamp texts) are stored as pipe-delimited strings (`|`) in `src/shared/i18n.js` and split dynamically in JS.
- **Reasoning**: Maintains consistency with the established "Gooner" gamification loop and localized translation system.

## 5. Exaggerated UI / Aesthetic Preferences
- **Rule**: The user highly prefers **extreme, dramatic, and massive UI elements** for achievements and progression. When implementing visual rewards (stamps, badges, celebrations), exaggerate the sizes (e.g., 100px+ fonts), use heavy shadows, dynamic gradients (e.g., red-black-green neon), and glassmorphism.
- **Rule**: Use visual fading (`opacity`) to heavily dim non-important background elements (like dates or grids) when a major achievement is stamped over them. 
- **Reasoning**: The user explicitly requested "Bigger! Even bigger!" multiple times, demonstrating a strong preference for high visual impact over subtle minimalism.

## 6. Theming and Hardcoded Colors
- **Rule**: When adding or updating themes (e.g., `data-theme="light"`), you CANNOT rely solely on overriding global CSS variables (`--bg-0`, `--text`, etc.). You MUST proactively search for hardcoded `rgba()` or hexadecimal colors in the existing CSS (such as `.panel`, `.folder-row`, `.symbol-toggle`, `.switch-row`, `.bottom-controls`) and explicitly override them for the new theme selector.
- **Rule**: Always test UI elements with complex states (`:hover`, `:has(input:checked)`, `.active`) and pseudo-elements (`::before`, `::after`, `::-webkit-slider-thumb`) to ensure contrast and legibility, as these heavily use hardcoded gradient values in this project.
- **Rule**: Be cautious when using global resets for `input` elements in a theme (e.g., `[data-theme="light"] input { background: #fff; }`) because it will unexpectedly overwrite native components that use `appearance: none` like `input[type="range"]`. Always exclude special input types (`:not([type="range"]):not([type="checkbox"]):not([type="color"])`).
- **Reasoning**: Hardcoded colors in complex gradient backgrounds or specific UI components have repeatedly caused "invisible" or illegible elements when standard CSS variables were toggled for a light theme.

## 7. image-size Dependency Versioning (Critical)
- **Rule**: NEVER upgrade the `image-size` npm package to version `2.x` in this project. You MUST stick to `^1.1.1`.
- **Reasoning**: In Node.js 24 and the current Electron environment, `image-size@2.x` combined with `util.promisify` throws a fatal synchronous `TypeError: The "list" argument must be an instance of SharedArrayBuffer...` when reading images. This breaks image dimension extraction entirely, causing the wallpaper engine and window resizer to silently fail or skip all media.

## 8. Electron Hardware Acceleration & Video Crashes (Critical)
- **Rule**: To fix video playback crashes in Electron (e.g. mp4 files causing the app to crash on play), you MUST use `app.commandLine.appendSwitch('disable-accelerated-video-decode');` instead of `app.disableHardwareAcceleration();`.
- **Reasoning**: Disabling hardware acceleration globally entirely breaks the `alwaysOnTop` and `transparent` window capabilities on Windows Desktop Window Manager (DWM). Using the specific video decode switch fixes the Chromium media crash while preserving the necessary GPU compositing for frameless transparent popups to stay on top.

## 9. UI Space Utilization & Compactness
- **Rule**: The user prefers high space efficiency for numeric configurations (like times and intervals). Use compact layouts like parallel grid columns (`.field-row`) and digital-clock style inputs (`<input type="number">` styled compactly) instead of large, isolated range sliders when there are many related time inputs.
- **Reasoning**: The configuration interface frequently becomes too tall, requiring excessive scrolling. Compactness groups related fields together logically.

## 10. Randomized Parameter Boundaries (Jitter)
- **Rule**: When adding random variations ("jitter") to important parameters like `popupLifetime`, NEVER hardcode a bi-directional or purely negative offset. Always provide a **Jitter Direction Mode** selector (`-`, `+`, `±`) so the user can prevent edge cases.
- **Reasoning**: Purely negative random offsets previously caused popups to calculate a lifetime of `0` and immediately close, creating a jarring UX.

## 11. Synchronized Audio and Visual Fades
- **Rule**: When implementing fade-out animations for media popups in Electron, modifying the `BrowserWindow`'s opacity does NOT affect its audio volume. You MUST manually send an IPC event (e.g. `webContents.send('viewer:setOpacity', opacity)`) to the renderer to interpolate the `<video>` element's `volume` synchronously with the visual fade.
- **Reasoning**: Prevents the jarring effect of an invisible window still playing full-volume audio ("Chaos Video" fade bug).

## 12. Privacy Masking (Developer/Streamer Mode)
- **Rule**: When hiding sensitive information (like absolute folder paths or API keys), use visual obfuscation (`***\\basename` for paths, `type="password"` for inputs) rather than removing the elements from the DOM.
- **Reasoning**: Keeps the UI structure intact and allows the user to continue interacting with the elements (e.g., removing a specific masked folder, typing a new API key) without exposing the sensitive data.

## 13. Post-Modification Build Verification (Critical)
- **Rule**: After making changes to the project's codebase, you MUST always run the build/packaging command (e.g., `npm run dist` or `npm run dist:cn`) to verify that the application builds successfully and to confirm the correctness of your changes.
- **Reasoning**: Ensures that modifications do not introduce syntax errors or break the Electron builder process, guaranteeing that a stable executable can always be generated.
