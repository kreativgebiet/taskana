const ipc = require('ipc');

// ipc.sendSync('change-menu', 'test');

ipc.on('show-account-settings', () => {
	click(document.querySelector('.topbar-settingsMenuButton'));
	var aTags = document.querySelectorAll('.menuItem-button');

	// Hack to find profile settings
	for (var i = 0; i < aTags.length; i++) {
		if (aTags[i].firstChild.textContent == 'My Profile Settings') {
			click(aTags[i]);
			break;
		}
	}
});

ipc.on('show-workspace-settings', () => {
	click(document.querySelector('.topbar-settingsMenuButton'));
	click(document.querySelector('.topbarSettingsMenu-domainSettings'));
});

ipc.on('new-task', () => {
	click(document.querySelector('.topbar .omnibutton-button'));
	click(document.querySelector('.omnibutton-addTask'));
});

ipc.on('new-project', () => {
	click(document.querySelector('.topbar .omnibutton-button'));
	click(document.querySelector('.omnibutton-addProject'));
});

ipc.on('new-conversation', () => {
	click(document.querySelector('.topbar .omnibutton-button'));
	click(document.querySelector('.omnibutton-addConversation'));
})

// Team
ipc.on('team-invite', () => {
	click(document.querySelector('.topbar .omnibutton-button'));
	click(document.querySelector('.omnibutton-invite'));
});

ipc.on('team-conversations', () => {
	click(document.querySelector('.topbar-navButton'));
	click(document.querySelector('.team .team-page-link'));
	click(document.querySelector('.navigationDockView-closeButton'));
});

ipc.on('team-calendar', () => {
	click(document.querySelector('.topbar-navButton'));
	click(document.querySelector('.team .team-calendar-link'));
	click(document.querySelector('.navigationDockView-closeButton'));
});

ipc.on('team-show', () => {
	click(document.querySelector('.topbar-settingsMenuButton'));
	click(document.querySelector('.topbarSettingsMenu-domainSettings'));
	click(document.querySelector('.tab-view .members.tag a'));
});

ipc.on('my-dashboard', () => {
	click(document.querySelector('.topbar-navButton'));
	click(document.querySelector('.my-dashboard'));
	click(document.querySelector('.navigationDockView-closeButton'));
});

ipc.on('my-tasks', () => {
	click(document.querySelector('.topbar-myTasksButton'));
});

ipc.on('my-inbox', () => {
	click(document.querySelector('.topbar-notificationsButton'));
});

ipc.on('toggle-list', () => {
	click(document.querySelectorAll('.tab-nav-bar .tab-nav a')[0]);
});

ipc.on('toggle-calendar', () => {
	click(document.querySelectorAll('.tab-nav-bar .tab-nav a')[1]);
});

ipc.on('toggle-files', () => {
	click(document.querySelectorAll('.tab-nav-bar .tab-nav a')[2]);
});

ipc.on('search', () => {
	var searchInput = document.getElementById('nav_search_input');
	var searchBar = document.querySelector('.search-field-wrapper');

	searchBar.style.opacity = 1;
	searchBar.style.pointerEvents = 'initial';
	searchInput.focus();

	searchInput.addEventListener('blur', evt => {
		searchBar.style.opacity = 0;
		searchBar.style.pointerEvents = 'none';
	}, true);
});


function click(element) {
	var event; // The custom event that will be created

  if (document.createEvent) {
    event = document.createEvent("HTMLEvents");
    event.initEvent('click', true, true);
  } else {
    event = document.createEventObject();
    event.eventType = 'click';
  }

  event.eventName = 'click';

  if (document.createEvent) {
    element.dispatchEvent(event);
  } else {
    element.fireEvent("on" + event.eventType, event);
  }
};
