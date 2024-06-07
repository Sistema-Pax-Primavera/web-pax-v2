import React from 'react'
import Header from '../../components/header/header';
import './historico-clinica.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from 'react-router-dom';
import CardeClinica from '../../components/card-clinica';
import Dentista from '../../../assets/destista.png';
import Estetica from '../../../assets/estetica.png';
import Exame from '../../../assets/exame.png';

const HistoricoClinica = () => {
    const location = useLocation();
    const cliente = location.state && location.state.cliente;
    const idioma = location.state && location.state.idioma;

    return (
        <>
            <div className='container-associados'>
                <Header cliente={cliente} idioma={idioma} />
                <div className="historico-clinica-funeraria">
                    <div className='icones-nome'>
                        <label><AccountCircleIcon /> {cliente ? cliente.nome : ''} Nº do Contrato - {cliente ? cliente.n_contrato : ''}</label>
                    </div>
                    <div className="historico-container-clinica">
                        {cliente.historico_clinico.map((cliente, index) => (
                            <CardeClinica
                                key={index}
                                imagem={cliente.procedimento == 'Consulta' ? Exame : Estetica}
                                nome={cliente.nome}
                                procedimento={cliente.procedimento}
                                datanascimento={cliente.data_nascimento}
                                dataprocedimento={cliente.data_procedimento}
                                status={cliente.status}
                            />
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}

export default HistoricoClinica;
