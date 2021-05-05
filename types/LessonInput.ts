import { InputType, Field } from 'type-graphql'

import { ObjectId } from 'mongodb'
import { Lesson } from '../entity/Lesson'

@InputType()
export class LessonInput implements Partial<Lesson> {
  @Field({ nullable: true })
  id?: ObjectId

  @Field()
  title: string
}
