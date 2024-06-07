import React, { useState } from "react";
import HeaderCobranca from "../../components/header-cobranca";
import "./agendamento-cobradores.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ModalEdicao from "../../components/modal-edicao";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

function createData(name, contrato, dataAgendamento, dataVencimento, opcoes) {
  return { name, contrato, dataAgendamento, dataVencimento, opcoes };
}

const rows = [
  createData("Diogo Perez", 12345, "20/05/2023", "21/05/2023"),
  createData("Mateus Pitta", 34561, "22/05/2023", "23/05/2023"),
  createData("Lucas Souza", 978654, "23/05/2023", "24/05/2023"),
];

function createDataDepe(name, parentesco, filiacao,) {
  return { name, parentesco, filiacao, };
}

const dependentes = [
  createDataDepe("Dependente 01", "Pai", "20/05/2023", ),
  createDataDepe("Dependente 02", "Mãe", "22/05/2023", ),
  createDataDepe("Dependente 03", "Filho", "23/05/2023", ),
];

const AgendamentosCobradores = () => {
  const [modalCadastroOpen, setModalCadastro] = useState(false);
  const abrirModalCadastro = () => {
    setModalCadastro(true);
  };

  const fecharModalCadastro = () => {
    setModalCadastro(false);
  };

  return (
    <div className="container-agendamento-cobradores">
      <HeaderCobranca />
      <div className="subcontainer-agendamento-cobradores">
        <div className="linha-agendamento-cobradores">
          <div className="campos-agendamento-cobradores">
            <label>Cobradores</label>
            <select></select>
          </div>
          <div className="campos-agendamento-cobradores">
            <label>Unidade</label>
            <select></select>
          </div>
          <div className="campos-agendamento-cobradores">
            <label>Nome</label>
            <input></input>
          </div>
        </div>
        <div className="linha-agendamento-cobradores">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Cliente</TableCell>
                  <TableCell align="start">Contrato</TableCell>
                  <TableCell align="center">Data Agendamento</TableCell>
                  <TableCell align="center">Data Vencimento</TableCell>
                  <TableCell align="start">Opções</TableCell>
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
                    <TableCell align="start">{row.contrato}</TableCell>
                    <TableCell align="center">{row.dataAgendamento}</TableCell>
                    <TableCell align="center">{row.dataVencimento}</TableCell>
                    <TableCell align="center">
                      <div className="button-agendamento-cobradores">
                        <ButtonIconTextoStart
                          icon={<AppRegistrationIcon fontSize={"small"} />}
                          corFundoBotao={"#006b33"}
                          corTextoBotao={"#ffff"}
                          funcao={() => abrirModalCadastro()}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <ModalEdicao
            titulo="Dados do Cliente"
            isOpen={modalCadastroOpen}
            onClose={fecharModalCadastro}
          >
            <div className="dados-cliente-cobradores">
              <div className="linha-agendamento-cobradores">
                <div className="campos-agendamento-cobradores3">
                  <label>Endereço</label>
                  <input></input>
                </div>
                <div className="campos-agendamento-cobradores4">
                  <label>Número</label>
                  <input></input>
                </div>
                <div className="campos-agendamento-cobradores2">
                  <label>Bairro</label>
                  <input></input>
                </div>
                <div className="campos-agendamento-cobradores2">
                  <label>Cidade</label>
                  <input></input>
                </div>
              </div>
              <div className="linha-agendamento-cobradores">
                <div className="campos-agendamento-cobradores2">
                  <label>Telefone</label>
                  <input></input>
                </div>
                <div className="campos-agendamento-cobradores2">
                  <label>Plano</label>
                  <input></input>
                </div>
                <div className="campos-agendamento-cobradores4">
                  <label>Contrato</label>
                  <input></input>
                </div>
                <div className="campos-agendamento-cobradores2">
                  <label>Data Vencimento</label>
                  <input></input>
                </div>
                <div className="campos-agendamento-cobradores2">
                  <label>Data Filiação</label>
                  <input></input>
                </div>
              </div>
              <p>
                <PersonAddAlt1Icon fontSize={"small"} /> Dependentes
              </p>
            </div>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="start">Parentesco</TableCell>
                  <TableCell align="center">Filiação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dependentes.map((dependente) => (
                  <TableRow
                    key={dependente.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {dependente.name}
                    </TableCell>
                    <TableCell align="start">{dependente.parentesco}</TableCell>
                    <TableCell align="center">{dependente.filiacao}</TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </ModalEdicao>
        </div>
      </div>
    </div>
  );
};

export default AgendamentosCobradores;
