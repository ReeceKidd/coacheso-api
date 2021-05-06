import { Resolver, Query, Arg, Mutation } from 'type-graphql'
import { CoachInput } from '../types/CoachInput'
import { Coach, CoachModel } from '../entity/Coach'

@Resolver(() => Coach)
export class CoachResolver {
  @Query(() => [Coach])
  async coaches(@Arg('activity') activity: string): Promise<Coach[]> {
    return await CoachModel.find({ activities: activity })
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
