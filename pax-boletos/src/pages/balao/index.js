import React, { useState, useEffect } from "react";
import "./balao.css";
import HeaderBoletos from "../../components/header";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";

const Balao = () => {
  const [vencimento, setVencimento] = useState("");
  const [valor, setValor] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);
  const [dadosFinalizados, setDadosFinalizados] = useState({}); // Inicializando como um objeto vazio
  const [boletosGerados, setBoletosGerados] = useState(false);
  useEffect(() => {
    const calcularValorTotal = () => {
      const total = (valor * quantidade) * (1 - desconto / 100);
      setValorTotal(total.toFixed(2));
    };

    calcularValorTotal();
  }, [valor, quantidade, desconto]);

  const handleFinalizar = () => {
    const dataAtual = new Date().toLocaleDateString();
    const dados = {
      vencimento,
      valor,
      quantidade,
      desconto,
      valorTotal,
      dataFinalizacao: dataAtual
    };
    setDadosFinalizados(dados);
    setBoletosGerados(true);
  };

  return (
    <div className="avuls-confirma">
      <div className="container-balao-boletos">
        <HeaderBoletos />
        <div className="container-balao">
          <div className="container-balao2">
            <div className="linhas-campo-balao">
              <div className="campos-balao01">
                <label>Contrato</label>
                <input type="number"></input>
              </div>
              <div className="campos-balao01">
                <label>CEP</label>
                <input type="number"></input>
              </div>
              <div className="campos-balao01-buttao">
                <ButtonIconTextoStart
                  title={"BUSCAR"}
                  corFundoBotao={"#006b33"}
                  fontSizeBotao={'10px'}
                  corTextoBotao={"#ffff"}
                  fontWeightBotao={700}
                />
              </div>
            </div>
            <div className="linhas-campo-balao">
              <div className="campos-balao01">
                <label>Vencimento</label>
                <input
                  type="date"
                  value={vencimento}
                  onChange={(e) => setVencimento(e.target.value)}
                />
              </div>
              <div className="campos-balao01">
                <label>Valor</label>
                <input
                  type="number"
                  value={valor}
                  onChange={(e) => setValor(parseFloat(e.target.value))}
                />
              </div>
              <div className="campos-balao01">
                <label>Quantidade</label>
                <input
                  type="number"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value))}
                />
              </div>
              <div className="campos-balao01">
                <label>Desconto</label>
                <input
                  type="number"
                  value={desconto}
                  onChange={(e) => setDesconto(parseFloat(e.target.value))}
                />
              </div>
              <div className="campos-balao01">
                <label>Valor Total</label>
                <input type="number" value={valorTotal} readOnly />
              </div>
              <div className="campos-balao01-buttao">
                <ButtonIconTextoStart
                  title={"FINALIZAR"}
                  corFundoBotao={"#006b33"}
                  corTextoBotao={"#ffff"}
                  fontSizeBotao={'10px'}
                  fontWeightBotao={700}
                  funcao={handleFinalizar}
                />
              </div>
            </div>
          </div>
          <div className="boleto-balao">
            <div className="linhas-boletos">
              <div className="campos-linhas-boletos1">
                <label>Banco do Brasil</label>
              </div>
              <div className="campos-linhas-boletos2">
                <label>000-0</label>
              </div>
              <div className="campos-linhas-boletos3">
                <label>
                  00000.00000 00000.000000 00000.00000 0 00000000000000
                </label>
              </div>
            </div>
            <div className="linhas-boletos">
              <div className="campos-linhas-boletos4">
                <label>Local de Pagamento</label>
                <label>Pagável em qualquer banco até o vencimento.</label>
              </div>
              <div className="campos-linhas-boletos5">
                <label>Vencimento</label>
                <p>{dadosFinalizados.vencimento}</p>
              </div>
            </div>
            <div className="linhas-boletos">
              <div className="campos-linhas-boletos4">
                <label>Beneficiário</label>
                <label>Teste 01</label>
              </div>
              <div className="campos-linhas-boletos5">
                <label>Agência/Cod. beneficiario</label>
                <p>0000-0/0000000</p>
              </div>
            </div>
            <div className="linhas-boletos">
              <div className="campos-linhas-boletos6">
                <label>Data Documento</label>
                <label>{dadosFinalizados.dataFinalizacao}</label>
              </div>
              <div className="campos-linhas-boletos6">
                <label>Nº do Documento</label>
                <label>00000000</label>
              </div>
              <div className="campos-linhas-boletos7">
                <label>Espécie DOC</label>
                <label>DM</label>
              </div>
              <div className="campos-linhas-boletos8">
                <label>Aceite</label>
                <label>N</label>
              </div>
              <div className="campos-linhas-boletos15">
                <label>Data Processamento</label>
                <label>{dadosFinalizados.dataFinalizacao}</label>
              </div>
              <div className="campos-linhas-boletos5">
                <label>Nosso Número</label>
                <p>000000000000 0</p>
              </div>
            </div>
            <div className="linhas-boletos">
              <div className="campos-linhas-boletos9">
                <label>Uso do Banco</label>
              </div>
              <div className="campos-linhas-boletos10">
                <label>Carteira</label>
                <label>000</label>
              </div>
              <div className="campos-linhas-boletos10">
                <label>Espécie</label>
                <label>R$</label>
              </div>
              <div className="campos-linhas-boletos11">
                <label>Quantidade</label>
                <label> {dadosFinalizados.quantidade}</label>
              </div>
              <div className="campos-linhas-boletos16">
                <label>Valor</label>
                <label>{dadosFinalizados.valor}</label>
              </div>
              <div className="campos-linhas-boletos5">
                <label>(=)Valor do Documento</label>
                <p>{dadosFinalizados.valorTotal}</p>
              </div>
            </div>
            <div className="linhas-boletos">
              <div className="campos-linhas-boletos12">
                <label>Instruções</label>
              </div>
              <div className="campos-colunas-boletos">
                <div className="campos-linhas-boletos13">
                  <label>(-)Desconto</label>
                  <p>{dadosFinalizados.desconto}</p>
                </div>
                <div className="campos-linhas-boletos13">
                  <label>(-)Mora/Multa/Juros</label>
                </div>
                <div className="campos-linhas-boletos13">
                  <label>(+)Outros acrécimos</label>
                </div>
                <div className="campos-linhas-boletos13">
                  <label>(=)Valor Cobrado</label>
                  <p>{dadosFinalizados.valorTotal}</p>
                </div>
              </div>
            </div>
            <div className="linhas-boletos">
              <div className="campos-linhas-boletos40">
                <label>Pagador:</label>
                <label>Nome do Pagador:</label>
                <label>CPF/CNPJ:</label>
              </div>
              <div className="campos-linhas-boletos14">
                <label>Código da Baixa</label>
              </div>
            </div>
          </div>
        </div>
        {boletosGerados && (
          <div className="botao-baixa-bole">
            <label>Boleto gerado com sucesso! </label>
            <div>
              <ButtonIconTextoStart
                icon={<CloudDownloadOutlinedIcon />}
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
                fontWeightBotao={800}
              />
            </div>
            <div>
              <ButtonIconTextoStart
                title={"COPIE O CÓDIGO DE BARRAS"}
                corFundoBotao={"#006b33"}
                corTextoBotao={"#ffff"}
                fontWeightBotao={700}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Balao;
