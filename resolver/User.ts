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
import { CoachModel } from '../entity/Coach'
import { StudentModel } from '../entity/Student'

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
    const { name, username, mode } = input

    const updateValues: {
      name?: string
      username?: string
      mode?: UserMode
    } = {}

    if (name) {
      updateValues.name = name
    }

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

    await CoachModel.findByIdAndUpdate(
      ctx.res.locals.user.coachId,
      updateValues
    )
    await StudentModel.findByIdAndUpdate(
      ctx.res.locals.user.studentId,
      updateValues
    )

    if (!user) {
      throw new Error('User does not exist')
    }
    return user
  }
}
