import { getServiceConfig } from './getServiceConfig'

describe('getServiceConfig', () => {
  const environmentMock = {
    NODE_ENV: 'NODE_ENV',
    PORT: 'PORT',
    DATABASE_URI: 'DATABASE_URI',
    AUTH0_CLIENT_ID: 'AUTH0_CLIENT_ID',
    AUTH0_DOMAIN: 'AUTH0_DOMAIN',
    AUTH0_CLIENT_SECRET: 'AUTH0_CLIENT_SECRET',
  }

  test('that correct error is thrown when NODE_ENV is not provided', () => {
    expect.assertions(1)
    const environment = {
      ...environmentMock,
      NODE_ENV: undefined,
    }

    try {
      getServiceConfig(environment)
    } catch (err) {
      expect(err.message).toEqual('NODE_ENV is not provided.')
    }
  })

  test('that NODE_ENV is returned', () => {
    expect.assertions(1)

    const environment = getServiceConfig()
    expect(environment.NODE_ENV).toBeDefined()
  })

  test('that correct error is thrown when PORT is not provided', () => {
    expect.assertions(1)
    const environment = {
      ...environmentMock,
      PORT: undefined,
    }

    try {
      getServiceConfig(environment)
    } catch (err) {
      expect(err.message).toEqual('PORT is not provided.')
    }
  })

  test('that PORT is returned', () => {
    expect.assertions(1)

    const environment = getServiceConfig()
    expect(environment.PORT).toBeDefined()
  })

  test('that correct error is thrown when DATABASE_URI is not provided', () => {
    expect.assertions(1)
    const environment = {
      ...environmentMock,
      DATABASE_URI: undefined,
    }

    try {
      getServiceConfig(environment)
    } catch (err) {
      expect(err.message).toEqual('DATABASE_URI is not provided.')
    }
  })

  test('that DATABASE_URI is returned', () => {
    expect.assertions(1)

    const environment = getServiceConfig()
    expect(environment.DATABASE_URI).toBeDefined()
  })

  test('that correct error is thrown when AUTH0_CLIENT_ID is not provided', () => {
    expect.assertions(1)
    const environment = {
      ...environmentMock,
      AUTH0_CLIENT_ID: undefined,
    }

    try {
      getServiceConfig(environment)
    } catch (err) {
      expect(err.message).toEqual('AUTH0_CLIENT_ID is not provided.')
    }
  })

  test('that AUTH0_CLIENT_ID is returned', () => {
    expect.assertions(1)

    const environment = getServiceConfig()
    expect(environment.AUTH0_CLIENT_ID).toBeDefined()
  })

  test('that correct error is thrown when AUTH0_DOMAIN is not provided', () => {
    expect.assertions(1)
    const environment = {
      ...environmentMock,
      AUTH0_DOMAIN: undefined,
    }

    try {
      getServiceConfig(environment)
    } catch (err) {
      expect(err.message).toEqual('AUTH0_DOMAIN is not provided.')
    }
  })

  test('that AUTH0_DOMAIN is returned', () => {
    expect.assertions(1)

    const environment = getServiceConfig()
    expect(environment.AUTH0_DOMAIN).toBeDefined()
  })

  test('that correct error is thrown when AUTH0_CLIENT_SECRET is not provided', () => {
    expect.assertions(1)
    const environment = {
      ...environmentMock,
      AUTH0_CLIENT_SECRET: undefined,
    }

    try {
      getServiceConfig(environment)
    } catch (err) {
      expect(err.message).toEqual('AUTH0_CLIENT_SECRET is not provided.')
    }
  })

  test('that AUTH0_CLIENT_SECRET is returned', () => {
    expect.assertions(1)

    const environment = getServiceConfig()
    expect(environment.AUTH0_CLIENT_SECRET).toBeDefined()
  })
})
