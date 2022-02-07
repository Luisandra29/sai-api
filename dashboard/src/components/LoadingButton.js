import * as React from 'react';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ({ loading, classes, icon, children, ...rest }) {
    const defaultIcon = icon ? icon : <></>;
    
    return (
        <Button
            className={classes}
            startIcon={loading ? <CircularProgress size={10} /> : defaultIcon}  
            disabled={loading}
            {...rest}
        >
            {children}
        </Button>
    );
}