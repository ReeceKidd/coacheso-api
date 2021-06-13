import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { ObjectId } from 'mongodb'
import path from 'path'

import { ObjectIdScalar } from './object-id.scalar'
import { TypegooseMiddleware } from '../graphql-middleware/typegoose'
import { CoachResolver } from '../resolver/Coach'
import { UserResolver } from '../resolver/User'
import { SkillResolver } from '../resolver/Skill'
import { RequestResolver } from '../resolver/Request'

export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [CoachResolver, UserResolver, SkillResolver, RequestResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  })
  return schema
}
