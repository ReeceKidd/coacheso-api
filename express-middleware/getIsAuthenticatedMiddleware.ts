import { Request, Response, NextFunction } from 'express'
import jwt, { JwtHeader } from 'jsonwebtoken'
import jwks from 'jwks-rsa'

const client = jwks({
  cache: true,
  jwksUri: 'https://coacheso.eu.auth0.com/.well-known/jwks.json',
})

function getKey(
  header: JwtHeader,
  callback: (err: Error | null, key: string) => void
) {
  client.getSigningKey(header.kid, function (_error, key) {
    return callback(null, key.getPublicKey())
  })
}

export type Auth0User = {
  email: string
  given_name: string
  family_name: string
  nickname: string
  name: string
  picture: string
  locale: string
  email_verified: string
}

export const getIsAuthenticatedMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = request.headers['authorization']

    if (token) {
      const bearerToken = token.split(' ')

      const validateAccessToken = await new Promise((resolve, reject) => {
        jwt.verify(
          bearerToken[1],
          getKey,
          {
            issuer: `https://coacheso.eu.auth0.com/`,
            algorithms: ['RS256'],
          },
          (error, user) => {
            if (error) {
              reject({ error })
            }
            if (user) {
              resolve(user as Auth0User)
            }
          }
        )
      })

      response.locals.isAuthenticated = Boolean(validateAccessToken)
    }
    return next()
  } catch (err) {
    next(err.error)
  }
}
