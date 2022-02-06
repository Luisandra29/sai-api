import { isEmpty } from 'lodash';
import * as React from 'react';

const routes = [
  '/',
  '/register',
  '/login',
  '/check-email'
];

export default function(location, history, isAuth) {
  const { pathname } = location;

  React.useEffect(() => {
    const isDefinedRoute = routes.filter(route => route === pathname);

    if (isAuth) {
      if (!isEmpty(isDefinedRoute)) {
        history.push('/home');
      } else {
        history.push(pathname);
      }
    } else {
      if (!isEmpty(isDefinedRoute)) {
        history.push(pathname);
      } else {
        history.push('/login');
      }
    }
  }, []);

  return;
}
