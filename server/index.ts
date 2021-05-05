import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'

import createSchema from '../schema'
import createSession from '../session'

import { getServiceConfig } from '../getServiceConfig'
const { PORT } = getServiceConfig()

const port = PORT || 8000

async function createServer() {
  try {
    // 1. create mongoose connection
    await createSession()
    // 2. create express server
    const app = express()

    // allow CORS from client app
    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
    }
    app.use(cors(corsOptions))

    // allow JSON requests
    app.use(express.json())

    const schema = await createSchema()

    // 3. create GraphQL server
    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
    })

    apolloServer.applyMiddleware({ app, cors: corsOptions })

    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
      )
    })
  } catch (err) {
    console.log(err)
  }
}

createServer()
