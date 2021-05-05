import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Coach {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  email: string

  @Property({ required: true })
  password: string
}

export const CoachModel = getModelForClass(Coach)
