
const { shell, app } = require('electron');
const os = require('os');

module.exports = {
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
		label: `${app.getName()} Website...`,
		click() {
			shell.openExternal('https://github.com/kreativgebiet/taskana');
		}
	}, {
		label: 'Report an Issue...',
			click() {
				console.log(os.release());
			const body = `
**Please succinctly describe your issue and steps to reproduce it.**
-
${app.getName()} ${app.getVersion()}
${process.platform} ${process.arch} ${os.release()}`;

			shell.openExternal(`https://github.com/kreativgebiet/taskana/issues/new?body=${encodeURIComponent(body)}`);
		}
	}]
};
