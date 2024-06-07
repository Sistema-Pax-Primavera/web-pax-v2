import React, { useState, useEffect } from "react";
import "./mensagens-cobrador.css";
import HeaderCobranca from "../../components/header-cobranca";
import ContainerGeral from "../../components/container-geral";
import Input from "../../components/input";
import Square from "../../components/square";
import Lines from "../../components/lines";
import Select from "../../components/select";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import SubcontainerGeral from "../../components/subcontainer-geral";
import SearchIcon from "@mui/icons-material/Search";
import TableComponent from "../../components/table/table";
import { headerScript } from "../../entities/headers/header-script";
import { useCobranca } from "../../service/api";

const ScriptCobs = () => {
    const { getScript } = useCobranca();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [scripts, setScripts] = useState([]);
    const [selectedCobrador, setSelectedCobrador] = useState(null);
    const [selectedUnidade, setSelectedUnidade] = useState(null);

    const handleUnidadeChange = (event) => {
        setSelectedUnidade(event.target.value);
    };
    const handleCobradorChange = (event) => {
        setSelectedCobrador(event.target.value);
    };
    const handleSearch = () => {
        setLoading(true);

    };

    const unidadeOptions = [
        "Dourados",
        "Itaporã",
    ];

    const cobradorOptions = [
        "COB.AIRTON",
        "COB.ANTONIO",
    ];

    useEffect(() => {
        getScript().then((data) => {
            setScripts(data)
        });
    }, []);

    return (
        <ContainerGeral
            conteudo={
                <>
                    <HeaderCobranca />

                    <SubcontainerGeral
                        conteudo={
                            <>
                                <Square
                                    width={"65%"}
                                    backgroundColor={"var(--cinza-leve)"}
                                    padding={"10px"}
                                    flexDirection={"column"}
                                    borderRadius={"5px"}
                                    gap={"5px"}
                                    conteudo={
                                        <>
                                            <Lines
                                                conteudo={
                                                    <>
                                                        <Input
                                                            width={"15%"}
                                                            type="date"
                                                            label="Período Inicial"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                        />
                                                        <Input
                                                            width={"15%"}
                                                            type="date"
                                                            label="Período Final"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                        />
                                                        <Select
                                                            width={"20%"}
                                                            name={"Unidade"}
                                                            fontWeight={500}
                                                            options={unidadeOptions}
                                                            onChange={handleUnidadeChange}
                                                        />
                                                        <Select
                                                            width={"20%"}
                                                            name={"Cobrador"}
                                                            fontWeight={500}
                                                            options={cobradorOptions}
                                                            onChange={handleCobradorChange}
                                                        />
                                                        <ButtonIconTextoStart
                                                            fontSizeBotao={"10px"}
                                                            icon={<SearchIcon fontSize={"small"} />}
                                                            width={"1%"}
                                                            marginTop={"13px"}
                                                            fontWeightBotao={700}
                                                            corFundoBotao={"#006B33"}
                                                            corTextoBotao={"#ffff"}
                                                            funcao={handleSearch}
                                                        />
                                                    </>
                                                }
                                            />
                                        </>
                                    }
                                />

                                <TableComponent
                                    headers={headerScript}
                                    rows={scripts}
                                    actionsLabel={["Ações", "Acciones"]}
                                    actionCalls={{
                                        //delete: (e) => console.log(e),
                                        //edit: (e) => handleEditDependente(e),
                                        //view: (e) => handleOpenButtonClick(e),
                                        //promote: (e) => console.log('promover'),
                                    }} />
                            </>
                        }
                    />
                </>
            }
        />
    );
};

export default ScriptCobs;
