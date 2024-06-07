import { converterData, converterDataHora, formatarValor, formatarTelefone } from "../../utils/fuctions";

export const CRM = (data) => ({
  id: data?.id,
  nome: data?.nome,
  coluna_id: data?.colunaId,
  telefone: formatarTelefone(data?.telefone),
  vendedor_responsavel: data?.vendedorResponsavel,
  indicado_por: data?.IndicadoPor,
  criado_em: converterData(data?.criadoEm),
  ultima_movimentacao: data?.ultimaMovimentacao,
  regiao: data?.regiao,
  cidade: data?.cidade,
  uf: data?.uf,
  is_plano: data?.isPlano,
  is_ganho: data?.isGanho,
  observacao: data?.obs,
  contatos: data?.contatos.map((contato) => ({
    id: contato?.id,
    tipo: contato?.tipo,
    valor: contato?.valor
  })),
  tarefas: data?.tarefas.map((tarefa) => ({
    id: tarefa?.id,
    categoria: tarefa?.categoria,
    descricao: tarefa?.descricao,
    data: tarefa?.data,
    criado_em: converterData(tarefa?.createAt),
    criado_por: tarefa?.createBy
  })),
  anexos: data?.anexos.map((anexo) => ({
    id: anexo?.id,
    titulo: anexo?.titulo,
    arquivo: anexo?.arquivo,
    criado_em: anexo?.createAt,
    criado_por: anexo?.usuario,
  })),
  atividades: data?.atividade.map((tarefa) => ({
    id: tarefa?.id,
    tipo: tarefa?.tipo,
    descricao: tarefa?.descricao,
    criado_em: tarefa?.createAt,
    criado_por: tarefa?.usuario,
    transferido_para: tarefa?.transUser
  })),
});
