// Referenciar as tags do html
let input = document.querySelector('input[name=tarefa]');
let botao = document.querySelector('#botao');
let lista = document.querySelector('#lista');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


const render = () => {
    lista.innerHTML = "";

    for (tarefa of tarefas) {

        //Criando um item de lista
        let itemLista = document.createElement('li');

        //Adicionar uma classe à tag
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        //Adicionar um evento no item da lista
        itemLista.onclick = () => removerTarefa(this);

        //Criar um texto para o item da lista
        let itemTexto = document.createTextNode(tarefa);

        //Adicionar o texto como filho do item da lista
        itemLista.appendChild(itemTexto);

        //Adicioanr o item da lista para a lista
        lista.appendChild(itemLista);
    };
};

//Executando a função para renderizar na tela
render();


//Adicionando evento ao botão
botao.onclick = () => {
    //Capturando o valor que está digitado ao input
    let novaTarefa = input.value;

    if (novaTarefa !== "") {
        //Adicionar a novaTarefa para a lista de tarefas
        tarefas.push(novaTarefa);

        //Remover o span
        removerSpan();
        
        //Salvar os dados no storage do navegador
        salvarDadosNoStorage();
    }else {
        removerSpan();
        
        let card = document.querySelector('.card');
        let span = document.createElement('span');

        span.setAttribute('class', 'alert alert-warning');

        let mensagem = document.createTextNode('Você precisar informar uma tarefa!');

        span.appendChild(mensagem);
        card.appendChild(span)
    }

    //Renderizar as tarefas
    render();
    input.value = '';
}

function removerSpan() {
    let card = document.querySelector('.card');
    let spans = document.querySelectorAll('span');

    for (let i = 0; i < spans.length; i++) {
        card.removeChild(spans[i]);
    }
}

function removerTarefa(tar) {
    //Remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    //Renderizar a tela novamente
    render();

    //Salvar dados no storage
    salvarDadosNoStorage();
}


function salvarDadosNoStorage() {
    //* Todo navegador web possui esta capacidade
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}
