import React, { useEffect, useState } from "react";
import "./ranking.css";
import HeaderRelatorio from "../../components/header-relatorio";
import ContainerGeral from "../../components/container-geral";
import Square from "../../components/square";
import Input from "../../components/input";
import Lines from "../../components/lines";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Select from "../../components/select";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import SubcontainerGeral from "../../components/subcontainer-geral";
import SearchIcon from "@mui/icons-material/Search";
import TableComponent from "../../components/table/table";
import { useRelatorio } from "../../services/api";
import { headerRanking } from "../../entities/headers/header-ranking";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Ranking = () => {
    const { getRanking } = useRelatorio();
    const [relatorio, setRelatorio] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedUnidade, setSelectedUnidade] = useState("");
    const [loading, setLoading] = useState(false);
    const [showTable, setShowTable] = useState(true);

    const handleDownload = () => {
        const dadosFiltrados = relatorio.map(item => ({
            "Unidade": item.unidade,
            "Periodo": item.data,
            "Cobrador": item.cobrador,
            "1 Parcela": item.parcela1,
            "2 Parcela": item.parcela2,
            "3 Parcela": item.parcela3,
            "Adiantados": item.adiantados,
            "Geral": item.geral,

        }));
        const ws = XLSX.utils.json_to_sheet(dadosFiltrados);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Relatório de Ranking");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'relatorio_ranking.xlsx');
    };

    const handleUnidadeChange = (event) => {
        setSelectedUnidade(event.target.value);
    };

    const handleSearch = () => {
        setLoading(true);

    };

    const unidadeOptions = [
        "Dourados",
        "Itaporã",
    ];

    useEffect(() => {
        getRanking().then((data) => {
            const relatorio = data.map(item => {
                return {
                    unidade: item.unidade,
                    data: item.data_inicio + " - " + item.data_final,
                    cobrador: item.cobrador,
                    parcela1: item.parcela1,
                    parcela2: item.parcela2,
                    parcela3: item.parcela3,
                    adiantados: item.adiantados,
                    geral: item.geral,
                };
            });
            setRelatorio(relatorio);
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
                                    width={"75%"}
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
                                                            label="1º Período Inicial"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                        />
                                                        <Input
                                                            width={"15%"}
                                                            type="date"
                                                            label="1º Período Final"
                                                            value={endDate}
                                                            onChange={(e) => setEndDate(e.target.value)}
                                                        />
                                                    </>
                                                }
                                            />
                                            <Lines
                                                conteudo={
                                                    <>
                                                        <Input
                                                            width={"15%"}
                                                            type="date"
                                                            label="2º Período Inicial"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                        />
                                                        <Input
                                                            width={"15%"}
                                                            type="date"
                                                            label="2º Período Final"
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
                                    headers={headerRanking}
                                    rows={relatorio}
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

export default Ranking;
