import React from "react";
import "./modal-cadastro.css";
import { Modal, Box, Typography, Grid } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ButtonIconRed from "../../../../../pax-associado/src/components/button-icon-red";
import ButtonText from "../../button-texto";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 550,
    bgcolor: "background.paper",
    outline: "none",
    borderRadius: 3,
    overflowX: "hidden",
    border: "none",
    boxShadow: 24,
};

const ModalCadastro = ({ open, onClose, colunasDestino }) => {
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
                                    Criar nova oportunidade
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
                                        <label>Telefone Celular</label>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Nome Completo</label>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>O cliente deseja contato por:</label>
                                        <div>
                                            <label>
                                                <input type="checkbox" /> Telefone
                                            </label>
                                            <label>
                                                <input type="checkbox" /> Celular
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Estado</label>
                                        <select>
                                            <option value="SP">São Paulo</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="MG">Minas Gerais</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="campo-form">
                                    <label>Cidade</label>
                                    <select>
                                        <option value="SP">São Paulo</option>
                                        <option value="RJ">Rio de Janeiro</option>
                                        <option value="BH">Belo Horizonte</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-modal-oportunidade-crm">
                        <label>Informações adicionais de contato</label>
                        <div className="dados-basico-oportunidade">
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Tipo</label>
                                        <select>
                                            <option value="celular">Celular</option>
                                            <option value="telefone">Telefone</option>
                                        </select>
                                    </div>
                                    <div className="campo-form">
                                        <label>Contato</label>
                                        <input type="text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container-modal-oportunidade-crm">
                        <div className="dados-basico-oportunidade">
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Quem indicou</label>
                                        <select>
                                            <option value="ind1">Indicador 1</option>
                                            <option value="ind2">Indicador 2</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Origem desta lead</label>
                                        <select>
                                            <option value="site">Site</option>
                                            <option value="rede">Rede Social</option>
                                        </select>
                                    </div>
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
                                        <label>Etiquetas</label>
                                        <select>
                                            <option value="vip">VIP</option>
                                            <option value="novo">Novo</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <label>Observações</label>
                                        <div className="text-area-cadastro">
                                            <textarea
                                                placeholder="Descreva aqui a observação"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="infor-modal-oportunidade-crm">
                                <div className="oportunidade-cliente">
                                    <div className="campo-form">
                                        <div>
                                            <label>
                                                <input type="checkbox" /> Marca oportunidade como ganha
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-salvar-modal-cadastro">
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

export default ModalCadastro;
