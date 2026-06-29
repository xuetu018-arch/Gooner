const fs = require('fs/promises');
const path = require('path');
const { getConfigPath, defaultConfig } = require('./config-store');

function getProfilesDirPath(app) {
  return path.join(app.getPath('userData'), 'profiles');
}

function getProfilesIndexPath(app) {
  return path.join(app.getPath('userData'), 'profiles.json');
}

const PRESET_TEMPLATES = {
  'work': {
    name: '工作专注 (Work Focus)',
    config: {
      popupLifetimeMinutes: 1,
      popupLifetimeSeconds: 0,
      burstCount: 1,
      minWindows: 1,
      maxWindows: 1,
      scheduler: {
        intervalHours: 0,
        intervalMinutes: 45,
        intervalSeconds: 0
      }
    }
  },
  'casual': {
    name: '休闲摸鱼 (Casual Relax)',
    config: {
      popupLifetimeMinutes: 3,
      popupLifetimeSeconds: 0,
      burstCount: 2,
      minWindows: 1,
      maxWindows: 3,
      scheduler: {
        intervalHours: 0,
        intervalMinutes: 15,
        intervalSeconds: 0
      }
    }
  },
  'insane': {
    name: '疯狂模式 (Insane Popups)',
    config: {
      popupLifetimeMinutes: 5,
      popupLifetimeSeconds: 0,
      burstCount: 5,
      minWindows: 3,
      maxWindows: 'unlimited',
      scheduler: {
        intervalHours: 0,
        intervalMinutes: 3,
        intervalSeconds: 0
      }
    }
  }
};

async function readProfilesIndex(app) {
  try {
    const data = await fs.readFile(getProfilesIndexPath(app), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {
      'default': { name: '默认模式 (Default)', path: getConfigPath(app) }
    };
  }
}

async function writeProfilesIndex(app, index) {
  await fs.writeFile(getProfilesIndexPath(app), JSON.stringify(index, null, 2), 'utf8');
}

async function listProfiles(app) {
  const index = await readProfilesIndex(app);
  return Object.entries(index).map(([id, meta]) => ({
    id,
    name: meta.name,
    path: meta.path
  }));
}

async function createProfile(app, profileId, name, templateId = null, currentConfig = null) {
  const index = await readProfilesIndex(app);
  if (index[profileId]) {
    throw new Error(`Profile ${profileId} already exists`);
  }

  const profilesDir = getProfilesDirPath(app);
  await fs.mkdir(profilesDir, { recursive: true });

  const profilePath = path.join(profilesDir, `${profileId}.json`);
  
  let newConfig = JSON.parse(JSON.stringify(currentConfig || defaultConfig));
  
  if (templateId && PRESET_TEMPLATES[templateId]) {
    const template = PRESET_TEMPLATES[templateId];
    newConfig = { ...newConfig, ...template.config };
    if (template.config.scheduler && newConfig.scheduler) {
      newConfig.scheduler = { ...newConfig.scheduler, ...template.config.scheduler };
    }
  }

  await fs.writeFile(profilePath, JSON.stringify(newConfig, null, 2), 'utf8');

  index[profileId] = { name, path: profilePath };
  await writeProfilesIndex(app, index);

  return profilePath;
}

async function deleteProfile(app, profileId) {
  if (profileId === 'default') {
    throw new Error('Cannot delete default profile');
  }
  
  const index = await readProfilesIndex(app);
  const profile = index[profileId];
  if (!profile) return;

  delete index[profileId];
  await writeProfilesIndex(app, index);

  try {
    await fs.unlink(profile.path);
  } catch (err) {
    console.error(`Failed to delete profile file ${profile.path}:`, err);
  }
}

async function initProfiles(app, currentConfig) {
  try {
    await fs.access(getProfilesIndexPath(app));
  } catch {
    console.log('Initializing predefined profiles...');
    await writeProfilesIndex(app, {
      'default': { name: '默认模式 (Default)', path: getConfigPath(app) }
    });
    
    for (const [id, template] of Object.entries(PRESET_TEMPLATES)) {
      try {
        await createProfile(app, id, template.name, id, currentConfig);
      } catch (err) {
        console.error(`Failed to create preset profile ${id}:`, err);
      }
    }
  }
}

module.exports = {
  listProfiles,
  createProfile,
  deleteProfile,
  initProfiles,
  PRESET_TEMPLATES
};
