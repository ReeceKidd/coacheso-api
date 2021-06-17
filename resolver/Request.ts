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

@Resolver(() => Request)
export class RequestResolver {
  @Query(() => [Request])
  @UseMiddleware(isAuth)
  async coachingRequests(
    @Ctx()
    ctx: MyContext
  ): Promise<Request[]> {
    const currentRequests = await RequestModel.find({
      coachId: ctx.res.locals.user.coachId,
      type: RequestType.coaching,
    })

    return currentRequests
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
