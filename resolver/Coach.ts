import { Resolver, Query, Arg, Ctx } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { MyContext } from '../types/MyContext'
import { Coach, CoachModel } from '../entity/Coach'
import { ObjectIdScalar } from '../schema/object-id.scalar'

@Resolver(() => Coach)
export class CoachResolver {
  @Query(() => Coach, { nullable: true })
  async Coach(@Arg('CoachId', () => ObjectIdScalar) CoachId: ObjectId) {
    return await CoachModel.findById(CoachId)
  }

  @Query(() => Coach, { nullable: true })
  async currentCoach(
    @Ctx()
    ctx: MyContext
  ): Promise<Coach | null> {
    return await CoachModel.findById(ctx.res.locals.CoachId)
  }
}
