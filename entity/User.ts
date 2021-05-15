import { prop as Property, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId

  @Field()
  @Property({ required: true })
  email: string

  @Field()
  @Property()
  givenName: string

  @Field()
  @Property()
  familyName: string

  @Field()
  @Property()
  name: string

  @Field()
  @Property()
  picture: string

  @Field()
  @Property()
  locale: string

  @Field()
  @Property()
  emailVerified: string
}

export const UserModel = getModelForClass(User)
