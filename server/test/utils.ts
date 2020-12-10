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

export function checkGet(
    roles: string[],
    bearerTokens: string[],
    apiEndPoint: string,
    expectedStatuses: number[],
    context?: IContext,
): void {
    describe(`Checking HTTP responses to GET '${apiEndPoint}':`, () => {
        roles.forEach((role, index) => {
            it(`${role} returns ${expectedStatuses[index]} ${statusCode(expectedStatuses[index])}`, (done) => {
                apiEndPoint = context ? apiEndPoint.replace(':id', String(context.resourceId)) : apiEndPoint;
                chai.request(server)
                    .get(apiEndPoint)
                    .set('Authorization', `Bearer ${bearerTokens[index]}`)
                    .end((_req, res) => {
                        expect(res).to.have.status(expectedStatuses[index]);
                        done();
                    });
            });
        });
    });
}

export const checkPost = (
    roles: string[],
    bearerTokens: string[],
    apiEndPoint: string,
    expectedStatuses: number[],
    reqBody: Record<string, unknown>,
    context?: IContext,
): IContext => {
    const result: IContext = {
        resourceId: undefined,
    };
    describe(`Checking HTTP responses to POST '${apiEndPoint}':`, () => {
        roles.forEach((role, index) => {
            it(`${role} returns ${expectedStatuses[index]} ${statusCode(expectedStatuses[index])}`, (done) => {
                apiEndPoint = context ? apiEndPoint.replace(':id', String(context.resourceId)) : apiEndPoint;
                chai.request(server)
                    .post(apiEndPoint)
                    .send(reqBody || {})
                    .type('application/json')
                    .set('Authorization', `Bearer ${bearerTokens[index]}`)
                    .end((_req, res) => {
                        expect(res).to.have.status(expectedStatuses[index]);
                        if (res.body && res.body.data && res.body.data.id) {
                            result.resourceId = res.body.data.id;
                        }
                        done();
                    });
            });
        });
    });
    return result;
};

export const checkPatch = (
    roles: string[],
    bearerTokens: string[],
    apiEndPoint: string,
    expectedStatuses: number[],
    reqBody: Record<string, unknown>,
    context?: IContext,
): void => {
    describe(`Checking HTTP responses to PATCH '${apiEndPoint}':`, () => {
        roles.forEach((role, index) => {
            it(`${role} returns ${expectedStatuses[index]} ${statusCode(expectedStatuses[index])}`, (done) => {
                apiEndPoint = context ? apiEndPoint.replace(':id', String(context.resourceId)) : apiEndPoint;
                chai.request(server)
                    .patch(apiEndPoint)
                    .send(reqBody)
                    .type('application/json')
                    .set('Authorization', `Bearer ${bearerTokens[index]}`)
                    .end((_req, res) => {
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
    context?: IContext,
): void => {
    describe(`Checking HTTP responses to DELETE '${apiEndPoint}':`, () => {
        roles.forEach((role, index) => {
            it(`${role} returns ${expectedStatuses[index]} ${statusCode(expectedStatuses[index])}`, (done) => {
                apiEndPoint = context ? apiEndPoint.replace(':id', String(context.resourceId)) : apiEndPoint;
                chai.request(server)
                    .delete(apiEndPoint)
                    .set('Authorization', `Bearer ${bearerTokens[index]}`)
                    .end((_req, res) => {
                        expect(res).to.have.status(expectedStatuses[index]);
                        done();
                    });
            });
        });
    });
};

export class Valid {
    static admin = {
        id: 1,
        email: 'admin@example.com',
        password: 'secret',
        first_name: 'Judy',
        last_name: 'Pimblott',
        address: '2 Redwing Lane',
        city: 'Lille',
        country_id: 77,
        postal_code: '59049 CEDEX',
        phone_number: '238-389-6616',
        is_admin: true,
    };

    static user = {
        id: 2,
        email: 'user@example.com',
        password: 'secret',
        first_name: 'Selle',
        last_name: 'Boutellier',
        address: '9 Main Point',
        city: 'Buayan',
        country_id: 176,
        postal_code: '9500',
        phone_number: '672-556-2903',
        is_admin: false,
    };

    static otherUser = {
        id: 3,
        email: 'cduffitt2@multiply.com',
        password: 'secret',
        first_name: 'Coleen',
        last_name: 'Duffitt',
        address: '52 Vermont Place',
        city: 'Saint-Laurent-Blangy',
        country_id: 77,
        postal_code: '62055 CEDEX',
        phone_number: '529-295-9540',
        is_admin: false,
    };

    static loginData = { email: 'user@example.com', password: 'secret' };

    static registerData = {
        email: `some-random-email-${(Math.random() * 100).toFixed(2)}@example.com`,
        password: 'secret',
        passwordConfirmation: 'secret',
        first_name: 'Firstname',
        last_name: 'Lastname',
    };

    static articleData = {
        title: 'Article title here',
        slug: `article-slug-here-${(Math.random() * 100).toFixed(2)}`,
        featured_image: 'feature image',
        body:
            '{"blocks":[{"key":"276gm","text":"Article Body","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    };

    static countryData = {
        name: 'A Brand New Country',
        alpha2: 'XY',
        alpha3: 'XYZ',
        code: 123,
        iso_3166_2: 'XY',
    };

    static couponCodeData = {
        code: String(Date.now()) + Math.random(),
        quantity: 100,
        expired_at: '2020-12-16',
    };

    static orderData = {
        order_items: [
            {
                product_id: 1,
                quantity: 1,
            },
        ],
    };

    static categoryData = {
        title: 'My Test Category',
        slug: 'my-test-category',
    };

    static productData = {
        title: 'Nylon Braided Lightning to USB Cable',
        slug: 'Nylon-Braided-Lightning-Cable',
        description: 'Universal Compatibility: Compatible with the iPhone SE (2nd Gen)',
        price: 12.99,
        weight: 28.34,
        package_size: '3.94 x 2.5 x 1.1 inches',
        discount: 20.0,
        product_category_id: 1,
        stock_qty: 123,
    };
}
