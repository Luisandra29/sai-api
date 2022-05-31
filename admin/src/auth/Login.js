import * as React from 'react';
import {
    CardActions,
    Box,
    Typography,
    makeStyles
} from '@material-ui/core';
import Button from '../components/Button'
import { axios } from '../providers'
import InputContainer from '../components/InputContainer'
import AuthLayout from '../layouts/AuthLayout'
import formStyles from '../styles/formStyles'
import { Link, useHistory } from 'react-router-dom'
import { useUserDispatch } from '../hooks/useUserState'
import TextInput from '../components/TextInput'
import PasswordInput from '../components/PasswordInput'
import Logo from './logo.png'

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su correo electrónico';
    }

    if (!values.password) {
        errors.password = 'Ingrese su contraseña';
    }

    return errors;
};

const useStyles = makeStyles(() => ({
    form: {
        width: '100%',
        padding: '0 1.5rem'
    },
    cardHeader: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
}));

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = { ...formStyles(), ...useStyles() };
    const history = useHistory()
    const { setUser } = useUserDispatch();

    const handleSubmit = React.useCallback(async (values) => {
        setLoading(true)

        return await axios.post(`${process.env.REACT_APP_API_DOMAIN}/login`, values)
            .then(async (res) => {
                await axios.get('/csrf-cookie')
                await setUser({
                    user: res.data.user,
                    token: res.data.token
                });
                await history.push('/');

                setLoading(false);
            }).catch(err => {
                setLoading(false);

                if (err.response.status == 500) {
                    history.push('/error');
                }

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit} title='Iniciar sesión'>
            <div className={classes.form}>
                <Box className={classes.cardHeader}>
                    <img src={Logo} alt="logo" />
                </Box>

                <InputContainer label='Correo electrónico' md={12}>
                    <TextInput
                        name="email"
                        placeholder="Ingrese su correo electrónico"
                        disabled={loading}
                        fullWidth
                    />
                </InputContainer>
                <InputContainer label='Contraseña' md={12}>
                    <PasswordInput
                        name="password"
                        placeholder="Ingrese su contraseña"
                        disabled={loading}
                        fullWidth
                    />
                </InputContainer>
                <Box component="div" display='flex' justifyContent="center" marginTop="1rem">
                    <Link to="/reset-password" className={classes.link}>¿Olvidaste tu contraseña?</Link>
                </Box>
                <CardActions className={classes.actions}>
                    <Button disabled={loading} unresponsive fullWidth>
                        Iniciar sesión
                    </Button>
                </CardActions>
            </div>
        </AuthLayout >
    );
};

export default Login;
