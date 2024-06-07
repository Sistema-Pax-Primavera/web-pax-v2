import React, { useEffect, useState } from "react";
import ColunasCobranca from "../../components/colunas-cobranca";
import "./escritorio.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ButtonIcon from "../../../../pax-associado/src/components/button-icon";
import ModalLateral from "../../components/modal-lateral";
import ButtonText from "../../../../pax-associado/src/components/button-texto/index";
import ModalClientes from "../../components/modal-clientes";
import StoreIcon from '@mui/icons-material/Store';
import Checkbox from "@mui/material/Checkbox";
import { useCobranca } from "../../service/api";
import { toast } from "react-toastify";
import { converterDataParaFormatoBackend } from "../../utils/fuctions";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const EscritorioCobranca = () => {
  const { getCRMEsc } = useCobranca();
  const navigate = useNavigate();
  const colunasDinamicas = {
    "1ª Parcela em atraso": { id: 1, clientes: [] },
    "2ª Parcela em atraso": { id: 2, clientes: [] },
    "3ª Parcela em atraso": { id: 3, clientes: [] },
    "Pagou mas em Debito 1ª Parcela": { id: 4, clientes: [] },
    "Pagou mas em Debito 2ª Parcela": { id: 5, clientes: [] },
    "Pagou mas em Debito 3ª Parcela": { id: 6, clientes: [] },
    "Em dia": { id: 7, clientes: [] },
    Adiantados: { id: 8, clientes: [] },
    Anuais: { id: 9, clientes: [] },
  };

  const [colunaSelecionada, setColunaSelecionada] = useState("");
  const [dadosPorColuna, setDadosPorColuna] = useState({});
  const [modalAberta, setModalAberta] = useState(false); // Estado para a modal existente
  const [modalClientes, setModalClientes] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  //FILTRO
  const dataAtual = new Date();
  const [contrato, setContrato] = useState(null);
  const [dataContrato, setDataContrato] = useState(null);
  const [nomeCliente, setNomeCliente] = useState(null);
  const [diaPagamento, setDiaPagamento] = useState(null);
  const [rota, setRota] = useState(null);
  const [isSemAgendamento, setIsSemAgendamento] = useState(false);
  const [isSemJustificativa, setIsSemJustificativa] = useState(false);
  const [isPagouMesPassado, setIsPagouMesPassado] = useState(false);
  const [isClienteLigar, setIsClientesLigar] = useState(false);
  const [isCategoriaF9, setIsCategoriaF9] = useState(false);
  const [categoriaF9, setCategoriaF9] = useState(null);
  const [isJustificativa, setIsJustificativa] = useState(false);
  const [justificativa, setJustificativa] = useState(null);
  const [isAgendamentoDia, setIsAgendamentoDia] = useState(false);
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);

  const handleCloseFormulario = () => {
    navigate("/");
    localStorage.setItem("page-cobranca", "/");
  };

  const toggleModal = (coluna) => {
    setModalAberta(!modalAberta);
    setColunaSelecionada(coluna);
  };

  const toggleModalClientes = () => {
    setModalClientes(!modalClientes);
  };

  const handleCardClick = (cardData) => {
    setSelectedCardData(cardData);
    setModalClientes(true);
  };

  const handleCloseFormularioModal = () => {
    setModalClientes(false);
  };

  const filtro = () => {
    let clientesFiltrados = dadosPorColuna[colunaSelecionada].clientes.slice();
    if (contrato) {
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        return cliente.contrato.toString().includes(contrato);
      });
    }
    if (dataContrato) {
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        const dataContratoFormat = converterDataParaFormatoBackend(
          cliente.data_contrato
        );
        return dataContrato === dataContratoFormat;
      });
    }
    if (nomeCliente) {
      const nomeClienteUpper = nomeCliente.toUpperCase();
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        const nomeClienteAtual = cliente.nome.toUpperCase();
        return nomeClienteAtual.includes(nomeClienteUpper);
      });
    }
    if (diaPagamento) {
      const diaPagamentoFormat = parseInt(diaPagamento);
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        return cliente.dia_pagamento === diaPagamentoFormat;
      });
    }
    if (rota) {
      const rotaFormat = parseInt(rota);
      if (rotaFormat == 1) {
        clientesFiltrados = clientesFiltrados;
      } else {
        clientesFiltrados = clientesFiltrados.filter((cliente) => {
          return cliente.rota_id === rotaFormat;
        });
      }
    }
    if (isSemAgendamento) {
      clientesFiltrados = clientesFiltrados;
    }
    if (isClienteLigar) {
      const mesAtual = dataAtual.getMonth() + 1;
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        const agendamentos = cliente.dados_cliente.agendamentos || [];
        for (const agendamento of agendamentos) {
          const agendamentoTel = agendamento.ult_agendamento_tel
            ? converterDataParaFormatoBackend(agendamento.ult_agendamento_tel)
            : null;
          const mesAgendamento = agendamentoTel
            ? new Date(agendamentoTel).getMonth() + 1
            : null;
          if (
            !agendamentoTel ||
            (mesAgendamento && mesAgendamento < mesAtual)
          ) {
            return true;
          }
        }
        return false;
      });
    }
    if (isCategoriaF9) {
      const idCategoriaFormat = parseInt(categoriaF9);
      const mesAtual = dataAtual.getMonth() + 1;
      const anoAtual = dataAtual.getFullYear();
      if (idCategoriaFormat == 1) {
        clientesFiltrados = clientesFiltrados;
      } else {
        clientesFiltrados = clientesFiltrados.filter((cliente) => {
          if (cliente.dados_cliente.observacao) {
            return cliente.dados_cliente.observacao.some((obs) => {
              const dataUltJustificativa = converterDataParaFormatoBackend(
                obs.data_criacao
              );
              const anoObs = new Date(dataUltJustificativa).getFullYear();
              const mesObs = new Date(dataUltJustificativa).getMonth() + 1;
              return (
                obs.id_categoria === idCategoriaFormat &&
                anoObs === anoAtual &&
                mesObs === mesAtual
              );
            });
          }
          return false;
        });
      }
    }
    // if (isJustificativa) {
    //   const idJustFormat = parseInt(justificativa)
    //   const mesAtual = dataAtual.getMonth();
    //   const anoAtual = dataAtual.getFullYear();
    //   if (idJustFormat == 1) {
    //     clientesFiltrados = clientesFiltrados
    //   } else {
    //     clientesFiltrados = clientesFiltrados.filter(cliente => {
    //       if (cliente.dados_cliente.agendamentos) {
    //         return cliente.dados_cliente.agendamentos.some(agendamento => {
    //           const dataUltJustificativa = new Date(converterDataParaFormatoBackend(agendamento.ult_justificativa));
    //           const anoAgendamento = dataUltJustificativa.getFullYear();
    //           const mesAgendamento = dataUltJustificativa.getMonth();
    //           // Verificar se a justificativa e a data de agendamento correspondem
    //           return agendamento.id_justificativa === idJustFormat &&
    //             anoAgendamento === anoAtual && mesAgendamento === mesAtual;
    //         });
    //       }
    //       return false;
    //     });
    //   }
    // }
    if (isPagouMesPassado) {
      const ultimoMesPassado = new Date(
        dataAtual.getFullYear(),
        dataAtual.getMonth() - 1
      );
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        const ultimoPagamento = new Date(
          converterDataParaFormatoBackend(cliente.ultimo_pagamento)
        );
        return (
          ultimoPagamento.getFullYear() === ultimoMesPassado.getFullYear() &&
          ultimoPagamento.getMonth() === ultimoMesPassado.getMonth()
        );
      });
    }
    // if (isSemJustificativa) {
    //   const mesAtual = dataAtual.getMonth();
    //   const anoAtual = dataAtual.getFullYear();

    //   clientesFiltrados = clientesFiltrados.filter(cliente => {
    //     // Verificar se o cliente não possui agendamentos para o mês e ano atual
    //     if (cliente.agendamentos) {
    //       return !cliente.agendamentos.some(agendamento => {
    //         const dataUltJustificativa = new Date(converterDataParaFormatoBackend(agendamento.ult_justificativa));
    //         console.log(dataUltJustificativa)
    //         const anoAgendamento = dataUltJustificativa.getFullYear();
    //         const mesAgendamento = dataUltJustificativa.getMonth();

    //         // Verifica se a data do agendamento é igual ao mês e ano atual
    //         return anoAgendamento === anoAtual && mesAgendamento === mesAtual;
    //       });
    //     } else {
    //       return true;
    //     }
    //   });
    // }

    if (isAgendamentoDia) {
      clientesFiltrados = clientesFiltrados.filter((cliente) => {
        const agendamentos = cliente.dados_cliente.agendamentos || [];
        for (const agendamento of agendamentos) {
          const agendamentoCob = agendamento.ult_agendamento_cob
            ? converterDataParaFormatoBackend(agendamento.ult_agendamento_cob)
            : null;
          const agendamentoTel = agendamento.ult_agendamento_tel
            ? converterDataParaFormatoBackend(agendamento.ult_agendamento_tel)
            : null;
          if (
            (agendamentoCob &&
              agendamentoCob >= dataInicio &&
              agendamentoCob <= dataFinal) ||
            (agendamentoTel &&
              agendamentoTel >= dataInicio &&
              agendamentoTel <= dataFinal)
          ) {
            return true;
          }
        }
        return false;
      });
    }
  };

  const construirColunasDinamicamente = (dadosClientes) => {
    dadosClientes.forEach((cliente) => {
      const ultimoPagamento = new Date(
        converterDataParaFormatoBackend(cliente.ultimo_pagamento)
      );
      const ultimoMesPago = new Date(
        converterDataParaFormatoBackend(cliente.ultimo_mes_pago)
      );
      const pagamentos = cliente.dados_cliente.pagamentos.map(
        (pagamento) =>
          new Date(converterDataParaFormatoBackend(pagamento.data_pagamento))
      );

      const ultimo12PagamentosIguais =
        pagamentos.length >= 12 &&
        pagamentos.slice(-12).every((pagamento, index, array) => {
          // Verifica se o mês e o dia do pagamento atual são iguais aos dos outros pagamentos
          const mesAtual = pagamento.getMonth();
          const diaAtual = pagamento.getDate();
          return array.slice(0, index).every((pagamentoAnterior) => {
            return (
              pagamentoAnterior.getMonth() === mesAtual &&
              pagamentoAnterior.getDate() === diaAtual
            );
          });
        });

      if (ultimo12PagamentosIguais) {
        colunasDinamicas["Anuais"].clientes.push(cliente);
      } else {
        if (
          ultimoPagamento.getFullYear() === dataAtual.getFullYear() &&
          ultimoPagamento.getMonth() === dataAtual.getMonth()
        ) {
          if (
            ultimoMesPago.getFullYear() === dataAtual.getFullYear() &&
            ultimoMesPago.getMonth() === dataAtual.getMonth()
          ) {
            colunasDinamicas["Em dia"].clientes.push(cliente);
          } else if (ultimoMesPago > dataAtual) {
            colunasDinamicas["Adiantados"].clientes.push(cliente);
          } else {
            const diferencaMeses =
              dataAtual.getMonth() -
              ultimoMesPago.getMonth() +
              12 * (dataAtual.getFullYear() - ultimoMesPago.getFullYear());
            switch (diferencaMeses) {
              case 1:
                colunasDinamicas[
                  "Pagou mas em Debito 1ª Parcela"
                ].clientes.push(cliente);
                break;
              case 2:
                colunasDinamicas[
                  "Pagou mas em Debito 2ª Parcela"
                ].clientes.push(cliente);
                break;
              case 3:
                colunasDinamicas[
                  "Pagou mas em Debito 3ª Parcela"
                ].clientes.push(cliente);
                break;
            }
          }
        } else {
          const diferencaMeses =
            dataAtual.getMonth() -
            ultimoMesPago.getMonth() +
            12 * (dataAtual.getFullYear() - ultimoMesPago.getFullYear());
          switch (diferencaMeses) {
            case 1:
              colunasDinamicas["1ª Parcela em atraso"].clientes.push(cliente);
              break;
            case 2:
              colunasDinamicas["2ª Parcela em atraso"].clientes.push(cliente);
              break;
            case 3:
              colunasDinamicas["3ª Parcela em atraso"].clientes.push(cliente);
              break;
          }
        }
      }
    });
    return colunasDinamicas;
  };

  useEffect(() => {
    getCRMEsc()
      .then((data) => {
        const colunas = construirColunasDinamicamente(data);
        setDadosPorColuna(colunas);
      })
      .catch((error) => {
        toast.error("Erro ao obter dados do CRM:" + error);
      });
  }, []);

  return (
    <div className="container-cobranca-escritorio">
      <div className="retorna-cobranca">
        <div className="button-retorn-cobran">
          <div className="button-retorn3">
            <ButtonIcon
              funcao={handleCloseFormulario}
              icon={<ArrowBackIosNewIcon fontSize={"small"} />}
            />
          </div>
        </div>
        <div className="crm-escritorio-container">
          <label>
            <StoreIcon fontSize={"small"} />
            CRM Escritório
          </label>
        </div>

        <div className="filtro-cobrancaca-escritorio">
          <div className="button-retorn2">
            {modalAberta && (
              <ModalLateral
                isOpen={modalAberta}
                toggleModal={toggleModal}
                colunaSelecionada={colunaSelecionada}
                conteudo={
                  <div className="container-modal-lateral">
                    <h1>Filtro para {colunaSelecionada}</h1>
                    <div className="campos-filtro">
                      <div className="campos-01-cobranca-nome">
                        <label>Nome</label>
                        <input
                          placeholder="Informe o Nome"
                          value={nomeCliente}
                          onChange={(e) => setNomeCliente(e.target.value)}
                        />
                      </div>
                      <div className="campos-01-cobranca-data">
                        <label>Data Contrato</label>
                        <input
                          type="date"
                          value={dataContrato}
                          onChange={(e) => setDataContrato(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="campos-filtro">
                      <div className="campos-01-cobranca-contrato">
                        <label>Contrato</label>
                        <input
                          placeholder="N Contrato"
                          type="number"
                          value={contrato}
                          onChange={(e) => setContrato(e.target.value)}
                        />
                      </div>
                      <div className="campos-filtro-dia-pag">
                        <label>Rota:</label>
                        <select
                          value={rota}
                          onChange={(e) => setRota(e.target.value)}
                        >
                          <option value={1}>Todos</option>
                          <option value={2}>ROTA ESC. MARCELINO</option>
                          <option value={3}>ROTA ESC. TOSHI</option>
                        </select>
                      </div>
                      <div className="campos-01-escritorio">
                        <label>Dia Pagamento</label>
                        <input
                          type="number"
                          value={diaPagamento}
                          onChange={(e) => setDiaPagamento(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="campos-filtro"></div>
                    <div className="campos-filtro">
                      <label>Sem agendamentos</label>
                      <Checkbox
                        checked={isSemAgendamento}
                        onChange={(e) => setIsSemAgendamento(e.target.checked)}
                      />
                      {/* <label>Sem justificativa</label>
                      <Checkbox checked={isSemJustificativa} onChange={(e) => setIsSemJustificativa(e.target.checked)} />
                    */}
                      <label>Pagaram mês passado</label>
                      <Checkbox
                        checked={isPagouMesPassado}
                        onChange={(e) => setIsPagouMesPassado(e.target.checked)}
                      />
                    </div>
                    <div className="campos-filtro">
                      <label>Clientes a ligar</label>
                      <Checkbox
                        checked={isClienteLigar}
                        onChange={(e) => setIsClientesLigar(e.target.checked)}
                      />
                      <label>Categoria F9</label>
                      <Checkbox
                        checked={isCategoriaF9}
                        onChange={(e) => setIsCategoriaF9(e.target.checked)}
                      />
                    </div>
                    <div className="campos-filtro">
                      <label>Agendamentos do dia</label>
                      <Checkbox
                        checked={isAgendamentoDia}
                        onChange={(e) => setIsAgendamentoDia(e.target.checked)}
                      />
                    </div>
                    <div className="campos-filtro">
                      {/* <label>Justificativa</label>
                      <Checkbox checked={isJustificativa} onChange={(e) => setIsJustificativa(e.target.checked)} />
                      */}
                    </div>
                    {isCategoriaF9 ? (
                      <div className="campos-filtro">
                        <div className="categoriasdof9">
                          <label>Categorias:</label>
                          <select
                            value={categoriaF9}
                            onChange={(e) => setCategoriaF9(e.target.value)}
                          >
                            <option value={1}>Todos</option>
                            <option value={2}>RETORNAR LIGAÇÃO</option>
                            <option value={3}>AGENDAMENTO</option>
                            <option value={4}>SEM CONTATO</option>
                            <option value={5}>DIVULGAÇÃO DE BENEFICIOS</option>
                            <option value={6}>SOLICITOU CANCELAMENTO</option>
                            <option value={7}>ATUALIZAÇÃO DE CONTATO</option>
                            <option value={8}>BOLETO ENVIADO</option>
                          </select>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {isAgendamentoDia ? (
                      <div className="campos-filtro">
                        <div className="categoriasdof9">
                          <label>Periodo Inicial</label>
                          <input
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                          />
                        </div>
                        <div className="categoriasdof9">
                          <label>Periodo Final</label>
                          <input
                            type="date"
                            value={dataFinal}
                            onChange={(e) => setDataFinal(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {/* {isJustificativa
                      ?
                      <div className="campos-filtro">
                        <div>
                          <label>Justificativas:</label>
                          <select value={justificativa} onChange={(e) => setJustificativa(e.target.value)}>
                            <option value={1}>Todos</option>
                            <option value={2}>MUDOU-SE</option>
                            <option value={3}>TITULAR NÃO ESTAVA EM CASA</option>
                            <option value={4}>AGENDOU PARA:</option>
                            <option value={5}>SOLICITOU CANCELAMENTO</option>
                            <option value={6}>IRÁ AO ESCRITORIO</option>
                            <option value={7}>LIGARA P/ COB OU ESC QUANDO FOR PAGAR</option>
                            <option value={8}>TRANSFERIR PARA OUTRA ROTA</option>
                            <option value={9}>EFETUA PAGAMENTO ANTECIPADO</option>
                            <option value={10}>EM VIAGEM</option>
                            <option value={11}>ENDEREÇO RES. E COM. NÃO CORRESPONDE AO CLIENTE</option>
                            <option value={12}>OUTROS</option>
                          </select>
                        </div>
                      </div>
                      : <></>
                    } */}
                    <div className="pesquisa-filtro-cobran">
                      <ButtonText funcao={filtro} title="PESQUISAR" />
                    </div>
                  </div>
                }
              ></ModalLateral>
            )}
          </div>
        </div>
      </div>
      <div className="informacoes-cont-cobr-boleto">
        {Object.entries(dadosPorColuna).map(([titulo, dados], index) => (
          <ColunasCobranca
            key={index}
            titulo={titulo}
            dados={dados.clientes}
            numeros={dados.clientes.length}
            onCardClick={handleCardClick} // Passando a função de callback
            onFilterIconClick={(coluna) => toggleModal(coluna)}
          />
        ))}

        {modalClientes && selectedCardData && (
          <ModalClientes
            open={modalClientes}
            onClose={handleCloseFormularioModal}
            clienteData={selectedCardData}
          />
        )}
      </div>

    </div>
  );
};

export default EscritorioCobranca;
