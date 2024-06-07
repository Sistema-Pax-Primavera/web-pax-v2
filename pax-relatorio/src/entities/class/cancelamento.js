export const Cancelamento = (data) => ({
    id: data?.id,
    unidade: {
        unidade_id: data?.unidade?.unidadeId,
        unidade: data?.unidade?.nomeUnidade,
        planos: data?.unidade?.planos.map(plano => ({
            id: plano?.id,
            plano_nome: plano?.nomePlano,
            nenhuma_parcela: plano?.nenhumParcela,
            uma_parcela: plano?.umaParcela,
            duas_tres_parcela: plano?.duasTresParcela,
            quatro_cinco_parcela: plano?.quatroCincoParcela,
            seis_parcela: plano?.seisParcela,
            total: plano?.total
        }))
    }
});
