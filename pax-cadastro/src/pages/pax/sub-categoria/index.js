import React, { useState } from "react";
import "./sub-categoria.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ButtonIconTextoStart from "../../../components/button-icon-texto-start";
import HeaderPax from "../../../components/header-pax";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModalEdicao from "../../../components/modal-edicao";

function createData(name, categoria, status, opcoes) {
  return { name, categoria, status, opcoes };
}

const funcaoData = [
  createData("Teste 01", "Teste 01", "Ativo"),
  createData("Teste 02", "Teste 02", "Ativo"),
  createData("Teste 03", "Teste 03", "Ativo"),
];

const SubCategoria = () => {
  const [funcaoEstado, setFuncaoEstado] = useState(funcaoData);
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);
  const [modalCadastroOpen, setModalCadastro] = useState(false);
  const handleStatusChange = (index) => {
    const updatedFuncao = funcaoEstado.map((funcao, i) => {
      if (i === index) {
        return {
          ...funcao,
          status: funcao.status === "Ativo" ? "Inativo" : "Ativo",
        };
      }
      return funcao;
    });
    setFuncaoEstado(updatedFuncao);
  };

  const handleOpenModalEdicao = () => {
    setModalEdicaoOpen(true);
  };

  const handleCloseModalEdicao = () => {
    setModalEdicaoOpen(false);
  };

  const abrirModalCadastro = () => {
    setModalCadastro(true);
  };

  const fecharModalCadastro = () => {
    setModalCadastro(false);
  };
  return (
    <div className="container-cadastro">
      <HeaderPax />
      <div className="sub-container-cadastro">
        <div className="pesquisa-tabelas-cadastro">
          <div className="input-pesquisa-cadastro3">
            <input placeholder="Informe o nome"></input>
          </div>
          <div className="tamanho-botao-pesquisa">
            <ButtonIconTextoStart
              title={"PESQUISAR"}
              corFundoBotao={"#006b33"}
              corTextoBotao={"#ffff"}
              fontSizeBotao={"10px"}
            />
          </div>
          <div className="tamanho-botao-pesquisa">
            <ButtonIconTextoStart
              title={"Cadastrar"}
              corFundoBotao={"#006b33"}
              corTextoBotao={"#ffff"}
              fontSizeBotao={"10px"}
              funcao={()=>abrirModalCadastro()}
            />
          </div>
          <ModalEdicao
            titulo="Cadastrar Sub Categoria"
            isOpen={modalCadastroOpen}
            onClose={fecharModalCadastro}
          >
            <div className="linhas-campos-cadastro">
              <div className="tipo-parentesco-cadas">
                <label>Sub Categoria</label>
                <input></input>
              </div>
              <div className="tipo-parentesco-cadas">
                <label>Categoria</label>
                <select></select>
              </div>
              <div className="buttao-salvar-parentesco">
                <ButtonIconTextoStart
                  title={"SALVAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                />
              </div>
            </div>
          </ModalEdicao>
          <ModalEdicao
            titulo="Editar Sub Categoria"
            isOpen={modalEdicaoOpen}
            onClose={handleCloseModalEdicao}
          >
            <div className="linhas-campos-cadastro">
              <div className="tipo-parentesco-cadas">
                <label>Sub Categoria</label>
                <input></input>
              </div>
              <div className="tipo-parentesco-cadas">
                <label>Categoria</label>
                <select></select>
              </div>
              <div className="buttao-salvar-parentesco">
                <ButtonIconTextoStart
                  title={"SALVAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                />
              </div>
            </div>
          </ModalEdicao>
        </div>
        <div className="tabelas-cadastro-usuarios">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Sub Categoria</TableCell>
                  <TableCell align="center">Tipo</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">OPÇÕES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {funcaoEstado.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.categoria}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">
                      <div className="div-edit-cadastro-parentesco">
                        <div className="edit-cadastro-parentesco">
                          <button onClick={() => handleOpenModalEdicao()}>
                            <ModeEditOutlineIcon fontSize={"small"} />
                          </button>
                        </div>
                        <div className="edit-gren-red">
                          <div
                            onClick={() => handleStatusChange(index)}
                            className={
                              row.status === "Ativo"
                                ? "green-background"
                                : "red-background"
                            }
                          >
                            {row.status === "Ativo" ? (
                              <CheckCircleOutlineIcon /> // Cor branca para visibilidade
                            ) : (
                              <HighlightOffIcon />
                            )}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default SubCategoria;
