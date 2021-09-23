import BaseError from '../base'

class SessionFirmIdMissingError extends BaseError implements IBigTimeSdkError {

  constructor(public message: string = 'Session token missing') {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, SessionFirmIdMissingError)
    }
    // this.date = new Date()
    // this.code = ...
    this.name = this.constructor.name
  }

}

export default SessionFirmIdMissingError
