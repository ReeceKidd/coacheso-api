import { ObjectType, Field } from 'type-graphql'
import { ObjectId } from 'mongodb'

@ObjectType()
export class CoachingRequest {
  @Field()
  _id: ObjectId

  @Field(() => String)
  username: string

  @Field(() => String)
  name: string

  @Field(() => String)
  picture: string
}
