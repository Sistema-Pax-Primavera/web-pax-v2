import { converterData } from "../../utils/fuctions";

export const Obito = (data) => ({
    id: data?.id,
    unidade: data?.unidade,
    plano_nome: data?.plano,
    data_contrato: converterData(data?.dataContrato),
    contrato: data?.contrato,
    is_titular: data?.isTitular == true ? 'Titular' : 'Dependente',
    data_falecimento: converterData(data?.dataObito),
    nome: data?.nome,
    status: data?.status
});

