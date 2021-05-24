import { UserModel } from '../entity/User'
import { Request, Response, NextFunction } from 'express'

import axios from 'axios'

import { getServiceConfig } from '../getServiceConfig'

const { AUTH0_BASE_URL } = getServiceConfig()

export const updateAuthenticatedUserMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = request.headers['authorization']
    const isAuthenticated = response.locals.isAuthenticated as boolean

    if (isAuthenticated && token) {
      const url = `${AUTH0_BASE_URL}/userInfo`

      const { data } = await axios.get(url, {
        headers: { Authorization: token },
      })

      console.log('User info', data)

      response.locals.user = await UserModel.findOneAndUpdate(
        {
          email: data.email,
        },
        {
          email: data.email,
          givenName: data.given_name,
          familyName: data.family_name,
          name: data.name,
          picture: data.picture,
          locale: data.locale,
          emailVerified: data.email_verified,
        }
      )

      if (!response.locals.user) {
        const databaseUser = await UserModel.create({
          email: data.email,
          givenName: data.given_name,
          familyName: data.family_name,
          name: data.name,
          picture: data.picture,
          locale: data.locale,
          emailVerified: data.email_verified,
        })
        response.locals.user = databaseUser
      }
    }
    return next()
  } catch (err) {
    next(err)
  }
}
