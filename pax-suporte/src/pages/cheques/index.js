import React, { useEffect, useState } from "react";
import "./cheques.css";
import HeaderSuporte from "../../components/header-suporte";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Checkbox from "@mui/material/Checkbox";
import ArticleIcon from "@mui/icons-material/Article";
import ModalCheque from "../../components/modal-cheques";
import { toast } from "react-toastify";
import { useSuporte } from "../../services/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Cheques = () => {
  const [status, setStatus] = useState(null);
  const [cheques, setCheques] = useState([]);
  const [nCheque, setNCheque] = useState("");
  const [agencia, setAgencia] = useState("");
  const [conta, setConta] = useState(null);
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState(null);
  const [dataCheque, setDataCheque] = useState(null);
  const [banco, setBanco] = useState(null);
  const { getCheques } = useSuporte();

  useEffect(async () => {
    try {
      const data = await getCheques(status);
      setCheques(data)
    } catch (error) {
      toast.error(error)
    }
  }, []);

  return (
    <div className="container-suporte">
      <HeaderSuporte />
      <div className="container-cheque">
        <div className="linhas-campos-cheque">
          <div className="campos-alterar-cheque">
            <label>Filtro de Cheques</label>
            <div className="filtro-cheques">
              <Checkbox size="small" {...label} />
              <label>Abertos</label>
              <Checkbox size="small" {...label} />
              <label>Repassados</label>
              <Checkbox size="small" {...label} />
              <label>Devolvidos</label>
            </div>
          </div>

          <div className="pesquisa-cheque">
            <ModalCheque
              height={230}
              width={500}
              title={"CADASTRAR CHEQUE"}
              corFundoBotao={"#006b33"}
              corTextoBotao={'#ffff'}
              fontSizeBotao={'12px'}
              fontWeightBotao={700}
              conteudo={
                <div className="modal-cheque1">
                  <div className="linhas-campos-cheque">
                    <div className="campos-alterar-contrato-modal">
                      <label>Nº do Cheque</label>
                      <input></input>
                    </div>
                    <div className="campos-alterar-contrato-modal">
                      <label>Agência</label>
                      <input></input>
                    </div>
                    <div className="campos-alterar-contrato-modal">
                      <label>Conta</label>
                      <input></input>
                    </div>
                  </div>
                  <div className="linhas-campos-cheque">
                    <div className="campos-alterar-contrato-modal2">
                      <label>Banco</label>
                      <select></select>
                    </div>
                    <div className="campos-alterar-contrato-modal2">
                      <label>Data Cheque</label>
                      <input></input>
                    </div>
                  </div>
                  <div className="linhas-campos-cheque">
                    <div className="campos-alterar-contrato-modal2">
                      <label>Nome Impresso</label>
                      <select></select>
                    </div>
                    <div className="campos-alterar-contrato-modal2">
                      <label>Valor do Cheque</label>
                      <input></input>
                    </div>
                  </div>
                  <div className="campos-alterar-contrato-modal">
                    <ButtonIconTextoStart
                      title={"CADASTRAR CHEQUE"}
                      corFundoBotao={"#006b33"}
                      corTextoBotao={"#ffff"}
                      fontWeightBotao={700}
                    />
                  </div>
                </div>
              }
            />
          </div>
          <div className="pesquisa-cheque">
            <ButtonIconTextoStart
              title={"BAIXAR CHEQUE"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"700"}
            />
          </div>
        </div>
        <div className="tabela-cheque">
          <p>
            <AccountCircleIcon fontSize={"small"} /> Cliente
          </p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Data Cheque</TableCell>
                  <TableCell align="start">Nome Responsável</TableCell>
                  <TableCell align="center">Número Cheque</TableCell>
                  <TableCell align="start">Dados Bancários</TableCell>
                  <TableCell align="start">Valor</TableCell>
                  <TableCell align="start">Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cheques.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.data}
                    </TableCell>
                    <TableCell align="start" >{row.nome}</TableCell>
                    <TableCell align="center">{row.numero_cheque}</TableCell>
                    <TableCell align="start">Agencia:{row.agencia} Conta:{row.conta} - {row.banco}</TableCell>
                    <TableCell align="center">{row.valor}</TableCell>
                    <TableCell align="start">
                      <div>
                        <ModalCheque
                          height={180}
                          width={500}
                          icon={<ArticleIcon fontSize={"small"} />}
                          corTextoBotao={"#006b33"}
                          conteudo={
                            <div className="modal-cheque1">
                              <div className="linhas-campos-cheque">
                                <div className="campos-alterar-contrato-modal">
                                  <label>Nº do Cheque</label>
                                  <input type="number" value={row.numero_cheque} />
                                </div>
                                <div className="campos-alterar-contrato-modal">
                                  <label>Agência</label>
                                  <input type="number" value={row.agencia} />
                                </div>
                                <div className="campos-alterar-contrato-modal">
                                  <label>Conta</label>
                                  <input type="number" value={row.conta} />
                                </div>
                              </div>
                              <div className="linhas-campos-cheque">
                                <div className="campos-alterar-contrato-modal2">
                                  <label>Banco</label>
                                  <select value={banco || ""} onChange={(e) => setBanco(e.target.value)}>
                                    <option value={1}>Banco do Brasil</option>
                                    <option value={2}>Bradesco</option>
                                    <option value={3}>Sicredi</option>
                                  </select>
                                </div>
                                <div className="campos-alterar-contrato-modal2">
                                  <label>Data Cheque</label>
                                  <input type="date" value={row.data}></input>
                                </div>
                              </div>
                              <div className="linhas-campos-cheque">
                                <div className="campos-alterar-contrato-modal2">
                                  <label>Nome Impresso</label>
                                  <input type="text" value={row.nome}></input>
                                </div>
                                <div className="campos-alterar-contrato-modal2">
                                  <label>Valor do Cheque</label>
                                  <input type="text" value={row.valor} />
                                </div>
                              </div>
                            </div>
                          }
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
  );
};

export default Cheques;
