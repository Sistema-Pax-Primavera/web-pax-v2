import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const HeaderCrmVendas = ({ idioma }) => {
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
    navigate("/pax");
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
    <div className="navegacao-cadastro-fin">
      <div className="back-header">
        <a onClick={handleVoltar}>
          <ArrowBackIosNewIcon fontSize={"small"} /> VOLTAR
        </a>
      </div>
      <label>Crm Vendas</label>
      <button
        onClick={() => handleMenuClick("/crm-vendas/filtro")}
        className={activeRoute === "/crm-vendas/filtro" ? "active" : ""}
      >
        Filtro
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/colunas")}
        className={activeRoute === "/crm-vendas/colunas" ? "active" : ""}
      >
        Colunas
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/grupo")}
        className={activeRoute === "/crm-vendas/grupo" ? "active" : ""}
      >
        Grupo
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/indicados")}
        className={activeRoute === "/crm-vendas/indicados" ? "active" : ""}
      >
        Indicados
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/atividades")}
        className={activeRoute === "/crm-vendas/atividades" ? "active" : ""}
      >
        Atividades
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/etiquetas")}
        className={activeRoute === "/crm-vendas/etiquetas" ? "active" : ""}
      >
        Etiquetas
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/origem-lead")}
        className={activeRoute === "/crm-vendas/origem-lead" ? "active" : ""}
      >
        Origem Lead
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/categoria-agendamentos")}
        className={activeRoute === "/crm-vendas/categoria-agendamentos" ? "active" : ""}
      >
        Cat. Agendamentos
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/justificativa")}
        className={activeRoute === "/crm-vendas/justificativa" ? "active" : ""}
      >
        Justificativa
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/gatilhos")}
        className={activeRoute === "/crm-vendas/gatilhos" ? "active" : ""}
      >
        Gatilhos
      </button>
      <button
        onClick={() => handleMenuClick("/crm-vendas/interesses-cliente")}
        className={activeRoute === "/crm-vendas/interesses-cliente" ? "active" : ""}
      >
        Interesses do Cliente
      </button>
    </div>
  );
};

export default HeaderCrmVendas;
