import React from 'react';
import Checkbox from '@mui/material/Checkbox';

function CheckboxWhite({ label, defaultChecked, ...props }) {
  return (
    <Checkbox
      {...props}
      defaultChecked={defaultChecked}
      sx={{
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: 'white'
        }
      }}
    />
  );
}

export default CheckboxWhite;
