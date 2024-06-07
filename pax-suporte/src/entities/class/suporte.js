import { converterData, formatarValor } from '../../utils/fuctions';

export const Suporte = (data) => ({
    id: data?.id,
    data_pagamento: converterData(data?.dataPagamento),
    n_contrato: data?.numeroContrato,
    titular: data?.titular,
    pagamentos: data?.pagamentos.map(pagamento => ({
        id: pagamento?.id,
        data_pagamento: converterData(pagamento?.dataPagamento),
        data_vencimento: converterData(pagamento?.dataVencimento),
        tipo_caixa: pagamento.tipoCaixa,
        valor_pago: formatarValor(pagamento.valorPago),
        valor_pagar: formatarValor(pagamento.valorPagar),
        forma_pagamento: pagamento.formaPagamento
    }))
});