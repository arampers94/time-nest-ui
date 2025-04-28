const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const url = require('url');

const isDev = true; // Set to true for development mode, false for production mode

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: screen.getPrimaryDisplay().workAreaSize.height,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Required for Electron 20+
    },
  });

  const startURL = isDev
  ? 'http://localhost:4200'
  : url.format({
      pathname: path.join(__dirname, `/dist/time-nest-ui/browser/index.html`),
      protocol: 'file:',
      slashes: true,
    })

  mainWindow.loadURL(startURL);

  mainWindow.loadURL(
    url.format({})
  )

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});