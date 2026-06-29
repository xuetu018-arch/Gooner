const elements = {
  statusText: document.querySelector('#statusText'),
  mediaCount: document.querySelector('#mediaCount'),
  popupCount: document.querySelector('#popupCount'),
  runState: document.querySelector('#runState'),
  folderList: document.querySelector('#folderList'),
  logOutput: document.querySelector('#logOutput'),
  addFoldersButton: document.querySelector('#addFoldersButton'),
  scanButton: document.querySelector('#scanButton'),
  saveButton: document.querySelector('#saveButton'),
  switchConfigFileButton: document.querySelector('#switchConfigFileButton'),
  saveConfigAsButton: document.querySelector('#saveConfigAsButton'),
  profileSelector: document.querySelector('#profileSelector'),
  startButton: document.querySelector('#startButton'),
  pauseButton: document.querySelector('#pauseButton'),
  stopButton: document.querySelector('#stopButton'),
  closeAllButton: document.querySelector('#closeAllButton'),
  toggleLogButton: document.querySelector('#toggleLogButton'),
  collapseLogButton: document.querySelector('#collapseLogButton'),
  logDrawer: document.querySelector('#logDrawer'),
  minimizeWindowButton: document.querySelector('#minimizeWindowButton'),
  closeWindowButton: document.querySelector('#closeWindowButton'),
  themeToggleButton: document.querySelector('#themeToggleButton'),
  recursive: document.querySelector('#recursive'),
  gradual: document.querySelector('#gradual'),
  alwaysOnTop: document.querySelector('#alwaysOnTop'),
  fullscreen: document.querySelector('#fullscreen'),
  muted: document.querySelector('#muted'),
  closeVideoOnEnded: document.querySelector('#closeVideoOnEnded'),
  chaosVideo: document.querySelector('#chaosVideo'),
  clickToClose: document.querySelector('#clickToClose'),
  randomCloseButton: document.querySelector('#randomCloseButton'),
  disableManualClose: document.querySelector('#disableManualClose'),
  developerMode: document.querySelector('#developerMode'),
  closeButtonText: document.querySelector('#closeButtonText'),
  closeButtonFontSize: document.querySelector('#closeButtonFontSize'),
  closeButtonBorderRadius: document.querySelector('#closeButtonBorderRadius'),
  closeButtonPaddingX: document.querySelector('#closeButtonPaddingX'),
  closeButtonPaddingY: document.querySelector('#closeButtonPaddingY'),
  closeButtonOffsetX: document.querySelector('#closeButtonOffsetX'),
  closeButtonOffsetY: document.querySelector('#closeButtonOffsetY'),
  closeButtonBackgroundColor: document.querySelector('#closeButtonBackgroundColor'),
  closeButtonTextColor: document.querySelector('#closeButtonTextColor'),
  closeButtonBorderColor: document.querySelector('#closeButtonBorderColor'),
  closeButtonHoverBackgroundColor: document.querySelector('#closeButtonHoverBackgroundColor'),
  closeButtonHoverTextColor: document.querySelector('#closeButtonHoverTextColor'),
  popupDisplayList: document.querySelector('#popupDisplayList'),
  unlimitedWindows: document.querySelector('#unlimitedWindows'),
  unlimitedWarning: document.querySelector('#unlimitedWarning'),
  intervalHours: document.querySelector('#intervalHours'),
  intervalMinutes: document.querySelector('#intervalMinutes'),
  intervalSeconds: document.querySelector('#intervalSeconds'),
  jitterHours: document.querySelector('#jitterHours'),
  jitterMinutes: document.querySelector('#jitterMinutes'),
  jitterSeconds: document.querySelector('#jitterSeconds'),
  popupLifetimeHours: document.querySelector('#popupLifetimeHours'),
  popupLifetimeMinutes: document.querySelector('#popupLifetimeMinutes'),
  popupLifetimeSeconds: document.querySelector('#popupLifetimeSeconds'),
  popupLifetimeJitterHours: document.querySelector('#popupLifetimeJitterHours'),
  popupLifetimeJitterMinutes: document.querySelector('#popupLifetimeJitterMinutes'),
  popupLifetimeJitterSeconds: document.querySelector('#popupLifetimeJitterSeconds'),
  popupLifetimeJitterMode: document.querySelector('#popupLifetimeJitterMode'),
  burstCount: document.querySelector('#burstCount'),
  minWindows: document.querySelector('#minWindows'),
  maxWindows: document.querySelector('#maxWindows'),
  maxVideoWindows: document.querySelector('#maxVideoWindows'),
  order: document.querySelector('#order'),
  wallpaperEnabled: document.querySelector('#wallpaperEnabled'),
  wallpaperIntervalMinutes: document.querySelector('#wallpaperIntervalMinutes'),
  wallpaperMinResolution: document.querySelector('#wallpaperMinResolution'),
  wallpaperMaxRatioDeviation: document.querySelector('#wallpaperMaxRatioDeviation'),
  testWallpaperButton: document.querySelector('#testWallpaperButton'),
  processRulesEnabled: document.querySelector('#processRulesEnabled'),
  processRulesBlacklist: document.querySelector('#processRulesBlacklist'),
  processRulesWhitelist: document.querySelector('#processRulesWhitelist'),
  processRulesAutoStartOnWhitelist: document.querySelector('#processRulesAutoStartOnWhitelist'),
  processRulesStopOnBlacklist: document.querySelector('#processRulesStopOnBlacklist'),
  processRulesStopOnWhitelistExit: document.querySelector('#processRulesStopOnWhitelistExit'),
  processRulesCheckIntervalSeconds: document.querySelector('#processRulesCheckIntervalSeconds'),
  processRulesStatus: document.querySelector('#processRulesStatus'),
  chooseBlacklistProcessButton: document.querySelector('#chooseBlacklistProcessButton'),
  chooseWhitelistProcessButton: document.querySelector('#chooseWhitelistProcessButton'),
  autoProfileConfigPath: document.querySelector('#autoProfileConfigPath'),
  chooseAutoProfileConfigButton: document.querySelector('#chooseAutoProfileConfigButton'),
  clearAutoProfileConfigButton: document.querySelector('#clearAutoProfileConfigButton'),
  autoProfileProcesses: document.querySelector('#autoProfileProcesses'),
  chooseAutoProfileProcessButton: document.querySelector('#chooseAutoProfileProcessButton'),
  processPickerOverlay: document.querySelector('#processPickerOverlay'),
  processPickerTitle: document.querySelector('#processPickerTitle'),
  processPickerCloseButton: document.querySelector('#processPickerCloseButton'),
  processPickerSearch: document.querySelector('#processPickerSearch'),
  processPickerList: document.querySelector('#processPickerList'),
  processPickerStatus: document.querySelector('#processPickerStatus'),
  processPickerRefreshButton: document.querySelector('#processPickerRefreshButton'),
  processPickerAddButton: document.querySelector('#processPickerAddButton'),
  websiteSaveButton: document.querySelector('#websiteSaveButton'),
  websiteShowPopupButton: document.querySelector('#websiteShowPopupButton'),
  websiteLibraryEnabled: document.querySelector('#websiteLibraryEnabled'),
  websiteLibraryText: document.querySelector('#websiteLibraryText'),
  websiteLibrarySearch: document.querySelector('#websiteLibrarySearch'),
  websiteLibraryStats: document.querySelector('#websiteLibraryStats'),
  websiteLibraryList: document.querySelector('#websiteLibraryList'),
  language: document.querySelector('#language'),
  startShortcut: document.querySelector('#startShortcut'),
  pauseShortcut: document.querySelector('#pauseShortcut'),
  stopShortcut: document.querySelector('#stopShortcut'),
  closeAllShortcut: document.querySelector('#closeAllShortcut'),
  aiProvider: document.querySelector('#aiProvider'),
  aiModel: document.querySelector('#aiModel'),
  aiApiKey: document.querySelector('#aiApiKey'),
  aiSinglePopupMode: document.querySelector('#aiSinglePopupMode'),
  aiImmediateReplyEnabled: document.querySelector('#aiImmediateReplyEnabled'),
  aiInteractionEnabled: document.querySelector('#aiInteractionEnabled'),
  aiInteractionIntervalHours: document.querySelector('#aiInteractionIntervalHours'),
  aiInteractionIntervalMinutes: document.querySelector('#aiInteractionIntervalMinutes'),
  aiInteractionIntervalSeconds: document.querySelector('#aiInteractionIntervalSeconds'),
  aiInteractionTone: document.querySelector('#aiInteractionTone'),
  aiInteractionIncludeForegroundApp: document.querySelector('#aiInteractionIncludeForegroundApp'),
  aiSystemPrompt: document.querySelector('#aiSystemPrompt'),
  aiKnowledgeBase: document.querySelector('#aiKnowledgeBase'),
  aiContextMemory: document.querySelector('#aiContextMemory'),
  aiProfileAge: document.querySelector('#aiProfileAge'),
  aiProfileName: document.querySelector('#aiProfileName'),
  aiProfileCompanionName: document.querySelector('#aiProfileCompanionName'),
  aiProfileCompanionRole: document.querySelector('#aiProfileCompanionRole'),
  aiProfileAppearance: document.querySelector('#aiProfileAppearance'),
  aiProfileDailyPersona: document.querySelector('#aiProfileDailyPersona'),
  aiSceneLibrary: document.querySelector('#aiSceneLibrary'),
  aiPopupScheduleEnabled: document.querySelector('#aiPopupScheduleEnabled'),
  aiShowPopupButton: document.querySelector('#aiShowPopupButton'),
  aiTestInteractionButton: document.querySelector('#aiTestInteractionButton'),
  aiSaveAppearanceButton: document.querySelector('#aiSaveAppearanceButton'),
  aiStatus: document.querySelector('#aiStatus'),
  aiPopupWidth: document.querySelector('#aiPopupWidth'),
  aiPopupHeight: document.querySelector('#aiPopupHeight'),
  aiPopupPreviewScale: document.querySelector('#aiPopupPreviewScale'),
  aiPopupPreviewSize: document.querySelector('#aiPopupPreviewSize'),
  aiPopupBodyBackgroundColor: document.querySelector('#aiPopupBodyBackgroundColor'),
  aiPopupBodyBackgroundOpacity: document.querySelector('#aiPopupBodyBackgroundOpacity'),
  aiPopupTextColor: document.querySelector('#aiPopupTextColor'),
  aiPopupTextOpacity: document.querySelector('#aiPopupTextOpacity'),
  aiPopupTextFontSize: document.querySelector('#aiPopupTextFontSize'),
  aiPopupTextLineHeight: document.querySelector('#aiPopupTextLineHeight'),
  aiPopupTextAlign: document.querySelector('#aiPopupTextAlign'),
  aiPopupCardBackgroundColor: document.querySelector('#aiPopupCardBackgroundColor'),
  aiPopupCardBackgroundOpacity: document.querySelector('#aiPopupCardBackgroundOpacity'),
  aiPopupCardBorderColor: document.querySelector('#aiPopupCardBorderColor'),
  aiPopupCardBorderOpacity: document.querySelector('#aiPopupCardBorderOpacity'),
  aiPopupCardBorderWidth: document.querySelector('#aiPopupCardBorderWidth'),
  aiPopupCardBorderRadius: document.querySelector('#aiPopupCardBorderRadius'),
  aiPopupCardPaddingX: document.querySelector('#aiPopupCardPaddingX'),
  aiPopupCardPaddingY: document.querySelector('#aiPopupCardPaddingY'),
  aiPopupCardShadowColor: document.querySelector('#aiPopupCardShadowColor'),
  aiPopupCardShadowOpacity: document.querySelector('#aiPopupCardShadowOpacity'),
  aiPopupCardShadowBlur: document.querySelector('#aiPopupCardShadowBlur'),
  aiPopupCardShadowSpread: document.querySelector('#aiPopupCardShadowSpread'),
  aiPopupCardShadowOffsetX: document.querySelector('#aiPopupCardShadowOffsetX'),
  aiPopupCardShadowOffsetY: document.querySelector('#aiPopupCardShadowOffsetY'),
  aiPopupTextShadowColor: document.querySelector('#aiPopupTextShadowColor'),
  aiPopupTextShadowOpacity: document.querySelector('#aiPopupTextShadowOpacity'),
  aiPopupTextShadowBlur: document.querySelector('#aiPopupTextShadowBlur'),
  aiPopupTextShadowSpread: document.querySelector('#aiPopupTextShadowSpread'),
  aiPopupTextShadowOffsetX: document.querySelector('#aiPopupTextShadowOffsetX'),
  aiPopupTextShadowOffsetY: document.querySelector('#aiPopupTextShadowOffsetY'),
  aiPopupCloseButtonFontSize: document.querySelector('#aiPopupCloseButtonFontSize'),
  aiPopupCloseButtonBorderRadius: document.querySelector('#aiPopupCloseButtonBorderRadius'),
  aiPopupCloseButtonPaddingX: document.querySelector('#aiPopupCloseButtonPaddingX'),
  aiPopupCloseButtonPaddingY: document.querySelector('#aiPopupCloseButtonPaddingY'),
  aiPopupCloseButtonOffsetX: document.querySelector('#aiPopupCloseButtonOffsetX'),
  aiPopupCloseButtonOffsetY: document.querySelector('#aiPopupCloseButtonOffsetY'),
  aiPopupCloseButtonBackgroundColor: document.querySelector('#aiPopupCloseButtonBackgroundColor'),
  aiPopupCloseButtonBackgroundOpacity: document.querySelector('#aiPopupCloseButtonBackgroundOpacity'),
  aiPopupCloseButtonTextColor: document.querySelector('#aiPopupCloseButtonTextColor'),
  aiPopupCloseButtonTextOpacity: document.querySelector('#aiPopupCloseButtonTextOpacity'),
  aiPopupCloseButtonBorderColor: document.querySelector('#aiPopupCloseButtonBorderColor'),
  aiPopupCloseButtonBorderOpacity: document.querySelector('#aiPopupCloseButtonBorderOpacity'),
  aiPopupCloseButtonHoverBackgroundColor: document.querySelector('#aiPopupCloseButtonHoverBackgroundColor'),
  aiPopupCloseButtonHoverBackgroundOpacity: document.querySelector('#aiPopupCloseButtonHoverBackgroundOpacity'),
  aiPopupCloseButtonHoverTextColor: document.querySelector('#aiPopupCloseButtonHoverTextColor'),
  aiPopupCloseButtonHoverTextOpacity: document.querySelector('#aiPopupCloseButtonHoverTextOpacity'),
  aiPopupPreview: document.querySelector('#aiPopupPreview'),
  aiPopupPreviewCloseButton: document.querySelector('#aiPopupPreviewCloseButton'),
  aiPopupPreviewText: document.querySelector('#aiPopupPreviewText'),
  separateMediaSizeSettings: document.querySelector('#separateMediaSizeSettings'),
  sharedSizePanel: document.querySelector('#sharedSizePanel'),
  separateSizePanels: document.querySelector('#separateSizePanels'),
  sharedBaseWidth: document.querySelector('#sharedBaseWidth'),
  sharedBaseHeight: document.querySelector('#sharedBaseHeight'),
  sharedSizeJitter: document.querySelector('#sharedSizeJitter'),
  sharedSizeJitterMode: document.querySelector('#sharedSizeJitterMode'),
  sharedCompensationMultiplier: document.querySelector('#sharedCompensationMultiplier'),
  sharedCompensationThreshold: document.querySelector('#sharedCompensationThreshold'),
  imageBaseWidth: document.querySelector('#imageBaseWidth'),
  imageBaseHeight: document.querySelector('#imageBaseHeight'),
  imageSizeJitter: document.querySelector('#imageSizeJitter'),
  imageSizeJitterMode: document.querySelector('#imageSizeJitterMode'),
  imageCompensationMultiplier: document.querySelector('#imageCompensationMultiplier'),
  imageCompensationThreshold: document.querySelector('#imageCompensationThreshold'),
  videoBaseWidth: document.querySelector('#videoBaseWidth'),
  videoBaseHeight: document.querySelector('#videoBaseHeight'),
  videoSizeJitter: document.querySelector('#videoSizeJitter'),
  videoSizeJitterMode: document.querySelector('#videoSizeJitterMode'),
  videoCompensationMultiplier: document.querySelector('#videoCompensationMultiplier'),
  videoCompensationThreshold: document.querySelector('#videoCompensationThreshold'),
  navItems: Array.from(document.querySelectorAll('.nav-item[data-page]')),
  pages: Array.from(document.querySelectorAll('.page')),
  sectionNavItems: Array.from(document.querySelectorAll('.section-nav-item[data-section-target]')),
  sectionPanels: Array.from(document.querySelectorAll('.section-panel[data-section-panel]'))
};

let currentConfig = null;
let currentState = null;
let currentLocale = (window.appI18n && window.appI18n.resolveLanguage('system', navigator.language)) || 'zh-CN';
let shortcutTransientFeedback = {};
let autoSaveInFlight = null;
let autoSaveTimer = null;
let processPickerTarget = null;
let processPickerItems = [];

const AUTO_SAVE_DELAY_MS = 300;
const AUTO_SAVE_EXCLUDED_IDS = new Set(['language', 'startShortcut', 'pauseShortcut', 'stopShortcut', 'closeAllShortcut', 'websiteLibraryEnabled', 'websiteLibraryText', 'websiteLibrarySearch']);

const directionModeButtons = Array.from(document.querySelectorAll('.symbol-toggle[data-target]'));
const shortcutFields = [
  {
    key: 'startShortcut',
    labelKey: 'shortcuts.start',
    input: elements.startShortcut,
    status: document.querySelector('#startShortcutStatus')
  },
  {
    key: 'pauseShortcut',
    labelKey: 'shortcuts.pause',
    input: elements.pauseShortcut,
    status: document.querySelector('#pauseShortcutStatus')
  },
  {
    key: 'stopShortcut',
    labelKey: 'shortcuts.stop',
    input: elements.stopShortcut,
    status: document.querySelector('#stopShortcutStatus')
  },
  {
    key: 'closeAllShortcut',
    labelKey: 'shortcuts.closeAll',
    input: elements.closeAllShortcut,
    status: document.querySelector('#closeAllShortcutStatus')
  }
];
const { resolveLanguage, translate } = window.appI18n || {
  resolveLanguage: (value, fallback) => value || fallback || 'zh-CN',
  translate: (_locale, key) => key
};

function t(key, params) {
  return translate(currentLocale, key, params);
}

function getMediaPopup() {
  return window.mediaPopup;
}

function getConfigFileDisplayName(configPath) {
  const value = String(configPath || '').trim();
  if (!value) {
    return t('config.file.default');
  }

  return value.replace(/\\/g, '/').split('/').filter(Boolean).pop() || value;
}
let cachedProfiles = [];

async function loadProfiles(activePath) {
  if (!elements.profileSelector) return;
  try {
    cachedProfiles = await mediaPopup.listProfiles();
    
    // Update main selector
    elements.profileSelector.innerHTML = '';
    
    let activeProfileId = '';
    cachedProfiles.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.name;
      elements.profileSelector.appendChild(opt);
      if (activePath && p.path === activePath) {
        activeProfileId = p.id;
      }
    });

    const createOpt = document.createElement('option');
    createOpt.value = '__create_new__';
    createOpt.textContent = '[+] 新建档案...';
    elements.profileSelector.appendChild(createOpt);

    if (activeProfileId) {
      elements.profileSelector.value = activeProfileId;
    }

    // Update auto profile selector
    if (elements.autoProfileConfigPath) {
      const currentAutoVal = elements.autoProfileConfigPath.value;
      elements.autoProfileConfigPath.innerHTML = '<option value="">(不自动切换)</option>';
      cachedProfiles.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.path;
        opt.textContent = p.name;
        elements.autoProfileConfigPath.appendChild(opt);
      });
      elements.autoProfileConfigPath.value = currentAutoVal;
    }

  } catch (err) {
    console.error('Failed to load profiles', err);
  }
}

function renderConfigFileInfo(configPath) {
  loadProfiles(configPath);
}
function normalizeWebsiteUrlInput(value) {
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

function getWebsiteFallbackLabel(urlText) {
  try {
    const url = new URL(urlText);
    const pathname = url.pathname === '/' ? '' : url.pathname.replace(/\/$/, '');
    return `${url.hostname}${pathname}` || url.hostname;
  } catch (_error) {
    return urlText;
  }
}

function splitWebsiteLine(value) {
  const separatorIndex = value.indexOf('|');
  if (separatorIndex === -1) {
    return ['', value.trim()];
  }

  return [
    value.slice(0, separatorIndex).trim(),
    value.slice(separatorIndex + 1).trim()
  ];
}

function parseWebsiteLibraryText(text) {
  const lines = String(text || '').split(/\r?\n/);
  const entries = [];
  const invalidLines = [];

  lines.forEach((line, index) => {
    let trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      return;
    }

    let enabled = true;
    if (trimmed.startsWith('!')) {
      enabled = false;
      trimmed = trimmed.slice(1).trim();
    }

    const [rawLabel, rawUrl] = splitWebsiteLine(trimmed);
    const url = normalizeWebsiteUrlInput(rawUrl || rawLabel);
    if (!url) {
      invalidLines.push(index + 1);
      return;
    }

    const label = (rawUrl ? rawLabel : '').replace(/\|/g, ' ').trim() || getWebsiteFallbackLabel(url);
    entries.push({ label, url, enabled });
  });

  return {
    entries,
    invalidLines
  };
}

function serializeWebsiteLibrary(entries = []) {
  return entries
    .map((entry) => `${entry.enabled === false ? '! ' : ''}${entry.label || getWebsiteFallbackLabel(entry.url)} | ${entry.url}`)
    .join('\n');
}

function getWebsiteLibrary(config = currentConfig) {
  const library = config?.websiteLibrary || {};
  return {
    enabled: Boolean(library.enabled),
    entries: Array.isArray(library.entries)
      ? library.entries.map((entry) => ({
        label: entry.label || getWebsiteFallbackLabel(entry.url || ''),
        url: entry.url || '',
        enabled: entry.enabled !== false
      }))
      : []
  };
}

function getProcessRules(config = currentConfig) {
  const rules = config?.processRules || {};
  return {
    enabled: Boolean(rules.enabled),
    blacklist: Array.isArray(rules.blacklist) ? rules.blacklist : [],
    whitelist: Array.isArray(rules.whitelist) ? rules.whitelist : [],
    autoStartOnWhitelist: Boolean(rules.autoStartOnWhitelist),
    stopOnBlacklist: Boolean(rules.stopOnBlacklist),
    stopOnWhitelistExit: Boolean(rules.stopOnWhitelistExit),
    checkIntervalSeconds: Number.isFinite(Number(rules.checkIntervalSeconds)) ? Number(rules.checkIntervalSeconds) : 5
  };
}

function parseProcessRuleText(value) {
  return String(value || '')
    .split(/\r?\n/)
    .map((item) => item.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function serializeProcessRuleList(items = []) {
  return items.join('\n');
}

function normalizeProcessRuleInputName(value) {
  return String(value || '')
    .trim()
    .replace(/^"|"$/g, '')
    .replace(/\.exe$/i, '')
    .toLowerCase();
}

function getProcessPickerTargetInput() {
  if (processPickerTarget === 'blacklist') {
    return elements.processRulesBlacklist;
  }

  if (processPickerTarget === 'whitelist') {
    return elements.processRulesWhitelist;
  }

  if (processPickerTarget === 'autoProfile') {
    return elements.autoProfileProcesses;
  }

  return null;
}

function getProcessRuleStatusText(state) {
  if (!state?.enabled) {
    return t('processRules.status.disabled');
  }

  const blacklistMatches = Array.isArray(state.blacklistMatches) ? state.blacklistMatches : [];
  const whitelistMatches = Array.isArray(state.whitelistMatches) ? state.whitelistMatches : [];

  if (state.reason === 'blacklist') {
    return t('processRules.status.blacklist', { names: blacklistMatches.join(', ') });
  }

  if (state.reason === 'waitingWhitelist') {
    return t('processRules.status.waitingWhitelist');
  }

  if (state.reason === 'error') {
    return t('processRules.status.error');
  }

  if (whitelistMatches.length > 0) {
    return t('processRules.status.whitelist', { names: whitelistMatches.join(', ') });
  }

  return t('processRules.status.allowed');
}

function getSelectedProcessNamesFromPicker() {
  if (!elements.processPickerList) {
    return [];
  }

  return Array.from(elements.processPickerList.querySelectorAll('input[type="checkbox"]:checked'))
    .map((input) => input.value)
    .filter(Boolean);
}

function renderProcessPickerList() {
  if (!elements.processPickerList) {
    return;
  }

  const keyword = String(elements.processPickerSearch?.value || '').trim().toLowerCase();
  const targetInput = getProcessPickerTargetInput();
  const existing = new Set(parseProcessRuleText(targetInput?.value || '').map(normalizeProcessRuleInputName));
  const matched = processPickerItems.filter((item) => !keyword
    || item.name.toLowerCase().includes(keyword)
    || item.path.toLowerCase().includes(keyword));

  elements.processPickerList.replaceChildren();

  if (!matched.length) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = processPickerItems.length ? t('processRules.noProcessMatches') : t('processRules.noProcesses');
    elements.processPickerList.append(empty);
    if (elements.processPickerStatus) {
      elements.processPickerStatus.textContent = t('processRules.pickerStats', { count: 0, selected: 0 });
    }
    return;
  }

  for (const item of matched) {
    const row = document.createElement('label');
    row.className = 'process-picker-row';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = item.name;
    checkbox.checked = existing.has(normalizeProcessRuleInputName(item.name));
    checkbox.addEventListener('change', () => {
      if (elements.processPickerStatus) {
        elements.processPickerStatus.textContent = t('processRules.pickerStats', {
          count: matched.length,
          selected: getSelectedProcessNamesFromPicker().length
        });
      }
    });

    const iconWrap = document.createElement('span');
    iconWrap.className = 'process-picker-icon';

    if (item.icon) {
      const icon = document.createElement('img');
      icon.src = item.icon;
      icon.alt = '';
      icon.loading = 'lazy';
      iconWrap.append(icon);
    } else {
      iconWrap.textContent = item.name.slice(0, 1).toUpperCase();
    }

    const meta = document.createElement('span');
    meta.className = 'process-picker-meta';

    const label = document.createElement('span');
    label.className = 'process-picker-name';
    label.textContent = item.name;

    const path = document.createElement('span');
    path.className = 'process-picker-path';
    path.textContent = item.path || t('processRules.pathUnavailable');
    path.title = item.path || '';

    meta.append(label, path);

    row.append(checkbox, iconWrap, meta);
    elements.processPickerList.append(row);
  }

  if (elements.processPickerStatus) {
    elements.processPickerStatus.textContent = t('processRules.pickerStats', {
      count: matched.length,
      selected: getSelectedProcessNamesFromPicker().length
    });
  }
}

async function loadProcessPickerList() {
  const mediaPopup = getMediaPopup();
  if (!mediaPopup?.listProcesses) {
    log(t('log.processPickerUnavailable'));
    processPickerItems = [];
    renderProcessPickerList();
    return;
  }

  if (elements.processPickerStatus) {
    elements.processPickerStatus.textContent = t('processRules.loading');
  }

  const result = await mediaPopup.listProcesses();
  if (!result?.ok) {
    processPickerItems = [];
    if (elements.processPickerStatus) {
      elements.processPickerStatus.textContent = t('processRules.loadFailed');
    }
    log(t('processRules.loadFailed'));
    renderProcessPickerList();
    return;
  }

  const processMap = new Map();
  for (const rawItem of result.processes || []) {
    const item = typeof rawItem === 'string'
      ? { name: rawItem, path: '', icon: '' }
      : {
        name: String(rawItem?.name || '').trim(),
        path: String(rawItem?.path || '').trim(),
        icon: String(rawItem?.icon || '').trim()
      };
    if (!item.path) {
      continue;
    }
    const key = normalizeProcessRuleInputName(item.name);
    const current = processMap.get(key);
    if (key && (!current || (!current.icon && item.icon) || (!current.path && item.path))) {
      processMap.set(key, item);
    }
  }

  processPickerItems = Array.from(processMap.values())
    .sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: 'base' }));
  renderProcessPickerList();
}

async function openProcessPicker(target) {
  processPickerTarget = target;
  if (elements.processPickerTitle) {
    elements.processPickerTitle.textContent = target === 'blacklist' ? t('processRules.pickerTitleBlacklist') : target === 'whitelist' ? t('processRules.pickerTitleWhitelist') : t('processRules.pickerTitleAutoProfile');
  }
  if (elements.processPickerSearch) {
    elements.processPickerSearch.value = '';
  }
  if (elements.processPickerOverlay) {
    elements.processPickerOverlay.hidden = false;
  }
  await loadProcessPickerList();
  elements.processPickerSearch?.focus();
}

function closeProcessPicker() {
  processPickerTarget = null;
  processPickerItems = [];
  if (elements.processPickerOverlay) {
    elements.processPickerOverlay.hidden = true;
  }
}

async function addSelectedProcessesToRuleList() {
  const targetInput = getProcessPickerTargetInput();
  if (!targetInput) {
    return;
  }

  const selected = getSelectedProcessNamesFromPicker();
  if (!selected.length) {
    if (elements.processPickerStatus) {
      elements.processPickerStatus.textContent = t('processRules.selectAtLeastOne');
    }
    return;
  }

  const existing = parseProcessRuleText(targetInput.value);
  const seen = new Set(existing.map(normalizeProcessRuleInputName));
  const nextItems = [...existing];
  let addedCount = 0;

  for (const name of selected) {
    const normalized = normalizeProcessRuleInputName(name);
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    nextItems.push(name);
    addedCount += 1;
  }

  targetInput.value = serializeProcessRuleList(nextItems);
  await scheduleAutoSave({ immediate: true });
  log(t('log.processesAddedToRules', { count: addedCount }));
  closeProcessPicker();
}

function formatDisplayResolution(display) {
  const area = display?.workArea || display?.bounds || {};
  const width = Number.isFinite(area.width) ? Math.round(area.width) : 0;
  const height = Number.isFinite(area.height) ? Math.round(area.height) : 0;
  const parts = [];

  if (width > 0 && height > 0) {
    parts.push(`${width}×${height}`);
  }

  const scaleFactor = Number(display?.scaleFactor);
  if (Number.isFinite(scaleFactor) && scaleFactor > 0 && Math.abs(scaleFactor - 1) > 0.01) {
    parts.push(`${Math.round(scaleFactor * 100)}%`);
  }

  return parts.join(' · ');
}

function getPopupDisplayIds() {
  if (!elements.popupDisplayList) {
    return [];
  }

  return Array.from(elements.popupDisplayList.querySelectorAll('input[type="checkbox"]:checked'))
    .map((input) => Number(input.dataset.displayId))
    .filter((item) => Number.isFinite(item));
}

function renderPopupDisplayList(displays = []) {
  if (!elements.popupDisplayList) {
    return;
  }

  elements.popupDisplayList.replaceChildren();

  if (!displays.length) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = t('appearance.display.empty');
    elements.popupDisplayList.append(empty);
    return;
  }

  const selectedIds = new Set(Array.isArray(currentConfig?.popupDisplayIds) ? currentConfig.popupDisplayIds : []);
  const selectedDisplayIds = selectedIds.size && displays.some((display) => selectedIds.has(display.id))
    ? selectedIds
    : new Set(displays.map((display) => display.id));

  for (const [index, display] of displays.entries()) {
    const row = document.createElement('label');
    row.className = 'switch-row';

    const label = document.createElement('span');
    label.className = 'switch-name';
    label.textContent = `${t('appearance.display.item', { index: index + 1 })}${display.isPrimary ? ` ${t('appearance.display.primary')}` : ''}${formatDisplayResolution(display) ? ` · ${formatDisplayResolution(display)}` : ''}`;

    const state = document.createElement('span');
    state.className = 'switch-state';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.displayId = String(display.id);
    input.checked = selectedDisplayIds.has(display.id);
    input.addEventListener('change', () => {
      void scheduleAutoSave({ immediate: true });
    });

    const toggle = document.createElement('i');

    row.append(label, state, input, toggle);
    elements.popupDisplayList.append(row);
  }
}

function log(message) {
  const time = new Date().toLocaleTimeString();
  elements.logOutput.textContent = `[${time}] ${message}\n${elements.logOutput.textContent}`.trim();
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLocale;
  document.title = t('app.title');

  for (const node of document.querySelectorAll('[data-i18n]')) {
    node.textContent = t(node.dataset.i18n);
  }

  for (const node of document.querySelectorAll('[data-i18n-title]')) {
    node.title = t(node.dataset.i18nTitle);
  }

  for (const node of document.querySelectorAll('[data-i18n-aria-label]')) {
    node.setAttribute('aria-label', t(node.dataset.i18nAriaLabel));
  }

  for (const node of document.querySelectorAll('[data-i18n-placeholder]')) {
    node.setAttribute('placeholder', t(node.dataset.i18nPlaceholder));
  }

  if (!elements.logOutput.dataset.localized) {
    elements.logOutput.textContent = t('log.waiting');
    elements.logOutput.dataset.localized = 'true';
  }
}

function getAiConfig(config = currentConfig) {
  const ai = config?.ai || {};
  const profile = ai.profile || {};
  const popupAppearance = ai.popupAppearance || {};
  const numberOr = (value, fallback) => (Number.isFinite(Number(value)) ? Number(value) : fallback);

  return {
    provider: ai.provider || 'deepseek',
    model: ai.model || 'deepseek-chat',
    apiKey: ai.apiKey || '',
    singlePopupMode: ai.singlePopupMode !== false,
    immediateReplyEnabled: ai.immediateReplyEnabled !== false,
    interactionEnabled: Boolean(ai.interactionEnabled),
    interactionIntervalHours: numberOr(ai.interactionIntervalHours, 0),
    interactionIntervalMinutes: numberOr(ai.interactionIntervalMinutes, 10),
    interactionIntervalSeconds: numberOr(ai.interactionIntervalSeconds, 0),
    interactionTone: ai.interactionTone || 'teasing',
    interactionIncludeForegroundApp: Boolean(ai.interactionIncludeForegroundApp),
    systemPrompt: ai.systemPrompt || '',
    knowledgeBase: ai.knowledgeBase || '',
    contextMemory: ai.contextMemory || '',
    profile: {
      age: Number.isFinite(profile.age) ? String(profile.age) : '',
      name: profile.name || '',
      companionName: profile.companionName || '',
      companionRole: profile.companionRole || '',
      appearance: profile.appearance || '',
      dailyPersona: profile.dailyPersona || '',
      sceneLibrary: profile.sceneLibrary || ''
    },
    popupScheduleEnabled: Boolean(ai.popupScheduleEnabled),
    popupAppearance: {
      popupWidth: numberOr(popupAppearance.popupWidth, 420),
      popupHeight: numberOr(popupAppearance.popupHeight, 320),
      bodyBackgroundColor: popupAppearance.bodyBackgroundColor || '#050505',
      bodyBackgroundOpacity: numberOr(popupAppearance.bodyBackgroundOpacity, 1),
      textColor: popupAppearance.textColor || '#f4f7fb',
      textOpacity: numberOr(popupAppearance.textOpacity, 1),
      textFontSize: numberOr(popupAppearance.textFontSize, 16),
      textLineHeight: numberOr(popupAppearance.textLineHeight, 1.5),
      textAlign: popupAppearance.textAlign || 'left',
      cardBackgroundColor: popupAppearance.cardBackgroundColor || '#050505',
      cardBackgroundOpacity: numberOr(popupAppearance.cardBackgroundOpacity, 1),
      cardBorderColor: popupAppearance.cardBorderColor || '#1f2b33',
      cardBorderOpacity: numberOr(popupAppearance.cardBorderOpacity, 1),
      cardBorderWidth: numberOr(popupAppearance.cardBorderWidth, 0),
      cardBorderRadius: numberOr(popupAppearance.cardBorderRadius, 8),
      cardPaddingX: numberOr(popupAppearance.cardPaddingX, 2),
      cardPaddingY: numberOr(popupAppearance.cardPaddingY, 0),
      cardShadowColor: popupAppearance.cardShadowColor || '#000000',
      cardShadowOpacity: numberOr(popupAppearance.cardShadowOpacity, 0.45),
      cardShadowBlur: numberOr(popupAppearance.cardShadowBlur, 24),
      cardShadowSpread: numberOr(popupAppearance.cardShadowSpread, 0),
      cardShadowOffsetX: numberOr(popupAppearance.cardShadowOffsetX, 0),
      cardShadowOffsetY: numberOr(popupAppearance.cardShadowOffsetY, 8),
      textShadowColor: popupAppearance.textShadowColor || '#000000',
      textShadowOpacity: numberOr(popupAppearance.textShadowOpacity, 0.55),
      textShadowBlur: numberOr(popupAppearance.textShadowBlur, 10),
      textShadowSpread: numberOr(popupAppearance.textShadowSpread, 0),
      textShadowOffsetX: numberOr(popupAppearance.textShadowOffsetX, 0),
      textShadowOffsetY: numberOr(popupAppearance.textShadowOffsetY, 2),
      closeButtonFontSize: numberOr(popupAppearance.closeButtonFontSize, 13),
      closeButtonBorderRadius: numberOr(popupAppearance.closeButtonBorderRadius, 6),
      closeButtonPaddingX: numberOr(popupAppearance.closeButtonPaddingX, 12),
      closeButtonPaddingY: numberOr(popupAppearance.closeButtonPaddingY, 6),
      closeButtonOffsetX: numberOr(popupAppearance.closeButtonOffsetX, 6),
      closeButtonOffsetY: numberOr(popupAppearance.closeButtonOffsetY, 6),
      closeButtonBackgroundColor: popupAppearance.closeButtonBackgroundColor || '#000000',
      closeButtonBackgroundOpacity: numberOr(popupAppearance.closeButtonBackgroundOpacity, 1),
      closeButtonTextColor: popupAppearance.closeButtonTextColor || '#ffffff',
      closeButtonTextOpacity: numberOr(popupAppearance.closeButtonTextOpacity, 1),
      closeButtonBorderColor: popupAppearance.closeButtonBorderColor || '#ffffff',
      closeButtonBorderOpacity: numberOr(popupAppearance.closeButtonBorderOpacity, 1),
      closeButtonHoverBackgroundColor: popupAppearance.closeButtonHoverBackgroundColor || '#2f3b45',
      closeButtonHoverBackgroundOpacity: numberOr(popupAppearance.closeButtonHoverBackgroundOpacity, 1),
      closeButtonHoverTextColor: popupAppearance.closeButtonHoverTextColor || '#ffffff',
      closeButtonHoverTextOpacity: numberOr(popupAppearance.closeButtonHoverTextOpacity, 1)
    }
  };
}

function clampOpacity(value, fallback = 1) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return fallback;
  }
  return Math.min(1, Math.max(0, number));
}

function hexToRgba(hexColor, opacity = 1) {
  if (typeof hexColor !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(hexColor)) {
    return `rgba(0, 0, 0, ${clampOpacity(opacity, 1)})`;
  }

  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${clampOpacity(opacity, 1)})`;
}

function getAiPopupAppearanceFromInputs() {
  const fallback = getAiConfig().popupAppearance;
  const numberOr = (value, backup) => (Number.isFinite(Number(value)) ? Number(value) : backup);

  return {
    popupWidth: numberOr(elements.aiPopupWidth.value, fallback.popupWidth),
    popupHeight: numberOr(elements.aiPopupHeight.value, fallback.popupHeight),
    bodyBackgroundColor: elements.aiPopupBodyBackgroundColor.value || fallback.bodyBackgroundColor,
    bodyBackgroundOpacity: clampOpacity(elements.aiPopupBodyBackgroundOpacity.value, fallback.bodyBackgroundOpacity),
    textColor: elements.aiPopupTextColor.value || fallback.textColor,
    textOpacity: clampOpacity(elements.aiPopupTextOpacity.value, fallback.textOpacity),
    textFontSize: numberOr(elements.aiPopupTextFontSize.value, fallback.textFontSize),
    textLineHeight: numberOr(elements.aiPopupTextLineHeight.value, fallback.textLineHeight),
    textAlign: elements.aiPopupTextAlign.value || fallback.textAlign,
    cardBackgroundColor: elements.aiPopupCardBackgroundColor.value || fallback.cardBackgroundColor,
    cardBackgroundOpacity: clampOpacity(elements.aiPopupCardBackgroundOpacity.value, fallback.cardBackgroundOpacity),
    cardBorderColor: elements.aiPopupCardBorderColor.value || fallback.cardBorderColor,
    cardBorderOpacity: clampOpacity(elements.aiPopupCardBorderOpacity.value, fallback.cardBorderOpacity),
    cardBorderWidth: numberOr(elements.aiPopupCardBorderWidth.value, fallback.cardBorderWidth),
    cardBorderRadius: numberOr(elements.aiPopupCardBorderRadius.value, fallback.cardBorderRadius),
    cardPaddingX: numberOr(elements.aiPopupCardPaddingX.value, fallback.cardPaddingX),
    cardPaddingY: numberOr(elements.aiPopupCardPaddingY.value, fallback.cardPaddingY),
    cardShadowColor: elements.aiPopupCardShadowColor.value || fallback.cardShadowColor,
    cardShadowOpacity: clampOpacity(elements.aiPopupCardShadowOpacity.value, fallback.cardShadowOpacity),
    cardShadowBlur: numberOr(elements.aiPopupCardShadowBlur.value, fallback.cardShadowBlur),
    cardShadowSpread: numberOr(elements.aiPopupCardShadowSpread.value, fallback.cardShadowSpread),
    cardShadowOffsetX: numberOr(elements.aiPopupCardShadowOffsetX.value, fallback.cardShadowOffsetX),
    cardShadowOffsetY: numberOr(elements.aiPopupCardShadowOffsetY.value, fallback.cardShadowOffsetY),
    textShadowColor: elements.aiPopupTextShadowColor.value || fallback.textShadowColor,
    textShadowOpacity: clampOpacity(elements.aiPopupTextShadowOpacity.value, fallback.textShadowOpacity),
    textShadowBlur: numberOr(elements.aiPopupTextShadowBlur.value, fallback.textShadowBlur),
    textShadowSpread: numberOr(elements.aiPopupTextShadowSpread.value, fallback.textShadowSpread),
    textShadowOffsetX: numberOr(elements.aiPopupTextShadowOffsetX.value, fallback.textShadowOffsetX),
    textShadowOffsetY: numberOr(elements.aiPopupTextShadowOffsetY.value, fallback.textShadowOffsetY),
    closeButtonFontSize: numberOr(elements.aiPopupCloseButtonFontSize.value, fallback.closeButtonFontSize),
    closeButtonBorderRadius: numberOr(elements.aiPopupCloseButtonBorderRadius.value, fallback.closeButtonBorderRadius),
    closeButtonPaddingX: numberOr(elements.aiPopupCloseButtonPaddingX.value, fallback.closeButtonPaddingX),
    closeButtonPaddingY: numberOr(elements.aiPopupCloseButtonPaddingY.value, fallback.closeButtonPaddingY),
    closeButtonOffsetX: numberOr(elements.aiPopupCloseButtonOffsetX.value, fallback.closeButtonOffsetX),
    closeButtonOffsetY: numberOr(elements.aiPopupCloseButtonOffsetY.value, fallback.closeButtonOffsetY),
    closeButtonBackgroundColor: elements.aiPopupCloseButtonBackgroundColor.value || fallback.closeButtonBackgroundColor,
    closeButtonBackgroundOpacity: clampOpacity(elements.aiPopupCloseButtonBackgroundOpacity.value, fallback.closeButtonBackgroundOpacity),
    closeButtonTextColor: elements.aiPopupCloseButtonTextColor.value || fallback.closeButtonTextColor,
    closeButtonTextOpacity: clampOpacity(elements.aiPopupCloseButtonTextOpacity.value, fallback.closeButtonTextOpacity),
    closeButtonBorderColor: elements.aiPopupCloseButtonBorderColor.value || fallback.closeButtonBorderColor,
    closeButtonBorderOpacity: clampOpacity(elements.aiPopupCloseButtonBorderOpacity.value, fallback.closeButtonBorderOpacity),
    closeButtonHoverBackgroundColor: elements.aiPopupCloseButtonHoverBackgroundColor.value || fallback.closeButtonHoverBackgroundColor,
    closeButtonHoverBackgroundOpacity: clampOpacity(elements.aiPopupCloseButtonHoverBackgroundOpacity.value, fallback.closeButtonHoverBackgroundOpacity),
    closeButtonHoverTextColor: elements.aiPopupCloseButtonHoverTextColor.value || fallback.closeButtonHoverTextColor,
    closeButtonHoverTextOpacity: clampOpacity(elements.aiPopupCloseButtonHoverTextOpacity.value, fallback.closeButtonHoverTextOpacity)
  };
}

function applyAiPopupAppearancePreview(appearance) {
  if (!elements.aiPopupPreview || !elements.aiPopupPreviewText || !elements.aiPopupPreviewCloseButton) {
    return;
  }

  const previewScale = Math.max(0.2, Number(elements.aiPopupPreviewScale?.value || 1));

  elements.aiPopupPreview.style.width = `${appearance.popupWidth}px`;
  elements.aiPopupPreview.style.height = `${appearance.popupHeight}px`;
  elements.aiPopupPreview.style.backgroundColor = hexToRgba(appearance.bodyBackgroundColor, appearance.bodyBackgroundOpacity);
  elements.aiPopupPreview.style.transform = `scale(${previewScale})`;
  elements.aiPopupPreview.style.transformOrigin = 'top left';

  elements.aiPopupPreviewText.style.color = hexToRgba(appearance.textColor, appearance.textOpacity);
  elements.aiPopupPreviewText.style.fontSize = `${appearance.textFontSize}px`;
  elements.aiPopupPreviewText.style.lineHeight = String(appearance.textLineHeight);
  elements.aiPopupPreviewText.style.textAlign = appearance.textAlign;
  elements.aiPopupPreviewText.style.backgroundColor = hexToRgba(appearance.cardBackgroundColor, appearance.cardBackgroundOpacity);
  elements.aiPopupPreviewText.style.borderColor = hexToRgba(appearance.cardBorderColor, appearance.cardBorderOpacity);
  elements.aiPopupPreviewText.style.borderWidth = `${appearance.cardBorderWidth}px`;
  elements.aiPopupPreviewText.style.borderStyle = appearance.cardBorderWidth > 0 ? 'solid' : 'none';
  elements.aiPopupPreviewText.style.borderRadius = `${appearance.cardBorderRadius}px`;
  elements.aiPopupPreviewText.style.padding = `${appearance.cardPaddingY}px ${appearance.cardPaddingX}px`;
  elements.aiPopupPreviewText.style.boxShadow = `${appearance.cardShadowOffsetX}px ${appearance.cardShadowOffsetY}px ${appearance.cardShadowBlur}px ${appearance.cardShadowSpread}px ${hexToRgba(appearance.cardShadowColor, appearance.cardShadowOpacity)}`;
  const textShadowBlur = Math.max(0, Number(appearance.textShadowBlur) || 0) + Math.abs(Number(appearance.textShadowSpread) || 0);
  elements.aiPopupPreviewText.style.textShadow = `${appearance.textShadowOffsetX}px ${appearance.textShadowOffsetY}px ${textShadowBlur}px ${hexToRgba(appearance.textShadowColor, appearance.textShadowOpacity)}`;

  elements.aiPopupPreviewCloseButton.style.fontSize = `${appearance.closeButtonFontSize}px`;
  elements.aiPopupPreviewCloseButton.style.borderRadius = `${appearance.closeButtonBorderRadius}px`;
  elements.aiPopupPreviewCloseButton.style.padding = `${appearance.closeButtonPaddingY}px ${appearance.closeButtonPaddingX}px`;
  elements.aiPopupPreviewCloseButton.style.left = `${appearance.closeButtonOffsetX}px`;
  elements.aiPopupPreviewCloseButton.style.top = `${appearance.closeButtonOffsetY}px`;
  elements.aiPopupPreviewCloseButton.style.backgroundColor = hexToRgba(appearance.closeButtonBackgroundColor, appearance.closeButtonBackgroundOpacity);
  elements.aiPopupPreviewCloseButton.style.color = hexToRgba(appearance.closeButtonTextColor, appearance.closeButtonTextOpacity);
  elements.aiPopupPreviewCloseButton.style.borderColor = hexToRgba(appearance.closeButtonBorderColor, appearance.closeButtonBorderOpacity);
  elements.aiPopupPreviewCloseButton.dataset.hoverBg = hexToRgba(appearance.closeButtonHoverBackgroundColor, appearance.closeButtonHoverBackgroundOpacity);
  elements.aiPopupPreviewCloseButton.dataset.hoverColor = hexToRgba(appearance.closeButtonHoverTextColor, appearance.closeButtonHoverTextOpacity);

  if (elements.aiPopupPreviewSize) {
    const scaledWidth = Math.round(appearance.popupWidth * previewScale);
    const scaledHeight = Math.round(appearance.popupHeight * previewScale);
    elements.aiPopupPreviewSize.textContent = t('ai.popupAppearance.previewSize', {
      width: appearance.popupWidth,
      height: appearance.popupHeight,
      scaledWidth,
      scaledHeight
    });
  }
}

function setAiStatus(message, level = 'muted') {
  if (!elements.aiStatus) {
    return;
  }

  elements.aiStatus.textContent = message;
  elements.aiStatus.dataset.level = level;
}

function describeInteractionAction(action, result = {}) {
  if (action === 'text_and_media') {
    return t('ai.interaction.result.textAndMedia');
  }

  if (action === 'media_only') {
    return result.mediaPopupShown
      ? t('ai.interaction.result.mediaOnly')
      : t('ai.interaction.result.mediaOnlyNoMedia');
  }

  if (action === 'skip') {
    return t('ai.interaction.result.skip');
  }

  return t('ai.interaction.result.textOnly');
}

async function showAiTextPopup(text, options = {}) {
  const mediaPopup = getMediaPopup();
  const normalizedText = typeof text === 'string' ? text.trim() : '';
  if (!normalizedText) {
    const message = t('ai.status.emptyPopup');
    setAiStatus(message, 'error');
    log(message);
    return false;
  }

  if (!mediaPopup?.showAiTextPopup) {
    setAiStatus(t('log.aiPreviewUnavailable'), 'error');
    log(t('log.aiPreviewUnavailable'));
    return false;
  }

  const result = await mediaPopup.showAiTextPopup({
    text: normalizedText,
    locale: currentConfig?.language || currentLocale,
    title: t('ai.popup.title'),
    targetLabel: t('ai.popup.subtitle')
  });

  if (!result?.ok) {
    const message = t(result?.errorKey || 'ai.error.requestFailed');
    setAiStatus(message, 'error');
    log(message);
    return false;
  }

  setAiStatus(t('ai.status.popupShown'), 'success');
  log(t('log.aiPopupShown'));
  return true;
}

async function showWebsitePopup(entry) {
  const mediaPopup = getMediaPopup();
  if (!mediaPopup?.showWebsitePopup) {
    log(t('log.websitePreviewUnavailable'));
    return false;
  }

  const result = await mediaPopup.showWebsitePopup(entry);
  if (!result?.ok) {
    log(t(result?.errorKey || 'website.error.openFailed'));
    return false;
  }

  log(t('log.websitePopupShown', { label: entry.label || entry.url }));
  return true;
}

function applyLanguage(locale) {
  currentLocale = resolveLanguage(locale, navigator.language);
  applyStaticTranslations();
  for (const field of shortcutFields) {
    field.input.placeholder = t('shortcuts.placeholder');
  }
  setLogDrawer(elements.logDrawer?.classList.contains('open'));
  updateNumericInputTitles();
  if (currentConfig) {
    renderFolders(currentConfig.folders || []);
    renderWebsiteLibraryPreview();
  }
  if (currentState) {
    renderStateSummary(currentState);
  }
  renderShortcutFeedback();
  applyAiPopupAppearancePreview(getAiPopupAppearanceFromInputs());
}

function setLogDrawer(open) {
  if (!elements.logDrawer || !elements.toggleLogButton) {
    return;
  }

  elements.logDrawer.classList.toggle('open', open);
  elements.toggleLogButton.textContent = open ? t('buttons.collapseLog') : t('buttons.expandLog');
}

function activatePage(pageName) {
  for (const navItem of elements.navItems) {
    navItem.classList.toggle('active', navItem.dataset.page === pageName);
  }

  for (const page of elements.pages) {
    page.classList.toggle('active', page.id === `page-${pageName}`);
  }
}

function activateSection(navItem) {
  const shell = navItem.closest('.settings-shell');
  const target = navItem.dataset.sectionTarget;
  if (!shell || !target) {
    return;
  }

  const navItems = shell.querySelectorAll('.section-nav-item[data-section-target]');
  const panels = shell.querySelectorAll('.section-panel[data-section-panel]');

  for (const item of navItems) {
    item.classList.toggle('active', item === navItem);
  }

  for (const panel of panels) {
    const active = panel.dataset.sectionPanel === target;
    panel.classList.toggle('active', active);
    panel.hidden = !active;
  }
}

function moveElementToMount(element, mount) {
  if (!element || !mount || element.parentElement === mount) {
    return;
  }

  mount.append(element);
}

function organizeSettingsLayout() {
  const mediaScanSettingsMount = document.querySelector('#mediaScanSettingsMount');
  const aiWebsiteMount = document.querySelector('#aiWebsiteMount');
  const advancedProcessRulesMount = document.querySelector('#advancedProcessRulesMount');
  const advancedShortcutsMount = document.querySelector('#advancedShortcutsMount');
  const advancedLanguageMount = document.querySelector('#advancedLanguageMount');
  const recursiveRow = elements.recursive?.closest('.switch-row');
  const websiteHeader = document.querySelector('#page-websites .page-header');
  const websiteShell = document.querySelector('#page-websites .website-shell');
  const processRulesPanel = document.querySelector('#page-schedule .process-rules-panel');
  const shortcutsPanel = document.querySelector('#page-shortcuts > .panel');
  const languagePanel = document.querySelector('#page-language > .panel');

  moveElementToMount(recursiveRow, mediaScanSettingsMount);
  moveElementToMount(processRulesPanel, advancedProcessRulesMount);
  moveElementToMount(shortcutsPanel, advancedShortcutsMount);
  moveElementToMount(languagePanel, advancedLanguageMount);

  if (aiWebsiteMount) {
    moveElementToMount(websiteHeader, aiWebsiteMount);
    moveElementToMount(websiteShell, aiWebsiteMount);
  }
}

function bindLayoutInteractions() {
  for (const navItem of elements.navItems) {
    navItem.addEventListener('click', () => activatePage(navItem.dataset.page));
  }

  for (const sectionNavItem of elements.sectionNavItems) {
    sectionNavItem.addEventListener('click', () => activateSection(sectionNavItem));
  }

  if (elements.toggleLogButton) {
    elements.toggleLogButton.addEventListener('click', () => {
      const open = elements.logDrawer?.classList.contains('open');
      setLogDrawer(!open);
    });
  }

  if (elements.collapseLogButton) {
    elements.collapseLogButton.addEventListener('click', () => setLogDrawer(false));
  }

  if (elements.chaosVideo && elements.closeVideoOnEnded) {
    elements.chaosVideo.addEventListener('change', () => {
      if (elements.chaosVideo.checked) {
        elements.closeVideoOnEnded.checked = false;
        elements.closeVideoOnEnded.disabled = true;
      } else {
        elements.closeVideoOnEnded.disabled = false;
      }
    });
  }

  if (elements.developerMode) {
    elements.developerMode.addEventListener('change', () => {
      updateDeveloperModeUI();
      scheduleAutoSave();
    });
  }
}

function updateDeveloperModeUI() {
  const isDev = elements.developerMode?.checked;
  if (elements.aiApiKey) {
    elements.aiApiKey.type = isDev ? 'password' : 'text';
  }
  if (currentConfig) {
    renderFolders(currentConfig.folders || []);
  }
}

function getInputStep(input) {
  if (!input.step || input.step === 'any') {
    return 1;
  }

  const step = Number(input.step);
  return Number.isFinite(step) && step > 0 ? step : 1;
}

function getStepPrecision(step) {
  const stepText = String(step);
  const decimalIndex = stepText.indexOf('.');
  return decimalIndex === -1 ? 0 : stepText.length - decimalIndex - 1;
}

function getInputBound(input, key, fallback) {
  const value = input[key];
  if (value === '') {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getInputRangeLabel(input) {
  const min = getInputBound(input, 'min', null);
  const max = getInputBound(input, 'max', null);

  if (min !== null && max !== null) {
    return t('input.range.between', { min, max });
  }

  if (min !== null) {
    return t('input.range.min', { min });
  }

  if (max !== null) {
    return t('input.range.max', { max });
  }

  return '';
}

function clampNumberInputValue(input, nextValue) {
  const min = getInputBound(input, 'min', -Infinity);
  const max = getInputBound(input, 'max', Infinity);
  const step = getInputStep(input);
  const precision = getStepPrecision(step);
  const currentValue = Number(input.value);
  const fallbackValue = Number.isFinite(currentValue) ? currentValue : (Number.isFinite(min) ? min : 0);
  let safeValue = Number.isFinite(nextValue) ? nextValue : fallbackValue;

  safeValue = Math.min(max, Math.max(min, safeValue));

  if (step > 0) {
    const base = Number.isFinite(min) ? min : 0;
    safeValue = base + Math.round((safeValue - base) / step) * step;
    safeValue = Math.min(max, Math.max(min, safeValue));
  }

  input.value = precision > 0 ? safeValue.toFixed(precision) : String(Math.round(safeValue));
  return safeValue;
}

function decorateNumericInput(input) {
  if (input.parentElement?.classList.contains('scrub-control')) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'scrub-control';

  if (input.closest('.compact-digital-clock')) {
    wrapper.classList.add('scrub-compact');
  }

  const handle = document.createElement('span');
  handle.className = 'scrub-handle';
  handle.textContent = '↔';
  handle.setAttribute('aria-hidden', 'true');

  const range = document.createElement('span');
  range.className = 'scrub-range';
  range.textContent = getInputRangeLabel(input);
  range.dataset.scrubRange = 'true';

  input.classList.add('scrub-input');
  input.title = range.textContent ? t('input.scrubTitleWithRange', { range: range.textContent }) : t('input.scrubTitle');
  input.parentNode.insertBefore(wrapper, input);
  wrapper.append(input, handle);

  if (range.textContent && !wrapper.classList.contains('scrub-compact')) {
    const meta = document.createElement('div');
    meta.className = 'scrub-meta';
    meta.append(range);
    wrapper.append(meta);
  }
}

function updateNumericInputTitles() {
  for (const input of document.querySelectorAll('input[type="number"]')) {
    const range = input.parentElement?.querySelector('[data-scrub-range="true"]');
    if (range) {
      range.textContent = getInputRangeLabel(input);
    }
    input.title = range?.textContent ? t('input.scrubTitleWithRange', { range: range.textContent }) : t('input.scrubTitle');
  }
}

function bindNumericScrub(input) {
  let dragState = null;

  const stopScrub = (event) => {
    if (!dragState || (event.pointerId !== undefined && event.pointerId !== dragState.pointerId)) {
      return;
    }

    const { moved, pointerId } = dragState;
    dragState = null;
    input.parentElement?.classList.remove('dragging');
    document.body.classList.remove('scrub-active');

    if (pointerId !== undefined) {
      input.releasePointerCapture?.(pointerId);
    }

    if (!moved) {
      input.focus();
      input.select?.();
      return;
    }

    input.dispatchEvent(new Event('change', { bubbles: true }));
  };

  input.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || input.disabled) {
      return;
    }

    dragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startValue: clampNumberInputValue(input, Number(input.value)),
      step: getInputStep(input),
      moved: false
    };

    input.parentElement?.classList.add('dragging');
    document.body.classList.add('scrub-active');
    input.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  input.addEventListener('pointermove', (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragState.startX;
    const stepsMoved = Math.round(deltaX / 18);

    if (stepsMoved === 0 && Math.abs(deltaX) < 4) {
      return;
    }

    dragState.moved = true;
    clampNumberInputValue(input, dragState.startValue + (stepsMoved * dragState.step));
  });

  input.addEventListener('pointerup', stopScrub);
  input.addEventListener('pointercancel', stopScrub);
  input.addEventListener('lostpointercapture', stopScrub);
  input.addEventListener('change', () => clampNumberInputValue(input, Number(input.value)));
  input.addEventListener('blur', () => clampNumberInputValue(input, Number(input.value)));
}

function initNumericScrubbers() {
  const numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));

  for (const input of numberInputs) {
    decorateNumericInput(input);
    bindNumericScrub(input);
    clampNumberInputValue(input, Number(input.value));
  }
}

function setDirectionMode(targetId, value) {
  const input = document.querySelector(`#${targetId}`);
  if (!input) {
    return;
  }

  input.value = value;

  for (const button of directionModeButtons) {
    if (button.dataset.target !== targetId) {
      continue;
    }

    const active = button.dataset.value === value;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  }
}

function copySharedSizeValuesToSeparatePanels() {
  elements.imageBaseWidth.value = elements.sharedBaseWidth.value;
  elements.imageBaseHeight.value = elements.sharedBaseHeight.value;
  elements.imageSizeJitter.value = elements.sharedSizeJitter.value;
  elements.imageCompensationMultiplier.value = elements.sharedCompensationMultiplier.value;
  elements.imageCompensationThreshold.value = elements.sharedCompensationThreshold.value;
  elements.videoBaseWidth.value = elements.sharedBaseWidth.value;
  elements.videoBaseHeight.value = elements.sharedBaseHeight.value;
  elements.videoSizeJitter.value = elements.sharedSizeJitter.value;
  elements.videoCompensationMultiplier.value = elements.sharedCompensationMultiplier.value;
  elements.videoCompensationThreshold.value = elements.sharedCompensationThreshold.value;
  setDirectionMode('imageSizeJitterMode', elements.sharedSizeJitterMode.value);
  setDirectionMode('videoSizeJitterMode', elements.sharedSizeJitterMode.value);
}

function syncSharedSizeValuesFromConfig(config) {
  elements.sharedBaseWidth.value = config.imageBaseWidth;
  elements.sharedBaseHeight.value = config.imageBaseHeight;
  elements.sharedSizeJitter.value = config.imageSizeJitter;
  elements.sharedCompensationMultiplier.value = config.imageCompensationMultiplier;
  elements.sharedCompensationThreshold.value = config.imageCompensationThreshold;
  setDirectionMode('sharedSizeJitterMode', config.imageSizeJitterMode);
}

function updateSizeSettingsLayout({ syncSeparate = false } = {}) {
  const separated = elements.separateMediaSizeSettings.checked;
  elements.sharedSizePanel.hidden = separated;
  elements.separateSizePanels.hidden = !separated;

  if (separated && syncSeparate) {
    copySharedSizeValuesToSeparatePanels();
  }
}

function bindDirectionModeButtons() {
  for (const button of directionModeButtons) {
    button.addEventListener('click', async () => {
      setDirectionMode(button.dataset.target, button.dataset.value);
      await triggerAutoSave();
    });
  }
}

function bindAutoSaveInputs() {
  const autoSaveFields = document.querySelectorAll('.page input, .page select, .page textarea');
  for (const field of autoSaveFields) {
    if (AUTO_SAVE_EXCLUDED_IDS.has(field.id) || field.type === 'hidden' || field.type === 'button' || field.type === 'submit' || field.type === 'reset') {
      continue;
    }

    const trigger = (event) => {
      const isAppearanceField = Boolean(field.closest('[data-section-panel="ai-popup-appearance"]'));
      const shouldSaveImmediately = field.type === 'checkbox'
        || field.tagName === 'SELECT'
        || (isAppearanceField && event.type === 'change');
      void scheduleAutoSave({ immediate: shouldSaveImmediately });
    };

    field.addEventListener('change', trigger);

    if (field.tagName === 'TEXTAREA' || field.type === 'text' || field.type === 'password' || field.type === 'number' || field.type === 'color' || field.type === 'range') {
      field.addEventListener('input', trigger);
    }
  }
}

function bindAiPopupAppearancePreview() {
  const previewFields = [
    elements.aiPopupWidth,
    elements.aiPopupHeight,
    elements.aiPopupPreviewScale,
    elements.aiPopupBodyBackgroundColor,
    elements.aiPopupBodyBackgroundOpacity,
    elements.aiPopupTextColor,
    elements.aiPopupTextOpacity,
    elements.aiPopupTextFontSize,
    elements.aiPopupTextLineHeight,
    elements.aiPopupTextAlign,
    elements.aiPopupCardBackgroundColor,
    elements.aiPopupCardBackgroundOpacity,
    elements.aiPopupCardBorderColor,
    elements.aiPopupCardBorderOpacity,
    elements.aiPopupCardBorderWidth,
    elements.aiPopupCardBorderRadius,
    elements.aiPopupCardPaddingX,
    elements.aiPopupCardPaddingY,
    elements.aiPopupCardShadowColor,
    elements.aiPopupCardShadowOpacity,
    elements.aiPopupCardShadowBlur,
    elements.aiPopupCardShadowSpread,
    elements.aiPopupCardShadowOffsetX,
    elements.aiPopupCardShadowOffsetY,
    elements.aiPopupTextShadowColor,
    elements.aiPopupTextShadowOpacity,
    elements.aiPopupTextShadowBlur,
    elements.aiPopupTextShadowSpread,
    elements.aiPopupTextShadowOffsetX,
    elements.aiPopupTextShadowOffsetY,
    elements.aiPopupCloseButtonFontSize,
    elements.aiPopupCloseButtonBorderRadius,
    elements.aiPopupCloseButtonPaddingX,
    elements.aiPopupCloseButtonPaddingY,
    elements.aiPopupCloseButtonOffsetX,
    elements.aiPopupCloseButtonOffsetY,
    elements.aiPopupCloseButtonBackgroundColor,
    elements.aiPopupCloseButtonBackgroundOpacity,
    elements.aiPopupCloseButtonTextColor,
    elements.aiPopupCloseButtonTextOpacity,
    elements.aiPopupCloseButtonBorderColor,
    elements.aiPopupCloseButtonBorderOpacity,
    elements.aiPopupCloseButtonHoverBackgroundColor,
    elements.aiPopupCloseButtonHoverBackgroundOpacity,
    elements.aiPopupCloseButtonHoverTextColor,
    elements.aiPopupCloseButtonHoverTextOpacity
  ];

  const render = () => applyAiPopupAppearancePreview(getAiPopupAppearanceFromInputs());

  for (const field of previewFields) {
    if (!field) {
      continue;
    }

    field.addEventListener('input', render);
    field.addEventListener('change', render);
  }

  if (elements.aiPopupPreviewCloseButton) {
    elements.aiPopupPreviewCloseButton.addEventListener('mouseenter', () => {
      elements.aiPopupPreviewCloseButton.style.backgroundColor = elements.aiPopupPreviewCloseButton.dataset.hoverBg || elements.aiPopupPreviewCloseButton.style.backgroundColor;
      elements.aiPopupPreviewCloseButton.style.color = elements.aiPopupPreviewCloseButton.dataset.hoverColor || elements.aiPopupPreviewCloseButton.style.color;
    });
    elements.aiPopupPreviewCloseButton.addEventListener('mouseleave', () => render());
    elements.aiPopupPreviewCloseButton.addEventListener('click', (event) => event.preventDefault());
  }
}

function getShortcutField(key) {
  return shortcutFields.find((field) => field.key === key) || null;
}

function getShortcutValues() {
  return Object.fromEntries(shortcutFields.map((field) => [field.key, field.input.value.trim()]));
}

function isModifierOnlyKey(key) {
  return key === 'Control' || key === 'Shift' || key === 'Alt' || key === 'Meta';
}

function getAcceleratorKey(event) {
  if (/^F\d{1,2}$/i.test(event.key)) {
    return event.key.toUpperCase();
  }

  if (/^Key[A-Z]$/.test(event.code)) {
    return event.code.slice(3);
  }

  if (/^Digit\d$/.test(event.code)) {
    return event.code.slice(5);
  }

  if (/^Numpad\d$/.test(event.code)) {
    return event.code.slice(6);
  }

  const keyMap = {
    ArrowUp: 'Up',
    ArrowDown: 'Down',
    ArrowLeft: 'Left',
    ArrowRight: 'Right',
    ' ': 'Space',
    Spacebar: 'Space',
    Enter: 'Enter',
    Escape: 'Esc',
    Tab: 'Tab',
    Backspace: 'Backspace',
    Delete: 'Delete',
    Insert: 'Insert',
    Home: 'Home',
    End: 'End',
    PageUp: 'PageUp',
    PageDown: 'PageDown'
  };

  return keyMap[event.key] || null;
}

function recordShortcutFromEvent(event) {
  if (isModifierOnlyKey(event.key)) {
    return { errorKey: 'shortcuts.error.needNonModifier' };
  }

  const key = getAcceleratorKey(event);
  if (!key) {
    return { errorKey: 'shortcuts.error.unsupportedKey' };
  }

  const parts = [];
  if (event.ctrlKey) {
    parts.push('Ctrl');
  }
  if (event.altKey) {
    parts.push('Alt');
  }
  if (event.shiftKey) {
    parts.push('Shift');
  }
  if (event.metaKey) {
    parts.push('Super');
  }
  parts.push(key);
  return { accelerator: parts.join('+') };
}

function buildShortcutValidation(values = getShortcutValues()) {
  const validation = Object.fromEntries(shortcutFields.map((field) => [field.key, null]));
  const duplicates = new Map();

  for (const field of shortcutFields) {
    const value = String(values[field.key] || '').trim();
    if (!value) {
      continue;
    }

    const normalized = value.toLowerCase();
    const items = duplicates.get(normalized) || [];
    items.push(field.key);
    duplicates.set(normalized, items);
  }

  for (const keys of duplicates.values()) {
    if (keys.length < 2) {
      continue;
    }

    for (const key of keys) {
      const others = keys
        .filter((item) => item !== key)
        .map((item) => t(getShortcutField(item)?.labelKey || item))
        .join(' / ');
      validation[key] = {
        level: 'error',
        message: t('shortcuts.status.conflict', { other: others })
      };
    }
  }

  return validation;
}

function getShortcutBackendFeedback(field) {
  const status = currentState?.shortcutRegistration?.[field.key]?.status;
  if (!status) {
    return null;
  }

  if (status === 'registered') {
    return { level: 'success', message: t('shortcuts.status.registered') };
  }

  if (status === 'failed') {
    return { level: 'warning', message: t('shortcuts.status.unavailable') };
  }

  if (status === 'invalid') {
    return { level: 'error', message: t('shortcuts.status.invalid') };
  }

  if (status === 'duplicate') {
    return { level: 'error', message: t('shortcuts.status.conflictSaved') };
  }

  return { level: 'muted', message: t('shortcuts.status.empty') };
}

function renderShortcutFeedback(validation = buildShortcutValidation()) {
  for (const field of shortcutFields) {
    const transient = shortcutTransientFeedback[field.key];
    const localValidation = validation[field.key];
    const backendFeedback = getShortcutBackendFeedback(field);
    const value = field.input.value.trim();
    const savedValue = String(currentConfig?.[field.key] || '').trim();
    const isDirty = value !== savedValue;
    const feedback = transient
      || localValidation
      || (isDirty ? { level: 'muted', message: value ? t('shortcuts.status.unsaved') : t('shortcuts.status.empty') } : null)
      || backendFeedback
      || { level: 'muted', message: value ? t('shortcuts.status.unsaved') : t('shortcuts.status.empty') };

    field.status.textContent = feedback.message;
    field.status.classList.toggle('is-error', feedback.level === 'error');
    field.status.classList.toggle('is-warning', feedback.level === 'warning');
    field.status.classList.toggle('is-success', feedback.level === 'success');
    field.input.classList.toggle('is-error', feedback.level === 'error');
    field.input.classList.toggle('is-success', feedback.level === 'success');
  }
}

function bindShortcutRecorders() {
  for (const field of shortcutFields) {
    field.input.addEventListener('focus', () => {
      field.input.classList.add('is-recording');
      shortcutTransientFeedback[field.key] = {
        level: 'warning',
        message: t('shortcuts.status.recording')
      };
      renderShortcutFeedback();
    });

    field.input.addEventListener('blur', async () => {
      field.input.classList.remove('is-recording');
      delete shortcutTransientFeedback[field.key];
      renderShortcutFeedback();

      if (!currentConfig) {
        return;
      }

      const nextValue = field.input.value.trim();
      const currentValue = String(currentConfig[field.key] || '').trim();
      if (nextValue === currentValue) {
        return;
      }

      const result = await saveConfig();
      if (!result?.blocked) {
        log(t('log.shortcutsSaved'));
      }
    });

    field.input.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        return;
      }

      event.preventDefault();
      if (event.repeat) {
        return;
      }

      if ((event.key === 'Backspace' || event.key === 'Delete') && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
        field.input.value = '';
        delete shortcutTransientFeedback[field.key];
        renderShortcutFeedback();
        return;
      }

      if (event.key === 'Escape' && !event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey) {
        field.input.blur();
        return;
      }

      const recorded = recordShortcutFromEvent(event);
      if (recorded.errorKey) {
        shortcutTransientFeedback[field.key] = {
          level: 'error',
          message: t(recorded.errorKey)
        };
        renderShortcutFeedback();
        return;
      }

      field.input.value = recorded.accelerator;
      delete shortcutTransientFeedback[field.key];
      renderShortcutFeedback();
    });
  }
}

function collectConfig() {
  const separateMediaSizeSettings = elements.separateMediaSizeSettings.checked;
  const sharedBaseWidth = Number(elements.sharedBaseWidth.value);
  const sharedBaseHeight = Number(elements.sharedBaseHeight.value);
  const sharedSizeJitter = Number(elements.sharedSizeJitter.value);
  const sharedSizeJitterMode = elements.sharedSizeJitterMode.value;
  const sharedCompensationMultiplier = Number(elements.sharedCompensationMultiplier.value);
  const sharedCompensationThreshold = Number(elements.sharedCompensationThreshold.value);
  const aiConfig = getAiConfig();
  const aiPopupAppearance = getAiPopupAppearanceFromInputs();
  const websiteLibrary = parseWebsiteLibraryText(elements.websiteLibraryText.value);

  return {
    ...currentConfig,
    language: elements.language.value,
    startShortcut: elements.startShortcut.value.trim(),
    pauseShortcut: elements.pauseShortcut.value.trim(),
    stopShortcut: elements.stopShortcut.value.trim(),
    closeAllShortcut: elements.closeAllShortcut.value.trim(),
    recursive: elements.recursive.checked,
    gradual: elements.gradual.checked,
    alwaysOnTop: elements.alwaysOnTop.checked,
    fullscreen: elements.fullscreen.checked,
    muted: elements.muted.checked,
    closeVideoOnEnded: elements.closeVideoOnEnded.checked,
    chaosVideo: elements.chaosVideo.checked,
    clickToClose: elements.clickToClose.checked,
    randomCloseButton: elements.randomCloseButton.checked,
    disableManualClose: elements.disableManualClose.checked,
    developerMode: elements.developerMode.checked,
    closeButtonText: elements.closeButtonText.value,
    closeButtonFontSize: Number(elements.closeButtonFontSize.value),
    closeButtonBorderRadius: Number(elements.closeButtonBorderRadius.value),
    closeButtonPaddingX: Number(elements.closeButtonPaddingX.value),
    closeButtonPaddingY: Number(elements.closeButtonPaddingY.value),
    closeButtonOffsetX: Number(elements.closeButtonOffsetX.value),
    closeButtonOffsetY: Number(elements.closeButtonOffsetY.value),
    closeButtonBackgroundColor: elements.closeButtonBackgroundColor.value,
    closeButtonTextColor: elements.closeButtonTextColor.value,
    closeButtonBorderColor: elements.closeButtonBorderColor.value,
    closeButtonHoverBackgroundColor: elements.closeButtonHoverBackgroundColor.value,
    closeButtonHoverTextColor: elements.closeButtonHoverTextColor.value,
    intervalHours: Number(elements.intervalHours.value),
    intervalMinutes: Number(elements.intervalMinutes.value),
    intervalSeconds: Number(elements.intervalSeconds.value),
    jitterHours: Number(elements.jitterHours.value),
    jitterMinutes: Number(elements.jitterMinutes.value),
    jitterSeconds: Number(elements.jitterSeconds.value),
    popupLifetimeHours: Number(elements.popupLifetimeHours.value),
    popupLifetimeMinutes: Number(elements.popupLifetimeMinutes.value),
    popupLifetimeSeconds: Number(elements.popupLifetimeSeconds.value),
    popupLifetimeJitterHours: Number(elements.popupLifetimeJitterHours.value),
    popupLifetimeJitterMinutes: Number(elements.popupLifetimeJitterMinutes.value),
    popupLifetimeJitterSeconds: Number(elements.popupLifetimeJitterSeconds.value),
    popupLifetimeJitterMode: elements.popupLifetimeJitterMode.value,
    burstCount: Number(elements.burstCount.value),
    minWindows: Number(elements.minWindows.value),
    maxWindows: elements.unlimitedWindows.checked ? 'unlimited' : Number(elements.maxWindows.value),
    maxVideoWindows: Number(elements.maxVideoWindows.value),
    order: elements.order.value,
    wallpaper: {
      enabled: elements.wallpaperEnabled.checked,
      intervalMinutes: Number(elements.wallpaperIntervalMinutes.value),
      minResolution: Number(elements.wallpaperMinResolution.value),
      maxRatioDeviation: Number(elements.wallpaperMaxRatioDeviation.value)
    },
    processRules: {
      enabled: elements.processRulesEnabled.checked,
      blacklist: parseProcessRuleText(elements.processRulesBlacklist.value),
      whitelist: parseProcessRuleText(elements.processRulesWhitelist.value),
      autoStartOnWhitelist: elements.processRulesAutoStartOnWhitelist.checked,
      stopOnBlacklist: elements.processRulesStopOnBlacklist.checked,
      stopOnWhitelistExit: elements.processRulesStopOnWhitelistExit.checked,
      checkIntervalSeconds: Number(elements.processRulesCheckIntervalSeconds.value),
      autoProfiles: elements.autoProfileConfigPath?.value ? [{
        configPath: elements.autoProfileConfigPath.value,
        processes: parseProcessRuleText(elements.autoProfileProcesses.value)
      }] : []
    },
    websiteLibrary: {
      enabled: elements.websiteLibraryEnabled.checked,
      entries: websiteLibrary.entries
    },
    popupDisplayIds: getPopupDisplayIds(),
    separateMediaSizeSettings,
    imageBaseWidth: separateMediaSizeSettings ? Number(elements.imageBaseWidth.value) : sharedBaseWidth,
    imageBaseHeight: separateMediaSizeSettings ? Number(elements.imageBaseHeight.value) : sharedBaseHeight,
    imageSizeJitter: separateMediaSizeSettings ? Number(elements.imageSizeJitter.value) : sharedSizeJitter,
    imageSizeJitterMode: separateMediaSizeSettings ? elements.imageSizeJitterMode.value : sharedSizeJitterMode,
    imageCompensationMultiplier: separateMediaSizeSettings ? Number(elements.imageCompensationMultiplier.value) : sharedCompensationMultiplier,
    imageCompensationThreshold: separateMediaSizeSettings ? Number(elements.imageCompensationThreshold.value) : sharedCompensationThreshold,
    videoBaseWidth: separateMediaSizeSettings ? Number(elements.videoBaseWidth.value) : sharedBaseWidth,
    videoBaseHeight: separateMediaSizeSettings ? Number(elements.videoBaseHeight.value) : sharedBaseHeight,
    videoSizeJitter: separateMediaSizeSettings ? Number(elements.videoSizeJitter.value) : sharedSizeJitter,
    videoSizeJitterMode: separateMediaSizeSettings ? elements.videoSizeJitterMode.value : sharedSizeJitterMode,
    videoCompensationMultiplier: separateMediaSizeSettings ? Number(elements.videoCompensationMultiplier.value) : sharedCompensationMultiplier,
    videoCompensationThreshold: separateMediaSizeSettings ? Number(elements.videoCompensationThreshold.value) : sharedCompensationThreshold,
    ai: {
      ...aiConfig,
      provider: elements.aiProvider.value,
      model: elements.aiModel.value,
      apiKey: elements.aiApiKey.value,
      singlePopupMode: elements.aiSinglePopupMode.checked,
      immediateReplyEnabled: elements.aiImmediateReplyEnabled.checked,
      interactionEnabled: elements.aiInteractionEnabled.checked,
      interactionIntervalHours: Number(elements.aiInteractionIntervalHours.value),
      interactionIntervalMinutes: Number(elements.aiInteractionIntervalMinutes.value),
      interactionIntervalSeconds: Number(elements.aiInteractionIntervalSeconds.value),
      interactionTone: elements.aiInteractionTone.value,
      interactionIncludeForegroundApp: elements.aiInteractionIncludeForegroundApp.checked,
      systemPrompt: elements.aiSystemPrompt.value,
      knowledgeBase: elements.aiKnowledgeBase.value,
      contextMemory: elements.aiContextMemory.value,
      profile: {
        age: elements.aiProfileAge.value,
        name: elements.aiProfileName.value,
        companionName: elements.aiProfileCompanionName.value,
        companionRole: elements.aiProfileCompanionRole.value,
        appearance: elements.aiProfileAppearance.value,
        dailyPersona: elements.aiProfileDailyPersona.value,
        sceneLibrary: elements.aiSceneLibrary.value
      },
      popupScheduleEnabled: elements.aiPopupScheduleEnabled.checked,
      popupAppearance: aiPopupAppearance
    }
  };
}

function applyConfig(config, displays = []) {
  currentConfig = config;
  elements.language.value = config.language || 'system';
  elements.startShortcut.value = config.startShortcut || '';
  elements.pauseShortcut.value = config.pauseShortcut || '';
  elements.stopShortcut.value = config.stopShortcut || '';
  elements.closeAllShortcut.value = config.closeAllShortcut || '';
  const ai = getAiConfig(config);
  elements.aiProvider.value = ai.provider;
  elements.aiModel.value = ai.model;
  elements.aiApiKey.value = ai.apiKey;
  elements.aiSinglePopupMode.checked = ai.singlePopupMode;
  elements.aiImmediateReplyEnabled.checked = ai.immediateReplyEnabled;
  elements.aiInteractionEnabled.checked = ai.interactionEnabled;
  elements.aiInteractionIntervalHours.value = ai.interactionIntervalHours;
  elements.aiInteractionIntervalMinutes.value = ai.interactionIntervalMinutes;
  elements.aiInteractionIntervalSeconds.value = ai.interactionIntervalSeconds;
  elements.aiInteractionTone.value = ai.interactionTone;
  elements.aiInteractionIncludeForegroundApp.checked = ai.interactionIncludeForegroundApp;
  elements.aiSystemPrompt.value = ai.systemPrompt;
  elements.aiKnowledgeBase.value = ai.knowledgeBase;
  elements.aiContextMemory.value = ai.contextMemory;
  elements.aiProfileAge.value = ai.profile.age;
  elements.aiProfileName.value = ai.profile.name;
  elements.aiProfileCompanionName.value = ai.profile.companionName;
  elements.aiProfileCompanionRole.value = ai.profile.companionRole;
  elements.aiProfileAppearance.value = ai.profile.appearance;
  elements.aiProfileDailyPersona.value = ai.profile.dailyPersona;
  elements.aiSceneLibrary.value = ai.profile.sceneLibrary;
  elements.aiPopupScheduleEnabled.checked = ai.popupScheduleEnabled;
  elements.aiPopupPreviewScale.value = elements.aiPopupPreviewScale.value || '1';
  elements.aiPopupWidth.value = ai.popupAppearance.popupWidth;
  elements.aiPopupHeight.value = ai.popupAppearance.popupHeight;
  elements.aiPopupBodyBackgroundColor.value = ai.popupAppearance.bodyBackgroundColor;
  elements.aiPopupBodyBackgroundOpacity.value = ai.popupAppearance.bodyBackgroundOpacity;
  elements.aiPopupTextColor.value = ai.popupAppearance.textColor;
  elements.aiPopupTextOpacity.value = ai.popupAppearance.textOpacity;
  elements.aiPopupTextFontSize.value = ai.popupAppearance.textFontSize;
  elements.aiPopupTextLineHeight.value = ai.popupAppearance.textLineHeight;
  elements.aiPopupTextAlign.value = ai.popupAppearance.textAlign;
  elements.aiPopupCardBackgroundColor.value = ai.popupAppearance.cardBackgroundColor;
  elements.aiPopupCardBackgroundOpacity.value = ai.popupAppearance.cardBackgroundOpacity;
  elements.aiPopupCardBorderColor.value = ai.popupAppearance.cardBorderColor;
  elements.aiPopupCardBorderOpacity.value = ai.popupAppearance.cardBorderOpacity;
  elements.aiPopupCardBorderWidth.value = ai.popupAppearance.cardBorderWidth;
  elements.aiPopupCardBorderRadius.value = ai.popupAppearance.cardBorderRadius;
  elements.aiPopupCardPaddingX.value = ai.popupAppearance.cardPaddingX;
  elements.aiPopupCardPaddingY.value = ai.popupAppearance.cardPaddingY;
  elements.aiPopupCardShadowColor.value = ai.popupAppearance.cardShadowColor;
  elements.aiPopupCardShadowOpacity.value = ai.popupAppearance.cardShadowOpacity;
  elements.aiPopupCardShadowBlur.value = ai.popupAppearance.cardShadowBlur;
  elements.aiPopupCardShadowSpread.value = ai.popupAppearance.cardShadowSpread;
  elements.aiPopupCardShadowOffsetX.value = ai.popupAppearance.cardShadowOffsetX;
  elements.aiPopupCardShadowOffsetY.value = ai.popupAppearance.cardShadowOffsetY;
  elements.aiPopupTextShadowColor.value = ai.popupAppearance.textShadowColor;
  elements.aiPopupTextShadowOpacity.value = ai.popupAppearance.textShadowOpacity;
  elements.aiPopupTextShadowBlur.value = ai.popupAppearance.textShadowBlur;
  elements.aiPopupTextShadowSpread.value = ai.popupAppearance.textShadowSpread;
  elements.aiPopupTextShadowOffsetX.value = ai.popupAppearance.textShadowOffsetX;
  elements.aiPopupTextShadowOffsetY.value = ai.popupAppearance.textShadowOffsetY;
  elements.aiPopupCloseButtonFontSize.value = ai.popupAppearance.closeButtonFontSize;
  elements.aiPopupCloseButtonBorderRadius.value = ai.popupAppearance.closeButtonBorderRadius;
  elements.aiPopupCloseButtonPaddingX.value = ai.popupAppearance.closeButtonPaddingX;
  elements.aiPopupCloseButtonPaddingY.value = ai.popupAppearance.closeButtonPaddingY;
  elements.aiPopupCloseButtonOffsetX.value = ai.popupAppearance.closeButtonOffsetX;
  elements.aiPopupCloseButtonOffsetY.value = ai.popupAppearance.closeButtonOffsetY;
  elements.aiPopupCloseButtonBackgroundColor.value = ai.popupAppearance.closeButtonBackgroundColor;
  elements.aiPopupCloseButtonBackgroundOpacity.value = ai.popupAppearance.closeButtonBackgroundOpacity;
  elements.aiPopupCloseButtonTextColor.value = ai.popupAppearance.closeButtonTextColor;
  elements.aiPopupCloseButtonTextOpacity.value = ai.popupAppearance.closeButtonTextOpacity;
  elements.aiPopupCloseButtonBorderColor.value = ai.popupAppearance.closeButtonBorderColor;
  elements.aiPopupCloseButtonBorderOpacity.value = ai.popupAppearance.closeButtonBorderOpacity;
  elements.aiPopupCloseButtonHoverBackgroundColor.value = ai.popupAppearance.closeButtonHoverBackgroundColor;
  elements.aiPopupCloseButtonHoverBackgroundOpacity.value = ai.popupAppearance.closeButtonHoverBackgroundOpacity;
  elements.aiPopupCloseButtonHoverTextColor.value = ai.popupAppearance.closeButtonHoverTextColor;
  elements.aiPopupCloseButtonHoverTextOpacity.value = ai.popupAppearance.closeButtonHoverTextOpacity;
  elements.recursive.checked = config.recursive;
  elements.gradual.checked = config.gradual;
  elements.alwaysOnTop.checked = config.alwaysOnTop;
  elements.fullscreen.checked = config.fullscreen;
  elements.muted.checked = config.muted;
  elements.closeVideoOnEnded.checked = Boolean(config.closeVideoOnEnded);
  elements.chaosVideo.checked = Boolean(config.chaosVideo);
  if (elements.chaosVideo.checked) {
    elements.closeVideoOnEnded.checked = false;
    elements.closeVideoOnEnded.disabled = true;
  } else {
    elements.closeVideoOnEnded.disabled = false;
  }
  elements.clickToClose.checked = config.clickToClose;
  elements.randomCloseButton.checked = config.randomCloseButton;
  elements.disableManualClose.checked = config.disableManualClose;
  elements.developerMode.checked = Boolean(config.developerMode);
  if (elements.aiApiKey) {
    elements.aiApiKey.type = elements.developerMode.checked ? 'password' : 'text';
  }
  elements.closeButtonText.value = config.closeButtonText || '';
  elements.closeButtonFontSize.value = config.closeButtonFontSize;
  elements.closeButtonBorderRadius.value = config.closeButtonBorderRadius;
  elements.closeButtonPaddingX.value = config.closeButtonPaddingX;
  elements.closeButtonPaddingY.value = config.closeButtonPaddingY;
  elements.closeButtonOffsetX.value = config.closeButtonOffsetX;
  elements.closeButtonOffsetY.value = config.closeButtonOffsetY;
  elements.closeButtonBackgroundColor.value = config.closeButtonBackgroundColor;
  elements.closeButtonTextColor.value = config.closeButtonTextColor;
  elements.closeButtonBorderColor.value = config.closeButtonBorderColor;
  elements.closeButtonHoverBackgroundColor.value = config.closeButtonHoverBackgroundColor;
  elements.closeButtonHoverTextColor.value = config.closeButtonHoverTextColor;
  elements.intervalHours.value = config.intervalHours;
  elements.intervalMinutes.value = config.intervalMinutes;
  elements.intervalSeconds.value = config.intervalSeconds;
  elements.jitterHours.value = config.jitterHours;
  elements.jitterMinutes.value = config.jitterMinutes;
  elements.jitterSeconds.value = config.jitterSeconds;
  elements.popupLifetimeHours.value = config.popupLifetimeHours;
  elements.popupLifetimeMinutes.value = config.popupLifetimeMinutes;
  elements.popupLifetimeSeconds.value = config.popupLifetimeSeconds;
  elements.popupLifetimeJitterHours.value = config.popupLifetimeJitterHours;
  elements.popupLifetimeJitterMinutes.value = config.popupLifetimeJitterMinutes;
  elements.popupLifetimeJitterSeconds.value = config.popupLifetimeJitterSeconds;
  setDirectionMode('popupLifetimeJitterMode', config.popupLifetimeJitterMode);
  elements.burstCount.value = config.burstCount;
  elements.minWindows.value = config.minWindows;
  elements.unlimitedWindows.checked = config.maxWindows === 'unlimited';
  elements.maxWindows.disabled = elements.unlimitedWindows.checked;
  elements.maxWindows.value = config.maxWindows === 'unlimited' ? 8 : config.maxWindows;
  elements.maxVideoWindows.value = config.maxVideoWindows;
  elements.unlimitedWarning.hidden = !elements.unlimitedWindows.checked;
  elements.order.value = config.order;
  
  const wallpaper = config.wallpaper || { enabled: false, intervalMinutes: 60, minResolution: 0, maxRatioDeviation: 0.20 };
  elements.wallpaperEnabled.checked = wallpaper.enabled;
  elements.wallpaperIntervalMinutes.value = wallpaper.intervalMinutes;
  elements.wallpaperMinResolution.value = wallpaper.minResolution;
  elements.wallpaperMaxRatioDeviation.value = wallpaper.maxRatioDeviation;

  const processRules = getProcessRules(config);
  elements.processRulesEnabled.checked = processRules.enabled;
  elements.processRulesBlacklist.value = serializeProcessRuleList(processRules.blacklist);
  elements.processRulesWhitelist.value = serializeProcessRuleList(processRules.whitelist);
  elements.processRulesAutoStartOnWhitelist.checked = processRules.autoStartOnWhitelist;
  elements.processRulesStopOnBlacklist.checked = processRules.stopOnBlacklist;
  elements.processRulesStopOnWhitelistExit.checked = processRules.stopOnWhitelistExit;
  elements.processRulesCheckIntervalSeconds.value = processRules.checkIntervalSeconds;

  if (elements.autoProfileConfigPath) {
    const autoProfile = processRules.autoProfiles?.[0] || { configPath: '', processes: [] };
    elements.autoProfileConfigPath.value = autoProfile.configPath || '';
    elements.autoProfileProcesses.value = serializeProcessRuleList(autoProfile.processes);
  }

  const websiteLibrary = getWebsiteLibrary(config);
  elements.websiteLibraryEnabled.checked = websiteLibrary.enabled;
  elements.websiteLibraryText.value = serializeWebsiteLibrary(websiteLibrary.entries);
  elements.websiteLibrarySearch.value = '';
  renderPopupDisplayList(displays);
  elements.separateMediaSizeSettings.checked = Boolean(config.separateMediaSizeSettings);
  syncSharedSizeValuesFromConfig(config);
  elements.imageBaseWidth.value = config.imageBaseWidth;
  elements.imageBaseHeight.value = config.imageBaseHeight;
  elements.imageSizeJitter.value = config.imageSizeJitter;
  elements.imageCompensationMultiplier.value = config.imageCompensationMultiplier;
  elements.imageCompensationThreshold.value = config.imageCompensationThreshold;
  setDirectionMode('imageSizeJitterMode', config.imageSizeJitterMode);
  elements.videoBaseWidth.value = config.videoBaseWidth;
  elements.videoBaseHeight.value = config.videoBaseHeight;
  elements.videoSizeJitter.value = config.videoSizeJitter;
  elements.videoCompensationMultiplier.value = config.videoCompensationMultiplier;
  elements.videoCompensationThreshold.value = config.videoCompensationThreshold;
  setDirectionMode('videoSizeJitterMode', config.videoSizeJitterMode);
  updateSizeSettingsLayout();
  renderFolders(config.folders || []);
  renderWebsiteLibraryPreview();
  renderShortcutFeedback();
  setAiStatus(t('ai.status.ready'));
  applyAiPopupAppearancePreview(ai.popupAppearance);
}

function renderWebsiteLibraryPreview() {
  if (!elements.websiteLibraryList || !elements.websiteLibraryStats || !elements.websiteLibraryText) {
    return;
  }

  const parsed = parseWebsiteLibraryText(elements.websiteLibraryText.value);
  const keyword = String(elements.websiteLibrarySearch?.value || '').trim().toLowerCase();
  const matchedEntries = parsed.entries.filter((entry) => {
    if (!keyword) {
      return true;
    }

    return entry.label.toLowerCase().includes(keyword) || entry.url.toLowerCase().includes(keyword);
  });
  const enabledCount = parsed.entries.filter((entry) => entry.enabled !== false).length;

  elements.websiteLibraryStats.textContent = t('website.stats', {
    total: parsed.entries.length,
    enabled: enabledCount,
    invalid: parsed.invalidLines.length,
    shown: matchedEntries.length
  });

  elements.websiteLibraryList.replaceChildren();

  if (!matchedEntries.length) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = parsed.entries.length ? t('website.emptyFiltered') : t('website.empty');
    elements.websiteLibraryList.append(empty);
    return;
  }

  for (const entry of matchedEntries) {
    const row = document.createElement('div');
    row.className = 'website-row';

    const meta = document.createElement('div');
    meta.className = 'website-meta';

    const label = document.createElement('div');
    label.className = 'website-label';
    label.textContent = entry.label;

    const url = document.createElement('div');
    url.className = 'website-url';
    url.textContent = entry.url;
    url.title = entry.url;

    const status = document.createElement('span');
    status.className = `website-badge ${entry.enabled === false ? 'is-disabled' : 'is-enabled'}`;
    status.textContent = entry.enabled === false ? t('website.disabled') : t('website.enabled');

    meta.append(label, url, status);

    const actions = document.createElement('div');
    actions.className = 'website-actions';

    const openButton = document.createElement('button');
    openButton.type = 'button';
    openButton.textContent = t('website.testOne');
    openButton.addEventListener('click', async () => {
      await showWebsitePopup(entry);
    });

    actions.append(openButton);
    row.append(meta, actions);
    elements.websiteLibraryList.append(row);
  }
}

function renderFolders(folders) {
  elements.folderList.replaceChildren();

  if (!folders.length) {
    const empty = document.createElement('div');
    empty.className = 'empty';
    empty.textContent = t('folders.empty');
    elements.folderList.append(empty);
    return;
  }

  for (const folder of folders) {
    const folderPath = typeof folder === 'string' ? folder : folder.path;
    const folderWeight = typeof folder === 'object' && folder.weight !== undefined ? folder.weight : 1;

    let displayPath = folderPath;
    if (elements.developerMode?.checked) {
      const parts = folderPath.split(/[/\\]/).filter(Boolean);
      displayPath = parts.length > 0 ? `***\\${parts[parts.length - 1]}` : '***';
    }

    const row = document.createElement('div');
    row.className = 'folder-row';

    const label = document.createElement('span');
    label.title = folderPath;
    label.textContent = displayPath;

    const weightControl = document.createElement('div');
    weightControl.className = 'folder-weight-control';

    const weightLabel = document.createElement('span');
    weightLabel.className = 'folder-weight-label';
    weightLabel.textContent = t('folders.weight');

    const weightSlider = document.createElement('input');
    weightSlider.type = 'range';
    weightSlider.className = 'folder-weight-slider';
    weightSlider.min = '0';
    weightSlider.max = '10';
    weightSlider.step = '1';
    weightSlider.value = String(folderWeight);

    const weightValue = document.createElement('span');
    weightValue.className = 'folder-weight-value';
    weightValue.textContent = String(folderWeight);

    const updateWeight = async () => {
      const newWeight = Math.round(Number(weightSlider.value));
      weightSlider.value = String(newWeight);
      weightValue.textContent = String(newWeight);
      const foldersNext = currentConfig.folders.map((item) => {
        const itemPath = typeof item === 'string' ? item : item.path;
        if (itemPath === folderPath) {
          return { path: folderPath, weight: newWeight };
        }
        return item;
      });
      const result = await saveConfig({ ...collectConfig(), folders: foldersNext });
      if (result?.blocked) {
        return;
      }
    };

    weightSlider.addEventListener('input', () => {
      weightValue.textContent = String(Math.round(Number(weightSlider.value)));
    });
    weightSlider.addEventListener('change', () => {
      void updateWeight();
    });

    weightControl.append(weightLabel, weightSlider, weightValue);

    const actions = document.createElement('div');
    actions.className = 'folder-actions';

    const openButton = document.createElement('button');
    openButton.type = 'button';
    openButton.textContent = t('buttons.openFolder');
    openButton.addEventListener('click', async () => {
      const mediaPopup = getMediaPopup();
      if (!mediaPopup) {
        log(t('log.previewFolderOpenUnavailable'));
        return;
      }

      const result = await mediaPopup.openFolder(folderPath);
      log(result?.ok ? t('log.folderOpened') : t('log.folderOpenFailed'));
    });

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = t('buttons.remove');
    removeButton.addEventListener('click', async () => {
      const foldersNext = currentConfig.folders.filter((item) => {
        const itemPath = typeof item === 'string' ? item : item.path;
        return itemPath !== folderPath;
      });
      const result = await saveConfig({ ...collectConfig(), folders: foldersNext });
      if (result?.blocked) {
        return;
      }
      log(t('log.folderRemoved'));
    });

    actions.append(openButton, removeButton);
    row.append(label, weightControl, actions);
    elements.folderList.append(row);
  }
}

function renderStateSummary(state) {
  elements.mediaCount.textContent = t('stats.mediaCount', { count: state.mediaCount || 0 });
  elements.popupCount.textContent = t('stats.popupCount', { count: state.popupCount || 0 });
  const processRuleBlocked = Boolean(state.requestedRunning && state.processRuleState?.enabled && state.processRuleState?.blocked);
  elements.runState.textContent = state.running ? t('status.running') : processRuleBlocked ? t('status.rulePaused') : t('status.stopped');

  if (elements.processRulesStatus) {
    elements.processRulesStatus.textContent = getProcessRuleStatusText(state.processRuleState);
    elements.processRulesStatus.dataset.level = state.processRuleState?.blocked ? 'warning' : 'muted';
  }

  if (state.messageKey) {
    elements.statusText.textContent = t(state.messageKey);
    return;
  }

  elements.statusText.textContent = state.message || (state.running ? t('status.active') : processRuleBlocked ? t(state.processRuleState?.reason === 'blacklist' ? 'message.processRulesBlockedBlacklist' : 'message.processRulesWaitingWhitelist') : t('status.ready'));
}

function updateState(state) {
  currentState = state;
  applyLanguage(state.locale || currentConfig?.language || 'system');

  if (state.config) {
    applyConfig(state.config, state.displays || []);
  }

  renderConfigFileInfo(state.configPath || currentState?.configPath);

  renderStateSummary(state);

  if (state.lastScanErrors && state.lastScanErrors.length) {
    log(t('log.scanErrors', { count: state.lastScanErrors.length }));
  }

  renderShortcutFeedback();
}

elements.unlimitedWindows.addEventListener('change', () => {
  elements.maxWindows.disabled = elements.unlimitedWindows.checked;
  elements.unlimitedWarning.hidden = !elements.unlimitedWindows.checked;
  if (elements.unlimitedWindows.checked) {
    log(t('log.unlimitedEnabled'));
  }
});

elements.language.addEventListener('change', async () => {
  applyLanguage(elements.language.value);
  const result = await saveConfig();
  if (result?.blocked) {
    return;
  }
  log(t('log.settingsSaved'));
});

elements.separateMediaSizeSettings.addEventListener('change', () => {
  updateSizeSettingsLayout({ syncSeparate: elements.separateMediaSizeSettings.checked });
});

function scheduleAutoSave({ immediate = false } = {}) {
  if (!currentConfig) {
    return null;
  }

  if (autoSaveTimer) {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = null;
  }

  if (immediate) {
    return triggerAutoSave();
  }

  autoSaveTimer = setTimeout(() => {
    autoSaveTimer = null;
    void triggerAutoSave();
  }, AUTO_SAVE_DELAY_MS);

  return null;
}

function markUnsaved() {
  void scheduleAutoSave();
}

async function triggerAutoSave() {
  if (!currentConfig) {
    return null;
  }

  if (autoSaveInFlight) {
    await autoSaveInFlight;
  }

  autoSaveInFlight = saveConfig().finally(() => {
    autoSaveInFlight = null;
  });
  return autoSaveInFlight;
}

async function saveConfig(config = collectConfig()) {
  const validation = buildShortcutValidation({
    startShortcut: config.startShortcut,
    pauseShortcut: config.pauseShortcut,
    stopShortcut: config.stopShortcut,
    closeAllShortcut: config.closeAllShortcut
  });
  const hasValidationError = Object.values(validation).some((item) => item?.level === 'error');
  if (hasValidationError) {
    renderShortcutFeedback(validation);
    log(t('log.shortcutsValidationFailed'));
    return { blocked: true, validation, config };
  }

  const mediaPopup = getMediaPopup();
  if (!mediaPopup) {
    renderShortcutFeedback(validation);
    return { config };
  }

  const state = await mediaPopup.saveConfig(config);
  updateState(state);
  const failedShortcut = shortcutFields.some((field) => {
    const status = state.shortcutRegistration?.[field.key]?.status;
    return status === 'failed' || status === 'invalid' || status === 'duplicate';
  });
  if (failedShortcut) {
    log(t('log.shortcutsRegistrationIssue'));
  }
  return state;
}

async function scan() {
  const saveResult = await saveConfig();
  if (saveResult?.blocked) {
    return;
  }

  const mediaPopup = getMediaPopup();
  if (!mediaPopup) {
    log(t('log.previewScanUnavailable'));
    return;
  }

  const result = await mediaPopup.scanMedia();
  log(t('log.scanComplete', { count: result.media.length }));
}

elements.addFoldersButton.addEventListener('click', async () => {
  const mediaPopup = getMediaPopup();
  if (!mediaPopup) {
    log(t('log.previewFolderUnavailable'));
    return;
  }

  const folders = await mediaPopup.chooseFolders();
  const result = await saveConfig({ ...collectConfig(), folders });
  if (result?.blocked) {
    return;
  }
  log(t('log.foldersUpdated'));
});

elements.switchConfigFileButton?.addEventListener('click', async () => {
  const result = await saveConfig();
  if (result?.blocked) {
    return;
  }

  const mediaPopup = getMediaPopup();
  if (!mediaPopup?.selectConfigFile) {
    log(t('log.previewConfigUnavailable'));
    return;
  }

  const previousPath = currentState?.configPath || '';
  const state = await mediaPopup.selectConfigFile();
  if (state?.errorKey) {
    log(t(state.errorKey));
    return;
  }

  updateState(state);
  if (state?.configPath && state.configPath !== previousPath) {
    log(t('config.file.switched', { name: getConfigFileDisplayName(state.configPath) }));
  }
});

elements.saveConfigAsButton?.addEventListener('click', async () => {
  const result = await saveConfig();
  if (result?.blocked) {
    return;
  }

  const mediaPopup = getMediaPopup();
  if (!mediaPopup?.saveConfigAs) {
    log(t('log.previewConfigUnavailable'));
    return;
  }

  const previousPath = currentState?.configPath || '';
  const state = await mediaPopup.saveConfigAs();
  if (state?.errorKey) {
    log(t(state.errorKey));
    return;
  }

  updateState(state);
  if (state?.configPath && state.configPath !== previousPath) {
    log(t('config.file.copied', { name: getConfigFileDisplayName(state.configPath) }));
  }
});

elements.saveButton.addEventListener('click', async () => {
  const result = await saveConfig();
  if (result?.blocked) {
    return;
  }
  log(t('log.settingsSaved'));
});

elements.websiteSaveButton?.addEventListener('click', async () => {
  const result = await saveConfig();
  if (result?.blocked) {
    return;
  }
  renderWebsiteLibraryPreview();
  log(t('log.websiteLibrarySaved'));
});

elements.scanButton.addEventListener('click', scan);

elements.startButton.addEventListener('click', async () => {
  const result = await saveConfig();
  if (result?.blocked) {
    return;
  }
  const mediaPopup = getMediaPopup();
  if (!mediaPopup) {
    log(t('log.previewStartUnavailable'));
    return;
  }

  const state = await mediaPopup.start();
  updateState(state);
  if (state.messageKey === 'message.noPlayableSources') {
    log(t('log.schedulerStartFailed'));
  } else if (state.processRuleState?.enabled && state.processRuleState?.blocked) {
    log(t('log.schedulerArmedByProcessRules'));
  } else {
    log(t('log.schedulerStarted'));
  }
});

elements.pauseButton.addEventListener('click', async () => {
  const mediaPopup = getMediaPopup();
  if (!mediaPopup) {
    log(t('log.previewPauseUnavailable'));
    return;
  }

  const state = await mediaPopup.pause();
  updateState(state);
  log(t('log.schedulerPaused'));
});

elements.stopButton.addEventListener('click', async () => {
  const mediaPopup = getMediaPopup();
  if (!mediaPopup) {
    log(t('log.previewStopUnavailable'));
    return;
  }

  const state = await mediaPopup.stop();
  updateState(state);
  log(t('log.schedulerStopped'));
});

elements.closeAllButton.addEventListener('click', async () => {
  const mediaPopup = getMediaPopup();
  if (!mediaPopup) {
    log(t('log.previewCloseUnavailable'));
    return;
  }

  const state = await mediaPopup.closeAll();
  updateState(state);
  log(t('log.popupsClosed'));
});

elements.aiShowPopupButton.addEventListener('click', async () => {
  const mediaPopup = getMediaPopup();
  if (!mediaPopup?.generatePopupText) {
    setAiStatus(t('log.aiPreviewUnavailable'), 'error');
    log(t('log.aiPreviewUnavailable'));
    return;
  }

  const btn = elements.aiShowPopupButton;
  btn.classList.add('loading');
  btn.disabled = true;

  try {
    const nextConfig = collectConfig();
    const result = await mediaPopup.generatePopupText({
      aiConfig: nextConfig.ai,
      locale: nextConfig.language
    });

    if (!result?.ok) {
      const detail = result?.detail ? ` ${result.detail}` : '';
      const message = `${t(result?.errorKey || 'ai.error.requestFailed')}${detail}`.trim();
      setAiStatus(message, 'error');
      log(message);
      return;
    }

    await showAiTextPopup(result.text);
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
});

elements.aiTestInteractionButton?.addEventListener('click', async () => {
  const saveResult = await saveConfig();
  if (saveResult?.blocked) {
    return;
  }

  const mediaPopup = getMediaPopup();
  if (!mediaPopup?.testAiInteraction) {
    setAiStatus(t('log.aiPreviewUnavailable'), 'error');
    log(t('log.aiPreviewUnavailable'));
    return;
  }

  const button = elements.aiTestInteractionButton;
  button.classList.add('loading');
  button.disabled = true;

  try {
    const result = await mediaPopup.testAiInteraction();
    if (!result?.ok) {
      const detail = result?.detail ? ` ${result.detail}` : '';
      const message = `${t(result?.errorKey || 'ai.error.requestFailed')}${detail}`.trim();
      setAiStatus(message, 'error');
      log(message);
      return;
    }

    if (result.popupErrorKey) {
      log(t(result.popupErrorKey));
    }

    const actionLabel = describeInteractionAction(result.action, result);
    setAiStatus(actionLabel, result.action === 'skip' ? 'muted' : 'success');

    if (result.action === 'skip') {
      log(t('log.aiInteractionTestSkipped'));
      return;
    }

    log(t('log.aiInteractionTestResult', { action: actionLabel }));
  } finally {
    button.classList.add('loading');
    button.disabled = false;
  }
});

elements.aiSaveAppearanceButton?.addEventListener('click', async () => {
  applyAiPopupAppearancePreview(getAiPopupAppearanceFromInputs());
  const result = await saveConfig();
  if (result?.blocked) {
    return;
  }
  log(t('log.settingsSaved'));
  setAiStatus(t('ai.popupAppearance.saved'), 'success');
});

elements.testWallpaperButton?.addEventListener('click', async () => {
  elements.testWallpaperButton.disabled = true;
  log('开始测试更换壁纸...');
  try {
    const result = await saveConfig();
    if (result?.blocked) {
      log('保存配置失败，终止测试');
      return;
    }
    const mediaPopup = getMediaPopup();
    if (mediaPopup?.testWallpaper) {
      log('正在通知后台执行...');
      const msg = await mediaPopup.testWallpaper();
      log(`后台执行完毕：${msg || '无返回'}`);
    } else {
      log('无法连接后台服务：testWallpaper 接口未找到');
    }
  } catch (err) {
    log('测试出错：' + err.message);
  } finally {
    elements.testWallpaperButton.disabled = false;
  }
});

elements.websiteLibraryText?.addEventListener('input', () => {
  renderWebsiteLibraryPreview();
  markUnsaved();
});

elements.websiteLibrarySearch?.addEventListener('input', () => {
  renderWebsiteLibraryPreview();
});

elements.websiteShowPopupButton?.addEventListener('click', async () => {
  const parsed = parseWebsiteLibraryText(elements.websiteLibraryText.value);
  const entry = parsed.entries.find((item) => item.enabled !== false) || parsed.entries[0];
  if (!entry) {
    log(t('website.empty'));
    return;
  }
  await showWebsitePopup(entry);
});

elements.autoProfileConfigPath?.addEventListener('change', markUnsaved);

elements.profileSelector?.addEventListener('change', async (e) => {
  const val = e.target.value;
  if (val === '__create_new__') {
    const name = prompt('请输入新配置档案的名称 (如: 工作专注模式):');
    if (name) {
      const template = prompt('请选择预设模板 (可选: default, work, casual, insane):\n留空则复制当前配置');
      const id = 'profile_' + Date.now();
      const res = await mediaPopup.createProfile({ profileId: id, name, templateId: template || null });
      if (res.ok) {
        updateState(res.state);
        loadProfiles(res.state.configPath);
      } else {
        alert('创建失败: ' + res.error);
        loadProfiles(currentConfigPath);
      }
    } else {
      // Revert select back
      loadProfiles(currentConfigPath);
    }
  } else if (val) {
    const profile = cachedProfiles.find(p => p.id === val);
    if (profile) {
      const res = await mediaPopup.switchProfile(profile.path);
      if (res.ok) {
        updateState(res.state);
        loadProfiles(res.state.configPath);
      } else {
        alert('切换失败: ' + res.error);
        loadProfiles(currentConfigPath);
      }
    }
  }
});

elements.processRulesEnabled?.addEventListener('change', markUnsaved);
elements.processRulesCheckIntervalSeconds?.addEventListener('input', markUnsaved);

elements.chooseBlacklistProcessButton?.addEventListener('click', () => openProcessPicker('blacklist'));
elements.chooseWhitelistProcessButton?.addEventListener('click', () => openProcessPicker('whitelist'));
elements.chooseAutoProfileProcessButton?.addEventListener('click', () => openProcessPicker('autoProfile'));

elements.processPickerCloseButton?.addEventListener('click', closeProcessPicker);

elements.processPickerOverlay?.addEventListener('click', (event) => {
  if (event.target === elements.processPickerOverlay) {
    closeProcessPicker();
  }
});

elements.processPickerSearch?.addEventListener('input', renderProcessPickerList);

elements.processPickerRefreshButton?.addEventListener('click', () => {
  void loadProcessPickerList();
});

elements.processPickerAddButton?.addEventListener('click', () => {
  void addSelectedProcessesToRuleList();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !elements.processPickerOverlay?.hidden) {
    closeProcessPicker();
  }
});

elements.minimizeWindowButton.addEventListener('click', () => getMediaPopup()?.minimizeWindow());
elements.closeWindowButton.addEventListener('click', () => getMediaPopup()?.closeWindow());

const savedTheme = localStorage.getItem('app_theme') || 'dark';
if (savedTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
}

if (elements.themeToggleButton) {
  elements.themeToggleButton.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('app_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('app_theme', 'light');
    }
  });
}

organizeSettingsLayout();
initNumericScrubbers();
bindDirectionModeButtons();
bindAutoSaveInputs();
bindAiPopupAppearancePreview();
bindShortcutRecorders();
bindLayoutInteractions();
applyStaticTranslations();
setLogDrawer(false);

async function fetchAndRenderStats() {
  const mediaPopup = getMediaPopup();
  if (!mediaPopup?.getStats) return;
  const stats = await mediaPopup.getStats();
  
  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = Math.floor(totalSeconds % 60);
    if (h > 0) return t('stats.format.hours', { h, m });
    if (m > 0) return t('stats.format.minutes', { m, s });
    return t('stats.format.seconds', { s });
  };
  
  const daysUsed = Math.max(1, Math.ceil((Date.now() - new Date(stats.firstUsedAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)));
  const avgSeconds = Math.floor(stats.totalPlayTimeSeconds / daysUsed);

  const el = (id) => document.getElementById(id);
  if (el('statPlayTime')) el('statPlayTime').textContent = formatTime(stats.totalPlayTimeSeconds);
  if (el('statUptime')) el('statUptime').textContent = formatTime(stats.totalUptimeSeconds);
  if (el('topbarPlayTime')) el('topbarPlayTime').textContent = `${t('stats.topbar.playTime')} ${formatTime(stats.totalPlayTimeSeconds)}`;
  if (el('topbarUptime')) el('topbarUptime').textContent = `${t('stats.topbar.uptime')} ${formatTime(stats.totalUptimeSeconds)}`;
  if (el('statLongestSession')) el('statLongestSession').textContent = formatTime(stats.longestPlaySessionSeconds);
  if (el('statDailyAverage')) el('statDailyAverage').textContent = formatTime(avgSeconds);
  
  if (el('statPopupImage')) el('statPopupImage').textContent = stats.popupCounts?.image || 0;
  if (el('statPopupVideo')) el('statPopupVideo').textContent = stats.popupCounts?.video || 0;
  if (el('statPopupWebsite')) el('statPopupWebsite').textContent = stats.popupCounts?.website || 0;
  if (el('statPopupAi')) el('statPopupAi').textContent = stats.popupCounts?.ai || 0;
  
  if (el('statCloseManual')) el('statCloseManual').textContent = stats.closeCounts?.manual || 0;
  if (el('statCloseAuto')) el('statCloseAuto').textContent = stats.closeCounts?.auto || 0;
  
  // Dashboard Progress Updates
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const todayPlayTime = stats.dailyUsage?.[todayStr]?.playTimeSeconds || 0;
  
  // Daily progressive stamp progress
  let currentTarget = 3600; // default 1h
  let stampTextKey = '';
  
  if (todayPlayTime >= 24 * 3600) {
    currentTarget = 24 * 3600; // Maxed out
    stampTextKey = 'stamp.text.ultimate';
  } else if (todayPlayTime >= 4 * 3600) {
    currentTarget = 24 * 3600; // Aim for Ultimate
    stampTextKey = 'stamp.text.gold';
  } else if (todayPlayTime >= 3600) {
    currentTarget = 4 * 3600; // Aim for Gold
    stampTextKey = 'stamp.text.silver';
  } else if (todayPlayTime > 0) {
    currentTarget = 3600; // Aim for Silver
    stampTextKey = 'stamp.text.bronze';
  } else {
    currentTarget = 3600; // Start by aiming for Silver (1h)
    stampTextKey = '';
  }
  
  const dailyProgress = Math.min(100, (todayPlayTime / currentTarget) * 100);
  if (el('dailyProgressFill')) el('dailyProgressFill').style.width = `${dailyProgress}%`;
  
  const formatTarget = (targetSecs) => targetSecs >= 3600 ? `${targetSecs / 3600}h` : `${targetSecs / 60}m`;
  const todayH = Math.floor(todayPlayTime / 3600);
  const todayM = Math.floor((todayPlayTime % 3600) / 60);
  if (el('dailyProgressText')) el('dailyProgressText').textContent = `${todayH}h ${todayM}m / ${formatTarget(currentTarget)}`;

  let stampDisplay = '';
  if (stampTextKey) {
    const rawText = t(stampTextKey) || '...';
    const options = rawText.split('|');
    const seededRandom = Math.sin(now.getFullYear() * 1000 + now.getMonth() * 100 + now.getDate()) * 10000;
    const optionIndex = Math.floor((seededRandom - Math.floor(seededRandom)) * options.length);
    stampDisplay = options[optionIndex] || options[0];
  }
  if (el('dailyStampText')) {
    el('dailyStampText').textContent = stampDisplay ? `(${stampDisplay})` : '';
  }
  
  // Monthly Grand Slam progress
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let validDaysCount = 0;
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    if (stats.dailyUsage?.[dateStr]?.playTimeSeconds > 0) validDaysCount++;
  }
  
  const monthlyProgress = (validDaysCount / daysInMonth) * 100;
  if (el('monthlyProgressFill')) el('monthlyProgressFill').style.width = `${monthlyProgress}%`;
  if (el('monthlyProgressText')) el('monthlyProgressText').textContent = `${validDaysCount} / ${daysInMonth} ${t('dashboard.days') || '天'}`;
  
  window._statsData = stats;
  renderCalendar(stats.dailyUsage || {});
}

let currentCalendarDate = new Date();

function renderCalendar(dailyUsage) {
  const grid = document.getElementById('calendarGrid');
  const monthLabel = document.getElementById('calendarMonthLabel');
  const fullMonthStamp = document.getElementById('fullMonthStamp');
  
  if (!grid || !monthLabel) return;
  
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  
  const monthDate = new Date(year, month, 1);
  monthLabel.textContent = new Intl.DateTimeFormat(currentLocale, { year: 'numeric', month: 'long' }).format(monthDate);
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  
  grid.innerHTML = '';
  
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty';
    grid.appendChild(emptyCell);
  }
  
  let validDaysCount = 0;
  
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-day';
    
    const dayNum = document.createElement('div');
    dayNum.className = 'calendar-day-num';
    dayNum.textContent = d;
    cell.appendChild(dayNum);
    
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const usage = dailyUsage && dailyUsage[dateStr];
    
    if (usage && usage.playTimeSeconds > 0) {
      validDaysCount++;
      cell.classList.add('has-stamp');
      const stamp = document.createElement('div');
      
      let stampClass = '';
      let stampTextKey = '';
      const playTime = usage.playTimeSeconds;
      
      if (playTime >= 24 * 3600) {
        stampClass = 'stamp-ultimate';
        stampTextKey = 'stamp.text.ultimate';
      } else if (playTime >= 4 * 3600) {
        stampClass = 'stamp-gold';
        stampTextKey = 'stamp.text.gold';
      } else if (playTime >= 3600) {
        stampClass = 'stamp-silver';
        stampTextKey = 'stamp.text.silver';
      } else {
        stampClass = 'stamp-bronze';
        stampTextKey = 'stamp.text.bronze';
      }
      
      const rawText = t(stampTextKey) || '...';
      const options = rawText.split('|');
      // seed the random selection by day so it doesn't change on every re-render
      const seededRandom = Math.sin(year * 1000 + month * 100 + d) * 10000;
      const optionIndex = Math.floor((seededRandom - Math.floor(seededRandom)) * options.length);
      const stampText = options[optionIndex] || options[0];

      stamp.className = `stamp ${stampClass}`;
      stamp.textContent = stampText;
      
      const h = Math.floor(playTime / 3600);
      const m = Math.floor((playTime % 3600) / 60);
      if (h > 0) {
        cell.title = t('stats.format.hours', { h, m });
      } else {
        cell.title = t('stats.format.minutes', { m, s: 0 }).replace(' 0秒', '').replace(' 0s', '');
      }
      
      cell.appendChild(stamp);
    }
    
    grid.appendChild(cell);
  }
  
  if (validDaysCount === daysInMonth) {
    if (fullMonthStamp) fullMonthStamp.classList.remove('hidden');
    grid.classList.add('faded-by-stamp');
  } else {
    if (fullMonthStamp) fullMonthStamp.classList.add('hidden');
    grid.classList.remove('faded-by-stamp');
  }
}

document.getElementById('prevMonthBtn')?.addEventListener('click', () => {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
  renderCalendar(window._statsData?.dailyUsage || {});
});

document.getElementById('nextMonthBtn')?.addEventListener('click', () => {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
  renderCalendar(window._statsData?.dailyUsage || {});
});

function initBridge(retry = 0) {
  const mediaPopup = getMediaPopup();
  if (mediaPopup) {
    mediaPopup.onStateUpdate(updateState);
    mediaPopup.getState().then((state) => {
      updateState(state);
      fetchAndRenderStats();
      setInterval(fetchAndRenderStats, 10000);
      log(t('log.appLoaded'));
    });
    return;
  }

  if (retry < 20) {
    setTimeout(() => initBridge(retry + 1), 100);
    return;
  }

  elements.statusText.textContent = t('status.preview');
  log(t('log.previewUnavailable'));
}

initBridge();