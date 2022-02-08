import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { dataProvider } from './dataProvider'
import categories from './categories'

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
        <Resource {...categories} />
    </Admin>
  )
}

export default App;
