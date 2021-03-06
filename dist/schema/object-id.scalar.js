"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectIdScalar = void 0;
const graphql_1 = require("graphql");
const mongodb_1 = require("mongodb");
exports.ObjectIdScalar = new graphql_1.GraphQLScalarType({
    name: 'ObjectId',
    description: 'Mongo object id scalar type',
    parseValue(value) {
        return new mongodb_1.ObjectId(value);
    },
    serialize(value) {
        return value.toHexString();
    },
    parseLiteral(ast) {
        if (ast.kind === graphql_1.Kind.STRING) {
            return new mongodb_1.ObjectId(ast.value);
        }
        return null;
    },
});
//# sourceMappingURL=object-id.scalar.js.map