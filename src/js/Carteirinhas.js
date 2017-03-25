const electron = require('electron')
const ipcRenderer = electron.ipcRenderer
const remote = electron.remote
const BrowserWindow = remote.BrowserWindow
const dialog = remote.dialog
const Menu = remote.Menu
const MenuItem = remote.MenuItem
const xlsx = require('node-xlsx')

const Carteirinhas = function () {}

Carteirinhas.prototype.Utils = {
	devTools: function () {},
	objectObserverSync: function (name, obj) {},
	arrayObserverSync: function (name, arr) {},
	getStorageItem: function (name) {},
	setStorageItem: function (name, value) {}
}

Carteirinhas.prototype.Data = {
	Mode: '',
	Excel: {
		File: '',
		Content: []
	},
	Photos: {
		Directory: ''
	},
	setMode: function (mode, callback) {},
	setExcelFile: function (file, callback) {},
	setExcelContent: function (content, callback) {},
	setPhotosDirectory: function (directory, callback) {},
	refresh: function (callback) {},
	observe: function (callback) {},
	observeExcel: function (callback) {},
	observeExcelContent: function (callback) {},
	observePhotos: function (callback) {}
}

Carteirinhas.prototype.Main = {
	window: null,
	init: function () {},
	mainMenu: function () {}
}

Carteirinhas.prototype.Gerar = {
	window: null,
	init: function () {},
	mainMenu: function () {}
}

Carteirinhas.prototype.Imprimir = {
	window: null,
	init: function () {}
}

module.exports = Carteirinhas
