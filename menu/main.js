const { app } = require('electron');
const sendAction = require('./utils/sendAction');

const appName = app.getName();

module.exports = {
	label: appName,
	submenu: [
		{
			label: `About ${appName}`,
			selector: 'orderFrontStandardAboutPanel:',
		},
		{
			type: 'separator',
		},
		{
			label: 'Preferences',
			accelerator: 'Cmd+;',
			click: () => sendAction('show-preferences'),
		},
		{
			type: 'separator',
		},
		{
			label: 'Services',
			role: 'services',
			submenu: [],
		},
		{
			type: 'separator',
		},
		{
			label: `Hide ${appName}`,
			accelerator: 'Cmd+H',
			role: 'hide',
		},
		{
			label: 'Hide Others',
			accelerator: 'Cmd+Option+H',
			role: 'hideothers',
		},
		{
			label: 'Show All',
			role: 'unhide',
		},
		{
			type: 'separator',
		},
		{
			label: `Quit ${appName}`,
			accelerator: 'Cmd+Q',
			click: () => app.quit(),
		},
	],
};