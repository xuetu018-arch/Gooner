const fs = require('fs/promises');
const fsSync = require('fs');
const path = require('path');

const defaultStats = {
  firstUsedAt: '',
  totalUptimeSeconds: 0,
  totalPlayTimeSeconds: 0,
  longestPlaySessionSeconds: 0,
  popupCounts: {
    image: 0,
    video: 0,
    website: 0,
    ai: 0
  },
  closeCounts: {
    manual: 0,
    auto: 0
  },
  dailyUsage: {}
};

let currentStats = null;
let currentPlaySessionSeconds = 0;
let saveTimer = null;
const SAVE_INTERVAL_MS = 5000;

function getStatsPath(app) {
  return path.join(app.getPath('userData'), 'stats.json');
}

function cloneDefaultStats() {
  return {
    ...defaultStats,
    popupCounts: { ...defaultStats.popupCounts },
    closeCounts: { ...defaultStats.closeCounts }
  };
}

function normalizeStats(raw) {
  const stats = cloneDefaultStats();
  if (!raw || typeof raw !== 'object') {
    return stats;
  }

  if (typeof raw.firstUsedAt === 'string') {
    stats.firstUsedAt = raw.firstUsedAt;
  }
  
  stats.totalUptimeSeconds = Math.max(0, Number(raw.totalUptimeSeconds) || 0);
  stats.totalPlayTimeSeconds = Math.max(0, Number(raw.totalPlayTimeSeconds) || 0);
  stats.longestPlaySessionSeconds = Math.max(0, Number(raw.longestPlaySessionSeconds) || 0);

  if (raw.popupCounts && typeof raw.popupCounts === 'object') {
    stats.popupCounts.image = Math.max(0, Number(raw.popupCounts.image) || 0);
    stats.popupCounts.video = Math.max(0, Number(raw.popupCounts.video) || 0);
    stats.popupCounts.website = Math.max(0, Number(raw.popupCounts.website) || 0);
    stats.popupCounts.ai = Math.max(0, Number(raw.popupCounts.ai) || 0);
  }

  if (raw.closeCounts && typeof raw.closeCounts === 'object') {
    stats.closeCounts.manual = Math.max(0, Number(raw.closeCounts.manual) || 0);
    stats.closeCounts.auto = Math.max(0, Number(raw.closeCounts.auto) || 0);
  }

  if (raw.dailyUsage && typeof raw.dailyUsage === 'object') {
    stats.dailyUsage = raw.dailyUsage;
  }

  return stats;
}

function initStats(app) {
  if (currentStats) return currentStats;

  const statsPath = getStatsPath(app);
  try {
    if (fsSync.existsSync(statsPath)) {
      const content = fsSync.readFileSync(statsPath, 'utf8');
      currentStats = normalizeStats(JSON.parse(content));
    } else {
      currentStats = cloneDefaultStats();
    }
  } catch (err) {
    console.error('Failed to read stats.json', err);
    currentStats = cloneDefaultStats();
  }

  if (!currentStats.firstUsedAt) {
    currentStats.firstUsedAt = new Date().toISOString();
    scheduleSave(app);
  }

  return currentStats;
}

function scheduleSave(app) {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    saveStatsNow(app).catch(err => console.error('Failed to save stats', err));
  }, SAVE_INTERVAL_MS);
}

async function saveStatsNow(app) {
  if (!currentStats) return;
  const statsPath = getStatsPath(app);
  try {
    await fs.writeFile(statsPath, JSON.stringify(currentStats, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write stats.json', err);
  }
}

function saveStatsNowSync(app) {
  if (!currentStats) return;
  const statsPath = getStatsPath(app);
  try {
    fsSync.writeFileSync(statsPath, JSON.stringify(currentStats, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to write stats.json sync', err);
  }
}

function getStats() {
  return currentStats || cloneDefaultStats();
}

function getTodayKey() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function incrementUptime(app, seconds) {
  if (!currentStats) return;
  currentStats.totalUptimeSeconds += seconds;
  const today = getTodayKey();
  if (!currentStats.dailyUsage[today]) currentStats.dailyUsage[today] = { uptimeSeconds: 0, playTimeSeconds: 0 };
  currentStats.dailyUsage[today].uptimeSeconds += seconds;
  scheduleSave(app);
}

function incrementPlayTime(app, seconds) {
  if (!currentStats) return;
  currentStats.totalPlayTimeSeconds += seconds;
  currentPlaySessionSeconds += seconds;
  if (currentPlaySessionSeconds > currentStats.longestPlaySessionSeconds) {
    currentStats.longestPlaySessionSeconds = currentPlaySessionSeconds;
  }
  const today = getTodayKey();
  if (!currentStats.dailyUsage[today]) currentStats.dailyUsage[today] = { uptimeSeconds: 0, playTimeSeconds: 0 };
  currentStats.dailyUsage[today].playTimeSeconds += seconds;
  scheduleSave(app);
}

function resetPlaySession() {
  currentPlaySessionSeconds = 0;
}

function incrementPopup(app, type) {
  if (!currentStats || typeof currentStats.popupCounts[type] !== 'number') return;
  currentStats.popupCounts[type] += 1;
  scheduleSave(app);
}

function incrementClose(app, type) {
  if (!currentStats || typeof currentStats.closeCounts[type] !== 'number') return;
  currentStats.closeCounts[type] += 1;
  scheduleSave(app);
}

function _seedMay2026(app) {
  if (!currentStats) return;
  for (let d = 1; d <= 31; d++) {
    const day = String(d).padStart(2, '0');
    const dateKey = `2026-05-${day}`;
    // Random playTimeSeconds between 10 minutes and 25 hours
    const playTime = Math.floor(Math.random() * (25 * 3600)); 
    currentStats.dailyUsage[dateKey] = {
      uptimeSeconds: playTime + 3600,
      playTimeSeconds: playTime
    };
  }
  // Add some random data for June
  currentStats.dailyUsage['2026-06-01'] = { uptimeSeconds: 7000, playTimeSeconds: 6000 };
  currentStats.dailyUsage['2026-06-05'] = { uptimeSeconds: 2000, playTimeSeconds: 1500 };
  currentStats.dailyUsage['2026-06-10'] = { uptimeSeconds: 30000, playTimeSeconds: 28000 };
  scheduleSave(app);
}

module.exports = {
  initStats,
  getStats,
  incrementUptime,
  incrementPlayTime,
  resetPlaySession,
  incrementPopup,
  incrementClose,
  saveStatsNowSync,
  _seedMay2026
};
