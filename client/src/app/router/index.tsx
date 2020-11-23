/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import E404 from '../pages/errors/404';
import Breadcrumbs from '../../ui/breadcrumbs';
import routes, { adminRoutes } from './routes';
import AuthContext from '../../context/auth';
import MainLayout from '../layouts/main';
import AdminLayout from '../layouts/admin';

const Router: React.FC = (): JSX.Element => {
    const authContext = useContext(AuthContext);

    return (
        <Switch>
            <Route path="/admin">
                <AdminLayout>
                    <Switch>
                        {adminRoutes.map(({ path, name, Component, auth }) => {
                            return auth && !authContext.isLoggedIn ? (
                                <Redirect key="404" to="/404" />
                            ) : (
                                <Route exact key={name} path={path} component={Component} />
                            );
                        })}
                    </Switch>
                </AdminLayout>
            </Route>

            <Route>
                <MainLayout>
                    <Switch>
                        {routes.map(({ path, name, Component, auth }) => {
                            //     <Breadcrumbs routes={routes} />
                            // component need to be swapped with render={props =>

                            return auth && !authContext.isLoggedIn ? (
                                <Redirect key="homepage" to="/" />
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
