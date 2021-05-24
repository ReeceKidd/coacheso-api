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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachResolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../graphql-middleware/isAuth");
const CoachInput_1 = require("../types/CoachInput");
const Coach_1 = require("../entity/Coach");
const User_1 = require("../entity/User");
let CoachResolver = class CoachResolver {
    coaches(activity) {
        return __awaiter(this, void 0, void 0, function* () {
            return Coach_1.CoachModel.find(activity ? { activities: activity } : {});
        });
    }
    addCoach(ctx, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const coach = new Coach_1.CoachModel(Object.assign({}, input));
            ctx.res.locals.user = yield User_1.UserModel.findByIdAndUpdate(ctx.res.locals.user._id, {
                isCoach: true,
            });
            yield coach.save();
            return coach;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [Coach_1.Coach]),
    __param(0, type_graphql_1.Arg('activity', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoachResolver.prototype, "coaches", null);
__decorate([
    type_graphql_1.Mutation(() => Coach_1.Coach),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CoachInput_1.CoachInput]),
    __metadata("design:returntype", Promise)
], CoachResolver.prototype, "addCoach", null);
CoachResolver = __decorate([
    type_graphql_1.Resolver(() => Coach_1.Coach)
], CoachResolver);
exports.CoachResolver = CoachResolver;
//# sourceMappingURL=Coach.js.map