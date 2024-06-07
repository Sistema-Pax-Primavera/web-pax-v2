import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './header-cobranca.css'
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const HeaderCobranca = ({ idioma }) => {
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
    <div className='navegacao-cadastro-cob'>
      <div className="back-header">
        <a onClick={handleVoltar}><ArrowBackIosNewIcon fontSize={'small'} /> VOLTAR</a>
      </div>
      <label>Cobranca</label>
      <button
        onClick={() => handleMenuClick("/cobranca/rota")}
        className={activeRoute === "/cobranca/rota" ? "active" : ""}
      >
        Rota
      </button>
      <button
        onClick={() => handleMenuClick("/cobranca/bairro")}
        className={activeRoute === "/cobranca/bairro" ? "active" : ""}
      >
        Bairro
      </button>
      <button
        onClick={() => handleMenuClick("/cobranca/regiao-bairro")}
        className={activeRoute === "/cobranca/regiao-bairro" ? "active" : ""}
      >
        Região Bairro
      </button>
      <button
        onClick={() => handleMenuClick("/cobranca/municipio")}
        className={activeRoute === "/cobranca/municipio" ? "active" : ""}
      >
        Município
      </button>
      <button
        onClick={() => handleMenuClick("/cobranca/bordero")}
        className={activeRoute === "/cobranca/bordero" ? "active" : ""}
      >
        Borderô
      </button>

    </div>
  );
};

export default HeaderCobranca;