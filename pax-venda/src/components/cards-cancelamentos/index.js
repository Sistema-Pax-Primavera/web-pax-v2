// CardsCancelamentos.js

import React from "react";
import "./cards-solicitacoes-cobradores.css";
import ButtonIconTextoStart from "../button-icon-texto-start";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

const CardsCancelamentos = ({ solicitationNumber, name, date, unit, reason, onAceitar, onRecusar }) => {
  const handleAceitar = () => {
    onAceitar(solicitationNumber);
  };

  const handleRecusar = () => {
    onRecusar(solicitationNumber);
  };

  return (
    <div className="card-soli-cobrad">
      <div className="numero-soli-nome">
        <label>Solicitação {solicitationNumber}</label>
        <p>{name}</p>
      </div>
      <div className="primeira-categoria-soli">
        <div className="duas-categorias-solicitacoes">
          <CalendarMonthIcon fontSize={"medium"} />
          <div className="categoria-resul-soli">
            <label>Data</label>
            <p>{date}</p>
          </div>
        </div>
        <div className="duas-categorias-solicitacoes">
          <PlaceIcon fontSize={"medium"} />
          <div className="categoria-resul-soli">
            <label>Unidade</label>
            <p>{unit}</p>
          </div>
        </div>
      </div>
      <label>Motivo</label>
      <p>{reason}</p>
      <div className="aceita-regeita-soli-cob">
        <div className="buttaos-soli">
        <ButtonIconTextoStart
          title={"ACEITAR"}
          icon={<AddTaskOutlinedIcon fontSize={"small"} />}
          fontSize="10"
          fontWeightBotao="700"
          corFundoBotao="#006b33"
          corTextoBotao="#ffff"
          funcao={handleAceitar}  // Corrigido para passar a função handleAceitar corretamente
        />
        </div>
        <div className="buttaos-soli">
          <ButtonIconTextoStart
            title={"RECUSAR"}
            icon={<HighlightOffOutlinedIcon fontSize={"small"} />}
            fontSize="10"
            fontWeightBotao="700"
            corFundoBotao="#FF0000"
            corTextoBotao="#ffff"
            funcao={handleRecusar}
          />
        </div>
      </div>
    </div>
  );
};

export default CardsCancelamentos;
