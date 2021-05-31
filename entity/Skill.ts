import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Skill {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true, index: true, unique: true })
  skill: string
}

export const SkillModel = getModelForClass(Skill)
