import React from 'react'
import Header from '../../components/header/header';
import './historico-pet.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useLocation } from 'react-router-dom';
import CardePet from '../../components/card-pet';
import PetImage from '../../../assets/pet.png'; // Importe a imagem padrão
import ConsultaImage from '../../../assets/consulta.png'; // Importe a imagem para consulta
import Castracao from '../../../assets/castracao.png';

const HistoricoPET = () => {
    const location = useLocation();
    const cliente = location.state && location.state.cliente;
    const idioma = location.state && location.state.idioma;;

    return (
        <>
            <div className='container-associados'>
                <Header cliente={cliente} idioma={idioma} />
                <div className='fundo-historico'>
                    <div className='icones-nome'>
                        <label><AccountCircleIcon /> {cliente ? cliente.nome : ''} Nº do Contrato - {cliente ? cliente.n_contrato : ''}</label>
                    </div>
                    <div className='cards-funeraria'>
                        {cliente.historico_pet.map((cliente, index) => (
                            <CardePet
                                key={index}
                                imagem={cliente.procedimento == 'Vacinação' ? ConsultaImage : PetImage}
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

export default HistoricoPET;
