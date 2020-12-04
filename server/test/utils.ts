/* eslint-disable import/no-extraneous-dependencies */
import jwt from 'jsonwebtoken';
import chai, { expect } from 'chai';
import config from '../src/config';

import server from '../src';

// https://www.restapitutorial.com/httpstatuscodes.html
export const statuses = [
    {
        code: 200,
        status: 'OK',
    },
    {
        code: 201,
        status: 'Created',
    },
    {
        code: 204,
        status: 'No Content',
    },
    {
        code: 401,
        status: 'Unauthorized',
    },
    {
        code: 403,
        status: 'Forbidden',
    },
    {
        code: 404,
        status: 'Not Found',
    },
    {
        code: 422,
        status: 'Unprocessable Entity',
    },
    {
        code: 500,
        status: 'Internal Server Error',
    },
];

export const authenticate = (id: number, email: string): string => {
    return jwt.sign({ id, email }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRATION_TIME,
    });
};

export const statusCode = (code: number): string => {
    const httpStatus = statuses.find((status) => status.code === code);
    return httpStatus ? httpStatus.status : 'Unknown';
};

export const checkGet = (
    roles: string[],
    bearerTokens: string[],
    apiEndPoint: string,
    expectedStatuses: number[],
): void => {
    describe(`Checking HTTP responses to GET ${apiEndPoint}:`, () => {
        roles.forEach((role, index) => {
            it(`${role} returns ${expectedStatuses[index]} ${statusCode(expectedStatuses[index])}`, (done) => {
                chai.request(server)
                    .get(apiEndPoint)
                    .set('Authorization', `Bearer ${bearerTokens[index]}`)
                    .end((req, res) => {
                        expect(res).to.have.status(expectedStatuses[index]);
                        done();
                    });
            });
        });
    });
};

export const checkPost = (
    roles: string[],
    bearerTokens: string[],
    apiEndPoint: string,
    expectedStatuses: number[],
    reqBody?: JSON,
): void => {
    describe(`Checking HTTP responses to POST ${apiEndPoint}:`, () => {
        roles.forEach((role, index) => {
            it(`${role} returns ${expectedStatuses[index]} ${statusCode(expectedStatuses[index])}`, (done) => {
                chai.request(server)
                    .post(apiEndPoint)
                    .send(reqBody || {})
                    .type('application/json')
                    .set('Authorization', `Bearer ${bearerTokens[index]}`)
                    .end((req, res) => {
                        expect(res).to.have.status(expectedStatuses[index]);
                        done();
                    });
            });
        });
    });
};

export const checkPatch = (
    roles: string[],
    bearerTokens: string[],
    apiEndPoint: string,
    expectedStatuses: number[],
    reqBody?: JSON,
): void => {
    describe(`Checking HTTP responses to PATCH ${apiEndPoint}:`, () => {
        roles.forEach((role, index) => {
            it(`${role} returns ${expectedStatuses[index]} ${statusCode(expectedStatuses[index])}`, (done) => {
                chai.request(server)
                    .patch(apiEndPoint)
                    .send(reqBody || {})
                    .type('application/json')
                    .set('Authorization', `Bearer ${bearerTokens[index]}`)
                    .end((req, res) => {
                        expect(res).to.have.status(expectedStatuses[index]);
                        done();
                    });
            });
        });
    });
};

export const checkDelete = (
    roles: string[],
    bearerTokens: string[],
    apiEndPoint: string,
    expectedStatuses: number[],
): void => {
    describe(`Checking HTTP responses to DELETE ${apiEndPoint}:`, () => {
        roles.forEach((role, index) => {
            it(`${role} returns ${expectedStatuses[index]} ${statusCode(expectedStatuses[index])}`, (done) => {
                chai.request(server)
                    .patch(apiEndPoint)
                    .set('Authorization', `Bearer ${bearerTokens[index]}`)
                    .end((req, res) => {
                        expect(res).to.have.status(expectedStatuses[index]);
                        done();
                    });
            });
        });
    });
};
