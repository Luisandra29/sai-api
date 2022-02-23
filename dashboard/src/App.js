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

const i18nProvider = polyglotI18nProvider(() => spanishMessages, 'es');

const App = () => {
  return (
    <Admin dataProvider={dataProvider} i18nProvider={i18nProvider}>
        <Resource {...dashboard} />
        <Resource {...applications} />
        <Resource {...categories} />
        <Resource {...communities} />
        <Resource name="parishes" />
        <Resource name="categorias" />
    </Admin>
  )
}

export default App;
