import React from 'react';
import './select.css'

const Select = ({ name, width, fontSize, fontWeight, options }) => {
  const estilos = {
    fontWeight: 500 || fontWeight,
    fontSize: '12px' || fontSize,
    width: width,
  };

  const estilosSelect = {
    fontWeight: fontWeight || 500,
    fontSize: fontSize || '12px',
  };

  return (
    <div style={estilos} className='select-todos'>
      <label style={estilos}>{name}</label>
      <select style={estilosSelect}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
