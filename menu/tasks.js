const sendAction = require('./utils/sendAction');

module.exports = {
	label: 'Tasks',
	submenu: [{
		label: 'New Task',
		accelerator: 'CommandOrControl+N',
		click: () => sendAction('new-task')
	}]
};