import React, { useEffect, useState } from "react";
import "./cobranca.css";
import HeaderRelatorio from "../../components/header-relatorio";
import ContainerGeral from "../../components/container-geral";
import Square from "../../components/square";
import Input from "../../components/input";
import Lines from "../../components/lines";
import Select from "../../components/select";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import SubcontainerGeral from "../../components/subcontainer-geral";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from "@mui/icons-material/Search";
import TableComponent from "../../components/table/table";
import { headerCobranca } from "../../entities/headers/header-cobranca";
import { useRelatorio } from "../../services/api";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import MultiSelect from "../../components/multi-select";

const Cobranca = () => {
    const { getCobranca } = useRelatorio();
    const [relatorio, setRelatorio] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedUnidade, setSelectedUnidade] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        const dadosFiltrados = relatorio.map(item => ({
            "Unidade": item.unidade,
            "Cobrador": item.cobrador,
            "Inicio Cobrança": item.inicio_cobranca,
            "Inclusão": item.inclusao,
            "Retirado": item.retirado,
            "Total Borderô": item.total_bordero,
            "Recebido Borderô": item.recebido_bordero,
            "Recebimento": item.recebimento,
            "Adiantados": item.adiantados,
            "Total Recebido": item.total_recebido
        }));
        const ws = XLSX.utils.json_to_sheet(dadosFiltrados);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Relatório de Cobrança");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'relatorio_cobranca.xlsx');
    };


    const handleUnidadeChange = (event) => {
        setSelectedUnidade(event.target.value);
    };

    const handleSearch = () => {
        setLoading(true);

    };

    const unidadeOptions = [
        "Dourados",
        "Itapora",
        "Ponta Pora",
        "Navirai",
        "Juti",
        "Bela Vista",
    ];

    useEffect(() => {
        getCobranca().then((data) => {
            setRelatorio(data);
        });
    }, []);

    return (
        <ContainerGeral
            conteudo={
                <>
                    <HeaderRelatorio />

                    <SubcontainerGeral
                        conteudo={
                            <>
                                <Square
                                    width={"100%"}
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
                                                        <ButtonIconTextoStart
                                                            fontSizeBotao={"10px"}
                                                            icon={<SearchIcon fontSize={"small"} />}
                                                            width={"10%"}
                                                            marginTop={"13px"}
                                                            fontWeightBotao={700}
                                                            corFundoBotao={"#006B33"}
                                                            corTextoBotao={"#ffff"}
                                                            funcao={handleSearch}
                                                        />
                                                        <ButtonIconTextoStart
                                                            fontSizeBotao={"10px"}
                                                            icon={<FileDownloadIcon fontSize={"small"} />}
                                                            width={"10%"}
                                                            marginTop={"13px"}
                                                            fontWeightBotao={700}
                                                            corFundoBotao={"#006B33"}
                                                            corTextoBotao={"#ffff"}
                                                            funcao={handleDownload}
                                                        />
                                                    </>
                                                }
                                            />
                                        </>
                                    }
                                />

                                <TableComponent
                                    headers={headerCobranca}
                                    rows={relatorio}
                                    actionsLabel={["Ações", "Acciones"]}
                                    actionCalls={{
                                        //delete: (e) => console.log(e),
                                        //edit: (e) => handleEdit(e),
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

export default Cobranca;
