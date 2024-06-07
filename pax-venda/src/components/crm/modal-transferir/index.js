import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ButtonIconRed from "../../../../../pax-associado/src/components/button-icon-red";
import ButtonText from "../../button-texto";
import './modal-transferir.css';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 350,
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: 3,
    overflowX: "hidden",
    border: "none",
    boxShadow: 24,
};

const ModalTransferir = ({ open, onClose, colunasDestino }) => {
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
                                    Transferir oportunidade
                                </label>
                            </div>
                        </div>
                    </div>
                </Typography>
                <Typography sx={{ mt: 2 }}>
                    <div className="container-modal-oportunidade-crm">
                        <label>Informações do cliente</label>
                        <div className="dados-basico-oportunidade">
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Unidade/Região</label>
                                        <select>
                                            <option value="MS">MS</option>
                                            <option value="Conesul">Conesul</option>
                                            <option value="PR">PR</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="campo-form">
                                    <label>Equipe</label>
                                    <select>
                                        <option value="SP">Equipe Conesul</option>
                                        <option value="RJ">Equipe MS</option>
                                        <option value="BH">Equipe PR</option>
                                    </select>
                                </div>
                            </div>
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Coluna de destino</label>
                                        <select>
                                            {Object.entries(colunasDestino).map(([key, value]) => (
                                                <option key={value.id} value={value.id}>
                                                    {key}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Vendedor</label>
                                        <select>
                                            <option value="celular">Vendedor 1</option>
                                            <option value="telefone">Vendedor 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="button-salvar-modal-transferir">
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

export default ModalTransferir;
