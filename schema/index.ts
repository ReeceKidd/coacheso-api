import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { ObjectId } from 'mongodb'
import path from 'path'

import { ObjectIdScalar } from './object-id.scalar'
import { TypegooseMiddleware } from '../middleware/typegoose'
import { CoachResolver } from '../resolver/Coach'
import { UserResolver } from '../resolver/User'

export default async function createSchema(): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: [CoachResolver, UserResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  })
  return schema
}
