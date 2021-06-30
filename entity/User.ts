import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType, registerEnumType } from 'type-graphql'

export enum UserMode {
  coach = 'coach',
  student = 'student',
}

registerEnumType(UserMode, {
  name: 'UserMode',
})

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true, index: true, unique: true })
  username: string

  @Field()
  @Property({ required: true, index: true, unique: true })
  email: string

  @Field({ defaultValue: UserMode.student })
  @Property({ required: true })
  mode: string

  @Field({ nullable: true })
  @Property()
  studentId?: ObjectId

  @Field({ nullable: true })
  @Property()
  coachId?: ObjectId

  @Field({ nullable: true })
  @Property()
  givenName?: string

  @Field({ nullable: true })
  @Property()
  familyName?: string

  @Field({ nullable: true })
  @Property()
  name?: string

  @Field({ nullable: true })
  @Property()
  picture?: string

  @Field({ nullable: true })
  @Property()
  locale?: string

  @Field({ nullable: true })
  @Property()
  emailVerified?: boolean
}

export const UserModel = getModelForClass(User)
