import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import customReducers from './reducers'
import createAdminStore from './store'
import { Provider } from 'react-redux'
import { history } from './providers'
import customSagas from './sagas'
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { theme } from './styles';
import './index.css';

const Index = () => (
    <Provider store={createAdminStore({
        history,
        customReducers,
        customSagas
    })}>
        <ConnectedRouter history={history}>
            <ThemeProvider theme={createTheme(theme)}>
                <App />
            </ThemeProvider>
        </ConnectedRouter>
    </Provider>
);

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
