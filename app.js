// Variáveis globais
let listaAmigos = [];

// Função para adicionar um amigo à lista
function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nomeAmigo = inputAmigo.value.trim();

    // Validação do nome
    if (nomeAmigo === '') {
        alert('Por favor, digite um nome válido.');
        return;
    }

    if (listaAmigos.includes(nomeAmigo)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    // Adiciona à lista
    listaAmigos.push(nomeAmigo);
    inputAmigo.value = ''; // Limpa o campo de input
    atualizarListaAmigos();
}

// Função para atualizar a lista visual de amigos
function atualizarListaAmigos() {
    const listaAmigosElement = document.getElementById('listaAmigos');
    listaAmigosElement.innerHTML = '';

    listaAmigos.forEach((amigo, index) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = `${index + 1}. ${amigo}`;
        listaAmigosElement.appendChild(itemLista);
    });
}

// Função para sortear os amigos secretos
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para realizar o sorteio!');
        return;
    }

    const embaralhada = embaralharLista([...listaAmigos]);
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = '';

    // Circular shift: cada pessoa sorteia a próxima da lista embaralhada
    for (let i = 0; i < embaralhada.length; i++) {
        const de = embaralhada[i];
        const para = embaralhada[(i + 1) % embaralhada.length];
        const itemResultado = document.createElement('li');
        itemResultado.textContent = `${de} → ${para}`;
        resultadoElement.appendChild(itemResultado);
    }
}

// Função para embaralhar uma lista (algoritmo Fisher-Yates)
function embaralharLista(lista) {
    const novaLista = [...lista];
    for (let i = novaLista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novaLista[i], novaLista[j]] = [novaLista[j], novaLista[i]];
    }
    return novaLista;
}

// Event listeners para melhor usabilidade
document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');
    
    // Permite adicionar com Enter
    inputAmigo.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            adicionarAmigo();
        }
    });
});