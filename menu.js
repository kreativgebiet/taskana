
const { app, Menu, BrowserWindow, shell } = require('electron');
const { autoUpdater } = require('electron-updater');

const appName = app.getName();

function sendAction(action) {
	const [win] = BrowserWindow.getAllWindows();
	if (process.platform === 'darwin') win.restore();
	win.webContents.send(action);
}

const template = [{
	label: appName,
	submenu: [{
		label: `About ${appName}`,
		selector: 'orderFrontStandardAboutPanel:',
	}, {
		type: 'separator'
	}, {
		label: 'Account Settings...',
		accelerator: 'Command+,',
		click: () => sendAction('show-account-settings'),
	}, {
		label: 'Workspace Settings',
		click: () => sendAction('show-workspace-settings'),
	}, {
		label: 'Check for updates',
		click() {
			autoUpdater.checkForUpdates();
		}
	}, {
		type: 'separator'
	}, {
		label: 'Services',
		role: 'services',
		submenu: []
	}, {
		type: 'separator'
	}, {
		label: `Hide ${appName}`,
		accelerator: 'Cmd+H',
		role: 'hide'
	}, {
		label: 'Hide Others',
		accelerator: 'Cmd+Shift+H',
		role: 'hideothers'
	}, {
		label: 'Show All',
		role: 'unhide'
	}, {
		type: 'separator'
	}, {
		label: `Quit ${appName}`,
		accelerator: 'Cmd+Q',
		click() {
			app.quit();
		}
	}]
}, {
	label: 'Tasks',
	submenu: [{
		label: 'New Task',
		accelerator: 'Command+N',
		click: () => sendAction('new-task'),
	}, {
		label: 'New Section',
		accelerator: 'Command+Shift+N',
		click: () => sendAction('new-section'),
	}]
}, {
	label: 'View',
	submenu: [{
		label: 'My Tasks',
		click: () => sendAction('my-tasks'),
	}, {
		label: 'My Dashboard',
		click: () => sendAction('my-dashboard'),
	}, {
		label: 'My Inbox',
		click: () => sendAction('my-inbox'),
	}]
}, {
	label: 'Edit',
	submenu: [{
		label: 'Undo',
		accelerator: 'CmdOrCtrl+Z',
		role: 'undo'
	}, {
		label: 'Redo',
		accelerator: 'Shift+CmdOrCtrl+Z',
		role: 'redo'
	}, {
		type: 'separator'
	}, {
		label: 'Cut',
		accelerator: 'CmdOrCtrl+X',
		role: 'cut'
	}, {
		label: 'Copy',
		accelerator: 'CmdOrCtrl+C',
		role: 'copy'
	}, {
		label: 'Paste',
		accelerator: 'CmdOrCtrl+V',
		role: 'paste'
	}, {
		label: 'Select All',
		accelerator: 'CmdOrCtrl+A',
		role: 'selectall'
	}]
}, {
	label: 'Window',
	role: 'window',
	submenu: [{
		label: 'Minimize',
		accelerator: 'CmdOrCtrl+M',
		role: 'minimize'
	}, {
		label: 'Close',
		accelerator: 'CmdOrCtrl+W',
		role: 'close'
	}, {
		type: 'separator'
	}, {
		label: 'Bring All to Front',
		role: 'front'
	}, {
		label: 'Toggle Full Screen',
		accelerator: 'Ctrl+Cmd+F',
		click() {
			const win = BrowserWindow.getAllWindows()[0];
			win.setFullScreen(!win.isFullScreen());
		}
	}]
}, {
	label: 'Help',
	submenu: [{
		label: 'Learn the Basics',
		click() { shell.openExternal('http://asa.na/2eh2m'); }
	}, {
		label: 'Plan your Day',
		click() { shell.openExternal('http://asa.na/2jji9'); }
	}, {
		type: 'separator'
	}, {
		label: 'Asana Guide',
		click() { shell.openExternal('http://asa.na/g4tqk'); }
	}, {
		label: 'Help with Features',
		click() { shell.openExternal('http://asa.na/snw30'); }
	}, {
		label: 'Video Tutorials',
		click() { shell.openExternal('http://asa.na/9ksju'); }
	}, {
		label: 'Contact Support',
		click() { shell.openExternal('http://asa.na/uwr6s'); }
	}, {
		type: 'separator'
	}, {
		label: 'Asana Blog',
		click() { shell.openExternal('http://asa.na/jzqt6'); }
	}, {
		label: 'Discover Apps & Integrations',
		click() { shell.openExternal('http://asa.na/e3m0m'); }
	}, {
		type: 'separator'
	}, {
		label: `${appName} Website...`,
		click() {
			shell.openExternal('https://github.com/iduuck/taskana');
		}
	}, {
		label: 'Report an Issue...',
		click() {
			const body = `
**Please succinctly describe your issue and steps to reproduce it.**
-
${app.getName()} ${app.getVersion()}
${process.platform} ${process.arch} ${os.release()}`;

			shell.openExternal(`https://github.com/iduuck/taskana/issues/new?body=${encodeURIComponent(body)}`);
		}
	}]
}];

module.exports = Menu.buildFromTemplate(template);
