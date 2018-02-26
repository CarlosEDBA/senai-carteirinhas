var Imprimir = Carteirinhas.prototype.Imprimir
var Utils = Carteirinhas.prototype.Utils
var Data = Carteirinhas.prototype.Data


Imprimir.window = remote.getCurrentWindow()

Imprimir.init = function () {
	Imprimir.window.setMenu(null)
	//Utils.devTools()
	Data.refresh()
	this.setButtons()
	this.generateCarteirinhas()

	return this
}

Imprimir.createCarteirinha = function (data, ind) {
	switch (Data.Mode) {
		case 'alunos':
			this.carteirinhaAluno(data, ind)
			break
		case 'colaboradores':
			this.carteirinhaColaborador(data, ind)
			break
	}
}

Imprimir.carteirinhaAluno = function (aluno, ind) {
	var directory = Data.Photos.Directory
	var carteirinhas = document.querySelector('.carteirinhas');
	var carteirinha = document.createElement('div')
	carteirinha.setAttribute('class', 'carteirinha carteirinha-aluno')

	var div = document.createElement('div')
	div.setAttribute('class', 'foto')
	div.style.backgroundImage = "url(\"file:///" + directory.replace(/\\/g,"/") + "/" + aluno.codigoDoAluno + ".jpg\")"
	carteirinha.appendChild(div)

	console.log("url('file:///" + directory.replace(/\\/g,"/") + "/" + aluno.codigoDoAluno + ".jpg")

	var dados = document.createElement('div')
	dados.setAttribute('class', 'dados')

	var span = document.createElement('span')
	span.setAttribute('class', 'nome')
	span.innerHTML = aluno.nome
	dados.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'input curso')
	span.innerHTML = aluno.curso
	dados.appendChild(span)

	var div = document.createElement('div')
	div.setAttribute('class', 'multi-input')

	var span = document.createElement('span')
	span.setAttribute('class', 'input nascimento')
	span.innerHTML = aluno.nascimento
	div.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'input cpf')
	span.innerHTML = aluno.cpf
	div.appendChild(span)

	dados.appendChild(div)

	var div = document.createElement('div')
	div.setAttribute('class', 'multi-input')

	var span = document.createElement('span')
	span.setAttribute('class', 'input instituicao')
	span.innerHTML = 'SENAI'
	div.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'input codigoDoAluno')
	span.innerHTML = aluno.codigoDoAluno
	div.appendChild(span)

	dados.appendChild(div)

	var div = document.createElement('div')
	div.setAttribute('class', 'multi-input')

	var span = document.createElement('span')
	span.setAttribute('class', 'input cidadeUnidade')
	span.innerHTML = aluno.cidadeUnidade
	div.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'input validade')
	span.innerHTML = aluno.validade
	div.appendChild(span)

	dados.appendChild(div)

	/*
	var canvas = document.createElement('canvas')
	canvas.setAttribute('class', 'barcode')
	JsBarcode(canvas, aluno.codigoDoAluno, {
		width: 30,
		height: 400,
		textAlign: 'center',
		textPosition: 'bottom',
		textMargin: 2,
		fontSize: 115,
		margin: 10,
		lineColor: '#000',
		background: 'transparent',
	})

	carteirinha.appendChild(canvas)
	*/
	carteirinha.appendChild(dados)
	carteirinhas.appendChild(carteirinha)
}

Imprimir.carteirinhaColaborador = function (colaborador, ind) {
	var directory = Data.Photos.Directory
	var carteirinhas = document.querySelector('.carteirinhas');
	var carteirinha = document.createElement('div')
	carteirinha.setAttribute('class', 'carteirinha carteirinha-colaborador')

	var frente = document.createElement('div')
	frente.setAttribute('class', 'frente')

	var div = document.createElement('div')
	div.setAttribute('class', 'foto')
	div.style.backgroundImage = "url('file:///" + directory.replace(/\\/g,"/") + "/" + colaborador.id + ".jpg"
	frente.appendChild(div)

	var span = document.createElement('span')
	span.setAttribute('class', 'unidade')
	span.innerHTML = colaborador.unidade
	frente.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'primeiro-nome')
	span.innerHTML = colaborador.primeiroNome
	frente.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'tipo')
	span.innerHTML = colaborador.tipo
	frente.appendChild(span)

	var atras = document.createElement('div')
	atras.setAttribute('class', 'atras')

	var span = document.createElement('span')
	span.setAttribute('class', 'nome-abreviado')
	span.innerHTML = colaborador.nomeAbreviado
	atras.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'tipo-da-area')
	span.innerHTML = colaborador.tipoDaArea
	atras.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'nome-da-area')
	span.innerHTML = colaborador.nomeDaArea
	atras.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'validade')
	span.innerHTML = colaborador.validade
	atras.appendChild(span)

	var span = document.createElement('span')
	span.setAttribute('class', 'valido')
	span.innerHTML = 'Válido até ' + colaborador.validade
	atras.appendChild(span)

	var canvas = document.createElement('canvas')
	canvas.setAttribute('class', 'barcode')
	JsBarcode(canvas, colaborador.id, {
		width: 25,
		height: 500,
		textAlign: 'center',
		textPosition: 'bottom',
		textMargin: 2,
		fontSize: 125,
		margin: 10
	})
	atras.appendChild(canvas)

	carteirinha.appendChild(frente)
	carteirinha.appendChild(atras)
	carteirinhas.appendChild(carteirinha)
}

Imprimir.generateCarteirinhas = function () {
	;[].forEach.call(Data.Excel.Content, function (obj, ind, arr) {
		this.createCarteirinha(obj, ind)
	}.bind(this))
}

Imprimir.setButtons = function () {
	var btnImprimir = document.querySelector('.btn-imprimir');

	btnImprimir.addEventListener('click', this.print.bind(this))
}

Imprimir.print = function (e) {
	this.window.webContents.print({
		silent: false,
		printBackground: true
	})
}
