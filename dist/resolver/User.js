"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const isAuth_1 = require("../graphql-middleware/isAuth");
const User_1 = require("../entity/User");
const object_id_scalar_1 = require("../schema/object-id.scalar");
let UserResolver = class UserResolver {
    user(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User_1.UserModel.findById(userId);
        });
    }
    currentUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield User_1.UserModel.findById(ctx.res.locals.user._id);
            console.log('Current user', currentUser);
            return currentUser;
        });
    }
};
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    __param(0, type_graphql_1.Arg('userId', () => object_id_scalar_1.ObjectIdScalar))
], UserResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Query(() => User_1.User, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx())
], UserResolver.prototype, "currentUser", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(() => User_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=User.js.map