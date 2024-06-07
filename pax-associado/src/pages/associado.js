import React, { useState, useEffect } from "react";
import "./associado.css";
import Pesquisar from "../../assets/pesquisar.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import idiomas from "../utils/info";
import { useAssociado } from "../services/api";
import TableComponent from "../components/table/table";
import { headers } from "../entities/headers/header-associado";
import ButtonIcon from "../components/button-icon";
import ErrorComponent from "../components/show-message";
import Carregando from "../components/carregando";

const Associado = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [unidadeID, setUnidadeID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [showImage, setShowImage] = useState(true);
  const navigate = useNavigate();
  const [idioma, setIdioma] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorCode, setErrorCode] = useState(null);
  const { getAssociados, getAssociado } = useAssociado();

  const handleSearch = async () => {
    setErrorMessage(null);
    try {
      setLoading(true);
      if (!searchTerm) {
        const data = await getAssociados(unidadeID);
        setClientes(data);
        setSearchResult(data);
      } else {
        const data = await getAssociado(searchTerm, unidadeID);
        setClientes(data);
        setSearchResult(data);
      }
    } catch (error) {
      if (error.message === "Network Error") {
        setErrorMessage("Erro de conexão. Por favor, verifique sua conexão com a internet e tente novamente.");
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenButtonClick = (cliente) => {
    setShowImage(true);
    setSearchResult([]);
    setSearchTerm("");
    navigate("/dados-cadastrais", { state: { cliente } });
    localStorage.setItem("page-associado", "/dados-cadastrais");
    // localStorage.setItem('clienteSelecionado', JSON.stringify(cliente));
  };

  useEffect(() => {
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      const usuarioObj = JSON.parse(savedUsuario);
      setIdioma(usuarioObj.idioma == "BR" ? false : true);
      setUnidadeID(parseInt(usuarioObj.unidadeAtual));
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      verificaIdioma();
      verificaUnidade();
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


  const verificaIdioma = () => {
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      const usuarioObj = JSON.parse(savedUsuario);
      setIdioma(usuarioObj.idioma === "BR" ? false : true);
    }
  };

  const verificaUnidade = () => {
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      const usuarioObj = JSON.parse(savedUsuario);
      setUnidadeID(parseInt(usuarioObj.unidadeAtual));
    }
  };

  const TableIdioma = idiomas[idioma ? "es_PY" : "pt_BR"].table;
  const colunas = Object.keys(TableIdioma);

  return (
    <div className="container-associado">
      <div className="pesquisa-associado">
        <input
          placeholder={
            idioma ? idiomas.es_PY.pesquisa.texto : idiomas.pt_BR.pesquisa.texto
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="button-pesquisa-associado">
          <ButtonIcon
            icon={<SearchIcon fontSize={"small"} />}
            funcao={handleSearch}
          />

        </div>
      </div>
      <ToastContainer />
      {errorMessage && <ErrorComponent message={errorMessage} errorCode={errorCode} />}
      {loading && (
        <Carregando message={idioma ? "Cargando" : "Carregando"} />
      )}
      {showImage && !loading && searchResult.length === 0 && (
        <div className="imagem-pesquisar-associado">
          <img src={Pesquisar} alt="Pesquisar" />
        </div>
      )}
      {!loading && searchResult.length > 0 && (
        <div className="tabelas-associados">
          <TableComponent
            headers={headers}
            rows={searchResult}
            actionsLabel={["Ações", "Acciones"]}
            actionCalls={{
              // delete: (e) =>
              //     console.log(e),
              // edit: (e) => console.log('edit'),
              view: (e) => handleOpenButtonClick(e),
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Associado;
