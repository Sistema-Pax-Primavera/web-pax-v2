import React, { useEffect, useState } from "react";
import "./obito.css";
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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { headerObito } from "../../entities/headers/header-obito";
import { headerObitoDetalhado } from "../../entities/headers/header-obito-detalhe";

const Obito = () => {
    const { getObito } = useRelatorio();
    const [relatorio, setRelatorio] = useState([]);
    const [relatorioDetalhe, setRelatorioDetalhes] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedUnidade, setSelectedUnidade] = useState("");
    const [loading, setLoading] = useState(false);
    const [detalhar, setDetalhar] = useState(false);


    const handleDownload = () => {
        const dadosFiltrados = [];
        const unidades = {};

        // Agrupando os óbitos por unidade
        relatorioDetalhe.forEach(item => {
            if (!unidades[item.unidade]) {
                unidades[item.unidade] = { total: 0, detalhes: [] };
            }
            unidades[item.unidade].detalhes.push(item);
            unidades[item.unidade].total++;
        });

        // Adicionando os detalhes por unidade e o total ao array dadosFiltrados
        Object.entries(unidades).forEach(([unidade, { total, detalhes }]) => {
            detalhes.forEach(detalhe => {
                dadosFiltrados.push({
                    "Unidade": unidade,
                    "Plano": detalhe.plano_nome,
                    "Data Contrato": detalhe.data_contrato,
                    "Contrato": detalhe.contrato,
                    "Tipo": detalhe.is_titular,
                    "Data Falecimento": detalhe.data_falecimento,
                    "Nome": detalhe.nome,
                    "Status": detalhe.status
                });
            });

            // Adicionando o total da unidade ao final dos detalhes da unidade
            dadosFiltrados.push({
                "Unidade": "Total",
                "Plano": total,
                "Data Contrato": "",
                "Contrato": "",
                "Tipo": "",
                "Data Falecimento": "",
                "Nome": "",
                "Status": ""
            });
        });

        // Gerando o arquivo Excel
        const ws = XLSX.utils.json_to_sheet(dadosFiltrados);

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Relatório de Obito");

        // Convertendo e salvando o arquivo
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'relatorio_obito.xlsx');
    };

    const handleUnidadeChange = (event) => {
        setSelectedUnidade(event.target.value);
    };

    const handleDetalhar = () => {
        setDetalhar(!detalhar);
    };

    const handleSearch = () => {
        setLoading(true);

    };

    const unidadeOptions = [
        "Dourados",
        "Itaporã",
    ];

    useEffect(() => {
        getObito().then((data) => {
            setRelatorioDetalhes(data)
            const planosUnicos = [...new Set(data.map(item => item.plano_nome))];
            const relatorio = planosUnicos.map(plano => {
                const detalhesPlano = data.filter(item => item.plano_nome === plano);
                const totalObitos = detalhesPlano.length;

                const titulares = detalhesPlano.filter(detail => detail.is_titular === 'Titular').length;
                const dependentes = totalObitos - titulares;

                return {
                    plano_nome: plano,
                    titular: titulares,
                    dependente: dependentes,
                    total_obitos: totalObitos,
                };
            });
            setRelatorio(relatorio)
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
                                                        <ButtonIconTextoStart
                                                            title={detalhar ? "Resumo" : "Detalhar"}
                                                            fontSizeBotao={"10px"}
                                                            width={"15%"}
                                                            marginTop={"13px"}
                                                            fontWeightBotao={700}
                                                            corFundoBotao={"#006B33"}
                                                            corTextoBotao={"#ffff"}
                                                            funcao={handleDetalhar}
                                                        />
                                                    </>
                                                }
                                            />
                                        </>
                                    }
                                />
                                {detalhar ?
                                    <TableComponent
                                        headers={headerObitoDetalhado}
                                        rows={relatorioDetalhe}
                                        actionsLabel={["Ações", "Acciones"]}
                                        actionCalls={{
                                            //delete: (e) => console.log(e),
                                            //edit: (e) => handleEditDependente(e),
                                            //view: (e) => handleOpenButtonClick(e),
                                            //promote: (e) => console.log('promover'),
                                        }} />
                                    :
                                    <TableComponent
                                        headers={headerObito}
                                        rows={relatorio}
                                        actionsLabel={["Ações", "Acciones"]}
                                        actionCalls={{
                                            //delete: (e) => console.log(e),
                                            //edit: (e) => handleEditDependente(e),
                                            //view: (e) => handleOpenButtonClick(e),
                                            //promote: (e) => console.log('promover'),
                                        }} />
                                }
                            </>
                        }
                    />
                </>
            }
        />
    );
};

export default Obito;
