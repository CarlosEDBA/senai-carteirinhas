var Main = Carteirinhas.prototype.Main
var Data = Carteirinhas.prototype.Data

var Windows = {
	Gerar: null
}

Main.window = remote.getCurrentWindow()

Main.init = function () {
	Main.window.setMenu(null)
	//this.mainMenu()
	this.setButtons()
	this.observe()

	return this
}

Main.mainMenu = function () {
	var template = [
		{
			label: 'Gerar para Alunos',
			role: 'gerarparaalunos',
			click: function () {
				this.optionAlunos()
			}.bind(this)
		},
		{
			label: 'Gerar para Colaboradores',
			role: 'gerarparacolaboradores',
			click: function () {
				this.optionColaboradores()
			}.bind(this)
		}
	]

	var menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

	return this
}

Main.optionAlunos = function () {
	Data.setMode('alunos', function () {
		this.openGerarWindow()
	}.bind(this))
}

Main.optionColaboradores = function () {
	Data.setMode('colaboradores', function () {
		this.openGerarWindow()
	}.bind(this))
}

Main.openGerarWindow = function () {
	if (Data.Mode !== '') {
		if (Windows.Gerar === null) {

			Windows.Gerar = new BrowserWindow({
				width: 465,
				height: 385,
				useContentSize: true,
			    fullscreen: false,
			    maximizable: false,
			    resizable: false,
				autoHideMenuBar: true,
				enableLargerThanScreen: true
			})

			Windows.Gerar.loadURL('file://' + __dirname + '/gerar.html')

			Main.window.hide()

			Windows.Gerar.on('closed', function() {
				Windows.Gerar = null
				Main.window.show()
			}.bind(this))
		} else {
			Windows.Gerar.close()	
		}
	} else {
		dialog.showErrorBox('Erro', 'Nenhum modo de geração foi selecionado!')
	}

	return this
}

Main.setButtons = function () {
	var optionAlunos = document.querySelector('.option-alunos')
	var optionColaboradores = document.querySelector('.option-colaboradores')

	optionAlunos.addEventListener('click', this.optionAlunos.bind(this))
	optionColaboradores.addEventListener('click', this.optionColaboradores.bind(this))
}

Main.observe = function () {
	Data.observe()
}
