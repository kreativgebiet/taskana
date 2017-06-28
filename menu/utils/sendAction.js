
const { BrowserWindow } = require('electron');

module.exports = function sendAction(action) {
	const [win] = BrowserWindow.getAllWindows();
	if (process.platform === 'darwin') win.restore();
	win.webContents.send(action);
}
