import { getModelForClass, prop } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Skill {
  @Field()
  readonly _id: ObjectId

  @Field()
  @prop({ required: true, index: true, unique: true })
  skill: string
}

export const SkillModel = getModelForClass(Skill)
