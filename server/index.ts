import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import cors from 'cors'

import createSchema from '../schema'
import createSession from '../session'

import session from 'express-session'
import passport from 'passport'

import { getServiceConfig } from '../getServiceConfig'
const { NODE_ENV, PORT, AUTH0_CLIENT_SECRET } = getServiceConfig()

const port = PORT || 8000

const sess = {
  secret: AUTH0_CLIENT_SECRET,
  cookie: {
    secure: false,
  },
  resave: false,
  saveUninitialized: true,
}

async function createServer() {
  try {
    if (NODE_ENV === 'production') {
      sess.cookie.secure = true
    }
    // 1. create mongoose connection
    await createSession()
    // 2. create express server
    const app = express()

    app.use(session(sess))

    app.use(passport.initialize())
    app.use(passport.session())

    // allow CORS from client app
    const corsOptions = {
      origin: 'http://localhost:3000',
      credentials: true,
    }
    app.use(cors(corsOptions))

    // allow JSON requests
    app.use(express.json())

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
