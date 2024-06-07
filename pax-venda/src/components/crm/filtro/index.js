import React from "react";
import ModalLateral from "../../modal-lateral";
import ButtonText from "../../button-texto";
import { Checkbox } from "@mui/material";
import './filtro.css';

const FiltroCRM = ({ modalAberta, toggleModal, colunasDinamicas, colunasOcultas, setColunasOcultas }) => {
    const handleCheckboxChange = (event) => {
        setColunasOcultas(event.target.checked);
    };

    return (
        <ModalLateral
            isOpen={modalAberta}
            toggleModal={toggleModal}
            conteudo={
                <div className="container-modal-lateral-filtro-crm-vendas">
                    <h1>Filtro Oportunidades</h1>
                    <div className="campos-filtro">
                        <div className="campos-vendas">
                            <label>Data Inicial</label>
                            <input type="date"></input>
                            <label>Data Final</label>
                            <input type="date"></input>
                        </div>

                        <div className="campos-vendas">
                            <label>Colunas</label>
                            <select>
                                {Object.entries(colunasDinamicas).map(([key, value]) => (
                                    <option key={value.id} value={value.id}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="campos-vendas">
                            <label>Nome</label>
                            <input placeholder="Informe o Nome"></input>
                        </div>
                        <div className="campos-vendas">
                            <label>Telefone</label>
                            <input type="number"></input>
                        </div>
                        <div className="campos-vendas">
                            <label>Selecione:</label>
                        </div>
                        <div className="campos-vendas">
                            <div>
                                <Checkbox
                                    checked={colunasOcultas}
                                    onChange={handleCheckboxChange}
                                />
                                <label>Colunas Ocultas</label>
                            </div>
                        </div>
                        <div className="pesquisa-filtro-crm-vendas">
                            <ButtonText title="Filtrar" />
                        </div>
                    </div>
                </div>
            }
        ></ModalLateral>
    );
};

export default FiltroCRM;
