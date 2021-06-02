"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachModel = exports.Coach = exports.CoachSkill = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const mongodb_1 = require("mongodb");
const type_graphql_1 = require("type-graphql");
let CoachSkill = class CoachSkill {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CoachSkill.prototype, "skill", void 0);
CoachSkill = __decorate([
    type_graphql_1.ObjectType()
], CoachSkill);
exports.CoachSkill = CoachSkill;
let Coach = class Coach {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", mongodb_1.ObjectId)
], Coach.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Coach.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Coach.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Coach.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Coach.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Coach.prototype, "profilePicture", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Coach.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [CoachSkill], { defaultValue: [] }),
    typegoose_1.prop(),
    __metadata("design:type", Array)
], Coach.prototype, "skills", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Coach.prototype, "certifications", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Coach.prototype, "students", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typegoose_1.prop(),
    __metadata("design:type", String)
], Coach.prototype, "reviews", void 0);
Coach = __decorate([
    type_graphql_1.ObjectType()
], Coach);
exports.Coach = Coach;
exports.CoachModel = typegoose_1.getModelForClass(Coach);
//# sourceMappingURL=Coach.js.map