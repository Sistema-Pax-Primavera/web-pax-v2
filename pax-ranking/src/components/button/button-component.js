import React from "react";
import { FaSearch, FaSyncAlt, FaHome } from "react-icons/fa";
import "./button.css";

const ButtonComponent = ({ icon, text, onClick, style }) => {
  let IconComponent;

  switch (icon) {
    case "search":
      IconComponent = FaSearch;
      break;
    case "sync":
      IconComponent = FaSyncAlt;
      break;
    case "home":
      IconComponent = FaHome;
      break;
    default:
      IconComponent = null;
  }

  return (
    <div className="buttom-ranking">
      <button style={style} onClick={onClick}>
        {IconComponent && <IconComponent />}
        {text}
      </button>
    </div>
  );
};

export default ButtonComponent;
