import React, { useState } from "react";
import "./modal-regioes.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Checkbox from "@mui/material/Checkbox";
import ButtonText from "../../../../pax-associado/src/components/button-texto";
import ButtonIcon from "../../../../pax-associado/src/components/button-icon";
import AnalyticsIcon from "@mui/icons-material/Analytics";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function createData(cobrador, quantidade, status, opcao) {
  return { cobrador, quantidade, status, opcao };
}

const rows = [
  createData("Thiago Gonsalvezs", 11, "ATIVO"),
  createData("Diogo Perez", 10, "ATIVO"),
  createData("Marcos Lopez", 15, "ATIVO"),
  createData("Thiago Gonsalvez", 11, "ATIVO"),
  createData("Diogo Perez", 10, "ATIVO"),
  createData("Marcos Lopez", 15, "ATIVO"),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  height: 450,
  bgcolor: "background.paper",
  borderRadius: 5,
  p: 4,
};

const ModalRegioes = ({ open, handleClose, handleOpen }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    let newSelected = [];

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

  const toggleFiltroContrato = () => {
    toggleHeaderVisibility();
    setShowFiltroContrato(!showFiltroContrato);
  };
  return (
    <div className="container-modal-cobradores">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div className="modal-cobradores-fecha">
              <button onClick={handleClose}>
                <HighlightOffIcon />
              </button>
            </div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="filtro-envios">
              <div className="check-ativo-inativo-env">
                <div className="campos-envio-filtro">
                  <Checkbox {...label} size="small" color="success" />
                  <label>Somente Ativos</label>
                </div>
                <div className="campos-envio-filtro">
                  <Checkbox {...label} size="small" color="success" />
                  <label>Somente com Clientes</label>
                </div>
              </div>

              <div className="pesquisa-envio">
                <ButtonText title="PESQUISAR" />
                <ButtonText title="FILTRO 2" funcao={toggleSecondFilter} />
              </div>
            </div>
          <div className="filtro-resultado-envios">
            <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="start" sx={{ fontSize: 12 }}>
                      Cobrador
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      Quantidade
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: 12 }}>
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody sx={{}}>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      onClick={() => handleRowClick(index)}
                      selected={isSelected(index)}
                      sx={{
                        backgroundColor: isSelected(index)
                          ? "#006b33"
                          : "inherit",
                        color: isSelected(index) ? "white" : "inherit",
                        cursor: "pointer",
                        "&:last-child td, &:last-child th": {
                          border: 0,
                          overflow: "auto",
                        },
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: 12,
                          color: isSelected(index) ? "white" : "inherit",
                        }}
                      >
                        {row.cobrador}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: 12,
                          color: isSelected(index) ? "white" : "inherit",
                        }}
                      >
                        {row.quantidade}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontSize: 12,
                          color: isSelected(index) ? "white" : "inherit",
                        }}
                      >
                        {row.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalRegioes;
