import BaseApi from '../base'

class ReportsApi extends BaseApi {

  /**
   * [getReportById description]
   *
   * @param  {Number} id
   * @param {Object} queryParams
   * @return {Promise}
   *
  getReportById(id, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    const { method, url } = Endpoint.getReportById(id, queryParams)
    return Http[method](url, this.authHeaders)
  }*/

  /**
   * [updateReportById description]
   *
   * @param  {Number} id
   * @param  {Object} body
   * @param  {Object} queryParams
   * @return {Promise}
   *
  updateReportById(id, body = {}, queryParams = {}) {
    if (!id) throw new Error('Missing id.')
    if (!body.DT_BEGIN) throw new Error('Missing start date (`DT_BEGIN body param`)')
    if (!body.DT_END) throw new Error('Missing end date (`DT_END body param`)')
    if (!body.DT_BEGIN.match(DATE_REG_EXP)) throw new Error('Start date must be in YYYY-MM-DD format.')
    if (!body.DT_END.match(DATE_REG_EXP)) throw new Error('End date must be in YYYY-MM-DD format.')
    const { method, url } = Endpoint.updateReportById(id, queryParams)
    return Http[method](url, body, this.authHeaders)
  }*/

}

export default ReportsApi
