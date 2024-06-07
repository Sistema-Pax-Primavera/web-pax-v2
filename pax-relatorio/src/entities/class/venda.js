import { converterParaReal, converterData } from "../../utils/fuctions";

const mapearContrato = (contrato) => ({
    id: contrato.id,
    contrato: contrato.contrato,
    nome: contrato.nome,
    cidade: contrato.cidade,
    bairro: contrato.bairro,
    regiao: contrato.regiao,
    data_contrato: converterData(contrato.dataContrato),
    primeira_parcela: converterData(contrato.primeiraParcela),
    segunda_parcela: converterData(contrato.segundaParcela),
    terceira_parcela: converterData(contrato.terceiraParcela),
    quarta_parcela: converterData(contrato.quartaParcela),
    cobrador: contrato.cobrador,
    dia_pagamento: contrato.diaPagamento,
    data_nascimento: converterData(contrato.dataNascimento),
    sexo: contrato.sexo
});

export const Vendas = (data) => ({
    id: data?.id,
    unidade: data?.unidade,
    vendedor: data?.nomeVendedor,
    quantidade: data?.quantidade,
    adesao: data?.adesao,
    primeiro_mes: data?.primeiroMes,
    segundo_mes: data?.segundoMes,
    terceiro_mes: data?.terceiroMes,
    nome_plano: data?.nomePlano,
    valor_adesao: converterParaReal(data?.valorAdesao),
    nao_confirmados: data?.naoConfirmados,
    confirmados: data?.confirmados,
    contratos: data?.contratos?.map(mapearContrato) || []
});

