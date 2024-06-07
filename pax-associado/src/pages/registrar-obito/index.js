import React, { useState } from "react";
import Header from "../../components/header/header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./registrar-obito.css";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import ButtonText from "../../components/button-texto";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrarObito = () => {
  const location = useLocation();
  const cliente = location.state && location.state.cliente;
  const idioma = location.state && location.state.idioma;
  const [data, setData] = useState("");
  const [clienteSelecionado, setClienteSelecionado] = useState("");

  const handleSalva = () => {
    // Verifica se os campos estão preenchidos
    if (!data || !clienteSelecionado) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Aqui você pode prosseguir com a lógica para salvar os dados
    // Por exemplo:
    // saveData(data, motivoInativacao);
    toast.success("Contrato cancelado com sucesso!");
  };
  return (
    <>
      <div className="container-associados">
        <Header cliente={cliente} idioma={idioma} />
        <div className="dados-cobranca-associado">
          <div className="fundo-cobranca">
            <div className="icones-nome">
              <label>
                <AccountCircleIcon fontSize={"small"} />
                {cliente ? cliente.nome : ""} Nº do Contrato -{" "}
                {cliente ? cliente.n_contrato : ""}
              </label>
            </div>
            <div className="container-linha">
              <div className="campos-02">
                <label>Data do Obito</label>
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
              <div className="campos-01">
                <label>Selecione o cliente</label>
                <select
                  value={clienteSelecionado}
                  onChange={(e) => setClienteSelecionado(e.target.value)}
                >
                  <option value="">Carlos Eduardo</option>
                  <option value="cancelamento">Henrique Souza</option>
                  <option value="recusado">Luiza Alencar</option>
                </select>
              </div>
              <div className="inativa-contrato">
                <ButtonText title="CONFIRMAR" funcao={handleSalva}></ButtonText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrarObito;
