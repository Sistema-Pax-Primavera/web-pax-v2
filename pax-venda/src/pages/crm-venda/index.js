import React, { useEffect, useState } from "react";
import ColunasCobranca from "../../components/crm/colunas-cobranca";
import "./crm-vendas.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ButtonIcon from "../../../../pax-venda/src/components/button-icon";
import ModalLateral from "../../components/modal-lateral";
import ButtonText from "../../../../pax-venda/src/components/button-texto/index";
import BallotIcon from "@mui/icons-material/Ballot";
import Checkbox from "@mui/material/Checkbox";
import { useVendas } from "../../services/api";
import { toast } from "react-toastify";
import Lead from "../../components/crm/lead";
import ModalCadastro from "../../components/crm/modal-cadastro";
import ModalTransferir from "../../components/crm/modal-transferir";
import ModalArquivar from "../../components/crm/modal-arquivar";
import FiltroCRM from "../../components/crm/filtro";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const CRMVendas = () => {
    const { getCRMVendas } = useVendas();
    const navigate = useNavigate();
    const colunasDinamicas = {
        "Indicados": { id: 1, clientes: [] },
        "Tentativa de Contato": { id: 2, clientes: [] },
        "Oportunidade de Venda": { id: 3, clientes: [] },
        "Aguardando Contrato": { id: 4, clientes: [] },
        "Venda Finalizada": { id: 5, clientes: [] },
        "Negados": { id: 6, clientes: [] },
        "Arquivados": { id: 7, clientes: [] },
        "Excluidos": { id: 8, clientes: [] }
    };
    const [dadosPorColuna, setDadosPorColuna] = useState({});
    const [modalAberta, setModalAberta] = useState(false);
    const [modalClientes, setModalClientes] = useState(false);
    const [selectedCardData, setSelectedCardData] = useState(null);
    const [coluna, setColuna] = useState(null);
    const [modalOportunidade, setModalOportunidade] = useState(false);
    const [colunasOcultas, setColunasOcultas] = useState(false);
    const [modalTransferencia, setModalTransferencia] = useState(false);
    const [modalArquivar, setModalArquivar] = useState(false);

    const handleCloseFormulario = () => {
        navigate("/");
        localStorage.setItem("page-cobranca", "/");
    };

    const toggleModal = () => {
        setModalAberta(!modalAberta);
    };


    const handleCardClick = (cardData, titulo) => {
        setSelectedCardData(cardData);
        setColuna(titulo);
        setModalAberta(false);
        setModalClientes(true);
    };

    const handleCloseModalOportunidade = () => {
        setModalOportunidade(false);
    }

    const handleCloseLead = () => {
        setModalClientes(false);
    }

    const handleCloseModalArquivar = () => {
        setModalArquivar(false);
    }

    const handleModalCloseTransferencia = () => {
        setModalTransferencia(false);
    }

    const handleCadastroOportunidade = () => {
        setModalOportunidade(true);
    }

    const handleModalTransferencia = () => {
        setModalTransferencia(true);
    }

    const handleModalArquivar = () => {
        setModalArquivar(true);
    }

    const construirColunasDinamicamente = (dadosClientes) => {
        dadosClientes.forEach(cliente => {
            const colunaId = cliente.coluna_id;
            switch (colunaId) {
                case 1:
                    colunasDinamicas[
                        "Indicados"
                    ].clientes.push(cliente);
                    break;
                case 2:
                    colunasDinamicas[
                        "Tentativa de Contato"
                    ].clientes.push(cliente);
                    break;
                case 3:
                    colunasDinamicas[
                        "Oportunidade de Venda"
                    ].clientes.push(cliente);
                    break;
                case 4:
                    colunasDinamicas[
                        "Aguardando Contrato"
                    ].clientes.push(cliente);
                    break;
                case 5:
                    colunasDinamicas[
                        "Venda Finalizada"
                    ].clientes.push(cliente);
                    break;
                case 6:
                    colunasDinamicas[
                        "Negados"
                    ].clientes.push(cliente);
                    break;
                case 7:
                    colunasDinamicas[
                        "Arquivados"
                    ].clientes.push(cliente);
                    break;
                case 8:
                    colunasDinamicas[
                        "Excluidos"
                    ].clientes.push(cliente);
                    break;
            }
        });
        return colunasDinamicas;
    };

    useEffect(() => {
        getCRMVendas().then((data) => {
            const colunas = construirColunasDinamicamente(data);
            setDadosPorColuna(colunas);
        }).catch((error) => {
            toast.error('Erro ao obter dados do CRM Vendas:' + error);
        });
    }, []);

    return (
        <div className="container-cobranca-escritorio">
            <div className="retorna-cobranca">
                <div className="button-retorn-cobran">
                    <div className="button-retorn3">
                        <ButtonIcon
                            funcao={handleCloseFormulario}
                            icon={<ArrowBackIosNewIcon fontSize={"small"} />}
                        />
                    </div>
                </div>
                <div className="crm-vendas-container">
                    <label>
                        <BallotIcon fontSize={"small"} />
                        CRM Vendas
                    </label>

                    <div className="button">
                        <ButtonText
                            title={"Criar Oportunidade"}
                            funcao={() => handleCadastroOportunidade()} />
                    </div>

                </div>
                <div className="filtro-cobrancaca-escritorio">
                    <div className="button-retorn2">
                        <div className="button-filtro">
                            <ButtonIcon
                                icon={<FilterAltIcon fontSize={"small"} />}
                                funcao={toggleModal}
                            />
                        </div>
                        <FiltroCRM
                            modalAberta={modalAberta}
                            toggleModal={toggleModal}
                            colunasDinamicas={colunasDinamicas}
                            colunasOcultas={colunasOcultas}
                            setColunasOcultas={setColunasOcultas} />
                    </div>

                </div>
            </div>
            <div className="informacoes-crm-vendas">
                {colunasOcultas ? (
                    Object.entries(dadosPorColuna)
                        .filter(([titulo, dados]) => titulo === "Arquivados" || titulo === "Excluidos")
                        .map(([titulo, dados], index) => (
                            <ColunasCobranca
                                key={index}
                                titulo={titulo}
                                dados={dados.clientes}
                                numeros={dados.clientes.length}
                                onCardClick={handleCardClick}
                                modalTransferencia={handleModalTransferencia}
                                modalArquivar={handleModalArquivar}
                            />
                        ))
                ) : (
                    Object.entries(dadosPorColuna)
                        .filter(([titulo, dados]) => titulo !== "Arquivados" && titulo !== "Excluidos")
                        .map(([titulo, dados], index) => (
                            <ColunasCobranca
                                key={index}
                                titulo={titulo}
                                dados={dados.clientes}
                                numeros={dados.clientes.length}
                                onCardClick={handleCardClick}
                                modalTransferencia={handleModalTransferencia}
                                modalArquivar={handleModalArquivar}
                            />
                        ))
                )}

                {modalClientes && selectedCardData && (
                    <Lead
                        open={modalClientes}
                        onClose={handleCloseLead}
                        clienteData={selectedCardData}
                        coluna={coluna}
                    />
                )}

                <ModalArquivar
                    open={modalArquivar}
                    onClose={handleCloseModalArquivar}
                    colunasDestino={colunasDinamicas} />


                <ModalTransferir
                    open={modalTransferencia}
                    onClose={handleModalCloseTransferencia}
                    colunasDestino={colunasDinamicas} />

                <ModalCadastro
                    open={modalOportunidade}
                    onClose={handleCloseModalOportunidade}
                    colunasDestino={colunasDinamicas} />

            </div>
        </div>
    );
};

export default CRMVendas;