const Endpoint = require('../../src/endpoint')

describe('Endpoint', () => {

  describe('.createSession', () => {

    it('exists', () => {
      expect(Endpoint.createSession).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.createSession).to.be.an.instanceOf(Function)
    })

    context('when query params are provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const date = new Date()
        const queryParams = {
          string: 'bar',
          integer: 123,
          empty: null,
          not_defined: undefined,
          html: '<p class="message">Text</p>',
          // js: '<script>alert(\'oops\');</script>',
          date,
        }
        const actual = Endpoint.createSession(queryParams)
        const expected = {
          method: 'post',
          url: `https://iq.bigtime.net/BigtimeData/api/v2/session?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
        }
        expect(actual).to.be.an.instanceOf(Object)
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

    context('when query params are not provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const actual = Endpoint.createSession()
        const expected = {
          method: 'post',
          url: 'https://iq.bigtime.net/BigtimeData/api/v2/session?'
        }
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

  })

  describe('.getStaffList', () => {})

  describe('.getStaffDetail', () => {})

  describe('.getTimeSheetDateRange', () => {})

  describe('.getDailyTotalDateRange', () => {})

  describe('.getTimeEntry', () => {})

  describe('.createTimeEntry', () => {})

  describe('.updateTimeEntry', () => {})

  describe('.deleteTimeEntry', () => {})

  describe('.getReportById', () => {})

  describe('.updateReportById', () => {})

  describe('.projectsPicklist', () => {})

  describe('.staffPicklist', () => {})

})