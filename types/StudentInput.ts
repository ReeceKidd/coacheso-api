import { InputType, Field } from 'type-graphql'

import { Student } from '../entity/Student'

@InputType()
export class SkillInput {
  @Field()
  skill: string
}

@InputType()
export class StudentInput implements Partial<Student> {
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
