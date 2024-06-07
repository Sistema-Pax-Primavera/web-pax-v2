import React from "react";
import "./rotas.css";
import HeaderCobranca from "../../components/header-cobranca";
import FiltroRotas from "../../components/filtro-rotas";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FiltroRotasCobranca from '../../components/filtro-rotas-cobranca'

function createData(contrato, titular, rota, bairro, municipio) {
  return { contrato, titular, rota, bairro, municipio };
}

const rows = [
  createData(46594, "Jéssica Souza", "Rota A", "JD Climax", "Dourados"),
  createData(51239, "Sonia Maria Martins", "Rota B", "JD Novo Horizonte", "Dourados"),
  createData(21221, "Lucas Felipe", "Rota C", "Água Boa", "Dourados"),

];

const Rotas = () => {
  return (
    <div className="container-cobranca">
      <HeaderCobranca />
      <div className="container-rotas-cobrador">
        <FiltroRotas />
        <div className="tabela-rotas-cobranca">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: 12 }}>Contrato</TableCell>
                  <TableCell align="start" sx={{ fontSize: 12 }}>Titular</TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>Rota</TableCell>
                  <TableCell align="start" sx={{ fontSize: 12 }}>Bairro</TableCell>
                  <TableCell align="start" sx={{ fontSize: 12 }}>Municipio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.contrato}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontSize: 12 }}>
                      {row.contrato}
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: 12 }}>{row.titular}</TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>{row.rota}</TableCell>
                    <TableCell align="start" sx={{ fontSize: 12 }}>{row.bairro}</TableCell>
                    <TableCell align="start" sx={{ fontSize: 12 }}>{row.municipio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <FiltroRotasCobranca />
      </div>

    </div>
  );
};

export default Rotas;
