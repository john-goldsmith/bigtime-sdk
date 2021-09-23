import BaseApi from '../base'

class PicklistsApi extends BaseApi {

  /**
   * [projectsPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Promise<Array>}
   *
  projectsPicklist(queryParams = {}) {
    const { method, url } = Endpoint.projectsPicklist(queryParams)
    return Http[method](url, this.authHeaders)
  }*/

  /**
   * [laborCodesPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Promise<Array>}
   *
  laborCodesPicklist(queryParams = {}) {
    const { method, url } = Endpoint.laborCodesPicklist(queryParams)
    return Http[method](url, this.authHeaders)
  }*/

  /**
   * [staffPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Promise<Array>}
   *
  staffPicklist(queryParams = {}) {
    const { method, url } = Endpoint.staffPicklist(queryParams)
    return Http[method](url, this.authHeaders)
  }*/

  /**
   * [clientsPicklist description]
   *
   * @param  {Object} queryParams
   * @return {Promise<Array>}
   *
  clientsPicklist(queryParams = {}) {
    const { method, url } = Endpoint.clientsPicklist(queryParams)
    return Http[method](url, this.authHeaders)
  }*/

  /**
   * [getProjectList description]
   *
   * @param  {Object} queryParams
   * @return {Promise<Array>}
   *
  getProjectList(queryParams = {}) {
    const { method, url } = Endpoint.getProjectList(queryParams)
    return Http[method](url, this.authHeaders)
  }*/

}

export default PicklistsApi
