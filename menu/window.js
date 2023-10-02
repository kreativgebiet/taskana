const { BrowserWindow } = require('electron');

module.exports = {
	label: 'Window',
	role: 'window',
	submenu: [{
		label: 'Minimize',
		accelerator: 'CommandOrControl+M',
		role: 'minimize'
	}, {
		label: 'Close',
		accelerator: 'CommandOrControl+W',
		role: 'close'
	}, {
		type: 'separator'
	}, {
		label: 'Bring All to Front',
		role: 'front'
	}]
}