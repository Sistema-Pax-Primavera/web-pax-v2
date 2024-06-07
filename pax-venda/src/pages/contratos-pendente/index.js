import React, { useEffect, useState } from "react";
import HeaderVendas from "../../components/header/index";
import "./contratos.css";
import "react-toastify/dist/ReactToastify.css";
import FormularioContratos from "../../components/formulario-pendente";
import { headerVendas } from "../../entities/headers/header-vendas";
import TableComponent from "../../components/table/table";
import { useVendas } from "../../services/api";
import ButtonText from "../../../../pax-associado/src/components/button-texto/index";
import Carregando from "../../components/carregando";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Contratos = () => {
  const [vendas, setVendas] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const { getContratos, getContratoBusca } = useVendas();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      if (!searchTerm) {
        setLoading(true);
        const response = await getContratos();
        setSearchResult(response);
        setTimeout(() => setLoading(false), 3000);
      } else {
        const contratoFiltrado = searchResult.filter(contrato => {
          return contrato.nome_vendedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contrato.titular.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setSearchResult(contratoFiltrado);
        setTimeout(() => setLoading(false), 3000);
      }
    } catch (error) {
      console.log('cai aqui')
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.message);
      } else if (error.message === "Network Error") {
        toast.error("Erro de conexão. Por favor, verifique sua conexão com a internet e tente novamente.");
      } else {
        toast.error("Erro ao realizar a busca. Por favor, tente novamente mais tarde.");

        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOpenFormulario = (contrato) => {
    //navigate("/contratos/contratos-pendentes", { state: { contrato } });
    //id fixado para teste
    contrato = 1;
    navigate("/contratos/contratos-pendentes", { state: contrato });
    localStorage.setItem("page-venda", "/contratos-pendentes");
  };

  useEffect(() => {
    getContratos().then((data) => {
      setSearchResult(data);
    });
  }, []);

  return (
    <div className="container-contratos-vendas">
      <HeaderVendas />
      <div className="clientes-contrato-venda8">
        <div className="pesquisa-contrato-venda">
          <input
            placeholder="Informe o nome do titular ou vendedor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="pesquisa-contrato-button">
            <ButtonText title="PESQUISAR" funcao={() => handleSearch()} />
          </div>
        </div>
        <div className="tabela-contratos-vendas">
          {loading ? (
            <Carregando /> // Exibe o componente de carregamento se loading for true
          ) : (
            <TableComponent
              headers={headerVendas}
              rows={searchResult}
              actionsLabel={["Ações", "Acciones"]}
              actionCalls={{
                view: (e) => handleOpenFormulario(e),
              }}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contratos;
