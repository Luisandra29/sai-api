import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Admin'
import Login from './auth/Login'
import UserList from './users/UsersList'
import UserEdit from './users/UsersEdit'

const App = () => {
    return (
        <Switch>
            <Route exact path='/login' render={() => <Login />} />

            {/**
             * Users
             */}
            <ProtectedRoute layout={Layout} exact path='/users' component={(routeProps) =>
                <UserList
                    resource="users"
                    basePath={routeProps.match.url}
                />}
            />
            <ProtectedRoute layout={Layout} exact path='/users/:id' component={(routeProps) =>
                <UserEdit
                    resource="users"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />
        </Switch>
    )
}

export default App;
