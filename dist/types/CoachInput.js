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
exports.CoachInput = void 0;
const type_graphql_1 = require("type-graphql");
let CoachInput = class CoachInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CoachInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field((_type) => [String]),
    __metadata("design:type", Array)
], CoachInput.prototype, "activities", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CoachInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CoachInput.prototype, "background", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CoachInput.prototype, "profilePicture", void 0);
CoachInput = __decorate([
    type_graphql_1.InputType()
], CoachInput);
exports.CoachInput = CoachInput;
//# sourceMappingURL=CoachInput.js.map