import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types/MyContext'
import jwt from 'jsonwebtoken'

import { getServiceConfig } from '../getServiceConfig'
const { AUTH0_CLIENT_SECRET } = getServiceConfig()

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  console.log(context.req.headers)
  const authorization = context.req.headers['authorization']
  console.log('Authorization', authorization)
  if (!authorization) {
    throw new Error('Missing authorization')
  }
  try {
    const token = authorization?.replace('Bearer ', '')
    console.log('Token', token)
    const user = jwt.verify(token, AUTH0_CLIENT_SECRET) as any
    context.res.locals.userId = user.id
    return next()
  } catch (err) {
    throw new Error(err.message)
  }
}
