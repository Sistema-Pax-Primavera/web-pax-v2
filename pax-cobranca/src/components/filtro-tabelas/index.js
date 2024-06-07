import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

import "./filtro-tabelas1.css";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ButtonIcon from "../../../../pax-associado/src/components/button-icon/index";
import FiltroContrato from "../filtro-contrato";
import ButtonIconTextoStart from "../button-icon-texto-start";
import ModalCobradores from "../modal-regioes";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ModalRegioes from "../modal-regioes";





const label = { inputProps: { "aria-label": "Checkbox demo" } };

const FiltroTabelas1 = ({ toggleHeaderVisibility }) => {
  const [showSecondFilter, setShowSecondFilter] = useState(false);
  const [showFiltroContrato, setShowFiltroContrato] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false); 

  const handleOpen = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); // Define o estado de "open" como false para fechar a modal
  };
  

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

  const toggleSecondFilter = () => {
    setShowSecondFilter(!showSecondFilter);
  };



  const handleToggleFiltroContrato = () => {
    setShowFiltroContrato(!showFiltroContrato);
  };

  const isSelected = (index) => selectedRows.indexOf(index) !== -1;

  return (
    <div>
        <div className="container-filtro-envio">
          <div className="dois-blocos-envios">
            <div className="bloco-filtro2-envios">
              <button onClick={handleOpen}><PersonSearchIcon/> Rotas</button>
              <ModalRegioes open={open} handleClose={handleClose} handleOpen={handleOpen} />
            </div>
            <div className="bloco-filtro2-envios">
              <button onClick={handleOpen}><PersonAddAlt1Icon/> Cobradores</button>
              <ModalCobradores open={open} handleClose={handleClose} handleOpen={handleOpen} />
            </div>
            <div className="vendas-filtro-campos">
        <div className="numero-contrato-venda">
          <label>Contrato</label>
          <input type="number"></input>
        </div>
        <div className="numero-adicionar-contrato">
          <ButtonIconTextoStart
            fontSizeBotao="12px"
            corFundoBotao={"#006b33"}
            corTextoBotao={"#ffff"}
            fontWeightBotao="700"
            title={"ADICIONAR"}
          />
        </div>
        <div className="check-contrato-label">
          <Checkbox {...label} />
          <label>Marcar Todos</label>
        </div>
        <div className="check-contrato-label">
          <Checkbox {...label} />
          <label>Marcar Todos</label>
        </div>
      </div>
            
          </div>


        </div>

        <FiltroContrato
        />

    </div>
  );
};

export default FiltroTabelas1;
