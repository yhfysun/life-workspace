const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1120,
    height: 780,
    minWidth: 360,
    minHeight: 600,
    backgroundColor: '#f4f6fb',
    title: '全能生活工作台',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  // 加载工作台页面（单文件 HTML，全部离线可用）
  win.loadFile(path.join(__dirname, '..', 'www', 'index.html'));

  // 隐藏默认菜单，保持轻量；保留右键上下文与开发者工具快捷键(Ctrl+Shift+I)
  Menu.setApplicationMenu(null);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
