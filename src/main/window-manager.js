const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { translate } = require('../shared/i18n');
const { clampNumber, normalizeSingleLineText, normalizeText } = require('./config-store');
const statsStore = require('./stats-store');

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSizeOffset(jitter, mode) {
  if (jitter <= 0) {
    return 0;
  }

  if (mode === 'larger') {
    return randomInt(0, jitter);
  }

  if (mode === 'smaller') {
    return randomInt(-jitter, 0);
  }

  return randomInt(-jitter, jitter);
}

function getSizeConfigForMedia(media, config) {
  if (media?.type === 'video') {
    return {
      baseWidth: config.videoBaseWidth,
      baseHeight: config.videoBaseHeight,
      sizeJitter: config.videoSizeJitter,
      sizeJitterMode: config.videoSizeJitterMode
    };
  }

  return {
    baseWidth: config.imageBaseWidth,
    baseHeight: config.imageBaseHeight,
    sizeJitter: config.imageSizeJitter,
    sizeJitterMode: config.imageSizeJitterMode
  };
}

function getPopupLifetimeMs(config = {}) {
  const hours = Number(config.popupLifetimeHours) || 0;
  const minutes = Number(config.popupLifetimeMinutes) || 0;
  const seconds = Number(config.popupLifetimeSeconds) || 0;
  const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

  if (totalSeconds <= 0) return 0;

  const jitterHours = Number(config.popupLifetimeJitterHours) || 0;
  const jitterMinutes = Number(config.popupLifetimeJitterMinutes) || 0;
  const jitterSeconds = Number(config.popupLifetimeJitterSeconds) || 0;
  const totalJitter = (jitterHours * 3600) + (jitterMinutes * 60) + jitterSeconds;

  let offset = 0;
  if (totalJitter > 0) {
    const mode = config.popupLifetimeJitterMode || 'both';
    if (mode === 'smaller') {
      offset = -randomInt(0, totalJitter);
    } else if (mode === 'larger') {
      offset = randomInt(0, totalJitter);
    } else {
      offset = randomInt(-totalJitter, totalJitter);
    }
  }

  return Math.max(1, totalSeconds + offset) * 1000;
}

function bindAutoClose(popup, config) {
  const lifetimeMs = getPopupLifetimeMs(config);
  if (lifetimeMs <= 0) {
    return;
  }

  const fadeDurationMs = 1400;
  const stepMs = 40;
  const fadeStartMs = Math.max(0, lifetimeMs - fadeDurationMs);
  const totalFadeSteps = Math.max(1, Math.ceil((lifetimeMs - fadeStartMs) / stepMs));
  let fadeTimer = null;

  const closeTimer = setTimeout(() => {
    if (!popup.isDestroyed()) {
      statsStore.incrementClose(app, 'auto');
      popup.close();
    }
  }, lifetimeMs);

  const startFade = () => {
    if (popup.isDestroyed() || fadeTimer) {
      return;
    }

    let step = 0;
    fadeTimer = setInterval(() => {
      if (popup.isDestroyed()) {
        clearInterval(fadeTimer);
        fadeTimer = null;
        return;
      }

      step += 1;
      const progress = Math.min(1, step / totalFadeSteps);
      const targetOpacity = Math.max(0, 1 - progress);
      popup.setOpacity(targetOpacity);
      if (popup.webContents && !popup.webContents.isDestroyed()) {
        popup.webContents.send('viewer:setOpacity', targetOpacity);
      }

      if (progress >= 1) {
        clearInterval(fadeTimer);
        fadeTimer = null;
      }
    }, stepMs);
  };

  const fadeStartTimer = setTimeout(startFade, fadeStartMs);

  popup.once('closed', () => {
    clearTimeout(closeTimer);
    clearTimeout(fadeStartTimer);
    if (fadeTimer) {
      clearInterval(fadeTimer);
    }
  });
}

function normalizeDisplayIds(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value
    .map((item) => Math.round(Number(item)))
    .filter((item) => Number.isFinite(item)))];
}

function getPopupDisplays(screen, config) {
  const displays = screen.getAllDisplays();
  const selectedIds = normalizeDisplayIds(config?.popupDisplayIds);

  if (!selectedIds.length) {
    return displays;
  }

  const selectedDisplays = displays.filter((display) => selectedIds.includes(display.id));
  return selectedDisplays.length ? selectedDisplays : displays;
}

function pickPopupDisplay(screen, config) {
  const displays = getPopupDisplays(screen, config);
  if (!displays.length) {
    return screen.getPrimaryDisplay();
  }

  return displays[randomInt(0, displays.length - 1)] || screen.getPrimaryDisplay();
}

function getAiPopupBounds(screen, appearance = {}, config = {}, display = null) {
  const targetDisplay = display || screen.getPrimaryDisplay();
  const area = targetDisplay.workArea;
  const width = Math.round(clampNumber(appearance.popupWidth, 320, area.width, clampNumber(config.aiPopupWidth, 320, area.width, 420)));
  const height = Math.round(clampNumber(appearance.popupHeight, 96, area.height, clampNumber(config.aiPopupHeight, 96, area.height, 320)));

  // Allow up to 25% overflow beyond screen edges for a more random feel
  const overflowX = Math.floor(width * 0.25);
  const overflowY = Math.floor(height * 0.25);

  return {
    width,
    height,
    x: randomInt(area.x - overflowX, Math.max(area.x - overflowX, area.x + area.width - width + overflowX)),
    y: randomInt(area.y - overflowY, Math.max(area.y - overflowY, area.y + area.height - height + overflowY))
  };
}

function showPopupWithoutStealingFocus(popup) {
  if (!popup || popup.isDestroyed()) {
    return;
  }

  popup.showInactive();
}

class WindowManager {
  constructor({ screen, baseDir, getActiveLanguage, getAiLocale, sendState }) {
    this.screen = screen;
    this.baseDir = baseDir;
    this.getActiveLanguage = getActiveLanguage;
    this.getAiLocale = getAiLocale;
    this.sendState = sendState;
    this.popupWindows = new Set();
    this.popupMediaTypes = new Map();
    this.viewerPayloads = new Map();
    this.aiTextWindows = new Set();
    this.aiTextPayloads = new Map();
    this.nextViewerId = 1;
    this.nextAiTextId = 1;
  }

  get popupCount() {
    return this.popupWindows.size + this.aiTextWindows.size;
  }

  getOpenVideoPopupCount() {
    let count = 0;
    for (const mediaType of this.popupMediaTypes.values()) {
      if (mediaType === 'video') {
        count += 1;
      }
    }
    return count;
  }

  getViewerPayload(viewerId) {
    return this.viewerPayloads.get(String(viewerId)) || null;
  }

  getAiTextPayload(popupId) {
    return this.aiTextPayloads.get(String(popupId)) || null;
  }

  closeAiTextPopups() {
    for (const popup of [...this.aiTextWindows]) {
      if (!popup.isDestroyed()) {
        popup.close();
      }
    }
  }

  canCreatePopup(config) {
    return config?.maxWindows === 'unlimited' || this.popupCount < config.maxWindows;
  }

  createViewerPopup(media, config) {
    if (!media || !this.canCreatePopup(config)) {
      return false;
    }

    if (media.type === 'video' && config.maxVideoWindows !== -1 && this.getOpenVideoPopupCount() >= config.maxVideoWindows) {
      return false;
    }

    const display = pickPopupDisplay(this.screen, config);
    const area = display.workArea;
    const sizeConfig = getSizeConfigForMedia(media, config);
    const widthOffset = getSizeOffset(sizeConfig.sizeJitter, sizeConfig.sizeJitterMode);
    const heightOffset = getSizeOffset(sizeConfig.sizeJitter, sizeConfig.sizeJitterMode);
    const width = config.fullscreen
      ? area.width
      : Math.round(clampNumber(sizeConfig.baseWidth + widthOffset, 160, area.width, Math.min(sizeConfig.baseWidth, area.width)));
    const height = config.fullscreen
      ? area.height
      : Math.round(clampNumber(sizeConfig.baseHeight + heightOffset, 120, area.height, Math.min(sizeConfig.baseHeight, area.height)));
    // Allow up to 25% overflow beyond screen edges for a more random feel
    const overflowX = Math.floor(width * 0.25);
    const overflowY = Math.floor(height * 0.25);
    const x = config.fullscreen ? area.x : randomInt(area.x - overflowX, Math.max(area.x - overflowX, area.x + area.width - width + overflowX));
    const y = config.fullscreen ? area.y : randomInt(area.y - overflowY, Math.max(area.y - overflowY, area.y + area.height - height + overflowY));
    const viewerId = String(this.nextViewerId++);

    this.viewerPayloads.set(viewerId, {
      ...media,
      language: this.getActiveLanguage(),
      muted: config.muted,
      closeVideoOnEnded: config.closeVideoOnEnded,
      chaosVideo: config.chaosVideo,
      clickToClose: config.clickToClose,
      randomCloseButton: config.randomCloseButton,
      disableManualClose: config.disableManualClose && getPopupLifetimeMs(config) > 0,
      developerMode: config.developerMode,
      closeButtonText: config.closeButtonText || '',
      closeButtonFontSize: config.closeButtonFontSize,
      closeButtonBorderRadius: config.closeButtonBorderRadius,
      closeButtonPaddingX: config.closeButtonPaddingX,
      closeButtonPaddingY: config.closeButtonPaddingY,
      closeButtonOffsetX: config.closeButtonOffsetX,
      closeButtonOffsetY: config.closeButtonOffsetY,
      closeButtonBackgroundColor: config.closeButtonBackgroundColor,
      closeButtonTextColor: config.closeButtonTextColor,
      closeButtonBorderColor: config.closeButtonBorderColor,
      closeButtonHoverBackgroundColor: config.closeButtonHoverBackgroundColor,
      closeButtonHoverTextColor: config.closeButtonHoverTextColor
    });

    const popup = new BrowserWindow({
      width,
      height,
      x,
      y,
      title: media.name,
      show: false,
      frame: false,
      resizable: true,
      minimizable: true,
      maximizable: true,
      closable: true,
      alwaysOnTop: config.alwaysOnTop,
      fullscreen: config.fullscreen,
      skipTaskbar: true,
      transparent: true,
      backgroundColor: '#00000000',
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(this.baseDir, '..', 'preload', 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false
      }
    });

    popup.setMenuBarVisibility(false);
    if (config.alwaysOnTop) {
      popup.setAlwaysOnTop(true, 'screen-saver');
    }

    this.popupWindows.add(popup);
    this.popupMediaTypes.set(popup, media.type);
    if (media.type !== 'video' || config.chaosVideo) {
      bindAutoClose(popup, config);
    }
    popup.on('closed', () => {
      this.popupWindows.delete(popup);
      this.popupMediaTypes.delete(popup);
      this.viewerPayloads.delete(viewerId);
      this.sendState();
    });
    popup.once('ready-to-show', () => showPopupWithoutStealingFocus(popup));
    popup.loadFile(path.join(this.baseDir, '..', 'viewer', 'viewer.html'), { query: { id: viewerId } });
    statsStore.incrementPopup(app, media.type);
    this.sendState();
    return true;
  }

  createAiTextPopup(payload = {}, config = null, options = {}) {
    const text = normalizeText(payload.text, 4000);
    if (!text) {
      return { ok: false, errorKey: 'ai.error.emptyResponse' };
    }

    if (config?.ai?.singlePopupMode) {
      this.closeAiTextPopups();
    }

    if (config && !options.ignoreLimits && !this.canCreatePopup(config)) {
      return { ok: false, errorKey: 'ai.error.maxWindowsReached' };
    }

    const popupId = String(this.nextAiTextId++);
    const locale = this.getAiLocale(payload.locale);
    const popupPayload = {
      id: popupId,
      text,
      locale,
      title: normalizeSingleLineText(payload.title, 80) || translate(locale, 'ai.popup.title'),
      targetKey: typeof payload.targetKey === 'string' ? payload.targetKey.trim() : '',
      targetLabel: normalizeSingleLineText(payload.targetLabel, 80),
      appearance: { ...(config?.ai?.popupAppearance || {}) }
    };

    this.aiTextPayloads.set(popupId, popupPayload);
    const display = pickPopupDisplay(this.screen, config);
    const bounds = getAiPopupBounds(this.screen, popupPayload.appearance, config || {}, display);

    const popup = new BrowserWindow({
      ...bounds,
      minWidth: 320,
      minHeight: 96,
      title: popupPayload.title,
      show: false,
      frame: false,
      resizable: true,
      minimizable: true,
      maximizable: false,
      closable: true,
      alwaysOnTop: Boolean(config?.alwaysOnTop),
      transparent: true,
      skipTaskbar: true,
      backgroundColor: '#00000000',
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(this.baseDir, '..', 'preload', 'preload.js'),
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: false
      }
    });

    popup.setMenuBarVisibility(false);
    if (config?.alwaysOnTop) {
      popup.setAlwaysOnTop(true, 'screen-saver');
    }
    this.aiTextWindows.add(popup);
    bindAutoClose(popup, config);
    popup.on('closed', () => {
      this.aiTextWindows.delete(popup);
      this.aiTextPayloads.delete(popupId);
      this.sendState();
    });
    popup.once('ready-to-show', () => showPopupWithoutStealingFocus(popup));
    popup.loadFile(path.join(this.baseDir, '..', 'ai-popup', 'ai-popup.html'), { query: { id: popupId } });

    statsStore.incrementPopup(app, 'ai');
    this.sendState();

    return { ok: true, popupId };
  }

  async createWebsitePopup(entry, config = null, options = {}) {
    if (!entry) {
      return false;
    }

    if (config && !options.ignoreLimits && !this.canCreatePopup(config)) {
      return false;
    }

    try {
      await shell.openExternal(entry.url);
      statsStore.incrementPopup(app, 'website');
      return true;
    } catch (_error) {
      return false;
    }
  }

  closeAllPopups() {
    for (const popup of [...this.popupWindows]) {
      if (!popup.isDestroyed()) {
        popup.close();
      }
    }

    this.closeAiTextPopups();

    this.popupWindows.clear();
    this.popupMediaTypes.clear();
    this.viewerPayloads.clear();
    this.aiTextWindows.clear();
    this.aiTextPayloads.clear();
    this.sendState();
  }
}

module.exports = {
  WindowManager
};
