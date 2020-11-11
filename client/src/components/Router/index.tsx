import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../views/Home';
import Categories from '../../views/Categories';
import Contact from '../../views/Contact';
import E404 from '../../views/errors/404';
import ViewCart from '../../views/ViewCart';
import ViewCheckout from '../../views/ViewCheckout';

const Router: React.FC = (): JSX.Element => {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/checkout" component={ViewCheckout} />
                <Route exact path="/cart" component={ViewCart} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/categories/:id" />
                <Route exact path="/contact" component={Contact} />
                <E404 />
            </Switch>
        </div>
    );
};

export default Router;
