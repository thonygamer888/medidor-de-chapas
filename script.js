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

    // AJUSTE PARA NÃO CORTAR: Removemos o padding gigante temporariamente
    const originalPadding = elemento.style.padding;
    elemento.style.padding = "20px"; 
    elemento.style.width = "auto";

    const options = {
        margin:       10,
        filename:     'lista_de_peças.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            logging: true, 
            letterRendering: true,
            useCORS: true,
            ignoreElements: (el) => el.classList.contains('no-export') 
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Executa e depois volta o estilo original da tela
    html2pdf().set(options).from(elemento).save().then(() => {
        elemento.style.padding = originalPadding;
    });
}