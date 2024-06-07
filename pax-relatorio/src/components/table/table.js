import React, { useEffect, useState } from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './table.css';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ButtonText from "../button-texto";

const TableComponent = ({ headers, rows, actionCalls = {}, actionsLabel }) => {
    const [orderedBy, setOrderedBy] = useState(null)
    const [pageList, setPageList] = useState([]);
    const [idioma, setIdioma] = useState(null);
    const [isIdioma, setIsIdioma] = useState(true);
    const [descOrder, setDescOrder] = useState(headers.reduce((acc, { key }) => ({ ...acc, [key]: null }), {}))

    const orderTable = (list, column, desc) => {
        const newList = [...list]
        newList.sort((a, b) => {
            if (a[column] < b[column]) return -1
            if (a[column] > b[column]) return 1
            return 0
        })
        return desc[column] ? newList.reverse() : newList
    }

    const hasActions = Object.keys(actionCalls).length > 0
    const actionTypes = Object.keys(actionCalls)


    let headersList = hasActions
        ? headers.concat([{
            key: "actions",
            label: actionsLabel,
        }])
        : [...headers]

    const acoes = (action, row) => {
        let actions = {
            delete: (
                <div class='delete-botao'>
                    < button
                        key="delete"
                        onClick={() => actionCalls.delete(row)}
                    ><DeleteForeverIcon fontSize={'small'} /></ button>
                </div>
            ),
            edit: (
                <div class='edit-botao'>
                    <button
                        key="edit"
                        onClick={() => actionCalls.edit(row)}>
                        <ModeEditOutlineIcon fontSize={'small'} />
                    </button>
                </div>
            ),
            view: (
                <ButtonText
                    funcao={() => actionCalls.view(row)}
                    key="view"
                    title="ABRIR"
                />
            ),
            promote: (
                <ButtonText
                    funcao={() => actionCalls.promote(row)}
                    key="view"
                    title="PROMOVER"
                />
            )
        }

        return actions[action]

    }


    const verificaIdioma = () => {
        const savedUsuario = localStorage.getItem("usuario");
        if (savedUsuario) {
            const usuarioObj = JSON.parse(savedUsuario)
            setIdioma(usuarioObj.idioma === 'BR' ? 0 : 1);
        }
        setIsIdioma(false)
    }

    useEffect(() => {
        verificaIdioma();
        setPageList(rows)
    }, [rows, localStorage.getItem("usuario")])

    return (
        <TableContainer component={Paper} className="TableContainerRelatorio">
            <Table aria-label='simple table'>
                <TableHead className="TableHeadRelatorio">
                    <TableRow>
                        {headersList.map(({ key, label, sort = false }) =>
                            <TableCell
                                key={key}
                                align="center"
                                className="cursor-pointer:  true"
                                onClick={() => {
                                    if (sort) {
                                        setPageList(orderTable(rows, key, descOrder))
                                        setDescOrder({ ...descOrder, [key]: !descOrder[key] })
                                        setOrderedBy(key)
                                    }
                                }}
                            >
                                <span >
                                    {label[idioma] ?? label[0]}
                                </span>

                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody className="TableBodyRelatorio">
                    {pageList.map((row, rowIndex) =>
                        <TableRow
                            key={{ row } - { rowIndex }}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {headersList.map(({ key }, colIndex) => {

                                return (
                                    <TableCell
                                        key={key - rowIndex - colIndex}
                                        align='center'
                                    >
                                        <div>
                                            {(hasActions && key === "actions") &&
                                                <div>
                                                    {
                                                        actionTypes.map((action) => acoes(action, row))
                                                    }
                                                </div>
                                            }
                                            {(key !== "actions") && (row[key] || "-")}
                                        </div>

                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default TableComponent;

