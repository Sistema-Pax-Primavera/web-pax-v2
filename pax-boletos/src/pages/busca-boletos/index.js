import React from "react";
import "./busca-boletos.css";
import HeaderBoletos from "../../components/header";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArticleIcon from "@mui/icons-material/Article";
import PrintIcon from "@mui/icons-material/Print";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const contras = [
  contrato(
    64464,
    "Lucas Ribeiro",
    "20/05/2023",
    61554488,
    "100,00",
    "Alta",
    "20/05/2023",
    "Pago"
  ),
  contrato(
    32587,
    "Luiza Santana",
    "22/07/2023",
    94652221,
    "100,00",
    "Alta",
    "27/05/2023",
    "Pendente"
  ),
  contrato(
    64464,
    "Lucas Ribeiro",
    "20/05/2023",
    61554488,
    "100,00",
    "Alta",
    "20/05/2023",
    "Pago"
  ),
];

function contrato(
  name,
  cliente,
  vencimentoContrato,
  cpf,
  valorboleto,
  valorDesconto,
  diaPagamento,
  status
) {
  return {
    name,
    cliente,
    vencimentoContrato,
    cpf,
    valorboleto,
    valorDesconto,
    diaPagamento,
    status,
  };
}

const BuscaBoletos = () => {
  return (
    <div className="avuls-confirma">
      <div className="container-boletos-boletos">
        <HeaderBoletos />
        <div className="container-busca-boletos">
          <div className="filtro-busca-boletos">
            <div className="linha-busca-boletos">
              <div className="campos-busca-boletos">
                <label>Contrato</label>
                <input></input>
              </div>
              <div className="campos-busca-boletos2">
                <label>Unidade</label>
                <select></select>
              </div>
              <div className="campos-busca-boletos3">
                <label>CPF</label>
                <input></input>
              </div>
              <div className="campos-busca-boletos">
                <label>Data</label>
                <input date></input>
              </div>
              <div className="campos-busca-boletos">
                <div className="botao-pesquisa-busca-boletos">
                  <ButtonIconTextoStart
                    title={"PESQUISAR"}
                    corFundoBotao={"#006b33"}
                    corTextoBotao={"#ffff"}
                    fontWeightBotao={700}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=".tabela-lote">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Contrato</TableCell>
                    <TableCell align="start">Cliente</TableCell>
                    <TableCell align="center">Vencimento</TableCell>
                    <TableCell align="center">CPF</TableCell>
                    <TableCell align="center">Valor Boleto</TableCell>
                    <TableCell align="center">Dia Pagamento</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Opções</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contras.map((contra, index) => (
                    <TableRow key={contra.name}>
                      <TableCell component="th" scope="row">
                        {contra.name}
                      </TableCell>
                      <TableCell align="start">{contra.cliente}</TableCell>
                      <TableCell align="center">
                        {contra.vencimentoContrato}
                      </TableCell>
                      <TableCell align="center">{contra.cpf}</TableCell>
                      <TableCell align="center">{contra.valorboleto}</TableCell>

                      <TableCell align="center">
                        {contra.diaPagamento}
                      </TableCell>
                      <TableCell align="center">{contra.status}</TableCell>
                      <TableCell align="center">
                        <div className="options-busca-boletos">
                          <ButtonIconTextoStart
                            corFundoBotao={"#006b33"}
                            corTextoBotao={"#ffff"}
                            fontWeightBotao={700}
                            icon={<ArticleIcon fontSize={"small"} />}
                          />
                          {contra.status === "Pendente" ? (
                            <div className="options-busca-boletos">
                              <ButtonIconTextoStart
                                corFundoBotao={"#006b33"}
                                corTextoBotao={"#ffff"}
                                fontWeightBotao={700}
                                icon={<PrintIcon fontSize={"small"} />}
                              />
                            </div>
                          ) : (
                            <div className="options-busca-boletos">
                              <ButtonIconTextoStart
                                corFundoBotao={"#D9D9D9"}
                                corTextoBotao={"#ffff"}
                                fontWeightBotao={700}
                                icon={<PrintIcon fontSize={"small"} />}
                              />
                            </div>
                          )}
                          <ButtonIconTextoStart
                            icon={<HighlightOffIcon fontSize={"small"} />}
                            corFundoBotao={"#FF0000"}
                            corTextoBotao={"#ffff"}
                            fontWeightBotao={700}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuscaBoletos;
