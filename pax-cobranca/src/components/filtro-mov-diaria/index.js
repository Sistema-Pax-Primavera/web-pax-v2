import React, { useState } from "react";
import "./filtro-mov-diaria.css";
import ButtonText from "../../../../pax-associado/src/components/button-texto";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonIcon from "../../../../pax-associado/src/components/button-icon";
import AddchartIcon from "@mui/icons-material/Addchart";
import IconeButtonTable from "../../../../pax-associado/src/components/button-icon-texto";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ButtonIconTextoStart from "../button-icon-texto-start";
import CardsMovDiaria from "../cards-mov-diaria";

function createData(
  rota,
  cobrador,
  agendamentos,
  totaldia,
  agendamentosatrasados,
  total,
  detalhar
) {
  return {
    rota,
    cobrador,
    agendamentos,
    totaldia,
    agendamentosatrasados,
    total,
    detalhar,
  };
}

function resultado(
  rota,
  cobrador,
  contrato,
  titular,
  data,
  tipo,
  categoria,
  localizacao,
  observacao,
  detalhar
) {
  return {
    rota,
    cobrador,
    contrato,
    titular,
    data,
    tipo,
    categoria,
    localizacao,
    observacao,
    detalhar,
  };
}

const rows = [
  createData("Rota A", "Sonia Maria Martins", 10, 24, 20, 15),
  createData("Rota B", "José Alencar", 17, 14, 18, 15),
  createData("Rota C", "Lucas Ribeiro", 10, 24, 20, 15),
];

const detalhes = [
  resultado(
    "Rota A",
    "Sonia Maria Martins",
    46598,
    "Carlos Henrique",
    "20/05/2023",
    "Recebeu Parcela",
    "Justificou",
    "Dourados",
    "Mandei Mensagem mas não respondeu"
  ),
  resultado(
    "Rota B",
    "José Alencar",
    78418,
    "Lucas Souza",
    "25/05/2023",
    "Recebeu Parcela",
    "Justificou",
    "Dourados",
    "Responderam que deu certo"
  ),
  resultado(
    "Rota C",
    "Lucas Ribeiro",
    21650,
    "Janderson Silva",
    "23/02/2023",
    "Recebeu Parcela",
    "Justificou",
    "Dourados",
    "Responderam que deu certo"
  ),
];
const FiltroMovDiaria = () => {
  const [mostrarSegundaParte, setMostrarSegundaParte] = useState(false);
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
  const [ultimaParteMostrada, setUltimaParteMostrada] = useState(null);

  const handleMostrarSegundaParte = () => {
    setMostrarSegundaParte(true);
    setUltimaParteMostrada("primeiraParte");
  };

  const handleAbrirDetalhes = () => {
    setMostrarDetalhes(true); // Atualiza o estado para mostrar os detalhes
    setMostrarSegundaParte(false); // Esconde a segunda parte da tabela
  };

  const handleFecharDetalhes = () => {
    setMostrarDetalhes(false);
    if (ultimaParteMostrada === "primeiraParte") {
      setMostrarSegundaParte(true);
    }
  };

  const handleRetornar = () => {
    if (mostrarSegundaParte) {
      setMostrarSegundaParte(false);
      setMostrarDetalhes(false);
    } else {
      setMostrarSegundaParte(true); // Atualiza o estado para mostrar a segunda parte da tabela
      setMostrarDetalhes(false); // Esconde os detalhes
    }
  };
  return (
    <div className="container-filtros-mov">
      {!mostrarDetalhes && !mostrarSegundaParte && (
        <div>
          <div className="container-filtro-movdiaria">
            <div className="campos-mov-diaria1">
              <label>Rota</label>
              <select></select>
            </div>
            <div className="campos-mov-diaria2">
              <label>Cobrador</label>
              <select></select>
            </div>
            <div className="campos-mov-diaria2">
              <label>Unidade</label>
              <select></select>
            </div>
            <div className="campos-mov-diaria1">
              <div className="filtrar-mov-diaria">
                <ButtonText title="FILTRAR" />
              </div>
            </div>
          </div>

          <div className="table-mov-diaria">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Rota</TableCell>
                    <TableCell align="start">Cobrador</TableCell>
                    <TableCell align="center">Agendamentos</TableCell>
                    <TableCell align="center">Total Dia</TableCell>
                    <TableCell align="center">Agendamentos Atrasados</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Detalhes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.rota}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.rota}
                      </TableCell>
                      <TableCell align="start">{row.cobrador}</TableCell>
                      <TableCell align="center">{row.agendamentos}</TableCell>
                      <TableCell align="center">{row.totaldia}</TableCell>
                      <TableCell align="center">
                        {row.agendamentosatrasados}
                      </TableCell>
                      <TableCell align="center">{row.total}</TableCell>
                      <TableCell align="center">
                        <ButtonIcon
                          icon={<AddchartIcon fontSize={"small"} />}
                          funcao={handleMostrarSegundaParte}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
      {mostrarSegundaParte && (
        <div>
          <div className="retorno-tela-mov">
            <ButtonIconTextoStart
              title={"RETORNAR"}
              funcao={handleRetornar}
              corFundoBotao="#006b33"
              corTextoBotao="#ffff"
              fontWeightBotao="700"
              icon={<ArrowBackIosNewIcon fontSize={"small"} />}
            />
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Rota</TableCell>
                  <TableCell align="start" sx={{ fontSize: 12 }}>
                    Cobrador
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    Contrato
                  </TableCell>
                  <TableCell align="start" sx={{ fontSize: 12 }}>
                    Titular
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    Data
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    Tipo
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    Categoria
                  </TableCell>
                  <TableCell align="start" sx={{ fontSize: 12 }}>
                    Localização
                  </TableCell>
                  <TableCell align="start" sx={{ fontSize: 12 }}>
                    Observação
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 12 }}>
                    Detalhes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detalhes.map((row) => (
                  <TableRow
                    key={row.rota}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontSize: 12 }}>
                      {row.rota}
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: 12 }}>
                      {row.cobrador}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      {row.contrato}
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: 12 }}>
                      {row.titular}
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: 12 }}>
                      {row.data}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      {row.tipo}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      {row.categoria}
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: 12 }}>
                      {row.localizacao}
                    </TableCell>
                    <TableCell align="start" sx={{ fontSize: 12 }}>
                      {row.observacao}
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      <ButtonText title="ABRIR" funcao={handleAbrirDetalhes} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {mostrarDetalhes && (
        <div>
          <div className="retorn-ulti-tela">
            <ButtonIconTextoStart
              title={"RETORNAR"}
              funcao={handleFecharDetalhes}
              corFundoBotao="#006b33"
              corTextoBotao="#ffff"
              fontWeightBotao="700"
              icon={<ArrowBackIosNewIcon fontSize={"small"} />}
            />
          </div>

          <CardsMovDiaria />
        </div>
      )}
    </div>
  );
};

export default FiltroMovDiaria;
