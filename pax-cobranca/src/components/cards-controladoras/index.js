import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./cards-controladoras.css";
import ButtonIconTextoStart from "../button-icon-texto-start";
import AtendimentoControladora from "../atendimentos-controladora";

const dataControladoras = [
  {
    nome: "Giovana",
    status: "Online",
    clientesAtendidos: 50,
    quantidadePendente: 50,
    ultimoAtendimento: "26/02/2024 - 13:52",
    corFundoBotao: "#006b33",
    corTextoBotao: "#ffff",
    fontWeightBotao: 700,
  },
  {
    nome: "João",
    status: "Offline",
    clientesAtendidos: 30,
    quantidadePendente: 20,
    ultimoAtendimento: "25/02/2024 - 10:30",
    corFundoBotao: "#ff0000",
    corTextoBotao: "#ffff",
    fontWeightBotao: 700,
  },
  {
    nome: "Maria",
    status: "Online",
    clientesAtendidos: 70,
    quantidadePendente: 10,
    ultimoAtendimento: "27/02/2024 - 15:45",
    corFundoBotao: "#0000ff",
    corTextoBotao: "#ffff",
    fontWeightBotao: 700,
  },
];

const CardsControladoras = () => {
  const [mostrarAtendimento, setMostrarAtendimento] = useState(false);

  const handleVisualizarClick = () => {
    setMostrarAtendimento(true);
  };
  const handleVoltarClick = () => {
    setMostrarAtendimento(false);
  };
  return (
    <div className="gerencial-controla">
      {!mostrarAtendimento ? (
        dataControladoras.map((controladora, index) => (
          <div key={index} className="container-perfil-controladora">
            <div className="icon-controladora">
              <AccountCircleIcon fontSize={"large"} />
              <label>{controladora.nome}</label>
              <p>{controladora.status}</p>
            </div>
            <div className="info-controladora">
              <div className="campos-controladoras">
                <label>Clientes Atendidos</label>
                <a>{controladora.clientesAtendidos}</a>
              </div>
              <div className="campos-controladoras2">
                <label>Quantidade Pendente</label>
                <a>{controladora.quantidadePendente}</a>
              </div>
              <div className="campos-controladoras3">
                <label>Ultímo Atendimento</label>
                <p>{controladora.ultimoAtendimento}</p>
              </div>
              <div className="button-visu-contro">
                <ButtonIconTextoStart
                  title={"VISUALIZAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                  fontWeightBotao={700}
                  funcao={handleVisualizarClick}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <AtendimentoControladora onVoltarClick={handleVoltarClick} />
      )}
    </div>
  );
};

export default CardsControladoras;
