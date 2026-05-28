/**
 * app.js: controle de interface da página de reservas.
 * Este script gerencia a abertura de modais, o cadastro local de itens na tabela,
 * edição, exclusão e mudança de estado de disponibilidade.
 * Observação: os dados são mantidos apenas em memória no cliente enquanto a página estiver aberta.
 */

// Funções de controle de modais para abrir e preparar os formulários de CRUD.
function abrirModalAdd() {
    abrirModal('addModal');
}

function abrirModalEdit() {
    abrirModal('editModal');
    limparCamposEdicao();
}

function abrirModalDelete() {
    abrirModal('deleteModal');
    document.getElementById('deleteItemId').value = '';
}

function abrirModal(modalId) {
    document.getElementById('modalOverlay').classList.remove('hidden');
    document.getElementById(modalId).classList.remove('hidden');
}

function fecharModal(modalId) {
    document.getElementById('modalOverlay').classList.add('hidden');
    document.getElementById(modalId).classList.add('hidden');
}

function fecharModalOverlay() {
    document.getElementById('modalOverlay').classList.add('hidden');
    document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));
}

// Cria uma nova linha na tabela usando os valores do modal de adição.
function salvarNovoItem() {
    const id = document.getElementById('addItemId').value.trim();
    const nome = document.getElementById('addItemNome').value.trim();
    const disponibilidade = document.getElementById('addItemDisponibilidade').value;
    const localizacao = document.getElementById('addItemLocalizacao').value.trim();

    if (!id || !nome || !localizacao) {
        alert('Todos os campos são obrigatórios para adicionar um item.');
        return;
    }

    const tabela = document.querySelector('#tabelaItens table tbody');
    const novaLinha = document.createElement('tr');
    novaLinha.innerHTML = `
        <td>${id}</td>
        <td>${nome}</td>
        <td>${disponibilidade}</td>
        <td>${localizacao}</td>
        <td id="reservDevTd"><button id="reservDev" onclick="reservarItem(this)">Reservar</button></td>
        <td id="cancelarReservaTd"><button id="cancelarReserva" onclick="cancelarReserva(this)">Cancelar Reserva</button></td>
    `;
    tabela.appendChild(novaLinha);
    fecharModal('addModal');
    limparCamposAdd();
}

function limparCamposAdd() {
    document.getElementById('addItemId').value = '';
    document.getElementById('addItemNome').value = '';
    document.getElementById('addItemDisponibilidade').value = 'Disponível';
    document.getElementById('addItemLocalizacao').value = '';
}

// Busca um item existente na tabela e carrega seus dados no modal de edição.
function buscarItemParaEditar() {
    const id = document.getElementById('editItemId').value.trim();
    if (!id) {
        alert('Digite o ID do item que deseja editar.');
        return;
    }

    const tabela = document.querySelector('#tabelaItens table tbody');
    const linha = Array.from(tabela.querySelectorAll('tr')).find(row => row.cells[0].textContent === id);

    if (!linha) {
        alert('Item não encontrado.');
        return;
    }

    document.getElementById('editItemNome').value = linha.cells[1].textContent;
    document.getElementById('editItemDisponibilidade').value = linha.cells[2].textContent;
    document.getElementById('editItemLocalizacao').value = linha.cells[3].textContent;
    document.getElementById('editItemId').dataset.editing = id;
}

// Salva as alterações do item já carregado no modal de edição.
function salvarEdicao() {
    const id = document.getElementById('editItemId').value.trim();
    const editingId = document.getElementById('editItemId').dataset.editing;
    const nome = document.getElementById('editItemNome').value.trim();
    const disponibilidade = document.getElementById('editItemDisponibilidade').value;
    const localizacao = document.getElementById('editItemLocalizacao').value.trim();

    if (!id) {
        alert('Digite o ID do item que deseja editar.');
        return;
    }

    if (!editingId || editingId !== id) {
        alert('Busque o item antes de salvar as alterações.');
        return;
    }

    if (!nome || !localizacao) {
        alert('Nome e localização são obrigatórios.');
        return;
    }

    const tabela = document.querySelector('#tabelaItens table tbody');
    const linha = Array.from(tabela.querySelectorAll('tr')).find(row => row.cells[0].textContent === id);

    if (!linha) {
        alert('Item não encontrado.');
        return;
    }

    linha.cells[1].textContent = nome;
    linha.cells[2].textContent = disponibilidade;
    linha.cells[3].textContent = localizacao;

    fecharModal('editModal');
    limparCamposEdicao();
}

function limparCamposEdicao() {
    const editId = document.getElementById('editItemId');
    editId.value = '';
    editId.removeAttribute('data-editing');
    document.getElementById('editItemNome').value = '';
    document.getElementById('editItemDisponibilidade').value = 'Disponível';
    document.getElementById('editItemLocalizacao').value = '';
}

// Remove a linha correspondente ao item cujo ID foi informado no modal de exclusão.
function confirmarDelete() {
    const id = document.getElementById('deleteItemId').value.trim();
    if (!id) {
        alert('O ID do item a ser deletado é obrigatório.');
        return;
    }

    const tabela = document.querySelector('#tabelaItens table tbody');
    const linhas = Array.from(tabela.querySelectorAll('tr'));
    const linha = linhas.find(row => row.cells[0].textContent === id);

    if (!linha) {
        alert('Item não encontrado.');
        return;
    }

    tabela.removeChild(linha);
    fecharModal('deleteModal');
}

//Função para reservar um item da tabela
function reservarItem(botao) {
    const linha = botao.parentElement.parentElement; // Seleciona a linha do botão clicado
    const disponibilidade = linha.cells[2].textContent; // Seleciona a célula de disponibilidade da linha
    if (disponibilidade.toLowerCase() === "disponível") {
        linha.cells[2].textContent = "Reservado"; // Atualiza a disponibilidade para "Reservado"
        alert("Item reservado com sucesso!");
    } else {
        alert("Este item não está disponível para reserva.");
    }
}

//Função para cancelar a reserva de um item da tabela
function cancelarReserva(botao) {
    const linha = botao.parentElement.parentElement; // Seleciona a linha do botão clicado
    const disponibilidade = linha.cells[2].textContent; // Seleciona a célula de disponibilidade da linha
    if (disponibilidade.toLowerCase() === "reservado") {
        linha.cells[2].textContent = "Disponível"; // Atualiza a disponibilidade para "Disponível"
        alert("Reserva cancelada com sucesso!");
    } else {
        alert("Este item não está reservado.");
    }
}

// Ajusta a rolagem da tabela quando há muitos itens na tela para manter o layout legível.
const tbody = document.querySelector("#tabelaItens table tbody");
const limiteDeLinhas = 5; // Limite de linhas visíveis antes de ativar a rolagem
if (tbody.rows.length > limiteDeLinhas) {
    tbody.style.maxHeight = `${limiteDeLinhas * tbody.rows[0].offsetHeight}px`;
    tbody.style.overflowY = "auto";
}