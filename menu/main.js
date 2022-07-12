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
			accelerator: 'CommandOrControl+,',
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
			accelerator: 'CommandOrControl+H',
			role: 'hide',
		},
		{
			label: 'Hide Others',
			accelerator: 'CommandOrControl+Alt+H',
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
			accelerator: 'CommandOrControl+Q',
			click: () => app.quit(),
		},
	],
};