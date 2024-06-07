import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './header.css';
import idiomas from '../../utils/info';

const Header = ({ cliente, idioma }) => {
    const [activeRoute, setActiveRoute] = useState("");
    const [permissao, setPermissao] = useState([]);
    const navigate = useNavigate();
    const [isIdioma, setIsIdioma] = useState(true);

    const handleMenuClick = (route) => {
        // Navegar para a rota específica
        navigate(route, { state: { cliente, idioma } });
        // Salvar a rota no localStorage
        localStorage.setItem("page-associado", route);
        // Atualizar a rota ativa
        setActiveRoute(route);
    };


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("usuario"));
        const unidadeAtualId = user.unidadeAtual;
        const permissaoUnidadeAtual = user.unidades.find(unidade => unidade.unidadeId === unidadeAtualId)?.permissao;

        if (permissaoUnidadeAtual) {
            setPermissao(permissaoUnidadeAtual);
        }

        const savedPage = localStorage.getItem("page-associado");
        setActiveRoute(savedPage);
    }, []);

    const isItemActive = (moduleName, item) => {
        const categoria = permissao['atendimento'];
        const modulePermission = categoria;
        if (modulePermission && modulePermission.associado && modulePermission.associado.itens && modulePermission.associado.itens[item]) {
            return modulePermission.associado.itens[item] === true;
        }
        return false;
    };

    return (
        <div className='navegacao-associado'>
            <label>{idioma ? idiomas.es_PY.header.cliente.titulo : idiomas.pt_BR.header.cliente.titulo}</label>
            <button
                onClick={() => handleMenuClick("/dados-cadastrais")}
                className={activeRoute === "/dados-cadastrais" ? "active" : ""}
                style={{ display: isItemActive("associado", "dados-cadastrais") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.cliente.dadosCadastrais : idiomas.pt_BR.header.cliente.dadosCadastrais}
            </button>
            <button onClick={() => handleMenuClick("/dados-cobranca")}
                className={activeRoute === "/dados-cobranca" ? "active" : ""}
                style={{ display: isItemActive("associado", "dados-cobranca") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.cliente.dadosCobranca : idiomas.pt_BR.header.cliente.dadosCobranca}
            </button>

            <button
                onClick={() => handleMenuClick("/dependentes")}
                className={activeRoute === "/dependentes" ? "active" : ""}
                style={{ display: isItemActive("associado", "dependentes") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.cliente.dependentes : idiomas.pt_BR.header.cliente.dependentes}
            </button>

            <button
                onClick={() => handleMenuClick("/pdr")}
                className={activeRoute === "/pdr" ? "active" : ""}
                style={{ display: isItemActive("associado", "pdr") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.cliente.pdr : idiomas.pt_BR.header.cliente.pdr}
            </button>


            <button
                onClick={() => handleMenuClick("/contato")}
                className={activeRoute === "/contato" ? "active" : ""}
                style={{ display: isItemActive("associado", "contato") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.cliente.contato : idiomas.pt_BR.header.cliente.contato}
            </button>

            <label>{idioma ? idiomas.es_PY.header.acoes.titulo : idiomas.pt_BR.header.acoes.titulo}</label>

            <button
                onClick={() => handleMenuClick("/recebimento")}
                className={activeRoute === "/recebimento" ? "active" : ""}
                style={{ display: isItemActive("associado", "recebimento") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.acoes.recebimento : idiomas.pt_BR.header.acoes.recebimento}
            </button>

            <button
                onClick={() => handleMenuClick("/atendimento")}
                className={activeRoute === "/atendimento" ? "active" : ""}
                style={{ display: isItemActive("associado", "atendimento") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.acoes.atendimento : idiomas.pt_BR.header.acoes.atendimento}
            </button>

            <button
                onClick={() => handleMenuClick("/inativar-contrato")}
                className={activeRoute === "/inativar-contrato" ? "active" : ""}
                style={{ display: isItemActive("associado", "inativar-contrato") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.acoes.inativarContrato : idiomas.pt_BR.header.acoes.inativarContrato}
            </button>

            <button
                onClick={() => handleMenuClick("/registrar-obito")}
                className={activeRoute === "/registrar-obito" ? "active" : ""}
                style={{ display: isItemActive("associado", "registrar-obito") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.acoes.registrarObito : idiomas.pt_BR.header.acoes.registrarObito}
            </button>

            <button
                onClick={() => handleMenuClick("/cancelar-contrato")}
                className={activeRoute === "/cancelar-contrato" ? "active" : ""}
                style={{ display: isItemActive("associado", "cancelar-contrato") ? "flex" : "none" }}>
                {idioma ? idiomas.es_PY.header.acoes.cancelarContrato : idiomas.pt_BR.header.acoes.cancelarContrato}
            </button>

            <button
                onClick={() => handleMenuClick("/quitar")}
                className={activeRoute === "/quitar" ? "active" : ""}
                style={{ display: isItemActive("associado", "quitar") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.acoes.quitar : idiomas.pt_BR.header.acoes.quitar}
            </button>

            <button
                onClick={() => handleMenuClick("/extrato")}
                className={activeRoute === "/extrato" ? "active" : ""}
                style={{ display: isItemActive("associado", "extrato") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.acoes.extrato : idiomas.pt_BR.header.acoes.extrato}
            </button>

            <button
                onClick={() => handleMenuClick("/negociar")}
                className={activeRoute === "/negociar" ? "active" : ""}
                style={{ display: isItemActive("associado", "negociar") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.acoes.negociar : idiomas.pt_BR.header.acoes.negociar}
            </button>

            <button
                onClick={() => handleMenuClick("/contrato")}
                className={activeRoute === "/contrato" ? "active" : ""}
                style={{ display: isItemActive("associado", "contrato") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.acoes.contrato : idiomas.pt_BR.header.acoes.contrato}
            </button>
            <button
                onClick={() => handleMenuClick("/carteirinha")}
                className={activeRoute === "/carteirinha" ? "active" : ""}
                style={{ display: isItemActive("associado", "carteirinha") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.acoes.carteirinha : idiomas.pt_BR.header.acoes.carteirinha}
            </button>

            <label>{idioma ? idiomas.es_PY.header.historico.titulo : idiomas.pt_BR.header.historico.titulo}</label>
            <button
                onClick={() => handleMenuClick("/observacao")}
                className={activeRoute === "/observacao" ? "active" : ""}
                style={{ display: isItemActive("associado", "observacao") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.historico.observacao : idiomas.pt_BR.header.historico.observacao}
            </button>
            <button
                onClick={() => handleMenuClick("/historico-funeraria")}
                className={activeRoute === "/historico-funeraria" ? "active" : ""}
                style={{ display: isItemActive("associado", "historico-funeraria") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.historico.historicoFunerario : idiomas.pt_BR.header.historico.historicoFunerario}
            </button>
            <button
                onClick={() => handleMenuClick("/historico-pet")}
                className={activeRoute === "/historico-pet" ? "active" : ""}
                style={{ display: isItemActive("associado", "historico-pet") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.historico.historicoPET : idiomas.pt_BR.header.historico.historicoPET}
            </button>

            <button
                onClick={() => handleMenuClick("/historico-clinica")}
                className={activeRoute === "/historico-clinica" ? "active" : ""}
                style={{ display: isItemActive("associado", "historico-clinica") ? "flex" : "none" }}
            >
                {idioma ? idiomas.es_PY.header.historico.historicoClinica : idiomas.pt_BR.header.historico.historicoClinica}
            </button>

        </div>
    );
};

export default Header;
