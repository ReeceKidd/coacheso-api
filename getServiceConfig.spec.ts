import { getServiceConfig } from './getServiceConfig'

describe('getServiceConfig', () => {
  const environmentMock = {
    NODE_ENV: 'NODE_ENV',
    PORT: 'PORT',
    DATABASE_URI: 'DATABASE_URI',
    COACHESO_APP_URL: 'COACHESO_APP__URL',
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

  test('that correct error is thrown when COACHESO_APP_URL is not provided', () => {
    expect.assertions(1)
    const environment = {
      ...environmentMock,
      COACHESO_APP_URL: undefined,
    }

    try {
      getServiceConfig(environment)
    } catch (err) {
      expect(err.message).toEqual('COACHESO_APP_URL is not provided.')
    }
  })

  test('that COACHESO_APP_URL is returned', () => {
    expect.assertions(1)

    const environment = getServiceConfig()
    expect(environment.COACHESO_APP_URL).toBeDefined()
  })
})
