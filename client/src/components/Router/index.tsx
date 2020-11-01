import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../views/Home';
import Categories from '../../views/Categories';
import Contact from '../../views/Contact';
import E404 from '../../views/errors/404';

const Router: React.FC = (): JSX.Element => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/categories" component={Categories} />
                <Route path="/contact" component={Contact} />
                <E404 />
            </Switch>
        </div>
    );
};

export default Router;
