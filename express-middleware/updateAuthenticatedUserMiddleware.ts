import { UserMode, UserModel } from '../entity/User'
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

      response.locals.user = await UserModel.findOne({
        email: data.email,
      })

      if (!response.locals.user) {
        const databaseUser = await UserModel.create(
          {
            username: Math.random().toString(36).substring(7),
            email: data.email,
            givenName: data.given_name,
            familyName: data.family_name,
            name: data.name,
            picture: data.picture,
            locale: data.locale,
            emailVerified: data.email_verified,
            mode: UserMode.student,
          },
          {}
        )

        response.locals.user = databaseUser
      }
    }

    return next()
  } catch (err) {
    next(err)
  }
}
