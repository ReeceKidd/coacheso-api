import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'

import createSchema from '../schema'
import createSession from '../session'

import { getServiceConfig } from '../getServiceConfig'
import { getAuth0UserMiddleware } from '../express-middleware/getAuth0UserMiddleware'
import { updateAuthenticatedUserMiddleware } from '../express-middleware/updateAuthenticatedUserMiddleware'
const { PORT } = getServiceConfig()

const port = PORT || 8000

async function createServer() {
  try {
    await createSession()

    const app = express()

    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
    }
    app.use(cors(corsOptions))

    app.use(express.json())

    app.use(getAuth0UserMiddleware)
    app.use(updateAuthenticatedUserMiddleware)

    const schema = await createSchema()

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
