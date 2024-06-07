import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const MultiSelect = ({ name, width, fontSize, fontWeight, options, selectedOptions, setSelectedOptions }) => {
    const handleChange = (event, value) => {
        setSelectedOptions(value);
    };

    return (
        <div style={{ width: 350, height: 10 }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={options}
                getOptionLabel={(option) => option.nome}
                value={selectedOptions}
                onChange={handleChange}
                limitTags={2}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        index < 2 && (
                            <Chip
                                variant="outlined"
                                label={option.nome}
                                {...getTagProps({ index })}
                            />
                        )
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={name}
                    />
                )}
            />
        </div>
    );
};

export default MultiSelect;
