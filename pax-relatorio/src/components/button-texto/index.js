import React from "react";
import "./button-text.css";

const ButtonText = ({  title, funcao }) => {
  return (
    <div className="button-text">
      <button onClick={funcao}>
        {title}
        </button>
    </div>
  );
};

export default ButtonText;
