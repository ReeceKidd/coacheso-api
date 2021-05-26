import { Request, Response, NextFunction } from 'express'

import { getServiceConfig } from '../../getServiceConfig'

const { STRIPE_SECRET_KEY } = getServiceConfig()

import Stripe from 'stripe'

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' })

export const createAccountLinkMiddleware = async (
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const account = response.locals.account as Stripe.Account
    const accountLinks = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://localhost:3000/reauth',
      return_url: 'https://localhost:3000/return',
      type: 'account_onboarding',
    })
    response.send(accountLinks)
  } catch (err) {
    next(err)
  }
}
