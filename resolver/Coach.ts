import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql'
import { ObjectId } from 'mongoose'
import { isAuth } from '../graphql-middleware/isAuth'
import { CoachInput } from '../types/CoachInput'
import { Coach, CoachModel } from '../entity/Coach'
import { UserModel } from '../entity/User'
import { MyContext } from '../types/MyContext'
import { ObjectIdScalar } from '../schema/object-id.scalar'

@Resolver(() => Coach)
export class CoachResolver {
  @Query(() => Coach, { nullable: true })
  @UseMiddleware(isAuth)
  async currentCoach(
    @Ctx()
    ctx: MyContext
  ): Promise<Coach | null> {
    const currentCoach = await CoachModel.findOne({
      userId: ctx.res.locals.user._id,
    })

    return currentCoach
  }

  @Query(() => [Coach])
  async coaches(
    @Arg('skill', { nullable: true }) skill?: string
  ): Promise<Coach[]> {
    return CoachModel.find(skill ? { 'skills.skill': skill } : {})
  }

  @Query(() => Coach, { nullable: true })
  async coach(
    @Arg('coachId', () => ObjectIdScalar) coachId: ObjectId
  ): Promise<Coach | null> {
    return await CoachModel.findById(coachId)
  }

  @Mutation(() => Coach)
  @UseMiddleware(isAuth)
  async becomeCoach(
    @Ctx()
    ctx: MyContext,
    @Arg('input') input: CoachInput
  ): Promise<Coach> {
    const coach = new CoachModel({
      ...input,
      userId: ctx.res.locals.user._id,
    })

    ctx.res.locals.user = await UserModel.findByIdAndUpdate(
      ctx.res.locals.user._id,
      {
        isCoach: true,
      }
    )

    await coach.save()

    return coach
  }

  @Mutation(() => Coach)
  @UseMiddleware(isAuth)
  async updateCoach(
    @Ctx()
    ctx: MyContext,
    @Arg('input') input: CoachInput
  ): Promise<Coach> {
    const coach = await CoachModel.findOneAndUpdate(
      { userId: ctx.res.locals.user._id },
      {
        ...input,
      }
    )

    if (!coach) {
      throw new Error('Coach does not exist')
    }
    return coach
  }
}
