class Lista {
	constructor(nomeCompleto, problemaRespiracao, idade, cidade, telefone, data) {
		this.nomeCompleto = nomeCompleto
		this.problemaRespiracao = problemaRespiracao
		this.idade = idade
		this.cidade = cidade
		this.telefone = telefone
		this.data = data
	}

	validarDados() {
		for(let i in this) {
			if(this[i] == undefined || this[i] == '' || this[i] == null) {
				return false
			}
		}
		return true
	}
}

class Bd {

	constructor() {
		let id = localStorage.getItem('id')

		if(id === null) {
			localStorage.setItem('id', 0)
		}
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')
		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}

	recuperarTodosRegistros() {

		//array de listas
		let listas = Array()

		let id = localStorage.getItem('id')

		//recuperar todas as listas cadastradas em localStorage
		for(let i = 1; i <= id; i++) {

			//recuperar a lista
			let lista = JSON.parse(localStorage.getItem(i))

			//existe a possibilidade de haver índices que foram pulados/removidos
			//nestes casos nós vamos pular esses índices
			if(lista === null) {
				continue
			}
			lista.id = i
			listas.push(lista)
		}

		return listas
	}

	pesquisar(lista){

		let listasFiltradas = Array()
		listasFiltradas = this.recuperarTodosRegistros()
		console.log(listasFiltradas);
		console.log(lista)

		
		//nomeCompleto
		if(lista.nomeCompleto != ''){
			console.log("filtro de nomeCompleto");
			listasFiltradas = listasFiltradas.filter(d => d.nomeCompleto == lista.nomeCompleto)
		}

		//problemaRespiracao
		if(lista.problemaRespiracao != ''){
			console.log("filtro de problemaRespiracao");
			listasFiltradas = listasFiltradas.filter(d => d.problemaRespiracao == lista.problemaRespiracao)
		}
		//Idade
		if(lista.idade != ''){
			console.log("filtro de idade");
			listasFiltradas = listasFiltradas.filter(d => d.idade == lista.idade)
		}
		//cidade
		if(lista.cidade != ''){
			console.log("filtro de cidade");
			listasFiltradas = listasFiltradas.filter(d => d.cidade == lista.cidade)
		}
		//telefone
		if(lista.telefone != ''){
			console.log("filtro de telefone");
			listasFiltradas = listasFiltradas.filter(d => d.telefon == lista.telefone)
		}
		//data
		if(lista.data != ''){
			console.log("filtro de data");
			listasFiltradas = listasFiltradas.filter(d => d.data == lista.data)
		}
		
		return listasFiltradas

	}

	remover(id){
		localStorage.removeItem(id)
	}
}

let bd = new Bd()


function cadastrarLista() {

	let nomeCompleto = document.getElementById('nomeCompleto')
	let problemaRespiracao = document.getElementById('problemaRespiracao')
	let idade = document.getElementById('idade')
	let cidade = document.getElementById('cidade')
	let telefone = document.getElementById('telefone')
	let data = document.getElementById('data')


	let lista = new Lista(
		nomeCompleto.value, 
		problemaRespiracao.value,
		idade.value,
		cidade.value,
		telefone.value,
		data.value

	)


	if(lista.validarDados()) {
		bd.gravar(lista)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Lista foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		//nomeCompletolog de sucesso
		$('#modalRegistraLista').modal('show') 
		nomeCompleto.value = ''
		problemaRespiracao.value = ''
		idade.value = ''
		cidade.value = ''
		telefone.value = ''
		//Revisar
		//data.value = ''

		
	} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistraLista').modal('show') 
	}
}

function carregaListaListas(listas = Array(), filtro = false) {

    if(listas.length == 0 && filtro == false){
		listas = bd.recuperarTodosRegistros() 
	}
	

	/*

	<tr>
		<td>15/03/2018</td>
		<td>Alimentação</td>
		<td>Compras do mês</td>
		<td>444.75</td>
	</tr>

	*/

	let listaListas = document.getElementById("listaListas")
    listaListas.innerHTML = ''
	listas.forEach(function(d){

		//Criando a linha (tr)
		var linha = listaListas.insertRow();

		//Criando as colunas (td)
		linha.insertCell(0).innerHTML = `${d.nomeCompleto}` 

		//Ajustar o problemaRespiracao
		switch(d.problemaRespiracao){
			case '1': d.problemaRespiracao = 'Yes'
				break
			case '2': d.problemaRespiracao = 'No'
				break
			
		}
		linha.insertCell(1).innerHTML = `${d.problemaRespiracao}` 
		linha.insertCell(2).innerHTML = d.idade
		linha.insertCell(3).innerHTML = d.cidade
		linha.insertCell(4).innerHTML = d.telefone
		linha.insertCell(5).innerHTML = d.data

	
		//Criar o botão de exclusão
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times"  ></i>'
		btn.id = `id_lista_${d.id}`
		btn.onclick = function(){
			let id = this.id.replace('id_lista_','')
			//alert(id)
			bd.remover(id)
			window.location.reload()
		}
		linha.insertCell(6).append(btn)
		console.log(d)
	})

 }

 
 function pesquisarLista(){
	 
	let nomeCompleto = document.getElementById("nomeCompleto").value
	let problemaRespiracao = document.getElementById("problemaRespiracao").value
	let idade = document.getElementById("idade").value
	let cidade = document.getElementById("cidade").value
	let telefone = document.getElementById("telefone").value
	let data = document.getElementById("data").value

	let lista = new Lista(nomeCompleto, problemaRespiracao,idade, cidade, telefone,data)

	let listas = bd.pesquisar(lista)
	 
	this.carregaListaListas(listas, true)

 }


 function imprimir(){
	tela_impressao = window.open('about:blank');
	var conteudo = `
  <!-- Bootstrap início -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
    crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
    crossorigin="anonymous"></script>
  <!-- Bootstrap fim -->

  <!-- Font Awesome -->
  <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js"></script>

	  <div class="row">
      <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-4 fw-normal">Attendance List</h1>
      </div>
    </div>
	  ${document.getElementById('print').innerHTML} 

		<h5> ${Date().toString()}</h5> <footer class="footer mt-auto py-3 fixed-bottom justify-content-md-center">
    <div class="container">
      <span class="text-muted">Edson Luiz dos Santos Junior - Web Developer.<br />
        Contact: +44 7754540377 - contato@edsonluiz.info - LinkedIn: <a href="https://www.linkedin.com/in/edsonlsj/"> https://www.linkedin.com/in/edsonlsj/</a></span>
    </div>
  </footer>
	`;
	console.log(conteudo)
   
   tela_impressao.document.write(conteudo);
   tela_impressao.window.print();
   tela_impressao.window.close();
	
}

function limpaTudo(){

	var resultado = confirm("Deseja excluir tuda a lista ?");
        if (resultado == true) {
					localStorage. clear()
          alert("Lista Excluida!"); 
					location.reload()   
        }
	
}
