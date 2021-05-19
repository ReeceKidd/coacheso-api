import { InputType, Field } from 'type-graphql'

import { Coach } from '../entity/Coach'

@InputType()
export class CoachInput implements Partial<Coach> {
  @Field()
  name: string

  @Field((_type) => [String])
  activities: string[]

  @Field()
  title: string

  @Field()
  background: string
}
