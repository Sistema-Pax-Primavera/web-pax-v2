import React, { useEffect, useState } from "react";
import HeaderVendas from "../header/index";
import "./formulario-contratos.css";
import Pesquisa from "../../../assets/pesquisa.svg";
import PersonIcon from "@mui/icons-material/Person";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Switch from "@mui/material/Switch";
import PetsIcon from "@mui/icons-material/Pets";
import TableCell from "@mui/material/TableCell";
import DateMaskInput from "../inputs";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Carregando from "../carregando";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ConfirmacaoContratos from "../confirmacao-contratos";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { saveAs } from "file-saver";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Documento from "../../../assets/documento.png";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useVendas } from "../../services/api";
import IconeButtonTable from "../../../../pax-associado/src/components/button-icon-texto";
import { converterData } from "../../utils/fuctions";
import ButtonIconTextoStart from "../button-icon-texto-start";
import AcordionPerguntas from "../acordion-perguntas";
import AcordionAvisos from "../acordion-avisos";

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

function cliente(name, filiacao, carencia, falecimento, valor, especie) {
  return { name, filiacao, carencia, falecimento, valor, especie };
}

const dependentes = [
  cliente("Tor", "15/01/2023", "15/01/2025", "00/00/0000", "100,00", "Gator"),
];

const FormularioContratos = () => {
  const [cliente, setCliente] = useState({});
  const [cremacaoAtivada, setCremacaoAtivada] = useState(cliente.is_cremacao);
  const [carenciaAtivada, setCarenciaAtivada] = useState(cliente.is_carencia);
  const location = useLocation();
  const { getContrato } = useVendas();
  const [open, setOpen] = React.useState(false);
  const [showFormulario, setShowFormulario] = useState(false);
  const [mostrarFormularioGerais, setMostrarFormularioGerais] = useState(true);
  const [mostrarFormularioCobranca, setMostrarFormularioCobranca] =
    useState(false);

  const [mostrarFormularioDependentes, setMostrarFormularioDependentes] =
    useState(false);
  const [mostrarFormularioAnexos, setMostrarFormularioAnexos] = useState(false);
  const [mostrarFormularioResidenciais, setMostrarFormularioResidenciais] =
    useState(false);
  const [arquivos, setArquivos] = useState([]);
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [mostrarFormularioComerciais, setMostrarFormularioComerciais] =
    useState(false);
  const [visualizarClicado, setVisualizarClicado] = useState(false);
  const [mostrarBotoes, setMostrarBotoes] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const [showTable, setShowTable] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmButtonClick = () => {
    // Adicione aqui a lógica para lidar com os valores dos inputs após o botão de confirmação ser clicado
    // Pode ser um estado no componente pai, uma chamada de API, etc.
    // Exemplo: setMostrarBotoesConfirmacao(false);
    handleCloseModal();
  };

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
    setFormularioAtivo(formulario);
  };

  const handleSwitchChange = () => {
    console.log(cremacaoAtivada);
    // Atualiza o estado do switch
    setCremacaoAtivada(!cremacaoAtivada);
  };

  const handleSwitchCarencia = () => {
    // Atualiza o estado do switch
    setCarenciaAtivada(!carenciaAtivada);
  };

  const handleNacionalidade = (event) => {
    setNacionalidade(JSON.parse(event.target.value));
  };

  const handleCloseFormulario = () => {
    navigate("/contratos");
    localStorage.setItem("page-venda", "/contratos");
  };

  useEffect(() => {
    const contratoId = location.state;
    setTimeout(() => {
      getContrato(contratoId).then((data) => {
        setCliente(data[0]);
        setCremacaoAtivada(data[0].is_carencia);
        setCremacaoAtivada(data[0].is_cremacao);
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
        )}
        {showFormulario && (
          <div className="avanca-form-volta2">
            <div className="button-retorn">
              <ButtonIconTextoStart
                icon={<ArrowBackIosNewIcon fontSize={"small"} />}
                title="RETORNAR"
                funcao={handleCloseFormulario}
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
              />
            </div>
            <div className="container-contrato-cards">
              <div className="formulario-confirma-cadastros">
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
                          <input type="text" name="nome" value={cliente.nome} />
                        </div>
                        <div className="campos-02-contrato">
                          <label>CPF</label>
                          <input type="text" name="cpf" value={cliente.cpf} />
                        </div>
                        <div className="rg-contrato">
                          <label>RG</label>
                          <input type="text" name="rg" value={cliente.rg} />
                        </div>
                        <div className="campos-03-contrato">
                          <label>Contrato</label>
                          <input
                            type="text"
                            name="contrato"
                            value={cliente.contrato}
                          />
                        </div>
                        <div className="campos-03-contrato">
                          <label>Gênero</label>
                          <select value={cliente.genero}>
                            <option value={null}>Selecione uma opção</option>
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
                          <input
                            type="date"
                            name="data nascimento"
                            value={cliente.data_nascimento}
                          />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Religiao</label>
                          <select value={cliente.religiao}>
                            <option value={null}>Selecione uma opção</option>
                            <option value={cliente.religiao}>
                              {cliente.religiao}
                            </option>
                          </select>
                        </div>
                        <div className="rg-contrato">
                          <label>UF</label>
                          <select value={cliente.uf}>
                            <option value={null}>Selecione uma opção</option>
                            <option value={"MS"}>Mato Grosso do Sul</option>
                            <option value={"SP"}>São Paulo</option>
                            <option value={"PR"}>Parana</option>
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
                          />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Nacionalidade</label>
                          <select
                            value={cliente.nacionalidade}
                            onChange={handleNacionalidade}
                          >
                            <option value={"Brasileiro"}>Brasileiro(a)</option>
                            <option value={"Estrangueiro"}>
                              Estrangueiro(a)
                            </option>
                          </select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Profissão</label>
                          <select value={cliente.profissao}>
                            <option value={null}>Selecione uma opção</option>
                            <option value={cliente.profissao}>
                              {cliente.profissao}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="container-linha">
                        <div className="campos-02-contrato">
                          <label> Estado Civil</label>
                          <select value={cliente.estado_civil}>
                            <option value={null}>Selecione uma opção</option>
                            <option value={cliente.estado_civil}>
                              {cliente.estado_civil}
                            </option>
                          </select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Carência Padrão</label>
                          <Switch
                            checked={carenciaAtivada}
                            onChange={handleSwitchCarencia}
                            size="small"
                          />
                        </div>
                        {!carenciaAtivada && (
                          <>
                            <div className="campos-04-contrato">
                              <label>Data Inicio Carência</label>
                              <input
                                type="date"
                                name="dataInicioCarencia"
                                value={cliente.data_inicio_carencia}
                              />
                            </div>
                            <div className="campos-04-contrato">
                              <label>Data Final Carência</label>
                              <input
                                type="date"
                                name="dataFimCarencia"
                                value={cliente.data_final_carencia}
                              />
                            </div>
                          </>
                        )}
                        <div className="rg-contrato">
                          <label>Cremação</label>
                          <Switch
                            checked={cremacaoAtivada}
                            onChange={handleSwitchChange}
                            size="small"
                          />
                        </div>
                        {cremacaoAtivada && (
                          <div className="campos-02-contrato">
                            <label>Data da Cremação</label>
                            <input
                              type="date"
                              name="dataCremacao"
                              value={cliente.data_cremacao}
                            />
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
                        <div className="campos-02-contrato">
                          <label>CEP</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>UF</label>
                          <select></select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Município</label>
                          <input></input>
                        </div>

                        <div className="campos-02-contrato">
                          <label>Bairro</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Quadra</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Lote</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Nº</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Tipo</label>
                          <select></select>
                        </div>
                      </div>
                      <div className="container-linha">
                        <div className="campos-01-contrato">
                          <label>Rua</label>
                          <input></input>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Complemento</label>
                          <input></input>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {mostrarFormularioComerciais && (
                  <div className="dados-info-contract">
                    <div className="layout-linha">
                      <div className="container-linha">
                        <div className="campos-02-contrato">
                          <label>CEP</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>UF</label>
                          <select></select>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Município</label>
                          <input></input>
                        </div>

                        <div className="campos-02-contrato">
                          <label>Bairro</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Quadra</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Lote</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Nº</label>
                          <input></input>
                        </div>
                        <div className="campo-info-bairro-contrato">
                          <label>Tipo</label>
                          <select></select>
                        </div>
                      </div>
                      <div className="container-linha">
                        <div className="campos-01-contrato">
                          <label>Rua</label>
                          <input></input>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Complemento</label>
                          <input></input>
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
                          <input></input>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Primeria Parcela</label>
                          <input />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Ordem Rota</label>
                          <input></input>
                        </div>
                        <div className="rg-contrato">
                          <label>Contrato</label>
                          <input></input>
                        </div>
                        <div className="campos-02-contrato">
                          <label>Plano</label>
                          <select></select>
                        </div>
                        <div className="campos-03-contrato">
                          <label>Região</label>
                          <select></select>
                        </div>
                      </div>
                      <div className="container-linha">
                        <div className="campos-02-contrato">
                          <label>Transferido</label>
                          <Switch {...label} size="small" />
                        </div>
                        <div className="campos-02-contrato">
                          <label>Pagar Adesão</label>
                          <Switch {...label} size="small" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {mostrarFormularioDependentes && (
                  <div className="dados-info-contract">
                    <div className="tabela-info-contrato">
                      <div className="dependente-pet-humano">
                        {formularioAtivo === "humano" && (
                          <div className="layout-linha-contrato2">
                            <div className="container-linha">
                              <div className="campos-01-contrato ">
                                <label>Nome</label>
                                <input></input>
                              </div>
                              <div className="data-nascimento-contrato">
                                <label>Data Nascimento</label>
                                <DateMaskInput />
                              </div>
                              <div className="data-nascimento-contrato">
                                <label>Data Filiação</label>
                                <DateMaskInput />
                              </div>
                              <div className="campos-02-contrato">
                                <label>CPF</label>
                                <input></input>
                              </div>
                            </div>
                            <div className="container-linha">
                              <div className="campos-02-contrato">
                                <label>Status</label>
                                <input></input>
                              </div>
                              <div className="campos-03-contrato">
                                <label>Valor Adicional</label>
                                <input></input>
                              </div>
                              <div className="data-nascimento-contrato">
                                <label> Falecimento</label>
                                <DateMaskInput />
                              </div>
                              <div className="campos-02-contrato">
                                <label>Parentesco</label>
                                <select></select>
                              </div>
                            </div>
                            <div className="container-linha">
                              <div className="campos-legenda-contrato">
                                <div className="legenda-cremacao-contrato">
                                  <div className="legenda-amarela"></div>
                                  <label>Em Carência</label>
                                  <div className="legenda-roxa"></div>
                                  <label>Falecido</label>
                                  <div className="legenda-laranja"></div>
                                  <label>Filho com 21 Anos</label>
                                  <div className="legenda-vermelho"></div>
                                  <label>Inativo ou Promovido</label>
                                  <div className="legenda-ativo"></div>
                                  <label>Ativo</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {formularioAtivo === "pet" && (
                          <div className="layout-linha-contrato2">
                            <div className="container-linha">
                              <div className="campos-01-contrato">
                                <label>Nome</label>
                                <input></input>
                              </div>
                              <div className="data-nascimento-contrato">
                                <label>Data Nascimento</label>
                                <DateMaskInput />
                              </div>
                              <div className="data-nascimento-contrato">
                                <label>Data Filiação</label>
                                <DateMaskInput />
                              </div>
                              <div className="rg-contrato">
                                <label>Peso</label>
                                <input></input>
                              </div>
                              <div className="rg-contrato">
                                <label>Altura</label>
                                <input></input>
                              </div>
                            </div>
                            <div className="container-linha">
                              <div className="campos-02-contrato">
                                <label>Espécie</label>
                                <select></select>
                              </div>
                              <div className="rg-contrato">
                                <label>Cor</label>
                                <input></input>
                              </div>
                              <div className="campos-02-contrato">
                                <label>Raça</label>
                                <select></select>
                              </div>
                              <div className="campos-02-contrato">
                                <label>Porte</label>
                                <select></select>
                              </div>
                              <div className="campos-02-contrato">
                                <label>Modalidade</label>
                                <select></select>
                              </div>

                              <div className="data-nascimento-contrato">
                                <label> Falecimento</label>
                                <DateMaskInput />
                              </div>
                            </div>
                            <div className="container-linha">
                              <div className="campos-legenda-contrato">
                                <div className="legenda-cremacao-contrato">
                                  <div className="legenda-amarela"></div>
                                  <label>Em Carência</label>
                                  <div className="legenda-roxa"></div>
                                  <label>Falecido</label>
                                  <div className="legenda-laranja"></div>
                                  <label>Filho com 21 Anos</label>
                                  <div className="legenda-vermelho"></div>
                                  <label>Inativo ou Promovido</label>
                                  <div className="legenda-ativo"></div>
                                  <label>Ativo</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="button-pet-humano">
                          <button
                            className={
                              formularioAtivo === "pet" ? "active" : ""
                            }
                            onClick={() => alternarFormulario("pet")}
                          >
                            <PetsIcon fontSize={"small"} /> PET
                          </button>
                          <button
                            className={
                              formularioAtivo === "humano" ? "active" : ""
                            }
                            onClick={() => alternarFormulario("humano")}
                          >
                            <AccessibilityNewIcon fontSize={"small"} />
                            HUMANO
                          </button>
                        </div>
                      </div>
                      <div className="container-linha2">
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ maxWidth: 900 }}
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
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
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

                                  <button onClick={handleOpen}>
                                    VISUALIZAR
                                  </button>
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
                                        <div className="fecha-pdf-contrato">
                                          <button onClick={handleClose}>
                                            <HighlightOffIcon
                                              fontSize={"small"}
                                            />
                                          </button>
                                        </div>
                                      </Typography>
                                      <Typography>
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
              <div className="formulario-contratos-contratos">
                <ConfirmacaoContratos
                  tipo={"Contrato Novo"}
                  data={converterData(cliente.data_contrato)}
                  mostrarBotoes={mostrarBotoes}
                  onOpenModal={handleOpenModal}
                />
              </div>
              {isModalOpen && (
                <Modal onClose={handleCloseModal}>
                  {/* Conteúdo da sua modal */}
                  <label>Input 1:</label>
                  <input
                    type="text"
                    value={input1}
                    onChange={(e) => setInput1(e.target.value)}
                  />
                  <label>Input 2:</label>
                  <input
                    type="text"
                    value={input2}
                    onChange={(e) => setInput2(e.target.value)}
                  />
                  <button onClick={handleConfirmButtonClick}>Confirmar</button>
                </Modal>
              )}
            </div>
            <div className="perguntas-avisos-pendentes">
              <div className="perguntas-pendentes-vendas">
                <AcordionPerguntas />
              </div>
              <div className="perguntas-pendentes-vendas">
                <AcordionAvisos />
              </div>
            </div>

            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default FormularioContratos;
