import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header-relatorio.css";

const HeaderRelatorio = () => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (route) => {
    // Navegar para a rota específica
    navigate(route);
    // Salvar a rota no localStorage
    localStorage.setItem("page-relatorio", route);
    // Atualizar a rota ativa
    setActiveRoute(route);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("page-relatorio");

    if (savedPage && savedPage !== location.pathname) {
      localStorage.removeItem("page-relatorio");
      setActiveRoute("");
    } else {
      setActiveRoute(savedPage);
    }
  }, [location.pathname]);


  return (
    <div className="container-header-relatorio">
      <button
        onClick={() => handleMenuClick("/cobranca")}
        className={activeRoute === "/cobranca" ? "active" : ""}
      >Cobrança
      </button>
      <button
        onClick={() => handleMenuClick("/vendas")}
        className={activeRoute === "/vendas" ? "active" : ""}
      > Vendas
      </button>
      <button
        onClick={() => handleMenuClick("/cancelamentos")}
        className={activeRoute === "/cancelamentos" ? "active" : ""}
      > Cancelamentos
      </button>
      <button
        onClick={() => handleMenuClick("/ranking")}
        className={activeRoute === "/ranking" ? "active" : ""}
      > Ranking
      </button>
      <button
        onClick={() => handleMenuClick("/obito")}
        className={activeRoute === "/obito" ? "active" : ""}
      > Obito
      </button>
    </div>
  );
};

export default HeaderRelatorio;
