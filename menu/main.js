const { app, autoUpdater } = require('electron');
const sendAction = require('./utils/sendAction');
// const config = require('../config');

const appName = app.getName();

module.exports = {
	label: appName,
	submenu: [{
		label: `About ${appName}`,
		selector: 'orderFrontStandardAboutPanel:',
	}, {
	// 	type: 'separator'
	// }, {
	// 	label: 'Account Settings...',
	// 	accelerator: 'Command+,',
	// 	click: () => sendAction('show-account-settings'),
	// }, {
	// 	label: 'Workspace Settings',
	// 	click: () => sendAction('show-workspace-settings'),
	// }, {
	// 	type: 'separator',
	// }, {
	// 	label: 'Toggle Vibrancy',
	// 	type: 'checkbox',
	// 	checked: config.get('vibrancy'),
	// 	click: () => sendAction('toggle-vibrancy'),
	// }, {
	// 	type: 'separator',
	// }, {
	// 	label: 'Check for updates',
	// 	click: () => autoUpdater.checkForUpdates(),
	// }, {
	// 	type: 'separator'
	// }, {
	// 	label: 'Services',
	// 	role: 'services',
	// 	submenu: []
	// }, {
	// 	type: 'separator'
	// }, {
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
		click: () => app.quit(),
	}]
};
