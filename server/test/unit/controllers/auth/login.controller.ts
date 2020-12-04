/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */

import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import 'mocha';
import server from '../../../../src';

// https://www.chaijs.com/plugins/chai-http/
// https://aaronsofaly.github.io/chai-docs/api/bdd/#method_include

chai.use(chaiHttp);

describe('Authentication', () => {
    describe('Login Controller', () => {
        const correctUser = { email: 'user@example.com', password: 'secret' };

        it('Check if Email is a required field.', (done) => {
            chai.request(server)
                .post(`/api/login`)
                .set('Content-Type', 'application/json')
                .send({ ...correctUser, email: null })
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.data)
                        .to.be.an.instanceof(Array)
                        .and.to.have.property('0')
                        .that.includes.all.keys(['value', 'msg', 'param', 'location']);
                    expect(res.body.data[0].msg).to.contain('Email').and.to.contain('required');
                    done();
                });
        });

        it('Validates Email field.', (done) => {
            chai.request(server)
                .post(`/api/login`)
                .set('Content-Type', 'application/json')
                .send({ ...correctUser, email: 'invalid email' })
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.data)
                        .to.be.an.instanceof(Array)
                        .and.to.have.property('0')
                        .that.includes.all.keys(['value', 'msg', 'param', 'location']);
                    expect(res.body.data[0].msg).to.contain('Email').and.to.contain('valid');
                    done();
                });
        });

        it('Check if Password is a required field.', (done) => {
            chai.request(server)
                .post(`/api/login`)
                .set('Content-Type', 'application/json')
                .send({ ...correctUser, password: null })
                .end((err, res) => {
                    expect(res).to.have.status(422);
                    expect(res.body.data)
                        .to.be.an.instanceof(Array)
                        .and.to.have.property('0')
                        .that.includes.all.keys(['value', 'msg', 'param', 'location']);
                    expect(res.body.data[0].msg).to.contain('Password').and.to.contain('required');
                    done();
                });
        });

        it('Allow users to login with correct credentials.', (done) => {
            chai.request(server)
                .post(`/api/login`)
                .set('Content-Type', 'application/json')
                .send(correctUser)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.data).includes.keys(['token']);
                    done();
                });
        });

        it('Prevent users to login with wrong credentials.', (done) => {
            chai.request(server)
                .post(`/api/login`)
                .set('Content-Type', 'application/json')
                .send({ ...correctUser, password: 'Wrong password' })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body.data).to.equal('Email or password is incorrect!');
                    expect(res).to.be.json;
                    done();
                });
        });

        // it('allows guests to see a list of users.', (done) => {
        //     chai.request(server)
        //         .get(`/api/users`)
        //         .set('Content-Type', 'application/json')
        //         .set(
        //             'Authorization',
        //             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqcGltYmxvdHQwQGloZy5jb20iLCJpYXQiOjE2MDY4MTA4MzUsImV4cCI6MTYwNjg5NzIzNX0.NRe_Jx5a5IOSO9W069j_cuOLXTjvSAFfAoZGEgGuZIA',
        //         )
        //         .end((err, res) => {
        //             expect(res).to.have.status(200);
        //             expect(res.body.data).to.be.an.instanceof(Array);
        //             done();
        //         });
        // });
    });
});
