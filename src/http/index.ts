import fetch, { Response, RequestInit } from 'node-fetch'

const defaultHeaders: {[key: string]: string} = {
  'Content-Type': 'application/json'
}

export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @class
 */
class Http /*implements IHttp*/ {

  /**
   * Issue an HTTP GET request.
   *
   * @public
   * @static
   * @param  {String} url
   * @param  {Object} headers
   * @return {Promise}
   */
  public static get(url: string, headers: {} = {}): Promise<Response> {
    if (!url) throw new Error('Base.get: a URL is required.')
    return request(url, HttpMethods.GET, null, headers)
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
  public static post(url: string, body = {}, headers = {}): Promise<Response> {
    if (!url) throw new Error('Base.post: a URL is required.')
    return request(url, HttpMethods.POST, body, headers)
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
  public static put(url: string, body = {}, headers = {}): Promise<Response> {
    if (!url) throw new Error('Base.put: a URL is required.')
    return request(url, HttpMethods.PUT, body, headers)
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
  public static delete(url: string, body = {}, headers = {}): Promise<Response> {
    if (!url) throw new Error('Base.delete: a URL is required.')
    return request(url, HttpMethods.DELETE, body, headers)
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
async function request(url: string, method: string, body: {} | null, headers: {}): Promise<Response> {
  try {
    const options: RequestInit = {
      method,
      body: JSON.stringify(body),
      headers: Object.assign({}, headers, defaultHeaders)
    }
    const response: Response = await fetch(url, options)
    const result: Response = await checkResponseStatus(response)
    return result
  } catch (err) {
    throw err
  }
}

/**
 * Check if a response status code is in the 2xx or 3xx families.
 *
 * @private
 * @method checkResponseStatus
 * @param  {Response} response
 * @return {Promise}
 */
function checkResponseStatus(response: Response): Promise<Response> {
  return (response.status > 199 && response.status < 400) ? Promise.resolve(response) : Promise.reject(response)
}

/**
 * Converts the response body to JSON.
 *
 * @private
 * @method responseBodyAsJson
 * @param  {Response} response
 * @return {Promise<Response>}
 *
async function responseBodyAsJson(response: Response): Promise<Response> {
  const json = await response.json()
  response.body = json // TODO: Is this bad?
  return response
}*/

export default Http
