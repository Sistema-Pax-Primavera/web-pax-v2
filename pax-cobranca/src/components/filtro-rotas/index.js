import React from "react";
import "./filtro-rotas.css";
import ButtonIconTextoStart from "../button-icon-texto-start/index";

const FiltroRotas = () => {
  return (
    <div className="container-filtro-rotas-cobran">
      <div className="campos-rotas-cobran1">
        <label>Unidade</label>
        <select></select>
      </div>
      <div className="campos-rotas-cobran1">
        <label>Cobrador</label>
        <select></select>
      </div>
      <div className="campos-rotas-cobran1">
        <label>Rota</label>
        <select></select>
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

export default FiltroRotas;
