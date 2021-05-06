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

		// try using saved login
		const loginkeys = await keyStore.getKey();

		// Trigger the attached `change` event to get the values into the Virtual DOM (as Asana runs React/Nuxt.js)
		const event = new Event('HTMLEvents');
		event.initEvent('change', true, false);

		if (loginkeys && loginkeys.username) {
			loginusername.value = loginkeys.username;
			loginusername.dispatchEvent(event);
		}

		if (loginkeys && loginkeys.password) {
			loginpassword.value = loginkeys.password;
			loginpassword.dispatchEvent(event);
		}

		const loginsubmitted = async function() {
			let username = loginusername.value;
			let password = loginpassword.value;

			if (username && password) {
				await keyStore.deleteKeys(); // delete any exiting logins
				await keyStore.addKey(username, password); // store the users details for auto-login next time
			}
		};

		// add a listener to the form to capture login details and store them
		// would be nice to add to just the <FORM> submit event, but React/Nuxt (used by Asana) captures the events lower in the DOM
		// loginform.addEventListener('submit', loginsubmitted);
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