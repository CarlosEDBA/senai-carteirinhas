var Utils = Carteirinhas.prototype.Utils;
var Data = Carteirinhas.prototype.Data;

Data.Mode = ''
Data.Excel.File = ''
Data.Excel.Content = []
Data.Photos.Directory = ''

Data.setMode = function (mode, callback) {
	this.Mode = mode
	if (callback) callback()
	return this
}

Data.setExcelFile = function (file, callback) {
	this.Excel.File = file
	if (callback) callback()
	return this
}

Data.setExcelContent = function (content, callback) {
	this.Excel.Content = content
	if (callback) callback()
	return this
}

Data.setPhotosDirectory = function (directory, callback) {
	this.Photos.Directory = directory
	if (callback) callback()
	return this
}

Data.refresh = function (callback) {
	var mode = Utils.getStorageItem('Carteirinhas.Data.Mode')
	var excelFile = Utils.getStorageItem('Carteirinhas.Data.Excel.File')
	var excelContent = Utils.getStorageItem('Carteirinhas.Data.Excel.Content')
	var photosDirectory = Utils.getStorageItem('Carteirinhas.Data.Photos.Directory')

	this.Mode = mode
	this.Excel.File = excelFile
	this.Excel.Content = excelContent
	this.Photos.Directory = photosDirectory

	if (callback) callback()

	return this
}

Data.observe = function (callback) {
	Utils.objectObserverSync('Carteirinhas.Data', this)
	if (callback) callback()
}

Data.observeExcel = function (callback) {
	Utils.objectObserverSync('Carteirinhas.Data.Excel', this.Excel)
	if (callback) callback()
}

Data.observeExcelContent = function (callback) {
	Utils.objectObserverSync('Carteirinhas.Data.Excel.Content', this.Excel.Content)
	if (callback) callback()
}

Data.observePhotos = function (callback) {
	Utils.objectObserverSync('Carteirinhas.Data.Photos', this.Photos)
	if (callback) callback()
}
