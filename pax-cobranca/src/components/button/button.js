import React from "react";
import "./button.css";

const Button = ({ icon, titulo, funcao }) => {
    return (
        <div className="button">
            <button onClick={funcao}>
                {icon}
                {titulo}
            </button>
        </div>
    );
};

export default Button;
