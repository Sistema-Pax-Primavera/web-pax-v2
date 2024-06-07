import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./modal-cadastro.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ModalCadastro = ({ buttonText, icon, children, icone2, titulo, height, width }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button onClick={toggleModal}>
        {icon && <i className={icon} />}{" "}
        {/* Renderiza o ícone se for fornecido */}
        {buttonText}
      </button>
      <div className={isOpen ? "overlay" : ""} onClick={toggleModal}></div>
      <CSSTransition
        in={isOpen}
        timeout={1000}
        classNames="modal"
        unmountOnExit
      >
        <div className="modal" style={{width: width}}>
          <div className="modal-content2">
            <div className="fecha-modal-cadastro">
              <label>
                {icone2} {titulo}
              </label>
              <button onClick={toggleModal}>
                <HighlightOffIcon fontSize={"large"} />
              </button>
            </div>
            <div className="campos-do-cadastro" style={{ height: height }}>{children}</div>
          </div>
         
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalCadastro;
