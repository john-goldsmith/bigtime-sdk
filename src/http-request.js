const fetch = require('isomorphic-fetch')
/**
 * The following is available from the `isomorphic-fetch` package,
 * which is just a reference to the class exposed by the `node-fetch`
 * package.
 *
 * @see github.com/matthew-andrews/isomorphic-fetch/blob/master/fetch-npm-node.js
 */
const Request = global.Request
// const Headers = global.Headers
// const baseUrl = 'https://iq.bigtime.net/BigtimeData/api/v2'
const defaultHeaders = {
  'Content-Type': 'application/json'
}

/**
 * @class
 */
class HttpRequest {

  /**
   * Issue an HTTP GET request.
   *
   * @public
   * @static
   * @param  {String} url
   * @param  {Object} headers
   * @return {Promise}
   */
  static get(url, headers = {}) {
    if (!url) throw new Error('Base.get: a URL is required.')
    return request(url, 'GET', null, headers)
  }

  /**
   * Issue an HTTP POST request.
   *
   * @public
   * @static
   * @param  {String} url
   * @param  {Null|Object} body
   * @param  {Object} headers
   * @return {Promise}
   */
  static post(url, body = {}, headers = {}) {
    if (!url) throw new Error('Base.post: a URL is required.')
    return request(url, 'POST', body, headers)
  }

  /**
   * Issue an HTTP PUT request.
   *
   * @public
   * @static
   * @param  {String} url
   * @param  {Null|Object} body
   * @param  {Object} headers
   * @return {Promise}
   */
  static put(url, body = {}, headers = {}) {
    if (!url) throw new Error('Base.put: a URL is required.')
    return request(url, 'PUT', body, headers)
  }

  /**
   * Issue an HTTP DELETE request.
   *
   * @public
   * @static
   * @param  {String} url
   * @param  {Null|Object} body
   * @param  {Object} headers
   * @return {Promise}
   */
  static delete(url, body = {}, headers = {}) {
    if (!url) throw new Error('Base.delete: a URL is required.')
    return request(url, 'DELETE', body, headers)
  }

}

/**
 * Issue an HTTP request.
 *
 * @private
 * @method request
 * @param  {String} url
 * @param  {String} method
 * @param  {Object} body
 * @param  {Object} headers
 * @return {Promise<Response>}
 */
function request(url, method, body, headers) {
  const request = new Request(url, {
    method,
    body: JSON.stringify(body),
    headers: Object.assign({}, headers, defaultHeaders)
    // headers: new Headers({})
  })
  return fetch(request)
    .then(responseBodyAsJson)
    .then(checkResponseStatus)
}

/**
 * Check if a response status code is in the 2xx or 3xx families.
 *
 * @private
 * @method checkResponseStatus
 * @param  {Response} response
 * @return {Promise}
 */
function checkResponseStatus(response) {
  return (response.status > 199 && response.status < 400) ? Promise.resolve(response) : Promise.reject(response)
}

/**
 * Converts the response body to JSON.
 *
 * @private
 * @method responseBodyAsJson
 * @param  {Response} response
 * @return {Promise<Response>}
 */
function responseBodyAsJson(response) {
  return response.json()
    .then(
      json => {
        response.body = json // TODO: Is this bad?
        return response
      }
    )
}

module.exports = HttpRequest