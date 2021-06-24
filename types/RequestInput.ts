import { ObjectId } from 'mongodb'
import { InputType, Field, registerEnumType } from 'type-graphql'

import { Request, RequestStatus, RequestType } from '../entity/Request'

registerEnumType(RequestType, {
  name: 'RequestType',
})

@InputType()
export class RequestInput implements Partial<Request> {
  @Field({ nullable: true })
  _id?: ObjectId

  @Field({ nullable: true })
  coachId?: ObjectId

  @Field({ nullable: true })
  studentId?: ObjectId

  @Field(() => RequestType, { nullable: true })
  type?: RequestType

  @Field(() => RequestStatus, { nullable: true })
  status?: RequestStatus
}
