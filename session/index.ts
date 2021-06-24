import { connect } from 'mongoose'

import { getServiceConfig } from '../getServiceConfig'
const { DATABASE_URI } = getServiceConfig()

export default async function createSession(): Promise<void> {
  const options = {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: true,
  }
  await connect(DATABASE_URI, options)
}
