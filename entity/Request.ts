import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType, registerEnumType } from 'type-graphql'

export enum RequestType {
  coaching = 'coaching',
}

registerEnumType(RequestType, {
  name: 'RequestType',
})

export enum RequestStatus {
  accept = 'accepted',
  decline = 'declined',
  awaitingResponse = 'awaitingResponse',
}

registerEnumType(RequestStatus, {
  name: 'RequestStatus',
})

@ObjectType()
export class Request {
  @Field()
  readonly _id: ObjectId

  @Field(() => RequestType)
  @Property({ required: true })
  type: RequestType

  @Field()
  @Property({ required: true })
  coachId: ObjectId

  @Field()
  @Property({ required: true })
  userId: ObjectId

  @Field()
  @Property({ default: RequestStatus.awaitingResponse })
  status: RequestStatus
}

export const RequestModel = getModelForClass(Request)
