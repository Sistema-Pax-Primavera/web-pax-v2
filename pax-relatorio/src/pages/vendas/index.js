import React, { useEffect, useState } from "react";
import "./vendas.css";
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
import { headerVenda } from "../../entities/headers/header-venda";
import { useRelatorio } from "../../services/api";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { headerVendaDetalhado } from "../../entities/headers/header-venda-detalhe";

const Vendas = () => {
    const { getVendas } = useRelatorio();
    const [relatorio, setRelatorio] = useState([]);
    const [relatorioDetalhe, setRelatorioDetalhe] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedUnidade, setSelectedUnidade] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [loading, setLoading] = useState(false);
    const [detalhar, setDetalhar] = useState(false);

    const handleDownload = () => {
        const dadosFiltrados = [];
        const unidades = {};

        relatorio.forEach(item => {
            if (!unidades[item.unidade]) {
                unidades[item.unidade] = {
                    total: 0,
                    vendas: {
                        "Vendas": 0,
                        "Adesão": 0,
                        "Primeira Parcela": 0,
                        "Segunda Parcela": 0,
                        "Terceira Parcela": 0,
                        "Valor Adesão": 0,
                        "Confirmados": 0,
                        "Não Confirmados": 0,
                    }
                };
            }
            unidades[item.unidade].total++;
            // Atualizando os totais das vendas
            Object.keys(unidades[item.unidade].vendas).forEach(venda => {
                if (venda === "Valor Adesão") {
                    unidades[item.unidade].vendas[venda] += parseFloat((item.valor_adesao || "0").replace(/\./g, '').replace(',', '.'));
                } else {
                    unidades[item.unidade].vendas[venda] += item[venda] || 0;
                }
            });
        });

        // Adicionando os detalhes por unidade e o total ao array dadosFiltrados
        Object.entries(unidades).forEach(([unidade, { total, vendas }]) => {
            const totalVendasUnidade = {
                "Vendas": 0,
                "Adesão": 0,
                "Primeira Parcela": 0,
                "Segunda Parcela": 0,
                "Terceira Parcela": 0,
                "Valor Adesão": 0,
                "Confirmados": 0,
                "Não Confirmados": 0,
            };

            // Adicionando os detalhes por unidade
            relatorio.filter(item => item.unidade === unidade).forEach(detalhe => {
                const valorAdesaoFormatado = parseFloat((detalhe.valor_adesao || "0").replace(/\./g, '').replace(',', '.')).toFixed(2).replace('.', ',');
                const vendasDetalhe = {
                    "Vendas": detalhe.quantidade || 0,
                    "Adesão": detalhe.adesao || 0,
                    "Primeira Parcela": detalhe.primeiro_mes || 0,
                    "Segunda Parcela": detalhe.segundo_mes || 0,
                    "Terceira Parcela": detalhe.terceiro_mes || 0,
                    "Valor Adesão": valorAdesaoFormatado,
                    "Confirmados": detalhe.confirmados || 0,
                    "Não Confirmados": detalhe.nao_confirmados || 0
                };

                Object.keys(vendasDetalhe).forEach(venda => {
                    if (venda !== "Valor Adesão") {
                        totalVendasUnidade[venda] += vendasDetalhe[venda];
                    } else {
                        totalVendasUnidade[venda] += parseFloat((detalhe.valor_adesao || "0").replace(/\./g, '').replace(',', '.'));
                    }
                });

                dadosFiltrados.push({
                    "Unidade": unidade,
                    "Plano": detalhe.nome_plano,
                    "Vendedor": detalhe.vendedor,
                    ...vendasDetalhe,
                    // "Total": detalhe.total
                });
            });

            // Adicionando o total da unidade ao final dos detalhes da unidade
            dadosFiltrados.push({
                "Unidade": "Total",
                "Plano": "",
                "Vendas": totalVendasUnidade["Vendas"],
                "Adesão": totalVendasUnidade["Adesão"],
                "Primeira Parcela": totalVendasUnidade["Primeira Parcela"],
                "Segunda Parcela": totalVendasUnidade["Segunda Parcela"],
                "Terceira Parcela": totalVendasUnidade["Terceira Parcela"],
                "Valor Adesão": totalVendasUnidade["Valor Adesão"].toFixed(2).replace('.', ','),
                "Confirmados": totalVendasUnidade["Confirmados"],
                "Não Confirmados": totalVendasUnidade["Não Confirmados"],
                // "Total": total
            });
        });

        const ws = XLSX.utils.json_to_sheet(dadosFiltrados);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Relatório de Vendas");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(data, 'relatorio_vendas.xlsx');
    };

    const handleDetalhar = () => {
        setDetalhar(!detalhar);
    };

    const handleOptionsChange = (event) => {
        setSelectedOption(event.target.value);
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

    const options = [
        "Plano",
        "Vendedores",
    ];

    const mapearRelatorioDetalhado = (vendas) => {
        const detalheMapeado = [];
        vendas.forEach((venda) => {
            venda.contratos.forEach((contrato, index) => {
                detalheMapeado.push({
                    key: `${venda.id}-${index}`,
                    unidade: venda.unidade,
                    n_contrato: contrato.contrato,
                    nome: contrato.nome,
                    cidade: contrato.cidade,
                    bairro: contrato.bairro,
                    regiao: contrato.regiao,
                    data_contrato: contrato.data_contrato,
                    primeira_parcela: contrato.primeira_parcela,
                    segunda_parcela: contrato.segunda_parcela,
                    terceira_parcela: contrato.terceira_parcela,
                    quarta_parcela: contrato.quarta_parcela,
                    vendedor: venda.vendedor,
                    cobrador: contrato.cobrador,
                    dia_pagamento: contrato.dia_pagamento,
                    nome_plano: venda.nome_plano,
                    data_nascimento: contrato.data_nascimento,
                    sexo: contrato.sexo,
                });
            });
        });
        return detalheMapeado;
    };

    useEffect(() => {
        getVendas().then((data) => {
            setRelatorio(data);
            const detalheMapeado = mapearRelatorioDetalhado(data);
            setRelatorioDetalhe(detalheMapeado);
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
                                    width={"85%"}
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
                                                            width={"15%"}
                                                            name={"Tipo"}
                                                            fontWeight={500}
                                                            options={options}
                                                            onChange={handleOptionsChange}
                                                        />
                                                        <Select
                                                            width={"15%"}
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
                                        headers={headerVendaDetalhado}
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
                                        headers={headerVenda}
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

export default Vendas;
