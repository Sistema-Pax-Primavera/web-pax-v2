import React, { useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./tables.css";

const TableComponent = ({ data }) => {
  const tableRef = useRef(null);
  const getColorByPercentage = (percentage) => {
    if (percentage <= 30) {
      return { backgroundColor: "red", color: "white", fontWeight: "bold" };
    } else if (percentage <= 55) {
      return { backgroundColor: "yellow", color: "green", fontWeight: "bold" };
    } else {
      return { backgroundColor: "green", color: "white", fontWeight: "bold" };
    }
  };

  useEffect(() => {
    const scrollTable = () => {
      if (tableRef.current) {
        tableRef.current.scrollTop += 1;
        if (
          tableRef.current.scrollTop ===
          tableRef.current.scrollHeight - tableRef.current.clientHeight
        ) {
          tableRef.current.scrollTop = 0;
        }
      }
    };

    const interval = setInterval(scrollTable, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ overflow: "hidden" }} className="container-tabelas-ranking">
      <TableContainer
        ref={tableRef}
        component={Paper}
        style={{
          maxHeight: "1400px", // Defina a altura máxima desejada para a tabela
          overflow: "hidden", // Adicione overflow: auto para ativar a barra de rolagem apenas quando necessário
        }}
      >
        <Table
          sx={{
            overflowX: "hidden",
          }}
          aria-label="simple table"
        >
          <TableHead
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,

              backgroundColor: "white",
            }}
          >
            <TableRow>
              <TableCell align="center">
                <p>Cobradores</p>
              </TableCell>
              <TableCell align="center">
                <p>1ª Parcela</p>
              </TableCell>
              <TableCell align="center">
                <p>2ª Parcela</p>
              </TableCell>
              <TableCell align="center">
                <p>3ª Parcela</p>
              </TableCell>
              <TableCell align="center">
                <p>Adiantados</p>
              </TableCell>
              <TableCell align="center">
                <p>Pontuação</p>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ overflow: "hidden" }}>
            {data.map((row, index) => (
              <TableRow key={index} sx={{ overflow: "hidden" }}>
                <TableCell align="center">
                  <label>{row.cobradores}</label>
                </TableCell>
                <TableCell align="center">
                  <label>{row.parcela1}</label>
                </TableCell>
                <TableCell align="center">
                  <label>{row.parcela2}</label>
                </TableCell>
                <TableCell align="center">
                  <label>{row.parcela3}</label>
                </TableCell>
                <TableCell align="center">
                  <label>{row.adiantados}</label>
                </TableCell>
                <TableCell
                  align="center"
                  style={getColorByPercentage(row.pontuacao)}
                >
                  <label>{row.pontuacao}</label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableComponent;
