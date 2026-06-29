const fs = require('fs');
const txt = fs.readFileSync('src/main/main.js', 'utf8');

const anchor1 = 'ipcMain.handle(\'folders:choose\',';
const anchor2 = 'ipcMain.handle(\'viewer:fitWindow\',';

const before = txt.substring(0, txt.indexOf(anchor1));
const after = txt.substring(txt.indexOf(anchor2));

const replacement = \ipcMain.handle('folders:choose', async () => {
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
    await wallpaperService.tick();
  }
});

ipcMain.handle('viewer:getMedia', (_event, viewerId) => windowManager.getViewerPayload(viewerId));
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

\;

fs.writeFileSync('src/main/main.js', before + replacement + after, 'utf8');
