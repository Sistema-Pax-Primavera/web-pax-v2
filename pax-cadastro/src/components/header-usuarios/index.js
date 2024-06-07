import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const HeaderUsuarios = ({ idioma }) => {
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
    <div className="navegacao-cadastro-usuario">
      <div className="back-header">
        <a onClick={handleVoltar}>
          <ArrowBackIosNewIcon fontSize={"small"} /> VOLTAR
        </a>
      </div>
      <label>Usuário</label>
      <button
        onClick={() => handleMenuClick("/usuarios/perfil")}
        className={activeRoute === "/usuarios/perfil" ? "active" : ""}
      >
        Usuário
      </button>
      <button
        onClick={() => handleMenuClick("/usuarios/funcao")}
        className={activeRoute === "/usuarios/funcao" ? "active" : ""}
      >
        Função
      </button>
      <button
        onClick={() => handleMenuClick("/usuarios/setor")}
        className={activeRoute === "/usuarios/setor" ? "active" : ""}
      >
        Setor
      </button>
      {/* <button
        onClick={() => handleMenuClick("/usuarios/permissao")}
        className={activeRoute === "/usuarios/permissao" ? "active" : ""}
      >
        Permissão
      </button> */}
    </div>
  );
};

export default HeaderUsuarios;
