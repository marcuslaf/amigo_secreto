(function () {
    'use strict';

    var STORAGE_KEY = 'amigo_secreto_lista';
    var THEME_KEY = 'amigo_secreto_theme';

    // --- Theme (dark/light) ---
    function getPreferredTheme() {
        var saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem(THEME_KEY, theme);
    }

    applyTheme(getPreferredTheme());

    var listaAmigos = carregarLista();

    function carregarLista() {
        try {
            var dados = localStorage.getItem(STORAGE_KEY);
            return dados ? JSON.parse(dados) : [];
        } catch (e) {
            return [];
        }
    }

    function salvarLista() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listaAmigos));
    }

    // --- Modal ---
    var modalResolve = null;

    function showModal(opts) {
        var overlay = document.getElementById('modalOverlay');
        var iconEl = document.getElementById('modalIcon');
        var titleEl = document.getElementById('modalTitle');
        var msgEl = document.getElementById('modalMessage');
        var btnConfirm = document.getElementById('modalBtnConfirm');
        var btnCancel = document.getElementById('modalBtnCancel');

        titleEl.textContent = opts.title || '';
        msgEl.textContent = opts.message || '';

        if (opts.type === 'sucesso') {
            iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#00b894" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
        } else if (opts.type === 'erro') {
            iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#e17055" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
        } else if (opts.type === 'info') {
            iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#6C5CE7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
        } else if (opts.type === 'confirm') {
            iconEl.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#e17055" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="40" height="40"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
        }

        btnConfirm.textContent = opts.confirmText || 'OK';
        btnConfirm.className = 'modal__btn modal__btn--confirm';

        if (opts.type === 'confirm') {
            btnCancel.hidden = false;
            btnCancel.textContent = opts.cancelText || 'Cancelar';
        } else {
            btnCancel.hidden = true;
        }

        overlay.classList.add('active');
        btnConfirm.focus();

        return new Promise(function (resolve) {
            modalResolve = resolve;

            btnConfirm.onclick = function () {
                overlay.classList.remove('active');
                modalResolve = null;
                resolve(true);
            };
            btnCancel.onclick = function () {
                overlay.classList.remove('active');
                modalResolve = null;
                resolve(false);
            };
            overlay.onclick = function (e) {
                if (e.target === overlay) {
                    overlay.classList.remove('active');
                    modalResolve = null;
                    resolve(false);
                }
            };
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalResolve) {
            document.getElementById('modalOverlay').classList.remove('active');
            modalResolve(false);
            modalResolve = null;
        }
    });

    function atualizarContador() {
        var counter = document.getElementById('counter');
        counter.textContent = listaAmigos.length;
    }

    function toggleEmptyState() {
        var empty = document.getElementById('emptyState');
        var list = document.getElementById('listaAmigos');
        var hasItems = listaAmigos.length > 0;
        empty.hidden = hasItems;
        list.hidden = !hasItems;
    }

    function adicionarAmigo() {
        var inputAmigo = document.getElementById('amigo');
        var nomeAmigo = inputAmigo.value.trim();

        if (nomeAmigo === '') {
            showModal({ type: 'erro', title: 'Nome inválido', message: 'Por favor, digite um nome válido.' });
            inputAmigo.focus();
            return;
        }

        if (listaAmigos.includes(nomeAmigo)) {
            showModal({ type: 'erro', title: 'Nome duplicado', message: 'Este nome já foi adicionado!' });
            inputAmigo.select();
            return;
        }

        listaAmigos.push(nomeAmigo);
        salvarLista();
        inputAmigo.value = '';
        inputAmigo.focus();
        atualizarListaAmigos();
        showModal({ type: 'sucesso', title: 'Adicionado!', message: nomeAmigo + ' foi adicionado à lista.' });
    }

    function removerAmigo(index) {
        var nome = listaAmigos[index];
        var items = document.querySelectorAll('.participant-list__item');
        var itemEl = items[index];

        if (itemEl) {
            itemEl.classList.add('participant-list__item--removing');
            itemEl.addEventListener('animationend', function () {
                listaAmigos.splice(index, 1);
                salvarLista();
                atualizarListaAmigos();
            }, { once: true });
        } else {
            listaAmigos.splice(index, 1);
            salvarLista();
            atualizarListaAmigos();
        }

        showModal({ type: 'info', title: 'Removido', message: nome + ' foi removido da lista.' });
    }

    function limparLista() {
        if (listaAmigos.length === 0) return;

        showModal({
            type: 'confirm',
            title: 'Limpar lista',
            message: 'Tem certeza que deseja limpar toda a lista de participantes?',
            confirmText: 'Sim, limpar',
            cancelText: 'Manter lista'
        }).then(function (confirmado) {
            if (!confirmado) return;
            listaAmigos = [];
            salvarLista();
            atualizarListaAmigos();
            document.getElementById('resultadoContainer').hidden = true;
            document.getElementById('resultado').innerHTML = '';
            showModal({ type: 'sucesso', title: 'Lista limpa', message: 'Todos os participantes foram removidos.' });
        });
    }

    function atualizarListaAmigos() {
        var listaAmigosElement = document.getElementById('listaAmigos');
        listaAmigosElement.innerHTML = '';

        listaAmigos.forEach(function (amigo, index) {
            var itemLista = document.createElement('li');
            itemLista.className = 'participant-list__item';

            var avatar = document.createElement('span');
            avatar.className = 'participant-list__avatar';
            avatar.textContent = amigo.charAt(0).toUpperCase();
            avatar.setAttribute('aria-hidden', 'true');

            var nome = document.createElement('span');
            nome.className = 'participant-list__name';
            nome.textContent = amigo;

            var botaoRemover = document.createElement('button');
            botaoRemover.className = 'participant-list__remove';
            botaoRemover.setAttribute('aria-label', 'Remover ' + amigo);
            botaoRemover.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            botaoRemover.onclick = function () {
                removerAmigo(index);
            };

            itemLista.appendChild(avatar);
            itemLista.appendChild(nome);
            itemLista.appendChild(botaoRemover);
            listaAmigosElement.appendChild(itemLista);
        });

        atualizarContador();
        toggleEmptyState();
    }

    function embaralharLista(lista) {
        var novaLista = lista.slice();
        for (var i = novaLista.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = novaLista[i];
            novaLista[i] = novaLista[j];
            novaLista[j] = temp;
        }
        return novaLista;
    }

    function sortearAmigo() {
        if (listaAmigos.length < 2) {
            showModal({ type: 'erro', title: 'Poucos participantes', message: 'Adicione pelo menos 2 amigos para sortear!' });
            return;
        }

        var embaralhada = embaralharLista(listaAmigos);
        var resultadoElement = document.getElementById('resultado');
        var container = document.getElementById('resultadoContainer');
        resultadoElement.innerHTML = '';
        container.hidden = false;

        embaralhada.forEach(function (amigo, i) {
            var para = embaralhada[(i + 1) % embaralhada.length];
            var itemResultado = document.createElement('li');
            itemResultado.className = 'result-list__item';

            var deEl = document.createElement('span');
            deEl.className = 'result-list__from';
            deEl.textContent = amigo;

            var arrow = document.createElement('span');
            arrow.className = 'result-list__arrow';
            arrow.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';

            var paraEl = document.createElement('span');
            paraEl.className = 'result-list__to';
            paraEl.textContent = para;

            itemResultado.appendChild(deEl);
            itemResultado.appendChild(arrow);
            itemResultado.appendChild(paraEl);
            resultadoElement.appendChild(itemResultado);
        });

        showModal({ type: 'sucesso', title: 'Sorteio realizado!', message: 'Os pares foram sorteados com sucesso.' });

        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var inputAmigo = document.getElementById('amigo');
        var botaoAdicionar = document.getElementById('btnAdicionar');
        var botaoSortear = document.getElementById('btnSortear');
        var botaoLimpar = document.getElementById('btnLimpar');
        var themeToggle = document.getElementById('themeToggle');

        inputAmigo.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                adicionarAmigo();
            }
        });

        botaoAdicionar.addEventListener('click', adicionarAmigo);
        botaoSortear.addEventListener('click', sortearAmigo);
        botaoLimpar.addEventListener('click', limparLista);

        themeToggle.addEventListener('click', function () {
            var isDark = document.body.classList.contains('dark');
            applyTheme(isDark ? 'light' : 'dark');
        });

        atualizarListaAmigos();
    });
})();
