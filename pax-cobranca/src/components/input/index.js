import React from 'react';
import PropTypes from 'prop-types';
import './input.css';


const Input = ({ label, value, onChange, name, type = 'text', width,placeholder  }) => {
    const estilos = {
        width: width,
      };

    return (
    <div className="input-with-label" style={ estilos }>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  width: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  onChange: () => {},
  name: '',
  type: 'text',
  width: '100%',
};

export default Input;
