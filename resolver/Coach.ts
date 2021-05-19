import { Resolver, Query, Arg, Mutation, UseMiddleware } from 'type-graphql'
import { CoachInput } from '../types/CoachInput'
import { Coach, CoachModel } from '../entity/Coach'
import { isAuth } from '../graphql-middleware/isAuth'

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
  async addCoach(@Arg('input') input: CoachInput): Promise<Coach> {
    const coach = new CoachModel({
      ...input,
    })

    await coach.save()

    return coach
  }
}
