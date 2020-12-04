/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { authenticate, checkPatch, checkGet, checkPost, checkDelete, Valid } from '../utils';

chai.use(chaiHttp);

const admin = { id: 1, email: 'admin@example.com' };
const user = { id: 2, email: 'user@example.com' };

const adminToken = authenticate(admin.id, admin.email);
const userToken = authenticate(user.id, user.email);

const roles = ['Guest', 'User', 'Admin'];
const tokens = ['', userToken, adminToken];

describe('Authorization Testing', () => {
    // server\src\routes\article.routes.ts
    describe('Articles', () => {
        checkGet(roles, tokens, '/api/articles', [200, 200, 200]);
        checkPost(roles, tokens, '/api/articles', [401, 403, 201], Valid.articleData);
        checkGet(roles, tokens, '/api/articles/all', [401, 403, 200]);
        checkGet(roles, tokens, `/api/articles/${Valid.articleData.slug}`, [403, 403, 200]); // created above, but not published
        checkPatch(roles, tokens, `/api/articles/${Valid.articleData.slug}`, [401, 403, 200], {
            ...Valid.articleData,
            published_at: new Date().toLocaleDateString(),
        });
        checkGet(roles, tokens, `/api/articles/${Valid.articleData.slug}`, [200, 200, 200]); // edited above, this time published
        checkDelete(roles, tokens, `/api/articles/${Valid.articleData.slug}`, [401, 403, 200]);
    });

    // server\src\routes\auth.routes.ts
    describe('Auth', () => {
        console.log('write tests here!');
    });

    // server\src\routes\country.routes.ts
    describe('Countries', () => {
        console.log('write tests here!');
    });

    // server\src\routes\coupon.routes.ts
    describe('Coupons', () => {
        console.log('write tests here!');
    });

    // server\src\routes\order.routes.ts
    describe('Orders', () => {
        console.log('write tests here!');
    });

    // server\src\routes\product-category.routes.ts
    describe('Product Categories', () => {
        console.log('write tests here!');
    });

    // server\src\routes\product-spec.routes.ts
    describe('Product Specs', () => {
        console.log('write tests here!');
    });

    // server\src\routes\product.routes.ts
    describe('Products', () => {
        console.log('write tests here!');
    });

    // server\src\routes\user.routes.ts
    describe('Users', () => {
        checkGet(roles, tokens, '/api/users', [401, 403, 200]);
        checkGet(roles, tokens, `/api/users/${user.id}`, [401, 200, 200]); // user's own route
        checkGet(roles, tokens, `/api/users/${Valid.otherUser.id}`, [401, 403, 200]); // route for a completely different user
        checkPatch(roles, tokens, `/api/users/${Valid.otherUser.id}`, [401, 403, 422], Valid.otherUser);
        checkPatch(roles, tokens, `/api/users/${user.id}`, [401, 422, 422], Valid.user); // user's own route
        checkGet(roles, tokens, '/api/users/2/orders', [401, 403, 200]); // user's own route, but only admin should access
        checkGet(roles, tokens, '/api/users/2/articles', [401, 403, 200]); // user's own route, but only admin should access
    });
});
