import { CoachSkill } from '../entity/Coach'
import { ObjectType, Field } from 'type-graphql'
import { ObjectId } from 'mongodb'

@ObjectType()
export class CoachStudent {
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
export class CoachResponse {
  @Field()
  readonly _id: ObjectId

  @Field()
  userId: ObjectId

  @Field()
  username: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  picture?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [CoachSkill], { defaultValue: [] })
  skills?: CoachSkill[]

  @Field({ nullable: true })
  certifications?: string

  @Field(() => [CoachStudent], { nullable: true })
  students?: CoachStudent[]

  @Field({ nullable: true })
  reviews?: string
}
