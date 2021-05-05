import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class Lesson {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  title: string
}

export const LessonModel = getModelForClass(Lesson)
