import { converterData, formatarValor } from '../../utils/fuctions';

export const FormPag = (data) => ({
    cliente: {
        id: data?.cliente?.id,
        numero_contrato: data?.cliente?.numeroContrato,
        titular: data?.cliente?.titular,
        pagamentos: data?.cliente?.pagamentos.map(pagamento => ({
            id: pagamento?.id,
            data_pagamento: converterData(pagamento?.dataPagamento),
            data_vencimento: converterData(pagamento?.dataVencimento),
            tipo_caixa: pagamento.tipoCaixa,
            valor_pago: formatarValor(pagamento.valorPago),
            valor_pagar: formatarValor(pagamento.valorPagar),
            forma_pagamento: pagamento.formaPagamento
        }))
    },
    pagamento: data?.pagamento.map(pagamento => ({
        id: pagamento?.id,
        data_pagamento: converterData(pagamento?.dataPagamento),
        data_vencimento: converterData(pagamento?.dataVencimento),
        tipo_caixa: pagamento.tipoCaixa,
        valor_pago: formatarValor(pagamento.valorPago),
        valor_pagar: formatarValor(pagamento.valorPagar),
        forma_pagamento: pagamento.formaPagamento
    }))
});