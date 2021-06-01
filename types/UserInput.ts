import { InputType, Field, registerEnumType } from 'type-graphql'

import { User, UserMode } from '../entity/User'

registerEnumType(UserMode, {
  name: 'UserMode',
})

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  username?: string

  @Field(() => UserMode, { nullable: true })
  mode?: UserMode
}
