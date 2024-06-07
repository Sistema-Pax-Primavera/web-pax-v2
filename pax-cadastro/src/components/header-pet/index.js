import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header-pet.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const HeaderPet = ({ idioma }) => {
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
    <div className="navegacao-cadastro-pet">
      <div className="back-header">
        <a onClick={handleVoltar}>
          <ArrowBackIosNewIcon fontSize={"small"} /> VOLTAR
        </a>
      </div>
      <label>Pet</label>
      <button
        onClick={() => handleMenuClick("/pet/raca")}
        className={activeRoute === "/pet/raca" ? "active" : ""}
      >
        Raça
      </button>
      <button
        onClick={() => handleMenuClick("/pet/especie")}
        className={activeRoute === "/pet/especie" ? "active" : ""}
      >
        Espécie
      </button>
    </div>
  );
};

export default HeaderPet;
