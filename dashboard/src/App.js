import React from 'react';
import { Admin, Resource, ListGuesser } from 'react-admin';
import { dataProvider } from './dataProvider'



import categories from './categories'
import communities from './communities'
import applications from './applications'



const App = () => {
  return (
    <Admin dataProvider={dataProvider}>

        <Resource {...applications} />
        <Resource {...categories} />
        <Resource {...communities} />


    </Admin>
  )
}

export default App;
