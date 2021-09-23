import BaseError from '../base'

class SessionPasswordMissingError extends BaseError implements IBigTimeSdkError {

  constructor(public message: string = 'Password missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SessionPasswordMissingError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

export default SessionPasswordMissingError
