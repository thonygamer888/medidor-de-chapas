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
    
    // O <td> de ações já possui a classe "no-export" para ser ignorado no PDF
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

// Função para Editar
function editar(btn) {
    const linha = btn.closest('tr');
    const pecaAtual = linha.cells[0].innerText;
    const corteAtual = linha.cells[1].innerText;
    const qtdAtual = linha.cells[2].innerText;

    const novaPeca = prompt("Editar Peça:", pecaAtual);
    const novoCorte = prompt("Editar Corte:", corteAtual);
    const novaQtd = prompt("Editar Quantidade:", qtdAtual);

    if (novaPeca !== null && novoCorte !== null && novaQtd !== null) {
        linha.cells[0].innerText = novaPeca;
        linha.cells[1].innerText = novoCorte;
        linha.cells[2].innerText = novaQtd;
    }
}

// Função para Remover
function remover(btn) {
    btn.closest('tr').remove();
}

// Função para Gerar PDF (Limpando o layout)
function gerarPDF() {
    const elemento = document.getElementById('conteudo-pdf');
    
    if (!elemento) {
        alert("Erro: Elemento 'conteudo-pdf' não encontrado.");
        return;
    }

    // Calcula a altura real do conteúdo para evitar quebras
    const alturaReal = elemento.scrollHeight;

    const options = {
        margin: [10, 10, 10, 10],
        filename: 'lista_de_peças.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2, 
            useCORS: true,
            letterRendering: true,
            scrollY: 0,
            ignoreElements: (el) => el.classList.contains('no-export') || el.classList.contains('input-group')
        },
        // A mágica acontece aqui: definimos o formato como um array com a largura de um A4 
        // e a altura dinâmica baseada no seu conteúdo total
        jsPDF: { 
            unit: 'px', 
            format: [650, alturaReal + 100], // 650 é a largura do seu .container
            orientation: 'portrait' 
        }
    };

    html2pdf().set(options).from(elemento).save();
}