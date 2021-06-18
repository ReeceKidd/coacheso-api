import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql'

import { isAuth } from '../graphql-middleware/isAuth'
import { Request, RequestModel, RequestType } from '../entity/Request'
import { MyContext } from '../types/MyContext'
import { RequestInput } from '../types/RequestInput'
import { CoachingRequest } from '../types/CoachingRequest'

@Resolver(() => Request)
export class RequestResolver {
  @Query(() => [CoachingRequest])
  @UseMiddleware(isAuth)
  async coachingRequests(
    @Ctx()
    ctx: MyContext
  ): Promise<CoachingRequest[]> {
    const coachingRequests = await RequestModel.aggregate([
      {
        $addFields: {
          user_id: { $toObjectId: '$userId' },
        },
      },
      {
        $match: {
          coachId: ctx.res.locals.user.coachId,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          username: '$user.username',
          name: '$user.name',
          picture: '$user.picture',
        },
      },
    ])
    // Need to get this projecting properly
    return coachingRequests
  }

  @Mutation(() => Request)
  @UseMiddleware(isAuth)
  async sendRequest(
    @Ctx()
    ctx: MyContext,
    @Arg('input') input: RequestInput
  ): Promise<Request> {
    const request = new RequestModel({
      ...input,
      userId: ctx.res.locals.user._id,
    })
    await request.save()
    return request
  }
}
