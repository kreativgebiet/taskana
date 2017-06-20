'use strict';

const {
	app,
	BrowserWindow,
	Menu,
	ipcMain,
} = require('electron');

const path          = require('path');
const menu          = require('./menu');
const fs            = require('fs');

require('electron-debug')();

let mainWindow;
let page;

function onClosed() {
	mainWindow = null;
	page = null;
}

function createMainWindow() {
	const win = new BrowserWindow({
		title: app.getName(),
		width: 1000,
		height: 600,
		show: false,
		icon: path.join(__dirname, 'media', 'Taskana.icns'),
		minWidth: 800,
		minHeight: 600,
		titleBarStyle: 'hidden-inset',
		maximizable: false,
		fullscreenable: false,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, 'browser.js'),
			plugins: true
		}
	});

	win.loadURL('https://app.asana.com/');
	win.on('closed', onClosed);

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate-with-no-open-windows', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
		page = mainWindow.webContents;
	}
});

app.on('ready', () => {
	mainWindow = createMainWindow();
	page = mainWindow.webContents;

	// Open new browser window on external open
	page.on('new-window', (event, url) => {
		event.preventDefault();
		require('shell').openExternal(url);
	});

	// Set the menu application menu
	Menu.setApplicationMenu(menu);

	page.on('dom-ready', function() {
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
		mainWindow.show();
	});
});
