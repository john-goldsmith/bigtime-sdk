const qs = require('qs')
const apiBase = 'https://iq.bigtime.net/BigtimeData/api/v2'
const dateRegExp = /^\d{4}-\d{2}-\d{2}$/
const util = require('./util')

/**
 * @class
 */
class Endpoint {

  /**
   * [session description]
   *
   * @static
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Session
   */
  static createSession(queryParams = {}) {
    const method = 'post'
    const endpoint = '/session'
    const url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [staff description]
   *
   * @static
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Staff
   */
  static getStaffList(queryParams = {}) {
    const method = 'get'
    const endpoint = '/staff'
    const defaultQueryParams = { ShowInactive: false }
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url = `${apiBase}${endpoint}?${qs.stringify(mergedQueryParams)}`
    return { method, url }
  }

  /**
   * [getStaffDetail description]
   *
   * @static
   * @param  {Object} queryParams
   * @param  {Number} staffId
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Staff
   */
  static getStaffDetail(staffId, queryParams = {}) {
    if (!staffId) throw new Error('No staff ID provided')
    const method = 'get'
    const endpoint = '/staff/detail/:staffId'
    const defaultQueryParams = {View: 'Detailed'}
    const urlParams = util.populateUrlParams(endpoint, {staffId})
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url = `${apiBase}${urlParams}?${qs.stringify(mergedQueryParams)}`
    return { method, url }
  }

  /**
   * [staffTimeSheet description]
   *
   * @static
   * @param  {Object} queryParams
   * @param  {Number} staffId
   * @return {Object}
   */
  static getTimeSheetDateRange(staffId, queryParams = {}) {
    if (!staffId) throw new Error('No staff ID provided')
    if (!queryParams.StartDt) throw new Error('No start date provided (query param `StartDt`).')
    if (!queryParams.StartDt.match(dateRegExp)) throw new Error('Start date must be in YYYY-MM-DD format.')
    const method = 'get'
    const endpoint = '/time/Sheet/:staffId'
    const defaultQueryParams = {
      EndDt: util.getCurrentDate(),
      View: 'Detailed'
    }
    const urlParams = util.populateUrlParams(endpoint, {staffId})
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url = `${apiBase}${urlParams}?${qs.stringify(mergedQueryParams)}`
    return { method, url }
  }

  /**
   * [getDailyTotalDateRange description]
   *
   * @static
   * @param {Number} staffId
   * @param {Object} queryParams
   * @return {Object} [description]
   */
  static getDailyTotalDateRange(staffId, queryParams = {}) {
    if (!staffId) throw new Error('No staff ID provided')
    if (!queryParams.StartDt) throw new Error('No start date provided (query param `StartDt`).')
    if (!queryParams.StartDt.match(dateRegExp)) throw new Error('Start date must be in YYYY-MM-DD format.')
    const method = 'get'
    const endpoint = '/time/TotalByDay/:staffId'
    const defaultQueryParams = {
      EndDt: util.getCurrentDate(),
      View: 'Detailed'
    }
    const urlParams = util.populateUrlParams(endpoint, {staffId})
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url = `${apiBase}${urlParams}?${qs.stringify(mergedQueryParams)}`
    return { method, url }
  }

  /**
   * [getTimeEntry description]
   *
   * @static
   * @param  {Number} id
   * @param  {Object} queryParams
   * @return {Object}
   */
  static getTimeEntry(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const method = 'get'
    const endpoint = '/time/:id'
    const urlParams = util.populateUrlParams(endpoint, {id})
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [createTimeEntry description]
   *
   * @static
   * @param {Object} queryParams
   * @return {Object} [description]
   */
  static createTimeEntry(queryParams = {}) {
    const method = 'post'
    const endpoint = '/time'
    const defaultQueryParams = {
      MarkSubmitted: false
    }
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url = `${apiBase}${endpoint}?${qs.stringify(mergedQueryParams)}`
    return { method, url }
  }

  /**
   * [updateTimeEntry description]
   *
   * @static
   * @param {Number} id
   * @param {Object} queryParams
   * @return {Object}
   */
  static updateTimeEntry(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const method = 'post'
    const endpoint = '/time/:id'
    const urlParams = util.populateUrlParams(endpoint, {id})
    const defaultQueryParams = {
      MarkSubmitted: false
    }
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url = `${apiBase}${urlParams}?${qs.stringify(mergedQueryParams)}`
    return { method, url }
  }

  /**
   * [deleteTimeEntry description]
   *
   * @static
   * @param {Number} id
   * @param {Object} queryParams
   * @return {Object}
   */
  static deleteTimeEntry(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const method = 'delete'
    const endpoint = '/time/:id'
    const urlParams = util.populateUrlParams(endpoint, {id})
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [getReportById description]
   *
   * @static
   * @param  {Number} id
   * @param {Object} queryParams
   * @return {Object}
   */
  static getReportById(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const method = 'get'
    const endpoint = '/report/data/:id'
    const urlParams = util.populateUrlParams(endpoint, {id})
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [updateAndGetReportById description]
   *
   * @static
   * @param  {Number} id
   * @param  {Object} queryParams
   * @return {Object}
   */
  static updateReportById(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const method = 'post'
    const endpoint = '/report/data/:id'
    const urlParams = util.populateUrlParams(endpoint, {id})
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [projectsPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   */
  static projectsPicklist(queryParams = {}) {
    const method = 'get'
    const endpoint = '/picklist/projects'
    const url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [staffPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   */
  static staffPicklist(queryParams = {}) {
    const method = 'get'
    const endpoint = '/picklist/staff'
    const url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [laborCodesPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigTimeData/api/v2/help/Picklist
   */
  static laborCodesPicklist(queryParams = {}) {
    const method = 'get'
    const endpoint = '/picklist/LaborCodes'
    const url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [clientsPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigTimeData/api/v2/help/Picklist
   */
  static clientsPicklist(queryParams = {}) {
    const method = 'get'
    const endpoint = '/picklist/clients'
    const url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [getProjectList description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigTimeData/api/v2/help/Project
   */
  static getProjectList(queryParams = {}) {
    const method = 'get'
    const endpoint = '/project'
    const url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

}

module.exports = Endpoint
