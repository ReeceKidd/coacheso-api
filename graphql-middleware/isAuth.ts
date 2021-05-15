import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types/MyContext'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    if (!context.res.locals.user) {
      throw new Error('Not authorized')
    }
    return next()
  } catch (err) {
    throw new Error(err.message)
  }
}
