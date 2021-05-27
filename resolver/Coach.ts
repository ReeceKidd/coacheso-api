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
  @Query(() => [Coach])
  async coaches(
    @Arg('skill', { nullable: true }) skill?: string
  ): Promise<Coach[]> {
    return CoachModel.find(skill ? { skills: skill } : {})
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
}
