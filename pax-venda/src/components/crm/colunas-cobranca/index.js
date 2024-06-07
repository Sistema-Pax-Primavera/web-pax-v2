import React from "react";
import "./colunas-cobranca.css";
import CardsVenda from "../cards-venda";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Tooltip from '@material-ui/core/Tooltip';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import * as XLSX from 'xlsx';

const ColunasCobranca = ({ titulo, dados, numeros, onCardClick, modalTransferencia, modalArquivar }) => {

  const handleClickDownload = () => {
    const dadosFiltrados = dados.map(item => ({
      "Nome": item.nome,
      "Telefone": item.telefone,
      "Vendedor Atual Responsavel": item.vendedor_responsavel,
      "Indicado Por": item.indicado_por,
      "Data Criacao": item.criado_em,
      "Ultima Movimentacao": item.ultima_movimentacao,
      "Regiao": item.regiao,
      "Cidade": item.cidade,
      "UF": item.uf,
      "Observação": item.observacao
    }));
    const ws = XLSX.utils.json_to_sheet(dadosFiltrados);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Crm Vendas');
    XLSX.writeFile(wb, 'crmVendas.xlsx');
  };

  const handleClickArquivar = () => {
    modalArquivar(true);
  };

  const handleClickTransferencia = () => {
    modalTransferencia(true);
  };

  const handleClickCard = (cardData, titulo) => {
    onCardClick(cardData, titulo);
  };

  return (
    <div className="container-colunas-vendas-crm">
      <div className="title-filtro-info-vendas-crm">
        <label>{titulo}</label>
        <Tooltip title="Arquivar oportunidades">
          <DriveFileMoveIcon className="icon-button" onClick={() => handleClickArquivar()} fontSize="inherit" />
        </Tooltip>
        <Tooltip title="Transferir todos os cards dessa coluna para outro usuário">
          <SyncAltIcon className="icon-button" onClick={() => handleClickTransferencia()} fontSize="inherit" />
        </Tooltip>
        <Tooltip title="Exportar em Excel esta coluna">
          <DownloadForOfflineIcon className="icon-button" onClick={() => handleClickDownload()} fontSize="inherit" />
        </Tooltip>
        <p>{numeros}</p>
      </div>
      <div class="cards">
        {dados.map((item, index) => (
          <div class="item" key={index} onClick={() => handleClickCard(item, titulo)}>
            <CardsVenda item={item} onClick={onCardClick} tarefas={item.tarefas && item.tarefas.length > 0} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColunasCobranca;
