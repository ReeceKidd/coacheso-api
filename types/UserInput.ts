import { InputType, Field } from 'type-graphql'

import { User } from '../entity/User'

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  name: string

  @Field((_type) => [String])
  activities: string[]

  @Field()
  title: string

  @Field()
  background: string

  @Field({ nullable: true })
  profilePicture?: string
}
