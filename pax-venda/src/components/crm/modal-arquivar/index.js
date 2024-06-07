import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ButtonIconRed from "../../../../../pax-associado/src/components/button-icon-red";
import ButtonText from "../../button-texto";
import './modal-arquivar.css';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 250,
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: 3,
    overflowX: "hidden",
    border: "none",
    boxShadow: 24,
};

const ModalArquivar = ({ open, onClose, colunasDestino }) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography>
                    <div className="sidebar-cobranca">
                        <div className="cliente-cobran-nome">
                            <div className="close-modal-cobran">
                                <ButtonIconRed
                                    funcao={handleClose}
                                    icon={<HighlightOffIcon />}
                                />
                            </div>
                            <div className="nomes-cobranca">
                                <label>
                                    Arquivar oportunidades
                                </label>
                            </div>
                        </div>
                    </div>
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    <div className="container-modal-oportunidade-crm">
                        <label>Coluna de destino</label>
                        <div className="dados-basico-oportunidade">
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <select>
                                            {Object.entries(colunasDestino)
                                                .filter(([key, value]) => key === "Arquivados" || key === "Excluidos")
                                                .map(([key, value]) => (
                                                    <option key={value.id} value={value.id}>
                                                        {key}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="button-salvar-modal-arquivar">
                                <ButtonText
                                    title={"SALVAR"}
                                    funcao={''}
                                />
                            </div>
                        </div>

                    </div>
                </Typography>
            </Box>
        </Modal >
    );
};

export default ModalArquivar;
