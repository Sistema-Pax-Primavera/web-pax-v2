import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header-pax.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const HeaderPax = ({ idioma }) => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (route) => {
    // Navegar para a rota específica
    navigate(route);
    // Salvar a rota no localStorage
    localStorage.setItem("page-cadastro", route);
    // Atualizar a rota ativa
    setActiveRoute(route);
  };
  const handleVoltar = () => {
    navigate('/');
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
    <div className="navegacao-cadastro-pax">
      <div className="back-header">
        <a onClick={handleVoltar}>
          <ArrowBackIosNewIcon fontSize={"small"} /> VOLTAR
        </a>
      </div>
      <label>Pax</label>
      <button
        onClick={() => handleMenuClick("/pax/planos")}
        className={activeRoute === "/pax/planos" ? "active" : ""}
      >
        Planos
      </button>
      <button
        onClick={() => handleMenuClick("/pax/adicionais")}
        className={activeRoute === "/pax/adicionais" ? "active" : ""}
      >
        Adicionais
      </button>
      <button
        onClick={() => handleMenuClick("/pax/parentesco")}
        className={activeRoute === "/pax/regiao-bairro" ? "active" : ""}
      >
        Parentesco
      </button>
      <button
        onClick={() => handleMenuClick("/pax/religiao")}
        className={activeRoute === "/pax/religiao" ? "active" : ""}
      >
        Religião
      </button>

      <button
        onClick={() => handleMenuClick("/pax/estado-civil")}
        className={activeRoute === "/pax/estado-civil" ? "active" : ""}
      >
        Estado Civil
      </button>
      <button
        onClick={() => handleMenuClick("/pax/concorrencia")}
        className={activeRoute === "/pax/concorrencia" ? "active" : ""}
      >
        Concorrencia
      </button>
      <button
        onClick={() => handleMenuClick("/pax/categoria")}
        className={activeRoute === "/pax/categoria" ? "active" : ""}
      >
        Categoria
      </button>
      <button
        onClick={() => handleMenuClick("/pax/sub-categoria")}
        className={activeRoute === "/pax/sub-categoria" ? "active" : ""}
      >
        Sub Categoria
      </button>
      <button
        onClick={() => handleMenuClick("/pax/situacao")}
        className={activeRoute === "/pax/situacao" ? "active" : ""}
      >
        Situação
      </button>
      <button
        onClick={() => handleMenuClick("/pax/templates")}
        className={activeRoute === "/pax/templates" ? "active" : ""}
      >
        Templates
      </button>
      <button
        onClick={() => handleMenuClick("/pax/profissao")}
        className={activeRoute === "/pax/profissao" ? "active" : ""}
      >
        Profissão
      </button>
      <button
        onClick={() => handleMenuClick("/pax/crm-vendas")}
        className={activeRoute === "/pax/crm-vendas" ? "active" : ""}
      >
        Crm Vendas
      </button>
      
    </div>
  );
};

export default HeaderPax;
