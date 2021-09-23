import BaseError from '../base'

class SessionTokenMissingError extends BaseError implements IBigTimeSdkError {

  constructor(public message: string = 'Session token missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SessionTokenMissingError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

export default SessionTokenMissingError
