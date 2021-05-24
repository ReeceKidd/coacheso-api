"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
let User = class User {
};
__decorate([
    type_graphql_1.Field()
], User.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true })
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop()
], User.prototype, "isCoach", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], User.prototype, "givenName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], User.prototype, "familyName", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], User.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], User.prototype, "picture", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], User.prototype, "locale", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], User.prototype, "emailVerified", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
exports.User = User;
exports.UserModel = typegoose_1.getModelForClass(User);
//# sourceMappingURL=User.js.map