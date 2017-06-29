
const { app, BrowserWindow, Menu, ipcMain, crashReporter, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const __DEV__ = require('electron-is-dev');
const log = require('electron-log');
const path = require('path');
const menu = require('./menu');
const config = require('./config');
const fs = require('fs');

const notificationIndicator = '●';

require('electron-debug')();

if (!__DEV__ && process.platform !== 'linux') {
	autoUpdater.logger = log;
	autoUpdater.logger.transports.file.level = 'info';
	autoUpdater.checkForUpdates();
}

let isQuitting = false;
let mainWindow;
let page;

const isRunning = app.makeSingleInstance(() => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.show();
	}
});

if (isRunning) {
	app.quit();
}

function updateBadgeInfo(title) {
	if (process.platform !== 'darwin' && process.platform !== 'linux') return;

	if (title.startsWith(notificationIndicator)) {
		app.dock.setBadge(notificationIndicator);
	} else {
		app.dock.setBadge('');
	}
}

function createMainWindow() {
	const win = new BrowserWindow({
		title: app.getName(),
		width: 1000,
		height: 600,
		show: false,
		icon: path.join(__dirname, 'build', 'icon.icns'),
		minWidth: 800,
		minHeight: 600,
		vibrancy: 'light',
		titleBarStyle: 'hidden-inset',
		maximizable: false,
		fullscreenable: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'browser.js'),
			plugins: true
		}
	});

	win.setSheetOffset(41);

	win.loadURL('https://app.asana.com/');

	win.on('close', (e) => {
		if (!isQuitting) {
			e.preventDefault();

			if (process.platform === 'darwin') {
				app.hide();
			} else {
				win.hide();
			}
		}
	});

	win.on('page-title-updated', (e, title) => {
		e.preventDefault();
		updateBadgeInfo(title);
	});

	return win;
}

ipcMain.on('set-vibrancy', () => {
	if (config.get('vibrancy')) {
		mainWindow.setVibrancy('light');
	} else {
		mainWindow.setVibrancy(null);
	}
});

ipcMain.on('update-menu', () => {
	Menu.setApplicationMenu(menu.slice(1));
})

app.on('activate', () => mainWindow.show());
app.on('before-quit', () => isQuitting = true);

app.on('ready', () => {
	mainWindow = createMainWindow();
	page = mainWindow.webContents;

	// Open new browser window on external open
	page.on('new-window', (event, url) => {
		event.preventDefault();
		shell.openExternal(url);
	});

	// Set the menu application menu
	Menu.setApplicationMenu(menu);

	page.on('dom-ready', function() {
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
		mainWindow.show();
	});
});
