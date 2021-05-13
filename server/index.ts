import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'
import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

import createSchema from '../schema'
import createSession from '../session'

import { getServiceConfig } from '../getServiceConfig'
const { PORT } = getServiceConfig()

const port = PORT || 8000

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://coacheso.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'YfYKGExtgLg9OgazHjp2Z28ldGDMGW4J',
  issuer: 'https://coacheso.eu.auth0.com/',
  algorithms: ['RS256'],
})

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

    app.use(jwtCheck)

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
