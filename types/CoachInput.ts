import { InputType, Field } from 'type-graphql'

import { Coach } from '../entity/Coach'
import { SkillInput } from './SkillInput'

@InputType()
export class CoachInput implements Partial<Coach> {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  profilePicture?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [SkillInput], { nullable: true })
  skills?: SkillInput[]
}
