import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import DateMaskInput from "../../components/inputs";
import "./formulario.css";
import Switch from "@mui/material/Switch";
import PetsIcon from "@mui/icons-material/Pets";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TaskIcon from "@mui/icons-material/Task";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { saveAs } from "file-saver";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FormularioConfirmacao from "../formulario-confirmacao";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SaveIcon from "@mui/icons-material/Save";
import ButtonText from "../../../../pax-associado/src/components/button-texto";
import DeleteIcon from '@mui/icons-material/Delete';
import ButtonIcon  from '../../../../pax-associado/src/components/button-icon'
const label = { inputProps: { "aria-label": "Switch demo" } };
import DownloadIcon from '@mui/icons-material/Download';

function createData(name, filiacao, carencia, falecimento, valor, especie) {
  return { name, filiacao, carencia, falecimento, valor, especie };
}

const rows = [
  createData(
    "Tor",
    "15/01/2023",
    "15/01/2025",
    "00/00/0000",
    "100,00",
    "Gator"
  ),
];

const Formulario = ({ dadosContrato = {} }) => {
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
  const [mostrarFormularioComerciais, setMostrarFormularioComerciais] =
    useState(false);
  const [arquivos, setArquivos] = useState([]);
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [dadosCadastrais, setDadosCadastrais] = useState({
    nome: dadosContrato.titular || "",
    dataNascimento: "",
    dataContrato: "",
    cpf: "",
    rg: "",
    profissao: "",
    naturalidade: "",
    nacionalidade: "",
    cep: "",
    uf: "",
    municipio: "",
    bairro: "",
    tipoRua: "",
    rua: "",
    quadra: "",
    lote: "",
    numero: "",
    complemento: "",
    religiao: "",
    estadoCivil: "",
    genero: "",
  });

  const mostrarFormulario = (tipo) => {
    setMostrarFormularioGerais(tipo === "dados-gerais");
    setMostrarFormularioResidenciais(tipo === "dados-residencias");
    setMostrarFormularioComerciais(tipo === "dados-comerciais");
    setMostrarFormularioCobranca(tipo === "dados-cobranca");
    setMostrarFormularioDependentes(tipo == "dependentes");
    setMostrarFormularioAnexos(tipo === "anexos");
  };

  const [formularioAtivo, setFormularioAtivo] = useState("humano");

  const alternarFormulario = (formulario) => {
    setFormularioAtivo(formulario);
  };

  const handleProcurarChange = (event) => {
    setArquivoSelecionado(event.target.files[0]);
  };

  const handleAnexarClick = () => {
    if (arquivoSelecionado) {
      setArquivos([...arquivos, arquivoSelecionado]);
      setArquivoSelecionado(null); // Limpar o arquivo selecionado após anexar
    }
  };

  const handleExcluirClick = (index) => {
    const novosArquivos = [...arquivos];
    novosArquivos.splice(index, 1);
    setArquivos(novosArquivos);
  };

  const handleDownloadClick = (arquivo) => {
    saveAs(arquivo, arquivo.name); // Utilizar a função saveAs para fazer o download
  };

  const [checkboxStatus, setCheckboxStatus] = useState({
    dadosGerais: false,
    dadosResidenciais: false,
    dadosComerciais: false,
    cobranca: false,
    dependentes: false,
    anexos: false,
  });

  const handleCheckboxUpdate = (campo) => {
    setCheckboxStatus((prevState) => ({
      ...prevState,
      [campo]: true,
    }));
  };

  const handleSalvarClick = () => {
    // Lógica para salvar os dados gerais

    // Atualizar o estado da checkbox de dados gerais
    handleCheckboxUpdate("dadosGerais");
  };

  const handleSalvarResidenciais = () => {
    // Lógica para salvar os dados de cobrança

    // Atualizar o estado da checkbox de cobrança
    handleCheckboxUpdate("dadosResidenciais");
  };

  const handleSalvarComerciais = () => {
    // Lógica para salvar os dados de cobrança

    // Atualizar o estado da checkbox de cobrança
    handleCheckboxUpdate("dadosComerciais");
  };

  const handleSalvarCobranca = () => {
    // Lógica para salvar os dados de cobrança

    // Atualizar o estado da checkbox de cobrança
    handleCheckboxUpdate("cobranca");
  };

  const handleSalvarDependentes = () => {
    // Lógica para salvar os dados dos dependentes

    // Atualizar o estado da checkbox de dependentes
    handleCheckboxUpdate("dependentes");
  };

  const handleSalvarAnexo = () => {
    // Lógica para salvar os anexos

    // Atualizar o estado da checkbox de anexos
    handleCheckboxUpdate("anexos");
  };

  const handleSwitchChange = () => {
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

  return (
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
            className={mostrarFormularioResidenciais ? "" : "botao-ativo"}
            onClick={() => mostrarFormulario("dados-residencias")}
          >
            <AddHomeWorkIcon fontSize={"small"} /> Dados Residenciais
          </button>
          <button
            className={mostrarFormularioComerciais ? "" : "botao-ativo"}
            onClick={() => mostrarFormulario("dados-comerciais")}
          >
            <ApartmentIcon fontSize={"small"} /> Dados Comerciais
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
          <div className="dados-info-contract">
            <div className="layout-linha">
              <div className="container-linha">
                <div className="campos-01-contrato">
                  <label>Nome</label>
                  <input
                    value={dadosCadastrais.nome}
                    onChange={(e) =>
                      setDadosCadastrais({
                        ...dadosCadastrais,
                        nome: e.target.value,
                      })
                    }
                  />
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
                  <input></input>
                </div>
                <div className="campos-03-contrato">
                  <label>Gênero</label>
                  <select></select>
                </div>
              </div>
              <div className="container-linha">
                <div className="data-nascimento-contrato">
                  <label>Data Nascimento</label>
                  <DateMaskInput />
                </div>
                <div className="campos-02-contrato">
                  <label>Religiao</label>
                  <select></select>
                </div>
                <div className="rg-contrato">
                  <label>UF</label>
                  <select></select>
                </div>
                <div className="campos-02-contrato">
                  <label>Naturalidade</label>
                  <input></input>
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
                  <select />
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
                      <DateMaskInput />
                    </div>
                    <div className="campos-04-contrato">
                      <label>Data Final Carência</label>
                      <DateMaskInput />
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
                    <DateMaskInput />
                  </div>
                )}
                <div className="salva-dependentes">
                  <ButtonText title="SALVAR" funcao={handleSalvarClick} />
                </div>
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
                <div className="salvar-associado-contrato">
                  <ButtonText
                    title="SALVAR"
                    funcao={handleSalvarResidenciais}
                  />
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
                <div className="salvar-associado-contrato">
                  <ButtonText title="SALVAR" funcao={handleSalvarComerciais} />
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
                <div className="salvar-associado-contrato">
                  <ButtonText title="SALVAR" funcao={handleSalvarCobranca} />
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
                      <div className="salva-dependentes">
                        <ButtonText
                          title="SALVAR"
                          funcao={handleSalvarDependentes}
                        />
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

                      <div className="salva-dependentes">
                        <ButtonText
                          title="SALVAR"
                          funcao={handleSalvarDependentes}
                        />
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
                    className={formularioAtivo === "pet" ? "active" : ""}
                    onClick={() => alternarFormulario("pet")}
                  >
                    <PetsIcon fontSize={"small"} /> PET
                  </button>
                  <button
                    className={formularioAtivo === "humano" ? "active" : ""}
                    onClick={() => alternarFormulario("humano")}
                  >
                    <AccessibilityNewIcon fontSize={"small"} />
                    HUMANO
                  </button>
                </div>
              </div>
              <div className="container-linha2">
                <TableContainer component={Paper}>
                  <Table sx={{ maxWidth: 900 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell align="center">Filiação</TableCell>
                        <TableCell align="center">Fim Carência</TableCell>
                        <TableCell align="center">Falecimento</TableCell>
                        <TableCell align="center">Valor</TableCell>
                        <TableCell align="center">Espécie</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="center">{row.filiacao}</TableCell>
                          <TableCell align="center">{row.carencia}</TableCell>
                          <TableCell align="center">
                            {row.falecimento}
                          </TableCell>
                          <TableCell align="center">{row.valor}</TableCell>
                          <TableCell align="center">{row.especie}</TableCell>
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
                        <label>Adicionar</label>
                        <div className="document">
                          <a>
                            <PostAddIcon fontSize={"large"} />
                          </a>
                          <input type="file" onChange={handleProcurarChange} />
                          <ButtonText
                            title="ANEXAR"
                            funcao={handleAnexarClick}
                          />
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
                                    onClick={() => handleExcluirClick(index)}
                                  >
                                    <DeleteIcon fontSize={"small"} />
                                  </button>
                                </div>
                                <div className="baixa-contrato">
                                  <ButtonIcon
                                    funcao={() => handleDownloadClick(arquivo)}
                                    icon={<DownloadIcon fontSize={"small"} />}
                                  />
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
              <div className="salva-anexo-formulario">
                <ButtonText title="SALVAR" funcao={handleSalvarAnexo} />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="formulario2-confirmacao">
        <FormularioConfirmacao checkboxStatus={checkboxStatus} />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Formulario;
