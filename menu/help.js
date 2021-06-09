const { shell, app } = require('electron');
const os = require('os');

module.exports = {
	label: 'Help',
	submenu: [
		{
			label: 'Learn the Basics',
			click: () => shell.openExternal('https://asa.na/2eh2m'),
		},
		{
			label: 'Plan your Day',
			click: () => shell.openExternal('https://asa.na/2jji9'),
		},
		{
			type: 'separator',
		},
		{
			label: 'Keyboard Shortcuts',
			click: () => shell.openExternal('https://asana.com/guide/help/faq/shortcuts'),
		},
		{
			type: 'separator',
		},
		{
			label: 'Asana Guide',
			click: () => shell.openExternal('https://asa.na/g4tqk'),
		},
		{
			label: 'Help with Features',
			click: () => shell.openExternal('https://asa.na/snw30'),
		},
		{
			label: 'Video Tutorials',
			click: () => shell.openExternal('https://asa.na/9ksju'),
		},
		{
			label: 'Contact Asana Support',
			click: () => shell.openExternal('https://asa.na/uwr6s'),
		},
		{
			type: 'separator',
		},
		{
			label: 'Asana Blog',
			click: () => shell.openExternal('https://asa.na/jzqt6'),
		},
		{
			label: 'Discover Apps & Integrations',
			click: () => shell.openExternal('https://asa.na/e3m0m'),
		},
		{
			type: 'separator',
		},
		{
			label: `${app.getName()} Website...`,
			click: () => shell.openExternal('https://mountainash.github.io/taskana/'),
		},
		{
			label: 'Report an Issue...',
			click: () => {
				const body = `
**Please succinctly describe your issue and steps to reproduce it.**
-
${app.getName()} ${app.getVersion()}
${process.platform} ${process.arch} ${os.release()}`;

				shell.openExternal(`https://github.com/mountainash/taskana/issues/new?body=${encodeURIComponent(body)}`);
			},
		},
	],
};