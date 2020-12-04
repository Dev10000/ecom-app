/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import server from '../../src';
import { authenticate, statusCode } from '../utils';

chai.use(chaiHttp);

const admin = { id: 1, email: 'admin@example.com' };
const user = { id: 2, email: 'user@example.com' };

const adminToken = authenticate(admin.id, admin.email);
const userToken = authenticate(user.id, user.email);

// console.log({ adminToken });

const checkResponseStatusTo = (
    apiEndPoint: string,
    method: 'get' | 'patch' | 'post' | 'delete',
    expectedStatuses: [number, number, number], // guest, user, admin
    reqBody?: JSON,
) => {
    describe(`Checking access to ${method.toUpperCase()} ${apiEndPoint}:`, () => {
        let httpRequest;

        switch (method) {
            case 'get':
                httpRequest = chai.request(server).get(apiEndPoint).set('Content-Type', 'application/json');
                break;
            case 'patch':
                httpRequest = chai
                    .request(server)
                    .patch(apiEndPoint)
                    .send(reqBody)
                    .set('Content-Type', 'application/json');
                break;
            case 'post':
                httpRequest = chai
                    .request(server)
                    .patch(apiEndPoint)
                    .send(reqBody)
                    .set('Content-Type', 'application/json');
                break;
            case 'delete':
                httpRequest = chai.request(server).patch(apiEndPoint).set('Content-Type', 'application/json');
                break;
            default:
                throw new Error('Not Implemented');
        }

        it(`Guest returns ${expectedStatuses[0]} ${statusCode(expectedStatuses[0])}`, (done) => {
            chai.request(server)
                .get(apiEndPoint)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(expectedStatuses[0]);
                    done();
                });
        });

        it(`User (id=${user.id}) returns ${expectedStatuses[1]} ${statusCode(expectedStatuses[1])}`, (done) => {
            chai.request(server)
                .get(apiEndPoint)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(expectedStatuses[1]);
                    done();
                });
        });

        it(`Admin returns ${expectedStatuses[2]} ${statusCode(expectedStatuses[2])}`, (done) => {
            chai.request(server)
                .get(apiEndPoint)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${adminToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(expectedStatuses[2]);
                    done();
                });
        });
    });
};

describe('Authorization Testing', () => {
    // server\src\routes\article.routes.ts
    checkResponseStatusTo('/api/articles', 'get', [401, 403, 200]);
    // router.post('/', Verify.isAdmin, articleValidator, create);
    // router.get('/', getPublished);
    // router.get('/all', Verify.isAdmin, getAll);
    // router.get('/:id', Verify.isUser, getSingle);
    // router.patch('/:id', Verify.isAdmin, articleValidator, edit);
    // router.delete('/:id', Verify.isAdmin, destroy);

    // server\src\routes\user.routes.ts
    checkResponseStatusTo('/api/users', 'get', [401, 403, 200]);
    checkResponseStatusTo(`/api/users/${user.id}`, 'get', [401, 200, 200]); // user's own route
    checkResponseStatusTo('/api/users/500', 'get', [401, 403, 200]); // route for a completely different user
    checkResponseStatusTo('/api/users/2', 'patch', [401, 200, 200]); // user's own route
    checkResponseStatusTo('/api/users/2/orders', 'get', [401, 403, 200]); // user's own route, but only admin should access
    checkResponseStatusTo('/api/users/2/articles', 'get', [401, 403, 200]); // user's own route, but only admin should access
});
