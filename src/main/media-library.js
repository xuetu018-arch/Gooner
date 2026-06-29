const fs = require('fs/promises');
const path = require('path');
const { pathToFileURL } = require('url');

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp']);
const videoExtensions = new Set(['.mp4', '.webm', '.ogg', '.mov', '.mkv']);

function getMediaType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (imageExtensions.has(extension)) {
    return 'image';
  }
  if (videoExtensions.has(extension)) {
    return 'video';
  }
  return null;
}

async function walkFolder(folderPath, recursive, results, errors) {
  let entries;
  try {
    entries = await fs.readdir(folderPath, { withFileTypes: true });
  } catch (error) {
    errors.push({ path: folderPath, message: error.message });
    return;
  }

  for (const entry of entries) {
    const entryPath = path.join(folderPath, entry.name);
    if (entry.isDirectory()) {
      if (recursive) {
        await walkFolder(entryPath, recursive, results, errors);
      }
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const type = getMediaType(entryPath);
    if (type) {
      results.push({
        path: entryPath,
        name: entry.name,
        type,
        url: pathToFileURL(entryPath).toString()
      });
    }
  }
}

async function scanFolders(folders, recursive) {
  const results = [];
  const errors = [];
  const uniqueFolders = Array.isArray(folders) ? [...new Set(folders)] : [];

  for (const folder of uniqueFolders) {
    await walkFolder(folder, recursive, results, errors);
  }

  const unique = new Map();
  for (const item of results) {
    unique.set(path.normalize(item.path).toLowerCase(), item);
  }

  const media = [...unique.values()].sort((a, b) => a.path.localeCompare(b.path, undefined, { sensitivity: 'base' }));
  return { media, errors };
}

module.exports = {
  getMediaType,
  imageExtensions,
  scanFolders,
  videoExtensions
};