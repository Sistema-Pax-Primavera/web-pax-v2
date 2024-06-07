import React from "react";
import "./baixa-filial.css";
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
function createData(name, pagamento, valorpagar, valorpago) {
  return { name, pagamento, valorpagar, valorpago };
}

const rows = [
  createData("20/05/2023", "22/05/2023", "100,00", "100,00"),
  createData("22/05/2023", "22/05/2023", "100,00", "100,00"),
  createData("23/05/2023", "23/05/2023", "100,00", "100,00"),
];

const BaixaFilial = () => {
  return (
    <div className="container-suporte">
      <HeaderSuporte />
      <div className="container-baixa-filial">
        <div className="linhas-campos-baixa-filial">
          <div className="campos-alterar-contrato">
            <label>Contrato</label>
            <input></input>
          </div>
          <div className="campos-alterar-contrato">
            <label>Data Pagamento</label>
            <input></input>
          </div>
          <div className="pesquisa-baixa-filial">
            <ButtonIconTextoStart
              title={"PESQUISAR"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"800"}
            />
          </div>
        </div>
        <div className="tabela-baixa-filial">
          <p>
            <AccountCircleIcon fontSize={"small"} /> Cliente
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
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.pagamento}</TableCell>
                    <TableCell align="center">{row.valorpagar}</TableCell>
                    <TableCell align="center">{row.valorpago}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="linhas-campos-baixa-filial">
          <div className="campos-alterar-contrato">
            <label>Unidade Destino</label>
            <select></select>
          </div>
          <div className="pesquisa-baixa-filial">
            <ButtonIconTextoStart
              title={"CONECTAR"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"700"}
            />
          </div>
          <div className="campos-alterar-contrato2">
            <label>Forma de Pagamento</label>
            <select></select>
          </div>
          <div className="campos-alterar-contrato">
            <label>Conta</label>
            <select></select>
          </div>
          <div className="pesquisa-baixa-filial">
            <ButtonIconTextoStart
              title={"TRANSFERIR"}
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

export default BaixaFilial;
