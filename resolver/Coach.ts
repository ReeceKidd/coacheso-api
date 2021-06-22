import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql'

import { isAuth } from '../graphql-middleware/isAuth'
import { CoachInput, SkillInput } from '../types/CoachInput'
import { Coach, CoachModel } from '../entity/Coach'
import { UserModel } from '../entity/User'
import { MyContext } from '../types/MyContext'
import { CoachResponse } from '../types/CoachResponse'

@Resolver(() => Coach)
export class CoachResolver {
  @Query(() => CoachResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async currentCoach(
    @Ctx()
    ctx: MyContext
  ): Promise<CoachResponse | null> {
    try {
      const currentCoach: CoachResponse[] = await CoachModel.aggregate([
        {
          $match: {
            _id: ctx.res.locals.user.coachId,
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'students',
            foreignField: '_id',
            as: 'students',
          },
        },
        {
          $limit: 1,
        },
      ])

      if (currentCoach.length > 0) {
        return currentCoach[0]
      }

      const newCoach = await CoachModel.create({
        userId: ctx.res.locals.user._id,
        username: ctx.res.locals.user.username,
        name: ctx.res.locals.user.name,
        picture: ctx.res.locals.user.picture,
      })

      ctx.res.locals.user = await UserModel.findByIdAndUpdate(
        ctx.res.locals.user._id,
        {
          coachId: newCoach._id,
        },
        { new: true }
      ).lean()

      return { ...newCoach, students: [] }
    } catch (err) {
      console.log('Error', err)
      return null
    }
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
