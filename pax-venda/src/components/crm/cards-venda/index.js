import React from "react";
import "./cards-cobranca.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CallIcon from '@mui/icons-material/Call';
import ForwardIcon from '@mui/icons-material/Forward';
import EventIcon from '@mui/icons-material/Event';
import { converterData, formatarTelefone } from "../../../utils/fuctions";

const CardsVenda = ({ item, onClick, tarefas }) => {

  const { nome, vendedor_responsavel, telefone, indicado_por, criado_em, ultima_movimentacao } = item;

  return (
    <div className="container-cards-cobranca" onClick={onClick}>
      <div className="info-card-cobran">
        <AccountCircleIcon fontSize={"small"} />
        <label>{nome}</label>
      </div>
      <div className="info-card-cobran">
        <CallIcon fontSize={"small"} />
        <label>{telefone}</label>
      </div>
      <div className="info-card-cobran">
        <AccountCircleIcon fontSize={"small"} />
        <label title='Vendedor atualmente responsável por essa lead'>{vendedor_responsavel}</label>
      </div>
      <div className="info-card-cobran">
        <ForwardIcon fontSize={"small"} />
        <label title='Nome de quem indicou'>{indicado_por}</label>
      </div>
      <div className="info-card-cobran">
        <DateRangeIcon fontSize={"small"} />
        <label title='Data de criação'>{criado_em}</label>
      </div>
      <div className="info-card-cobran">
        <label title={`Última Movimentação: ${ultima_movimentacao}`}>
          <QueryBuilderIcon fontSize={"small"} />
        </label>
        {tarefas ?
          <label title='Possui tarefas agendadas'>
            <EventIcon fontSize={"small"} />
          </label>
          : <></>
        }
      </div>
    </div>
  );
};

export default CardsVenda;
