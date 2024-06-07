import React from "react";
import "./cards-cobranca.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { converterData, formatarTelefone } from "../../utils/fuctions";

const CardsCobranca = ({ item, onClick, }) => {
  const { nome, contrato, valor_em_aberto, ultimo_pagamento, dia_pagamento, ultimo_mes_pago, rota } = item;

  return (
    <div className="container-cards-cobranca" onClick={onClick}>
      <div className="info-card-cobran">
        <AccountCircleIcon fontSize={"small"} />
        <label>{nome} - CT:{contrato}</label>
      </div>
      <div className="info-card-cobran">
        <DateRangeIcon fontSize={"small"} />
        <label>Últ. pagto: {ultimo_pagamento}</label>
      </div>
      <div className="info-card-cobran">
        <QueryBuilderIcon fontSize={"small"} />
        <label>Valor em Aberto: R$ {valor_em_aberto}</label>
      </div>
      <div className="info-card-cobran">
        <DateRangeIcon fontSize={"small"} />
        <label>Últ. mês pago: {ultimo_mes_pago}</label>
      </div>
      <div className="info-card-cobran">
        <DateRangeIcon fontSize={"small"} />
        <label>Dia Pagamento: {dia_pagamento}</label>
      </div>
      <div className="info-card-cobran">
        <DateRangeIcon fontSize={"small"} />
        <label>Rota: {rota}</label>
      </div>
    </div>
  );
};

export default CardsCobranca;
