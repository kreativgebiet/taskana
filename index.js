const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const menu = require('./menu');
const contextMenu = require('electron-context-menu');
const fs = require('fs');
const Store = require('electron-store')
const config = new Store();

const BASE_URL = 'https://app.asana.com/';
const notificationIndicator = '●';

let isQuitting = false;
let mainWindow;
let page;

function basicURL(url) {
	if (typeof url !== 'string') return false;

	const parsed = new URL(url);
	if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:')
		return false;

	return true;
}

function isURLAllowed(url) {
	return [
		/^https:\/\/accounts\.google\.com\/.*/i,
		/^https:\/\/app\.asana\.com\/.*/i,
		/^https:\/\/asana-user-private-us-east-1\.s3\.amazonaws\.com\/.*/i,
		/^https:\/\/.*\.doubleclick.net\/.*/i,
	].some((re) => url.match(re));
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
	contextMenu();

	let opts = {
		title: app.getName(),
		width: 1200,
		height: 600,
		show: false,
		acceptFirstMouse: true,
		webPreferences: {
			nodeIntegration: false,
			sandbox: false, // needed to allow "require" in preload script - as per https://github.com/electron/electron/issues/35587#issuecomment-1238940105
			preload: path.join(__dirname, 'browser.js'),
			plugins: true,
			partition: 'persist:asana',
			spellcheck: true
		}
	};
	Object.assign(opts, config.get('winBounds'));

	const win = new BrowserWindow(opts);

	win.loadURL(BASE_URL);

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

if ( !app.requestSingleInstanceLock() ) {
	app.quit();
}

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) mainWindow.restore();
		mainWindow.show();
	}
});

ipcMain.on('update-menu', () => {
	Menu.setApplicationMenu(menu.slice(1));
})

app.on('before-quit', () => isQuitting = true);

app.on('ready', () => {
	mainWindow = createMainWindow();
	page = mainWindow.webContents;

	autoUpdater.checkForUpdatesAndNotify();

	// Open new browser window on external open
	page.setWindowOpenHandler(({ url }) => {
		if ( basicURL(url) )
			shell.openExternal(url);

		return { action: 'deny' }; // prevent a new Electron window
	});

	page.on('will-navigate', (e, url) => {
		if (basicURL(url) && !isURLAllowed(url)) {
			e.preventDefault();
			shell.openExternal(url);
		}
	});

	page.on('will-redirect', (e, url) => {
		// `will-navigate` doesn't catch redirects
		if (basicURL(url) && !isURLAllowed(url)) {
			e.preventDefault();
			mainWindow.loadURL(BASE_URL);
			shell.openExternal(url);
		}
	});

	// Set the menu application menu
	Menu.setApplicationMenu(menu);

	// Insert CSS
	page.on('dom-ready', () => {
		page.insertCSS(fs.readFileSync(path.join(__dirname, 'browser.css'), 'utf8'));
		mainWindow.show();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// On OS X it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open
app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createMainWindow();
	}
});