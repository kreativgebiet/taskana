const { ipcRenderer } = require('electron');
const keyStore = require('./src/keystore');

ipcRenderer.on('new-task', () => {
	document.querySelector('.TopbarPageHeaderGlobalActions-omnibutton').click();

	setTimeout(function() {
		document.querySelector('.Omnibutton-addTask').click();
	}, 15);
});

document.addEventListener('readystatechange', async () => {
	const DomHooks = {
		'loginform': '.LoginEmailPasswordForm',
		'loginusername': 'input[name=e]',
		'loginpassword': 'input[name=p]',
		'loginbutton': '[role=button]'
	};

	if (document.location.pathname.endsWith('/login')) {
		const loginform = document.querySelector(DomHooks.loginform);
		const loginusername = loginform.querySelector(DomHooks.loginusername);
		const loginpassword = loginform.querySelector(DomHooks.loginpassword);

		try { // try using saved login
			const loginkeys = await keyStore.getKey();

			// setTimeout(function() {
				loginusername.value = loginkeys.username || 'nothing';
				loginpassword.value = loginkeys.password;
			// }, 100); // running later as Asana clears the inputs (changed: using `readystatechange` for document listener instead of `DOMContentLoaded`)
		} catch (error) {
			console.log('no login previously stored');
		}

		const loginsubmitted = function() {
			let username = loginusername.value;
			let password = loginpassword.value;

			if (username && password) {
				keyStore.deleteKeys(); // delete any exiting logins
				keyStore.addKey(username, password); // store the users details for auto-login next time
			}
		};

		// add a listener to the form to capture login details and store them
		// would be nice to add to just the <FORM> submit event, but React/Nuxt (used by Asana) captures the events lower in the DOM
		loginform.addEventListener('submit', loginsubmitted);
		loginform.querySelector(DomHooks.loginbutton).addEventListener('click', loginsubmitted);
		loginusername.addEventListener('keyup', (e) => {
			if (e.code == 'Enter')
				loginsubmitted()
		});
		loginpassword.addEventListener('keyup', (e) => {
			if (e.code == 'Enter')
				loginsubmitted()
		});
	}
});