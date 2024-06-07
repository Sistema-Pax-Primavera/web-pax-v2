import React from 'react';
import Header from '../../components/header/header';
import './historico-funeraria.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Carde from '../../components/card-funeraria';
import { useLocation } from 'react-router-dom';

const HistoricoFuneraria = () => {
    const location = useLocation();
    const cliente = location.state && location.state.cliente;
    const idioma = location.state && location.state.idioma;

    return (
        <div className='container-associados'>
            <Header cliente={cliente} idioma={idioma} />
            <div className='fundo-historico'>
                <div className='icones-nome'>
                    <label><AccountCircleIcon /> {cliente ? cliente.nome : ''} Nº do Contrato - {cliente ? cliente.n_contrato : ''}</label>
                </div>

                <div className='cards-funeraria'>
                    {cliente.historico_funerario.map((cliente, index) => (
                        <Carde
                            key={index}
                            nome={cliente.nome}
                            datanascimento={cliente.data_nascimento}
                            plano={cliente.plano}
                            datafalecimento={cliente.data_falecimento}
                            parentesco={cliente.parentesco}
                            datacremacao={cliente.data_cremacao}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}

export default HistoricoFuneraria;
