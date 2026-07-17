const STORAGE_KEY = 'amigo_secreto_lista';

let listaAmigos = carregarLista();

function carregarLista() {
    try {
        const dados = localStorage.getItem(STORAGE_KEY);
        return dados ? JSON.parse(dados) : [];
    } catch {
        return [];
    }
}

function salvarLista() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listaAmigos));
}

function adicionarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nomeAmigo = inputAmigo.value.trim();

    if (nomeAmigo === '') {
        alert('Por favor, digite um nome válido.');
        return;
    }

    if (listaAmigos.includes(nomeAmigo)) {
        alert('Este nome já foi adicionado!');
        return;
    }

    listaAmigos.push(nomeAmigo);
    salvarLista();
    inputAmigo.value = '';
    inputAmigo.focus();
    atualizarListaAmigos();
}

function removerAmigo(index) {
    const nome = listaAmigos[index];
    listaAmigos.splice(index, 1);
    salvarLista();
    atualizarListaAmigos();
}

function limparLista() {
    if (listaAmigos.length === 0) return;
    if (!confirm('Tem certeza que deseja limpar toda a lista?')) return;
    listaAmigos = [];
    salvarLista();
    atualizarListaAmigos();
    document.getElementById('resultado').innerHTML = '';
}

function atualizarListaAmigos() {
    const listaAmigosElement = document.getElementById('listaAmigos');
    listaAmigosElement.innerHTML = '';

    listaAmigos.forEach((amigo, index) => {
        const itemLista = document.createElement('li');
        itemLista.textContent = `${index + 1}. ${amigo}`;

        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = ' ×';
        botaoRemover.setAttribute('aria-label', 'Remover ' + amigo);
        botaoRemover.onclick = () => removerAmigo(index);

        itemLista.appendChild(botaoRemover);
        listaAmigosElement.appendChild(itemLista);
    });
}

function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert('Adicione pelo menos 2 amigos para realizar o sorteio!');
        return;
    }

    const embaralhada = embaralharLista([...listaAmigos]);
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = '';

    for (let i = 0; i < embaralhada.length; i++) {
        const de = embaralhada[i];
        const para = embaralhada[(i + 1) % embaralhada.length];
        const itemResultado = document.createElement('li');
        itemResultado.textContent = `${de} → ${para}`;
        resultadoElement.appendChild(itemResultado);
    }
}

function embaralharLista(lista) {
    const novaLista = [...lista];
    for (let i = novaLista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [novaLista[i], novaLista[j]] = [novaLista[j], novaLista[i]];
    }
    return novaLista;
}

document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');

    inputAmigo.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            adicionarAmigo();
        }
    });

    atualizarListaAmigos();
});
