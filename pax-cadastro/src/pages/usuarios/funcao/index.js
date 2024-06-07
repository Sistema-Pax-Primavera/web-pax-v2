import React, { useState } from "react";
import "./funcao.css";
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function createData(name, status, opcoes) {
  return { name, status, opcoes };
}

const funcaoData = [
  createData("Administrador", "Ativo"),
  createData("Suporte", "Ativo"),
  createData("Controladoria", "Ativo"),
];

const Funcao = () => {
  const [funcaoEstado, setFuncaoEstado] = useState(funcaoData);
  const [modalEdicaoOpen, setModalEdicaoOpen] = useState(false);
  const [modalCadastroOpen, setModalCadastro] = useState(false);
  const [permissaoSelecionada, setPermissaoSelecionada] = useState("");
  const [permissoesAdicionadas, setPermissoesAdicionadas] = useState([]);
  const [permissoesOptions, setPermissoesOptions] = useState({}); // Armazena as opções selecionadas para cada permissão
  const opcoes = ["Associados", "Web Vendedor"];
  const [selectedOption, setSelectedOption] = useState("");
  const [displayedOptions, setDisplayedOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectOption = (permissao, option) => {
    // Adicione ou remova a opção selecionada do estado
    const isSelected = selectedOptions.some(
      (opt) => opt.permissao === permissao && opt.option === option
    );
    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter(
          (opt) => !(opt.permissao === permissao && opt.option === option)
        )
      );
    } else {
      setSelectedOptions([...selectedOptions, { permissao, option }]);
    }
  };

  const options = [
    "Dados Cadastrais",
    "Dados Cobrança",
    "Dependentes",
    "PDR",
    "Recebimento",
    "Atendimento",
    "Contato",
    "Inativar Contrato",
    "Quitar",
    "Extrato",
  ];

  const handleRemovePermissao = (permissao) => {
    const updatedPermissoes = permissoesAdicionadas.filter(
      (p) => p !== permissao
    );
    const updatedOptions = { ...permissoesOptions };
    delete updatedOptions[permissao]; // Remove as opções desta permissão
    setPermissoesAdicionadas(updatedPermissoes);
    setPermissoesOptions(updatedOptions);
  };


  const handleRemoveOption = (option) => {
    const updatedOptions = displayedOptions.filter((item) => item !== option);
    setDisplayedOptions(updatedOptions);
    setSelectedOption("");
  };

  const handleAdicionar = () => {
    if (permissaoSelecionada) {
      setPermissoesAdicionadas([
        ...permissoesAdicionadas,
        permissaoSelecionada,
      ]);
      setPermissoesOptions({
        ...permissoesOptions,
        [permissaoSelecionada]: [],
      }); // Inicializa as opções selecionadas para esta permissão como um array vazio
      setPermissaoSelecionada(""); // Limpar a seleção após adicionar
    }
  };

  const handleSalvar = () => {};

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

  const handleOptionPermissaoSelect = (permissao, option) => {
    setPermissoesOptions({
      ...permissoesOptions,
      [permissao]: [...permissoesOptions[permissao], option], // Adiciona a opção selecionada para esta permissão
    });
  };

  const handleRemoveOptionPermissao = (permissao, option) => {
    const updatedOptions = permissoesOptions[permissao].filter(
      (item) => item !== option
    );
    setPermissoesOptions({
      ...permissoesOptions,
      [permissao]: updatedOptions, // Remove a opção selecionada para esta permissão
    });
  };

  return (
    <div className="container-cadastro">
      <HeaderUsuarios />
      <div className="sub-container-cadastro">
        <div className="pesquisa-tabelas-cadastro2">
          <input placeholder="Informe o nome"></input>
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
            titulo="Cadastrar Função"
            isOpen={modalCadastroOpen}
            onClose={fecharModalCadastro}
          >
            <div className="linhas-campos-cadastro">
              <div className="tipo-raca-cadas2">
                <label>Permissão</label>
                <input></input>
              </div>
              <div className="tipo-raca-cadas">
                <label>Módulo</label>
                <select
                  value={permissaoSelecionada}
                  onChange={(e) => setPermissaoSelecionada(e.target.value)}
                >
                  <option value="">Selecione uma permissão</option>
                  {opcoes.map((opcao, index) => (
                    <option key={index} value={opcao}>
                      {opcao}
                    </option>
                  ))}
                </select>
              </div>
              <div className="buttao-salvar-raca">
                <ButtonIconTextoStart
                  icon={<AddCircleOutlineIcon fontSize={'small'}/>}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                  funcao={handleAdicionar}
                />
              </div>
              <div className="buttao-salvar-raca">
                <ButtonIconTextoStart
                  title={"SALVAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                />
              </div>
            </div>
            <div className="linhas-campos-cadastro2">
              {permissoesAdicionadas.length > 0 && (
                <div className="colunas-permissoes">
                  {permissoesAdicionadas.map((permissao, index) => (
                    <div key={index} className="permissao-adicionada-associado">
                      <div className="perm-list-cad">
                        <div className="nome-permi-button">
                          <label>{permissao} </label>
                          <button>
                            <HighlightOffIcon
                              fontSize={"small"}
                              onClick={() => handleRemovePermissao(permissao)}
                            />
                          </button>
                        </div>
                        <select
                          value={selectedOption}
                          onChange={(e) =>
                            handleOptionPermissaoSelect(
                              permissao,
                              e.target.value
                            )
                          }
                        >
                          <option value="">Selecione uma opção</option>
                          {options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              disabled={permissoesOptions[permissao].includes(
                                option
                              )}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="perm-list-cad2">
                        {permissoesOptions[permissao].map((option) => (
                          <div
                            key={option}
                            className="opcoes-associado-cadastro"
                          >
                            <label>{option}</label>
                            <select>
                              <option>Ler</option>
                              <option>Gravar</option>
                              <option>Ler/Gravar</option>
                            </select>
                            <button
                              onClick={() =>
                                handleRemoveOptionPermissao(permissao, option)
                              }
                            >
                              <HighlightOffIcon fontSize={"small"} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ModalEdicao>
          <ModalEdicao
            titulo="Editar Função"
            isOpen={modalEdicaoOpen}
            onClose={handleCloseModalEdicao}
          >
            <div className="linhas-campos-cadastro">
              <div className="tipo-raca-cadas2">
                <label>Função</label>
                <input></input>
              </div>
              <div className="tipo-raca-cadas">
                <label>Permissão</label>
                <select
                  value={permissaoSelecionada}
                  onChange={(e) => setPermissaoSelecionada(e.target.value)}
                >
                  <option value="">Selecione uma permissão</option>
                  {opcoes.map((opcao, index) => (
                    <option key={index} value={opcao}>
                      {opcao}
                    </option>
                  ))}
                </select>
              </div>
              <div className="buttao-salvar-raca">
                <ButtonIconTextoStart
                   icon={<AddCircleOutlineIcon fontSize={'small'}/>}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                  funcao={handleAdicionar}
                />
              </div>
              <div className="buttao-salvar-raca">
                <ButtonIconTextoStart
                  title={"SALVAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                />
              </div>
            </div>
            <div className="linhas-campos-cadastro2">
              {permissoesAdicionadas.length > 0 && (
                <div className="colunas-permissoes">
                  {permissoesAdicionadas.map((permissao, index) => (
                    <div key={index} className="permissao-adicionada-associado">
                      <div className="perm-list-cad">
                        <div className="nome-permi-button">
                          <label>{permissao} </label>
                          <button>
                            <HighlightOffIcon
                              fontSize={"small"}
                              onClick={() => handleRemovePermissao(permissao)}
                            />
                          </button>
                        </div>
                        <select
                          value={selectedOption}
                          onChange={(e) =>
                            handleOptionPermissaoSelect(
                              permissao,
                              e.target.value
                            )
                          }
                        >
                          <option value="">Selecione uma opção</option>
                          {options.map((option) => (
                            <option
                              key={option}
                              value={option}
                              disabled={permissoesOptions[permissao].includes(
                                option
                              )}
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="perm-list-cad2">
                        {permissoesOptions[permissao].map((option) => (
                          <div
                            key={option}
                            className="opcoes-associado-cadastro"
                          >
                            <label>{option}</label>
                            <button
                              onClick={() =>
                                handleRemoveOptionPermissao(permissao, option)
                              }
                            >
                              <HighlightOffIcon fontSize={"small"} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ModalEdicao>
        </div>
        <div className="tabelas-cadastro-usuarios">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
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

export default Funcao;
