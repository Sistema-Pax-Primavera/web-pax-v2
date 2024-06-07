import { converterData, formatCPF, formatCEP } from '../../utils/fuctions';

export const Vendas = (data) => ({
    id: data?.id,
    titular: data?.titular,
    nome_vendedor: data?.vendedor,
    unidade: data?.unidade,
    data_contrato: converterData(data?.data),
    tipo_contrato: data?.tipo,
    status: data?.status,
    statusId: data?.statusId
});