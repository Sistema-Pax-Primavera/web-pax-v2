import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './pdr.css'
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DateMaskInput from '../../components/inputs';
import MyAccordion from '../../components/accordion';
import { useLocation } from 'react-router-dom';
import TableComponent from '../../components/table/table';
import { headerPDR } from '../../entities/headers/header-pdr';
import ButtonText from '../../components/button-texto';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PDR = () => {
    const location = useLocation();
    const clienteInicial = location.state && location.state.cliente;
    const idioma = location.state && location.state.idioma;
  
    const [cliente, setCliente] = useState(clienteInicial);

    useEffect(() => {
        if (cliente) {
            console.log('Dados do cliente recebidos no PDR:', cliente);
        }
    }, [cliente]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCliente(prevCliente => ({
            ...prevCliente,
            [name]: value
        }));
    };

    const handleSalva = () => {
        toast.success('PDR salvo com sucesso!');
    };


    return (
        <>
            <div className='container-associados'>
                <Header cliente={cliente} idioma={idioma} />
                <div className='container'>
                    <MyAccordion
                        title={`${cliente ? cliente.nome : ''} Nº do Contrato - ${cliente ? cliente.n_contrato : ''}`}
                        icon={<AccountCircleIcon />}
                        expandedIcon={<ExpandMoreIcon />}
                    >
                        <div className='divisao-align-itens'>
                            <div className='layout-linha'>
                                <div className='container-linha'>
                                    <div className='campos-01'>
                                        <label>Endereço</label>
                                        <input
                                            type='text'
                                            name='endereco'
                                            value={cliente.rua_residencial + ', Bairro:' + cliente.bairro_residencial + ', Nº:' + cliente.numero_residencial}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='campos-06-pdr'>
                                        <label>Último Pagamento</label>
                                        <DateMaskInput
                                            name='ultimo_pagamento'
                                            data={cliente.ultimo_pagamento}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='campos-03'>
                                        <label>Status</label>
                                        <input
                                            type='text'
                                            name='status'
                                            value={cliente.plano}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='campos-02'>
                                        <label>Plano</label>
                                        <input
                                            type='text'
                                            name='plano'
                                            value={cliente.plano}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='data-contrato'>
                                        <label>Data Contrato</label>
                                        <DateMaskInput
                                            name='data_contrato'
                                            data={cliente.data_contrato}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='campos-02'>
                                        <label>Dia Pagamento</label>
                                        <input
                                            type='text'
                                            name='dia_pagamento'
                                            value={cliente.dia_pagamento}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='campos-01'>
                                        <label>Região</label>
                                        <input
                                            type='text'
                                            name='regiao'
                                            value={cliente.regiao}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className='container-linha'>

                                </div>
                            </div>
                        </div>
                    </MyAccordion>
                    <MyAccordion
                        title="Histórico de Recebimento"
                        icon={<AnalyticsIcon />}
                        expandedIcon={<ExpandMoreIcon />}
                    >

                            <div className='container-linha'>
                                <TableComponent
                                    headers={headerPDR}
                                    rows={cliente.historico_recebimento}
                                    actionsLabel={["Ações", "Acciones"]}
                                    actionCalls={{
                                        //delete: (e) => console.log(e),
                                        //edit: (e) => handleEditDependente(e),
                                        //view: (e) => handleOpenButtonClick(e),
                                        //promote: (e) => console.log('promover'),
                                    }}
                                    onChange={handleChange}
                                />
                            </div>
                        
                    </MyAccordion>

                    <div className='salvar-associado'>
                    <ButtonText
                    title="SALVAR"
                    funcao={handleSalva}/>
                    </div>

                </div>
            </div>

        </>
    );
};

export default PDR;
