"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServiceConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const getServiceConfig = (environment = process.env) => {
    const { NODE_ENV, PORT, DATABASE_URI, COACHESO_APP_URL, AUTH0_BASE_URL } = environment;
    if (!NODE_ENV)
        throw new Error('NODE_ENV is not provided.');
    if (!PORT)
        throw new Error('PORT is not provided.');
    if (!DATABASE_URI)
        throw new Error('DATABASE_URI is not provided.');
    if (!COACHESO_APP_URL)
        throw new Error('COACHESO_APP_URL is not provided.');
    if (!AUTH0_BASE_URL)
        throw new Error('AUTH0_BASE_URL is not provided.');
    return {
        NODE_ENV,
        PORT,
        DATABASE_URI,
        COACHESO_APP_URL,
        AUTH0_BASE_URL,
    };
};
exports.getServiceConfig = getServiceConfig;
//# sourceMappingURL=getServiceConfig.js.map