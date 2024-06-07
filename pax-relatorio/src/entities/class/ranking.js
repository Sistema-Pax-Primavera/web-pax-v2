import { converterData, converterParaPorcentagem } from "../../utils/fuctions";

export const Ranking = (data) => ({
    id: data?.id,
    unidade: data?.unidade,
    data_inicio: converterData(data?.dataInicio),
    data_final: converterData(data?.dataFinal),
    cobrador: data?.cobrador,
    parcela1: converterParaPorcentagem(data?.quantidadeUmaParcela),
    parcela2: converterParaPorcentagem(data?.quantidadeDuasParcelas),
    parcela3: converterParaPorcentagem(data?.quantidadeTresParcelas),
    adiantados: converterParaPorcentagem(data?.adiantados),
    geral: converterParaPorcentagem(data?.geral)
});