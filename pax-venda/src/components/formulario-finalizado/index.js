import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Switch from "@mui/material/Switch";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Carregando from "../carregando";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Paper from "@mui/material/Paper";
import PostAddIcon from "@mui/icons-material/PostAdd";
import "react-toastify/dist/ReactToastify.css";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Documento from "../../../assets/documento.png";
import "./formulario-finalizados.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useVendas } from "../../services/api";
import IconeButtonTable from "../../../../pax-associado/src/components/button-icon-texto";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: 5,
  p: 4,
};

const label = { inputProps: { "aria-label": "Switch demo" } };

function createData(id, nome, vendedor, unidade, data, tipo, status) {
  return { id, nome, vendedor, unidade, data, tipo, status };
}

function cliente(name, filiacao, carencia, falecimento, valor, especie, opcao) {
  return { name, filiacao, carencia, falecimento, valor, especie, opcao };
}

const dependentes = [
  cliente("Tor", "15/01/2023", "15/01/2025", "00/00/0000", "100,00", "Gator"),
];

const FormularioContratosFinalizados = () => {
  const [cliente, setCliente] = useState({});
  const location = useLocation();
  const [clienteEditado, setClienteEditado] = useState({});
  const [clienteInicial, setClienteInicial] = useState({});
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [nacionalidade, setNacionalidade] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [contratoSelecionado, setContratoSelecionado] = useState(null);
  const [showFormulario, setShowFormulario] = useState(false);
  const [mostrarFormularioGerais, setMostrarFormularioGerais] = useState(true);
  const [mostrarFormularioCobranca, setMostrarFormularioCobranca] =
    useState(false);
  const [cremacaoAtivada, setCremacaoAtivada] = useState(false);
  const [carenciaAtivada, setCarenciaAtivada] = useState(false);
  const [mostrarFormularioDependentes, setMostrarFormularioDependentes] =
    useState(false);
  const [mostrarFormularioAnexos, setMostrarFormularioAnexos] = useState(false);
  const [mostrarFormularioResidenciais, setMostrarFormularioResidenciais] =
    useState(false);
  const [arquivos, setArquivos] = useState([]);
  const [mostrarFormularioComerciais, setMostrarFormularioComerciais] =
    useState(false);
  const [mostrarBotoes, setMostrarBotoes] = useState(false);
  const { getContrato } = useVendas();

  const handleOpen = () => {
    setMostrarBotoes(true);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const mostrarFormulario = (tipo) => {
    setMostrarFormularioGerais(tipo === "dados-gerais");
    setMostrarFormularioResidenciais(tipo === "dados-residencias");
    setMostrarFormularioCobranca(tipo === "dados-cobranca");
    setMostrarFormularioComerciais(tipo === "dados-comerciais");
    setMostrarFormularioDependentes(tipo == "dependentes");
    setMostrarFormularioAnexos(tipo === "anexos");
  };

  const [formularioAtivo, setFormularioAtivo] = useState("humano");

  const alternarFormulario = (formulario) => {
    console.log(formulario);
    setFormularioAtivo(formulario);
  };

  const handleCheckboxUpdate = (campo) => {
    setCheckboxStatus((prevState) => ({
      ...prevState,
      [campo]: true,
    }));
  };

  const handleSwitchChange = () => {
    // Verifica se o campo contém algum item
    if (cliente && cliente.item) {
      // Ativa o switch e desativa
      setCremacaoAtivada(false);
    } else {
      // Desativa o switch e desativa
      setCremacaoAtivada(false);
    }

    // Verifica se o campo de carência contém algum item
    if (
      cliente &&
      cliente.data_inicio_carencia &&
      cliente.data_final_carencia
    ) {
      // Ativa o switch de carência e desativa
      setCarenciaAtivada(true);
    } else {
      // Desativa o switch de carência e desativa
      setCarenciaAtivada(false);
    }
  };

  const handleSwitchCremação = () => {
    // Verifica se o campo contém a data da cremação
    if (cliente && cliente.data_cremacao) {
      // Ativa o switch de cremação
      setCremacaoAtivada(true);
    } else {
      // Desativa o switch de cremação
      setCremacaoAtivada(false);
    }
  };

  const handleCloseFormulario = () => {
    navigate("/contratos-finalizados");
    localStorage.setItem("page-venda", "/contratos-finalizados");
  };

  const handleNacionalidade = (event) => {
    setNacionalidade(JSON.parse(event.target.value));
  };

  useEffect(() => {
    const contratoId = location.state;
    setTimeout(() => {
      getContrato(contratoId).then((data) => {
        setCliente(data[0]);
        setCremacaoAtivada(data[0].is_carencia)
        setCremacaoAtivada(data[0].is_cremacao)
      });
      setShowLoading(false);
      setShowFormulario(true);
    }, 3000);
  }, []);

  return (
    <div className="container-contratos-vendas1">
      <div className="clientes-contrato-venda1">
        {showLoading && (
          <div className="carregando-projetos">
            <Carregando />
          </div>
        )}{" "}
        {showFormulario && (
          <div className="avanca-form-volta4">
            <div className="button-retorn">
              <IconeButtonTable title="RETORNAR" funcao={handleCloseFormulario} icon={<ArrowBackIosNewIcon fontSize={"small"} />} />
            </div>
            <div className="container-contrato-cards">
              <div className="formulario-confirma-finalizados">
                <div className="botaos-nav-contrato">
                  <button
                    className={mostrarFormularioGerais ? "" : "botao-ativo"}
                    onClick={() => mostrarFormulario("dados-gerais")}
                  >
                    <PersonIcon fontSize={"small"} /> Dados Cadastrais
                  </button>
                  <button
                    className={
                      mostrarFormularioResidenciais ? "" : "botao-ativo"
                    }
                    onClick={() => mostrarFormulario("dados-residencias")}
                  >
                    <AddHomeWorkIcon fontSize={"small"} /> Dados Residenciais
                  </button>
                  <button
                    className={mostrarFormularioCobranca ? "" : "botao-ativo"}
                    onClick={() => mostrarFormulario("dados-cobranca")}
                  >
                    <MonetizationOnIcon fontSize={"small"} /> Dados Cobrança
                  </button>
                  <button
                    className={
                      mostrarFormularioDependentes ? "" : "botao-ativo"
                    }
                    onClick={() => mostrarFormulario("dependentes")}
                  >
                    <AccessibilityNewIcon fontSize={"small"} /> Dependentes
                  </button>
                  <button
                    className={mostrarFormularioAnexos ? "" : "botao-ativo"}
                    onClick={() => mostrarFormulario("anexos")}
                  >
                    <SaveIcon fontSize={"small"} /> Anexos
                  </button>
                </div>
                {mostrarFormularioGerais && (
                  <div className="dados-info-contract">
                    <div className="layout-linha">
                      <div className="container-linha">
                        <div className="campos-01-contrato">
                          <label>Nome</label>
                          <input value={cliente.nome} disabled />
                        </div>
                        <div className="campos-02-contrato">
                          <label>CPF</label>
                          <input value={cliente.cpf} disabled />
                        </div>
                        <div className="rg-contrato">
                          <label>RG</label>
                          <input value={cliente.rg} disabled />
                        </div>
                        <div className="campos-03-contrato">
                          <label>Contrato</label>
                          <input value={cliente.contrato} disabled />
                        </div>
                        <div className="campos-03-contrato">
                          <label>Gênero</label>
                          <select value={cliente.genero} disabled>
                            <option value={"Masculino"}>Masculino</option>
                            <option value={"Feminino"}>Feminino</option>
                            <option value={"Nao Binario"}>Não Binario</option>
                            <option value={"Nao Informado"}>
                              Não Informado
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="container-linha">
                        <div className="data-nascimento-contrato">
                          <label>Data Nascimento</label>
                          <input type="date" value={cliente.data_nascimento} disabled />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Religiao</label>
                          <select value={cliente.religiao} disabled>
                            <option value={cliente.religiao}>
                              {cliente.religiao}
                            </option>
                          </select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>UF</label>
                          <select value={cliente.uf} disabled>
                            <option value={"MS"}>Mato Grosso do Sul</option>
                            <option value={"SP"}>São Paulo</option>
                            <option value={"RJ"}>Rio de Janeiro</option>
                            <option value={"MT"}>Mato Grosso</option>
                          </select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Naturalidade</label>
                          <input
                            type="text"
                            name="contrato"
                            value={cliente.naturalidade}
                            disabled
                          />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Nacionalidade</label>
                          <select
                            value={cliente.nacionalidade}
                            onChange={handleNacionalidade}
                            disabled
                          >
                            <option value={"Brasileiro"}>Brasileiro(a)</option>
                            <option value={"Estrangueiro"}>
                              Estrangueiro(a)
                            </option>
                          </select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Profissão</label>
                          <select value={cliente.profissao} disabled>
                            <option value={cliente.profissao}>
                              {cliente.profissao}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="container-linha">
                        <div className="campos-02-contrato">
                          <label> Estado Civil</label>
                          <select value={cliente.estado_civil} disabled>
                            <option value={cliente.estado_civil}>
                              {cliente.estado_civil}
                            </option>
                          </select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Carência Padrão</label>
                          <Switch
                            checked={cremacaoAtivada}
                            onChange={handleSwitchChange}
                            size="small"
                            disabled={!cremacaoAtivada}
                          />
                        </div>
                        {!carenciaAtivada && (
                          <>
                            <div className="campos-04-contrato">
                              <label>Data Inicio Carência</label>
                              <input
                                type="date"
                                value={cliente.data_inicio_carencia}
                                disabled
                              />
                            </div>
                            <div className="campos-04-contrato">
                              <label>Data Final Carência</label>
                              <input
                                type="date"
                                value={cliente.data_final_carencia}
                                disabled
                              />
                            </div>
                          </>
                        )}
                        <div className="rg-contrato">
                          <label>Cremação</label>
                          <Switch
                            checked={cremacaoAtivada}
                            onChange={handleSwitchCremação}
                            size="small"
                            disabled
                          />
                        </div>
                        {cliente.data_cremacao && (
                          <div className="campos-02-contrato">
                            <label>Data da Cremação</label>
                            <input type="date" value={cliente.data_cremacao} disabled />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {mostrarFormularioResidenciais && (
                  <div className="dados-info-contract">
                    <div className="layout-linha">
                      <div className="container-linha">
                        <div className="campo-info-bairro-contrato">
                          <label>CEP</label>
                          <input value={cliente.cep_residencia} disabled />
                        </div>
                        <div className="campos-02-contrato">
                          <label>UF</label>
                          <select value={cliente.uf_residencia} disabled>
                            <option value={"MS"}>Mato Grosso do Sul</option>
                            <option value={"SP"}>São Paulo</option>
                            <option value={"RJ"}>Rio de Janeiro</option>
                            <option value={"MT"}>Mato Grosso</option>
                          </select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Município</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.municipio_residencia}
                            disabled
                          />
                        </div>

                        <div className="campos-02-contrato">
                          <label>Bairro</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.bairro_residencia}
                            disabled
                          />
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Quadra</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.quadra_residencia}
                            disabled
                          />
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Lote</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.lote_residencia}
                            disabled
                          />
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Nº</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.numero_residencia}
                            disabled
                          />
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Tipo</label>
                          <select value={cliente.tipo_residencia} disabled>
                            <option value={cliente.tipo_residencia}>
                              {cliente.tipo_residencia}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="container-linha">
                        <div className="campos-01-contrato">
                          <label>Rua</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.rua_residencia}
                            disabled
                          />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Complemento</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.complemento_residencia}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {mostrarFormularioCobranca && (
                  <div className="dados-info-contract">
                    <div className="layout-linha-contrato">
                      <div className="container-linha">
                        <div className="campos-02-contrato">
                          <label>Dia de Pagamento </label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.dia_pagamento}
                            disabled
                          />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Primeria Parcela</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.primeira_parcela}
                            disabled
                          />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Ordem Rota</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.ordem_rota}
                            disabled
                          />
                        </div>
                        <div className="rg-contrato">
                          <label>Contrato</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.contrato_cobranca}
                            disabled
                          />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Plano</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.plano}
                            disabled
                          />
                        </div>
                        <div className="campos-03-contrato">
                          <label>Região</label>
                          <input
                            type="text"
                            name="municipio"
                            value={cliente.regiao}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="container-linha">
                        <div className="campos-02-contrato">
                          <label>Transferido</label>
                          <Switch
                            checked={cliente?.isTransferido}
                            size="small"
                            disabled={!cliente?.isTransferido}
                          />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Pagar Adesão</label>
                          <Switch

                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {mostrarFormularioDependentes && (
                  <div className="layout-linha-contrato">
                    <div className="dados-info-contract">
                      <div className="tabela-info-contrato">
                        <div className="container-linha2">
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ maxWidth: 1100 }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Nome</TableCell>
                                  <TableCell align="center">Filiação</TableCell>
                                  <TableCell align="center">
                                    Fim Carência
                                  </TableCell>
                                  <TableCell align="center">
                                    Falecimento
                                  </TableCell>
                                  <TableCell align="center">Valor</TableCell>
                                  <TableCell align="center">Espécie</TableCell>
                                  <TableCell align="center">Opções</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {dependentes.map((dependente) => (
                                  <TableRow
                                    key={dependente.name}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {dependente.name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {dependente.filiacao}
                                    </TableCell>
                                    <TableCell align="center">
                                      {dependente.carencia}
                                    </TableCell>
                                    <TableCell align="center">
                                      {dependente.falecimento}
                                    </TableCell>
                                    <TableCell align="center">
                                      {dependente.valor}
                                    </TableCell>
                                    <TableCell align="center">
                                      {dependente.especie}
                                    </TableCell>
                                    <TableCell align="center">
                                      {dependente.opcao}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {mostrarFormularioAnexos && (
                  <div className="dados-info-contract">
                    <div className="layout-linha">
                      <div className="container-contratos">
                        <div className="tipo-contrato-associado">
                          <div className="container-contratos">
                            <div className="tipo-contrato-associado">
                              <div className="contrato-associados-anexo">
                                <label>Arquivo</label>
                                <div className="document">
                                  <a>
                                    <PostAddIcon fontSize={"large"} />
                                  </a>

                                  <button>VISUALIZAR</button>
                                  <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Box sx={style}>
                                      <Typography
                                        id="modal-modal-title"
                                        variant="h6"
                                        component="h2"
                                      >
                                        <div className="documento-anexo">
                                          <img src={Documento}></img>
                                        </div>
                                      </Typography>
                                    </Box>
                                  </Modal>
                                </div>
                              </div>

                              <div className="document2">
                                {arquivos.map((arquivo, index) => (
                                  <div key={index}>
                                    <div className="contrato-associados">
                                      <TaskIcon />
                                      <label> {arquivo.name}</label>
                                      <div className="baixa-delete-contrato">
                                        <div className="deleta-contrato">
                                          <button
                                            onClick={() =>
                                              handleExcluirClick(index)
                                            }
                                          >
                                            <DeleteIcon fontSize={"small"} />
                                          </button>
                                        </div>
                                        <div className="baixa-contrato">
                                          <button
                                            onClick={() =>
                                              handleDownloadClick(arquivo)
                                            }
                                          >
                                            <DownloadIcon fontSize={"small"} />
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div>
                            <ul></ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioContratosFinalizados;
