import qs from 'qs'

import { populateUrlParams, getCurrentDate } from './util'
import { HttpMethods } from './http'

const API_BASE: string = 'https://iq.bigtime.net/BigtimeData/api/v2'
export const DATE_REG_EXP: RegExp = /^\d{4}-\d{2}-\d{2}$/

/**
 * @class
 */
class Endpoint implements IBigTimeEndpoint {

  /**
   * [session description]
   *
   * @static
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Session
   */
  static createSession(): EndpointMeta {
    const method: string = HttpMethods.POST
    const endpoint: string = '/session'
    const url: string = `${API_BASE}${endpoint}`
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
  static getStaffList(queryParams: GetStaffListQueryParams = {}): EndpointMeta {
    const method: string = HttpMethods.GET
    const endpoint: string = '/staff'
    const defaultQueryParams = { ShowInactive: false }
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url: string = `${API_BASE}${endpoint}?${qs.stringify(mergedQueryParams)}`
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
  static getStaffDetail(staffId: string | number, queryParams = {}): EndpointMeta {
    if (!staffId) throw new Error('No staff ID provided')
    const method: string = HttpMethods.GET
    const endpoint: string = '/staff/detail/:staffId'
    const defaultQueryParams = {View: 'Detailed'}
    const urlParams: string = populateUrlParams(endpoint, {staffId})
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url: string = `${API_BASE}${urlParams}?${qs.stringify(mergedQueryParams)}`
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
  static getTimeSheetDateRange(staffId, queryParams = {}): EndpointMeta {
    if (!staffId) throw new Error('No staff ID provided')
    if (!queryParams.StartDt) throw new Error('No start date provided (query param `StartDt`).')
    if (!queryParams.StartDt.match(DATE_REG_EXP)) throw new Error('Start date must be in YYYY-MM-DD format.')
    const method: string = HttpMethods.GET
    const endpoint: string = '/time/Sheet/:staffId'
    const defaultQueryParams = {
      EndDt: getCurrentDate(),
      View: 'Detailed'
    }
    const urlParams: string = populateUrlParams(endpoint, {staffId})
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url: string = `${API_BASE}${urlParams}?${qs.stringify(mergedQueryParams)}`
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
  static getDailyTotalDateRange(staffId, queryParams = {}): EndpointMeta {
    if (!staffId) throw new Error('No staff ID provided')
    if (!queryParams.StartDt) throw new Error('No start date provided (query param `StartDt`).')
    if (!queryParams.StartDt.match(DATE_REG_EXP)) throw new Error('Start date must be in YYYY-MM-DD format.')
    const method: string = HttpMethods.GET
    const endpoint: string = '/time/TotalByDay/:staffId'
    const defaultQueryParams = {
      EndDt: getCurrentDate(),
      View: 'Detailed'
    }
    const urlParams: string = populateUrlParams(endpoint, {staffId})
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url: string = `${API_BASE}${urlParams}?${qs.stringify(mergedQueryParams)}`
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
  static getTimeEntry(id, queryParams = {}): EndpointMeta {
    if (!id) throw new Error('Missing id.')
    const method: string = HttpMethods.GET
    const endpoint: string = '/time/:id'
    const urlParams: string = populateUrlParams(endpoint, {id})
    const url: string = `${API_BASE}${urlParams}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [createTimeEntry description]
   *
   * @static
   * @param {Object} queryParams
   * @return {Object} [description]
   */
  static createTimeEntry(queryParams = {}): EndpointMeta {
    const method: string = HttpMethods.POST
    const endpoint: string = '/time'
    const defaultQueryParams = {
      MarkSubmitted: false
    }
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url: string = `${API_BASE}${endpoint}?${qs.stringify(mergedQueryParams)}`
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
  static updateTimeEntry(id, queryParams = {}): EndpointMeta {
    if (!id) throw new Error('Missing id.')
    const method: string = HttpMethods.POST
    const endpoint: string = '/time/:id'
    const urlParams: string = populateUrlParams(endpoint, {id})
    const defaultQueryParams = {
      MarkSubmitted: false
    }
    const mergedQueryParams = Object.assign({}, queryParams, defaultQueryParams)
    const url: string = `${API_BASE}${urlParams}?${qs.stringify(mergedQueryParams)}`
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
  static deleteTimeEntry(id, queryParams = {}): EndpointMeta {
    if (!id) throw new Error('Missing id.')
    const method: string = HttpMethods.DELETE
    const endpoint: string = '/time/:id'
    const urlParams: string = populateUrlParams(endpoint, {id})
    const url: string = `${API_BASE}${urlParams}?${qs.stringify(queryParams)}`
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
  static getReportById(id, queryParams = {}): EndpointMeta {
    if (!id) throw new Error('Missing id.')
    const method: string = HttpMethods.GET
    const endpoint: string = '/report/data/:id'
    const urlParams: string = populateUrlParams(endpoint, {id})
    const url: string = `${API_BASE}${urlParams}?${qs.stringify(queryParams)}`
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
  static updateReportById(id, queryParams = {}): EndpointMeta {
    if (!id) throw new Error('Missing id.')
    const method: string = HttpMethods.POST
    const endpoint: string = '/report/data/:id'
    const urlParams: string = populateUrlParams(endpoint, {id})
    const url: string = `${API_BASE}${urlParams}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [projectsPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   */
  static projectsPicklist(queryParams = {}): EndpointMeta {
    const method: string = HttpMethods.GET
    const endpoint: string = '/picklist/projects'
    const url: string = `${API_BASE}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [staffPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   */
  static staffPicklist(queryParams = {}): EndpointMeta {
    const method: string = HttpMethods.GET
    const endpoint: string = '/picklist/staff'
    const url: string = `${API_BASE}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [laborCodesPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigTimeData/api/v2/help/Picklist
   */
  static laborCodesPicklist(queryParams = {}): EndpointMeta {
    const method: string = HttpMethods.GET
    const endpoint: string = '/picklist/LaborCodes'
    const url: string = `${API_BASE}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [clientsPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigTimeData/api/v2/help/Picklist
   */
  static clientsPicklist(queryParams = {}): EndpointMeta {
    const method: string = HttpMethods.GET
    const endpoint: string = '/picklist/clients'
    const url: string = `${API_BASE}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

  /**
   * [getProjectList description]
   *
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigTimeData/api/v2/help/Project
   */
  static getProjectList(queryParams = {}): EndpointMeta {
    const method: string = HttpMethods.GET
    const endpoint: string = '/project'
    const url: string = `${API_BASE}${endpoint}?${qs.stringify(queryParams)}`
    return { method, url }
  }

}

export default Endpoint
