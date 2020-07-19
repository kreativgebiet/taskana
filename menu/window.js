const { BrowserWindow } = require('electron');

module.exports = {
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
	}]
}