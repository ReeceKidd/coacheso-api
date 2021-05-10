import { connect } from 'mongoose'

import { getServiceConfig } from '../getServiceConfig'
const { DATABASE_URI } = getServiceConfig()

export default async function createSession(): Promise<void> {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
  await connect(DATABASE_URI, options)
}
