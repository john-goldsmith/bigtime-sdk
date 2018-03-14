const pathToRegExp = require('path-to-regexp')

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

module.exports = populateUrlParams