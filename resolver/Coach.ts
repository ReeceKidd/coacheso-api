import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql'
import { isAuth } from '../graphql-middleware/isAuth'
import { CoachInput } from '../types/CoachInput'
import { Coach, CoachModel } from '../entity/Coach'
import { UserModel } from '../entity/User'
import { MyContext } from '../types/MyContext'

@Resolver(() => Coach)
export class CoachResolver {
  @Query(() => [Coach])
  async coaches(
    @Arg('activity', { nullable: true }) activity?: string
  ): Promise<Coach[]> {
    return CoachModel.find(activity ? { activities: activity } : {})
  }

  @Mutation(() => Coach)
  @UseMiddleware(isAuth)
  async addCoach(
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
