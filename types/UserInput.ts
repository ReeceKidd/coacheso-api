import { InputType, Field } from 'type-graphql'

import { User, UserMode } from '../entity/User'

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  username?: string

  @Field(() => UserMode, { nullable: true })
  mode?: UserMode
}
