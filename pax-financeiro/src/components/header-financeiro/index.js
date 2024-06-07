import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header-financeiro.css";

const HeaderFinanceiro = () => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (route) => {
    // Navegar para a rota específica
    navigate(route);
    // Salvar a rota no localStorage
    localStorage.setItem("page-financeiro", route);
    // Atualizar a rota ativa
    setActiveRoute(route);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("page-financeiro");

    if (savedPage && savedPage !== location.pathname) {
      localStorage.removeItem("page-financeiro");
      setActiveRoute("");
    } else {
      setActiveRoute(savedPage);
    }
  }, [location.pathname]);


  return (
    <div className="container-header-cobranca">
      <button
        onClick={() => handleMenuClick("/movimentacoes")}
        className={activeRoute === "/movimentacoes" ? "active" : ""}
      >Movimentações
      </button>
      <button
        onClick={() => handleMenuClick("/baixas")}
        className={activeRoute === "/baixas" ? "active" : ""}
      > Baixas
      </button>

    </div>
  );
};

export default HeaderFinanceiro;
