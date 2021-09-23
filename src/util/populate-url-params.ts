import pathToRegExp from 'path-to-regexp'

/**
 * [populateUrlParams description]
 *
 * @private
 * @param  {String} url
 * @param  {Object} params
 * @return {String}
 */
function populateUrlParams(url: string = '', params: {} = {}): string {
  return pathToRegExp.compile(url)(params)
}

export default populateUrlParams
