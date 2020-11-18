/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from './routes';
import E404 from '../pages/errors/404';
import Breadcrumbs from '../../ui/breadcrumbs';

const Router: React.FC = (): JSX.Element => {
    return (
        <Switch>
            {routes.map(({ path, name, Component }) => (
                // <React.Fragment key={name}>
                //     <Breadcrumbs routes={routes} />
                // component need to be swapped with render={props =>
                <Route exact path={path} component={Component} />
                // </React.Fragment>
            ))}
            <E404 />
        </Switch>
    );
};

export default Router;
