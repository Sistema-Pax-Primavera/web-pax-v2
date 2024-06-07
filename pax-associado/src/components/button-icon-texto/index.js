import React from "react";
import "./icone-button.css";

const IconeButtonTable = ({ icon, title, funcao }) => {
  return (
    <div className="icones-buttons">
      <button onClick={funcao}>
        {icon}
        {title}
      </button>
    </div>
  );
};

export default IconeButtonTable;
