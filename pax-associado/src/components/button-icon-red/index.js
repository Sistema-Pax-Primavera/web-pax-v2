import React from "react";
import "./button-icon-red.css";

const ButtonIconRed = ( { icon,funcao }) => {
  return (
    <div className="button-icones-red">
     <button onClick={funcao}>
        {icon}
      </button>
    </div>
  );
};

export default ButtonIconRed;
