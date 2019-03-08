const Endpoint = require('./endpoint')
const HttpRequest = require('./http-request')
const dateRegExp = /^\d{4}-\d{2}-\d{2}$/

class Base {

  /**
   * [constructor description]
   *
   * @constructor
   * @param  {Object} options
   * @return {Base}
   */
  constructor(options = {}) {
    if (!options.username) throw new Error('Missing username configuration value.')
    if (!options.password) throw new Error('Missing password configuration value.')

    /**
     * [username description]
     * @type {String}
     */
    this.username = options.username

    /**
     * [password description]
     * @type {String}
     */
    this.password = options.password
  }

  /**
   * [authHeaders description]
   *
   * @public
   * @method authHeaders
   * @memberOf Base
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Session
   */
  get authHeaders() {
    if (!this.sessionToken) throw new Error('Session token not present.')
    if (!this.firm) throw new Error('Firm ID not present.')
    return {
      'X-Auth-Token': this.sessionToken,
      'X-Auth-Realm': this.firm
    }
  }

  /**
   * [createSession description]
   *
   * @public
   * @method createSession
   * @memberOf Base
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Session
   */
  createSession(queryParams = {}) {
    const { method, url } = Endpoint.createSession(queryParams)
    const body = {
      UserId: this.username,
      Pwd: this.password
    }
    return HttpRequest[method](url, body)
      .then(
        response => {
          this.sessionToken = response.body.token
          this.firm = response.body.firm
          this.staffSid = response.body.staffsid
          this.userId = response.body.userid
          /**
           * Once a session has been established, the username and
           * password are no longer needed.
           */
          delete this.username
          delete this.password
          return response
        },
        () => {
          throw new Error('Error creating session.')
        }
      )
  }

  /**
   * [getStaffList description]
   *
   * @public
   * @method getStaffList
   * @memberOf Base
   * @param  {Object} queryParams
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Staff
   */
  getStaffList(queryParams = {}) {
    const { method, url } = Endpoint.getStaffList(queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

  /**
   * [getStaffDetail description]
   *
   * @public
   * @memberOf Base
   * @method getStaffDetail
   * @param  {Object} queryParams
   * @param  {Number} staffId
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Staff
   */
  getStaffDetail(queryParams = {}, staffId = this.staffSid) {
    const { method, url } = Endpoint.getStaffDetail(staffId, queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

  /**
   * [dateRange description]
   *
   * @public
   * @method getTimeSheetDateRange
   * @memberOf Base
   * @param  {Object} queryParams
   * @param {Number} staffId
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Time
   */
  getTimeSheetDateRange(queryParams = {}, staffId = this.staffSid) {
    const { method, url } = Endpoint.getTimeSheetDateRange(staffId, queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

  /**
   * [dateRangeSummary description]
   *
   * @public
   * @method getDailyTotalDateRange
   * @memberOf Base
   * @param  {Object} queryParams
   * @param {Number} staffId
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Time
   */
  getDailyTotalDateRange(queryParams = {}, staffId = this.staffSid) {
    const { method, url } = Endpoint.getDailyTotalDateRange(staffId, queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

  /**
   * [detail description]
   *
   * @public
   * @method getTimeEntry
   * @memberOf Base
   * @param  {Number} id
   * @param  {Object} queryParams
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Time
   */
  getTimeEntry(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const { method, url } = Endpoint.getTimeEntry(id, queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

  /**
   * [create description]
   *
   * @public
   * @method createTimeEntry
   * @memberOf Base
   * @param  {Object} body
   * @param  {Object} queryParams
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Time
   */
  createTimeEntry(body = {}, queryParams = {}) {
    if (!body.Dt) throw new Error('Missing date (`Dt` body param).')
    if (!body.ProjectSID) throw new Error('Missing project system ID (`ProjectSID` body param).')
    if (!body.BudgCatID) throw new Error('Missing budget category ID (`BudgCatID` body param).')
    if (!body.Hours_IN) throw new Error('Missing hours (`Hours_IN` body param).')
    if (!body.Dt.match(dateRegExp)) throw new Error('Date must be in YYYY-MM-DD format.')
    const { method, url } = Endpoint.createTimeEntry(queryParams)
    const defaultBody = {
      Dt: body.Dt, // required
      ProjectSID: body.ProjectSID, // required
      // ProjectLinkValue: body.projectLinkValue, // required if projectSid is unknown
      // ProjectLinkType: body.projectLinkType, // required if projectSid is unknown
      StaffSID: this.staffSid, // required
      // StaffLinkValue: body.staffLinkValue, // required if staffSid is unknown
      // StaffLinkType: body.staffLinkType, // required if staffSid is unknown
      BudgCatID: body.BudgCatID,
      // BudgCatLinkValue: body.budgetCategoryLinkValue, // required if budgetCategoryId is unknown
      // BudgCatLinkType: body.budgetCategoryLinkType, // required if budgetCategoryId is unknown
      // TaskSID: body.taskSid,
      // TaskNm: body.taskNumber,
      // QBClass: body.quickBooksClass,
      // PayrollItem: body.payrollItem,
      Hours_IN: body.Hours_IN // required
      // Notes: body.notes,
      // AuditLogNote: body.auditLogNote,
      // NoCharge: body.noCharge,
      // HoursBillable: body.hoursBillable, // documentation claims this is required, but doesn't appear to be (or the API has a sensible default)
      // ChargeBillable: body.chargeBillable // documentation claims this is required, but doesn't appear to be (or the API has a sensible default)
    }
    body = Object.assign({}, body, defaultBody)
    return HttpRequest[method](url, body, this.authHeaders)
  }

  /**
   * [update description]
   *
   * @public
   * @method updateTimeEntry
   * @memberOf Base
   * @param {Number} id
   * @param {Object} body
   * @param  {Object} queryParams
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Time
   */
  updateTimeEntry(id, body = {}, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    if (!body.Dt) throw new Error('Missing date (`Dt` body param)')
    if (!body.Dt.match(dateRegExp)) throw new Error('Date must be in YYYY-MM-DD format.')
    const { method, url } = Endpoint.updateTimeEntry(id, queryParams)
    const defaultBody = {
      // SID: body.sid, // required
      // Dt: body.date, // required
      // ProjectSID: body.projectSid, // required
      // // ProjectLinkValue: body.projectLinkValue, // required if projectSid is unknown
      // // ProjectLinkType: body.projectLinkType, // required if projectSid is unknown
      // StaffSID: this.staffSid, // required
      // // StaffLinkValue: body.staffLinkValue, // required if staffSid is unknown
      // // StaffLinkType: body.staffLinkType, // required if staffSid is unknown
      // // BudgCatID: body.budgetCategoryId,
      // BudgCatLinkValue: body.budgetCategoryLinkValue, // required
      // BudgCatLinkType: body.budgetCategoryLinkType, // required
      // // TaskSID: body.taskSid,
      // // TaskNm: body.taskNumber,
      // // QBClass: body.quickBooksClass,
      // // PayrollItem: body.payrollItem,
      // Hours_IN: body.hours, // required
      // // Notes: body.notes,
      // // AuditLogNote: body.auditLogNote,
      // // NoCharge: body.noCharge,
      // HoursBillable: body.hoursBillable, // required
      // ChargeBillable: body.chargeBillable // required
    }
    const mergedBody = Object.assign({}, body, defaultBody)
    return HttpRequest[method](url, mergedBody, this.authHeaders)
  }

  /**
   * [destory description]
   *
   * @public
   * @method deleteTimeEntry
   * @memberOf Base
   * @param {Number} id
   * @param {Object} body
   * @param  {Object} queryParams
   * @return {Promise<Response>}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Time
   */
  deleteTimeEntry(id, body = {}, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const { method, url } = Endpoint.deleteTimeEntry(id, queryParams)
    return HttpRequest[method](url, body, this.authHeaders)
  }

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
   */
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
  }

  /**
   * [getReportById description]
   *
   * @param  {Number} id
   * @param {Object} queryParams
   * @return {Promise}
   */
  getReportById(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const { method, url } = Endpoint.getReportById(id, queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

  /**
   * [updateReportById description]
   *
   * @param  {Number} id
   * @param  {Object} body
   * @param  {Object} queryParams
   * @return {Promise}
   */
  updateReportById(id, body = {}, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    if (!body.DT_BEGIN) throw new Error('Missing start date (`DT_BEGIN body param`)')
    if (!body.DT_END) throw new Error('Missing end date (`DT_END body param`)')
    if (!body.DT_BEGIN.match(dateRegExp)) throw new Error('Start date must be in YYYY-MM-DD format.')
    if (!body.DT_END.match(dateRegExp)) throw new Error('End date must be in YYYY-MM-DD format.')
    const { method, url } = Endpoint.updateReportById(id, queryParams)
    return HttpRequest[method](url, body, this.authHeaders)
  }

  /**
   * [projectsPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Promise<Array>}
   */
  projectsPicklist(queryParams = {}) {
    const { method, url } = Endpoint.projectsPicklist(queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

  /**
   * [laborCodesPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Promise<Array>}
   */
  laborCodesPicklist(queryParams = {}) {
    const { method, url } = Endpoint.laborCodesPicklist(queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

  /**
   * [staffPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Promise<Array>}
   */
  staffPicklist(queryParams = {}) {
    const { method, url } = Endpoint.staffPicklist(queryParams)
    return HttpRequest[method](url, this.authHeaders)
  }

}

module.exports = Base
