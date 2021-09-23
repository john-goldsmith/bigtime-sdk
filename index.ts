// import Api from './src/api'

// export default Api.BaseApi

// import BigTimeSdk from './src/api/bigtime-sdk'

// (async () => {
//   const b = new BigTimeSdk()
//   const res1 = await b.sessionsApi.create('john.goldsmith@verys.com', 'Verys123')
// })()

// export default BigTimeSdk

class BaseApi {
  private static instance: BaseApi
  public token: string
  private constructor() {
    console.log('BaseApi#constructor')
    this.token = 'foo'
  }
  static getInstance() {
    if (!BaseApi.instance) {
      BaseApi.instance = new BaseApi()
    }
    return BaseApi.instance
  }
  getToken() {
    return this.token
  }
  setToken(token: string) {
    this.token = token
    console.log(this.token)
  }
}

class SessionsApi {
  // constructor() {
  //   super()
  // }
  create(token: string) {
    BaseApi.getInstance().setToken(token)
  }
}

class TimeEntriesApi {
  // constructor() {
  //   super()
  // }
  create() {
    const token = BaseApi.getInstance().getToken()
    console.log('token:', token)
  }
}

class Sdk {
  public sessionsApi: SessionsApi = new SessionsApi()
  public timeEntriesApi: TimeEntriesApi = new TimeEntriesApi()
  constructor() {
    // this.sessionsApi = new SessionsApi()
    // this.timeEntriesApi = new TimeEntriesApi()
  }
}

const sdk = new Sdk()
sdk.sessionsApi.create('1')
sdk.timeEntriesApi.create()

const sdk2 = new Sdk()
sdk2.sessionsApi.create('2')
sdk2.timeEntriesApi.create()

sdk.timeEntriesApi.create()
