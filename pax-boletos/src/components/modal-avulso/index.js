import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./modal-avulso.css";
import ButtonIconTextoStart from "../button-icon-texto-start";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  overflow: "auto",
  bgcolor: "background.paper",
  outline: "none",
  borderRadius: 3,
  border: "none",
  width: 400,
  boxShadow: 24,
  padding: 3,
};

const ModalAvulso = ({ openModal, onCloseModal }) => {
  const [observacao01, setObservacao01] = useState("Texto da observação 01");
  const [observacao02, setObservacao02] = useState("Texto da observação 02");

  const handleClose = () => {
    onCloseModal();
  };

  // Funções para salvar as observações
  const salvarObservacao01 = () => {
    // Lógica para salvar a observação 01
  };

  const salvarObservacao02 = () => {
    // Lógica para salvar a observação 02
  };

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={`modal-pequena ${openModal ? "open" : ""}`}
      >
        <Box sx={style}>
          <Typography>
            <div className="container-modal-pequena">
              <div className="fecha-container-modal-pequena">
                <button onClick={handleClose}>
                  <HighlightOffIcon fontSize={"small"} />
                </button>
              </div>
              <div className="conteudo-container-modal">
                <div className="obsevacoes-avulso">
                  <label>Observação 01:</label>
                  <textarea value={observacao01} onChange={(e) => setObservacao01(e.target.value)}></textarea>
                  <div className="salva-obs-avulso">
                    <div>
                      <ButtonIconTextoStart
                        title={"SALVAR"}
                        corFundoBotao={"#006b33"}
                        corTextoBotao={"#ffff"}
                        fontWeightBotao={700}
                        onClick={salvarObservacao01}
                      />
                    </div>
                  </div>
                </div>
                <div className="obsevacoes-avulso">
                  <label>Observação 02:</label>
                  <textarea value={observacao02} onChange={(e) => setObservacao02(e.target.value)}></textarea>
                  <div className="salva-obs-avulso">
                    <div>
                      <ButtonIconTextoStart
                        title={"SALVAR"}
                        corFundoBotao={"#006b33"}
                        corTextoBotao={"#ffff"}
                        fontWeightBotao={700}
                        onClick={salvarObservacao02}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAvulso;
