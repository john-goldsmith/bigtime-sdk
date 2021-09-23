import { Response } from 'node-fetch'
import qs from 'qs'

import BaseApi from '../base'
import Http from '../../http'

class StaffApi extends BaseApi {

  /**
   * Provides access to the list of users in the BigTime system.
   *
   * @public
   * @method getStaffList
   * @memberOf Base
   * @param  {Object} queryParams
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Staff
   */
  public async list(queryParams: StaffListQueryParams = {showInactive: false}): Promise<Response> {
    try {
      const endpoint: string = '/staff'
      const queryParamMapping: StaffListQueryParamMapping = {
        showInactive: 'ShowInactive'
      }
      const staffListBigTimeQueryParams: StaffListBigTimeQueryParams = Object.keys(queryParamMapping).reduce((acc: StaffListBigTimeQueryParams, key: string) => {
        acc[queryParamMapping[key]] = queryParams[key]
        return acc
      }, <StaffListBigTimeQueryParams>{})
      const url: string = `${this.baseUrl}${endpoint}?${qs.stringify(staffListBigTimeQueryParams)}`
      const response: Response = await Http.get(url, this.authHeaders)
      return response
    } catch (err) {
      throw err
    }
  }

  /**
   * Pulls the details associated with a single staff entry.
   *
   * @public
   * @memberOf Base
   * @method getStaffDetail
   * @param  {Object} queryParams
   * @param  {Number} staffId
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Staff
   *
  public async getById(queryParams = {}, staffId = this.staffSid) {
    const { method, url } = Endpoint.getStaffDetail(staffId, queryParams)
    return Http[method](url, this.authHeaders)
  }*/

  /**
   * A convenience method to find a person by their name rather than by
   * their staff ID.
   *
   * @public
   * @method findStaffByName
   * @memberOf Base
   * @param {Object} options
   * @param  {Object} queryParams
   * @return {Promise<Response>}
   *
  findStaffByName(options = {}, queryParams = {}) {
    // TODO: What about...
    // const optionToQueryParam = {
    //   firstName: 'FName',
    //   lastName: 'SName',
    //   fullName: 'FullName',
    //   email: 'EMail',
    //   phoneCell: 'Phone_Cell',
    //   phoneWork: 'Phone_Wk',
    //   phoneHome: 'Phone_Hm',
    //   address: 'Address.Address',
    //   city: 'Address.City',
    //   state: 'Address.State',
    //   zip: 'Address.Zip',
    //   fullAddress: 'Address.FullAddress'
    // }
    if (!options.firstName && !options.lastName && !options.fullName) throw new Error('At least one of first name, last name, or full name are required.')
    return this.getStaffList(queryParams)
      .then(
        response => {
          // TODO: There's a better way...
          options.firstName = options.firstName || ''
          options.lastName = options.lastName || ''
          options.fullName = options.fullName || ''
          const results = response.body.filter(staff => (options.firstName.toLowerCase() === staff.FName.toLowerCase() || options.lastName.toLowerCase() === staff.SName.toLowerCase() || options.fullName.toLowerCase() === staff.FullName.toLowerCase()))
          response.body = results
          return response
        }
      )
  }*/

}

export default StaffApi
