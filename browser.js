
const electron = require('electron');
const config = require('./config');
const settingsMenuSelector = '.Topbar-settingsMenuButton';

// Host.prototype.ufuThatExceptionHandlerActive = function() {};

const { ipcRenderer } = electron;

function openSidebar() {
	document.querySelector('.Topbar-navButton').click();
}

function closeSidebar() {
	document.querySelector('.SidebarHeader-closeIcon').click();
}

ipcRenderer.on('toggle-vibrancy', () => {
	console.log('toggle-vibrancy');
	config.set('vibrancy', !config.get('vibrancy'));
	updateVibrancy();
});

ipcRenderer.on('show-account-settings', () => {
	document.querySelector(settingsMenuSelector).click();
	var aTags = querySelectorAll('.menuItem-button');

	// Hack to find profile settings
	for (var i = 0; i < aTags.length; i++) {
		if (aTags[i].firstChild.textContent == 'My Profile Settings...') {
			click(aTags[i]);
			break;
		}
	}
});

ipcRenderer.on('show-workspace-settings', () => {
	document.querySelector('.Topbar-settingsMenuButton').click();
	document.querySelector('.topbarSettingsMenu-domainSettings').click();
});

ipcRenderer.on('new-task', () => {
	document.querySelector('.TopbarPageHeaderGlobalActions-omnibutton').click();
	setTimeout(function() {
		document.querySelector('.Omnibutton-addTask').click();
	}, 30);
});

ipcRenderer.on('new-section', () => {
	document.querySelector('.GridHeader-addSectionButton').click();
});

ipcRenderer.on('new-project', () => {
	openSidebar();
	document.querySelector('.omnibutton-addProject').click();
});

// Team

ipcRenderer.on('new-team-task', () => {
	document.querySelector('.omnibutton-button').click();
	document.querySelector('.omnibutton-addTask').click();
});

ipcRenderer.on('new-team-conversation', () => {
	document.querySelector('.omnibutton-button').click();
	document.querySelector('.omnibutton-addConversation').click();
});

ipcRenderer.on('new-team-project', () => {
	document.querySelector('.omnibutton-button').click();
	document.querySelector('.omnibutton-addProject').click();
});

ipcRenderer.on('team-conversations', () => {
	openSidebar();
	document.querySelector('[title="Team Conversations"]').click();
	closeSidebar();
});

ipcRenderer.on('team-calendar', () => {
	openSidebar();
	document.querySelector('[title="Team Calendar"]').click();
	closeSidebar();
});

ipcRenderer.on('team-show', () => {
	document.querySelector('.SidebarTeamMembersList-addButton').click();
	document.querySelector('.SidebarTeamMembersExpandedList-pencilButton').click();
});

ipcRenderer.on('my-dashboard', () => {
	document.querySelector('.Topbar-myDashboardButton').click();
});

ipcRenderer.on('my-tasks', () => {
	document.querySelector('.Topbar-myTasksButton').click();
});

ipcRenderer.on('my-inbox', () => {
	document.querySelector('.Topbar-notificationsButton').click();
});

document.addEventListener('DOMContentLoaded', () => {
	updateVibrancy();
});

function updateVibrancy() {
	document.documentElement.classList.toggle('vibrancy', config.get('vibrancy'));
	ipcRenderer.send('set-vibrancy');
}
