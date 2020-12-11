/* eslint-disable camelcase */
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
import News from '../pages/admin/news';
import Users from '../pages/admin/users';
import Products from '../pages/admin/products';
import ProductCategories from '../pages/admin/product-categories';
import Countries from '../pages/admin/countries';
import Orders from '../pages/admin/orders';
import Reports from '../pages/admin/reports';
import Settings from '../pages/admin/settings';

// Components
import Breadcrumbs from '../../ui/breadcrumbs';
import Coupons from '../pages/admin/coupons';

const Router: React.FC = (): JSX.Element => {
    const authContext = useContext(AuthContext);

    return (
        <Switch>
            {/* Admin Routes registration */}
            {authContext.user?.is_admin ? (
                <Route path="/admin">
                    <AdminLayout>
                        <Switch>
                            <Route exact path="/admin" component={Dashboard} />
                            <Route exact path="/admin/news" component={News} />
                            <Route exact path="/admin/users" component={Users} />
                            <Route exact path="/admin/products" component={Products} />
                            <Route exact path="/admin/categories" component={ProductCategories} />
                            <Route exact path="/admin/countries" component={Countries} />
                            <Route exact path="/admin/orders" component={Orders} />
                            <Route exact path="/admin/coupons" component={Coupons} />
                            <Route exact path="/admin/reports" component={Reports} />
                            <Route exact path="/admin/settings" component={Settings} />
                            <E404 />
                        </Switch>
                    </AdminLayout>
                </Route>
            ) : (
                ''
            )}

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
