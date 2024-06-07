import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./header-suporte.css";

const HeaderSuporte = () => {
  const [activeRoute, setActiveRoute] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (route) => {
    // Navegar para a rota específica
    navigate(route);
    // Salvar a rota no localStorage
    localStorage.setItem("page-suporte", route);
    // Atualizar a rota ativa
    setActiveRoute(route);
  };

  useEffect(() => {
    const savedPage = localStorage.getItem("page-suporte");

    if (savedPage && savedPage !== location.pathname) {
      localStorage.removeItem("page-suporte");
      setActiveRoute("");
    } else {
      setActiveRoute(savedPage);
    }
  }, [location.pathname]);


  return (
    <div className="container-header-suporte">
      <button
        onClick={() => handleMenuClick("/alterar-caixa")}
        className={activeRoute === "/alterar-caixa" ? "active" : ""}
      >Alterar Caixa
      </button>
      <button
        onClick={() => handleMenuClick("/alterar-forma-pagamento")}
        className={activeRoute === "/alterar-forma-pagamento" ? "active" : ""}
      > Alterar Form. Pag
      </button>
      <button
        onClick={() => handleMenuClick("/baixa-filial")}
        className={activeRoute === "/baixa-filial" ? "active" : ""}
      >Baixa Filial
      </button>
      {/* <button
        onClick={() => handleMenuClick("/cheques")}
        className={activeRoute === "/cheques" ? "active" : ""}
      >Cheques
      </button> */}
      

    </div>
  );
};

export default HeaderSuporte;
