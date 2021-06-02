"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAuthenticatedUserMiddleware = void 0;
const User_1 = require("../entity/User");
const axios_1 = __importDefault(require("axios"));
const getServiceConfig_1 = require("../getServiceConfig");
const { AUTH0_BASE_URL } = getServiceConfig_1.getServiceConfig();
const updateAuthenticatedUserMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.headers['authorization'];
        const isAuthenticated = response.locals.isAuthenticated;
        if (isAuthenticated && token) {
            const url = `${AUTH0_BASE_URL}/userInfo`;
            const { data } = yield axios_1.default.get(url, {
                headers: { Authorization: token },
            });
            response.locals.user = yield User_1.UserModel.findOneAndUpdate({
                email: data.email,
            }, {
                email: data.email,
                givenName: data.given_name,
                familyName: data.family_name,
                name: data.name,
                picture: data.picture,
                locale: data.locale,
                emailVerified: data.email_verified,
            });
            if (!response.locals.user) {
                const databaseUser = yield User_1.UserModel.create({
                    email: data.email,
                    givenName: data.given_name,
                    familyName: data.family_name,
                    name: data.name,
                    picture: data.picture,
                    locale: data.locale,
                    emailVerified: data.email_verified,
                });
                response.locals.user = databaseUser;
            }
        }
        return next();
    }
    catch (err) {
        next(err);
    }
});
exports.updateAuthenticatedUserMiddleware = updateAuthenticatedUserMiddleware;
//# sourceMappingURL=updateAuthenticatedUserMiddleware.js.map