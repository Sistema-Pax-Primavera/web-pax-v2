import React, { useState } from "react";
import Header from "../../components/header/header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation } from "react-router-dom";
import ButtonText from "../../components/button-texto";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Quitar = () => {
  const location = useLocation();
  const cliente = location.state && location.state.cliente;
  const idioma = location.state && location.state.idioma;
  const [data, setData] = useState("");
  const [motivoSelecionado, setMotivoSelecionado] = useState("");

  const handleSalva = () => {
    // Verifica se os campos estão preenchidos
    if (!data || !motivoSelecionado) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Aqui você pode prosseguir com a lógica para salvar os dados
    // Por exemplo:
    // saveData(data, motivoInativacao);
    toast.success("Quitação realizada com sucesso!");
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
                <label>Data</label>
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
              <div className="campos-01">
                <label>Motivo da Quitação</label>
                <select
                  value={motivoSelecionado}
                  onChange={(e) => setMotivoSelecionado(e.target.value)}
                >
                  <option value="">Selecione...</option>
                  <option value="cancelamento">Cancelamento</option>
                  <option value="recusado">Recusado</option>
                  <option value="inativacao">Inativação</option>
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

export default Quitar;
