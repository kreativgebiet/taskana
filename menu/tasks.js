
const sendAction = require('./utils/sendAction');

module.exports = {
	label: 'Tasks',
	submenu: [{
		label: 'New Task',
		accelerator: 'Command+N',
		click: () => sendAction('new-task'),
	}, {
		label: 'New Section',
		accelerator: 'Command+Shift+N',
		click: () => sendAction('new-section'),
	}]
};
