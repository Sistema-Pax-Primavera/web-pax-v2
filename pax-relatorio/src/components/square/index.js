import React from 'react'

const Square = ({ conteudo, width, height, alignItens, justifyContent, gap, borderRadius, backgroundColor, padding, flexDirection }) => {
    const estilos = {
      display: 'flex',
      alignItems: alignItens,
      justifyContent: justifyContent,
      width: width,
      height: height,
      gap: gap,
      borderRadius: borderRadius,
      backgroundColor: backgroundColor,
      padding: padding,
      flexDirection: flexDirection
    };
  
    return (
      <div style={estilos}>
        {conteudo}
      </div>
    )
  }
  
  export default Square
  
