const { app, BrowserWindow, Menu, ipcMain, crashReporter, shell } = require('electron');
const { autoUpdater } = require('electron-updater');
const __DEV__ = require('electron-is-dev');
const path = require('path');
const menu = require('./menu');
const contextMenu = require('electron-context-menu');
const fs = require('fs');
const Config = require('electron-config')
const config = new Config();

const notificationIndicator = '●';

require('electron-debug')();

if (!__DEV__ && process.platform !== 'linux') {
	const log = require('electron-log');
	autoUpdater.logger = log;
	autoUpdater.logger.transports.file.level = 'info';
	autoUpdater.checkForUpdatesAndNotify();
}

let isQuitting = false;
let mainWindow;
let page;

const isRunning = app.requestSingleInstanceLock();

if (!isRunning) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.show();
	}
});

function updateBadgeInfo(title) {
	if (process.platform !== 'darwin' && process.platform !== 'linux') return;

	if (title.startsWith(notificationIndicator)) {
		app.dock.setBadge(notificationIndicator);
	} else {
		app.dock.setBadge('');
	}
}

function createMainWindow() {
	contextMenu();

	let opts = {
		title: app.getName(),
		width: 1200,
		height: 600,
		show: false,
		acceptFirstMouse: true,
		webPreferences: {
			nodeIntegration: false,
			preload: path.join(__dirname, 'browser.js'),
			plugins: true,
			partition: 'persist:asana',
			spellcheck: true
		}
	};
	Object.assign(opts, config.get('winBounds'));

	const win = new BrowserWindow(opts);

	win.loadURL('https://app.asana.com/');

	win.on('close', (e) => {
		if (!isQuitting) {
			e.preventDefault();

			if (process.platform === 'darwin') {
				app.hide();
			} else {
				win.hide();
			}
		} else {
			// save window size and position
			config.set('winBounds', win.getBounds());
		}
	});

	win.on('page-title-updated', (e, title) => {
		e.preventDefault();
		updateBadgeInfo(title);
	});

	return win;
}

ipcMain.on('update-menu', () => {
	Menu.setApplicationMenu(menu.slice(1));
})

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