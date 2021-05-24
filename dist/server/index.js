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
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const schema_1 = __importDefault(require("../schema"));
const session_1 = __importDefault(require("../session"));
const getServiceConfig_1 = require("../getServiceConfig");
const getIsAuthenticatedMiddleware_1 = require("../express-middleware/getIsAuthenticatedMiddleware");
const updateAuthenticatedUserMiddleware_1 = require("../express-middleware/updateAuthenticatedUserMiddleware");
const { PORT, COACHESO_APP_URL } = getServiceConfig_1.getServiceConfig();
const port = PORT || 8000;
function createServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield session_1.default();
        const app = express_1.default();
        const corsOptions = {
            origin: COACHESO_APP_URL,
            credentials: true,
        };
        app.use(cors_1.default(corsOptions));
        app.use(express_1.default.json());
        app.get('/health', (_request, response) => {
            response.send({
                uptime: process.uptime(),
                message: 'OK',
                timestamp: Date.now(),
            });
        });
        app.use(getIsAuthenticatedMiddleware_1.getIsAuthenticatedMiddleware);
        app.use(updateAuthenticatedUserMiddleware_1.updateAuthenticatedUserMiddleware);
        const schema = yield schema_1.default();
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema,
            context: ({ req, res }) => ({ req, res }),
            introspection: true,
            playground: {
                settings: {
                    'request.credentials': 'include',
                },
            },
        });
        apolloServer.applyMiddleware({ app, cors: corsOptions });
        app.listen({ port }, () => {
            console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
        });
        app.use((err, _request, response, _next) => {
            response.status(err.status || 500).send(err.message);
        });
    });
}
createServer();
//# sourceMappingURL=index.js.map