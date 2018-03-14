const getCurrentDate = require('../../../src/util/get-current-date')
const dateRegExp = /^\d{4}-\d{2}-\d{2}$/

describe('getCurrentDate()', () => {

  it('returns the formatted current date', () => {
    const actual = getCurrentDate()
    expect(dateRegExp.test(actual)).to.be.true
  })

  it('returns a String', () => {
    const actual = getCurrentDate()
    expect(typeof actual).to.eq('string')
  })

})