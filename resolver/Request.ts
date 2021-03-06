import {
  Resolver,
  Query,
  Arg,
  Mutation,
  UseMiddleware,
  Ctx,
} from 'type-graphql'

import { isAuth } from '../graphql-middleware/isAuth'
import {
  Request,
  RequestModel,
  RequestStatus,
  RequestType,
} from '../entity/Request'
import { CoachModel } from '../entity/Coach'
import { MyContext } from '../types/MyContext'
import { RequestInput } from '../types/RequestInput'
import { CoachingRequest } from '../types/CoachingRequest'
import { RespondToRequestInput } from '../types/RespondToRequestInput'
import { StudentModel } from '../entity/Student'

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
        $match: {
          coachId: ctx.res.locals.user.coachId,
          status: RequestStatus.awaitingResponse,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          _id: 1,
          user: { $arrayElemAt: ['$user', 0] },
        },
      },
      {
        $project: {
          _id: 1,
          username: '$user.username',
          name: '$user.name',
          picture: '$user.picture',
        },
      },
    ])
    return coachingRequests
  }

  @Query(() => Boolean)
  async canRequestCoaching(
    @Ctx()
    ctx: MyContext,
    @Arg('coachUsername', { nullable: true }) coachUsername?: string
  ): Promise<boolean> {
    const coach = await CoachModel.findOne({
      username: coachUsername,
    })
    if (
      coach?.students?.find(
        (studentId) => studentId === ctx.res.locals.user._id
      )
    ) {
      return false
    }
    const request = await RequestModel.findOne({
      userId: ctx.res.locals.user._id,
      coachId: coach?._id,
    }).lean()

    return Boolean(!request)
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
      type: RequestType.coaching,
    })
    await request.save()
    return request
  }

  @Mutation(() => Request)
  @UseMiddleware(isAuth)
  async respondToRequest(
    @Ctx()
    ctx: MyContext,
    @Arg('input') input: RespondToRequestInput
  ): Promise<Request> {
    const request = await RequestModel.findOneAndUpdate(
      { _id: input._id, coachId: ctx.res.locals.user.coachId },
      {
        status: input.status,
      },
      { new: true }
    )
    if (!request) {
      throw new Error('Request does not exist')
    }

    if (input.status === RequestStatus.accept) {
      await CoachModel.findOneAndUpdate(
        { _id: ctx.res.locals.user.coachId },
        { $addToSet: { students: request.studentId } }
      )
      await StudentModel.findOneAndUpdate(
        {
          _id: request.studentId,
        },
        { $addToSet: { coaches: ctx.res.locals.user.coachId } }
      )
    }

    return request
  }
}
