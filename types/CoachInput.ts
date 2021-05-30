import { InputType, Field } from 'type-graphql'

import { Coach } from '../entity/Coach'

@InputType()
export class SkillInput {
  @Field()
  skill: string
}

@InputType()
export class CoachInput implements Partial<Coach> {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  profilePicture?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [SkillInput], { nullable: true })
  skills?: SkillInput[]
}
