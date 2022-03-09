import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { dataProvider } from './dataProvider'
import spanishMessages from '@blackbox-vision/ra-language-spanish';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import { Loading, Login, Layout } from './components';

import dashboard from './dashboard'
import categories from './categories'
import communities from './communities'
import applications from './applications'
import users from './users'

const i18nProvider = polyglotI18nProvider(() => spanishMessages, 'es');

const App = () => {
  return (
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource {...dashboard} />
        <Resource {...applications} />
        <Resource {...users} />
        <Resource {...categories} />
        <Resource {...communities} />
        <Resource name="parishes" />
        <Resource name="categorias" />
        <Resource name="roles" />

    </Admin>
  )
}

export default App;
