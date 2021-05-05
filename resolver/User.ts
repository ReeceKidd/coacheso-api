import { Resolver, Query, Arg, Ctx } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { MyContext } from '../types/MyContext'
import { User, UserModel } from '../entity/User'
import { ObjectIdScalar } from '../schema/object-id.scalar'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(@Arg('userId', () => ObjectIdScalar) userId: ObjectId) {
    return await UserModel.findById(userId)
  }

  @Query(() => User, { nullable: true })
  async currentUser(
    @Ctx()
    ctx: MyContext
  ): Promise<User | null> {
    return await UserModel.findById(ctx.res.locals.userId)
  }
}
