import React from 'react';
import Formulario from '../../components/formulario';
import HeaderVendas from '../../components/header';
import './cadastro.css'


const Cadastro = () => {

    return (
        <div className='container-contratos-vendas'>
            <HeaderVendas />
            <div className='formulario-cadastro-contrato'>
                <Formulario dadosIniciais={{}}  />
            </div>

        </div>
    );
};

export default Cadastro;
