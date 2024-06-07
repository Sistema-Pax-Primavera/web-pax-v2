import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import './checkbox.css';

const Checkcbox = ({ conteudo, checked, onChange }) => {
  return (
    <div className='checkbox-style'>
      <Checkbox
        size='small'
        checked={checked}
        onChange={onChange}
        inputProps={{ 'aria-label': 'Checkbox demo' }}
      />
      <label>{conteudo}</label>
    </div>
  );
};

export default Checkcbox;
