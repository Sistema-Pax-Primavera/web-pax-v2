import React from "react";
import "./filtro-rotas-cobranca.css";
import ButtonIconTextoStart from "../button-icon-texto-start/index";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Switch demo" } };

const FiltroRotasCobranca = () => {
  return (
    <div className="container-filtro-rotas-cobran">
      <div className="campos-rotas-cobran1">
        <label>Cobrador</label>
        <select></select>
      </div>
      <div className="campos-rotas-cobran1">
        <label>Rota</label>
        <select></select>
      </div>
      <div className="campos-rotas-cobran1">
        <label>Tipo de Transferência</label>
        <div className="enviar-transferir-rota">
          <label>Enviar</label>
          <Switch {...label} />
          <label>Enviar e Transferir</label>
        </div>
      </div>
      <div className="campos-rotas-cobran2">
        <ButtonIconTextoStart
          corFundoBotao={"#006b33"}
          corTextoBotao={"#ffff"}
          fontWeightBotao="700"
          title={"PESQUISAR"}
        />
      </div>
    </div>
  );
};

export default FiltroRotasCobranca;
