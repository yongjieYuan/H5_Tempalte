let BASE_URL = 'http://139.159.184.131'
const DEV_URL = '/api'
const PRODUCTION_URL = 'http://139.159.184.131'
const TEST_URL = 'http://139.159.184.131'
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = DEV_URL
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = PRODUCTION_URL
} else {
  BASE_URL = TEST_URL
}

export { BASE_URL, TIME_OUT }
