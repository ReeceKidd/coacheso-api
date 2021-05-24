"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachModel = exports.Coach = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
let Coach = class Coach {
};
__decorate([
    type_graphql_1.Field()
], Coach.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true })
], Coach.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field((_type) => [String]),
    typegoose_1.prop()
], Coach.prototype, "activities", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], Coach.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], Coach.prototype, "background", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop()
], Coach.prototype, "profilePicture", void 0);
Coach = __decorate([
    type_graphql_1.ObjectType()
], Coach);
exports.Coach = Coach;
exports.CoachModel = typegoose_1.getModelForClass(Coach);
//# sourceMappingURL=Coach.js.map