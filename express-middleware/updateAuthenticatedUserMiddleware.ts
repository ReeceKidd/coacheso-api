import { UserModel } from '../entity/User'
import { Request, Response, NextFunction } from 'express'
import { Auth0User } from './getAuth0UserMiddleware'

export const updateAuthenticatedUserMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const auth0User = response.locals.auth0User as Auth0User

    if (auth0User) {
      response.locals.user = await UserModel.findOneAndUpdate(
        {
          email: auth0User.email,
        },
        {
          givenName: auth0User.given_name,
          familyName: auth0User.family_name,
          name: auth0User.name,
          picture: auth0User.picture,
          locale: auth0User.locale,
          emailVerified: auth0User.email_verified,
        }
      )

      if (!response.locals.user) {
        const databaseUser = await UserModel.create({
          email: auth0User.email,
          givenName: auth0User.given_name,
          familyName: auth0User.family_name,
          name: auth0User.name,
          picture: auth0User.picture,
          locale: auth0User.locale,
          emailVerified: auth0User.email_verified,
        })
        response.locals.user = databaseUser
      }
    }
    return next()
  } catch (err) {
    next(err)
  }
}
