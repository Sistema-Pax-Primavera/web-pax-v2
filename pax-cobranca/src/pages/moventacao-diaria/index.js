import React from "react";
import "./movimentacao-diaria.css";
import HeaderCobranca from "../../components/header-cobranca";
import FiltroMovDiaria from "../../components/filtro-mov-diaria";

const MovimentacaoDiaria = () => {
  return (
    <div className="container-cobranca">
      <HeaderCobranca />
      <div className="container-envios-padrao">
        <FiltroMovDiaria />
      </div>
    </div>
  );
};

export default MovimentacaoDiaria;
