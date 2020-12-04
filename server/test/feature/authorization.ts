/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import { authenticate, checkPatch, checkGet, checkPost, checkDelete } from '../utils';

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
        checkGet(roles, tokens, '/api/articles', [401, 403, 200]);
        checkPost(roles, tokens, '/api/articles', [401, 403, 200]);
        checkGet(roles, tokens, '/api/articles/all', [401, 403, 200]);
        checkGet(roles, tokens, '/api/articles/1', [200, 200, 200]); // should return 404
        checkPatch(roles, tokens, '/api/articles/1', [401, 403, 200]); // should return 404
        checkDelete(roles, tokens, '/api/articles/1', [401, 403, 200]); // should return 404
    });

    // server\src\routes\user.routes.ts
    describe('Users', () => {
        checkGet(roles, tokens, '/api/users', [401, 403, 200]);
        checkGet(roles, tokens, `/api/users/${user.id}`, [401, 200, 200]); // user's own route
        checkGet(roles, tokens, '/api/users/500', [401, 403, 200]); // route for a completely different user
        checkPatch(roles, tokens, `/api/users/${user.id}`, [401, 200, 200]); // user's own route
        checkGet(roles, tokens, '/api/users/2/orders', [401, 403, 200]); // user's own route, but only admin should access
        checkGet(roles, tokens, '/api/users/2/articles', [401, 403, 200]); // user's own route, but only admin should access
    });
});
