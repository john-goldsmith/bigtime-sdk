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

module.exports = getCurrentDate