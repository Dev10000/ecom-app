/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import server from '../../src';
import { authenticate } from '../utils';

chai.use(chaiHttp);

const adminToken = authenticate(1, 'jpimblott0@ihg.com');
const userToken = authenticate(2, 'sboutellier1@histats.com');

// console.log({ adminToken });

const checkResponseStatusTo = (
    apiEndPoint: string,
    method: 'get' | 'post' | 'put' | 'delete',
    expectedStatuses: [number, number, number], // guest, user, admin
) => {
    describe(`Checking access to ${method.toUpperCase()} ${apiEndPoint}:`, () => {
        it(`Guest returns ${expectedStatuses[0]}`, (done) => {
            chai.request(server)
                .get(apiEndPoint)
                .set('Content-Type', 'application/json')
                .end((err, res) => {
                    expect(res).to.have.status(expectedStatuses[0]);
                    done();
                });
        });

        it(`Users returns ${expectedStatuses[1]}`, (done) => {
            chai.request(server)
                .get(apiEndPoint)
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${userToken}`)
                .end((err, res) => {
                    expect(res).to.have.status(expectedStatuses[1]);
                    done();
                });
        });

        it(`Admin returns ${expectedStatuses[2]}`, (done) => {
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

describe('Testing Access to Routes', () => {
    checkResponseStatusTo('/api/users', 'get', [401, 403, 200]);
    checkResponseStatusTo('/api/users/2', 'get', [401, 200, 200]);
    checkResponseStatusTo('/api/users/500', 'get', [401, 403, 200]);
});
