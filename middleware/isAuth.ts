import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types/MyContext'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    if (!context.req.user) {
      throw new Error('Missing authorization')
    }
    return next()
  } catch (err) {
    throw new Error(err.message)
  }
}
