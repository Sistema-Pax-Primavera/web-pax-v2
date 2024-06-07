import React, { useEffect, useState } from "react";
import "./cancelamento.css";
import HeaderRelatorio from "../../components/header-relatorio";
import ContainerGeral from "../../components/container-geral";
import Square from "../../components/square";
import Input from "../../components/input";
import Lines from "../../components/lines";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import SubcontainerGeral from "../../components/subcontainer-geral";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from "@mui/icons-material/Search";
import TableComponent from "../../components/table/table";
import { useRelatorio } from "../../services/api";
import { headerCancelamento } from "../../entities/headers/header-cancelamento";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Select from "../../components/select";

const Cancelamento = () => {
    const { getCancelamento } = useRelatorio();
    const [relatorio, setRelatorio] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedUnidade, setSelectedUnidade] = useState("");
    const [loading, setLoading] = useState(false);
    const [showTable, setShowTable] = useState(true);

    const handleDownload = () => {
        const dadosFiltrados = [];
        const unidades = {};

        // Agrupando os dados por unidade
        relatorio.forEach(item => {
            if (!unidades[item.unidade]) {
                unidades[item.unidade] = { total: 0, parcelas: { "0 a 0": 0, "1 a 1": 0, "2 a 3": 0, "4 a 5": 0, "Acima de 6": 0 } };
            }
            unidades[item.unidade].total++;
            // Atualizando os totais das parcelas
            Object.keys(unidades[item.unidade].parcelas).forEach(parcela => {
                unidades[item.unidade].parcelas[parcela] += item[parcela] || 0;
            });
        });

        // Adicionando os detalhes por unidade e o total ao array dadosFiltrados
        Object.entries(unidades).forEach(([unidade, { total, parcelas }]) => {
            const totalParcelasUnidade = { "0 a 0": 0, "1 a 1": 0, "2 a 3": 0, "4 a 5": 0, "Acima de 6": 0 };
            // Adicionando os detalhes por unidade
            relatorio.filter(item => item.unidade === unidade).forEach(detalhe => {
                const parcelasDetalhe = {
                    "0 a 0": detalhe.nenhuma_parcela || 0,
                    "1 a 1": detalhe.uma_parcela || 0,
                    "2 a 3": detalhe.duas_tres_parcela || 0,
                    "4 a 5": detalhe.quatro_cinco_parcela || 0,
                    "Acima de 6": detalhe.seis_parcela || 0
                };

                Object.keys(parcelasDetalhe).forEach(parcela => {
                    totalParcelasUnidade[parcela] += parcelasDetalhe[parcela];
                });

                dadosFiltrados.push({
                    "Unidade": unidade,
                    "Plano": detalhe.plano_nome,
                    ...parcelasDetalhe,
                    "Total": detalhe.total
                });
            });

            // Adicionando o total da unidade ao final dos detalhes da unidade
            dadosFiltrados.push({
                "Unidade": "Total",
                "Plano": "",
                ...totalParcelasUnidade,
                "Total": total
            });
        });

        // Gerando o arquivo Excel
        const ws = XLSX.utils.json_to_sheet(dadosFiltrados);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Relatório de Cancelamento");

        // Convertendo e salvando o arquivo
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'relatorio_cancelamento.xlsx');
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
        getCancelamento().then((data) => {
            const novoRelatorio = data.flatMap(item =>
                item.unidade.planos.map(plano => ({
                    unidade: item.unidade.unidade,
                    plano_nome: plano.plano_nome,
                    nenhuma_parcela: plano?.nenhuma_parcela,
                    uma_parcela: plano?.uma_parcela,
                    duas_tres_parcela: plano?.duas_tres_parcela,
                    quatro_cinco_parcela: plano?.quatro_cinco_parcela,
                    seis_parcela: plano?.seis_parcela,
                    total: plano.total,
                }))
            );
            setRelatorio(novoRelatorio);
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
                                    headers={headerCancelamento}
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

export default Cancelamento;
