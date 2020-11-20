import Home from '../pages/home';
import Categories from '../pages/categories';
import Cart from '../pages/cart';
import Checkout from '../pages/checkout';
import Contact from '../pages/contact';
import Products from '../pages/products';
import Search from '../pages/search';
import Profile from '../pages/profile';

import Dashboard from '../pages/errors/404'; // temporary

export default [
    { path: '/', name: 'Home', Component: Home, auth: false },
    { path: '/categories', name: 'Categories', Component: Categories, auth: false },
    { path: '/categories/:slug', name: 'Products', Component: Products, auth: false },
    { path: '/cart', name: 'Cart', Component: Cart, auth: false },
    { path: '/contact', name: 'Contact', Component: Contact, auth: false },
    { path: '/search', name: 'Search', Component: Search, auth: false },
    { path: '/checkout', name: 'Checkout', Component: Checkout, auth: true },
    { path: '/profile', name: 'Profile', Component: Profile, auth: true },
];

export const adminRoutes = [{ path: '/admin/dashboard', name: 'Dashboard', Component: Dashboard, auth: true }];
