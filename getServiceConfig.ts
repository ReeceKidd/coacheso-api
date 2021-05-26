import dotenv from 'dotenv'
dotenv.config()

export interface AppConfigHttp {
  NODE_ENV: string
  PORT: string
  DATABASE_URI: string
  COACHESO_APP_URL: string
  AUTH0_BASE_URL: string
  STRIPE_SECRET_KEY: string
}

export type AppConfig = AppConfigHttp

export const getServiceConfig = (
  environment: NodeJS.ProcessEnv = process.env
): AppConfig => {
  const {
    NODE_ENV,
    PORT,
    DATABASE_URI,
    COACHESO_APP_URL,
    AUTH0_BASE_URL,
    STRIPE_SECRET_KEY,
  } = environment

  if (!NODE_ENV) throw new Error('NODE_ENV is not provided.')

  if (!PORT) throw new Error('PORT is not provided.')

  if (!DATABASE_URI) throw new Error('DATABASE_URI is not provided.')

  if (!COACHESO_APP_URL) throw new Error('COACHESO_APP_URL is not provided.')

  if (!AUTH0_BASE_URL) throw new Error('AUTH0_BASE_URL is not provided.')

  if (!STRIPE_SECRET_KEY) throw new Error('STRIPE_SECRET_KEY is not provided.')

  return {
    NODE_ENV,
    PORT,
    DATABASE_URI,
    COACHESO_APP_URL,
    AUTH0_BASE_URL,
    STRIPE_SECRET_KEY,
  } as AppConfigHttp
}
