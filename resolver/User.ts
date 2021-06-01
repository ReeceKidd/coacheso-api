import {
  Resolver,
  Query,
  UseMiddleware,
  Arg,
  Ctx,
  Mutation,
} from 'type-graphql'
import { ObjectId } from 'mongodb'
import { MyContext } from '../types/MyContext'
import { isAuth } from '../graphql-middleware/isAuth'
import { User, UserMode, UserModel } from '../entity/User'
import { ObjectIdScalar } from '../schema/object-id.scalar'
import { UserInput } from '../types/UserInput'

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

    return currentUser
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async updateCurrentUser(
    @Ctx()
    ctx: MyContext,
    @Arg('input') input: UserInput
  ): Promise<User> {
    const { username, mode } = input

    const updateValues: {
      username?: string
      mode?: UserMode
    } = {}

    if (username) {
      updateValues.username = username
    }

    if (mode) {
      updateValues.mode = mode
    }

    const user = await UserModel.findByIdAndUpdate(
      ctx.res.locals.user._id,
      updateValues,
      { new: true }
    )

    if (!user) {
      throw new Error('User does not exist')
    }
    return user
  }
}
