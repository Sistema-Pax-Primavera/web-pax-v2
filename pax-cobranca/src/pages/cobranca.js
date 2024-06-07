import React from "react";
import HeaderCobranca from "../components/header-cobranca";
import './cobranca.css'
import Controladoria from '../assets/controladoria.svg'

const Cobranca = () => {
  return (
    <div className="container-cobranca">
      <HeaderCobranca />
      <div className="colunas-cobranca">
        <img src={Controladoria}></img>
        <h1>Selecione uma opção do menu!</h1>
      </div>
    </div>
  );
};

export default Cobranca;
