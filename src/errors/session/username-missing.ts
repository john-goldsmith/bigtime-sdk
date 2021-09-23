import BaseError from '../base'

class SessionUsernameMissingError extends BaseError implements IBigTimeSdkError {

  constructor(public message: string = 'Username missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SessionUsernameMissingError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

export default SessionUsernameMissingError
