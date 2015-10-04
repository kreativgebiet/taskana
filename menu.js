const app = require('app');
const Menu = require('menu');
const BrowserWindow = require('browser-window');
const appName = app.getName();
const shell = require('shell');

function sendAction(action) {
	const win = BrowserWindow.getAllWindows()[0];
	win.restore();
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
		click() {
			sendAction('show-account-settings');
		}
	}, {
		label: 'Workspace Settings',
		click() {
			sendAction('show-workspace-settings');
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
		click() {
			sendAction('new-task');
		}
	}]
}, {
	label: 'Projects',
	submenu: [{
		label: 'New Project',
		click() {
			sendAction('new-project');
		}
	}]
}, {
	label: 'Team',
	submenu: [{
		label: 'Create New...',
		submenu: [{
			label: 'Task',
			click() {
				sendAction('new-task');
			}
		}, {
			label: 'Conversation',
			click() {
				sendAction('new-conversation');
			}
		}, {
			label: 'Project',
			click() {
				sendAction('new-project');
			}
		}, {
			label: 'Invite',
			click() {
				sendAction('team-invite');
			}
		}]
	}, {
		label: 'Invite new Member...',
		click() {
			sendAction('team-invite');
		}
	}, {
		type: 'separator'
	}, {
		label: 'Team Conversations',
		click() {
			sendAction('team-conversations');
		}
	}, {
		label: 'Team Calendar',
		click() {
			sendAction('team-calendar');
		}
	}, {
		label: 'Team Members',
		click() {
			sendAction('team-show');
		}
	}]
}, {
	label: 'Find',
	submenu: [{
		label: 'Find Tasks...',
		accelerator: 'Command+F',
		click() {
			sendAction('search');
		}
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
	label: 'View',
	submenu: [{
		label: 'My Dashboard',
		click() {
			sendAction('my-dashboard');
		}
	}, {
		label: 'My Tasks',
		click() {
			sendAction('my-tasks');
		}
	}, {
		label: 'My Inbox',
		click() {
			sendAction('my-inbox');
		}
	}, {
		type: 'separator'
	}, {
		label: 'Toggle List View',
		accelerator: 'Command+Shift+V',
		click() {
			sendAction('toggle-list');
		}
	}, {
		label: 'Toggle Calendar View',
		accelerator: 'Command+Shift+C',
		click() {
			sendAction('toggle-calendar');
		}
	}, {
		label: 'Toggle Files View',
		accelerator: 'Command+Shift+F',
		click() {
			sendAction('toggle-files');
		}
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
