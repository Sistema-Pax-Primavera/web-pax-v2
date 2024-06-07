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

// Função para formatar um número de telefone
export function formatarTelefone(telefone) {
    const numeroLimpo = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    if (numeroLimpo.length === 10) {
        return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo.slice(2, 6)}-${numeroLimpo.slice(6)}`;
    } else if (numeroLimpo.length === 11) {
        return `(${numeroLimpo.slice(0, 2)}) ${numeroLimpo[2]} ${numeroLimpo.slice(3, 7)}-${numeroLimpo.slice(7)}`;
    } else {
        return telefone; // Retorna o número original se não for um número de telefone válido
    }
}

//Função para formata data e hora
export function converterDataHora(dateTimeString) {
    if (!dateTimeString) {
        return '';
    }

    const [datePart, timePart] = dateTimeString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.substring(0, 5).split(':');

    // Verifica se year, month, day, hour e minute não são nulos ou indefinidos antes de criar a formattedDateTime
    const formattedDateTime = (year && month && day && hour && minute) ?
        `${day}/${month}/${year} ${hour}:${minute}` :
        '';

    return formattedDateTime;
}

//Função para formata valor adicionando duas casas decimais
export function formatarValor(valor) {
    if (typeof valor !== 'number') {
        return '';
    }

    const valorFormatado = valor.toFixed(2).replace('.', ',');
    return valorFormatado;
}

//Formata data para ISO (yyyy-mm-dd)
export function converterDataParaFormatoISO(dataString) {
    if (!dataString) {
        return '';
    }

    const partes = dataString.split(' '); // Divide a data e a hora, se houver
    const dataPartes = partes[0].split('/'); // Divide a data em dia, mês e ano

    // Verifica se a data está no formato esperado
    if (dataPartes.length !== 3) {
        return '';
    }

    let horaParte = '';
    if (partes.length > 1) {
        horaParte = ` ${partes[1]}`; // Se houver parte da hora, adiciona ao resultado
    }

    const [dia, mes, ano] = dataPartes; // Extrai dia, mês e ano
    const dataFormatoISO = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}${horaParte}`; // Formata a data em formato ISO

    return dataFormatoISO;
}


export function imprimirComprovante(dadosComprovante) {
    // Função para formatar a data no formato dd/mm/yyyy
    function formatarData(data) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Função para formatar a hora no formato hh:mm:ss
    function formatarHora(hora) {
        const horas = String(hora.getHours()).padStart(2, '0');
        const minutos = String(hora.getMinutes()).padStart(2, '0');
        const segundos = String(hora.getSeconds()).padStart(2, '0');
        return `${horas}:${minutos}:${segundos}`;
    }
    const hoje = new Date();
    const hora = new Date();
    const dataFormatada = formatarData(hoje);
    const horaFormatada = formatarHora(hora);

    let conteudoComprovante = `
      <style>
        @media print {
          @page {
            margin: 0;
            margin-top: 0;
            margin-bottom: 0;
          }
          body {
            padding-top: 0;
          }
        }
  
        body {
          font-family: Arial, sans-serif;
          font-size: 11px;
          margin: 25px;
        }
        .titulo {
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .cnpj {
          text-align: center;
          font-size: 10px;
        }
        .subtitulo {
          text-align: center;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .info {
          font-size: 11px;
          margin-bottom: 5px;
        }
        .linha {
          border-bottom: 1px solid #000;
          margin-bottom: 5px;
        }
        .parcela {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        .total {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .contrato {
          margin-bottom: 5px;
        }
        .cliente {
          margin-bottom: 5px;
        }
        .obs {
          font-size: 11px;
          margin-bottom: 5px;
        }
        .assinatura {
          margin-top: 10px;
          text-align: center;
          font-weight: bold;
        }
      </style>
      <div class="titulo">PAX PRIMAVERA</div>
      <div class="cnpj">CNPJ 00.000.000/0000-00</div>
      <div class="subtitulo">TELEFONE (67) 3411 - 8200</div>
      <div class="subtitulo">IMPRESSÃO</div>
      <br>
      <div class="info">
        <div class="parcela">
          <div>DATA: ${dataFormatada}</div>
          <div>HORA: ${horaFormatada}</div>
        </div>
      </div>
      <div class="info">USUARIO: ${dadosComprovante.usuario}</div>
      <div class="linha"></div>
      <div class="parcela">
        <div>Parcela</div>
        <div>VALOR</div>
      </div>
      <div class="linha"></div>
      <div class="parcela">
        <div class="data-vencimento">Data Vencimento</div>
        <div class="valor">Valor</div>
      </div>`;

    dadosComprovante.parcelas.forEach((item) => {
        conteudoComprovante += `
          <div class="parcela">
            <div class="data-vencimento">${item.data_vencimento}</div>
            <div class="valor">${item.valor_parcela}</div>
          </div>
        `;
    });

    conteudoComprovante += `
      </div>
      <div class="linha"></div>
      <div class="total">
        <div>${dadosComprovante.parcelas.length} Parcelas</div>
        <div>TOTAL = ${dadosComprovante.valor_total}</div>
      </div>
      <div class="linha"></div>
      <div class="contrato">Data Pagamento: ${dadosComprovante.data_pagamento}</div>
      <div class="contrato">Contrato: ${dadosComprovante.contrato}</div>
      <div class="contrato">Regiao: ${dadosComprovante.regiao}</div>
      <div class="cliente">
        ${dadosComprovante.nome}<br>
        ${dadosComprovante.endereco}<br>
      </div>
      <div class="linha"></div>
      <div class="obs">BAIXE NOSSO APLICATIVO PAX PRIMAVERA<br>E CONFIRA NOSSAS PROMOÇÕES!</div>
      <div class="info">INFORMAÇÕES (67) 99680-8200</div>
      <br></br>
      <div class="linha"></div>
      <div class="assinatura">${dadosComprovante.usuario}</div>
    `;
    //Criar um Iframe invisível
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';

    // Adicionar o Iframe ao corpo do documento
    document.body.appendChild(iframe);

    // Escrever o conteúdo HTML no Iframe
    iframe.contentDocument.write(conteudoComprovante);

    // Chamar o método de impressão diretamente no Iframe
    iframe.contentWindow.print();

    // Remover o Iframe após a impressão
    document.body.removeChild(iframe);
}