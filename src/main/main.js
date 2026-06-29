const { app, BrowserWindow, dialog, globalShortcut, ipcMain, screen, shell } = require('electron');
const { execFile } = require('node:child_process');
const path = require('path');
const { promisify } = require('node:util');
const { resolveLanguage, translate } = require('../shared/i18n');
const {
  cloneDefaultConfig,
  loadConfigFile,
  normalizeAiConfig,
  normalizeConfig,
  normalizeText,
  normalizeWebsiteLibrary,
  normalizeWindowBounds,
  getConfigPath,
  readConfigCandidate,
  writeConfigPathState,
  writeConfigFile,
  writeConfigFileSync
} = require('./config-store');
const { getAiErrorKey, requestDeepSeekContextInteractionText, requestDeepSeekPopupText } = require('./ai-service');
const { scanFolders } = require('./media-library');
const { Scheduler } = require('./scheduler');
const { WallpaperService } = require('./wallpaper-service');
const { WindowManager } = require('./window-manager');
const profileManager = require('./profile-manager');
const {
  initStats,
  getStats,
  _seedMay2026,
  incrementUptime,
  incrementPlayTime,
  resetPlaySession,
  incrementClose
} = require('./stats-store');

app.commandLine.appendSwitch('disable-accelerated-video-decode');

const execFileAsync = promisify(execFile);
const foregroundAppCommand = [
  'Add-Type @\'' ,
  'using System;',
  'using System.Runtime.InteropServices;',
  'public static class Win32Foreground {',
  '  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();',
  '  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);',
  '}',
  '\'@;',
  '$windowHandle = [Win32Foreground]::GetForegroundWindow();',
  'if ($windowHandle -eq [IntPtr]::Zero) {',
  '  [pscustomobject]@{ processName = "" } | ConvertTo-Json -Compress;',
  '} else {',
  '  $foregroundProcessId = 0;',
  '  [Win32Foreground]::GetWindowThreadProcessId($windowHandle, [ref]$foregroundProcessId) | Out-Null;',
  '  $process = Get-Process -Id $foregroundProcessId -ErrorAction SilentlyContinue;',
  '  [pscustomobject]@{ processName = if ($process) { $process.ProcessName } else { "" } } | ConvertTo-Json -Compress;',
  '}'
].join('\n');
const processListCommand = [
  '@(Get-Process | ForEach-Object {',
  '  $processPath = "";',
  '  try { $processPath = $_.Path } catch { $processPath = "" }',
  '  [pscustomobject]@{ name = $_.ProcessName; path = $processPath }',
  '}) | Sort-Object name,path -Unique | ConvertTo-Json -Compress'
].join('\n');

let mainWindow;
let isQuitting = false;
let config = cloneDefaultConfig();
let mediaLibrary = [];
let mediaQueue = [];
let queueIndex = 0;
let websiteQueue = [];
let websiteQueueIndex = 0;
let shortcutRegistration = {};
let scheduler = null;
let wallpaperService = null;
let windowManager = null;
let interactionTimer = null;
let interactionInFlight = false;
let processRuleTimer = null;
let processRuleInFlight = false;
let processRuleState = {
  enabled: false,
  blocked: false,
  reason: 'disabled',
  blacklistMatches: [],
  whitelistMatches: [],
  lastCheckedAt: '',
  error: ''
};
let activeConfigPath = '';
let originalConfigPathBeforeAutoSwitch = null;

async function switchActiveConfigPath(targetPath) {
  if (!targetPath) return false;
  const loaded = await readConfigCandidate(targetPath);
  if (!loaded) return false;
  
  const normalized = normalizeConfig(loaded, getSystemLanguage);
  await writeConfigPathState(app, targetPath);
  config = normalized;
  activeConfigPath = targetPath;
  await writeConfigFile(app, normalized, targetPath);
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setTitle(translate(getActiveLanguage(), 'app.title'));
  }
  registerActionShortcuts();
  refreshInteractionTimer();
  resetMediaQueue();
  resetWebsiteQueue();
  if (scheduler?.isRunning) {
    scheduler.scheduleNextTick();
  }
  return true;
}

ipcMain.handle('select-config-file', async (event) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { ...getPublicState(), ok: false };
  }

  const targetPath = result.filePaths[0];
  originalConfigPathBeforeAutoSwitch = null;
  const success = await switchActiveConfigPath(targetPath);
  
  if (!success) {
    return {
      ...getPublicState(),
      ok: false,
      errorKey: 'config.error.invalidFile',
      detail: targetPath
    };
  }

  refreshProcessRuleMonitor();
  sendState();
  return getPublicState();
});

async function saveAiPopupReply(popupId, replyText) {
  const reply = normalizeText(replyText, 1000);
  if (!reply) {
    return {
      ok: false,
      errorKey: 'ai.reply.error.empty'
    };
  }

  const nextAi = normalizeAiConfig({
    ...config.ai,
    oneTimeReplyGuidance: reply
  });
  const saved = await saveConfig({
    ...config,
    ai: nextAi
  });

  return {
    ok: true,
    config: saved
  };
}

async function generateImmediateAiReply(popupId, replyText) {
  const savedReply = await saveAiPopupReply(popupId, replyText);
  if (!savedReply.ok) {
    return savedReply;
  }

  const aiConfig = normalizeAiConfig(savedReply.config?.ai || config.ai);
  if (!aiConfig.immediateReplyEnabled) {
    return {
      ...savedReply,
      immediateResponseEnabled: false,
      immediateResponseCreated: false
    };
  }

  const locale = getAiLocale(config.language);

  try {
    const result = await requestDeepSeekPopupText({ aiConfig, locale });
    await consumeOneTimeReplyGuidance();

    const popupResult = windowManager.createAiTextPopup({
      text: result.text,
      locale,
      title: translate(locale, 'ai.interaction.popupTitle')
    }, config, { ignoreLimits: true });

    return {
      ...savedReply,
      immediateResponseEnabled: true,
      immediateResponseCreated: Boolean(popupResult?.ok),
      errorKey: popupResult?.ok ? '' : (popupResult?.errorKey || 'ai.reply.error.immediateFailed')
    };
  } catch (error) {
    return {
      ...savedReply,
      immediateResponseEnabled: true,
      immediateResponseCreated: false,
      errorKey: getAiErrorKey(error),
      detail: error?.detail || ''
    };
  }
}

async function consumeOneTimeReplyGuidance() {
  const aiConfig = normalizeAiConfig(config.ai);
  if (!aiConfig.oneTimeReplyGuidance) {
    return;
  }

  await saveConfig({
    ...config,
    ai: {
      ...aiConfig,
      oneTimeReplyGuidance: ''
    }
  });
}

function getSecondsFromParts(hours, minutes, seconds) {
  return (Number(hours) * 3600) + (Number(minutes) * 60) + Number(seconds);
}

function createWindowManager() {
  return new WindowManager({
    screen,
    baseDir: __dirname,
    getActiveLanguage,
    getAiLocale: (inputLocale) => getAiLocale(inputLocale || config.language),
    sendState
  });
}

function getDisplaySummaries() {
  return screen.getAllDisplays().map((display, index) => ({
    id: display.id,
    index,
    isPrimary: Boolean(display.isPrimary),
    bounds: {
      x: display.bounds.x,
      y: display.bounds.y,
      width: display.bounds.width,
      height: display.bounds.height
    },
    workArea: {
      x: display.workArea.x,
      y: display.workArea.y,
      width: display.workArea.width,
      height: display.workArea.height
    },
    scaleFactor: display.scaleFactor
  }));
}

function createScheduler() {
  return new Scheduler({
    getConfig: () => config,
    getMediaCount: () => mediaLibrary.length,
    getScheduledItemCount,
    getPopupCount: () => windowManager?.popupCount || 0,
    scanMedia,
    getNextPopupItem,
    createPopup,
    closeAllPopups,
    sendState,
    getPublicState
  });
}

function getInteractionDelayMs() {
  const aiConfig = normalizeAiConfig(config.ai);
  return Math.max(1, getSecondsFromParts(
    aiConfig.interactionIntervalHours,
    aiConfig.interactionIntervalMinutes,
    aiConfig.interactionIntervalSeconds
  )) * 1000;
}

function canRunAiInteraction() {
  const aiConfig = normalizeAiConfig(config.ai);
  return Boolean(aiConfig.interactionEnabled && aiConfig.apiKey);
}

function getSystemLanguage() {
  const preferredLanguage = app.getPreferredSystemLanguages?.()[0] || app.getLocale?.() || 'zh-CN';
  return resolveLanguage(preferredLanguage, 'zh-CN');
}

function getActiveLanguage() {
  return resolveLanguage(config.language, getSystemLanguage());
}

async function loadConfig() {
  const loaded = await loadConfigFile(app, getSystemLanguage);
  config = loaded.config;
  activeConfigPath = loaded.configPath || getConfigPath(app);
  resetWebsiteQueue();
}

async function saveConfig(nextConfig) {
  config = normalizeConfig(nextConfig, getSystemLanguage);
  if (!activeConfigPath) {
    activeConfigPath = getConfigPath(app);
  }
  await writeConfigFile(app, config, activeConfigPath);
  await writeConfigPathState(app, activeConfigPath);
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setTitle(translate(getActiveLanguage(), 'app.title'));
  }
  registerActionShortcuts();
  refreshProcessRuleMonitor();
  refreshInteractionTimer();
  sendState();
  return config;
}

function saveConfigSync(nextConfig) {
  config = normalizeConfig(nextConfig, getSystemLanguage);
  if (!activeConfigPath) {
    activeConfigPath = getConfigPath(app);
  }
  writeConfigFileSync(app, config, activeConfigPath);
}

function getCurrentConfigFilePath() {
  return activeConfigPath || getConfigPath(app);
}

async function persistActiveConfigFilePath(configPath) {
  const nextPath = typeof configPath === 'string' ? configPath.trim() : '';
  activeConfigPath = nextPath || getConfigPath(app);
  await writeConfigPathState(app, activeConfigPath);
  return activeConfigPath;
}

async function saveConfigToPath(nextConfig, configPath) {
  const normalizedConfig = normalizeConfig(nextConfig, getSystemLanguage);
  const targetPath = typeof configPath === 'string' && configPath.trim() ? configPath.trim() : getConfigPath(app);
  await writeConfigFile(app, normalizedConfig, targetPath);
  await persistActiveConfigFilePath(targetPath);
  config = normalizedConfig;
  return normalizedConfig;
}

function getAiLocale(inputLocale) {
  return resolveLanguage(inputLocale, getSystemLanguage());
}

function normalizeProcessName(value) {
  return String(value || '')
    .trim()
    .replace(/^"|"$/g, '')
    .replace(/\.exe$/i, '')
    .toLowerCase();
}

function getProcessRuleConfig() {
  const rules = config.processRules && typeof config.processRules === 'object' ? config.processRules : {};
  return {
    enabled: Boolean(rules.enabled),
    blacklist: Array.isArray(rules.blacklist) ? rules.blacklist : [],
    whitelist: Array.isArray(rules.whitelist) ? rules.whitelist : [],
    autoProfiles: Array.isArray(rules.autoProfiles) ? rules.autoProfiles : [],
    autoStartOnWhitelist: Boolean(rules.autoStartOnWhitelist),
    stopOnBlacklist: Boolean(rules.stopOnBlacklist),
    stopOnWhitelistExit: Boolean(rules.stopOnWhitelistExit),
    checkIntervalSeconds: Math.max(2, Math.min(300, Math.round(Number(rules.checkIntervalSeconds) || 5)))
  };
}

function findProcessMatches(runningNames, ruleNames) {
  const runningSet = new Set(runningNames.map(normalizeProcessName).filter(Boolean));
  return ruleNames.filter((ruleName) => runningSet.has(normalizeProcessName(ruleName)));
}

function getProcessRuleMessageKey(state = processRuleState) {
  if (state.reason === 'blacklist') {
    return 'message.processRulesBlockedBlacklist';
  }

  if (state.reason === 'waitingWhitelist') {
    return 'message.processRulesWaitingWhitelist';
  }

  if (state.reason === 'error') {
    return 'message.processRulesCheckFailed';
  }

  return '';
}

async function getRunningProcesses() {
  const { stdout } = await execFileAsync('powershell.exe', [
    '-NoProfile',
    '-NonInteractive',
    '-ExecutionPolicy',
    'Bypass',
    '-Command',
    processListCommand
  ], {
    windowsHide: true,
    timeout: 5000,
    maxBuffer: 512 * 1024
  });

  const parsed = JSON.parse(String(stdout || '[]').trim() || '[]');
  return (Array.isArray(parsed) ? parsed : [parsed])
    .map((item) => {
      if (typeof item === 'string') {
        return { name: item.trim(), path: '' };
      }

      if (!item || typeof item !== 'object') {
        return null;
      }

      return {
        name: String(item.name || item.ProcessName || '').trim(),
        path: String(item.path || item.Path || '').trim()
      };
    })
    .filter((item) => item?.name);
}

async function getRunningProcessNames() {
  const processes = await getRunningProcesses();
  return processes.map((item) => item.name);
}

async function getProcessIconDataUrl(filePath) {
  const targetPath = String(filePath || '').trim();
  if (!targetPath) {
    return '';
  }

  try {
    const icon = await app.getFileIcon(targetPath, { size: 'small' });
    return icon.isEmpty() ? '' : icon.toDataURL();
  } catch (_error) {
    return '';
  }
}

async function evaluateProcessRules() {
  const rules = getProcessRuleConfig();
  const baseState = {
    enabled: rules.enabled,
    blocked: false,
    reason: rules.enabled ? 'allowed' : 'disabled',
    blacklistMatches: [],
    whitelistMatches: [],
    autoProfileMatch: null,
    lastCheckedAt: new Date().toISOString(),
    error: ''
  };

  if (!rules.enabled) {
    return baseState;
  }

  try {
    const runningNames = await getRunningProcessNames();
    const blacklistMatches = findProcessMatches(runningNames, rules.blacklist);
    const whitelistMatches = findProcessMatches(runningNames, rules.whitelist);

    if (blacklistMatches.length > 0) {
      return {
        ...baseState,
        blocked: true,
        reason: 'blacklist',
        blacklistMatches,
        whitelistMatches
      };
    }

    let autoProfileMatch = null;
    if (Array.isArray(rules.autoProfiles)) {
      for (const p of rules.autoProfiles) {
        if (!p.configPath || !Array.isArray(p.processes) || p.processes.length === 0) continue;
        const matches = findProcessMatches(runningNames, p.processes);
        if (matches.length > 0) {
          autoProfileMatch = { configPath: p.configPath, matches };
          break;
        }
      }
    }

    if (rules.whitelist.length > 0 && whitelistMatches.length === 0) {
      return {
        ...baseState,
        blocked: true,
        reason: 'waitingWhitelist',
        blacklistMatches,
        whitelistMatches,
        autoProfileMatch
      };
    }

    return {
      ...baseState,
      blacklistMatches,
      whitelistMatches,
      autoProfileMatch
    };
  } catch (error) {
    return {
      ...baseState,
      blocked: true,
      reason: 'error',
      error: error?.message || 'Process rule check failed.'
    };
  }
}

function stopProcessRuleMonitor() {
  clearTimeout(processRuleTimer);
  processRuleTimer = null;
}

function scheduleNextProcessRuleCheck(delayMs) {
  stopProcessRuleMonitor();
  processRuleTimer = setTimeout(() => {
    void runProcessRuleCheck();
  }, delayMs);
}

async function applyProcessRulesNow() {
  const rules = getProcessRuleConfig();

  if (!rules.enabled) {
    processRuleState = {
      enabled: false,
      blocked: false,
      reason: 'disabled',
      blacklistMatches: [],
      whitelistMatches: [],
      lastCheckedAt: '',
      error: ''
    };
    await scheduler?.setGateBlocked(false);
    return processRuleState;
  }

  processRuleState = await evaluateProcessRules();
  await scheduler?.setGateBlocked(processRuleState.blocked, getProcessRuleMessageKey(processRuleState));
  return processRuleState;
}

function hasWhitelistMatch(state) {
  return Boolean(state?.enabled && Array.isArray(state.whitelistMatches) && state.whitelistMatches.length > 0);
}

function isBlacklistBlocked(state) {
  return state?.reason === 'blacklist';
}

function hasActiveSchedulerOrPopups() {
  return Boolean(scheduler?.isRequestedRunning || scheduler?.isRunning || (windowManager?.popupCount || 0) > 0);
}

async function applyProcessRuleAutomation(previousState, nextState) {
  const rules = getProcessRuleConfig();
  const previousWhitelistMatched = hasWhitelistMatch(previousState);
  const nextWhitelistMatched = hasWhitelistMatch(nextState);
  const previousBlacklistMatched = isBlacklistBlocked(previousState);
  const nextBlacklistMatched = isBlacklistBlocked(nextState);

  await scheduler?.setGateBlocked(nextState.blocked, getProcessRuleMessageKey(nextState));

  if (rules.stopOnBlacklist && nextBlacklistMatched && !previousBlacklistMatched && hasActiveSchedulerOrPopups()) {
    return stopScheduler();
  }

  if (rules.stopOnWhitelistExit && previousWhitelistMatched && !nextWhitelistMatched && hasActiveSchedulerOrPopups()) {
    return stopScheduler();
  }

  if (rules.autoStartOnWhitelist && nextWhitelistMatched && !nextBlacklistMatched && !scheduler?.isRequestedRunning) {
    return startScheduler();
  }

  const matchedConfigPath = nextState.autoProfileMatch?.configPath;
  if (matchedConfigPath && matchedConfigPath !== activeConfigPath) {
    if (!originalConfigPathBeforeAutoSwitch) {
      originalConfigPathBeforeAutoSwitch = activeConfigPath;
    }
    const success = await switchActiveConfigPath(matchedConfigPath);
    if (success) {
      return getPublicState();
    }
  } else if (!matchedConfigPath && originalConfigPathBeforeAutoSwitch) {
    const target = originalConfigPathBeforeAutoSwitch;
    originalConfigPathBeforeAutoSwitch = null;
    if (target !== activeConfigPath) {
      await switchActiveConfigPath(target);
      return getPublicState();
    }
  }

  return getPublicState();
}

async function runProcessRuleCheck() {
  const rules = getProcessRuleConfig();
  if (!rules.enabled) {
    processRuleState = {
      enabled: false,
      blocked: false,
      reason: 'disabled',
      blacklistMatches: [],
      whitelistMatches: [],
      lastCheckedAt: '',
      error: ''
    };
    await scheduler?.setGateBlocked(false);
    return;
  }

  if (processRuleInFlight) {
    scheduleNextProcessRuleCheck(rules.checkIntervalSeconds * 1000);
    return;
  }

  processRuleInFlight = true;

  try {
    const previousState = processRuleState;
    processRuleState = await evaluateProcessRules();
    await applyProcessRuleAutomation(previousState, processRuleState);
    refreshInteractionTimer();
    sendState();
  } finally {
    processRuleInFlight = false;
    scheduleNextProcessRuleCheck(rules.checkIntervalSeconds * 1000);
  }
}

function refreshProcessRuleMonitor() {
  const rules = getProcessRuleConfig();

  if (!rules.enabled) {
    stopProcessRuleMonitor();
    processRuleState = {
      enabled: false,
      blocked: false,
      reason: 'disabled',
      blacklistMatches: [],
      whitelistMatches: [],
      lastCheckedAt: '',
      error: ''
    };
    void scheduler?.setGateBlocked(false);
    return;
  }

  scheduleNextProcessRuleCheck(0);
}

function getInteractionRuntimeContext(locale) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return {
    localTime: formatter.format(now),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    runningState: scheduler?.isRunning ? 'running' : scheduler?.isRequestedRunning ? 'gated' : 'stopped',
    popupCount: windowManager?.popupCount || 0,
    mediaCount: mediaLibrary.length
  };
}

async function getForegroundAppName() {
  try {
    const { stdout } = await execFileAsync('powershell.exe', [
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy',
      'Bypass',
      '-Command',
      foregroundAppCommand
    ], {
      windowsHide: true,
      timeout: 4000,
      maxBuffer: 64 * 1024
    });

    const parsed = JSON.parse(String(stdout || '{}').trim() || '{}');
    return typeof parsed.processName === 'string' ? parsed.processName.trim().slice(0, 80) : '';
  } catch (_error) {
    return '';
  }
}

async function executeContextInteraction(options = {}) {
  const { manual = false } = options;
  const locale = getAiLocale(config.language);
  const aiConfig = normalizeAiConfig(config.ai);

  if (!aiConfig.apiKey) {
    return {
      ok: false,
      errorKey: 'ai.error.missingKey',
      detail: ''
    };
  }

  if (!manual && (!scheduler?.isRunning || !canRunAiInteraction())) {
    return {
      ok: false,
      errorKey: 'ai.interaction.error.disabled',
      detail: ''
    };
  }

  const runtimeContext = getInteractionRuntimeContext(locale);
  if (aiConfig.interactionIncludeForegroundApp) {
    runtimeContext.foregroundAppName = await getForegroundAppName();
  }

  try {
    const result = await requestDeepSeekContextInteractionText({
      aiConfig,
      locale,
      runtimeContext
    });
    await consumeOneTimeReplyGuidance();

    let textPopupShown = false;
    let mediaPopupShown = false;
    let popupErrorKey = '';

    if (result.action === 'text_only' || result.action === 'text_and_media') {
      const popupResult = windowManager.createAiTextPopup({
        text: result.message,
        locale,
        title: translate(locale, 'ai.interaction.popupTitle')
      }, config);
      textPopupShown = Boolean(popupResult?.ok);
      popupErrorKey = popupResult?.ok ? '' : (popupResult?.errorKey || '');
    }

    if (result.action === 'text_and_media' || result.action === 'media_only') {
      const media = getNextMedia();
      mediaPopupShown = media ? windowManager.createViewerPopup(media, config) : false;
    }

    return {
      ok: true,
      action: result.action,
      message: result.message,
      runtimeContext,
      textPopupShown,
      mediaPopupShown,
      popupErrorKey
    };
  } catch (error) {
    return {
      ok: false,
      errorKey: getAiErrorKey(error),
      detail: error?.detail || ''
    };
  }
}

function stopInteractionTimer() {
  clearTimeout(interactionTimer);
  interactionTimer = null;
}

function scheduleNextInteraction() {
  stopInteractionTimer();

  if (!scheduler?.isRunning || !canRunAiInteraction()) {
    return;
  }

  interactionTimer = setTimeout(() => {
    void runContextInteractionTick();
  }, getInteractionDelayMs());
}

function refreshInteractionTimer() {
  if (!scheduler?.isRunning) {
    stopInteractionTimer();
    return;
  }

  scheduleNextInteraction();
}

async function runContextInteractionTick() {
  if (!scheduler?.isRunning || !canRunAiInteraction()) {
    stopInteractionTimer();
    return;
  }

  if (interactionInFlight) {
    scheduleNextInteraction();
    return;
  }

  interactionInFlight = true;

  try {
    await executeContextInteraction();
  } catch (_error) {
  } finally {
    interactionInFlight = false;
    scheduleNextInteraction();
  }
}

function getShortcutEntries() {
  return [
    ['startShortcut', () => { void startScheduler(); }],
    ['pauseShortcut', () => { pauseScheduler(); }],
    ['stopShortcut', () => { stopScheduler(); }],
    ['closeAllShortcut', () => { closeAllPopups(); }]
  ];
}

function registerActionShortcuts() {
  if (!app.isReady()) {
    shortcutRegistration = {};
    return;
  }

  globalShortcut.unregisterAll();

  const shortcutEntries = getShortcutEntries();
  const counts = new Map();

  for (const [configKey] of shortcutEntries) {
    const accelerator = config[configKey];
    if (!accelerator) {
      continue;
    }

    const normalizedKey = accelerator.toLowerCase();
    counts.set(normalizedKey, (counts.get(normalizedKey) || 0) + 1);
  }

  shortcutRegistration = {};

  for (const [configKey, handler] of shortcutEntries) {
    const accelerator = config[configKey];
    if (!accelerator) {
      shortcutRegistration[configKey] = {
        accelerator: '',
        status: 'empty'
      };
      continue;
    }

    const normalizedKey = accelerator.toLowerCase();
    if ((counts.get(normalizedKey) || 0) > 1) {
      shortcutRegistration[configKey] = {
        accelerator,
        status: 'duplicate'
      };
      continue;
    }

    try {
      const success = globalShortcut.register(accelerator, handler);
      if (success) {
        shortcutRegistration[configKey] = {
          accelerator,
          status: 'registered'
        };
        continue;
      }

      shortcutRegistration[configKey] = {
        accelerator,
        status: 'failed'
      };
      console.warn(`Failed to register shortcut: ${accelerator}`);
    } catch (error) {
      shortcutRegistration[configKey] = {
        accelerator,
        status: 'invalid'
      };
      console.warn(`Invalid shortcut: ${accelerator}`, error);
    }
  }
}

function getStoredMainWindowBounds() {
  const storedBounds = normalizeWindowBounds(config.windowBounds);
  const display = storedBounds.x !== undefined && storedBounds.y !== undefined
    ? screen.getDisplayMatching(storedBounds)
    : screen.getPrimaryDisplay();
  const area = display.workArea;
  const width = Math.min(storedBounds.width, area.width);
  const height = Math.min(storedBounds.height, area.height);
  const bounds = {
    width,
    height
  };

  if (storedBounds.x !== undefined) {
    bounds.x = Math.min(Math.max(area.x, storedBounds.x), area.x + area.width - width);
  }

  if (storedBounds.y !== undefined) {
    bounds.y = Math.min(Math.max(area.y, storedBounds.y), area.y + area.height - height);
  }

  return bounds;
}

function getMainWindowBoundsSnapshot() {
  if (!mainWindow || mainWindow.isDestroyed() || mainWindow.isMinimized()) {
    return config.windowBounds;
  }

  const bounds = mainWindow.isMaximized() ? mainWindow.getNormalBounds() : mainWindow.getBounds();
  return normalizeWindowBounds(bounds);
}

function persistMainWindowBounds() {
  saveConfigSync({ ...config, windowBounds: getMainWindowBoundsSnapshot() });
}

function getFolderPaths() {
  return config.folders
    .map((f) => (typeof f === 'string' ? f : f?.path || '').trim())
    .filter(Boolean);
}

function getFolderWeightMap() {
  const map = new Map();
  for (const folder of config.folders) {
    const folderPath = (typeof folder === 'string' ? folder : folder?.path || '').trim();
    const weight = typeof folder === 'object' ? Math.round(Math.min(10, Math.max(0, Number(folder.weight) || 1))) : 1;
    if (folderPath) {
      map.set(path.normalize(folderPath).toLowerCase() + path.sep, weight);
    }
  }
  return map;
}

function getMediaFolderWeight(mediaPath, weightMap) {
  const normalizedMediaPath = path.normalize(mediaPath).toLowerCase() + path.sep;
  let bestWeight = 1;
  let bestLength = 0;

  for (const [folderPath, weight] of weightMap) {
    if (normalizedMediaPath.startsWith(folderPath)) {
      if (folderPath.length > bestLength) {
        bestLength = folderPath.length;
        bestWeight = weight;
      }
    }
  }

  return bestWeight;
}

async function scanMedia() {
  const folderPaths = getFolderPaths();
  const { media, errors } = await scanFolders(folderPaths, config.recursive);
  mediaLibrary = media;
  resetMediaQueue();
  sendState({ lastScanErrors: errors });
  return { media: mediaLibrary, errors };
}

function resetMediaQueue() {
  const weightMap = getFolderWeightMap();

  const pool = [];
  for (const item of mediaLibrary) {
    const weight = getMediaFolderWeight(item.path, weightMap);
    if (weight <= 0) {
      continue;
    }
    for (let i = 0; i < weight; i++) {
      pool.push(item);
    }
  }

  mediaQueue = pool.length > 0 ? [...pool] : [...mediaLibrary];
  if (config.order === 'random') {
    shuffle(mediaQueue);
  } else {
    mediaQueue.sort((a, b) => a.path.localeCompare(b.path, undefined, { sensitivity: 'base' }));
  }
  queueIndex = 0;
}

function getEnabledWebsiteEntries() {
  const websiteLibrary = config.websiteLibrary || { enabled: false, entries: [] };
  if (!websiteLibrary.enabled || !Array.isArray(websiteLibrary.entries)) {
    return [];
  }

  return websiteLibrary.entries.filter((entry) => entry && entry.enabled !== false && entry.url);
}

function resetWebsiteQueue() {
  websiteQueue = [...getEnabledWebsiteEntries()];
  if (config.order === 'random') {
    shuffle(websiteQueue);
  } else {
    websiteQueue.sort((a, b) => {
      const left = `${a.label || ''} ${a.url || ''}`.trim();
      const right = `${b.label || ''} ${b.url || ''}`.trim();
      return left.localeCompare(right, undefined, { sensitivity: 'base' });
    });
  }
  websiteQueueIndex = 0;
}

function getNextWebsite() {
  if (websiteQueue.length === 0) {
    resetWebsiteQueue();
  }

  if (websiteQueue.length === 0) {
    return null;
  }

  if (websiteQueueIndex >= websiteQueue.length) {
    resetWebsiteQueue();
  }

  const item = websiteQueue[websiteQueueIndex];
  websiteQueueIndex += 1;
  return item;
}

function canScheduleAiPopup() {
  const aiConfig = normalizeAiConfig(config.ai);
  return Boolean(aiConfig.popupScheduleEnabled && aiConfig.apiKey);
}

function canScheduleWebsitePopup() {
  return getEnabledWebsiteEntries().length > 0;
}

function shuffle(items) {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }
}

function getNextMedia() {
  if (mediaQueue.length === 0) {
    return null;
  }
  if (queueIndex >= mediaQueue.length) {
    resetMediaQueue();
  }
  const item = mediaQueue[queueIndex];
  queueIndex += 1;
  return item;
}

function getScheduledItemCount() {
  return mediaLibrary.length + (canScheduleAiPopup() ? 1 : 0) + getEnabledWebsiteEntries().length;
}

function getNextPopupItem() {
  const availableKinds = [];

  if (mediaLibrary.length > 0) {
    availableKinds.push('media');
  }

  if (canScheduleAiPopup()) {
    availableKinds.push('ai-text');
  }

  if (canScheduleWebsitePopup()) {
    availableKinds.push('website');
  }

  if (availableKinds.length === 0) {
    return null;
  }

  const selectedKind = availableKinds.length === 1
    ? availableKinds[0]
    : availableKinds[Math.floor(Math.random() * availableKinds.length)];

  if (selectedKind === 'media') {
    const media = getNextMedia();
    return media ? { kind: 'media', media } : null;
  }

  if (selectedKind === 'website') {
    const entry = getNextWebsite();
    return entry ? { kind: 'website', entry } : null;
  }

  return {
    kind: 'ai-text',
    locale: getAiLocale(config.language)
  };
}

async function createPopup(item) {
  if (!item) {
    return false;
  }

  if (item.kind === 'media') {
    return windowManager.createViewerPopup(item.media, config);
  }

  if (item.kind === 'ai-text') {
    const aiConfig = normalizeAiConfig(config.ai);

    try {
      const result = await requestDeepSeekPopupText({ aiConfig, locale: item.locale || getAiLocale(config.language) });
      await consumeOneTimeReplyGuidance();
      return windowManager.createAiTextPopup({
        text: result.text,
        locale: item.locale || getAiLocale(config.language),
        title: translate(getAiLocale(config.language), 'ai.popup.title')
      }, config).ok;
    } catch (_error) {
      return false;
    }
  }

  if (item.kind === 'website') {
    return windowManager.createWebsitePopup(item.entry, config);
  }

  return false;
}

async function startScheduler() {
  await applyProcessRulesNow();
  resetPlaySession();
  const state = await scheduler.start();
  refreshInteractionTimer();
  return state;
}

function pauseScheduler() {
  stopInteractionTimer();
  return scheduler.pause();
}

function stopScheduler() {
  stopInteractionTimer();
  return scheduler?.stop() || getPublicState();
}

function closeAllPopups() {
  windowManager.closeAllPopups();
}

function getPublicState(extra = {}) {
  return {
    config,
    configPath: getCurrentConfigFilePath(),
    displays: getDisplaySummaries(),
    locale: getActiveLanguage(),
    running: scheduler?.isRunning || false,
    requestedRunning: scheduler?.isRequestedRunning || false,
    schedulerGate: scheduler?.gateState || { blocked: false, messageKey: '' },
    processRuleState,
    mediaCount: mediaLibrary.length,
    scheduledItemCount: getScheduledItemCount(),
    popupCount: windowManager?.popupCount || 0,
    shortcutRegistration,
    ...extra
  };
}

function sendState(extra) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('state:update', getPublicState(extra));
  }
}

async function createMainWindow() {
  await loadConfig();
  await profileManager.initProfiles(app, config);
  initStats(app);
  _seedMay2026(app);

  setInterval(() => {
    incrementUptime(app, 10);
    if (scheduler?.isRunning) {
      incrementPlayTime(app, 10);
    }
  }, 10000);

  windowManager = createWindowManager();
  scheduler = createScheduler();
  wallpaperService = new WallpaperService({
    getConfig: () => config,
    getMediaLibrary: () => mediaLibrary
  });
  wallpaperService.start();

  mainWindow = new BrowserWindow({
    ...getStoredMainWindowBounds(),
    minWidth: 760,
    minHeight: 560,
    title: translate(getActiveLanguage(), 'app.title'),
    frame: false,
    backgroundColor: '#111318',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('close', () => {
    persistMainWindowBounds();
    if (!isQuitting) {
      stopScheduler();
      wallpaperService.stop();
      app.quit();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[Renderer] ${message} (line ${line})`);
  });

  await mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));
  registerActionShortcuts();
  refreshProcessRuleMonitor();
  sendState();
}

ipcMain.handle('config:get', () => getPublicState());
ipcMain.handle('stats:get', () => getStats());

ipcMain.handle('config:pickFile', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: translate(getActiveLanguage(), 'dialog.chooseConfigFileTitle'),
    properties: ['openFile'],
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });
  return result.canceled || !result.filePaths.length ? null : result.filePaths[0];
});

ipcMain.handle('profiles:list', async () => {
  return await profileManager.listProfiles(app);
});

ipcMain.handle('profiles:create', async (event, { profileId, name, templateId }) => {
  try {
    const profilePath = await profileManager.createProfile(app, profileId, name, templateId, config);
    originalConfigPathBeforeAutoSwitch = null;
    await switchActiveConfigPath(profilePath);
    refreshProcessRuleMonitor();
    sendState();
    return { ok: true, state: getPublicState() };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('profiles:switch', async (event, profilePath) => {
  originalConfigPathBeforeAutoSwitch = null;
  const success = await switchActiveConfigPath(profilePath);
  if (!success) {
    return { ok: false, error: 'invalidFile', state: getPublicState() };
  }
  refreshProcessRuleMonitor();
  sendState();
  return { ok: true, state: getPublicState() };
});

ipcMain.handle('profiles:delete', async (event, profileId) => {
  try {
    await profileManager.deleteProfile(app, profileId);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  }
});

ipcMain.handle('config:saveAs', async () => {
  const defaultName = path.basename(getCurrentConfigFilePath()) || 'config.json';
  const result = await dialog.showSaveDialog(mainWindow, {
    title: translate(getActiveLanguage(), 'dialog.saveConfigAsTitle'),
    defaultPath: defaultName,
    filters: [{ name: 'JSON', extensions: ['json'] }]
  });

  if (result.canceled || !result.filePath) {
    return getPublicState();
  }

  const targetPath = result.filePath;
  const normalized = await saveConfigToPath(config, targetPath);
  
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setTitle(translate(getActiveLanguage(), 'app.title'));
  }
  registerActionShortcuts();
  refreshProcessRuleMonitor();
  refreshInteractionTimer();
  resetMediaQueue();
  resetWebsiteQueue();
  if (scheduler?.isRunning) {
    scheduler.scheduleNextTick();
  }
  sendState();
  return getPublicState({ config: normalized });
});

ipcMain.handle('config:save', async (event, nextConfig) => {
  const oldConfig = config;
  const saved = await saveConfig(nextConfig);
  wallpaperService.onConfigChange(oldConfig, config);
  resetMediaQueue();
  resetWebsiteQueue();
  if (scheduler.isRunning) {
    scheduler.scheduleNextTick();
  }
  refreshProcessRuleMonitor();
  refreshInteractionTimer();
  return getPublicState({ config: saved });
});

ipcMain.handle('ai:generatePopupText', async (_event, payload = {}) => {
  const aiConfig = normalizeAiConfig(payload.aiConfig || config.ai);
  const locale = getAiLocale(payload.locale || config.language);

  try {
    const result = await requestDeepSeekPopupText({ aiConfig, locale });
    await consumeOneTimeReplyGuidance();
    return {
      ok: true,
      text: result.text,
      usage: result.usage
    };
  } catch (error) {
    return {
      ok: false,
      errorKey: getAiErrorKey(error),
      detail: error.detail || ''
    };
  }
});

ipcMain.handle('ai:testInteraction', async () => executeContextInteraction({ manual: true }));

ipcMain.handle('ai:showTextPopup', async (_event, payload = {}) => windowManager.createAiTextPopup(payload, config, { ignoreLimits: true }));

ipcMain.handle('website:showPopup', async (_event, payload = {}) => {
  const entry = normalizeWebsiteLibrary({ enabled: true, entries: [payload] }).entries[0];

  if (!entry) {
    return {
      ok: false,
      errorKey: 'website.error.invalidUrl'
    };
  }

  const ok = await windowManager.createWebsitePopup(entry, config, { ignoreLimits: true });
  return {
    ok,
    errorKey: ok ? null : 'website.error.openFailed'
  };
});

ipcMain.handle('process:list', async () => {
  try {
    const processes = await getRunningProcesses();
    const processMap = new Map();

    for (const processItem of processes) {
      const key = normalizeProcessName(processItem.name);
      const current = processMap.get(key);
      if (!current || (!current.path && processItem.path)) {
        processMap.set(key, processItem);
      }
    }

    const processItems = await Promise.all(Array.from(processMap.values())
      .filter((processItem) => processItem.path)
      .map(async (processItem) => ({
      name: processItem.name,
      path: processItem.path,
      icon: await getProcessIconDataUrl(processItem.path)
    })));

    return {
      ok: true,
      processes: processItems.sort((left, right) => left.name.localeCompare(right.name, undefined, { sensitivity: 'base' }))
    };
  } catch (error) {
    return {
      ok: false,
      processes: [],
      error: error?.message || 'Failed to list processes.'
    };
  }
});

ipcMain.handle('folders:choose', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: translate(getActiveLanguage(), 'dialog.chooseFoldersTitle'),
    properties: ['openDirectory', 'multiSelections']
  });
  if (result.canceled) {
    return config.folders;
  }
  const existingPaths = new Set(config.folders.map((f) => (typeof f === 'string' ? f : f?.path || '').trim().toLowerCase()));
  const newFolders = result.filePaths
    .filter((p) => !existingPaths.has(p.trim().toLowerCase()))
    .map((p) => ({ path: p, weight: 1 }));
  const folders = [...config.folders, ...newFolders];
  await saveConfig({ ...config, folders });
  return folders;
});

ipcMain.handle('folders:open', async (_event, folderPath) => {
  const targetPath = typeof folderPath === 'string' ? folderPath.trim() : '';
  if (!targetPath) {
    return { ok: false, error: 'Missing folder path.' };
  }

  const openError = await shell.openPath(targetPath);
  return {
    ok: !openError,
    error: openError || null
  };
});

ipcMain.handle('media:scan', async () => scanMedia());
ipcMain.handle('scheduler:start', async () => startScheduler());
ipcMain.handle('scheduler:pause', () => pauseScheduler());
ipcMain.handle('scheduler:stop', () => stopScheduler());
ipcMain.handle('popups:closeAll', () => {
  closeAllPopups();
  return getPublicState();
});

ipcMain.handle('wallpaper:test', async () => {
  if (wallpaperService) {
    const beforeCount = mediaLibrary.length;
    const paths = getFolderPaths();
    const scanResult = await scanMedia();
    const afterCount = mediaLibrary.length;
    const msg = await wallpaperService.tick(true);
    return `[TEST] Folders: ${JSON.stringify(paths)} | Found: ${scanResult.media.length} | Before: ${beforeCount} After: ${afterCount} | ${msg}`;
  }
  return 'Wallpaper service is not running.';
});

ipcMain.handle('viewer:getMedia', (_event, viewerId) => windowManager.getViewerPayload(viewerId));
ipcMain.handle('viewer:showInFolder', (_event, filePath) => {
  if (filePath && typeof filePath === 'string') {
    shell.showItemInFolder(filePath);
  }
});
ipcMain.handle('viewer:close', (event) => {
  incrementClose(app, 'manual');
  const popup = BrowserWindow.fromWebContents(event.sender);
  if (popup && !popup.isDestroyed()) {
    popup.close();
  }
});

ipcMain.handle('aiPopup:getPayload', (_event, popupId) => windowManager.getAiTextPayload(popupId));
ipcMain.handle('aiPopup:reply', async (_event, popupId, replyText) => generateImmediateAiReply(popupId, replyText));
ipcMain.handle('aiPopup:close', (event) => {
  incrementClose(app, 'manual');
  const popup = BrowserWindow.fromWebContents(event.sender);
  if (popup && !popup.isDestroyed()) {
    popup.close();
  }
});

ipcMain.handle('aiPopup:fitWindow', (event, contentHeight) => {
  const popup = BrowserWindow.fromWebContents(event.sender);
  if (!popup || popup.isDestroyed()) {
    return;
  }

  const requestedHeight = Number(contentHeight);
  if (!Number.isFinite(requestedHeight) || requestedHeight <= 0) {
    return;
  }

  const display = screen.getDisplayMatching(popup.getBounds());
  const area = display.workArea;
  const bounds = popup.getBounds();
  const targetHeight = Math.max(96, Math.min(Math.ceil(requestedHeight), area.height));
  const nextY = Math.min(Math.max(area.y, bounds.y), area.y + area.height - targetHeight);
  popup.setBounds({ x: bounds.x, y: nextY, width: bounds.width, height: targetHeight });
});

ipcMain.handle('viewer:fitWindow', (event, mediaWidth, mediaHeight) => {
  const popup = BrowserWindow.fromWebContents(event.sender);
  if (!popup || popup.isDestroyed()) {
    return;
  }

  const width = Number(mediaWidth);
  const height = Number(mediaHeight);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return;
  }

  const display = screen.getDisplayMatching(popup.getBounds());
  const area = display.workArea;
  const bounds = popup.getBounds();
  const ratio = width / height;
  const maxWidth = Math.max(160, area.width);
  const maxHeight = Math.max(120, area.height);

  let targetWidth = bounds.width;
  let targetHeight = Math.round(targetWidth / ratio);

  const mediaType = windowManager.popupMediaTypes.get(popup) || 'image';
  const multiplierConfig = mediaType === 'video' ? config.videoCompensationMultiplier : config.imageCompensationMultiplier;
  const multiplier = Number.isFinite(multiplierConfig) ? multiplierConfig : 1;
  const thresholdConfig = mediaType === 'video' ? config.videoCompensationThreshold : config.imageCompensationThreshold;
  const threshold = Number.isFinite(thresholdConfig) ? thresholdConfig : 2.0;

  if (multiplier > 1 && width >= targetWidth * threshold && height >= targetHeight * threshold) {
    const compensatedWidth = Math.min(width, Math.round(targetWidth * multiplier));
    if (compensatedWidth > targetWidth) {
      targetWidth = compensatedWidth;
      targetHeight = Math.round(targetWidth / ratio);
    }
  }

  if (targetHeight > maxHeight) {
    targetHeight = maxHeight;
    targetWidth = Math.round(targetHeight * ratio);
  }
  if (targetWidth > maxWidth) {
    targetWidth = maxWidth;
    targetHeight = Math.round(targetWidth / ratio);
  }
  targetWidth = Math.max(160, targetWidth);
  targetHeight = Math.max(120, targetHeight);

  const nextX = Math.min(Math.max(area.x, bounds.x), area.x + area.width - targetWidth);
  const nextY = Math.min(Math.max(area.y, bounds.y), area.y + area.height - targetHeight);
  popup.setBounds({ x: nextX, y: nextY, width: targetWidth, height: targetHeight });
});

ipcMain.handle('window:minimize', (event) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender);
  if (targetWindow && !targetWindow.isDestroyed()) {
    targetWindow.minimize();
  }
});

ipcMain.handle('window:close', (event) => {
  const targetWindow = BrowserWindow.fromWebContents(event.sender);
  if (targetWindow && !targetWindow.isDestroyed()) {
    targetWindow.close();
  }
});

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  stopProcessRuleMonitor();
  stopScheduler();
  wallpaperService?.stop();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.on('before-quit', () => {
  isQuitting = true;
  if (mainWindow && !mainWindow.isDestroyed()) {
    persistMainWindowBounds();
  }
  globalShortcut.unregisterAll();
  stopProcessRuleMonitor();
  stopScheduler();
  wallpaperService?.stop();
});
