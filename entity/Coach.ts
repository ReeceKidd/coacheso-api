import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class CoachSkill {
  @Field()
  skill: string
}

@ObjectType()
export class Coach {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property()
  userId: string

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

  @Field(() => [CoachSkill], { defaultValue: [] })
  @Property()
  skills?: CoachSkill[]

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
