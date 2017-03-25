var Gerar = Carteirinhas.prototype.Gerar
var Data = Carteirinhas.prototype.Data

var Windows = {
	Gerar: null,
	Imprimir: null
}

Gerar.window = remote.getCurrentWindow()

Gerar.init = function () {
	Gerar.window.setMenu(null)
	//Utils.devTools()
	Data.refresh()
	//this.mainMenu()
	this.setButtons()
	this.observe()

	return this
}

Gerar.mainMenu = function () {
	var template = [
		{
			label: 'Arquivo',
			submenu: [
				{
					label: 'Abrir Arquivo',
					accelerator: 'CmdOrCtrl+A',
					role: 'openfile',
					click: function () {
						this.openExcelDialog()
					}.bind(this)
				},
				{
					label: 'Abrir Pasta',
					accelerator: 'CmdOrCtrl+F',
					role: 'openfolder',
					click: function () {
						this.openPhotoDialog()
					}.bind(this)
				}
			]
		},
		{
			label: 'Avançado',
			submenu: [
				{
					label: 'Dev Tools',
					accelerator: 'F12',
					click: function () {
						remote.getCurrentWindow().toggleDevTools()
					}
				}
			]
		}
	]

	var menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

	return this
}

Gerar.processExcel = function (data) {
	var file = data[0]
	Data.setExcelFile(file, function () {
		switch (Data.Mode) {
			case 'alunos':
				ipcRenderer.send('processExcelAlunos', file)
				break
			case 'colaboradores':
				ipcRenderer.send('processExcelColaboradores', file)
				break
		}
		ipcRenderer.on('excelProcessed', function (event, data) {
			Data.setExcelContent(data)
		}.bind(this))
	}.bind(this))
}

Gerar.processPhotos = function (data) {
	var directory = data[0]
	Data.setPhotosDirectory(directory)
}

Gerar.openExcelDialog = function () {
	dialog.showOpenDialog({
		title: 'Escolha o arquivo:',
		filters: [
			{ name: 'Excel', extensions: ['xls', 'xlsx'] }
		],
		properties: [ 'openFile']
	}, function (file) {
		if (file !== undefined) {
			this.processExcel(file)
		}
	}.bind(this))

	return this
}

Gerar.openPhotoDialog = function () {
	dialog.showOpenDialog({
		title: 'Escolha o diretório:',
		filters: [
			{ name: 'Fotos', extensions: ['jpg', 'jpeg', 'png'] }
		],
		properties: [ 'openDirectory' ]
	}, function (directory) {
		if (directory !== undefined) {
			this.processPhotos(directory)
		}
	}.bind(this))

	return this
}

Gerar.generate = function (e) {
	if (Data.Excel.File !== '') {
		if (Data.Photos.Directory !== '') {
			switch (Data.Mode) {
				case 'alunos':
					if (Data.Excel.Content[0].codigoDoAluno !== undefined &&
						!isNaN(parseInt(Data.Excel.Content[0].codigoDoAluno))) {
							this.openImprimirWindow()
					} else {
						dialog.showErrorBox('Erro', 'Planilha inválida!')
						Data.Photos.Directory = ''
					}
					break
				case 'colaboradores':
					if (Data.Excel.Content[0].tipoDaArea !== undefined &&
						typeof Data.Excel.Content[0].tipoDaArea === 'string') {
							this.openImprimirWindow()
					} else {
						dialog.showErrorBox('Erro', 'Planilha inválida!')
						Data.Photos.Directory = ''
					}
					break
			}
			
		} else {
			dialog.showErrorBox('Erro', 'Escolha o diretório de Fotos!')
		}
	} else {
		dialog.showErrorBox('Erro', 'Abra um arquivo do Excel!')
	}
}

Gerar.openImprimirWindow = function () {
	if (Windows.Imprimir === null) {

		Windows.Imprimir = new BrowserWindow({
			width: 1100,
			height: 600,
			useContentSize: true,
			fullscreen: false,
			autoHideMenuBar: true,
			enableLargerThanScreen: true
		})

		Windows.Imprimir.loadURL('file://' + __dirname + '/imprimir.html')

		Gerar.window.hide()

		Windows.Imprimir.on('closed', function() {
			Windows.Imprimir = null
			Gerar.window.show()
		}.bind(this))
	} else {
		Windows.Imprimir.close()
	}

	return this
}

Gerar.setButtons = function () {
	var openExcel = document.querySelector('.open-excel')
	var openPhotos = document.querySelector('.open-photos')
	var btnGerar = document.querySelector('.btn-gerar')

	openExcel.addEventListener('click', this.openExcelDialog.bind(this))
	openPhotos.addEventListener('click', this.openPhotoDialog.bind(this))
	btnGerar.addEventListener('click', this.generate.bind(this))
}

Gerar.observe = function () {
	Data.observeExcel()
	//Data.observeExcelContent()
	Data.observePhotos()
}
