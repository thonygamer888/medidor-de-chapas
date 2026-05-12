function adicionarLinha() {
    const chapa = document.getElementById('chapa');
    const medida = document.getElementById('medida');
    const qtd = document.getElementById('quantidade');
    const tabela = document.getElementById('tabelaMedidas').getElementsByTagName('tbody')[0];

    // Validação simples
    if (chapa.value === '' || medida.value === '' || qtd.value === '') {
        alert("Preencha todos os campos antes de adicionar.");
        return;
    }

    // Cria a nova linha
    const novaLinha = tabela.insertRow();
    
    novaLinha.innerHTML = `
        <td>${chapa.value}</td>
        <td>${medida.value}</td>
        <td>${qtd.value}</td>
        <td class="no-export">
            <button class="btn-delete" onclick="remover(this)">Remover</button>
        </td>
    `;

    // Limpa os campos e volta o foco para o primeiro input
    chapa.value = '';
    medida.value = '';
    qtd.value = '';
    chapa.focus();
}

function remover(btn) {
    // Remove a linha clicada
    btn.closest('tr').remove();
}

function gerarPDF() {
    const elemento = document.getElementById('conteudo-pdf');
    
    const options = {
        margin:       10,
        filename:     'lista_de_chapas.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            ignoreElements: (el) => el.classList.contains('no-export') 
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Executa a biblioteca html2pdf
    html2pdf().set(options).from(elemento).save();
}