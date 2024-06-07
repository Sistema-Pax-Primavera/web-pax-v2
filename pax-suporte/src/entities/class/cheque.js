import { converterData, formatarValor } from '../../utils/fuctions';

export const Cheque = (data) => ({
    id: data?.id,
    data: converterData(data?.data),
    numero_cheque: data?.numeroCheque,
    nome: data?.nomeResponsavel,
    valor: formatarValor(data?.valor),
    agencia: data?.agencia,
    conta: data?.conta,
    banco: data?.banco,
    banco_id: data?.bancoId,
    status: data?.status,
});