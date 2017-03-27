var xlsx = require('node-xlsx')

var workSheetsFromFile = xlsx.parse('./carteirinhass.xlsx')
var length = workSheetsFromFile[0].data.length
var data = workSheetsFromFile[0].data
var alunos = []

for (var i = 4; i < length; i++) {
	var aluno = data[i]
	alunos.push(aluno)
}

console.log(alunos)
