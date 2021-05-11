import dotenv from 'dotenv'
dotenv.config()

export interface AppConfigHttp {
  NODE_ENV: string
  PORT: string
  DATABASE_URI: string
  AUTH0_CLIENT_ID: string
  AUTH0_DOMAIN: string
  AUTH0_CLIENT_SECRET: string
}

export type AppConfig = AppConfigHttp

export const getServiceConfig = (
  environment: NodeJS.ProcessEnv = process.env
): AppConfig => {
  const {
    NODE_ENV,
    PORT,
    DATABASE_URI,
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN,
    AUTH0_CLIENT_SECRET,
  } = environment

  if (!NODE_ENV) throw new Error('NODE_ENV is not provided.')

  if (!PORT) throw new Error('PORT is not provided.')

  if (!DATABASE_URI) throw new Error('DATABASE_URI is not provided.')

  if (!AUTH0_CLIENT_ID) throw new Error('AUTH0_CLIENT_ID is not provided.')

  if (!AUTH0_DOMAIN) throw new Error('AUTH0_DOMAIN is not provided.')

  if (!AUTH0_CLIENT_SECRET)
    throw new Error('AUTH0_CLIENT_SECRET is not provided.')

  return {
    NODE_ENV,
    PORT,
    DATABASE_URI,
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN,
    AUTH0_CLIENT_SECRET,
  } as AppConfigHttp
}
