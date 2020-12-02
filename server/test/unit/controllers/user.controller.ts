/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import chai, { expect, should } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import server from '../../../src';

// https://www.chaijs.com/plugins/chai-http/

chai.use(chaiHttp);

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
    });

    describe('editUser', () => {
        it('passes tests for editUser', () => {});
    });

    describe('getUserOrders', () => {
        it('passes tests for getUserOrders', () => {});
    });

    describe('getUser', () => {
        it('passes tests for getUser', () => {});
    });
});
