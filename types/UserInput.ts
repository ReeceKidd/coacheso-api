import { InputType, Field } from 'type-graphql'

import { User } from '../entity/User'

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  username: string
}
