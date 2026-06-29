---
description: "Use when working on Gooner, Media Popup Tool, Electron popup scheduling, media viewer windows, AI text display, config migration, renderer controls, or preventing product drift."
name: "Gooner Product Knowledge"
---
# Gooner Product Knowledge

## Product Identity
- Gooner is a local Electron desktop app for configurable popup display of user-selected local images and videos.
- The most important behavior is ongoing, configurable media popup creation. Do not treat repeated popups as a bug by default.
- The app must stay user-controlled: users can start, pause, stop, close all windows, and close individual popup windows.
- Avoid changing the app into a normal gallery, playlist player, marketing page, or chat assistant.

## Product Boundaries
- Allowed direction: better scheduling controls, better popup layout, better media scanning, better window sizing, better local control, better AI-generated text display, better preview/apply flows.
- Avoid direction drift: chat history, user/assistant conversation UI, chatbot personas, social features, generic media-library browsing, or permanent background automation.
- Never add hidden execution, autostart, forced fullscreen, unclosable windows, blocked keyboard/system controls, or other behavior that removes user control.
- If the user asks for something ambiguous around persistence, automation, or closing behavior, clarify before changing it.

## Architecture Map
- `src/main/main.js`: main-process entry point, initializes services, wires IPC, and broadcasts state.
- `src/main/scheduler.js`: scheduling engine. It calculates the next delay, creates popup bursts, supports gradual mode, and respects total/video window limits.
- `src/main/window-manager.js`: popup lifecycle manager. It creates viewer windows, tracks open windows, handles media type rules, computes popup size, and closes windows.
- `src/main/config-store.js`: default config, normalization, validation, persistence, and backward-compatible migrations. New persisted settings belong here.
- `src/main/media-library.js`: recursive folder scanning and supported image/video extension detection.
- `src/main/ai-service.js`: DeepSeek text-generation integration. Keep it focused on generating structured text results for the UI.
- `src/renderer/app.js`: main control panel, settings form, media folder management, AI panel behavior, and IPC calls through `window.mediaPopup`.
- `src/preload/preload.js`: safe IPC bridge. Do not bypass it from renderer code.
- `src/viewer/viewer.html`, `src/viewer/viewer.css`, `src/viewer/viewer.js`: media popup viewer window.
- `src/ai-popup/ai-popup.html`, `src/ai-popup/ai-popup.css`, `src/ai-popup/ai-popup.js`: AI text display popup/window.
- `src/shared/i18n.js`: shared localization strings and lookup behavior.

## Scheduling Mental Model
- `intervalHours`, `intervalMinutes`, and `intervalSeconds` define the base time between scheduling ticks.
- `jitterHours`, `jitterMinutes`, and `jitterSeconds` add randomized timing variation.
- `burstCount` controls how many popup windows a tick may create.
- `gradual` means burst size ramps up over time instead of immediately using the full `burstCount`.
- `maxWindows` limits total open popup windows. `maxVideoWindows` limits videos separately; `-1` means unlimited video popups.
- When debugging popup frequency, distinguish between requested scheduling behavior and broken window cleanup.

## AI Feature Direction
- AI should primarily generate and display text: button labels, prompts, captions, descriptions, short messages, text previews, and user-applied overrides.
- The AI area should feel like a text generation and display tool, not a chat app.
- Prefer result cards, preview panes, apply/replace controls, target selectors, and generated text windows over conversation threads or message input loops.
- Do not let AI UI dominate the main purpose of the app. It supports the media popup tool; it is not the product center unless the user explicitly changes direction.

## Configuration Rules
- Add defaults and validation in `src/main/config-store.js`.
- Route persisted user settings through `normalizeConfig()` so old config files migrate safely.
- Keep renderer inputs within declared min, max, and step values when adding numeric controls.
- Preserve existing config compatibility unless the user explicitly accepts a breaking reset.
- Every new setting must complete the full persistence loop in one change: default value, normalization/migration, renderer collection, renderer apply-on-load, save trigger, and runtime consumption.
- If a settings panel relies on autosave, verify at least one changed value survives app restart; add an explicit save control when the persistence state could otherwise be ambiguous.
- Do not ship UI-only controls for popup behavior or appearance unless they are clearly preview-only and labeled as such.

## UI Rules
- Keep the main renderer focused on controlling media folders, scheduling, popup counts, window sizing, shortcuts, and AI text generation/display.
- Preserve fast access to start, pause, stop, and close all.
- For AI display, use clear generated-text surfaces and explicit apply actions.
- Do not introduce visible explanatory marketing sections as the first screen; this is a working desktop tool.
- Settings pages must use compact, grouped controls instead of long single-column forms when the controls are small.
- Live previews should stay visible beside the relevant controls with a sticky preview pane on desktop-sized windows.
- Color settings that support transparency should expose opacity controls near their color swatches.
- Use dense but legible operational layouts: restrained headings, tight spacing, and grouped rows over tall decorative cards.
- When a settings panel accumulates several control groups, those groups should be collapsible so secondary options can stay out of the way without removing access.

## Common Mistakes To Avoid
- Do not fix repeated popup creation by disabling the scheduler unless the task is specifically about stopping or limiting scheduling.
- Do not remove close controls while working on immersive or distraction-focused behavior.
- Do not write renderer code that directly accesses Electron APIs outside the preload bridge.
- Do not hard-code config values in UI code without updating config defaults and normalization.
- Do not rewrite the app into a generic media browser when the request is about popup behavior.
- Do not expand AI work into chat unless the user explicitly asks for chat.
