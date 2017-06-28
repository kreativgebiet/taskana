
const sendAction = require('./utils/sendAction');

module.exports = {
	label: 'View',
	submenu: [{
		label: 'My Tasks',
		click: () => sendAction('my-tasks'),
	}, {
		label: 'My Dashboard',
		click: () => sendAction('my-dashboard'),
	}, {
		label: 'My Inbox',
		click: () => sendAction('my-inbox'),
	}]
}
