import React, { useState } from "react";
import "./permissao.css";
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
import HeaderUsuarios from "../../../components/header-usuarios";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ModalEdicao from "../../../components/modal-edicao";
import AccountTreeIcon from "@mui/icons-material/AccountTree";

function createData(name, status, opcoes) {
  return { name, status, opcoes };
}

const funcaoData = [
  createData("Administrador", "Ativo"),
  createData("Editar", "Ativo"),
  createData("Excluir", "Ativo"),
];

const Permissao = () => {
  const [funcaoEstado, setFuncaoEstado] = useState(funcaoData);
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);
  const [modalCadastroOpen, setModalCadastro] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = [
    "Associados",
    "Web Vendedor",
    "Financeiro",
    "Cobrança",
    "Boletos",
    "Suporte",
  ];

  const handleSelect = (option) => {
    setSelectedOptions([...selectedOptions, option]);
  };

  const handleRemove = (option) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
  };

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
      <HeaderUsuarios />
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
              funcao={() => abrirModalCadastro()}
            />
          </div>
          <ModalEdicao
            titulo="Cadastrar Permissão"
            isOpen={modalCadastroOpen}
            onClose={fecharModalCadastro}
          >
            <div className="linhas-campos-cadastro">
              <div className="tipo-raca-cadas">
                <label>Permissão</label>
                <input></input>
              </div>
              <div className="tipo-raca-cadas">
                <label>Módulos</label>
                <select onChange={(e) => handleSelect(e.target.value)}>
                  <option disabled selected>
                    Selecione uma opção
                  </option>
                  {options.map((option) => (
                    <option
                      key={option}
                      disabled={selectedOptions.includes(option)}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="buttao-salvar-raca">
                <ButtonIconTextoStart
                  title={"SALVAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                />
              </div>
            </div>
            <div className="lista-de-permissoes">
              <label>
                <AccountTreeIcon fontSize={"small"} /> Módulos Selecionados
              </label>
              <div className="linhas-campos-cadastro4">
                {selectedOptions.map((option) => (
                  <div key={option} className="nome-modulo-perm">
                    <label>{option}</label>
                    <select>
                      <option>Selecione</option>
                      <option>Ler</option>
                      <option>Gravar</option>
                      <option>Ler/Gravar</option>
                    </select>
                    <button onClick={() => handleRemove(option)}>
                      <HighlightOffIcon fontSize={"small"} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ModalEdicao>
          <ModalEdicao
            titulo="Editar Permissão"
            isOpen={modalEdicaoOpen}
            onClose={handleCloseModalEdicao}
          >
             <div className="linhas-campos-cadastro">
              <div className="tipo-raca-cadas">
                <label>Permissão</label>
                <input></input>
              </div>
              <div className="tipo-raca-cadas">
                <label>Módulos</label>
                <select onChange={(e) => handleSelect(e.target.value)}>
                  <option disabled selected>
                    Selecione uma opção
                  </option>
                  {options.map((option) => (
                    <option
                      key={option}
                      disabled={selectedOptions.includes(option)}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="buttao-salvar-raca">
                <ButtonIconTextoStart
                  title={"SALVAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                />
              </div>
            </div>
            <div className="lista-de-permissoes">
              <label>
                <AccountTreeIcon fontSize={"small"} /> Módulos Selecionados
              </label>
              <div className="linhas-campos-cadastro4">
                {selectedOptions.map((option) => (
                  <div key={option} className="nome-modulo-perm">
                    <label>{option}</label>
                    <select>
                      <option>Selecione</option>
                      <option>Ler</option>
                      <option>Gravar</option>
                      <option>Ler/Gravar</option>
                    </select>
                    <button onClick={() => handleRemove(option)}>
                      <HighlightOffIcon fontSize={"small"} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </ModalEdicao>
        </div>
        <div className="tabelas-cadastro-usuarios">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Permissão</TableCell>
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

export default Permissao;
