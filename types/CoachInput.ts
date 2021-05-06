import { InputType, Field } from 'type-graphql'

import { ObjectId } from 'mongodb'
import { Coach } from '../entity/Coach'

@InputType()
export class CoachInput implements Partial<Coach> {
  @Field({ nullable: true })
  id?: ObjectId

  @Field()
  name: string

  @Field((_type) => [String])
  activities: string[]
}
