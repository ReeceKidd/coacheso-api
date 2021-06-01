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
import { CoachInput, SkillInput } from '../types/CoachInput'
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
  async coach(@Arg('username') username: string): Promise<Coach | null> {
    return await CoachModel.findOne({ username })
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
      username: ctx.res.locals.username,
      name: ctx.res.locals.name,
    })

    ctx.res.locals.user = await UserModel.findByIdAndUpdate(
      ctx.res.locals.user._id,
      {
        isCoach: true,
      },
      { new: true }
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
    const { title, description, skills } = input

    const updateValues: {
      username?: string
      title?: string
      description?: string
      skills?: SkillInput[]
    } = {}

    if (title) {
      updateValues.title = title
    }
    if (description) {
      updateValues.description = description
    }
    if (skills) {
      updateValues.skills = skills
    }

    const coach = await CoachModel.findOneAndUpdate(
      { userId: ctx.res.locals.user._id },
      updateValues,
      { new: true }
    )

    if (!coach) {
      throw new Error('Coach does not exist')
    }
    return coach
  }
}
