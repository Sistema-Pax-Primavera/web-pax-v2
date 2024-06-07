import React, { useState } from "react";
import "./baixas.css";
import HeaderFinanceiro from "../../components/header-financeiro";
import ContainerGeral from "../../components/container-geral";
import Square from "../../components/square";
import Input from "../../components/input";
import Lines from "../../components/lines";
import Title from "../../components/title";
import Checkboxes from "../../components/checkcbox";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import Table from "../../components/table";
import SubcontainerGeral from "../../components/subcontainer-geral";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import IconButton from "@mui/material/IconButton";
import Carregando from "../../components/carregando";
import Imagem01 from "../../../assets/encontrar.png";
import ImageComponent from "../../components/imagem-component";

const columns = [
  { id: "name", label: "Tipo" },
  { id: "planoconta", label: "Plano Conta", align: "start" },
  { id: "data", label: "Data", align: "start" },
  { id: "conta", label: "Conta", align: "start" },
  { id: "valor", label: "Valor", align: "start" },
  { id: "opcoes", label: "Opções", align: "center" },
];

const initialRows = [
  {
    name: "Depesas",
    planoconta: "123",
    data: "22/06/2023",
    conta: 2423,
    valor: "R$100",
  },
  {
    name: "Entradas",
    planoconta: "12332",
    data: "24/06/2023",
    conta: 7523,
    valor: "R$100",
  },
  {
    name: "Transferência",
    planoconta: "2332",
    data: "25/06/2023",
    conta: 7523,
    valor: "R$150",
  },
];

const Baixas = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filteredRows, setFilteredRows] = useState(initialRows);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(true);

  const handleTypeChange = (type) => {
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(type)
        ? prevSelectedTypes.filter((t) => t !== type)
        : [...prevSelectedTypes, type]
    );
  };

  const formatDateString = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    setLoading(true);
    setShowTable(false);
    setTimeout(() => {
      const filtered = initialRows.filter((row) => {
        const rowDate = new Date(formatDateString(row.ultmes));
        const startDateFilter = startDate ? new Date(startDate) : null;
        const endDateFilter = endDate ? new Date(endDate) : null;

        const dateMatch =
          (!startDateFilter || rowDate >= startDateFilter) &&
          (!endDateFilter || rowDate <= endDateFilter);

        const typeMatch =
          selectedTypes.length === 0 || selectedTypes.includes(row.name);

        return dateMatch && typeMatch;
      });
      setFilteredRows(filtered);
      setLoading(false);
      setShowTable(true);
    }, 2000);
  };

  return (
    <ContainerGeral
      conteudo={
        <>
          <HeaderFinanceiro />

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

                            <div>
                              <Title
                                fontSize="12px"
                                fontWeight="500"
                                conteudo={"Tipo Baixa"}
                              />
                              <div className="fundo-checkbox-baixas">
                                <Checkboxes
                                  conteudo={"Despesas"}
                                  checked={selectedTypes.includes("Despesas")}
                                  onChange={() => handleTypeChange("Despesas")}
                                />
                                <Checkboxes
                                  conteudo={"Entradas"}
                                  checked={selectedTypes.includes("Entradas")}
                                  onChange={() => handleTypeChange("Entradas")}
                                />
                                <Checkboxes
                                  conteudo={"Transferência"}
                                  checked={selectedTypes.includes(
                                    "Transferência"
                                  )}
                                  onChange={() =>
                                    handleTypeChange("Transferência")
                                  }
                                />
                              </div>
                            </div>
                            <ButtonIconTextoStart
                              fontSizeBotao={"10px"}
                              title={"PESQUISAR"}
                              width={"15%"}
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
                {loading && (
                  <Square
                    width={"75%"}
                    height={"300px"}
                    padding={"10px"}
                    alignItens={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    conteudo={<Carregando />}
                  ></Square>
                )}
                  
                  {showTable && !loading && filteredRows.length > 0 && (
                  <Table
                    data={filteredRows}
                    columns={columns}
                    renderCell={(rowData, column) => {
                      if (column.id === "opcoes") {
                        return (
                          <div className="icones-tabela-baixas">
                            <IconButton
                              style={{
                                backgroundColor: "#006B33",
                                color: "#ffff",
                              }}
                            >
                              <ArticleIcon fontSize={"small"} />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              style={{
                                backgroundColor: "#FF0000",
                                color: "#ffff",
                              }}
                            >
                              <DeleteIcon fontSize={"small"} />
                            </IconButton>
                          </div>
                        );
                      } else {
                        return rowData[column.id];
                      }
                    }}
                  />
                )}
                 {!loading && showTable && filteredRows.length === 0 && (
                  <Square
                    width={"75%"}
                    height={"300px"}
                    padding={"10px"}
                    display={"flex"}
                    alignItens={"center"}
                    justifyContent={"center"}
                    flexDirection={"column"}
                    conteudo={
                      <>
                      
                        <ImageComponent
                          src={Imagem01}
                          width={"50%"}
                          display={"flex"}
                          alignItens={"center"}
                          justifyContent={"center"}
                        />
                        <Title conteudo={'Nenhuma baixa encontrada!'} fontSize={'15px'} color={'#FF624A'} fontWeight={'800'}/>
                      </>
                    }
                  ></Square>
                )}
              </>
            }
          ></SubcontainerGeral>
        </>
      }
    />
  );
};


export default Baixas;
