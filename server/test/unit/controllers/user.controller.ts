/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import server from '../../../src';
import { Valid, authenticate } from '../../utils';

// https://www.chaijs.com/plugins/chai-http/

chai.use(chaiHttp);

// const userToken = authenticate(Valid.user.id, Valid.user.email);
const adminToken = authenticate(Valid.admin.id, Valid.admin.email);

describe('User Controller', () => {
    it('Authenticated admins should be able to get all users', (done) => {
        chai.request(server)
            .get(`/api/users`)
            .set('Authorization', `Bearer ${adminToken}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body.data).to.be.an.instanceof(Array);
                expect(res.body.data[0]).includes.keys(['email']);
                done();
            });
    });
});
