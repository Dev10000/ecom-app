/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import server from '../../../src';

// https://www.chaijs.com/plugins/chai-http/

chai.use(chaiHttp);

const correctUser = { email: 'jpimblott0@ihg.com', password: 'secret' };

// login a user to fetch a Bearer token to be used in subsequent tests
let token: string;
chai.request(server)
    .post(`/api/login`)
    .set('Content-Type', 'application/json')
    .send(correctUser)
    .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body.data).includes.keys(['token']);
        token = res.body.data.token;
    });

describe('User Controller', () => {
    describe('getAllUsers', () => {
        it('Unauthenticated users should NOT be able to get all users', (done) => {
            chai.request(server)
                .get(`/api/users`)
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });
        // TODO: Only authenticated admin users should be able to get all users
        it('Authenticated users should? be able to get all users', (done) => {
            chai.request(server)
                .get(`/api/users`)
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.data).to.be.an.instanceof(Array);
                    expect(res.body.data[0]).includes.keys(['email']);
                    done();
                });
        });
    });

    describe('editUser', () => {
        // An authenticated user should NOT be able to edit other users?
        it('Unauthenticated users should NOT be able to edit a user', (done) => {
            chai.request(server)
                .patch(`/api/users/1`)
                .set('Content-Type', 'application/json')
                .send({ first_name: 'foo' })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });
        });
        it('Authenticated users should be able to edit a user', (done) => {
            chai.request(server)
                .patch(`/api/users/1`)
                .set('Authorization', `Bearer ${token}`)
                .set('Content-Type', 'application/json')
                .send({ first_name: 'foo' })
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    done();
                });
        });
    });

    describe('getUserOrders', () => {
        it('passes tests for getUserOrders', () => { });
    });

    describe('getUser', () => {
        it('passes tests for getUser', () => { });
    });
});
