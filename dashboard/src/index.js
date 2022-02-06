import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNotify } from 'react-admin';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './initializers';
import isEmpty from 'is-empty';
import { history, setAuthToken, useAuth } from './utils';
// Resources
const routes = [
  '/login',
  '/register'
];
import App from './App';

export default function Index() {
  return <App />
}

if (document.getElementById('root')) {
  ReactDOM.render(
    <Provider store={store}>
      <Index />
    </Provider>,
    document.getElementById('root')
  );
}
