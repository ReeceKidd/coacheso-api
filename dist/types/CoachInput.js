"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachInput = void 0;
const type_graphql_1 = require("type-graphql");
let CoachInput = class CoachInput {
};
__decorate([
    type_graphql_1.Field()
], CoachInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field((_type) => [String])
], CoachInput.prototype, "activities", void 0);
__decorate([
    type_graphql_1.Field()
], CoachInput.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field()
], CoachInput.prototype, "background", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true })
], CoachInput.prototype, "profilePicture", void 0);
CoachInput = __decorate([
    type_graphql_1.InputType()
], CoachInput);
exports.CoachInput = CoachInput;
//# sourceMappingURL=CoachInput.js.map