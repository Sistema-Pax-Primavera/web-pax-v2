import React, { useEffect, useState } from "react";
import "./formulario-pos-venda.css";
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
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useVendas } from "../../services/api";
import IconeButtonTable from "../../../../pax-associado/src/components/button-icon-texto";
import PersonIcon from "@mui/icons-material/Person";
import AcordionPerguntas from "../acordion-perguntas";
import EditIcon from "@mui/icons-material/Edit";
import ButtonIconTextoStart from "../button-icon-texto-start";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Luiza Vasconcelos", "20/05/2024", "20/05/2025", 100),
  createData("José Vasconcelos", "20/05/2024", "20/05/2025", 100),
  createData("Eduarda Vasconcelos", "20/05/2024", "20/05/2025", 100),
];

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

const FormularioPosVenda = () => {
  const [cliente, setCliente] = useState({});
  const location = useLocation();
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
  const [formularioAberto, setFormularioAberto] = useState(false);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };


  const handleDelete = () => {
    setFile(null);
  };

  const handleDownload = () => {
    // Implement download logic here
    // For example, you can use window.open() to download the file
  };

  const handleEditClick = () => {
    // Define o estado para indicar que o formulário deve ser exibido
    setFormularioAberto(true);
    // Você pode adicionar mais lógica aqui, como preencher o formulário com os dados da linha clicada
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

  // useEffect(() => {
  //   const contratoId = location.state;
  //   setTimeout(() => {
  //     getContrato(contratoId).then((data) => {
  //       setCliente(data[0]);
  //     });
  //   }, 3000);
  // }, []);

  return (
    <div className="container-formulario-pos-venda">
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
              className={mostrarFormularioResidenciais ? "" : "botao-ativo"}
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
              className={mostrarFormularioDependentes ? "" : "botao-ativo"}
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
            <div className="layout-linha-pos">
              <div className="layout-linha">
                <div className="container-linha">
                  <div className="campos-01-contrato">
                    <label>Nome</label>
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>CPF</label>
                    <input />
                  </div>
                  <div className="rg-contrato">
                    <label>RG</label>
                    <input />
                  </div>
                  <div className="campos-03-contrato">
                    <label>Contrato</label>
                    <input />
                  </div>
                  <div className="campos-03-contrato">
                    <label>Gênero</label>
                    <select></select>
                  </div>
                </div>
                <div className="container-linha">
                  <div className="data-nascimento-contrato">
                    <label>Data Nascimento</label>
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>Religiao</label>
                    <select></select>
                  </div>
                  <div className="campos-02-contrato">
                    <label>UF</label>
                    <select></select>
                  </div>
                  <div className="campos-02-contrato">
                    <label>Naturalidade</label>
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>Nacionalidade</label>
                    <select></select>
                  </div>
                  <div className="campos-02-contrato">
                    <label>Profissão</label>
                    <select></select>
                  </div>
                </div>
                <div className="container-linha">
                  <div className="campos-02-contrato">
                    <label> Estado Civil</label>
                    <select></select>
                  </div>
                  <div className="campos-02-contrato">
                    <label>Carência Padrão</label>
                    <Switch />
                  </div>
                  {!carenciaAtivada && (
                    <>
                      <div className="campos-04-contrato">
                        <label>Data Inicio Carência</label>
                        <input />
                      </div>
                      <div className="campos-04-contrato">
                        <label>Data Final Carência</label>
                        <input />
                      </div>
                    </>
                  )}
                  <div className="rg-contrato">
                    <label>Cremação</label>
                    <Switch />
                  </div>
                  {cliente.data_cremacao && (
                    <div className="campos-02-contrato">
                      <label>Data da Cremação</label>
                      <input />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {mostrarFormularioResidenciais && (
            <div className="layout-linha-pos">
              <div className="layout-linha">
                <div className="container-linha">
                  <div className="campo-info-bairro-contrato">
                    <label>CEP</label>
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>UF</label>
                    <select></select>
                  </div>
                  <div className="campos-02-contrato">
                    <label>Município</label>
                    <input />
                  </div>

                  <div className="campos-02-contrato">
                    <label>Bairro</label>
                    <input />
                  </div>
                  <div className="campo-info-bairro-contrato">
                    <label>Quadra</label>
                    <input />
                  </div>
                  <div className="campo-info-bairro-contrato">
                    <label>Lote</label>
                    <input />
                  </div>
                  <div className="campo-info-bairro-contrato">
                    <label>Nº</label>
                    <input />
                  </div>
                  <div className="campo-info-bairro-contrato">
                    <label>Tipo</label>
                    <select></select>
                  </div>
                </div>
                <div className="container-linha">
                  <div className="campos-01-contrato">
                    <label>Rua</label>
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>Complemento</label>
                    <input />
                  </div>
                </div>
              </div>
            </div>
          )}

          {mostrarFormularioCobranca && (
            <div className="layout-linha-pos">
              <div className="layout-linha-pos">
                <div className="container-linha">
                  <div className="campos-02-contrato">
                    <label>Dia de Pagamento </label>
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>Primeria Parcela</label>
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>Ordem Rota</label>
                    <input />
                  </div>
                  <div className="rg-contrato">
                    <label>Contrato</label>
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>Plano</label>
                    <input />
                  </div>
                  <div className="campos-03-contrato">
                    <label>Região</label>
                    <input />
                  </div>
                </div>
                <div className="container-linha">
                  <div className="campos-02-contrato">
                    <label>Transferido</label>
                    <Switch />
                  </div>
                  <div className="campos-02-contrato">
                    <label>Pagar Adesão</label>
                    <Switch />
                  </div>
                </div>
              </div>
            </div>
          )}
          {mostrarFormularioDependentes && (
            <div className="layout-linha-pos">
              <div className="dados-info-contract">
                <div className="tabela-info-contrato">
                  <div className="container-linha2">
                    {formularioAberto && (
                      <div>
                        <div className="layout-linha">
                          <div className="container-linha">
                            <div className="campos-01-venda-pos-venda">
                              <label>Nome</label>
                              <input />
                            </div>
                            <div className="campos-02-pos-venda">
                              <label>Data Nascimento</label>
                              <input />
                            </div>
                            <div className="data-filiacao-03-pos">
                              <label>Data Filiação</label>
                              <input />
                            </div>
                            <div className="campos-02-pos-venda">
                              <label>CPF</label>
                              <input />
                            </div>
                            <div className="campos-02-pos-venda">
                              <label>Parentesco</label>
                              <select></select>
                            </div>
                          </div>
                          <div className="container-linha">
                            <div className="campos-04-pos">
                              <label>Status</label>
                              <input />
                            </div>
                            <div className="campos-02-pos-venda">
                              <label>Valor Adicional</label>
                              <input />
                            </div>
                            <div className="campos-02-pos-venda">
                              <label> Falecimento</label>
                              <input></input>
                            </div>

                            <div className="salva-dependentes"></div>
                          </div>
                          <div className="container-linha">
                            <div className="campos-legenda">
                              <div className="legenda-cremacao">
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
                      </div>
                    )}
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontSize: 12 }}>Nome</TableCell>
                            <TableCell align="center" sx={{ fontSize: 12 }}>
                              Filiação
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: 12 }}>
                              Fim Carência
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: 12 }}>
                              Valor
                            </TableCell>
                            <TableCell align="center" sx={{ fontSize: 12 }}>
                              Ações
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {row.name}
                              </TableCell>
                              <TableCell align="center" sx={{ fontSize: 12 }}>
                                {row.calories}
                              </TableCell>
                              <TableCell align="center" sx={{ fontSize: 12 }}>
                                {row.fat}
                              </TableCell>
                              <TableCell align="center" sx={{ fontSize: 12 }}>
                                {row.carbs}
                              </TableCell>
                              <TableCell
                                align="center"
                                sx={{
                                  alignItems: "center",
                                  display: "flex",
                                  width: "50%",
                                  justifyContent: "center",
                                }}
                              >
                                <div className="edit-table-pos">
                                  <ButtonIconTextoStart
                                    icon={<EditIcon fontSize={"small"} />}
                                    corFundoBotao={"#006b33"}
                                    corTextoBotao={"#ffff"}
                                    width="20px"
                                    funcao={handleEditClick}
                                  />
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
                            <PostAddIcon fontSize="large" />
                            <input
                              type="file"
                              onChange={handleFileChange}
                              style={{ display: "none" }}
                            />
                            <a
                              onClick={() =>
                                document
                                  .querySelector('input[type="file"]')
                                  .click()
                              }
                            >
                              <button >ANEXAR</button>
                            </a>

                          </div>
                        </div>
                        <div className="document2">
                          {file && (
                            <div>
                              <div className="contrato-associados">
                                <label>{file.name}</label>
                                <div className="baixa-delete-contrato">
                                  <div className="deleta-contrato">
                                    <button onClick={handleDelete}>
                                      <DeleteForeverIcon fontSize="small" />
                                    </button>
                                  </div>
                                  <div className="baixa-contrato">
                                    <button onClick={handleDownload}>
                                      <CloudDownloadIcon fontSize="small" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
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
          <AcordionPerguntas />
        </div>
      </div>
    </div>
  );
};

export default FormularioPosVenda;
