import { InputType, Field } from 'type-graphql'

import { Student } from '../entity/Student'
import { SkillInput } from './SkillInput'

@InputType()
export class StudentInput implements Partial<Student> {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => [SkillInput], { nullable: true })
  skills?: SkillInput[]
}
