import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

export enum RequestType {
  coaching = 'coaching',
}

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
}

export const RequestModel = getModelForClass(Request)
