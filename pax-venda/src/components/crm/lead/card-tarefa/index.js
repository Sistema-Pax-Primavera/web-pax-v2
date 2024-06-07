import React from 'react';
import './card-tarefa.css';
import { converterDataParaFormatoBrasileiro } from '../../../../utils/fuctions';

const CardTarefaComponent = ({ data }) => {
    return (
        data.map((tarefa, index) => (
            <div key={index} className="card-tarefa-crm">
                <div key={index} className="card-date">
                    <div className="card-tarefa-crm-date">{converterDataParaFormatoBrasileiro(tarefa.data)}</div>
                </div>
                <div className="card-tarefa-crm-category">{tarefa.categoria}</div>
            </div>
        ))

    );
};

export default CardTarefaComponent;
