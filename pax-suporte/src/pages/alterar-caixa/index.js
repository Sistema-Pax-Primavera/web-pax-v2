import React, { useState } from "react";
import "./alterar-caixa.css";
import HeaderSuporte from "../../components/header-suporte";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSuporte } from "../../services/api";
import { headerAltCaixa } from "../../entities/headers/header-alt-caixa";
import TableComponent from "../../components/table/table";
import { toast } from "react-toastify";

const AlterarCaixa = () => {
  const [numContrato, setNumContrato] = useState(null);
  const [titular, setTitular] = useState("");
  const [pagamentos, setPagamentos] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedTeste, setSelectedTeste] = useState(null);
  const { getPagamentos, alterarCaixa } = useSuporte();

  const pesquisar = async () => {
    try {
      //setLoading(true);
      if (numContrato) {
        const data = await getPagamentos(numContrato);
        setTitular(data.titular)
        setPagamentos(data.pagamentos);
      }
    } catch (error) {
      console.log(error);

    }
  };

  const altCaixa = async () => {
    console.log(selectedRow)
    try {
      if (selectedRow && selectedTeste) {
        const contrato = numContrato;
        const idPag = selectedRow.id;
        const caixa = selectedTeste;

        // Chamar a função para alterar a forma de pagamento
        await alterarCaixa(contrato, idPag, caixa);

        toast.success("Forma de pagamento alterada com sucesso.");

        // Limpar os campos após a alteração bem-sucedida
        setNumContrato("");
        setTitular("");
        setPagamentos([]);
        setSelectedRows([]);
        setSelectedRow(null);
        setSelectedTeste(null);
      } else {
        toast.warning("Nenhuma linha selecionada.");
      }
    } catch (error) {
      toast.error("Erro ao tentar alterar a forma de pagamento:", error);
      // Trate o erro conforme necessário
    }
  };

  const handleRowClick = (index, row) => {
    const selectedIndex = selectedRows.indexOf(index);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [index];
    }

    setSelectedRows(newSelected);
    setSelectedRow(row);
    setSelectedTeste(row.tipo_caixa);
  };

  const isSelected = (index) => selectedRows.indexOf(index) !== -1;

  return (
    <div className="container-suporte">
      <HeaderSuporte />
      <div className="container-alterar-caixa">
        <div className="linhas-campos-alterar-caixa">
          <div className="campos-alterar-contrato">
            <label>Contrato</label>
            <input
              type="number"
              value={numContrato}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue) && inputValue >= 0) {
                  setNumContrato(inputValue);
                }
              }}
            />
          </div>

          <div className="pesquisa-altera-caixa">
            <ButtonIconTextoStart
              title={"PESQUISAR"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"800"}
              funcao={() => pesquisar()}
            />
          </div>

        </div>
        <div className="tabela-alterar-caixa">
          <p>
            <AccountCircleIcon fontSize={"small"} /> {titular ? <p>{titular}</p> : 'Cliente'}
          </p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Vencimento</TableCell>
                  <TableCell align="center">Pagamento</TableCell>
                  <TableCell align="center">Valor a Pagar</TableCell>
                  <TableCell align="center">Valor Pago</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagamentos.map((row, index) => {
                  const isItemSelected = isSelected(index);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{
                        backgroundColor: isItemSelected ? "#006b33" : "inherit",
                      }}
                      onClick={() => handleRowClick(index, row)}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          color: isItemSelected ? "#ffffff" : "inherit",
                        }}
                      >
                        {row.data_vencimento}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: isItemSelected ? "#ffffff" : "inherit",
                        }}
                      >
                        {row.data_pagamento}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: isItemSelected ? "#ffffff" : "inherit",
                        }}
                      >
                        {row.valor_pagar}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          color: isItemSelected ? "#ffffff" : "inherit",
                        }}
                      >
                        {row.valor_pago}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TableComponent
            headers={headerAltCaixa}
            rows={pagamentos}
            actionsLabel={["Ações", "Acciones"]}
            actionCalls={{
            }}
            onRowSelect={handleRowClick}
          /> */}
        </div>
        <div className="linhas-campos-alterar-caixa">
          <div className="campos-alterar-contrato2">
            <label>Transferir para Caixa</label>
            <select value={selectedTeste || ""} onChange={(e) => setSelectedTeste(e.target.value)}>
              <option value={"E"}>Escritorio</option>
              <option value={"B"}>Bancario</option>
              <option value={"V"}>Vendas</option>
            </select>
          </div>

          <div className="pesquisa-altera-caixa">
            <ButtonIconTextoStart
              title={"ALTERAR CAIXA"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"700"}
              funcao={() => altCaixa()}
            />
          </div>
          <div className="pesquisa-altera-caixa">
            <ButtonIconTextoStart
              title={"ESTORNAR PARCELA"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"700"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlterarCaixa;
