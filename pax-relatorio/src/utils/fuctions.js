export function converterData(dateString) {
  if (!dateString) {
    return '';
  }
  const [year, month, day] = dateString.split('-');
  // Verifica se year, month e day não são nulos ou indefinidos antes de criar a formattedDate
  const formattedDate = (year && month && day) ? `${day}/${month}/${year}` : '';
  return formattedDate;
}

export function converterParaReal(valor) {
  if (typeof valor !== 'number') {
    return '';
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(valor);
}

export function converterParaPorcentagem(valor) {
  if (typeof valor !== 'number') {
    return '';
  }

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formatter.format(valor)} %`;
}


