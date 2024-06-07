import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";

const HeaderCadastro = ({ idioma }) => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (route) => {
    navigate(route);
    // Salvar a rota no localStorage
    localStorage.setItem("page-cadastro", route);
    // Atualizar a rota ativa
    setActiveRoute(route);
  };


  useEffect(() => {
    const savedPage = localStorage.getItem("page-cadastro");

    if (savedPage && savedPage !== location.pathname) {
      localStorage.removeItem("page-cadastro");
      setActiveRoute("");
    } else {
      setActiveRoute(savedPage);
    }
  }, [location.pathname]);

  return (
    <div className="navegacao-cadastro">
      <button
        onClick={() => handleMenuClick("/usuarios/perfil")}
        className={activeRoute === "/usuarios/perfil" ? "active" : ""}
      >
        Usuários
      </button>
      <button
        onClick={() => handleMenuClick("/cobranca/rota")}
        className={activeRoute === "/cobranca/rota" ? "active" : ""}
      >
        Cobrança
      </button>
      <button
        onClick={() => handleMenuClick("/pet/raca")}
        className={activeRoute === "/pet/raca" ? "active" : ""}
      >
        PET
      </button>
      <button
        onClick={() => handleMenuClick("/atendimento/tipo-atendimento")}
        className={activeRoute === "/atendimeno/tipo-atendimento" ? "active" : ""}
      >
        Atendimento
      </button>
      <button
        onClick={() => handleMenuClick("/pax/planos")}
        className={activeRoute === "/pax/planos" ? "active" : ""}
      >
        Pax
      </button>
      <button
        onClick={() => handleMenuClick("/financeiro/conta")}
        className={activeRoute === "/financeiro/conta" ? "active" : ""}
      >
        Financeiro
      </button>
      <button
        onClick={() => handleMenuClick("/item/itens")}
        className={activeRoute === "/item/itens" ? "active" : ""}
      >
        Itens Planos
      </button>
    </div>
  );
};

export default HeaderCadastro;
