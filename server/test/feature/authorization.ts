/* eslint-disable func-names */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { authenticate, checkPatch, checkGet, checkPost, checkDelete, Valid } from '../utils';
import Article from '../../src/models/Article';
import Country from '../../src/models/Country';
import CouponCode from '../../src/models/CouponCode';
import Review from '../../src/models/Review';
import QueryBuilder from '../../src/database/QueryBuilder';
// import Order from '../../src/models/Order';

chai.use(chaiHttp);

const adminToken = authenticate(Valid.admin.id, Valid.admin.email);
const userToken = authenticate(Valid.user.id, Valid.user.email);

const roles = ['Guest', 'User', 'Admin'];
const tokens = ['', userToken, adminToken];

describe('Authorization Testing', () => {
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
            QueryBuilder(Country)
                .where('name', Valid.countryData.name)
                .first()
                .then((existingCountry) => {
                    if (existingCountry) {
                        context.resourceId = existingCountry.id;
                    } else {
                        Country.create<ICountryModel>(Valid.countryData)
                            .save()
                            .then((newCountry) => {
                                context.resourceId = newCountry.id;
                            });
                    }
                });
        });

        checkGet(roles, tokens, '/api/countries', [401, 403, 200]);
        checkGet(roles, tokens, '/api/countries/:id', [401, 403, 200], context);
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
        checkPost(roles, tokens, '/api/countries', [401, 403, 201], Valid.countryData); // recreate it after being deleted
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
        checkPatch(roles, tokens, '/api/coupons/:id', [401, 403, 200], Valid.couponCodeData, context);
        checkDelete(roles, tokens, '/api/coupons/:id', [401, 403, 200], context);
    });

    // server\src\routes\order.routes.ts
    describe('Orders', () => {
        checkGet(roles, tokens, '/api/orders', [401, 200, 200]);
        checkGet(roles, tokens, '/api/orders/all', [401, 403, 200]);
        const ordersContext = checkPost(roles, tokens, '/api/orders', [401, 201, 201], Valid.orderData);
        checkGet(roles, tokens, '/api/orders/:id', [401, 200, 200], ordersContext);
    });

    // server\src\routes\product-category.routes.ts
    describe('Product Categories', () => {
        checkGet(roles, tokens, '/api/categories', [401, 403, 200]);
        const categContext = checkPost(roles, tokens, '/api/categories', [401, 403, 201], Valid.categoryData);
        checkPatch(roles, tokens, '/api/categories/:id', [401, 403, 200], Valid.categoryData, categContext);
        checkDelete(roles, tokens, '/api/categories/:id', [401, 403, 200], categContext);
        checkGet(roles, tokens, '/api/categories/223/products', [200, 200, 200]);
    });

    // server\src\routes\product-spec.routes.ts
    describe('Product Specs', () => {
        console.log('write Product Specs tests here!');
    });

    // server\src\routes\product.routes.ts
    describe('Products', () => {
        checkGet(roles, tokens, '/api/products', [200, 200, 200]);
        const productContext = checkPost(roles, tokens, '/api/products', [401, 403, 201], Valid.productData);
        checkGet(roles, tokens, '/api/products/:id', [200, 200, 200], productContext);
        checkGet(roles, tokens, '/api/products/:id/reviews', [200, 200, 200], productContext);
        // router.get('/search/:keywords', productQuery, search);
        checkPatch(roles, tokens, '/api/products/:id', [401, 403, 200], Valid.productData, productContext);
        checkDelete(roles, tokens, '/api/products/:id', [401, 403, 200], productContext);
    });

    // server\src\routes\product.routes.ts
    describe('Reviews', () => {
        before(function () {
            Review.create<IReviewModel>({ ...Valid.reviewData, user_id: Valid.user.id })
                .save()
                .then((review) => {
                    context.resourceId = review.id; // context for User
                })
                .catch((err) => console.log(err));
        });

        checkGet(roles, tokens, '/api/reviews', [401, 403, 200]);
        const reviewContext = checkPost(roles, tokens, '/api/reviews', [401, 201, 201], Valid.reviewData); // context for Admin
        checkGet(roles, tokens, '/api/reviews/:id', [200, 200, 200], context);
        checkPatch(roles, tokens, '/api/reviews/:id', [401, 403, 200], Valid.reviewData, reviewContext); // user should not be able to edit other user's review
        checkPatch(roles, tokens, '/api/reviews/:id', [401, 200, 200], Valid.reviewData, context); // both the author and an administrator should be able to edit a review
        checkDelete(roles, tokens, '/api/reviews/:id', [401, 200, 404], context); // user will be able to delete own review
        checkDelete(roles, tokens, '/api/reviews/:id', [401, 403, 200], reviewContext);
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
