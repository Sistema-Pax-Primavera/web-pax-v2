import React, { useState } from "react";
import "./envios.css";
import HeaderCobranca from "../../components/header-cobranca";
import FiltroTabelas1 from "../../components/filtro-tabelas";
import FiltroContrato from "../../components/filtro-contrato";

const Envios = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [showFilterTabelas, setShowFilterTabelas] = useState(true);

  const toggleFiltros = () => {
    setShowFilterTabelas(!showFilterTabelas);
    setShowHeader(!showHeader);
  };

  const toggleHeaderVisibility = () => {
    setShowHeader(!showHeader);
  };

  return (
    <div className="container-cobranca">
      {showHeader && <HeaderCobranca />}
      <div className="container-envios-padrao">
        {showFilterTabelas ? (
          <FiltroTabelas1 toggleFiltros={toggleFiltros} toggleHeaderVisibility={toggleHeaderVisibility} />
        ) : (
          <FiltroContrato toggleFiltros={toggleFiltros} />
        )}
      </div>
    </div>
  );
};

export default Envios;
