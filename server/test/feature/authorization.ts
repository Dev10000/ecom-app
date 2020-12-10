/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { authenticate, checkPatch, checkGet, checkPost, checkDelete, Valid } from '../utils';
import Article from '../../src/models/Article';

chai.use(chaiHttp);

const adminToken = authenticate(Valid.admin.id, Valid.admin.email);
const userToken = authenticate(Valid.user.id, Valid.user.email);

const roles = ['Guest', 'User', 'Admin'];
const tokens = ['', userToken, adminToken];

describe('Authorization Testing', () => {
    // server\src\routes\article.routes.ts

    interface IContext {
        resourceId: number | undefined;
    }

    const context: IContext = {
        resourceId: undefined,
    };

    before(function () {
        Article.create<IArticleModel>({
            ...Valid.articleData,
            user_id: Valid.admin.id,
        })
            .save()
            .then((article) => {
                context.resourceId = article.id;
            });
    });

    // server\src\routes\admin.routes.ts
    describe('Admin', () => {
        console.log('write tests here!');
    });

    describe('Articles', function () {
        checkGet(roles, tokens, '/api/articles', [200, 200, 200]);
        checkPost(roles, tokens, '/api/articles', [401, 403, 201], {
            ...Valid.articleData,
            slug: `${Valid.articleData.slug}-extra`,
        });
        checkGet(roles, tokens, '/api/articles/all', [401, 403, 200]);
        checkGet(roles, tokens, `/api/articles/:id`, [403, 403, 200], context); // created above, but not published
        checkPatch(
            roles,
            tokens,
            '/api/articles/:id',
            [401, 403, 200],
            {
                ...Valid.articleData,
                title: 'updated title',
            },
            context,
        );
        checkPatch(roles, tokens, '/api/articles/:id/publish', [401, 403, 200], {}, context);
        checkGet(roles, tokens, '/api/articles/:id', [200, 200, 200], context); // edited above, this time published
        checkDelete(roles, tokens, '/api/articles/:id', [401, 403, 200], context);
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
    describe('Users', function () {
        checkGet(roles, tokens, '/api/users', [401, 403, 200]);
        checkGet(roles, tokens, `/api/users/${Valid.user.id}`, [401, 200, 200]); // user's own route
        checkGet(roles, tokens, `/api/users/${Valid.otherUser.id}`, [401, 403, 200]); // route for a completely different user
        checkPatch(roles, tokens, `/api/users/${Valid.otherUser.id}`, [401, 403, 200], Valid.otherUser);
        checkPatch(roles, tokens, `/api/users/${Valid.user.id}`, [401, 200, 200], Valid.user); // user's own route
        checkGet(roles, tokens, '/api/users/2/orders', [401, 403, 200]); // user's own route, but only admin should access
        checkGet(roles, tokens, '/api/users/2/articles', [401, 403, 200]); // user's own route, but only admin should access
    });
});
