import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import './dados_cobranca.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import DateMaskInput from '../../components/inputs';
import { useLocation } from 'react-router-dom';
import ButtonText from '../../components/button-texto';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const DadosCobranca = () => {
  const location = useLocation();
  const clienteInicial = location.state && location.state.cliente;
  const idioma = location.state && location.state.idioma;
  
  const [cliente, setCliente] = useState(clienteInicial);
  const [transferidoAtivada, setTransferidoAtivada] = useState(clienteInicial.is_transferido);
  const [pagarAdesaoAtivada, setPagarAdesaoAtivada] = useState(clienteInicial.is_pagou_adesao);
  
  const SwitchTransferido = () => {
    setTransferidoAtivada(!transferidoAtivada);
    setCliente(prevCliente => ({
      ...prevCliente,
      is_transferido: !prevCliente.is_transferido
    }));
  };
  
  const SwitchAdesao = () => {
    setPagarAdesaoAtivada(!pagarAdesaoAtivada);
    setCliente(prevCliente => ({
      ...prevCliente,
      is_pagou_adesao: !prevCliente.is_pagou_adesao
    }));
  };

  useEffect(() => {
    if (cliente) {
      console.log('Dados do cliente recebidos no Dados Cobranca:', cliente);
    }
  }, [cliente]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCliente(prevCliente => ({
      ...prevCliente,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log("cai aqui")
    toast.success('Dados de cobrança salvo com sucesso!');
};


  return (
    <>
      <div className='container-associados'>
        <Header cliente={cliente} idioma={idioma} />
        <div className='dados-cobranca-associado'>
          <div className='fundo-cobranca'>
            <div className='icones-nome'>
              <label><AccountCircleIcon fontSize={'small'} />{cliente ? cliente.nome : ''} Nº do Contrato - {cliente ? cliente.n_contrato : ''} </label>
            </div>
            <div className='container-linha'>
              <div className='campos-02-cobranca'>
                <label>Dia de Pagamento<span className='obrigatorio'> *</span></label>
                <input name="dia_pagamento" value={cliente.dia_pagamento} onChange={handleChange} />
              </div>
              <div className='campos-cadastrais-02'>
                <label>Primeria Parcela<span className='obrigatorio'> *</span></label>
                <DateMaskInput name="data_primeira_parcela" data={cliente.data_primeira_parcela} onChange={handleChange} />
              </div>
              <div className='campos-03-cobranca'>
                <label>Ordem Rota<span className='obrigatorio'> *</span></label>
                <input name="ordem_rota" value={cliente.ordem_rota} onChange={handleChange} />
              </div>
              <div className='campos-cadastrais-04'>
                <label>Contrato<span className='obrigatorio'> *</span></label>
                <input name="n_contrato" value={cliente.n_contrato} onChange={handleChange} />
              </div>
              <div className='campos-cadastrais-02'>
                <label>Plano<span className='obrigatorio'> *</span></label>
                <select name="plano" value={cliente.plano} onChange={handleChange}>
                  <option value={cliente.plano}>{cliente.plano}</option>
                </select>
              </div>
              <div className='campos-cadastrais-06'>
                <label>Região<span className='obrigatorio'> *</span></label>
                <select name="regiao" value={cliente.regiao} onChange={handleChange}>
                  <option value={'Norte'}>Norte</option>
                  <option value={'Sul'}>Sul</option>
                  <option value={'Sudeste'}>Sudeste</option>
                  <option value={'Nordeste'}>Nordeste</option>
                </select>
              </div>
            </div>
            <div className='container-linha'>
              <div className='campos-cadastrais-04'>
                <label>Transferido</label>
                <Switch
                  checked={transferidoAtivada}
                  onChange={SwitchTransferido}
                  size="small" />
              </div>
              <div className='campos-cadastrais-02'>
                <label>Pagar Adesão</label>
                <Switch
                  checked={pagarAdesaoAtivada}
                  onChange={SwitchAdesao}
                  size="small" />
              </div>
            </div>

          </div>
          <div className='salvar-associado'>
           <ButtonText 
           title="SALVAR"
           funcao={handleSave}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default DadosCobranca;
