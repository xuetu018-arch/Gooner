# Project Guidelines

## Product Direction
- This project is a local, user-controlled Electron media popup tool for Windows.
- The core experience is configurable, ongoing popup display of local images and videos selected by the user.
- Treat continuous popup scheduling as intended behavior unless the user explicitly asks to stop, limit, or redesign it.
- Do not turn the app into a normal gallery, media player, landing page, or chat assistant.
- AI features should focus on generated text display, label/prompt generation, previews, and applying text results. Do not make chat conversation the center of the product unless the user explicitly requests it.

## User Control And Safety
- Keep the app visibly user-controlled: preserve pause, stop, close all, and individual close paths.
- Do not add autostart, hidden background operation, forced fullscreen, blocked closing, system-control blocking, or other coercive behavior.
- If a requested feature would weaken user control, ask for confirmation before implementing.

## Architecture
- `src/main/scheduler.js` owns popup timing, jitter, burst creation, gradual mode, and window-count limits.
- `src/main/window-manager.js` owns popup window lifecycle, media-type handling, size calculation, and viewer windows.
- `src/main/config-store.js` owns defaults, validation, normalization, and config migrations. Route new persisted settings through `normalizeConfig()`.
- `src/main/media-library.js` owns local media scanning and supported file extensions.
- `src/renderer/app.js` owns the main control-panel UI and IPC calls through `window.mediaPopup`.
- `src/viewer/*` owns media popup rendering.
- `src/ai-popup/*` owns AI text display UI.
- `src/main/ai-service.js` owns DeepSeek-backed text generation.

## Development
- Use existing Electron IPC patterns instead of bypassing `src/preload/preload.js`.
- Keep changes focused and consistent with the current plain JavaScript, HTML, and CSS style.
- Validate app startup with `npm run dev` after behavioral code changes when practical.
- Build Windows packages with `npm run dist`.

## Persisted Settings Rules
- Any new user-facing setting must be fully persistent in the same change: add a default value, normalize and migrate it in `src/main/config-store.js`, collect it from the renderer form, apply it back into the form on load, and pass it to the owning runtime surface.
- Do not rely on UI-only state for settings that affect popup behavior or appearance.
- New setting panels should include either explicit save affordance or confirmed autosave behavior; if autosave is used, verify the value survives app restart.
- Before finishing a settings change, test at least one non-default value through save, reload/startup, and runtime use.

## UI Design Standards
- Settings pages should be compact working surfaces, not long single-column forms.
- Pair related inputs in grids and use horizontal label/control rows when it reduces wasted space.
- Keep live previews visible beside their controls with a sticky preview pane when space allows.
- For color controls, pair color swatches with opacity controls when transparency is supported.
- Avoid placing one small control per full-width row unless the value needs a large text area.
- For dense tool panels, prefer restrained headings, tight spacing, and grouped sections over tall cards.
- When a settings surface grows into multiple control groups, make those groups collapsible so secondary sections do not permanently consume vertical space.
