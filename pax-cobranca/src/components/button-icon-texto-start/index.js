import React from "react";
import "./icone-button.css";
import Button from "@mui/material/Button";

const ButtonIconTextoStart = ({ icon, title, width, marginTop, funcao, corFundoBotao, corTextoBotao, fontSizeBotao, fontWeightBotao, alinhamentoBotao }) => {
  const estilos = {
    width: width,
    marginTop: marginTop
  };

  return (
    <div className="icones-buttons-start" style={estilos}>
      <Button onClick={funcao}
        style={{
          backgroundColor: corFundoBotao,
          color: corTextoBotao,
          fontSize: fontSizeBotao,
          fontWeight: fontWeightBotao,
          alignItems: alinhamentoBotao
        }}>
        {icon}
        {title}
      </Button>
    </div>
  );
};

export default ButtonIconTextoStart;
