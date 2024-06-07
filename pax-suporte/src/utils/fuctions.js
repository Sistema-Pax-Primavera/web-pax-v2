export function converterData(dateString) {
    if (!dateString) {
        return '';
    }
    const [year, month, day] = dateString.split('-');
    // Verifica se year, month e day não são nulos ou indefinidos antes de criar a formattedDate
    const formattedDate = (year && month && day) ? `${day}/${month}/${year}` : '';
    return formattedDate;
}

// Função para formatar um CPF
export function formatCPF(cpf) {
    const cpfDigits = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const formattedCPF = cpfDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formattedCPF;
}

// Função para formatar um CEP
export function formatCEP(cep) {
    const cepDigits = cep.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const formattedCEP = cepDigits.replace(/(\d{5})(\d{3})/, '$1-$2');
    return formattedCEP;
}

//Função para formata valor adicionando duas casas decimais
export function formatarValor(valor) {
    if (typeof valor !== 'number') {
        return '';
    }

    // Formata o valor para incluir separadores de milhar e vírgula para casas decimais
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}
