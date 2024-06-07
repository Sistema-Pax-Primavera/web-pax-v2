import React, { useState } from "react";
import "./cancelamento.css";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import BallotIcon from "@mui/icons-material/Ballot";
import CardsSolicitadosCancelados from "../../components/cards-solicitados-cancelados";
import HeaderVendas from "../../components/header";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Cancelamento = () => {
  const [solicitacoesPendentes, setSolicitacoesPendentes] = useState([
    {
      id: 1,
      mostraBotoes: true,
      conteudo: <CardsSolicitadosCancelados />,
    },
    {
      id: 2,
      mostraBotoes: true,
      conteudo: <CardsSolicitadosCancelados />,
    },
    {
      id: 3,
      mostraBotoes: true,
      conteudo: <CardsSolicitadosCancelados />,
    },
    {
      id: 4,
      mostraBotoes: true,
      conteudo: <CardsSolicitadosCancelados />,
    },
    // Adicione mais cards se necessário
  ]);
  const [solicitacoesEmAtendimento, setSolicitacoesEmAtendimento] = useState(
    []
  );

  const handleAceitar = (id) => {
    const cardAceito = solicitacoesPendentes.find((card) => card.id === id);
    if (cardAceito) {
      setSolicitacoesEmAtendimento([...solicitacoesEmAtendimento, cardAceito]);
      setSolicitacoesPendentes(
        solicitacoesPendentes.filter((card) => card.id !== id)
      );
    }
  };

  const handleRejeitar = (id) => {
    setSolicitacoesPendentes(
      solicitacoesPendentes.filter((card) => card.id !== id)
    );
  };

  // Função para definir o status como "Aguardando sincronização"
  const handleAguardandoSincronizacao = (id) => {
    setSolicitacoesEmAtendimento(
      solicitacoesEmAtendimento.map((card) =>
        card.id === id ? { ...card, status: "aguardandoSincronizacao" } : card
      )
    );
  };

  return (
    <div className="container-cobranca">
      <HeaderVendas />
      <div className="container-soli-cobradores5">
        <div className="solicitacoes-cobradores05">
          <label>
            <SpeakerNotesIcon fontSize={"small"} /> Solicitações
          </label>
          {/* Renderiza os cards pendentes ou exibe a mensagem */}
          <div className="altura-card-soli">
            {solicitacoesPendentes.length === 0 ? (
              <div className="nenhuma-solicitacao-cobra5">
                <p>
                  <BallotIcon fontSize={"medium"} />
                  Nenhuma solicitação!
                </p>
              </div>
            ) : (
              solicitacoesPendentes.map((solicitacao) => (
                <div key={solicitacao.id}>
                  <CardsSolicitadosCancelados
                    mostraBotoes={solicitacao.mostraBotoes}
                    onAceitar={() => handleAceitar(solicitacao.id)}
                    onRejeitar={() => handleRejeitar(solicitacao.id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <div className="solicitacoes-cobradores05">
          <label>
            <AccessTimeIcon fontSize={"small"} /> Cancelados
          </label>
          <div className="pesquisa-solicitacao01">
            <input></input>
            <div className="lupa-pesquisa">
              <ButtonIconTextoStart
                icon={<SearchIcon fontSize={"small"} />}
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
              />
            </div>
          </div>
          <div className="altura-card-soli">
            {solicitacoesEmAtendimento.map((solicitacao) => (
              <div key={solicitacao.id}>
                <CardsSolicitadosCancelados
                  mostraBotoes={false}
                  onAguardandoSincronizacao={() =>
                    handleAguardandoSincronizacao(solicitacao.id)
                  }
                  textoAdicional={
                    <div className="aguardando-sincronismo-soli5">
                      <label>AGUARDANDO SINCRONISMO</label>
                    </div>
                  } // Não mostra os botões nesta coluna
                  // Passa a função para o componente
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancelamento;
