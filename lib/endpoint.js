const pathToRegExp = require('path-to-regexp'),
      qs = require('qs'),
      apiBase = 'https://iq.bigtime.net/BigtimeData/api/v2',
      dateRegExp = /^\d{4}-\d{2}-\d{2}$/;

/**
 * [populateUrlParams description]
 *
 * @private
 * @param  {String} url
 * @param  {Object} params
 * @return {String}
 */
function populateUrlParams (url = '', params = {}) {
  return pathToRegExp.compile(url)(params);
}

/**
 * [getCurrentDate description]
 *
 * @private
 * @return {String} Returns a properly formatted date (YYYY-MM-DD).
 */
function getCurrentDate () {
  const date = new Date(),
        year = date.getFullYear(),
        month = `0${(date.getMonth() + 1)}`.slice(-2),
        day = `0${(date.getDate())}`.slice(-2);
  return `${year}-${month}-${day}`;
}

/**
 *
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
  static createSession (queryParams = {}) {
    const method = 'post',
          endpoint = '/session',
          url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

  /**
   * [staff description]
   *
   * @static
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Staff
   */
  static getStaffList (queryParams = {}) {
    const method = 'get',
          endpoint = '/staff',
          defaultQueryParams = {ShowInactive: false};
    queryParams = Object.assign({}, queryParams, defaultQueryParams);
    const url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

  /**
   * [getStaffDetail description]
   *
   * @static
   * @param  {Number} staffId
   * @param  {Object} queryParams
   * @return {Object}
   * @see http://iq.bigtime.net/BigtimeData/api/v2/help/Staff
   */
  static getStaffDetail (queryParams, staffId) {
    const method = 'get',
          endpoint = '/staff/detail/:staffId',
          defaultQueryParams = {View: 'Detailed'},
          urlParams = populateUrlParams(endpoint, {staffId});
    queryParams = Object.assign({}, queryParams, defaultQueryParams);
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

  /**
   * [staffTimeSheet description]
   *
   * @static
   * @param  {Number} staffId
   * @param  {Object} queryParams
   * @return {Object}
   */
  static getTimeSheetDateRange (queryParams = {}, staffId) {
    if (!queryParams.StartDt) throw new Error('No start date provided (query param `StartDt`).');
    if (!queryParams.StartDt.match(dateRegExp)) throw new Error('Start date must be in YYYY-MM-DD format.');
    const method = 'get',
          endpoint = '/time/Sheet/:staffId',
          defaultQueryParams = {
            EndDt: getCurrentDate(),
            View: 'Detailed'
          },
          urlParams = populateUrlParams(endpoint, {staffId});
    queryParams = Object.assign({}, queryParams, defaultQueryParams);
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

  /**
   * [getDailyTotalDateRange description]
   *
   * @static
   * @param {Number} staffId
   * @param {Object} queryParams
   * @return {Object} [description]
   */
  static getDailyTotalDateRange (staffId, queryParams = {}) {
    if (!queryParams.StartDt) throw new Error('No start date provided (query param `StartDt`).');
    if (!queryParams.StartDt.match(dateRegExp)) throw new Error('Start date must be in YYYY-MM-DD format.');
    const method = 'get',
          endpoint = '/time/TotalByDay/:staffId',
          defaultQueryParams = {
            EndDt: getCurrentDate(),
            View: 'Detailed'
          },
          urlParams = populateUrlParams(endpoint, {staffId});
    queryParams = Object.assign({}, queryParams, defaultQueryParams);
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

  /**
   * [getTimeEntry description]
   *
   * @static
   * @param  {Number} id
   * @param  {Object} queryParams
   * @return {Object}
   */
  static getTimeEntry (id, queryParams = {}) {
    const method = 'get',
          endpoint = '/time/:id',
          urlParams = populateUrlParams(endpoint, {id});
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

  /**
   * [createTimeEntry description]
   *
   * @static
   * @return {Object} [description]
   */
  static createTimeEntry (queryParams = {}) {
    const method = 'post',
          endpoint = '/time',
          defaultQueryParams = {
            MarkSubmitted: false
          };
    queryParams = Object.assign({}, queryParams, defaultQueryParams);
    const url = `${apiBase}${endpoint}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

  /**
   * [updateTimeEntry description]
   *
   * @static
   * @return {Object}
   */
  static updateTimeEntry (id, queryParams = {}) {
    const method = 'post',
          endpoint = '/time/:id',
          urlParams = populateUrlParams(endpoint, {id}),
          defaultQueryParams = {
            MarkSubmitted: false
          };
    queryParams = Object.assign({}, queryParams, defaultQueryParams);
    const url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

  /**
   * [time3 description]
   *
   * @static
   * @return {Object}
   */
  static deleteTimeEntry (id, queryParams = {}) {
    const method = 'delete',
          endpoint = '/time/:id',
          urlParams = populateUrlParams(endpoint, {id}),
          url = `${apiBase}${urlParams}?${qs.stringify(queryParams)}`;
    return {method, url};
  }

}

module.exports = Endpoint;
