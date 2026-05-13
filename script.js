function adicionarLinha() {
    // 1. Pegando os elementos do DOM
    const campoPeca = document.getElementById('peça');
    const campoCorte = document.getElementById('corte');
    const campoQtd = document.getElementById('quantidade');
    const tabela = document.getElementById('tabelaMedidas').getElementsByTagName('tbody')[0];

    // 2. Validação
    if (!campoPeca.value || !campoCorte.value || !campoQtd.value) {
        alert("Preencha todos os campos antes de adicionar.");
        return;
    }

    // 3. Cria a nova linha na tabela
    const novaLinha = tabela.insertRow();
    
    // Adicionei o botão de Editar aqui dentro:
    novaLinha.innerHTML = `
        <td>${campoPeca.value}</td>
        <td>${campoCorte.value}</td>
        <td>${campoQtd.value}</td>
        <td class="no-export">
            <button class="btn-edit" onclick="editar(this)">Editar</button>
            <button class="btn-delete" onclick="remover(this)">Remover</button>
        </td>
    `;

    // 4. Limpa os campos após adicionar
    campoPeca.value = '';
    campoCorte.value = '';
    campoQtd.value = '';

    // 5. Volta o cursor para o primeiro campo
    campoPeca.focus();
}

// NOVA FUNÇÃO: Editar
function editar(btn) {
    const linha = btn.closest('tr');
    
    // Pega os valores atuais das células
    const pecaAtual = linha.cells[0].innerText;
    const corteAtual = linha.cells[1].innerText;
    const qtdAtual = linha.cells[2].innerText;

    // Abre caixas de pergunta para o novo valor
    const novaPeca = prompt("Editar Peça:", pecaAtual);
    const novoCorte = prompt("Editar Corte:", corteAtual);
    const novaQtd = prompt("Editar Quantidade:", qtdAtual);

    // Se o usuário não cancelar (null) e preencher, ele atualiza
    if (novaPeca !== null && novoCorte !== null && novaQtd !== null) {
        linha.cells[0].innerText = novaPeca;
        linha.cells[1].innerText = novoCorte;
        linha.cells[2].innerText = novaQtd;
    }
}

function remover(btn) {
    btn.closest('tr').remove();
}

function gerarPDF() {
    const elemento = document.getElementById('conteudo-pdf');
    
    if (!elemento) {
        alert("Erro: Elemento 'conteudo-pdf' não encontrado.");
        return;
    }

    // Forçamos o elemento a se preparar para a captura
    // Isso remove qualquer trava de altura que o CSS possa estar impondo
    elemento.style.height = 'auto';
    elemento.style.overflow = 'visible';

    const options = {
        margin: [10, 10, 10, 10],
        filename: 'lista_de_peças.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            letterRendering: true,
            // IMPORTANTE: scrollY: 0 evita a página 1 em branco
            scrollY: 0, 
            // windowHeight garante que ele "enxergue" todos os 32 itens
            windowHeight: elemento.scrollHeight 
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        // Evita que as linhas da tabela sejam cortadas ao meio entre páginas
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Gera o PDF
    html2pdf().set(options).from(elemento).save();
}