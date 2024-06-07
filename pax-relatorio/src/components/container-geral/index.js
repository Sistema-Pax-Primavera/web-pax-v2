import React from 'react'
import './container-geral.css'

const ContainerGeral = ({ conteudo }) => {
    return (
      <div className="container-geral" >
        {conteudo}
      </div>
    );
  };
  
  export default ContainerGeral;