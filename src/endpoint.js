const pathToRegExp = require('path-to-regexp')
const qs = require('qs')
const apiBase = 'https://iq.bigtime.net/BigtimeData/api/v2'
const dateRegExp = /^\d{4}-\d{2}-\d{2}$/

/**
 * [populateUrlParams description]
 *
 * @private
 * @param  {String} url
 * @param  {Object} params
 * @return {String}
 */
function populateUrlParams(url = '', params = {}) {
  return pathToRegExp.compile(url)(params)
}

/**
 * [getCurrentDate description]
 *
 * @private
 * @return {String} Returns a properly formatted date (YYYY-MM-DD).
 */
function getCurrentDate() {
  const date = new Date()
  const year = date.getFullYear()
  const month = `0${(date.getMonth() + 1)}`.slice(-2)
  const day = `0${(date.getDate())}`.slice(-2)
  return `${year}-${month}-${day}`
}

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
  static getStaffDetail(queryParams, staffId) {
    const method = 'get'
    const endpoint = '/staff/detail/:staffId'
    const defaultQueryParams = {View: 'Detailed'}
    const urlParams = populateUrlParams(endpoint, {staffId})
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
  static getTimeSheetDateRange(queryParams = {}, staffId) {
    if (!queryParams.StartDt) throw new Error('No start date provided (query param `StartDt`).')
    if (!queryParams.StartDt.match(dateRegExp)) throw new Error('Start date must be in YYYY-MM-DD format.')
    const method = 'get'
    const endpoint = '/time/Sheet/:staffId'
    const defaultQueryParams = {
      EndDt: getCurrentDate(),
      View: 'Detailed'
    }
    const urlParams = populateUrlParams(endpoint, {staffId})
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
    if (!queryParams.StartDt) throw new Error('No start date provided (query param `StartDt`).')
    if (!queryParams.StartDt.match(dateRegExp)) throw new Error('Start date must be in YYYY-MM-DD format.')
    const method = 'get'
    const endpoint = '/time/TotalByDay/:staffId'
    const defaultQueryParams = {
      EndDt: getCurrentDate(),
      View: 'Detailed'
    }
    const urlParams = populateUrlParams(endpoint, {staffId})
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
    const method = 'get'
    const endpoint = '/time/:id'
    const urlParams = populateUrlParams(endpoint, {id})
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
    const method = 'post'
    const endpoint = '/time/:id'
    const urlParams = populateUrlParams(endpoint, {id})
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
    const method = 'delete'
    const endpoint = '/time/:id'
    const urlParams = populateUrlParams(endpoint, {id})
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
    const method = 'get'
    const endpoint = '/report/data/:id'
    const urlParams = populateUrlParams(endpoint, {id})
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
    const method = 'post'
    const endpoint = '/report/data/:id'
    const urlParams = populateUrlParams(endpoint, {id})
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

}

module.exports = Endpoint
