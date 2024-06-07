import React, { useState } from "react";
import "./movimentacoes.css";
import HeaderFinanceiro from "../../components/header-financeiro";
import ContainerGeral from "../../components/container-geral";
import Square from "../../components/square";
import Input from "../../components/input";
import Lines from "../../components/lines";
import Title from "../../components/title";
import Checkboxes from "../../components/checkcbox";
import Select from "../../components/select";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import Table from "../../components/table";
import SubcontainerGeral from "../../components/subcontainer-geral";
import DeleteIcon from "@mui/icons-material/Delete";
import ArticleIcon from "@mui/icons-material/Article";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Carregando from "../../components/carregando";
import ImageComponent from "../../components/imagem-component";
import Imagem01 from "../../../assets/encontrar.png";

const columns = [
  { id: "name", label: "Tipo" },
  { id: "usuario", label: "Usuário" },
  { id: "ultmes", label: "Ult Mes Ref Pag", align: "start" },
  { id: "pagamento", label: "Ult Pagamento", align: "start" },
  { id: "contrato", label: "Contrato", align: "start" },
  { id: "caixa", label: "Caixa", align: "start" },
  { id: "conta", label: "Conta", align: "start" },
  { id: "valor", label: "Valor", align: "start" },
  { id: "opcoes", label: "Opções", align: "center" },
];

const initialRows = [
  {
    name: "Escritório",
    usuario: "Eduardo Costa",
    ultmes: "19/05/2023",
    pagamento: "20/05/2023",
    contrato: 123,
    caixa: 24,
    conta: 213,
    valor: "R$100",
  },
  {
    name: "Cobrador",
    usuario: "João Silva",
    ultmes: "18/05/2023",
    pagamento: "22/06/2023",
    contrato: 123,
    caixa: 24,
    conta: 213,
    valor: "R$100",
  },
  {
    name: "Vendas",
    usuario: "Maria Oliveira",
    ultmes: "15/05/2023",
    pagamento: "20/07/2023",
    contrato: 123,
    caixa: 24,
    conta: 213,
    valor: "R$100",
  },
  {
    name: "Boleto",
    usuario: "Carlos Pereira",
    ultmes: "21/05/2023",
    pagamento: "22/08/2023",
    contrato: 123,
    caixa: 24,
    conta: 213,
    valor: "R$100",
  },
];

const Movimentacoes = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
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

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const formatDateString = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleSearch = () => {
    setLoading(true);
    setShowTable(false);
    setTimeout(() => {
      let filtered = initialRows;

      
      // Filtrar por usuário, se um usuário estiver selecionado
      if (selectedUser) {
        filtered = filtered.filter(
          (row) => row.usuario.toLowerCase() === selectedUser.toLowerCase()
        );
      }

      // Filtrar por datas e tipos selecionados
      filtered = filtered.filter((row) => {
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

      // Atualizar o estado dos dados filtrados e do usuário selecionado
      setFilteredRows(filtered);
      setSelectedUser(selectedUser); // Atualizar o estado do usuário selecionado
      setLoading(false);
      setShowTable(true);
    }, 2000);
  };

  const userOptions = [
    "Eduardo Costa",
    "João Silva",
    "Maria Oliveira",
    "Carlos Pereira",
  ];

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
                              <div className="fundo-checkbox-movimentacoes">
                                <Checkboxes
                                  conteudo={"Escritório"}
                                  checked={selectedTypes.includes("Escritório")}
                                  onChange={() =>
                                    handleTypeChange("Escritório")
                                  }
                                />
                                <Checkboxes
                                  conteudo={"Boleto"}
                                  checked={selectedTypes.includes("Boleto")}
                                  onChange={() => handleTypeChange("Boleto")}
                                />
                                <Checkboxes
                                  conteudo={"Vendas"}
                                  checked={selectedTypes.includes("Vendas")}
                                  onChange={() => handleTypeChange("Vendas")}
                                />
                                <Checkboxes
                                  conteudo={"Cobrador"}
                                  checked={selectedTypes.includes("Cobrador")}
                                  onChange={() => handleTypeChange("Cobrador")}
                                />
                              </div>
                            </div>
                          </>
                        }
                      />
                      <Lines
                        conteudo={
                          <>
                            <Select
                              width={"30%"}
                              name={"Usuário"}
                              fontWeight={500}
                              options={userOptions}
                              onChange={handleUserChange}
                            />
                            <div className="checkbox-movi">
                              <Checkboxes
                                conteudo={"Filtrar por Ult. Mês Ref. Pg"}
                              />
                              <Checkboxes
                                conteudo={"Somente Baixas sem Acertar"}
                              />
                            </div>
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
                  <>
                    <Table
                      data={filteredRows}
                      columns={columns}
                      renderCell={(rowData, column) => {
                        if (column.id === "opcoes") {
                          return (
                            <div className="icones-tabela">
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
                                  backgroundColor: "#c60000",
                                  color: "#ffff",
                                }}
                              >
                                <DeleteIcon fontSize={"small"} />
                              </IconButton>
                            </div>
                          );
                        }
                        return rowData[column.id];
                      }}
                    />
                  </>
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
                        <Title
                          conteudo={"Nenhuma movimentação encontrada!"}
                          fontSize={"15px"}
                          color={"#FF624A"}
                          fontWeight={"800"}
                        />
                      </>
                    }
                  ></Square>
                )}
              </>
            }
          />
        </>
      }
    />
  );
};

export default Movimentacoes;
