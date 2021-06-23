import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class StudentSkill {
  @Field()
  skill: string
}

@ObjectType()
export class Student {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ unique: true, index: true })
  userId: ObjectId

  @Field({ nullable: true })
  @Property()
  title?: string

  @Field({ nullable: true })
  @Property()
  description?: string

  @Field(() => [StudentSkill], { defaultValue: [] })
  @Property()
  skills?: StudentSkill[]

  @Field(() => [ObjectId], { nullable: true })
  @Property()
  coaches?: ObjectId[]
}

export const StudentModel = getModelForClass(Student)
