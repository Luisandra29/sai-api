import * as React from 'react';
import { useState } from 'react';
import { InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextInput from './TextInput';

const PasswordInput = ({
    initiallyVisible = false,
    visibilityIcon,
    visibilityOffIcon,
    ...rest
}) => {
    const [visible, setVisible] = useState(initiallyVisible);

    const handleClick = () => {
        setVisible(!visible);
    };

    return (
        <TextInput
            type={visible ? 'text' : 'password'}
            size="small"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                visible
                                    ? 'Mostrar'
                                    : 'Ocultar'
                            }
                            onClick={handleClick}
                            size="large"
                        >
                            {visible ? visibilityIcon : visibilityOffIcon}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    );
};

PasswordInput.defaultProps = {
    visibilityIcon: <Visibility />,
    visibilityOffIcon: <VisibilityOff />
}

export default PasswordInput
