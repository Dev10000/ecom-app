/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import E404 from '../pages/errors/404';
import Breadcrumbs from '../../ui/breadcrumbs';
import routes from './routes';

const Router: React.FC = (): JSX.Element => {
    return (
        <Switch>
            {routes.map(({ path, name, Component }) => (
                // <React.Fragment key={name}> // having this breaks the router
                //     <Breadcrumbs routes={routes} />
                // component need to be swapped with render={props =>
                <Route exact key={name} path={path} component={Component} />
                // </React.Fragment>
            ))}
            <E404 />
        </Switch>
    );
};

export default Router;
