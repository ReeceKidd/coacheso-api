import { StudentSkill } from '../entity/Student'
import { ObjectType, Field } from 'type-graphql'
import { ObjectId } from 'mongodb'

@ObjectType()
export class Coach {
  @Field()
  userId: string

  @Field()
  username: string

  @Field()
  name: string

  @Field()
  picture: string
}

@ObjectType()
export class StudentResponse {
  @Field()
  readonly _id: ObjectId

  @Field()
  userId: string

  @Field()
  username: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  picture?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [StudentSkill], { defaultValue: [] })
  skills?: StudentSkill[]

  @Field({ nullable: true })
  certifications?: string

  @Field(() => [Coach], { nullable: true })
  coaches?: Coach[]

  @Field({ nullable: true })
  reviews?: string
}
