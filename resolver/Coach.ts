import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { CoachInput } from '../types/CoachInput'
import { Coach, CoachModel } from '../entity/Coach'

@Resolver(() => Coach)
export class CoachResolver {
  @Query(() => [Coach])
  async coaches(
    @Arg('activity', { nullable: true }) activity?: string
  ): Promise<Coach[]> {
    if (activity) {
      return await CoachModel.find({ activities: activity })
    }
    return await CoachModel.find({})
  }

  @Mutation(() => Coach)
  async addCoach(@Arg('input') input: CoachInput): Promise<Coach> {
    const coach = new CoachModel({
      ...input,
    })

    await coach.save()

    return coach
  }
}
