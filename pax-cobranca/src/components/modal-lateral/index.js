import React, { useEffect, useState } from "react";
import "./modal-lateral.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const ModalLateral = ({ isOpen, toggleModal, conteudo }) => {
  const [modalState, setModalState] = useState("");

  useEffect(() => {
    setModalState(isOpen ? "open" : "close");
  }, [isOpen]);

  const closeModal = () => {
    setModalState("closing");
    setTimeout(() => {
      toggleModal();
    }, 500); // Aguarda o término da animação de fechamento (500ms)
  };

  return (
    <div className={`modal-lateral ${modalState}`}>
      <div className="modal-content">
        <button onClick={closeModal}>
          <KeyboardArrowRightIcon fontSize={'small'} />
        </button>
        {conteudo}
      </div>
    </div>
  );
};

export default ModalLateral;
