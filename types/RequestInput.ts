import { ObjectId } from 'mongodb'
import { InputType, Field, registerEnumType } from 'type-graphql'

import { Request, RequestType } from '../entity/Request'

registerEnumType(RequestType, {
  name: 'RequestType',
})

@InputType()
export class RequestInput implements Partial<Request> {
  @Field()
  coachId?: ObjectId

  @Field(() => RequestType)
  type?: RequestType
}
