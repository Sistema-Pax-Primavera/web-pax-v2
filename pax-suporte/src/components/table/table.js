import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../pages/suporte";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TableComponent = ({ headers, rows, actionCalls = {}, actionsLabel, onRowSelect }) => {
  const [orderedBy, setOrderedBy] = useState(null);
  const [pageList, setPageList] = useState([]);
  const [idioma, setIdioma] = useState(null);
  const [isIdioma, setIsIdioma] = useState(true);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [descOrder, setDescOrder] = useState(
    headers.reduce((acc, { key }) => ({ ...acc, [key]: null }), {})
  );

  const orderTable = (list, column, desc) => {
    const newList = [...list];
    newList.sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    return desc[column] ? newList.reverse() : newList;
  };

  const hasActions = Object.keys(actionCalls).length > 0;
  const actionTypes = Object.keys(actionCalls);

  let headersList = hasActions
    ? headers.concat([
      {
        key: "actions",
        label: actionsLabel,
      },
    ])
    : [...headers];

  const acoes = (action, row) => {
    let actions = {
      delete: (
        console.log('delete')
        // <ButtonIcon
        //   funcao={() => actionCalls.delete(row)}
        //   key="delete"
        //   icon={<DeleteForeverIcon fontSize={"small"} />}
        // />
      ),
      edit: (
        console.log('edit')
        // <ButtonIcon
        //   funcao={() => actionCalls.edit(row)}
        //   key="edit"
        //   icon={<ModeEditOutlineIcon fontSize={"small"} />}
        // />
      ),
      view: (
        console.log('view')
        // <ButtonIcon
        //   funcao={() => actionCalls.view(row)}
        //   key="view"
        //   icon={<VisibilityIcon fontSize={"small"} />}
        // />
      ),
      promote: (
        console.log('promote')
        // <div key="promote" style={{ padding: '2.5px', backgroundColor: '#006b33', borderRadius: '5px' }}>
        // <ButtonText
        //   key="promote"
        //   title="PROMOVER"
        //   funcao={() => actionCalls.promote(row)}
        //   style={{padding: '80px'}}
        // />
        // </div>
      ),
    };

    return actions[action];
  };

  const verificaIdioma = () => {
    const savedUsuario = localStorage.getItem("usuario");
    if (savedUsuario) {
      const usuarioObj = JSON.parse(savedUsuario);
      setIdioma(usuarioObj.idioma === "BR" ? 0 : 1);
    }
    setIsIdioma(false);
  };

  // Função para lidar com a seleção de linha
  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
    if (onRowSelect) {
      onRowSelect(rows[index]);
    }
  };

  useEffect(() => {
    verificaIdioma();
    setPageList(rows);
  }, [rows, localStorage.getItem("usuario")]);



  return (
    <TableContainer component={Paper} className="TableContainer">
      <Table aria-label="simple table">
        <TableHead className="TableHead">
          <TableRow>
            {headersList.map(({ key, label, sort = false }) => (
              <TableCell
                align="center"
                className={`cursor-pointer ${sort ? '' : 'hidden'}`}
                onClick={() => {
                  if (sort) {
                    setPageList(orderTable(rows, key, descOrder));
                    setDescOrder({ ...descOrder, [key]: !descOrder[key] });
                    setOrderedBy(key);
                  }
                }}
                style={{ display: sort ? 'table-cell' : 'none' }}
              >
                <span>{label[idioma] ?? label[0]}</span>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className="TableBody">
          {pageList.map((row, rowIndex) => (
            <TableRow
              key={{ row } - { rowIndex }}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: selectedRow === rowIndex ? "#c8e6c9" : "", // Destacar a linha selecionada
              }}
              onClick={() => handleRowClick(rowIndex)}
            >
              {headersList.map(({ key }, colIndex, sort = false) => {
                return (
                  <TableCell
                    key={key - rowIndex - colIndex}
                    align="center"
                    className={`cursor-pointer ${sort ? '' : 'hidden'}`}
                  >
                    <div>
                      {hasActions && key === "actions" && (
                        <div className="opcao-associado">
                          {actionTypes.map((action) => acoes(action, row))}
                        </div>
                      )}
                      {key !== "actions" && sort && (row[key] || "-")}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
