import { UserMode, UserModel } from '../entity/User'
import { Request, Response, NextFunction } from 'express'

import axios from 'axios'

import { getServiceConfig } from '../getServiceConfig'
import { StudentModel } from '../entity/Student'
import { CoachModel } from '../entity/Coach'

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
        response.locals.user = await UserModel.create({
          email: data.email,
          username: Math.random().toString(36).substring(7),
          givenName: data.given_name,
          familyName: data.family_name,
          name: data.name,
          picture: data.picture,
          locale: data.locale,
          emailVerified: data.email_verified,
          mode: UserMode.student,
        })
        const student = await StudentModel.create({
          userId: response.locals.user._id,
          username: response.locals.user.username,
          name: response.locals.user.name,
          picture: response.locals.user.picture,
        })
        const coach = await CoachModel.create({
          userId: response.locals.user._id,
          username: response.locals.user.username,
          name: response.locals.user.name,
          picture: response.locals.user.picture,
        })

        response.locals.user = await UserModel.findByIdAndUpdate(
          response.locals.user._id,
          { coachId: coach._id, studentId: student._id },
          { new: true }
        )
      }
    }

    return next()
  } catch (err) {
    next(err)
  }
}
