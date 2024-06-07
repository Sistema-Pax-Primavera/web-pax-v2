import React, { useEffect, useState } from "react";
import HeaderVendas from "../../components/header/index";
import "./contratos-finalizados.css";
import "../../components/formulario-finalizado/formulario-finalizados.css";
import { headerVendas } from "../../entities/headers/header-vendas";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../components/table/table";
import { useVendas } from "../../services/api";
import ButtonText from "../../../../pax-associado/src/components/button-texto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carregando from "../../components/carregando";

const ContratosFinalizados = () => {
  const [vendasFinalizadas, setVendasFinalizadas] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false); // Alterado para false inicialmente
  const [searchResult, setSearchResult] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const { getContratos, getContratoBusca, getContratosFinalizados } = useVendas();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSearch = () => {
    try {
      setLoading(true);
      if (!searchTerm) {
        setLoading(true);
        getContratos().then((data) => {
          const pendentes = data.filter((contrato) => contrato.statusId === 2);
          setSearchResult(pendentes);
          setTimeout(() => setLoading(false), 3000);
        });
      } else {
        getContratoBusca(searchTerm).then((data) => {
          const pendentes = data.filter((contrato) => contrato.statusId === 2);
          setSearchResult(pendentes);
          setTimeout(() => setLoading(false), 3000);
        });
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

  const handleOpenFormulario = (contrato) => {
    //navigate("/contratos-finalizados/contrato-finalizado", { state: { contrato } });
    //id fixado para teste
    console.log(contrato)
    contrato = 5;
    navigate("/contratos-finalizados/contrato-finalizado", { state: contrato });
    localStorage.setItem("page-venda", "/contrato-finalizado");
  };

  useEffect(() => {
    getContratosFinalizados().then((data) => {
      const contratosFinalizados = data.filter(
        (contrato) => contrato.statusId === 2
      );
      setSearchResult(contratosFinalizados);
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
            <Carregando />
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
    </div>
  );
};

export default ContratosFinalizados;
