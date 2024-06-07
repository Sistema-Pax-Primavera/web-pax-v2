import React from 'react'
import './subcontainer-geral.css'

const SubcontainerGeral = ({ conteudo, width, height, alignItens, justifyContent, flexDirection }) => {
  const estilos = {
    display: 'flex',
    alignItems: alignItens,
    justifyContent: justifyContent,
    width: '85%' || width,
    height: height,
    flexDirection: 'column' || flexDirection,
  };

  return (
    <div className='subcontainer-geral' style={estilos}>
      {conteudo}
    </div>
  )
}

export default SubcontainerGeral
