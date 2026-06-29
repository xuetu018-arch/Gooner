const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');
const { resolveLanguage } = require('../shared/i18n');

const defaultAiProfileConfig = {
  age: '',
  name: '',
  companionName: '',
  companionRole: '',
  appearance: '',
  dailyPersona: '',
  sceneLibrary: ''
};

const defaultAiPopupAppearanceConfig = {
  popupWidth: 420,
  popupHeight: 320,
  bodyBackgroundColor: '#050505',
  bodyBackgroundOpacity: 1,
  textColor: '#f4f7fb',
  textOpacity: 1,
  textFontSize: 16,
  textLineHeight: 1.5,
  textAlign: 'left',
  cardBackgroundColor: '#050505',
  cardBackgroundOpacity: 1,
  cardBorderColor: '#1f2b33',
  cardBorderOpacity: 1,
  cardBorderWidth: 0,
  cardBorderRadius: 8,
  cardPaddingX: 2,
  cardPaddingY: 0,
  cardShadowColor: '#000000',
  cardShadowOpacity: 0.45,
  cardShadowBlur: 24,
  cardShadowSpread: 0,
  cardShadowOffsetX: 0,
  cardShadowOffsetY: 8,
  textShadowColor: '#000000',
  textShadowOpacity: 0.55,
  textShadowBlur: 10,
  textShadowSpread: 0,
  textShadowOffsetX: 0,
  textShadowOffsetY: 2,
  closeButtonFontSize: 13,
  closeButtonBorderRadius: 6,
  closeButtonPaddingX: 12,
  closeButtonPaddingY: 6,
  closeButtonOffsetX: 6,
  closeButtonOffsetY: 6,
  closeButtonBackgroundColor: '#000000',
  closeButtonBackgroundOpacity: 1,
  closeButtonTextColor: '#ffffff',
  closeButtonTextOpacity: 1,
  closeButtonBorderColor: '#ffffff',
  closeButtonBorderOpacity: 1,
  closeButtonHoverBackgroundColor: '#2f3b45',
  closeButtonHoverBackgroundOpacity: 1,
  closeButtonHoverTextColor: '#ffffff',
  closeButtonHoverTextOpacity: 1
};

const defaultAiConfig = {
  provider: 'deepseek',
  model: 'deepseek-chat',
  apiKey: '',
  systemPrompt: '',
  knowledgeBase: '',
  contextMemory: '',
  oneTimeReplyGuidance: '',
  profile: defaultAiProfileConfig,
  popupScheduleEnabled: false,
  singlePopupMode: true,
  immediateReplyEnabled: true,
  interactionEnabled: false,
  interactionIntervalHours: 0,
  interactionIntervalMinutes: 10,
  interactionIntervalSeconds: 0,
  interactionIncludeForegroundApp: false,
  interactionTone: 'teasing',
  popupAppearance: defaultAiPopupAppearanceConfig
};

const defaultWebsiteLibraryConfig = {
  enabled: false,
  entries: []
};

const defaultProcessRulesConfig = {
  enabled: false,
  blacklist: [],
  whitelist: [],
  autoStartOnWhitelist: false,
  stopOnBlacklist: false,
  stopOnWhitelistExit: false,
  checkIntervalSeconds: 5,
  autoProfiles: []
};

const defaultWallpaperConfig = {
  enabled: false,
  intervalMinutes: 60,
  minResolution: 0,
  maxRatioDeviation: 0.20
};

const defaultConfig = {
  folders: [],
  language: 'system',
  popupDisplayIds: [],
  startShortcut: '',
  pauseShortcut: '',
  stopShortcut: '',
  closeAllShortcut: '',
  recursive: true,
  order: 'random',
  intervalHours: 0,
  intervalMinutes: 0,
  intervalSeconds: 10,
  jitterHours: 0,
  jitterMinutes: 0,
  jitterSeconds: 0,
  popupLifetimeHours: 0,
  popupLifetimeMinutes: 0,
  popupLifetimeSeconds: 0,
  popupLifetimeJitterHours: 0,
  popupLifetimeJitterMinutes: 0,
  popupLifetimeJitterSeconds: 0,
  popupLifetimeJitterMode: 'both',
  burstCount: 1,
  minWindows: 0,
  maxWindows: 8,
  maxVideoWindows: -1,
  gradual: false,
  alwaysOnTop: true,
  fullscreen: false,
  muted: true,
  closeVideoOnEnded: false,
  chaosVideo: false,
  clickToClose: true,
  randomCloseButton: true,
  disableManualClose: false,
  developerMode: false,
  closeButtonText: '',
  closeButtonFontSize: 14,
  closeButtonBorderRadius: 6,
  closeButtonPaddingX: 16,
  closeButtonPaddingY: 8,
  closeButtonOffsetX: 10,
  closeButtonOffsetY: 10,
  closeButtonBackgroundColor: '#000000',
  closeButtonTextColor: '#ffffff',
  closeButtonBorderColor: '#ffffff',
  closeButtonHoverBackgroundColor: '#2f3b45',
  closeButtonHoverTextColor: '#ffffff',
  separateMediaSizeSettings: false,
  imageBaseWidth: 520,
  imageBaseHeight: 390,
  imageSizeJitter: 200,
  imageSizeJitterMode: 'both',
  imageCompensationMultiplier: 1,
  imageCompensationThreshold: 2.0,
  videoBaseWidth: 520,
  videoBaseHeight: 390,
  videoSizeJitter: 200,
  videoSizeJitterMode: 'both',
  videoCompensationMultiplier: 1,
  videoCompensationThreshold: 2.0,
  websiteLibrary: defaultWebsiteLibraryConfig,
  processRules: defaultProcessRulesConfig,
  wallpaper: defaultWallpaperConfig,
  ai: defaultAiConfig,
  windowBounds: {
    width: 980,
    height: 720
  }
};

function cloneDefaultConfig() {
  return {
    ...defaultConfig,
    folders: [...defaultConfig.folders],
    popupDisplayIds: [...defaultConfig.popupDisplayIds],
    websiteLibrary: {
      ...defaultWebsiteLibraryConfig,
      entries: [...defaultWebsiteLibraryConfig.entries]
    },
    processRules: {
      ...defaultProcessRulesConfig,
      blacklist: [...defaultProcessRulesConfig.blacklist],
      whitelist: [...defaultProcessRulesConfig.whitelist],
      autoProfiles: defaultProcessRulesConfig.autoProfiles.map(p => ({
        configPath: p.configPath,
        processes: [...p.processes]
      }))
    },
    wallpaper: { ...defaultWallpaperConfig },
    ai: {
      ...defaultAiConfig,
      profile: { ...defaultAiProfileConfig },
      popupAppearance: { ...defaultAiPopupAppearanceConfig }
    },
    windowBounds: { ...defaultConfig.windowBounds }
  };
}

function getConfigPath(app) {
  return path.join(app.getPath('userData'), 'config.json');
}

function getConfigPathStatePath(app) {
  return path.join(app.getPath('userData'), 'config-path.json');
}

function normalizeConfigPath(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function getLegacyConfigPaths(app) {
  const appDataPath = app.getPath('appData');
  const currentPath = getConfigPath(app);
  const candidates = [
    path.join(appDataPath, 'Gooner', 'config.json'),
    path.join(appDataPath, 'gooner', 'config.json'),
    path.join(appDataPath, 'media-popup-tool', 'config.json')
  ];

  return [...new Set(candidates)].filter((candidatePath) => candidatePath !== currentPath);
}

function getConfigContentScore(config) {
  if (!config || typeof config !== 'object') {
    return 0;
  }

  const ai = config.ai && typeof config.ai === 'object' ? config.ai : {};
  const profile = ai.profile && typeof ai.profile === 'object' ? ai.profile : {};
  const websiteEntries = Array.isArray(config.websiteLibrary?.entries) ? config.websiteLibrary.entries : [];
  let score = 0;

  const folderCount = Array.isArray(config.folders)
    ? config.folders.filter((f) => (typeof f === 'string' ? f : f?.path || '').trim()).length
    : 0;
  if (folderCount > 0) {
    score += 20;
  }
  if (websiteEntries.length > 0) {
    score += 10;
  }
  if (Array.isArray(config.popupDisplayIds) && config.popupDisplayIds.length > 0) {
    score += 4;
  }
  if (config.language && config.language !== defaultConfig.language) {
    score += 2;
  }
  for (const key of ['startShortcut', 'pauseShortcut', 'stopShortcut', 'closeAllShortcut', 'closeButtonText']) {
    if (typeof config[key] === 'string' && config[key].trim()) {
      score += 3;
    }
  }
  for (const key of ['apiKey', 'systemPrompt', 'knowledgeBase', 'contextMemory']) {
    if (typeof ai[key] === 'string' && ai[key].trim()) {
      score += key === 'apiKey' ? 12 : 6;
    }
  }
  for (const value of Object.values(profile)) {
    if (String(value || '').trim()) {
      score += 3;
    }
  }

  const customSchedule = config.intervalSeconds !== undefined && Number(config.intervalSeconds) !== defaultConfig.intervalSeconds;
  if (customSchedule || config.gradual || config.muted === false || config.randomCloseButton === false) {
    score += 3;
  }

  return score;
}

async function readConfigCandidate(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (_error) {
    return null;
  }
}

async function readConfigPathState(app) {
  const state = await readConfigCandidate(getConfigPathStatePath(app));
  if (typeof state === 'string') {
    return normalizeConfigPath(state);
  }

  if (state && typeof state === 'object' && typeof state.configPath === 'string') {
    return normalizeConfigPath(state.configPath);
  }

  return '';
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(max, Math.max(min, number));
}

function getSecondsFromParts(hours, minutes, seconds) {
  return (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
}

function normalizeSizeJitterMode(value, fallback = 'both') {
  return value === 'larger' || value === 'smaller' || value === 'both' ? value : fallback;
}

function normalizeWindowBounds(bounds) {
  const fallback = defaultConfig.windowBounds;
  const normalized = {
    width: Math.round(clampNumber(bounds?.width, 760, 7680, fallback.width)),
    height: Math.round(clampNumber(bounds?.height, 560, 4320, fallback.height))
  };

  if (Number.isFinite(bounds?.x)) {
    normalized.x = Math.round(bounds.x);
  }

  if (Number.isFinite(bounds?.y)) {
    normalized.y = Math.round(bounds.y);
  }

  return normalized;
}

function normalizeDisplayIds(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value
    .map((item) => Math.round(Number(item)))
    .filter((item) => Number.isFinite(item)))];
}

function normalizeLanguageSetting(value, getSystemLanguage) {
  if (value === 'system') {
    return 'system';
  }

  return resolveLanguage(value, getSystemLanguage());
}

function normalizeShortcut(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeCloseButtonText(value) {
  return typeof value === 'string' ? value.trim().slice(0, 24) : '';
}

function normalizeHexColor(value, fallback) {
  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmed = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
    return trimmed.toLowerCase();
  }

  if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  return fallback;
}

function normalizeText(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function normalizeSingleLineText(value, maxLength) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/[\r\n]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizeAiProvider(value) {
  return value === 'deepseek' ? value : defaultAiConfig.provider;
}

function normalizeAiModel(value) {
  return value === 'deepseek-reasoner' ? value : defaultAiConfig.model;
}

function normalizeAiAge(value) {
  if (value === '' || value === null || value === undefined) {
    return '';
  }

  const age = Math.round(Number(value));
  if (!Number.isFinite(age)) {
    return '';
  }

  return Math.min(99, Math.max(18, age));
}

function normalizeAiProfile(input) {
  const next = input && typeof input === 'object' ? input : {};

  return {
    age: normalizeAiAge(next.age),
    name: normalizeSingleLineText(next.name, 48),
    companionName: normalizeSingleLineText(next.companionName, 48),
    companionRole: normalizeSingleLineText(next.companionRole, 48),
    appearance: normalizeText(next.appearance, 240),
    dailyPersona: normalizeText(next.dailyPersona, 240),
    sceneLibrary: normalizeText(next.sceneLibrary, 4000)
  };
}

function normalizeAiTextAlign(value) {
  return value === 'center' || value === 'right' ? value : 'left';
}

function normalizeAiInteractionTone(value) {
  return value === 'gentle' || value === 'direct' || value === 'neutral' ? value : defaultAiConfig.interactionTone;
}

function normalizeAiPopupAppearance(input, root = {}) {
  const next = input && typeof input === 'object' ? input : {};

  return {
    popupWidth: Math.round(clampNumber(next.popupWidth, 320, 2400, clampNumber(root.aiPopupWidth, 320, 2400, defaultAiPopupAppearanceConfig.popupWidth))),
    popupHeight: Math.round(clampNumber(next.popupHeight, 96, 1600, clampNumber(root.aiPopupHeight, 96, 1600, defaultAiPopupAppearanceConfig.popupHeight))),
    bodyBackgroundColor: normalizeHexColor(next.bodyBackgroundColor, defaultAiPopupAppearanceConfig.bodyBackgroundColor),
    bodyBackgroundOpacity: clampNumber(next.bodyBackgroundOpacity, 0, 1, defaultAiPopupAppearanceConfig.bodyBackgroundOpacity),
    textColor: normalizeHexColor(next.textColor, defaultAiPopupAppearanceConfig.textColor),
    textOpacity: clampNumber(next.textOpacity, 0, 1, defaultAiPopupAppearanceConfig.textOpacity),
    textFontSize: Math.round(clampNumber(next.textFontSize, 12, 42, defaultAiPopupAppearanceConfig.textFontSize)),
    textLineHeight: clampNumber(next.textLineHeight, 1.1, 2.4, defaultAiPopupAppearanceConfig.textLineHeight),
    textAlign: normalizeAiTextAlign(next.textAlign),
    cardBackgroundColor: normalizeHexColor(next.cardBackgroundColor, defaultAiPopupAppearanceConfig.cardBackgroundColor),
    cardBackgroundOpacity: clampNumber(next.cardBackgroundOpacity, 0, 1, defaultAiPopupAppearanceConfig.cardBackgroundOpacity),
    cardBorderColor: normalizeHexColor(next.cardBorderColor, defaultAiPopupAppearanceConfig.cardBorderColor),
    cardBorderOpacity: clampNumber(next.cardBorderOpacity, 0, 1, defaultAiPopupAppearanceConfig.cardBorderOpacity),
    cardBorderWidth: Math.round(clampNumber(next.cardBorderWidth, 0, 4, defaultAiPopupAppearanceConfig.cardBorderWidth)),
    cardBorderRadius: Math.round(clampNumber(next.cardBorderRadius, 0, 24, defaultAiPopupAppearanceConfig.cardBorderRadius)),
    cardPaddingX: Math.round(clampNumber(next.cardPaddingX, 0, 40, defaultAiPopupAppearanceConfig.cardPaddingX)),
    cardPaddingY: Math.round(clampNumber(next.cardPaddingY, 0, 32, defaultAiPopupAppearanceConfig.cardPaddingY)),
    cardShadowColor: normalizeHexColor(next.cardShadowColor, defaultAiPopupAppearanceConfig.cardShadowColor),
    cardShadowOpacity: clampNumber(next.cardShadowOpacity, 0, 1, defaultAiPopupAppearanceConfig.cardShadowOpacity),
    cardShadowBlur: Math.round(clampNumber(next.cardShadowBlur, 0, 80, defaultAiPopupAppearanceConfig.cardShadowBlur)),
    cardShadowSpread: Math.round(clampNumber(next.cardShadowSpread, -40, 40, defaultAiPopupAppearanceConfig.cardShadowSpread)),
    cardShadowOffsetX: Math.round(clampNumber(next.cardShadowOffsetX, -40, 40, defaultAiPopupAppearanceConfig.cardShadowOffsetX)),
    cardShadowOffsetY: Math.round(clampNumber(next.cardShadowOffsetY, -40, 40, defaultAiPopupAppearanceConfig.cardShadowOffsetY)),
    textShadowColor: normalizeHexColor(next.textShadowColor, defaultAiPopupAppearanceConfig.textShadowColor),
    textShadowOpacity: clampNumber(next.textShadowOpacity, 0, 1, defaultAiPopupAppearanceConfig.textShadowOpacity),
    textShadowBlur: Math.round(clampNumber(next.textShadowBlur, 0, 80, defaultAiPopupAppearanceConfig.textShadowBlur)),
    textShadowSpread: Math.round(clampNumber(next.textShadowSpread, -40, 40, defaultAiPopupAppearanceConfig.textShadowSpread)),
    textShadowOffsetX: Math.round(clampNumber(next.textShadowOffsetX, -40, 40, defaultAiPopupAppearanceConfig.textShadowOffsetX)),
    textShadowOffsetY: Math.round(clampNumber(next.textShadowOffsetY, -40, 40, defaultAiPopupAppearanceConfig.textShadowOffsetY)),
    closeButtonFontSize: Math.round(clampNumber(next.closeButtonFontSize, 10, 30, defaultAiPopupAppearanceConfig.closeButtonFontSize)),
    closeButtonBorderRadius: Math.round(clampNumber(next.closeButtonBorderRadius, 0, 24, defaultAiPopupAppearanceConfig.closeButtonBorderRadius)),
    closeButtonPaddingX: Math.round(clampNumber(next.closeButtonPaddingX, 8, 36, defaultAiPopupAppearanceConfig.closeButtonPaddingX)),
    closeButtonPaddingY: Math.round(clampNumber(next.closeButtonPaddingY, 4, 20, defaultAiPopupAppearanceConfig.closeButtonPaddingY)),
    closeButtonOffsetX: Math.round(clampNumber(next.closeButtonOffsetX, 0, 80, defaultAiPopupAppearanceConfig.closeButtonOffsetX)),
    closeButtonOffsetY: Math.round(clampNumber(next.closeButtonOffsetY, 0, 80, defaultAiPopupAppearanceConfig.closeButtonOffsetY)),
    closeButtonBackgroundColor: normalizeHexColor(next.closeButtonBackgroundColor, defaultAiPopupAppearanceConfig.closeButtonBackgroundColor),
    closeButtonBackgroundOpacity: clampNumber(next.closeButtonBackgroundOpacity, 0, 1, defaultAiPopupAppearanceConfig.closeButtonBackgroundOpacity),
    closeButtonTextColor: normalizeHexColor(next.closeButtonTextColor, defaultAiPopupAppearanceConfig.closeButtonTextColor),
    closeButtonTextOpacity: clampNumber(next.closeButtonTextOpacity, 0, 1, defaultAiPopupAppearanceConfig.closeButtonTextOpacity),
    closeButtonBorderColor: normalizeHexColor(next.closeButtonBorderColor, defaultAiPopupAppearanceConfig.closeButtonBorderColor),
    closeButtonBorderOpacity: clampNumber(next.closeButtonBorderOpacity, 0, 1, defaultAiPopupAppearanceConfig.closeButtonBorderOpacity),
    closeButtonHoverBackgroundColor: normalizeHexColor(next.closeButtonHoverBackgroundColor, defaultAiPopupAppearanceConfig.closeButtonHoverBackgroundColor),
    closeButtonHoverBackgroundOpacity: clampNumber(next.closeButtonHoverBackgroundOpacity, 0, 1, defaultAiPopupAppearanceConfig.closeButtonHoverBackgroundOpacity),
    closeButtonHoverTextColor: normalizeHexColor(next.closeButtonHoverTextColor, defaultAiPopupAppearanceConfig.closeButtonHoverTextColor),
    closeButtonHoverTextOpacity: clampNumber(next.closeButtonHoverTextOpacity, 0, 1, defaultAiPopupAppearanceConfig.closeButtonHoverTextOpacity)
  };
}

function normalizeAiConfig(input, root = {}) {
  const next = input && typeof input === 'object' ? input : {};
  const interactionHours = Math.round(clampNumber(next.interactionIntervalHours, 0, 24, defaultAiConfig.interactionIntervalHours));
  const interactionMinutes = Math.round(clampNumber(next.interactionIntervalMinutes, 0, 59, defaultAiConfig.interactionIntervalMinutes));
  let interactionSeconds = Math.round(clampNumber(next.interactionIntervalSeconds, 0, 59, defaultAiConfig.interactionIntervalSeconds));

  if (getSecondsFromParts(interactionHours, interactionMinutes, interactionSeconds) < 1) {
    interactionSeconds = 1;
  }

  return {
    provider: normalizeAiProvider(next.provider),
    model: normalizeAiModel(next.model),
    apiKey: normalizeText(next.apiKey, 300),
    systemPrompt: normalizeText(next.systemPrompt, 4000),
    knowledgeBase: normalizeText(next.knowledgeBase, 12000),
    contextMemory: normalizeText(next.contextMemory, 4000),
    oneTimeReplyGuidance: normalizeText(next.oneTimeReplyGuidance, 1000),
    profile: normalizeAiProfile(next.profile),
    popupScheduleEnabled: Boolean(next.popupScheduleEnabled),
    singlePopupMode: next.singlePopupMode !== false,
    immediateReplyEnabled: next.immediateReplyEnabled !== false,
    interactionEnabled: Boolean(next.interactionEnabled),
    interactionIntervalHours: interactionHours,
    interactionIntervalMinutes: interactionMinutes,
    interactionIntervalSeconds: interactionSeconds,
    interactionIncludeForegroundApp: Boolean(next.interactionIncludeForegroundApp),
    interactionTone: normalizeAiInteractionTone(next.interactionTone),
    popupAppearance: normalizeAiPopupAppearance(next.popupAppearance, root)
  };
}

function normalizeWebsiteUrl(value) {
  if (typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const withProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const url = new URL(withProtocol);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return '';
    }

    return url.toString();
  } catch (_error) {
    return '';
  }
}

function getWebsiteLabelFallback(urlText) {
  try {
    const url = new URL(urlText);
    const pathname = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
    return `${url.hostname}${pathname}`.slice(0, 80) || url.hostname;
  } catch (_error) {
    return urlText.slice(0, 80);
  }
}

function normalizeWebsiteLibrary(input) {
  const next = input && typeof input === 'object' ? input : {};
  const rawEntries = Array.isArray(next.entries)
    ? next.entries
    : Array.isArray(next.urls)
      ? next.urls
      : [];

  const entries = rawEntries
    .map((item) => {
      const rawItem = typeof item === 'string' ? { url: item } : (item && typeof item === 'object' ? item : null);
      if (!rawItem) {
        return null;
      }

      const url = normalizeWebsiteUrl(rawItem.url || rawItem.link || '');
      if (!url) {
        return null;
      }

      return {
        label: normalizeSingleLineText(rawItem.label, 80) || getWebsiteLabelFallback(url),
        url,
        enabled: rawItem.enabled !== false
      };
    })
    .filter(Boolean)
    .slice(0, 1000);

  return {
    enabled: Boolean(next.enabled),
    entries
  };
}

function normalizeProcessRuleList(value) {
  const rawItems = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(/\r?\n/)
      : [];

  return [...new Set(rawItems
    .map((item) => normalizeSingleLineText(item, 80))
    .filter(Boolean))]
    .slice(0, 200);
}

function normalizeAutoProfiles(value) {
  if (!Array.isArray(value)) return [];
  return value.map(profile => ({
    configPath: normalizeConfigPath(profile?.configPath),
    processes: normalizeProcessRuleList(profile?.processes)
  })).filter(p => p.configPath && p.processes.length > 0).slice(0, 50);
}

function normalizeProcessRules(input) {
  const next = input && typeof input === 'object' ? input : {};

  return {
    enabled: Boolean(next.enabled),
    blacklist: normalizeProcessRuleList(next.blacklist),
    whitelist: normalizeProcessRuleList(next.whitelist),
    autoStartOnWhitelist: Boolean(next.autoStartOnWhitelist),
    stopOnBlacklist: Boolean(next.stopOnBlacklist),
    stopOnWhitelistExit: Boolean(next.stopOnWhitelistExit),
    checkIntervalSeconds: Math.round(clampNumber(next.checkIntervalSeconds, 2, 300, defaultProcessRulesConfig.checkIntervalSeconds)),
    autoProfiles: normalizeAutoProfiles(next.autoProfiles)
  };
}

function normalizeWallpaperConfig(input) {
  const next = input && typeof input === 'object' ? input : {};
  return {
    enabled: Boolean(next.enabled),
    intervalMinutes: Math.round(clampNumber(next.intervalMinutes, 1, 10080, defaultWallpaperConfig.intervalMinutes)),
    minResolution: Math.round(clampNumber(next.minResolution, 0, 8000, defaultWallpaperConfig.minResolution)),
    maxRatioDeviation: Number(clampNumber(next.maxRatioDeviation, 0, 1.0, defaultWallpaperConfig.maxRatioDeviation))
  };
}

function normalizeConfig(input, getSystemLanguage = () => 'zh-CN') {
  const next = { ...cloneDefaultConfig(), ...(input || {}) };
  next.language = normalizeLanguageSetting(next.language, getSystemLanguage);
  next.popupDisplayIds = normalizeDisplayIds(next.popupDisplayIds);
  next.startShortcut = normalizeShortcut(next.startShortcut);
  next.pauseShortcut = normalizeShortcut(next.pauseShortcut);
  next.stopShortcut = normalizeShortcut(next.stopShortcut);
  next.closeAllShortcut = normalizeShortcut(next.closeAllShortcut);
  const seenFolderPaths = new Set();
  next.folders = Array.isArray(next.folders)
    ? next.folders
        .map((folder) => {
          if (typeof folder === 'string') {
            return { path: folder.trim(), weight: 1 };
          }
          if (folder && typeof folder === 'object') {
            return {
              path: typeof folder.path === 'string' ? folder.path.trim() : '',
              weight: Math.round(clampNumber(folder.weight, 0, 10, 1))
            };
          }
          return null;
        })
        .filter((folder) => {
          if (!folder || !folder.path) {
            return false;
          }
          const key = folder.path.toLowerCase();
          if (seenFolderPaths.has(key)) {
            return false;
          }
          seenFolderPaths.add(key);
          return true;
        })
    : [];
  next.recursive = Boolean(next.recursive);
  next.order = next.order === 'name' ? 'name' : 'random';
  if (!Object.prototype.hasOwnProperty.call(input || {}, 'intervalHours') && Number(next.intervalSeconds) > 59) {
    const totalSeconds = Math.round(clampNumber(next.intervalSeconds, 1, 86400, defaultConfig.intervalSeconds));
    next.intervalHours = Math.floor(totalSeconds / 3600);
    next.intervalMinutes = Math.floor((totalSeconds % 3600) / 60);
    next.intervalSeconds = totalSeconds % 60;
  }
  next.intervalHours = Math.round(clampNumber(next.intervalHours, 0, 24, defaultConfig.intervalHours));
  next.intervalMinutes = Math.round(clampNumber(next.intervalMinutes, 0, 59, defaultConfig.intervalMinutes));
  next.intervalSeconds = Math.round(clampNumber(next.intervalSeconds, 0, 59, defaultConfig.intervalSeconds));
  if (getSecondsFromParts(next.intervalHours, next.intervalMinutes, next.intervalSeconds) < 1) {
    next.intervalSeconds = 1;
  }
  next.jitterHours = Math.round(clampNumber(next.jitterHours, 0, 24, defaultConfig.jitterHours));
  next.jitterMinutes = Math.round(clampNumber(next.jitterMinutes, 0, 59, defaultConfig.jitterMinutes));
  next.jitterSeconds = Math.round(clampNumber(next.jitterSeconds, 0, 59, defaultConfig.jitterSeconds));
  next.popupLifetimeHours = Math.round(clampNumber(next.popupLifetimeHours, 0, 24, defaultConfig.popupLifetimeHours));
  next.popupLifetimeMinutes = Math.round(clampNumber(next.popupLifetimeMinutes, 0, 59, defaultConfig.popupLifetimeMinutes));
  next.popupLifetimeSeconds = Math.round(clampNumber(next.popupLifetimeSeconds, 0, 59, defaultConfig.popupLifetimeSeconds));
  next.popupLifetimeJitterHours = Math.round(clampNumber(next.popupLifetimeJitterHours, 0, 24, defaultConfig.popupLifetimeJitterHours));
  next.popupLifetimeJitterMinutes = Math.round(clampNumber(next.popupLifetimeJitterMinutes, 0, 59, defaultConfig.popupLifetimeJitterMinutes));
  next.popupLifetimeJitterSeconds = Math.round(clampNumber(next.popupLifetimeJitterSeconds, 0, 59, defaultConfig.popupLifetimeJitterSeconds));
  next.burstCount = Math.round(clampNumber(next.burstCount, 1, 20, defaultConfig.burstCount));
  next.minWindows = Math.round(clampNumber(next.minWindows, 0, 500, defaultConfig.minWindows));
  next.maxWindows = next.maxWindows === 'unlimited'
    ? 'unlimited'
    : Math.round(clampNumber(next.maxWindows, 1, 500, defaultConfig.maxWindows));
  next.maxVideoWindows = Math.round(clampNumber(next.maxVideoWindows, -1, 500, defaultConfig.maxVideoWindows));
  next.gradual = Boolean(next.gradual);
  next.alwaysOnTop = Boolean(next.alwaysOnTop);
  next.fullscreen = Boolean(next.fullscreen);
  next.muted = Boolean(next.muted);
  next.closeVideoOnEnded = Boolean(next.closeVideoOnEnded);
  next.chaosVideo = Boolean(next.chaosVideo);
  next.clickToClose = Boolean(next.clickToClose);
  next.randomCloseButton = Boolean(next.randomCloseButton);
  next.disableManualClose = Boolean(next.disableManualClose);
  next.developerMode = Boolean(next.developerMode);
  next.closeButtonText = normalizeCloseButtonText(next.closeButtonText);
  next.closeButtonFontSize = Math.round(clampNumber(next.closeButtonFontSize, 10, 36, defaultConfig.closeButtonFontSize));
  next.closeButtonBorderRadius = Math.round(clampNumber(next.closeButtonBorderRadius, 0, 32, defaultConfig.closeButtonBorderRadius));
  next.closeButtonPaddingX = Math.round(clampNumber(next.closeButtonPaddingX, 8, 48, defaultConfig.closeButtonPaddingX));
  next.closeButtonPaddingY = Math.round(clampNumber(next.closeButtonPaddingY, 4, 24, defaultConfig.closeButtonPaddingY));
  next.closeButtonOffsetX = Math.round(clampNumber(next.closeButtonOffsetX, 0, 120, defaultConfig.closeButtonOffsetX));
  next.closeButtonOffsetY = Math.round(clampNumber(next.closeButtonOffsetY, 0, 120, defaultConfig.closeButtonOffsetY));
  next.closeButtonBackgroundColor = normalizeHexColor(next.closeButtonBackgroundColor, defaultConfig.closeButtonBackgroundColor);
  next.closeButtonTextColor = normalizeHexColor(next.closeButtonTextColor, defaultConfig.closeButtonTextColor);
  next.closeButtonBorderColor = normalizeHexColor(next.closeButtonBorderColor, defaultConfig.closeButtonBorderColor);
  next.closeButtonHoverBackgroundColor = normalizeHexColor(next.closeButtonHoverBackgroundColor, defaultConfig.closeButtonHoverBackgroundColor);
  next.closeButtonHoverTextColor = normalizeHexColor(next.closeButtonHoverTextColor, defaultConfig.closeButtonHoverTextColor);
  const hasSeparateMediaSizeSettings = Object.prototype.hasOwnProperty.call(input || {}, 'separateMediaSizeSettings');

  const hasBaseWidth = Object.prototype.hasOwnProperty.call(input || {}, 'baseWidth');
  const hasBaseHeight = Object.prototype.hasOwnProperty.call(input || {}, 'baseHeight');
  const hasSizeJitter = Object.prototype.hasOwnProperty.call(input || {}, 'sizeJitter');
  const hasImageBaseWidth = Object.prototype.hasOwnProperty.call(input || {}, 'imageBaseWidth');
  const hasImageBaseHeight = Object.prototype.hasOwnProperty.call(input || {}, 'imageBaseHeight');
  const hasImageSizeJitter = Object.prototype.hasOwnProperty.call(input || {}, 'imageSizeJitter');
  const hasImageCompensationMultiplier = Object.prototype.hasOwnProperty.call(input || {}, 'imageCompensationMultiplier');
  const hasImageCompensationThreshold = Object.prototype.hasOwnProperty.call(input || {}, 'imageCompensationThreshold');
  const hasVideoBaseWidth = Object.prototype.hasOwnProperty.call(input || {}, 'videoBaseWidth');
  const hasVideoBaseHeight = Object.prototype.hasOwnProperty.call(input || {}, 'videoBaseHeight');
  const hasVideoSizeJitter = Object.prototype.hasOwnProperty.call(input || {}, 'videoSizeJitter');
  const hasVideoCompensationMultiplier = Object.prototype.hasOwnProperty.call(input || {}, 'videoCompensationMultiplier');
  const hasVideoCompensationThreshold = Object.prototype.hasOwnProperty.call(input || {}, 'videoCompensationThreshold');
  const hasCompensationMultiplier = Object.prototype.hasOwnProperty.call(input || {}, 'compensationMultiplier');
  const hasCompensationThreshold = Object.prototype.hasOwnProperty.call(input || {}, 'compensationThreshold');
  const hasLegacySize = Object.prototype.hasOwnProperty.call(input || {}, 'minWidth')
    || Object.prototype.hasOwnProperty.call(input || {}, 'maxWidth')
    || Object.prototype.hasOwnProperty.call(input || {}, 'minHeight')
    || Object.prototype.hasOwnProperty.call(input || {}, 'maxHeight');

  const legacyMinWidth = Math.round(clampNumber(next.minWidth, 160, 3840, 320));
  const legacyMaxWidth = Math.round(clampNumber(next.maxWidth, legacyMinWidth, 3840, 720));
  const legacyMinHeight = Math.round(clampNumber(next.minHeight, 120, 2160, 240));
  const legacyMaxHeight = Math.round(clampNumber(next.maxHeight, legacyMinHeight, 2160, 540));

  const migratedBaseWidth = !hasBaseWidth && hasLegacySize
    ? Math.round((legacyMinWidth + legacyMaxWidth) / 2)
    : undefined;
  const migratedBaseHeight = !hasBaseHeight && hasLegacySize
    ? Math.round((legacyMinHeight + legacyMaxHeight) / 2)
    : undefined;
  const migratedSizeJitter = !hasSizeJitter && hasLegacySize
    ? (() => {
      const widthJitter = Math.round((legacyMaxWidth - legacyMinWidth) / 2);
      const heightJitter = Math.round((legacyMaxHeight - legacyMinHeight) / 2);
      return Math.max(widthJitter, heightJitter);
    })()
    : undefined;

  if (migratedBaseWidth !== undefined) {
    next.baseWidth = migratedBaseWidth;
  }
  if (migratedBaseHeight !== undefined) {
    next.baseHeight = migratedBaseHeight;
  }
  if (migratedSizeJitter !== undefined) {
    next.sizeJitter = migratedSizeJitter;
  }

  const sharedBaseWidth = Math.round(clampNumber(next.baseWidth, 160, 3840, defaultConfig.imageBaseWidth));
  const sharedBaseHeight = Math.round(clampNumber(next.baseHeight, 120, 2160, defaultConfig.imageBaseHeight));
  const sharedSizeJitter = Math.round(clampNumber(next.sizeJitter, 0, 2000, defaultConfig.imageSizeJitter));
  const sharedCompensationMultiplier = Number(clampNumber(next.compensationMultiplier, 1, 5, 1));
  const sharedCompensationThreshold = Number(clampNumber(next.compensationThreshold, 1, 10, 2.0));

  next.imageBaseWidth = Math.round(clampNumber(next.imageBaseWidth, 160, 3840, hasBaseWidth ? sharedBaseWidth : defaultConfig.imageBaseWidth));
  next.imageBaseHeight = Math.round(clampNumber(next.imageBaseHeight, 120, 2160, hasBaseHeight ? sharedBaseHeight : defaultConfig.imageBaseHeight));
  next.imageSizeJitter = Math.round(clampNumber(next.imageSizeJitter, 0, 2000, hasSizeJitter ? sharedSizeJitter : defaultConfig.imageSizeJitter));
  next.imageSizeJitterMode = normalizeSizeJitterMode(next.imageSizeJitterMode);
  next.imageCompensationMultiplier = Number(clampNumber(next.imageCompensationMultiplier, 1, 5, hasCompensationMultiplier ? sharedCompensationMultiplier : 1));
  next.imageCompensationThreshold = Number(clampNumber(next.imageCompensationThreshold, 1, 10, hasCompensationThreshold ? sharedCompensationThreshold : 2.0));

  next.videoBaseWidth = Math.round(clampNumber(next.videoBaseWidth, 160, 3840, hasBaseWidth ? sharedBaseWidth : defaultConfig.videoBaseWidth));
  next.videoBaseHeight = Math.round(clampNumber(next.videoBaseHeight, 120, 2160, hasBaseHeight ? sharedBaseHeight : defaultConfig.videoBaseHeight));
  next.videoSizeJitter = Math.round(clampNumber(next.videoSizeJitter, 0, 2000, hasSizeJitter ? sharedSizeJitter : defaultConfig.videoSizeJitter));
  next.videoSizeJitterMode = normalizeSizeJitterMode(next.videoSizeJitterMode);
  next.videoCompensationMultiplier = Number(clampNumber(next.videoCompensationMultiplier, 1, 5, hasCompensationMultiplier ? sharedCompensationMultiplier : 1));
  next.videoCompensationThreshold = Number(clampNumber(next.videoCompensationThreshold, 1, 10, hasCompensationThreshold ? sharedCompensationThreshold : 2.0));
  next.websiteLibrary = normalizeWebsiteLibrary(next.websiteLibrary);
  next.processRules = normalizeProcessRules(next.processRules);
  next.wallpaper = normalizeWallpaperConfig(next.wallpaper);
  next.ai = normalizeAiConfig(next.ai, next);
  next.windowBounds = normalizeWindowBounds(next.windowBounds);

  if (!hasImageBaseWidth && hasBaseWidth) {
    next.imageBaseWidth = sharedBaseWidth;
  }
  if (!hasImageBaseHeight && hasBaseHeight) {
    next.imageBaseHeight = sharedBaseHeight;
  }
  if (!hasImageSizeJitter && hasSizeJitter) {
    next.imageSizeJitter = sharedSizeJitter;
  }
  if (!hasImageCompensationMultiplier && hasCompensationMultiplier) {
    next.imageCompensationMultiplier = sharedCompensationMultiplier;
  }
  if (!hasImageCompensationThreshold && hasCompensationThreshold) {
    next.imageCompensationThreshold = sharedCompensationThreshold;
  }
  if (!hasVideoBaseWidth && hasBaseWidth) {
    next.videoBaseWidth = sharedBaseWidth;
  }
  if (!hasVideoBaseHeight && hasBaseHeight) {
    next.videoBaseHeight = sharedBaseHeight;
  }
  if (!hasVideoSizeJitter && hasSizeJitter) {
    next.videoSizeJitter = sharedSizeJitter;
  }
  if (!hasVideoCompensationMultiplier && hasCompensationMultiplier) {
    next.videoCompensationMultiplier = sharedCompensationMultiplier;
  }
  if (!hasVideoCompensationThreshold && hasCompensationThreshold) {
    next.videoCompensationThreshold = sharedCompensationThreshold;
  }

  next.separateMediaSizeSettings = hasSeparateMediaSizeSettings
    ? Boolean(next.separateMediaSizeSettings)
    : next.imageBaseWidth !== next.videoBaseWidth
      || next.imageBaseHeight !== next.videoBaseHeight
      || next.imageSizeJitter !== next.videoSizeJitter
      || next.imageSizeJitterMode !== next.videoSizeJitterMode
      || next.imageCompensationMultiplier !== next.videoCompensationMultiplier
      || next.imageCompensationThreshold !== next.videoCompensationThreshold;

  delete next.minWidth;
  delete next.maxWidth;
  delete next.minHeight;
  delete next.maxHeight;
  delete next.baseWidth;
  delete next.baseHeight;
  delete next.sizeJitter;
  delete next.compensationMultiplier;
  delete next.compensationThreshold;
  delete next.aiPopupWidth;
  delete next.aiPopupHeight;
  return next;
}

async function loadConfigFile(app, getSystemLanguage) {
  const currentPath = getConfigPath(app);
  const activePath = normalizeConfigPath(await readConfigPathState(app)) || currentPath;
  const activeConfig = await readConfigCandidate(activePath);

  if (activeConfig) {
    return {
      config: normalizeConfig(activeConfig, getSystemLanguage),
      configPath: activePath
    };
  }

  if (activePath !== currentPath) {
    return {
      config: cloneDefaultConfig(),
      configPath: activePath
    };
  }

  const currentConfig = await readConfigCandidate(currentPath);
  const currentScore = getConfigContentScore(currentConfig);

  if (currentConfig && currentScore > 0) {
    return {
      config: normalizeConfig(currentConfig, getSystemLanguage),
      configPath: currentPath
    };
  }

  let selectedLegacyConfig = null;
  let selectedLegacyScore = currentScore;

  for (const candidatePath of getLegacyConfigPaths(app)) {
    const candidateConfig = await readConfigCandidate(candidatePath);
    const candidateScore = getConfigContentScore(candidateConfig);
    if (candidateConfig && candidateScore > selectedLegacyScore) {
      selectedLegacyConfig = candidateConfig;
      selectedLegacyScore = candidateScore;
    }
  }

  if (selectedLegacyConfig) {
    const migratedConfig = normalizeConfig(selectedLegacyConfig, getSystemLanguage);
    await writeConfigFile(app, migratedConfig, currentPath);
    return {
      config: migratedConfig,
      configPath: currentPath
    };
  }

  if (currentConfig) {
    return {
      config: normalizeConfig(currentConfig, getSystemLanguage),
      configPath: currentPath
    };
  }

  return {
    config: cloneDefaultConfig(),
    configPath: currentPath
  };
}

async function writeConfigFile(app, config, configPath = getConfigPath(app)) {
  await fs.mkdir(path.dirname(configPath), { recursive: true });
  await fs.writeFile(configPath, JSON.stringify(config, null, 2), 'utf8');
}

function writeConfigFileSync(app, config, configPath = getConfigPath(app)) {
  fsSync.mkdirSync(path.dirname(configPath), { recursive: true });
  fsSync.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
}

async function writeConfigPathState(app, configPath) {
  const nextPath = normalizeConfigPath(configPath);
  if (!nextPath) {
    return;
  }

  const statePath = getConfigPathStatePath(app);
  await fs.mkdir(path.dirname(statePath), { recursive: true });
  await fs.writeFile(statePath, JSON.stringify({ configPath: nextPath }, null, 2), 'utf8');
}

module.exports = {
  clampNumber,
  cloneDefaultConfig,
  defaultConfig,
  getConfigPath,
  getConfigPathStatePath,
  loadConfigFile,
  normalizeAiConfig,
  normalizeConfig,
  normalizeWebsiteLibrary,
  normalizeSingleLineText,
  normalizeText,
  normalizeWindowBounds,
  readConfigCandidate,
  readConfigPathState,
  writeConfigPathState,
  writeConfigFile,
  writeConfigFileSync
};