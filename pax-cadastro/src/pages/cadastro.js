import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cadastro.css";
import Selecionar from '../../assets/selecionar.svg'
import HeaderCadastro from "../components/header";

const Cadastro = () => {

    return (
        <div className="container-cadastro">
            <HeaderCadastro />
            <div className="cadastro-img">
                <div>
                    <img src={Selecionar}></img>
                </div>
                <label>Selecione uma opção do menu!</label>
            </div>
        </div>
    );
};

export default Cadastro;
