import React, { useState } from "react";
import HeaderUsuarios from "../../../components/header-usuarios/index";
import "./perfil.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { CSSTransition } from "react-transition-group";
import ModalCadastro from "../../../components/modal-cadastro";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Checkbox from "@mui/material/Checkbox";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonIconTextoStart from "../../../components/button-icon-texto-start";
import ModalEdicao from "../../../components/modal-edicao";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(name, unidade, cpf, rg, status, opcoes) {
  return { name, unidade, cpf, rg, status, opcoes };
}

const funcaoData = [
  createData(
    "Lucas Alencar Souza",
    "Dourados",
    "123.4567.89-10",
    "12230874",
    "Ativo"
  ),
  createData(
    "Rubens Nascimento",
    "Rio Brilhante",
    "987.4567.89-10",
    "16630874",
    "Ativo"
  ),
  createData(
    "Luiza Castanhares",
    "Itaporã",
    "201.8526.89-10",
    "16630874",
    "Ativo"
  ),
];

const Perfil = () => {
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);
  const [modalCadastroOpen, setModalCadastro] = useState(false);
  const [funcaoEstado, setFuncaoEstado] = useState(funcaoData);
  const [perfisDisponiveis, setPerfisDisponiveis] = useState([
    "Gerente",
    "Vendas",
    "Suporte",
  ]);
  const [unidadesDisponiveis, setUnidadesDisponiveis] = useState([
    "Dourados",
    "Itaporã",
    "Rio Brilhante",
    "Ponta Porã",
    "Bela Vista",
    "Deodápolis",
  ]);
  const [perfisSelecionados, setPerfisSelecionados] = useState([]);
  const [unidadesSelecionados, setUnidadesSelecionados] = useState([]);
  const [selectedUnidade, setSelectedUnidade] = useState("");
  const [selectedPermissao, setSelectedPermissao] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [unidadeSelecionada, setUnidadeSelecionada] = useState("");
  const [unidadesExibidas, setUnidadesExibidas] = useState([]);

  const handleSelecionarUnidade = (event) => {
    const unidade = event.target.value;
    if (unidade !== "Selecione" && !unidadesExibidas.includes(unidade)) {
      setUnidadeSelecionada(unidade);
      setUnidadesExibidas([...unidadesExibidas, unidade]);
      // Remover a unidade selecionada das unidades disponíveis
      setUnidadesDisponiveis(unidadesDisponiveis.filter((u) => u !== unidade));
    }
  };

  const handleRemoverUnidade = (unidade) => {
    setUnidadesExibidas(unidadesExibidas.filter((u) => u !== unidade));
    // Adicionar a unidade removida de volta às unidades disponíveis
    setUnidadesDisponiveis([...unidadesDisponiveis, unidade]);
  };

  const handlePerfilChange = (event) => {
    const perfilSelecionado = event.target.value;
    if (!perfisSelecionados.includes(perfilSelecionado)) {
      setPerfisSelecionados([...perfisSelecionados, perfilSelecionado]);
      setPerfisDisponiveis(
        perfisDisponiveis.filter((p) => p !== perfilSelecionado)
      );
    }
  };

  const handleRemoverPerfil = (perfil) => {
    const novosPerfisSelecionados = perfisSelecionados.filter(
      (p) => p !== perfil
    );
    setPerfisSelecionados(novosPerfisSelecionados);
    setPerfisDisponiveis([...perfisDisponiveis, perfil]);
  };

  const handleAddItem = () => {
    if (selectedUnidade && selectedPermissao) {
      setAddedItems([
        ...addedItems,
        { unidade: selectedUnidade, permissao: selectedPermissao },
      ]);
      // setSelectedUnidade("");
      // setSelectedPermissao("");
    }
  };

  const handleRemoveItem = (index) => {
    const newItems = [...addedItems];
    newItems.splice(index, 1);
    setAddedItems(newItems);
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

  const handleClearSelection = () => {
    setSelectedUnidade("");
    setSelectedPermissao("");
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
            titulo="Cadastrar Usuário"
            isOpen={modalCadastroOpen}
            onClose={fecharModalCadastro}
          >
            <div className="container-cadastro-linha">
              <div className="container-linha">
                <div className="campos-01-cadastro">
                  <label>
                    Nome<span className="obrigatorio"> *</span>
                  </label>
                  <input />
                </div>

                <div className="campos-02-cadastro">
                  <label>
                    CPF<span className="obrigatorio"> *</span>
                  </label>
                  <input></input>
                </div>
                <div className="campos-03-cadastro">
                  <label>Email</label>
                  <input></input>
                </div>
              </div>
              <div className="container-linha">
                <div className="campos-03-cadastro">
                  <label>
                    Senha<span className="obrigatorio"> *</span>
                  </label>
                  <input />
                </div>
                <div className="campos-03-cadastro">
                  <label>
                    Confirmação Senha<span className="obrigatorio"> *</span>
                  </label>
                  <input />
                </div>
                <div className="campos-03-cadastro">
                  <label>Setor</label>
                  <select>
                    <option>Selecione</option>
                    <option>Controladoria</option>
                    <option>TI</option>
                    <option>Suporte</option>
                  </select>
                </div>

                <div className="campos-03-cadastro">
                  <label>Permissão</label>
                  <select>
                    <option>Selecione</option>
                    <option>Permissão 01</option>
                    <option>Permissão 02</option>
                    <option>Permissão 03</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="container-cadastro-linha3">
              <h1>
                <LocationOnIcon fontSize={"small"} /> Unidades
              </h1>
              <div className="container-linha">
                <div className="campos-03-cadastro">
                  <label>Selecione uma Unidade</label>
                  <select
                    onChange={handleSelecionarUnidade}
                    value={unidadeSelecionada}
                  >
                    <option>Selecione</option>
                    {unidadesDisponiveis.map((unidade, index) => (
                      <option key={index}>{unidade}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="container-cadastro-linha3-unidade">
                {unidadesExibidas.map((unidade, index) => (
                  <div className="unit-item" key={index}>
                    <div className="unidade-selecionada-perfil">
                      <label>{unidade}</label>
                      <button onClick={() => handleRemoverUnidade(unidade)}>
                        <HighlightOffIcon fontSize={"small"} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="container-cadastro-linha3">
              <div className="divide-2-cadastro">
                <div className="colunas4-cadastro">
                  <h1>
                    <AssignmentTurnedInIcon fontSize={"small"} /> Permissões
                  </h1>
                  <div className="fundo-colunas-5-cadastro">
                    <div className="container-linha-cadastro">
                      <div className="campos-05-cadastro">
                        <label>Selecione a Unidade</label>
                        <select
                          value={selectedUnidade}
                          onChange={(e) => setSelectedUnidade(e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          <option value="Dourados">Dourados</option>
                          <option value="Rio Brilhante">Rio Brilhante</option>
                          <option value="Itaporã">Itaporã</option>
                        </select>
                      </div>
                      <div className="permissoe-selecione-cadastro">
                        <label>Permissões</label>
                        <select
                          value={selectedPermissao}
                          onChange={(e) => setSelectedPermissao(e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          <option value="Controle">Controle</option>
                          <option value="Venda">Venda</option>
                          <option value="Associado">Associado</option>
                        </select>
                      </div>
                      <button onClick={handleAddItem}>
                        <AddCircleOutlineIcon fontSize="small" />
                      </button>
                    </div>
                  </div>

                  <div className="per-uni">
                    <div className="per-uni3">
                      {addedItems.map((item, index) => (
                        <div key={index} className="per-unidade2">
                          <label>
                            {item.unidade} - <label>{item.permissao}</label>
                          </label>

                          <select>
                            <option>Editar</option>
                            <option>Remover</option>
                          </select>
                          <button onClick={() => handleRemoveItem(index)}>
                            <HighlightOffIcon fontSize="small" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="colunas5-cadastro">
                  <h1>
                    <DashboardIcon fontSize={"small"} /> Acessos
                  </h1>
                  <div className="fundo-colunas-6-cadastro">
                    <div className="container-linha-cadastro3">
                      <div className="acessos-cadastro">
                        <Checkbox {...label} size="small" />
                        <label>Pax Vendedor</label>
                      </div>
                      <div className="acessos-cadastro">
                        <Checkbox {...label} size="small" />
                        <label>Pax Cobrador</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-cadastro-linha4">
              <div className="salva-perfil-cadastro">
                <ButtonIconTextoStart
                  title={"SALVAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                  fontSizeBotao={"10px"}
                  funcao={() => abrirModalCadastro()}
                />
              </div>
            </div>
          </ModalEdicao>
          <ModalEdicao
            titulo="Editar Usuário"
            isOpen={modalEdicaoOpen}
            onClose={handleCloseModalEdicao}
          >
            <div className="container-cadastro-linha">
              <div className="container-linha">
                <div className="campos-01-cadastro">
                  <label>
                    Nome<span className="obrigatorio"> *</span>
                  </label>
                  <input />
                </div>

                <div className="campos-02-cadastro">
                  <label>
                    CPF<span className="obrigatorio"> *</span>
                  </label>
                  <input></input>
                </div>
                <div className="campos-03-cadastro">
                  <label>Email</label>
                  <input></input>
                </div>
              </div>
              <div className="container-linha">
                <div className="campos-03-cadastro">
                  <label>
                    Senha<span className="obrigatorio"> *</span>
                  </label>
                  <input />
                </div>
                <div className="campos-03-cadastro">
                  <label>
                    Confirmação Senha<span className="obrigatorio"> *</span>
                  </label>
                  <input />
                </div>
                <div className="campos-03-cadastro">
                  <label>Setor</label>
                  <select>
                    <option>Selecione</option>
                    <option>Controladoria</option>
                    <option>TI</option>
                    <option>Suporte</option>
                  </select>
                </div>

                <div className="campos-03-cadastro">
                  <label>Permissão</label>
                  <select>
                    <option>Selecione</option>
                    <option>Permissão 01</option>
                    <option>Permissão 02</option>
                    <option>Permissão 03</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="container-cadastro-linha3">
              <h1>
                <LocationOnIcon fontSize={"small"} /> Unidades
              </h1>
              <div className="container-linha">
                <div className="campos-03-cadastro">
                  <label>Selecione uma Unidade</label>
                  <select
                    onChange={handleSelecionarUnidade}
                    value={unidadeSelecionada}
                  >
                    <option>Selecione</option>
                    {unidadesDisponiveis.map((unidade, index) => (
                      <option key={index}>{unidade}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="container-cadastro-linha3-unidade">
                {unidadesExibidas.map((unidade, index) => (
                  <div className="unit-item" key={index}>
                    <div className="unidade-selecionada-perfil">
                      <label>{unidade}</label>
                      <button onClick={() => handleRemoverUnidade(unidade)}>
                        <HighlightOffIcon fontSize={"small"} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="container-cadastro-linha3">
              <div className="divide-2-cadastro">
                <div className="colunas4-cadastro">
                  <h1>
                    <AssignmentTurnedInIcon fontSize={"small"} /> Permissões
                  </h1>
                  <div className="fundo-colunas-5-cadastro">
                    <div className="container-linha-cadastro">
                      <div className="campos-05-cadastro">
                        <label>Selecione a Unidade</label>
                        <select
                          value={selectedUnidade}
                          onChange={(e) => setSelectedUnidade(e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          <option value="Dourados">Dourados</option>
                          <option value="Rio Brilhante">Rio Brilhante</option>
                          <option value="Itaporã">Itaporã</option>
                        </select>
                      </div>
                      <div className="permissoe-selecione-cadastro">
                        <label>Permissões</label>
                        <select
                          value={selectedPermissao}
                          onChange={(e) => setSelectedPermissao(e.target.value)}
                        >
                          <option value="">Selecione...</option>
                          <option value="Controle">Controle</option>
                          <option value="Venda">Venda</option>
                          <option value="Associado">Associado</option>
                        </select>
                      </div>
                      <button onClick={handleAddItem}>
                        <AddCircleOutlineIcon fontSize="small" />
                      </button>
                    </div>
                  </div>

                  <div className="per-uni">
                    <div className="per-uni3">
                      {addedItems.map((item, index) => (
                        <div key={index} className="per-unidade2">
                          <label>
                            {item.unidade} - <label>{item.permissao}</label>
                          </label>

                          <select>
                            <option>Editar</option>
                            <option>Remover</option>
                          </select>
                          <button onClick={() => handleRemoveItem(index)}>
                            <HighlightOffIcon fontSize="small" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="colunas5-cadastro">
                  <h1>
                    <DashboardIcon fontSize={"small"} /> Acessos
                  </h1>
                  <div className="fundo-colunas-6-cadastro">
                    <div className="container-linha-cadastro3">
                      <div className="acessos-cadastro">
                        <Checkbox {...label} size="small" />
                        <label>Pax Vendedor</label>
                      </div>
                      <div className="acessos-cadastro">
                        <Checkbox {...label} size="small" />
                        <label>Pax Cobrador</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-cadastro-linha4">
              <div className="salva-perfil-cadastro">
                <ButtonIconTextoStart
                  title={"SALVAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                  fontSizeBotao={"10px"}
                  funcao={() => abrirModalCadastro()}
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
                  <TableCell>Nome</TableCell>
                  <TableCell align="center">Unidade</TableCell>
                  <TableCell align="center">CPF</TableCell>
                  <TableCell align="center">RG</TableCell>
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
                    <TableCell align="center">{row.unidade}</TableCell>
                    <TableCell align="center">{row.cpf}</TableCell>
                    <TableCell align="center">{row.rg}</TableCell>
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

export default Perfil;
