import BaseApi from '../base'


class TimeEntriesApi extends BaseApi {

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
   *
  public async getTimeSheetDateRange(queryParams = {}, staffId = this.staffSid) {
    const { method, url } = Endpoint.getTimeSheetDateRange(staffId, queryParams)
    return Http[method](url, this.authHeaders)
  }*/

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
   *
  public async getDailyTotalDateRange(queryParams = {}, staffId = this.staffSid) {
    const { method, url } = Endpoint.getDailyTotalDateRange(staffId, queryParams)
    return Http[method](url, this.authHeaders)
  }*/

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
   *
  public async getTimeEntry(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const { method, url } = Endpoint.getTimeEntry(id, queryParams)
    return Http[method](url, this.authHeaders)
  }*/

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
   *
  public async createTimeEntry(body = {}, queryParams = {}) {
    if (!body.Dt) throw new Error('Missing date (`Dt` body param).')
    if (!body.ProjectSID) throw new Error('Missing project system ID (`ProjectSID` body param).')
    if (!body.BudgCatID) throw new Error('Missing budget category ID (`BudgCatID` body param).')
    if (!body.Hours_IN) throw new Error('Missing hours (`Hours_IN` body param).')
    if (!body.Dt.match(DATE_REG_EXP)) throw new Error('Date must be in YYYY-MM-DD format.')
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
      Hours_IN: body.Hours_IN, // required
      Notes: body.Notes || ''
      // AuditLogNote: body.auditLogNote,
      // NoCharge: body.noCharge,
      // HoursBillable: body.hoursBillable, // documentation claims this is required, but doesn't appear to be (or the API has a sensible default)
      // ChargeBillable: body.chargeBillable // documentation claims this is required, but doesn't appear to be (or the API has a sensible default)
    }
    body = Object.assign({}, body, defaultBody)
    return Http[method](url, body, this.authHeaders)
  }*/

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
   *
  public async updateTimeEntry(id, body = {}, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    if (!body.Dt) throw new Error('Missing date (`Dt` body param)')
    if (!body.Dt.match(DATE_REG_EXP)) throw new Error('Date must be in YYYY-MM-DD format.')
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
    return Http[method](url, mergedBody, this.authHeaders)
  }*/

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
   *
  public async deleteTimeEntry(id, body = {}, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const { method, url } = Endpoint.deleteTimeEntry(id, queryParams)
    return Http[method](url, body, this.authHeaders)
  }*/

}

export default TimeEntriesApi
