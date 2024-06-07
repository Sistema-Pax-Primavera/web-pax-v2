import React from "react";
import "./button-icon-sem-fundo.css";

const ButtonIconFundo = ( { icon,funcao }) => {
  return (
    <div className="button-icones-sem-fundo">
     <button onClick={funcao}>
        {icon}
      </button>
    </div>
  );
};

export default ButtonIconFundo;
