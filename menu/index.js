const { Menu } = require('electron');

const main = require('./main');
const tasks = require('./tasks');
const edit = require('./edit');
const window = require('./window');
const help = require('./help');

const template = [main, tasks, edit, window, help];

module.exports = Menu.buildFromTemplate(template);