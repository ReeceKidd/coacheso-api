import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Coach {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  name: string

  @Field((_type) => [String])
  @Property()
  activities: string[]

  @Field()
  @Property()
  title: string

  @Field()
  @Property()
  background: string
}

export const CoachModel = getModelForClass(Coach)
