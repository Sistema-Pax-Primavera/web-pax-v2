import React from "react";
import './modal-confirma.css';
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ModalConfirma = ({ isOpen, onClose, titulo, children }) => {
    return (
        <div className={`modal ${isOpen ? "open" : ""}`}>
            <div className="modal-content2">
                <div className="fecha-modal-cadastro">
                    <label>
                        {titulo}
                    </label>
                    <button onClick={onClose}>
                        <HighlightOffIcon fontSize={"medium"} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default ModalConfirma;
