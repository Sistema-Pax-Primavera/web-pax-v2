import React, { useEffect, useState } from "react";
import "./cards-mov-diaria.css";
import PersonIcon from "@mui/icons-material/Person";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SaveIcon from "@mui/icons-material/Save";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Switch from "@mui/material/Switch";
import ButtonText from "../../../../pax-associado/src/components/button-texto";
import PetsIcon from "@mui/icons-material/Pets";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskIcon from "@mui/icons-material/Task";
import ButtonIcon  from '../../../../pax-associado/src/components/button-icon'
import DownloadIcon from '@mui/icons-material/Download';
const label = { inputProps: { "aria-label": "Switch demo" } };

const CardsMovDiaria = () => {
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
  const [formularioAtivo, setFormularioAtivo] = useState("humano");
  const alternarFormulario = (formulario) => {
    setFormularioAtivo(formulario);
  };
  const [arquivos, setArquivos] = useState([]);
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);

  const mostrarFormulario = (tipo) => {
    setMostrarFormularioGerais(tipo === "dados-gerais");
    setMostrarFormularioResidenciais(tipo === "dados-residencias");
    setMostrarFormularioComerciais(tipo === "dados-comerciais");
    setMostrarFormularioCobranca(tipo === "dados-cobranca");
    setMostrarFormularioDependentes(tipo == "dependentes");
    setMostrarFormularioAnexos(tipo === "anexos");
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

  return (
    <div className="container-cards-mov-diaria">
      <div className="nav-mov-diaria">
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
        <div className="form-mov-diario">
          <div className="linha-form-mov">
            <div className="campo01-mov-diario">
              <label>Nome</label>
              <input></input>
            </div>
            <div className="campo02-mov-diario2">
              <label>CPF</label>
              <input></input>
            </div>
            <div className="campo03-mov-diario2">
              <label>RG</label>
              <input></input>
            </div>
            <div className="campo03-mov-diario2">
              <label>Contrato</label>
              <input></input>
            </div>
            <div className="campo04-mov-diario2">
              <label>Gênero</label>
              <select></select>
            </div>
            <div className="campo02-mov-diario2">
              <label>Data Nascimento</label>
              <input></input>
            </div>
          </div>
          <div className="linha-form-mov">
            <div className="campo04-mov-diario2">
              <label>Religião</label>
              <select></select>
            </div>
            <div className="campo04-mov-diario2">
              <label>UF</label>
              <select></select>
            </div>
            <div className="campo04-mov-diario2">
              <label>Naturalidade</label>
              <input></input>
            </div>
            <div className="campo04-mov-diario2">
              <label>Nascionalidade</label>
              <select></select>
            </div>
            <div className="campo04-mov-diario2">
              <label>Profissão</label>
              <select></select>
            </div>
          </div>
          <div className="linha-form-mov">
            <div className="campo05-mov-diario2">
              <label>Estado Civil</label>
              <select></select>
            </div>
            <div className="campo02-mov-diario2">
              <label>Carência Padrão</label>
              <Switch {...label} />
            </div>
            <div className="campo05-mov-diario2">
              <label>Data Início Carência</label>
              <input></input>
            </div>
            <div className="campo05-mov-diario2">
              <label>Data Final Carência</label>
              <input></input>
            </div>
            <div className="campo02-mov-diario2">
              <label>Cremação</label>
              <Switch {...label} />
            </div>
            <div className="campo02-mov-diario2">
              <label>Data Cremação</label>
              <input></input>
            </div>
          </div>
        </div>
      )}
      {mostrarFormularioResidenciais && (
        <div className="form-mov-diario">
          <div className="linha-form-mov">
            <div className="campo03-mov-diario2">
              <label>CEP</label>
              <input></input>
            </div>
            <div className="campo04-mov-diario2">
              <label>UF</label>
              <select></select>
            </div>
            <div className="campo04-mov-diario2">
              <label>Município</label>
              <select></select>
            </div>
            <div className="campo04-mov-diario2">
              <label>Bairro</label>
              <input></input>
            </div>
            <div className="campo03-mov-diario2">
              <label>Quadra</label>
              <input></input>
            </div>
            <div className="campo03-mov-diario2">
              <label>Lote</label>
              <input></input>
            </div>
          </div>
          <div className="linha-form-mov">
            <div className="campo03-mov-diario2">
              <label>Nº</label>
              <input></input>
            </div>
            <div className="campo01-mov-diario">
              <label>Rua</label>
              <input></input>
            </div>
            <div className="campo04-mov-diario2">
              <label>Complemento</label>
              <input></input>
            </div>
          </div>
        </div>
      )}
      {mostrarFormularioComerciais && (
        <div className="form-mov-diario">
          <div className="linha-form-mov">
            <div className="campo03-mov-diario2">
              <label>CEP</label>
              <input></input>
            </div>
            <div className="campo04-mov-diario2">
              <label>UF</label>
              <select></select>
            </div>
            <div className="campo04-mov-diario2">
              <label>Município</label>
              <select></select>
            </div>
            <div className="campo04-mov-diario2">
              <label>Bairro</label>
              <input></input>
            </div>
            <div className="campo03-mov-diario2">
              <label>Quadra</label>
              <input></input>
            </div>
            <div className="campo03-mov-diario2">
              <label>Lote</label>
              <input></input>
            </div>
          </div>
          <div className="linha-form-mov">
            <div className="campo03-mov-diario2">
              <label>Nº</label>
              <input></input>
            </div>
            <div className="campo01-mov-diario">
              <label>Rua</label>
              <input></input>
            </div>
            <div className="campo04-mov-diario2">
              <label>Complemento</label>
              <input></input>
            </div>
          </div>
        </div>
      )}
      {mostrarFormularioCobranca && (
        <div className="form-mov-diario">
          <div className="linha-form-mov">
            <div className="campo06-mov-diario2">
              <label>Dia de Pagamento</label>
              <input></input>
            </div>
            <div className="campo02-mov-diario2">
              <label>Primeira Parcela</label>
              <input></input>
            </div>
            <div className="campo02-mov-diario2">
              <label>Ordem Rota</label>
              <input></input>
            </div>
            <div className="campo03-mov-diario2">
              <label>Contrato</label>
              <input></input>
            </div>
            <div className="campo04-mov-diario2">
              <label>Plano</label>
              <select></select>
            </div>
            <div className="campo04-mov-diario2">
              <label>Região</label>
              <input></input>
            </div>
          </div>
          <div className="linha-form-mov">
            <div className="campo03-mov-diario2">
              <label>Transferido</label>
              <Switch {...label} />
            </div>
            <div className="campo04-mov-diario2">
              <label>Pagar Adesão</label>
              <Switch {...label} />
            </div>
          </div>
        </div>
      )}
      {mostrarFormularioDependentes && (
        <div className="form-mov-diario">
          {formularioAtivo === "humano" && (
            <div>
              <div className="linha-form-mov">
                <div className="campos-01-contrato ">
                  <label>Nome</label>
                  <input></input>
                </div>
                <div className="data-nascimento-contrato">
                  <label>Data Nascimento</label>
                  <input></input>
                </div>
                <div className="data-nascimento-contrato">
                  <label>Data Filiação</label>
                  <input />
                </div>
                <div className="campos-02-contrato">
                  <label>CPF</label>
                  <input></input>
                </div>
              </div>
              <div className="linha-form-mov">
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
                    <input />
                  </div>
                  <div className="campos-02-contrato">
                    <label>Parentesco</label>
                    <select></select>
                  </div>
                </div>
              </div>
            </div>
          )}
          {formularioAtivo === "pet" && (
            <div className="linha-form-mo">
              <div className="container-linha">
                <div className="campos-01-contrato">
                  <label>Nome</label>
                  <input></input>
                </div>
                <div className="data-nascimento-contrato">
                  <label>Data Nascimento</label>
                  <input />
                </div>
                <div className="data-nascimento-contrato">
                  <label>Data Filiação</label>
                  <input />
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
                  <input />
                </div>
              </div>
            </div>
          )}
          <div className="button-pet-humano-mov">
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
      )}

      {mostrarFormularioAnexos && (
        <div className="form-mov-diario">
          <div className="contrato-associados-anexo">
            <label>Adicionar</label>
            <div className="document">
              <a>
                <PostAddIcon fontSize={"large"} />
              </a>
              <input type="file" onChange={handleProcurarChange} />
              <ButtonText title="ANEXAR" funcao={handleAnexarClick} />
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
                      <button onClick={() => handleExcluirClick(index)}>
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
      )}
    </div>
  );
};

export default CardsMovDiaria;
