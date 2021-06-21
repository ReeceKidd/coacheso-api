import { ObjectId } from 'mongodb'
import { InputType, Field } from 'type-graphql'

import { Request, RequestStatus, RequestType } from '../entity/Request'

@InputType()
export class RespondToRequestInput implements Partial<Request> {
  @Field()
  _id: ObjectId

  @Field(() => RequestStatus)
  status: RequestStatus
}
