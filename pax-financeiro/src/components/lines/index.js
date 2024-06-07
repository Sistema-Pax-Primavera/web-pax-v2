import React from 'react';

const Lines = ({ gap, display, flexDirection, alignItems, justifyContent, conteudo, width }) => {
  const estilos = {
    gap: gap || '5px',
    display: display || 'flex',
    flexDirection: flexDirection || 'row',
    alignItems: alignItems || 'center',
    justifyContent: justifyContent || 'flex-start',
    width: width || '100%',
  };
  return <div style={estilos}>{conteudo}</div>;
};

export default Lines;
