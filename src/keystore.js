const keytar = require('keytar');

const keystorename = 'taskana';

const _getKey = async () => {
	let keys = await keytar.findCredentials(keystorename);

	if (keys[0]) {
		return {
			'username': keys[0].account,
			'password': keys[0].password
		};
	}
}

const _addKey = async (username, password) => {
	keytar.setPassword(keystorename, username, password);
}

const _deleteKeys = async () => {
	// delete all logins from the keystore
	const logins = await keytar.findCredentials(keystorename);

	logins.forEach(async login => {
		console.log('Deleted', login.account);

		try {
			await keytar.deletePassword(keystorename, login.account);
		} catch (err) {
			console.log({ type: 'error', text: err.message });
		}
	});
}

const keyStore = {
	getKey: _getKey,
	addKey: _addKey,
	deleteKeys: _deleteKeys
}

module.exports = keyStore;