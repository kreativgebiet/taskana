const electron = require('electron');
const { ipcRenderer } = electron;

ipcRenderer.on('new-task', () => {
	document.querySelector('.TopbarPageHeaderGlobalActions-omnibutton').click();
	setTimeout(function() {
		document.querySelector('.Omnibutton-addTask').click();
	}, 15);
});