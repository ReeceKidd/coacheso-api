import { Resolver, Query, UseMiddleware, Arg, Ctx } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { MyContext } from '../types/MyContext'
import { isAuth } from '../graphql-middleware/isAuth'
import { User, UserModel } from '../entity/User'
import { ObjectIdScalar } from '../schema/object-id.scalar'

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async user(
    @Arg('userId', () => ObjectIdScalar) userId: ObjectId
  ): Promise<User | null> {
    return await UserModel.findById(userId)
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async currentUser(
    @Ctx()
    ctx: MyContext
  ): Promise<User | null> {
    const currentUser = await UserModel.findById(ctx.res.locals.user._id)
    console.log('Current user', currentUser)
    return currentUser
  }
}
