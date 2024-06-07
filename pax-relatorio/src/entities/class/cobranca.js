import { converterParaPorcentagem, converterParaReal } from "../../utils/fuctions";

export const Cobranca = (data) => ({
    id: data?.id,
    unidade: data?.unidade,
    cobrador: data?.cobrador,
    inicio_cobranca: converterParaReal(data?.inicioCobranca),
    inclusao: converterParaReal(data?.inclusao),
    retirado: converterParaReal(data?.retirado),
    total_bordero: converterParaReal(data?.totalBordero),
    recebido_bordero: converterParaReal(data?.recebidoBordero),
    recebimento: converterParaPorcentagem(data?.recebimento),
    adiantados: converterParaReal(data?.adiantados),
    total_recebido: converterParaReal(data?.totalRecebido)
});

