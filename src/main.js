'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipcMain = electron.ipcMain

const xlsx = require('node-xlsx')

let CARTEIRINHAS_MAIN

function processExcelAlunos (event, file) {
	var workSheetsFromFile = xlsx.parse(file)
	var length = workSheetsFromFile[0].data.length
	var data = workSheetsFromFile[0].data
	var alunos = []

	for (var i = 4; i < length; i++) {
		var aluno = {
			nome: data[i][2],
			nascimento: data[i][3],
			cpf: data[i][4],
			codigoDoAluno: data[i][5],
			validade: data[i][6],
			cidadeUnidade: data[i][7],
			curso: data[i][8]
		}
		//var aluno = data[i] 
		alunos.push(aluno)
	}

	event.sender.send('excelProcessed', alunos)
}

function processExcelColaboradores (event, file) {
	var workSheetsFromFile = xlsx.parse(file)
	var length = workSheetsFromFile[0].data.length
	var data = workSheetsFromFile[0].data
	var professores = []

	for (var i = 4; i < length; i++) {
		var professor = {
			primeiroNome: data[i][2],
			nomeAbreviado: data[i][3],
			tipo: data[i][4],
			nomeDaArea: data[i][5],
			tipoDaArea: data[i][6],
			unidade: data[i][7],
			validade: data[i][8],
			id: data[i][9]
		}
		professores.push(professor)
	}

	event.sender.send('excelProcessed', professores)
}

function createWindow () {
	CARTEIRINHAS_MAIN = new BrowserWindow({
		width: 465,
		height: 410,
		minWidth: 465,
		minHeight: 410
	})
	CARTEIRINHAS_MAIN.setTitle('Gerador de Carteirinhas - SENAI')
	CARTEIRINHAS_MAIN.setMenu(null)
	CARTEIRINHAS_MAIN.loadURL('file://' + __dirname + '/index.html')
	CARTEIRINHAS_MAIN.webContents.openDevTools()
	//CARTEIRINHAS_MAIN.webContents.send('alunos', getAlunos())
	ipcMain.on('processExcelAlunos', processExcelAlunos)
	ipcMain.on('processExcelColaboradores', processExcelColaboradores)
	CARTEIRINHAS_MAIN.on('closed', function() {
		CARTEIRINHAS_MAIN = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (CARTEIRINHAS_MAIN === null) {
		createWindow()
	}
})
