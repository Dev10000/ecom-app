/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { authenticate, checkPatch, checkGet, checkPost, checkDelete, Valid } from '../utils';
import Article from '../../src/models/Article';
import Country from '../../src/models/Country';
import CouponCode from '../../src/models/CouponCode';

chai.use(chaiHttp);

const adminToken = authenticate(Valid.admin.id, Valid.admin.email);
const userToken = authenticate(Valid.user.id, Valid.user.email);

const roles = ['Guest', 'User', 'Admin'];
const tokens = ['', userToken, adminToken];

describe('Authorization Testing', () => {
    interface IContext {
        resourceId: number | undefined;
    }

    const context: IContext = {
        resourceId: undefined,
    };

    // server\src\routes\admin.routes.ts
    describe('Admin', () => {
        checkGet(roles, tokens, '/api/admin/export-countries', [401, 403, 200]);
        checkGet(roles, tokens, '/api/admin/export-categories', [401, 403, 200]);
    });

    // server\src\routes\article.routes.ts
    describe('Articles', function () {
        before(function () {
            Article.create<IArticleModel>({
                ...Valid.articleData,
                user_id: Valid.admin.id,
            })
                .save()
                .then((article) => {
                    context.resourceId = article.id;
                })
                .catch((err) => console.log(err));
        });

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
        checkPost(roles, tokens, '/api/register', [201, 403, 403], Valid.registerData);
        checkPost(roles, tokens, '/api/login', [200, 403, 403], Valid.loginData);
    });

    // server\src\routes\country.routes.ts
    describe('Countries', () => {
        before(function () {
            Country.create<ICountryModel>(Valid.countryData)
                .save()
                .then((country) => {
                    context.resourceId = country.id;
                })
                .catch((err) => console.log(err));
        });

        checkGet(roles, tokens, '/api/countries', [401, 403, 200]);
        checkGet(roles, tokens, '/api/countries/:id', [401, 403, 200], context);
        checkPost(roles, tokens, '/api/countries', [401, 403, 422], Valid.countryData); // a lot of unique constraints...
        checkPatch(
            roles,
            tokens,
            '/api/countries/:id',
            [401, 403, 200],
            {
                ...Valid.countryData,
            },
            context,
        );
        checkDelete(roles, tokens, '/api/countries/:id', [401, 403, 200], context);
    });

    // server\src\routes\coupon.routes.ts
    describe('Coupons', () => {
        before(function () {
            CouponCode.create<ICouponCodeModel>(Valid.couponCodeData)
                .save()
                .then((coupon) => {
                    context.resourceId = coupon.id;
                })
                .catch((err) => console.log(err));
        });

        checkGet(roles, tokens, '/api/coupons', [401, 403, 200]);
        checkGet(roles, tokens, '/api/coupons/:id', [401, 200, 200], context);
        checkPost(roles, tokens, '/api/coupons', [401, 403, 201], Valid.couponCodeData);
        checkPatch(
            roles,
            tokens,
            '/api/coupons/:id',
            [401, 403, 200],
            {
                ...Valid.couponCodeData,
            },
            context,
        );
        checkDelete(roles, tokens, '/api/coupons/:id', [401, 403, 200], context);
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
