import React from "react";
import "./atendimento-controladora.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ClassIcon from "@mui/icons-material/Class";
import ButtonIconTextoStart from "../button-icon-texto-start";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

function createData(name, quanticlientes, quantiregistros, tempoatendimento) {
  return { name, quanticlientes, quantiregistros, tempoatendimento };
}

const rows = [
  createData("Dourados", 159, 60, "03:04:54"),
  createData("Itaporã", 458, 30, "12:08:54"),
];

function categoria(name, quanticlientes, quantiregistros, tempoatendimento) {
  return { name, quanticlientes, quantiregistros, tempoatendimento };
}

const categorias = [
  categoria("Contatados", 159, 60, "03:04:54"),
  categoria("Ligação via Telefone", 458, 30, "12:08:54"),
  categoria("Ligação via WhatsApp", 458, 30, "12:08:54"),
];

const AtendimentoControladora = ({ onVoltarClick }) => {
  return (
    <div className="container-aten-controladora">
      <div className="buttao-retorn-controladora">
        <ButtonIconTextoStart
          icon={<ArrowBackIosNewIcon fontSize={"small"} />}
          corFundoBotao={"#006b33"}
          corTextoBotao={"#ffff"}
          fontWeightBotao={700}
          funcao={onVoltarClick}
        />
      </div>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <div className="icon-table-controladoria">
              <label>
                <LocationOnIcon />
                Unidades
              </label>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 12 }}>Cidade</TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      Quantidade Clientes
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      Quantidade de Registros
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      Tempo Atendimentos
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontSize: 12 }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        {row.quanticlientes}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        {row.quantiregistros}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        {row.tempoatendimento}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div className="icon-table-controladoria">
              <label>
                <ClassIcon />
                Categoria
              </label>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: 12 }}>
                      Categoria Atendimento
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      Quantidade Clientes
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      Quantidade de Registros
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      Tempo Atendimentos
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categorias.map((categoria) => (
                    <TableRow
                      key={categoria.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontSize: 12 }}
                      >
                        {categoria.name}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        {categoria.quanticlientes}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        {categoria.quantiregistros}
                      </TableCell>
                      <TableCell align="center" sx={{ fontSize: 12 }}>
                        {categoria.tempoatendimento}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <div className="icon-table-controladoria">
              <label>
                <FilterAltIcon />
                Filtros
              </label>
            </div>
          </AccordionSummary>
          <AccordionDetails>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default AtendimentoControladora;
