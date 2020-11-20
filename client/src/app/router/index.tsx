/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import routes from './routes';
import AuthContext from '../../context/auth';

// Layouts
import MainLayout from '../layouts/main';
import AdminLayout from '../layouts/admin';

// Error Pages
import E404 from '../pages/main/errors/404';

// Admin Pages
import Dashboard from '../pages/admin/dashboard';
import Users from '../pages/admin/users';

// Components
import Breadcrumbs from '../../ui/breadcrumbs';

const Router: React.FC = (): JSX.Element => {
    const authContext = useContext(AuthContext);

    return (
        <Switch>
            {/* Admin Routes registration */}
            {/* TODO: Guard these routes properly! */}
            <Route path="/admin">
                <AdminLayout>
                    <Switch>
                        <Route exact path="/admin" component={Dashboard} />
                        <Route exact path="/admin/users" component={Users} />
                        <E404 />
                    </Switch>
                </AdminLayout>
            </Route>

            {/* Main (non Admin) Routes registration */}
            <Route>
                <MainLayout>
                    <Switch>
                        {routes.map(({ path, name, Component, auth }) => {
                            // <Breadcrumbs routes={routes} />
                            // TODO: make this work!
                            // Try swapping it to render={props =>

                            return auth && !authContext.isLoggedIn ? (
                                <Route exact key={name} path={path} component={E404} />
                            ) : (
                                <Route exact key={name} path={path} component={Component} />
                            );
                        })}
                        <E404 />
                    </Switch>
                </MainLayout>
            </Route>
        </Switch>
    );
};

export default Router;
