import Home from '../pages/main/home';
import Categories from '../pages/main/categories';
import Cart from '../pages/main/cart';
import Checkout from '../pages/main/checkout';
import Contact from '../pages/main/contact';
import Products from '../pages/main/products';
import Search from '../pages/main/search';
import Profile from '../pages/main/profile';
import Product from '../pages/main/product';

export default [
    { path: '/', name: 'Home', Component: Home, auth: false },
    { path: '/categories', name: 'Categories', Component: Categories, auth: false },
    { path: '/categories/:id', name: 'Products', Component: Products, auth: false },
    { path: '/products/:id', name: 'Product', Component: Product, auth: false },
    { path: '/cart', name: 'Cart', Component: Cart, auth: false },
    { path: '/contact', name: 'Contact', Component: Contact, auth: false },
    { path: '/search', name: 'Search', Component: Search, auth: false },
    { path: '/checkout', name: 'Checkout', Component: Checkout, auth: true },
    { path: '/profile', name: 'Profile', Component: Profile, auth: true },
    { path: '/edit-profile', name: 'Edit profile', Component: Profile, auth: true },
];
