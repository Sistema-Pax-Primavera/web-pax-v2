import React, { useEffect, useState } from "react";
import "./recebimento.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Header from "../../components/header/header";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { green, red } from "@mui/material/colors";
import { Snackbar } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useLocation } from "react-router-dom";
import moment from "moment";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import PaidIcon from "@mui/icons-material/Paid";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CancelIcon from "@mui/icons-material/Cancel";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PixIcon from "@mui/icons-material/Pix";
import SourceIcon from "@mui/icons-material/Source";
import ButtonText from "../../components/button-texto";
import ButtonIcon from "../../components/button-icon";
import { formatarValor } from "../../utils/fuctions";
import TableComponent from "../../components/table/table";
import { headerRecebimento } from "../../entities/headers/header-recebimento";

function createData(data_vencimento, valor_total, data_hora_pagamento) {
  return { data_vencimento, valor_total, data_hora_pagamento };
}

const rows = [
  createData("23/12/2023", "100,00", "19/02/2024"),
  createData("15/02/2024", "100,00", "18/02/2024"),
  createData("15/01/2024", "100,00", "18/04/2024"),
  createData("15/12/2023", "100,00", "16/02/2024"),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  p: 4,
};

const Recebimento = () => {
  const [quantidadeMensalidades, setQuantidadeMensalidades] = useState("");
  const [totalPagar, setTotalPagar] = useState("");
  const [valorOriginal, setValorOriginal] = useState("");
  const [desconto, setDesconto] = useState("");
  const [parcelasAdicionais, setParcelasAdicionais] = useState([]);
  const [receberDisponivel, setReceberDisponivel] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [mensagemCor, setMensagemCor] = useState(red[500]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setReceberDisponivel(false);
    setOpen(false);
  };
  const location = useLocation();
  const cliente = location.state && location.state.cliente;
  const idioma = location.state && location.state.idioma;
  const dadosTabela = [];

  const [novaParcela, setNovaParcela] = useState({
    formaPagamento: "Dinheiro",
    conta: "Conta 1",
    valor: "",
  });

  const imprimir = () => {
    const conteudoComprovante = {
      nome: cliente.nome,
      parcelas: parcelas,
      valor_total: parcela.valor_total,
      contrato: cliente.n_contrato,
      regiao: cliente.regiao,
      endereco: cliente.rua_residencial + ' QD'
        + cliente.quadra_residencial + ' LT'
        + cliente.lote_residencial + ' Nº'
        + cliente.numero_residencial + ' - '
        + cliente.bairro_residencial + ' - '
        + cliente.municipio_residencial,
      usuario: user,
      data_pagamento: parcela.data_hora_pagamento

    }
    imprimirComprovante(conteudoComprovante);
  };

  const formaPagamentoIcone = {
    Dinheiro: CurrencyExchangeIcon,
    Débito: CreditScoreIcon,
    Crédito: CreditScoreIcon,
    PIX: PixIcon,
    Cheque: SourceIcon,
  };

  const renderizarIconeFormaPagamento = (formaPagamento) => {
    const Icone = formaPagamentoIcone[formaPagamento];
    if (Icone) {
      return <Icone fontSize={"small"} />;
    } else {
      return null; // Retornar null se não houver correspondência de ícone
    }
  };

  // Função para lidar com a mudança na quantidade de mensalidades
  const handleQuantidadeChange = (event) => {
    const novaQuantidade = parseInt(event.target.value, 10);
    setQuantidadeMensalidades(novaQuantidade);

    const mensalidadesSelecionadas = cliente.parcelas.mensalidade.slice(0, novaQuantidade);

    const valorTotalMensalidades = mensalidadesSelecionadas.reduce((total, mensalidade) => {
      const valorMensalidade = parseFloat(mensalidade.valor) || 0;
      return total + valorMensalidade;
    }, 0);

    setValorOriginal(valorTotalMensalidades);
  };

  const handleChange = (index, campo, valor) => {
    const newParcelas = [...parcelasAdicionais];
    if (campo === "formaPagamento") {
      newParcelas[index].formaPagamento = valor;
    } else if (campo === "valor") {
      newParcelas[index].valor = valor;
    }
    setParcelasAdicionais(newParcelas);
  };

  const aplicarDesconto = () => {
    const valorComDesconto =
      parseFloat(valorOriginal) - parseFloat(desconto || 0);
    const valorComDescontoFormatado = valorComDesconto.toFixed(2);
    setTotalPagar(valorComDescontoFormatado);
    setReceberDisponivel(true);
  };

  const handleNovaParcelaChange = (campo, valor) => {
    setNovaParcela({
      ...novaParcela,
      [campo]: valor,
    });
  };

  const handleAdicionarParcela = () => {
    if (!novaParcela.valor || isNaN(parseFloat(novaParcela.valor))) {
      alert("Digite um valor válido para a parcela.");
      return;
    }

    // Verifica se a forma de pagamento é Cheque ou PIX
    if (["Cheque", "PIX"].includes(novaParcela.formaPagamento)) {
      // Se for Cheque ou PIX, verifica se a conta está selecionada
      if (!novaParcela.conta) {
        alert("Selecione uma conta para a forma de pagamento Cheque ou PIX.");
        return;
      }
    }

    setParcelasAdicionais([...parcelasAdicionais, { ...novaParcela }]);
    setNovaParcela({
      formaPagamento: "Dinheiro",
      conta: "Conta 1",
      valor: "",
    });
  };

  const handleRemoverParcela = (index) => {
    const novasParcelas = parcelasAdicionais.filter((_, i) => i !== index);
    setParcelasAdicionais(novasParcelas);
  };

  const handleReceber = () => {
    let somaValores = parseFloat(totalPagar);
    parcelasAdicionais.forEach((parcela) => {
      somaValores -= parseFloat(parcela.valor);
    });

    if (somaValores === 0) {
      setMensagem("Pagamento Realizado!");
      setMensagemCor(green[500]);
      // Verifica se a forma de pagamento é PIX
      const isPixPayment = parcelasAdicionais.some(
        (parcela) => parcela.formaPagamento === "PIX"
      );
      if (isPixPayment) {
        handleOpen();
        setParcelasAdicionais([]);
        setQuantidadeMensalidades("");
        setValorOriginal("");
        setDesconto("");
      } else {
        setParcelasAdicionais([]);
        setQuantidadeMensalidades("");
        setValorOriginal("");
        setDesconto("");
        imprimirComprovante();
      }
    } else if (somaValores > 0) {
      setMensagem("Pagamento incompleto!");
      setMensagemCor(red[500]);
    } else if (somaValores < 0) {
      setMensagem("Pagamento excede o valor a receber!");
      setMensagemCor(red[500]);
    } else {
      setMensagem("Pagamento não realizado!");
      setMensagemCor(red[500]);
    }
  };

  const handleCloseMensagem = () => {
    setMensagem("");
  };

  useEffect(() => {
    cliente.extrato.forEach((extratoItem) => {
      extratoItem.parcelas.forEach((parcela) => {
        // Criar um objeto para cada parcela com as informações necessárias
        const dadosParcela = {
          data_vencimento: parcela.data_vencimento,
          valor_total: parcela.valor_parcela,
          data_hora_pagamento: extratoItem.data_hora_pagamento,
        };

        // Adicionar o objeto à estrutura de dados
        dadosTabela.push(dadosParcela);
      });
    });

    console.log(dadosTabela);
  }, []);

  return (
    <div className="container-associados">
      <Header cliente={cliente} idioma={idioma} />
      <div className="dados-recebimento-associado">
        <div className="fundo-recebimento">
          <div className="icones-nome">
            <label>
              <AccountCircleIcon fontSize={"small"} />
              {cliente ? cliente.nome : ""} Nº do Contrato -{" "}
              {cliente ? cliente.n_contrato : ""}
            </label>
          </div>
          <div className="content-formulario-iniciar-atendimento2">
            <div className="em-aberto">
              <div className="icone-aberto">
                <label>EM ABERTO:</label>
                <div className="aberto-recebimento">
                  <AddAlertIcon fontSize="small" />
                  <input disabled={true} value={cliente.parcelas.mensalidade.length} />
                </div>
              </div>
            </div>
            <div className="em-aberto">
              <div className="icone-aberto">
                <label>VALOR:</label>
                <div className="aberto-recebimento">
                  <PaidIcon fontSize="small" />
                  <input disabled={true} value={cliente.parcelas.valor_total} />
                </div>
              </div>
            </div>
            <div className="em-aberto2">
              <div className="icone-aberto">
                <label>VALOR PLANO:</label>
                <div className="aberto-recebimento">
                  <PriceChangeIcon fontSize="small" />
                  <input disabled={true} value={cliente.valor_plano} />
                </div>
              </div>
            </div>
            <div className="em-aberto3">
              <div className="icone-aberto5">
                <label>ULT. MÊS PAGO:</label>
                <div className="aberto-recebimento">
                  <CalendarMonthIcon fontSize="small" />
                  <input value={cliente.ultimo_mes_pago} disabled={true} />
                </div>
              </div>
            </div>
            <div className="em-aberto3">
              <div className="icone-aberto5">
                <label>ULT. PAGAMENTO:</label>
                <div className="aberto-recebimento">
                  <EventAvailableIcon fontSize="small" />
                  <input disabled={true} value={cliente.ultimo_pagamento} />
                </div>
              </div>
            </div>
          </div>
          <div className="tabela-acerto-recebimento">
            <div className="recebimento-associado">
              <div className="campos-recebimento">
                <div className="linhas-recebimento">
                  <div className="recebimento-01">
                    <label>Quant. Mensalidades</label>
                    <input
                      type="number"
                      value={quantidadeMensalidades}
                      onChange={handleQuantidadeChange}
                    />
                  </div>
                  <div className="recebimento-02">
                    <label>Total a Pagar</label>
                    <input value={formatarValor(valorOriginal)} readOnly />
                  </div>
                  <div className="recebimento-02">
                    <label>Desconto</label>
                    <input
                      type="number"
                      value={desconto}
                      onChange={(e) => setDesconto(e.target.value)}
                    />
                  </div>
                  <div className="button-aplica-desconto">
                    <ButtonText
                      title="APLICAR DESCONTO"
                      funcao={aplicarDesconto}
                    />
                  </div>

                  <div className="recebimento-01">
                    <label>Valor com Desconto</label>
                    <input type="number" value={totalPagar} disabled />
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            {receberDisponivel ? (
              <div className="pag-dupl-men">
                <div className="duplica-adiciona-recebimento">
                  <div className="container-linha-recebimento">
                    <div className="resultado-forma-pagamento">
                      <div key={1} className="pag-forma-valor-rec">
                        <div className="forma-pagamento-recebimento">
                          <label>Forma de Pagamento</label>
                          <select
                            value={novaParcela.formaPagamento}
                            onChange={(e) =>
                              handleNovaParcelaChange(
                                "formaPagamento",
                                e.target.value
                              )
                            }
                          >
                            <option>Dinheiro</option>
                            <option>Débito</option>
                            <option>Crédito</option>
                            <option>PIX</option>

                            <option>Cheque</option>
                          </select>
                        </div>
                        {["Dinheiro", "Débito", "Crédito"].includes(
                          novaParcela.formaPagamento
                        ) ? null : (
                          <div className="conta-bancaria-recebimento">
                            <label>Conta</label>
                            <select
                              value={novaParcela.conta}
                              onChange={(e) =>
                                handleNovaParcelaChange("conta", e.target.value)
                              }
                            >
                              <option>Conta 1</option>
                              <option>Conta 2</option>
                              <option>Conta 3</option>
                            </select>
                          </div>
                        )}
                        <div className="conta-bancaria-recebimento">
                          <label>Valor a Pagar</label>
                          <input
                            type="number"
                            value={novaParcela.valor}
                            onChange={(e) =>
                              handleNovaParcelaChange("valor", e.target.value)
                            }
                          />
                        </div>
                        <div className="adicionar-recebimento-forma">
                          <ButtonIcon
                            icon={<AddCircleOutlineIcon fontSize={"small"} />}
                            funcao={handleAdicionarParcela}
                          />
                        </div>
                      </div>
                      {parcelasAdicionais.length > 0 && (
                        <div className="lista-parcelas">
                          <div>
                            {parcelasAdicionais.map((parcela, index) => (
                              <div
                                className="container-valores-recebimento"
                                key={index}
                              >
                                <div className="tipo-pagamento-recebimento">
                                  <div className="tipo-pagamento-2">
                                    {renderizarIconeFormaPagamento(
                                      parcela.formaPagamento
                                    )}
                                    <label>{parcela.formaPagamento}</label>
                                  </div>
                                </div>
                                <div className="tipo-pagamento-recebimento-3">
                                  <h2> Valor $</h2>
                                  <label>{parcela.valor}</label>
                                </div>
                                {/* Exibir campo de conta apenas se a forma de pagamento for "PIX" ou "Cheque" */}
                                {["PIX", "Cheque"].includes(
                                  parcela.formaPagamento
                                ) && (
                                    <div className="tipo-pagamento-recebimento-3">
                                      <h2> Conta</h2>
                                      <label>{parcela.conta}</label>
                                    </div>
                                  )}
                                <div className="remove-forma-paga">
                                  <ButtonIcon
                                    icon={<CancelIcon />}
                                    funcao={() => handleRemoverParcela(index)}
                                  />
                                </div>
                              </div>
                            ))}
                            <div className="receber-add-recebimento">
                              {receberDisponivel ? (
                                <>
                                  <ButtonText
                                    title="RECEBER"
                                    funcao={handleReceber}
                                    disabled={!receberDisponivel}
                                  />
                                </>
                              ) : (
                                <></>
                              )}

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
                                    <div className="icones-nome">
                                      <label>
                                        <CurrencyExchangeIcon
                                          fontSize={"small"}
                                        />
                                        Acertar pagamento
                                      </label>
                                    </div>
                                  </Typography>
                                  <Typography
                                    id="modal-modal-description"
                                    sx={{ mt: 2 }}
                                  >
                                    <div>
                                      <label>
                                        Aponte para o QR code e realize o
                                        pagamento!
                                      </label>
                                      <button
                                        onClick={() => imprimir()}
                                      >
                                        IMPRIMIR COMPROVANTE
                                      </button>
                                    </div>
                                  </Typography>
                                </Box>
                              </Modal>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="acordion-recebimento">
                      <div>
                        <TableComponent
                          headers={headerRecebimento}
                          rows={dadosTabela}
                          actionsLabel={''}
                          actionCalls={''}
                        />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              open={mensagem !== ""}
              autoHideDuration={6000}
              onClose={handleCloseMensagem}
              message={mensagem}
              ContentProps={{
                style: { backgroundColor: mensagemCor },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recebimento;
