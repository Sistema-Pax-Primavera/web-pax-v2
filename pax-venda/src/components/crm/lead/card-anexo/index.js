import React from 'react';
import './card-anexo.css';

const CardAnexoComponent = ({ data }) => {
    return (
        <div className="container-card-anexo">
            {data.length === 0 ? (
                <div className="no-attachments">
                    <label>Sem anexos</label>
                </div>
            ) : (
                data.map((anexo, index) => (
                    <div key={index} className="card-anexo">
                        <div className="card-anexo-titulo">{anexo.titulo}</div>
                        <div className="card-anexo-botoes">{"botoes"}</div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CardAnexoComponent;
