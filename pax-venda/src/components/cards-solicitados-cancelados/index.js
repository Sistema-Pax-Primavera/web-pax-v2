import React, { useState } from "react";
import "./cards-solicitacoes-cobradores.css";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // Ícone para o botão "Aguardando sincronização"
import ButtonIconTextoStart from '../button-icon-texto-start'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CardsSolicitadosCancelados = ({ onAceitar, mostraBotoes, onRejeitar, onAguardandoSincronizacao, textoAdicional }) => {
  const [status, setStatus] = useState('pendente');

  const handleAceitar = () => {
    setStatus('emAtendimento');
    onAceitar();
  };

  const handleRejeitar = () => {
    setStatus('rejeitado');
    onRejeitar();
  };

  // Função para definir o status como "Aguardando sincronização"
// Função para definir o status como "Aguardando sincronização"
const handleAguardandoSincronizacao = () => {
  console.log("Chamando função handleAguardandoSincronizacao");
  setStatus('aguardandoSincronizacao');
  onAguardandoSincronizacao(); // Chama a função fornecida pelo pai
};



  return (
    <div className="card-soli-cobrad">
      <div className="numero-soli-nome">
        <label>Solicitação 01</label>
        <p>Carlos Henrique</p>
      </div>
      <div className="primeira-categoria-soli">
        <div className="duas-categorias-solicitacoes">
          <CalendarMonthIcon fontSize={"medium"} />
          <div className="categoria-resul-soli">
            <label>Data</label>
            <p>Teste 01</p>
          </div>
        </div>
        <div className="duas-categorias-solicitacoes">
          <LocationOnIcon fontSize={"medium"} />
          <div className="categoria-resul-soli">
            <label>Unidade</label>
            <p>Teste 01</p>
          </div>
        </div>
      </div>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's.
      </p>
      <div>{textoAdicional}</div>
      <div className="aceita-regeita-soli-cob">
        {status === 'pendente' && mostraBotoes && (
          <>
            <div className="buttaos-soli">
              <ButtonIconTextoStart
                title={"ACEITAR"}
                icon={<AddTaskOutlinedIcon fontSize={'small'}/>}
                fontSize="10"
                fontWeightBotao="700"
                corFundoBotao="#006b33"
                corTextoBotao="#ffff"
                funcao={handleAceitar}
              />
            </div>
            <div className="buttaos-soli">
              <ButtonIconTextoStart
                title={"REJEITAR"}
                icon={<HighlightOffOutlinedIcon fontSize={'small'}/>}
                fontSize="10"
                fontWeightBotao="700"
                corFundoBotao="#FF0000"
                corTextoBotao="#ffff"
                funcao={handleRejeitar}
              />
            </div>
          </>
        )}
        {status === 'emAtendimento' && (
          <div className="buttaos-soli">
            <ButtonIconTextoStart
              title={"Aguardando sincronização"}
              icon={<HourglassEmptyIcon fontSize={'small'}/>}
              fontSize="10"
              fontWeightBotao="700"
              corFundoBotao="#999"
              corTextoBotao="#ffff"
              funcao={handleAguardandoSincronizacao}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardsSolicitadosCancelados;
