import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express, { Response, Request, NextFunction } from 'express'
import cors from 'cors'

import createSchema from '../schema'
import createSession from '../session'

import { getServiceConfig } from '../getServiceConfig'
import { getIsAuthenticatedMiddleware } from '../express-middleware/getIsAuthenticatedMiddleware'
import { updateAuthenticatedUserMiddleware } from '../express-middleware/updateAuthenticatedUserMiddleware'
import { createStandardAccountMiddleware } from '../express-middleware/stripe/createStandardAccountMiddleware'
import { createAccountLinkMiddleware } from '../express-middleware/stripe/createAccountLinkMiddleware'

const { PORT, COACHESO_APP_URL } = getServiceConfig()

const port = PORT || 8000

async function createServer() {
  await createSession()

  const app = express()

  const corsOptions = {
    origin: COACHESO_APP_URL,
    credentials: true,
  }
  app.use(cors(corsOptions))

  app.use(express.json())

  app.get('/health', (_request: Request, response: Response) => {
    response.send({
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    })
  })

  app.get(
    '/stripe',
    createStandardAccountMiddleware,
    createAccountLinkMiddleware
  )

  app.use(getIsAuthenticatedMiddleware)
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

  app.use(
    (
      err: { status: number; message: string },
      _request: Request,
      response: Response,
      _next: NextFunction
    ) => {
      response.status(err.status || 500).send(err.message)
    }
  )
}

createServer()
