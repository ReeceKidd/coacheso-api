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
exports.getIsAuthenticatedMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const client = jwks_rsa_1.default({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://coacheso.eu.auth0.com/.well-known/jwks.json',
});
function getKey(header, callback) {
    client.getSigningKey(header.kid, function (_error, key) {
        return callback(null, key.getPublicKey());
    });
}
const getIsAuthenticatedMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.headers['authorization'];
        if (token) {
            const bearerToken = token.split(' ');
            const validateAccessToken = yield new Promise((resolve, reject) => {
                jsonwebtoken_1.default.verify(bearerToken[1], getKey, {
                    issuer: `https://coacheso.eu.auth0.com/`,
                    algorithms: ['RS256'],
                }, (error, user) => {
                    if (error) {
                        reject({ error });
                    }
                    if (user) {
                        resolve(user);
                    }
                });
            });
            response.locals.isAuthenticated = Boolean(validateAccessToken);
        }
        return next();
    }
    catch (err) {
        next(err.error);
    }
});
exports.getIsAuthenticatedMiddleware = getIsAuthenticatedMiddleware;
//# sourceMappingURL=getIsAuthenticatedMiddleware.js.map