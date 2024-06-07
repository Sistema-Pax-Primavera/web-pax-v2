import React from "react";
import { CSSTransition } from "react-transition-group";
import "./modal-associado.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ModalAssociado = ({ isOpen, onClose, buttonText, icon, children, icone2, titulo }) => {

  return (
    <>
      <div className={isOpen ? "overlay" : ""} onClick={onClose}></div>
      <CSSTransition
        in={isOpen}
        timeout={300} 
        classNames="modal-associado"
        unmountOnExit
      >
        <div className="modal-associado">
          <div className="modal-content">
            <div className="fecha-modal-cadastro">
              <label>
                {icone2} {titulo}
              </label>
              <button onClick={onClose}>
                <HighlightOffIcon fontSize={"medium"} />
              </button>
            </div>
            <div className="campos-do-cadastro">{children}</div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ModalAssociado;
