import * as React from 'react';
import { Link } from 'react-router-dom';
// Layout
import Auth from './Auth';

export default () => {
  return (
    <Auth title={'¡Revise su correo electrónico!'}>
      <p>Volver al <Link to='/login'>inicio</Link></p>
    </Auth>
  );
};

