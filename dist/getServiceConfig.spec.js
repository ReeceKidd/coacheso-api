"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getServiceConfig_1 = require("./getServiceConfig");
describe('getServiceConfig', () => {
    const environmentMock = {
        NODE_ENV: 'NODE_ENV',
        PORT: 'PORT',
        DATABASE_URI: 'DATABASE_URI',
        COACHESO_APP_URL: 'COACHESO_APP__URL',
        AUTH0_BASE_URL: 'AUTH0_BASE_URL',
    };
    test('that correct error is thrown when NODE_ENV is not provided', () => {
        expect.assertions(1);
        const environment = Object.assign(Object.assign({}, environmentMock), { NODE_ENV: undefined });
        try {
            getServiceConfig_1.getServiceConfig(environment);
        }
        catch (err) {
            expect(err.message).toEqual('NODE_ENV is not provided.');
        }
    });
    test('that NODE_ENV is returned', () => {
        expect.assertions(1);
        const environment = getServiceConfig_1.getServiceConfig();
        expect(environment.NODE_ENV).toBeDefined();
    });
    test('that correct error is thrown when PORT is not provided', () => {
        expect.assertions(1);
        const environment = Object.assign(Object.assign({}, environmentMock), { PORT: undefined });
        try {
            getServiceConfig_1.getServiceConfig(environment);
        }
        catch (err) {
            expect(err.message).toEqual('PORT is not provided.');
        }
    });
    test('that PORT is returned', () => {
        expect.assertions(1);
        const environment = getServiceConfig_1.getServiceConfig();
        expect(environment.PORT).toBeDefined();
    });
    test('that correct error is thrown when DATABASE_URI is not provided', () => {
        expect.assertions(1);
        const environment = Object.assign(Object.assign({}, environmentMock), { DATABASE_URI: undefined });
        try {
            getServiceConfig_1.getServiceConfig(environment);
        }
        catch (err) {
            expect(err.message).toEqual('DATABASE_URI is not provided.');
        }
    });
    test('that DATABASE_URI is returned', () => {
        expect.assertions(1);
        const environment = getServiceConfig_1.getServiceConfig();
        expect(environment.DATABASE_URI).toBeDefined();
    });
    test('that correct error is thrown when COACHESO_APP_URL is not provided', () => {
        expect.assertions(1);
        const environment = Object.assign(Object.assign({}, environmentMock), { COACHESO_APP_URL: undefined });
        try {
            getServiceConfig_1.getServiceConfig(environment);
        }
        catch (err) {
            expect(err.message).toEqual('COACHESO_APP_URL is not provided.');
        }
    });
    test('that COACHESO_APP_URL is returned', () => {
        expect.assertions(1);
        const environment = getServiceConfig_1.getServiceConfig();
        expect(environment.COACHESO_APP_URL).toBeDefined();
    });
    test('that correct error is thrown when AUTH0_BASE_URL is not provided', () => {
        expect.assertions(1);
        const environment = Object.assign(Object.assign({}, environmentMock), { AUTH0_BASE_URL: undefined });
        try {
            getServiceConfig_1.getServiceConfig(environment);
        }
        catch (err) {
            expect(err.message).toEqual('AUTH0_BASE_URL is not provided.');
        }
    });
    test('that AUTH0_BASE_URL is returned', () => {
        expect.assertions(1);
        const environment = getServiceConfig_1.getServiceConfig();
        expect(environment.AUTH0_BASE_URL).toBeDefined();
    });
});
//# sourceMappingURL=getServiceConfig.spec.js.map