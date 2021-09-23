import { Response } from 'node-fetch'

import BaseApi from '../base'
import Http from '../../http'
import * as errors from '../../errors'

class SessionsApi extends BaseApi {

  constructor(/*options: SessionsApiOptions*/) {
    super()
  }

  /**
   * [createSession description]
   *
   * @public
   * @method createSession
   * @memberOf Base
   * @param {String} username
   * @param {String} password
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Session
   */
  public async create(username: string, password: string): Promise<Response> {
    if (!username) throw new errors.session.UsernameMissingError()
    if (!password) throw new errors.session.PasswordMissingError()
    try {
      const requestBody: CreateSessionRequestBody = {
        UserId: username,
        Pwd: password
      }
      const url: string = `${this.baseUrl}/session`
      const response: Response = await Http.post(url, requestBody)
      const responseBodyAsJson: CreateSessionResponseBody = await response.json()
      super.setSessionToken(responseBodyAsJson.token)
      // this.sessionToken = responseBodyAsJson.token
      super.setFirm(responseBodyAsJson.firm)
      // this.firm = responseBodyAsJson.firm
      super.setStaffSid(responseBodyAsJson.staffsid)
      // this.staffSid = responseBodyAsJson.staffsid
      super.setUserId(responseBodyAsJson.userid)
      // this.userId = responseBodyAsJson.userid
      return response
    } catch (err) {
      throw err
    }
  }

}

export default SessionsApi
