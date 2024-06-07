import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header-atendimento.css";
import ButtonIconTextoStart from "../button-icon-texto-start";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const HeaderAtendimento = ({ idioma }) => {
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
    <div className="navegacao-cadastro-at">
      <div className="back-header">
        <a onClick={handleVoltar}><ArrowBackIosNewIcon fontSize={'small'} /> VOLTAR</a>
      </div>
      <label>Atendimento</label>
      <button
        onClick={() => handleMenuClick("/atendimento/tipo-atendimento")}
        className={
          activeRoute === "/atendimento/tipo-atendimento" ? "active" : ""
        }
      >
        Tipo Atendimento
      </button>
      <button
        onClick={() => handleMenuClick("/atendimento/tipo-sub-atendimento")}
        className={
          activeRoute === "/atendimento/tipo-sub-atendimento" ? "active" : ""
        }
      >
        Tipo Sub Atendimento
      </button>
    </div>
  );
};

export default HeaderAtendimento;
