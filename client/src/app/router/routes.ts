import Home from '../pages/home';
import Categories from '../pages/categories';
import Cart from '../pages/cart';
import Checkout from '../pages/checkout';
import Contact from '../pages/contact';
import Products from '../pages/products';

export default [
    { path: '/', name: 'Home', Component: Home },
    { path: '/categories', name: 'Categories', Component: Categories },
    { path: '/categories/:slug', name: 'Products', Component: Products },
    { path: '/cart', name: 'Cart', Component: Cart },
    { path: '/checkout', name: 'Checkout', Component: Checkout },
    { path: '/contact', name: 'Contact', Component: Contact },
];
