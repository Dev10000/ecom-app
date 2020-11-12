import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/home';
import Categories from '../pages/categories';
import ViewCart from '../pages/cart';
import ViewCheckout from '../pages/checkout';
import Contact from '../pages/contact';
import E404 from '../pages/errors/404';

const Router: React.FC = (): JSX.Element => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/checkout" component={ViewCheckout} />
            <Route exact path="/cart" component={ViewCart} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/categories/:id" />
            <Route exact path="/contact" component={Contact} />
            <E404 />
        </Switch>
    );
};

export default Router;
