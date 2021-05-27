import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Coach {
  @Field()
  readonly _id: ObjectId

  @Field({ nullable: true })
  @Property()
  name?: string

  @Field({ nullable: true })
  @Property()
  title?: string

  @Field({ nullable: true })
  @Property()
  profilePicture?: string

  @Field({ nullable: true })
  @Property()
  description?: string

  @Field({ nullable: true })
  @Property()
  skills?: string

  @Field({ nullable: true })
  @Property()
  certifications?: string

  @Field({ nullable: true })
  @Property()
  students?: string

  @Field({ nullable: true })
  @Property()
  reviews?: string
}

export const CoachModel = getModelForClass(Coach)
