import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import './input.css'

const DateMaskInput = ({ data }) => {
  const [date, setDate] = useState(data);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <div className='data-input'>
      <InputMask
        maskPlaceholder={null}
        id="date"
        type="text"
        value={date}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default DateMaskInput;
