import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import './list-atividade.css';
import { converterDataHora } from '../../../../utils/fuctions';

const ListaAtividade = ({ data }) => {
    return (
        <div className="list-atividade">
            {data.map((atividade, index) => (

                <div key={index} className="atividade-item">
                    <div className="atividade-header">
                        <PersonIcon fontSize='small' />
                        <div className="user-info">
                            <span className="user-name">{atividade.criado_por}</span>
                            <span className="creation-date">{converterDataHora(atividade.criado_em)}</span>
                        </div>
                    </div>
                    <div className="atividade-content">
                        <span className="atividade-title">{atividade.tipo}: </span>
                        {atividade.tipo === 'Oportunidade transferida para'
                            ? <span className="atividade-title">Vendedor {atividade.transferido_para}</span>
                            : <span className="atividade-description">{atividade.descricao}</span>
                        }

                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaAtividade;
