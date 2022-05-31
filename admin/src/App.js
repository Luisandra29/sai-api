import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Admin'
import Login from './auth/Login'
import Dashboard from './dashboard'
import SubCategoriesCreate from './subcategories/SubCategoriesCreate'
import SubCategoriesEdit from './subcategories/SubCategoriesEdit'
import CategoriesCreate from './categories/CategoriesCreate'
import CategoriesEdit from './categories/CategoriesEdit'

const App = () => (
    <>
        <Route exact path='/login' render={() => <Login />} />

        <Switch>
            <ProtectedRoute layout={Layout} exact path="/" component={() => <Dashboard />} />

            <ProtectedRoute
                layout={Layout}
                exact
                path="/subcategories/create"
                component={() => <SubCategoriesCreate />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/subcategories/:id/edit"
                component={() => <SubCategoriesEdit />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/categories/create"
                component={() => <CategoriesCreate />}
            />
            <ProtectedRoute
                layout={Layout}
                exact
                path="/categories/:id/edit"
                component={() => <CategoriesEdit />}
            />

        </Switch>
    </>
)

export default App;
