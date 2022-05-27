import * as React from 'react';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
    outer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: '-1',
        background: '#fff',
        height: '100vh',
    },
    title: {
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        padding: '2rem',
        width: '30%'
    },
    card: {
        background: alpha(theme.palette.secondary.light, 0.5),
        padding: '1rem 0',
        width: '24rem',
        display: 'flex',
        borderRadius: '6px !important',
        justifyContent: 'center'
    },
    header: {
        display: 'flex',
        justifyContent: 'flex-start',
        width: '100%',
        height: '4rem',
        boxShadow: `0px 1px 5px ${theme.palette.primary.light}`,
        alignItems: 'center',
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: 1000,
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    }
}));

const AuthLayout = ({ validate, handleSubmit, children, ...rest }) => {
    const classes = useStyles();

    return (
        <Box component='div' className={classes.outer}>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                {...rest}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Card className={classes.card}>
                            {
                                React.Children.map(children, (child) =>
                                    React.cloneElement(child)
                                )
                            }
                        </Card>
                    </form>
                )}
            />
        </Box>
    );
};

export default AuthLayout;
