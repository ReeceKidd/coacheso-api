import { Request, Response, NextFunction } from 'express'

import { getServiceConfig } from '../../getServiceConfig'

const { STRIPE_SECRET_KEY } = getServiceConfig()

import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' })

export const createStandardAccountMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    response.locals.account = await stripe.accounts.create({ type: 'standard' })
    next()
  } catch (err) {
    next(err)
  }
}
