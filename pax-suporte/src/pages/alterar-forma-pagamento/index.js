import React, { useState } from "react";
import "./alterar-forma-pagamento.css";
import HeaderSuporte from "../../components/header-suporte";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ButtonIconTextoStart from "../../components/button-icon-texto-start";
import { toast } from "react-toastify";
import { useSuporte } from "../../services/api";
function createData(name, data, valorpagar, usuario) {
  return { name, data, valorpagar, usuario };
}

const rows = [
  createData("01", "22/05/2023", "100,00", "Marcos Lopez",),
  createData("02", "22/05/2023", "100,00", "Giovane"),
  createData("03", "23/05/2023", "100,00", "Rodrigo Luiz"),
];

const AlterarFormaPagamento = () => {
  const [numContrato, setNumContrato] = useState(null);
  const [titular, setTitular] = useState("");
  const [dataPagamento, setDataPagamento] = useState(null);
  const [pagamentos, setPagamentos] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selecteRowId, setSelectedRowID] = useState([]);
  const [selectFormPag, setSelectFormPag] = useState(null);
  const { getFormPagamento, alterarFormPagamento } = useSuporte();

  const handleRowClick = (index, id) => {
    const selectedIndex = selectedRows.indexOf(index);
    const selectedIdIndex = selecteRowId.indexOf(id);
    let newSelected = [];
    if (selectedIdIndex !== -1) {
      const newSelectedIds = [...selecteRowId];
      newSelectedIds.splice(selectedIdIndex, 1);
      setSelectedRowID(newSelectedIds);
    } else {
      // Caso contrário, adicione o ID à lista de IDs selecionados
      setSelectedRowID([...selecteRowId, id]);
    }
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, index);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1)
      );
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (index) => selectedRows.indexOf(index) !== -1;

  const pesquisar = async () => {
    try {
      if (numContrato) {
        console.log(numContrato)
        const data = await getFormPagamento(numContrato, dataPagamento);
        console.log(data)
        setTitular(data.cliente.titular)
        setPagamentos(data.pagamento);
      }
    } catch (error) {
      toast.error(error)
    }
  };

  const altFormPag = async () => {
    try {
      console.log(selecteRowId)
      if (selecteRowId.length > 0 && selectFormPag) {
        const contrato = numContrato;
        const parcelasSelecionadas = selectedRows;
        const formaPagto = selectFormPag;

        // Chamar a função para alterar a forma de pagamento para as parcelas selecionadas
        await alterarFormPagamento(contrato, parcelasSelecionadas, formaPagto);

        toast.success("Forma de pagamento alterada com sucesso.");

        // Limpar os campos após a alteração bem-sucedida
        setNumContrato("");
        setDataPagamento("");
        setTitular("");
        setPagamentos([]);
        setSelectedRows([]);
        setSelectedRowID([]);
        setSelectFormPag("");
      } else {
        toast.warning("Nenhuma linha selecionada.");
      }
    } catch (error) {
      toast.error("Erro ao tentar alterar a forma de pagamento:", error);
      // Trate o erro conforme necessário
    }
  };

  return (
    <div className="container-suporte">
      <HeaderSuporte />
      <div className="container-forma-pagamento">
        <div className="linhas-campos-forma-pagamento">
          <div className="campos-alterar-forma-pagamento">
            <label>Contrato</label>
            <input
              type="number"
              value={numContrato}
              onChange={(e) => {
                const inputValue = e.target.value;
                if (!isNaN(inputValue) && inputValue >= 0) {
                  setNumContrato(inputValue);
                }
              }}
            />
          </div>
          <div className="campos-alterar-contrato">
            <label>Data Pagamento</label>
            <input type="date" value={dataPagamento}
              onChange={(e) => { setDataPagamento(e.target.value) }} />
          </div>
          <div className="pesquisa-altera-caixa">
            <ButtonIconTextoStart
              title={"PESQUISAR"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"800"}
              funcao={() => pesquisar()}
            />
          </div>
        </div>
        <div className="tabela-alterar-caixa">
          <p>
            <AccountCircleIcon fontSize={"small"} /> {titular ? <p>{titular}</p> : 'Cliente'}
          </p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Vencimento</TableCell>
                  <TableCell align="center">Pagamento</TableCell>
                  <TableCell align="center">Valor Pagar</TableCell>
                  <TableCell align="center">Valor Pago</TableCell>
                  <TableCell align="center">Tipo Caixa</TableCell>
                  <TableCell align="center">Forma Pagto</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagamentos.map((row, index) => {
                  const isItemSelected = isSelected(index);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      style={{ backgroundColor: isItemSelected ? "#006b33" : "inherit" }}
                      onClick={() => handleRowClick(index, row.id)}
                      selected={isItemSelected}
                    >
                      <TableCell component="th" scope="row" style={{ color: isItemSelected ? "#ffffff" : "inherit" }}>
                        {row.data_vencimento}
                      </TableCell>
                      <TableCell align="center" style={{ color: isItemSelected ? "#ffffff" : "inherit" }}>{row.data_pagamento}</TableCell>
                      <TableCell align="center" style={{ color: isItemSelected ? "#ffffff" : "inherit" }}>{row.valor_pagar}</TableCell>
                      <TableCell align="center" style={{ color: isItemSelected ? "#ffffff" : "inherit" }}>{row.valor_pago}</TableCell>
                      <TableCell
                        align="center"
                        style={{ color: isItemSelected ? "#ffffff" : "inherit" }}>
                        {row.tipo_caixa === 'B' ? 'Bancário' :
                          row.tipo_caixa === 'E' ? 'Escritório' :
                            row.tipo_caixa === 'V' ? 'Vendas' : ''}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ color: isItemSelected ? "#ffffff" : "inherit" }}>
                        {row.forma_pagamento === 'B' ? 'Bancário' :
                          row.forma_pagamento === 'CD' ? 'Cartão de Débito' :
                            row.forma_pagamento === 'CC' ? 'Cartão de Crédito' :
                              row.forma_pagamento === 'P' ? 'PIX' : ''}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="linhas-campos-alterar-caixa">

          <div className="campos-alterar-forma-pagamento2">
            <label>Mudar Forma de Pagamento para:</label>
            <select value={selectFormPag} onChange={(e) => setSelectFormPag(e.target.value)}>
              <option value={"B"}>Bancario</option>
              <option value={"CD"}>Cartao de Debito</option>
              <option value={"CC"}>Cartao de Credito</option>
              <option value={"P"}>Pix</option>
            </select>
          </div>
          <div className="pesquisa-altera-caixa">
            <ButtonIconTextoStart
              title={"ALTERAR CAIXA"}
              corFundoBotao={"#006b33"}
              fontSizeBotao={"12px"}
              corTextoBotao={"#ffff"}
              fontWeightBotao={"700"}
              funcao={() => altFormPag()}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default AlterarFormaPagamento;
