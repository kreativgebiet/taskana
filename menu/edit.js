module.exports = {
	label: 'Edit',
	submenu: [{
		label: 'Undo',
		accelerator: 'CommandOrControl+Z',
		role: 'undo'
	}, {
		label: 'Redo',
		accelerator: 'Shift+CommandOrControl+Z',
		role: 'redo'
	}, {
		type: 'separator'
	}, {
		label: 'Cut',
		accelerator: 'CommandOrControl+X',
		role: 'cut'
	}, {
		label: 'Copy',
		accelerator: 'CommandOrControl+C',
		role: 'copy'
	}, {
		label: 'Paste',
		accelerator: 'CommandOrControl+V',
		role: 'paste'
	}, {
		label: 'Select All',
		accelerator: 'CommandOrControl+A',
		role: 'selectall'
	}]
}