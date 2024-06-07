import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './header.css'
import idiomas from '../../utils/info';


const HeaderVendas = ({ idioma }) => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (route) => {
    // Navegar para a rota específica
    navigate(route);
    // Salvar a rota no localStorage
    localStorage.setItem("page-venda", route);
    // Atualizar a rota ativa
    setActiveRoute(route);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("page-venda");

    if (savedPage && savedPage !== location.pathname) {
      localStorage.removeItem("page-venda");
      setActiveRoute("");
    } else {
      setActiveRoute(savedPage);
    }
  }, [location.pathname]);

  return (
    <div className='navegacao-vendas'>
      <button
        onClick={() => handleMenuClick("/contratos")}
        className={activeRoute === "/contratos" ? "active" : ""}
      >
        {idioma ? idiomas.es_PY.header.contratoPendente : idiomas.pt_BR.header.contratoPendente}
      </button>
      <button
        onClick={() => handleMenuClick("/contratos-finalizados")}
        className={activeRoute === "/contratos-finalizados" ? "active" : ""}
      >
        {idioma ? idiomas.es_PY.header.contratoFinalizado : idiomas.pt_BR.header.contratoFinalizado}
      </button>
      {/* <button
        onClick={() => handleMenuClick("/cadastro")}
        className={activeRoute === "/cadastro" ? "active" : ""}
      >
        {idioma ? idiomas.es_PY.header.cadastro : idiomas.pt_BR.header.cadastro}
      </button> */}
      <button
        onClick={() => handleMenuClick("/cancelamento")}
        className={activeRoute === "/cancelamento" ? "active" : ""}
      >
        {idioma ? idiomas.es_PY.header.cancelamento : idiomas.pt_BR.header.cancelamento}
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas")}
        className={activeRoute === "/crm-vendas" ? "active" : ""}
      >
        {idioma ? idiomas.es_PY.header.crm : idiomas.pt_BR.header.crm}
      </button>
    </div>
  );
};

export default HeaderVendas;