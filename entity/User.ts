import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId

  @Field({ nullable: true })
  @Property({ required: true, index: true, unique: true })
  username: string

  @Field()
  @Property({ required: true })
  email: string

  @Field({ defaultValue: false })
  @Property()
  isCoach: boolean

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
  emailVerified?: string
}

export const UserModel = getModelForClass(User)
