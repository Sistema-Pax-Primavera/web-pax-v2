import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header-boletos.css";

const HeaderBoletos = () => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (route) => {
    // Navegar para a rota específica
    navigate(route);
    // Salvar a rota no localStorage
    localStorage.setItem("page-boletos", route);
    // Atualizar a rota ativa
    setActiveRoute(route);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("page-boletos");

    if (savedPage && savedPage !== location.pathname) {
      localStorage.removeItem("page-boletos");
      setActiveRoute("");
    } else {
      setActiveRoute(savedPage);
    }
  }, [location.pathname]);

  return (
    <div className="container-header-cobranca">
      <label>Gerador Boletos</label>
      <button
        onClick={() => handleMenuClick("/avulso")}
        className={activeRoute === "/avulso" ? "active" : ""}
      >
        {" "}
        Avulso
      </button>
      <button
        onClick={() => handleMenuClick("/balao")}
        className={activeRoute === "/balao" ? "active" : ""}
      >
        Balão
      </button>
      <button
        onClick={() => handleMenuClick("/lote")}
        className={activeRoute === "/lote" ? "active" : ""}
      >
        Lote
      </button>
      <label>Boletos</label>
      <button
        onClick={() => handleMenuClick("/busca-boletos")}
        className={activeRoute === "/busca-boletos" ? "active" : ""}
      >
        Busca de Boletos
      </button>

    </div>
  );
};

export default HeaderBoletos;
