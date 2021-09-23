class BaseError extends Error implements IBigTimeSdkError {

  constructor(message: string = 'Error') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

export default BaseError
