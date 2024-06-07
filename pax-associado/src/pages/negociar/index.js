import React, { useState } from "react";
import Header from "../../components/header/header";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation } from "react-router-dom";
import "./negociar.css";
import ButtonText from "../../components/button-texto";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Negociar = () => {
  const location = useLocation();
  const cliente = location.state && location.state.cliente;
  const idioma = location.state && location.state.idioma;
  const [quantParcelas, setQuantParcelas] = useState("");
  const [motivoSelecionado, setMotivoSelecionado] = useState("");
  const [valorTotal, setValorTotal] = useState("");
  const [valorAcertado, setValorAcertado] = useState("");

  const handleSalva = () => {
    // Verifica se os campos estão preenchidos
    if (!quantParcelas || !motivoSelecionado || !valorTotal || !valorAcertado) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Aqui você pode prosseguir com a lógica para salvar os dados
    // Por exemplo:
    // saveData(data, motivoInativacao);
    toast.success("Registo de óbito confirmado!");
  };
  return (
    <>
      <div className="container-associados">
        <Header cliente={cliente} idioma={idioma} />
        <div className="dados-negociar-associado">
          <div className="fundo-cobranca">
            <div className="icones-nome">
              <label>
                <AccountCircleIcon fontSize={"small"} />
                {cliente ? cliente.nome : ""} Nº do Contrato -{" "}
                {cliente ? cliente.n_contrato : ""}
              </label>
            </div>
            <div className="container-linha">
              <div className="campos-necociacao">
                <label>Quant. Parcelas</label>
                <input
                  type="number"
                  value={quantParcelas}
                  onChange={(e) => setQuantParcelas(e.target.value)}
                />
              </div>
              <div className="campos-necociacao2">
                <label>Motivo da Negociação</label>
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
              <div className="campos-necociacao">
                <label>Valor Total</label>
                <input
                  type="number"
                  value={valorTotal}
                  onChange={(e) => setValorTotal(e.target.value)}
                />
              </div>
              <div className="campos-necociacao">
                <label>Valor Acertado</label>
                <input
                  type="number"
                  value={valorAcertado}
                  onChange={(e) => setValorAcertado(e.target.value)}
                />
              </div>
              <div className="inativa-contrato">
                <ButtonText title="CONFIRMAR" funcao={handleSalva}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Negociar;
