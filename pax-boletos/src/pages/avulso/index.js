import React, { useState } from "react";
import "./avulso.css";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Carregando from "../../components/carregando";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import Switch from "@mui/material/Switch";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ModalAvulso from "../../components/modal-avulso";
import HeaderBoletos from "../../components/header";
const label = { inputProps: { "aria-label": "Switch demo" } };

function createData(name, mes, codboleto, valor, vencimento) {
  return { name, mes, codboleto, valor, vencimento };
}

const rows = [
  createData("01", "Janeiro", "132456", "100,00", "20/01/2024"),
  createData("02", "Fevereiro", "789456", "100,00", "20/02/2024"),
  createData("03", "Março", "213564", "100,00", "20/03/2024"),
  createData("04", "Abril", "978513", "100,00", "20/04/2024"),
];

const Avulso = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [parcelasSelecionadas, setParcelasSelecionadas] = useState(0);
  const [loading, setLoading] = useState(false);
  const [valorTotal, setValorTotal] = useState(0);
  const [finalizado, setFinalizado] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [rowsState, setRows] = useState(rows);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const handleRowClick = (name) => {
    let newSelectedRows = [...selectedRows];
    if (selectedRows.includes(name)) {
      newSelectedRows = newSelectedRows.filter((row) => row !== name);
    } else {
      newSelectedRows.push(name);
    }
    setSelectedRows(newSelectedRows);
    setParcelasSelecionadas(newSelectedRows.length);
    calculateTotal(newSelectedRows);
  };

  const calculateTotal = (selectedRows) => {
    const total = selectedRows.reduce((acc, row) => {
      const selectedRow = rowsState.find((r) => r.name === row);
      if (selectedRow && selectedRow.valor) {
        return acc + parseFloat(selectedRow.valor.replace(",", "."));
      } else {
        return acc;
      }
    }, 0);
    setValorTotal(total.toFixed(2));
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
      setParcelasSelecionadas(0);
      setValorTotal(0);
    } else {
      const allRowsNames = rowsState.map((row) => row.name);
      setSelectedRows(allRowsNames);
      setParcelasSelecionadas(allRowsNames.length);
      calculateTotal(allRowsNames);
    }
    setSelectAll(!selectAll);
  };

  const handleFinalizar = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFinalizado(true);
    }, 3000);
  };

  const handleValueChange = (event, name) => {
    const newValue = event.target.value;
    const newRows = rowsState.map((row) => {
      if (row.name === name) {
        return { ...row, valor: newValue };
      }
      return row;
    });
    setRows(newRows);
    calculateTotal(selectedRows);
  };

  const handleVencimentoChange = (event, name) => {
    const newVencimento = event.target.value;
    const newRows = rowsState.map((row) => {
      if (row.name === name) {
        return { ...row, vencimento: newVencimento };
      }
      return row;
    });
    setRows(newRows);
  };

  return (
    <div className="avuls-confirma">
      <div className="container-avulso-boletos">
        <HeaderBoletos />
        <div className="container-avulso">
          <div className="container-avulso2">
            <div className="linhas-campo-avulso">
              <div className="campos-avulso01">
                <label>Contrato</label>
                <input type="number"></input>
              </div>
              <div className="campos-avulso01">
                <label>CEP</label>
                <input type="number"></input>
              </div>
              <div className="campos-avulso01-buttao">
                <ButtonIconTextoStart
                  title={"BUSCAR"}
                  corFundoBotao={"#006b33"}
                  fontSizeBotao={'10px'}
                  corTextoBotao={"#ffff"}
                  fontWeightBotao={700}
                />
              </div>
            </div>
            <div className="linhas-campo-avulso">
              <div className="campos-avulso03">
                <label>Parcelas Selecionadas: </label>
                <p>{parcelasSelecionadas}</p>
              </div>
              <div className="campos-avulso03">
                <label>Valor Total: </label>
                <p>{valorTotal}</p>
              </div>
              <div className="campos-avulso01-buttao">
                <Switch checked={selectAll} onChange={toggleSelectAll} />
                <label>Selecionar Todas</label>
              </div>
              <div className="campos-avulso01-buttao">
                <ButtonIconTextoStart
                  title={"FINALIZAR"}
                  fontSizeBotao={'10px'}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                  fontWeightBotao={700}
                  funcao={handleFinalizar}
                />
              </div>
            </div>
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Parcela</TableCell>
                    <TableCell align="start">Mês</TableCell>
                    <TableCell align="start">Cod. Boleto</TableCell>
                    <TableCell align="start" style={{ width: "20px" }}>
                      Valor
                    </TableCell>
                    <TableCell align="center">Vencimento</TableCell>
                    <TableCell align="left">Opções</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsState.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        backgroundColor: selectedRows.includes(row.name)
                          ? "#006b33"
                          : "inherit",
                        color: selectedRows.includes(row.name)
                          ? "#fff"
                          : "inherit",
                      }}
                      onClick={() => handleRowClick(row.name)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          color: selectedRows.includes(row.name)
                            ? "#fff"
                            : "inherit",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        align="start"
                        style={{
                          color: selectedRows.includes(row.name)
                            ? "#fff"
                            : "inherit",
                        }}
                      >
                        {row.mes}
                      </TableCell>
                      <TableCell
                        align="start"
                        style={{
                          color: selectedRows.includes(row.name)
                            ? "#fff"
                            : "inherit",
                        }}
                      >
                        {row.codboleto}
                      </TableCell>

                      <TableCell
                        align="start"
                        style={{
                          color: selectedRows.includes(row.name)
                            ? "#fff"
                            : "inherit",
                        }}
                      >
                        <div className="valor-avulso">
                          <input
                            type="text"
                            value={row.valor}
                            onChange={(event) =>
                              handleValueChange(event, row.name)
                            }
                            onClick={(event) => event.stopPropagation()}
                          />
                        </div>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: selectedRows.includes(row.name)
                            ? "#fff"
                            : "inherit",
                        }}
                      >
                        <div className="vencimento-avulso">
                          <input
                            type="text"
                            value={row.vencimento}
                            onChange={(event) =>
                              handleVencimentoChange(event, row.name)
                            }
                            onClick={(event) => event.stopPropagation()}
                          />
                        </div>
                      </TableCell>
                      <TableCell
                        align="start"
                        style={{
                          color: selectedRows.includes(row.name)
                            ? "#fff"
                            : "inherit",
                        }}
                      >
                        <div className="campos-avulso01-buttao">
                          <ButtonIconTextoStart
                            icon={<DashboardIcon fontSize={"small"} />}
                            corFundoBotao={"#006b33"}
                            fontSizeBotao={'10px'}
                            corTextoBotao={"#ffff"}
                            fontWeightBotao={700}
                            funcao={abrirModal}
                          />
                          <ModalAvulso
                            openModal={modalAberto}
                            onCloseModal={fecharModal}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        {loading && (
          <div className="overlay">
            <Carregando />
          </div>
        )}
        {finalizado && (
          <div className="botao-baixa-bole">
            <label>Boleto gerado com sucesso! </label>
            <div>
              <ButtonIconTextoStart
                icon={<CloudDownloadOutlinedIcon />}
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
                fontWeightBotao={800}
              />
            </div>
            <div>
              <ButtonIconTextoStart
                title={"COPIE O CÓDIGO DE BARRAS"}
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
                fontWeightBotao={700}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Avulso;
