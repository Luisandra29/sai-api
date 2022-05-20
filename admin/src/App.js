import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Admin'
import Login from './auth/Login'
import UserList from './users/UsersList'
import UserEdit from './users/UsersEdit'
import Dashboard from './dashboard'
import CommunitiesList from './communities/CommunitiesList'
import CommunitiesEdit from './communities/CommunitiesEdit'
import CommunitiesCreate from './communities/CommunitiesCreate'
import CategoriesList from './categories/CategoriesList'
import CategoriesEdit from './categories/CategoriesEdit'
import CategoriesCreate from './categories/CategoriesCreate'
import ApplicationsList from './applications/ApplicationsList'
import ApplicationsCreate from './applications/ApplicationsCreate'
import ApplicationsShow from './applications/ApplicationsShow'

const App = () => (
    <>
        <Route exact path='/login' render={() => <Login />} />

        <Switch>
            <ProtectedRoute layout={Layout} exact path="/" component={() => <Dashboard />} />

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

            {/**
             * Communities
             */}
            <ProtectedRoute layout={Layout} exact path='/categories' component={(routeProps) =>
                <CategoriesList
                    resource="categories"
                    basePath={routeProps.match.url}
                />}
            />
            <ProtectedRoute layout={Layout} exact path='/categories/:id' component={(routeProps) =>
                <CategoriesEdit
                    resource="categories"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />
            <ProtectedRoute layout={Layout} exact path='/categories/create' component={(routeProps) =>
                <CategoriesCreate
                    resource="categories"
                    basePath={routeProps.match.url}
                    {...routeProps}
                />
            } />

            {/**
             * Communities
             */}
            <ProtectedRoute layout={Layout} exact path='/communities' component={(routeProps) =>
                <CommunitiesList
                    resource="communities"
                    basePath={routeProps.match.url}
                />}
            />
            <ProtectedRoute layout={Layout} exact path='/communities/:id' component={(routeProps) =>
                <CommunitiesEdit
                    resource="communities"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />
            <ProtectedRoute layout={Layout} exact path='/communities/create' component={(routeProps) =>
                <CommunitiesCreate
                    resource="communities"
                    basePath={routeProps.match.url}
                    {...routeProps}
                />
            } />

            {/**
             * Applications
             */}
            <ProtectedRoute layout={Layout} exact path='/applications' component={(routeProps) =>
                <ApplicationsList
                    resource="applications"
                    basePath={routeProps.match.url}
                />}
            />
            <ProtectedRoute layout={Layout} exact path='/applications/:id/show' component={(routeProps) =>
                <ApplicationsShow
                    resource="applications"
                    basePath={routeProps.match.url}
                    id={decodeURIComponent((routeProps.match).params.id)}
                    {...routeProps}
                />
            } />
            <ProtectedRoute layout={Layout} exact path='/applications/create' component={(routeProps) =>
                <ApplicationsCreate
                    resource="applications"
                    basePath={routeProps.match.url}
                    {...routeProps}
                />
            } />
        </Switch>
    </>
)

export default App;
