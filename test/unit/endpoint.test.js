const Endpoint = require('../../src/endpoint')
const util = require('../../src/util')

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

  describe('.getStaffList', () => {

    it('exists', () => {
      expect(Endpoint.getStaffList).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.getStaffList).to.be.an.instanceOf(Function)
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
        const actual = Endpoint.getStaffList(queryParams)
        const expected = {
          method: 'get',
          url: `https://iq.bigtime.net/BigtimeData/api/v2/staff?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}&ShowInactive=false`
        }
        expect(actual).to.be.an.instanceOf(Object)
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

    context('when query params are not provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const actual = Endpoint.getStaffList()
        const expected = {
          method: 'get',
          url: 'https://iq.bigtime.net/BigtimeData/api/v2/staff?ShowInactive=false'
        }
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

  })

  describe('.getStaffDetail', () => {

    it('exists', () => {
      expect(Endpoint.getStaffDetail).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.getStaffDetail).to.be.an.instanceOf(Function)
    })

    context('when `staffId` is not provided', () => {

      it('throws an error', () => {
        const actual = () => Endpoint.getStaffDetail()
        expect(actual).to.throw(Error, 'No staff ID provided')
      })

    })

    context('when `staffId` is provided', () => {

      let populateUrlParamsSpy

      before(() => {
        populateUrlParamsSpy = sinon.spy(util, 'populateUrlParams')
      })

      after(() => {
        populateUrlParamsSpy.restore()
      })

      it('populates URL params', () => {
        const staffId = 1
        Endpoint.getStaffDetail(staffId)
        expect(populateUrlParamsSpy).to.have.been.called
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
          const staffId = 1
          const actual = Endpoint.getStaffDetail(staffId, queryParams)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/staff/detail/${staffId}?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}&View=Detailed`
          }
          expect(actual).to.be.an.instanceOf(Object)
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

      context('when query params are not provided', () => {

        it('returns an object containing `method` and `url`', () => {
          const staffId = 2
          const actual = Endpoint.getStaffDetail(staffId)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/staff/detail/${staffId}?View=Detailed`
          }
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

    })

  })

  describe('.getTimeSheetDateRange', () => {

    it('exists', () => {
      expect(Endpoint.getTimeSheetDateRange).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.getTimeSheetDateRange).to.be.an.instanceOf(Function)
    })

    context('when `staffId` is not provided', () => {

      it('throws an error', () => {
        const actual = () => Endpoint.getTimeSheetDateRange()
        expect(actual).to.throw(Error, 'No staff ID provided')
      })

    })

    context('when `staffId` is provided', () => {

      let getCurrentDateStub
      let populateUrlParamsSpy

      before(() => {
        getCurrentDateStub = sinon.stub(util, 'getCurrentDate').returns('2018-01-01')
        populateUrlParamsSpy = sinon.spy(util, 'populateUrlParams')
      })

      after(() => {
        getCurrentDateStub.restore()
        populateUrlParamsSpy.restore()
      })

      context('when the `StartDt` query param is not provided', () => {

        it('throws an error', () => {
          const staffId = 1
          const queryParams = {}
          const actual = () => Endpoint.getTimeSheetDateRange(staffId, queryParams)
          expect(actual).to.throw(Error, 'No start date provided (query param `StartDt`).')
        })

      })

      context('when the `StartDt` query param is malformed', () => {

        it('throws an error', () => {
          const staffId = 2
          const queryParams = {
            StartDt: 'foo'
          }
          const actual = () => Endpoint.getTimeSheetDateRange(staffId, queryParams)
          expect(actual).to.throw(Error, 'Start date must be in YYYY-MM-DD format.')
        })

      })

      context('when query params are provided and valid', () => {

        it('populates URL params', () => {
          const staffId = 1
          const queryParams = {
            StartDt: '2018-01-01'
          }
          Endpoint.getTimeSheetDateRange(staffId, queryParams)
          expect(populateUrlParamsSpy).to.have.been.called
        })

        it('gets the current date', () => {
          const staffId = 1
          const queryParams = {
            StartDt: '2018-01-01'
          }
          Endpoint.getTimeSheetDateRange(staffId, queryParams)
          expect(getCurrentDateStub).to.have.been.called
        })

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
            StartDt: '2018-01-01',
          }
          const staffId = 1
          const actual = Endpoint.getTimeSheetDateRange(staffId, queryParams)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/Sheet/${staffId}?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}&StartDt=2018-01-01&EndDt=2018-01-01&View=Detailed`
          }
          expect(actual).to.be.an.instanceOf(Object)
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

      context('when query params are not provided', () => {

        it('returns an object containing `method` and `url`', () => {
          const staffId = 2
          const queryParams = {
            StartDt: '2018-01-01'
          }
          const actual = Endpoint.getTimeSheetDateRange(staffId, queryParams)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/Sheet/${staffId}?StartDt=2018-01-01&EndDt=2018-01-01&View=Detailed`
          }
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

    })

  })

  describe('.getDailyTotalDateRange', () => {

    it('exists', () => {
      expect(Endpoint.getDailyTotalDateRange).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.getDailyTotalDateRange).to.be.an.instanceOf(Function)
    })

    context('when `staffId` is not provided', () => {

      it('throws an error', () => {
        const actual = () => Endpoint.getDailyTotalDateRange()
        expect(actual).to.throw(Error, 'No staff ID provided')
      })

    })

    context('when `staffId` is provided', () => {

      context('when the `StartDt` query param is not provided', () => {

        it('throws an error', () => {
          const staffId = 1
          const queryParams = {}
          const actual = () => Endpoint.getDailyTotalDateRange(staffId, queryParams)
          expect(actual).to.throw(Error, 'No start date provided (query param `StartDt`).')
        })

      })

      context('when the `StartDt` query param is malformed', () => {

        it('throws an error', () => {
          const staffId = 2
          const queryParams = {
            StartDt: 'foo'
          }
          const actual = () => Endpoint.getDailyTotalDateRange(staffId, queryParams)
          expect(actual).to.throw(Error, 'Start date must be in YYYY-MM-DD format.')
        })

      })

      context('when query params are provided and valid', () => {

        let getCurrentDateStub
        let populateUrlParamsSpy

        before(() => {
          getCurrentDateStub = sinon.stub(util, 'getCurrentDate').returns('2018-01-01')
          populateUrlParamsSpy = sinon.spy(util, 'populateUrlParams')
        })

        after(() => {
          getCurrentDateStub.restore()
          populateUrlParamsSpy.restore()
        })

        it('populates URL params', () => {
          const staffId = 1
          const queryParams = {
            StartDt: '2018-01-01'
          }
          Endpoint.getDailyTotalDateRange(staffId, queryParams)
          expect(populateUrlParamsSpy).to.have.been.called
        })

        it('gets the current date', () => {
          const staffId = 1
          const queryParams = {
            StartDt: '2018-01-01'
          }
          Endpoint.getDailyTotalDateRange(staffId, queryParams)
          expect(getCurrentDateStub).to.have.been.called
        })

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
            StartDt: '2018-01-01',
          }
          const staffId = 1
          const actual = Endpoint.getDailyTotalDateRange(staffId, queryParams)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/TotalByDay/${staffId}?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}&StartDt=2018-01-01&EndDt=2018-01-01&View=Detailed`
          }
          expect(actual).to.be.an.instanceOf(Object)
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

      context('when query params are not provided', () => {

        let getCurrentDateStub

        before(() => {
          getCurrentDateStub = sinon.stub(util, 'getCurrentDate').returns('2018-01-01')
        })

        after(() => {
          getCurrentDateStub.restore()
        })

        it('returns an object containing `method` and `url`', () => {
          const staffId = 2
          const queryParams = {
            StartDt: '2018-01-01'
          }
          const actual = Endpoint.getDailyTotalDateRange(staffId, queryParams)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/TotalByDay/${staffId}?StartDt=2018-01-01&EndDt=2018-01-01&View=Detailed`
          }
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

    })

  })

  describe('.getTimeEntry', () => {

    it('exists', () => {
      expect(Endpoint.getTimeEntry).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.getTimeEntry).to.be.an.instanceOf(Function)
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => Endpoint.getTimeEntry()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      let populateUrlParamsSpy

      before(() => {
        populateUrlParamsSpy = sinon.spy(util, 'populateUrlParams')
      })

      after(() => {
        populateUrlParamsSpy.restore()
      })

      it('populates URL params', () => {
        const id = 1
        Endpoint.getTimeEntry(id)
        expect(populateUrlParamsSpy).to.have.been.called
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
          const id = 1
          const actual = Endpoint.getTimeEntry(id, queryParams)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/${id}?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
          }
          expect(actual).to.be.an.instanceOf(Object)
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

      context('when query params are not provided', () => {

        it('returns an object containing `method` and `url`', () => {
          const id = 2
          const actual = Endpoint.getTimeEntry(id)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/${id}?`
          }
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

    })

  })

  describe('.createTimeEntry', () => {

    it('exists', () => {
      expect(Endpoint.createTimeEntry).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.createTimeEntry).to.be.an.instanceOf(Function)
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
        const actual = Endpoint.createTimeEntry(queryParams)
        const expected = {
          method: 'post',
          url: `https://iq.bigtime.net/BigtimeData/api/v2/time?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}&MarkSubmitted=false`
        }
        expect(actual).to.be.an.instanceOf(Object)
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

    context('when query params are not provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const actual = Endpoint.createTimeEntry()
        const expected = {
          method: 'post',
          url: 'https://iq.bigtime.net/BigtimeData/api/v2/time?MarkSubmitted=false'
        }
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

  })

  describe('.updateTimeEntry', () => {

    it('exists', () => {
      expect(Endpoint.updateTimeEntry).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.updateTimeEntry).to.be.an.instanceOf(Function)
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => Endpoint.updateTimeEntry()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      let populateUrlParamsSpy

      before(() => {
        populateUrlParamsSpy = sinon.spy(util, 'populateUrlParams')
      })

      after(() => {
        populateUrlParamsSpy.restore()
      })

      it('populates URL params', () => {
        const id = 1
        Endpoint.updateTimeEntry(id)
        expect(populateUrlParamsSpy).to.have.been.called
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
          const id = 1
          const actual = Endpoint.updateTimeEntry(id, queryParams)
          const expected = {
            method: 'post',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/${id}?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}&MarkSubmitted=false`
          }
          expect(actual).to.be.an.instanceOf(Object)
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

      context('when query params are not provided', () => {

        it('returns an object containing `method` and `url`', () => {
          const id = 2
          const actual = Endpoint.updateTimeEntry(id)
          const expected = {
            method: 'post',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/${id}?MarkSubmitted=false`
          }
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

    })

  })

  describe('.deleteTimeEntry', () => {

    it('exists', () => {
      expect(Endpoint.deleteTimeEntry).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.deleteTimeEntry).to.be.an.instanceOf(Function)
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => Endpoint.deleteTimeEntry()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      let populateUrlParamsSpy

      before(() => {
        populateUrlParamsSpy = sinon.spy(util, 'populateUrlParams')
      })

      after(() => {
        populateUrlParamsSpy.restore()
      })

      it('populates URL params', () => {
        const id = 1
        Endpoint.deleteTimeEntry(id)
        expect(populateUrlParamsSpy).to.have.been.called
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
          const id = 1
          const actual = Endpoint.deleteTimeEntry(id, queryParams)
          const expected = {
            method: 'delete',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/${id}?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
          }
          expect(actual).to.be.an.instanceOf(Object)
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

      context('when query params are not provided', () => {

        it('returns an object containing `method` and `url`', () => {
          const id = 2
          const actual = Endpoint.deleteTimeEntry(id)
          const expected = {
            method: 'delete',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/time/${id}?`
          }
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

    })

  })

  describe('.getReportById', () => {

    it('exists', () => {
      expect(Endpoint.getReportById).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.getReportById).to.be.an.instanceOf(Function)
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => Endpoint.getReportById()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      let populateUrlParamsSpy

      before(() => {
        populateUrlParamsSpy = sinon.spy(util, 'populateUrlParams')
      })

      after(() => {
        populateUrlParamsSpy.restore()
      })

      it('populates URL params', () => {
        const id = 1
        Endpoint.getReportById(id)
        expect(populateUrlParamsSpy).to.have.been.called
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
          const id = 1
          const actual = Endpoint.getReportById(id, queryParams)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/report/data/${id}?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
          }
          expect(actual).to.be.an.instanceOf(Object)
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

      context('when query params are not provided', () => {

        it('returns an object containing `method` and `url`', () => {
          const id = 2
          const actual = Endpoint.getReportById(id)
          const expected = {
            method: 'get',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/report/data/${id}?`
          }
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

    })

  })

  describe('.updateReportById', () => {

    it('exists', () => {
      expect(Endpoint.updateReportById).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.updateReportById).to.be.an.instanceOf(Function)
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => Endpoint.updateReportById()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      let populateUrlParamsSpy

      before(() => {
        populateUrlParamsSpy = sinon.spy(util, 'populateUrlParams')
      })

      after(() => {
        populateUrlParamsSpy.restore()
      })

      it('populates URL params', () => {
        const id = 1
        Endpoint.updateReportById(id)
        expect(populateUrlParamsSpy).to.have.been.called
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
          const id = 1
          const actual = Endpoint.updateReportById(id, queryParams)
          const expected = {
            method: 'post',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/report/data/${id}?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
          }
          expect(actual).to.be.an.instanceOf(Object)
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

      context('when query params are not provided', () => {

        it('returns an object containing `method` and `url`', () => {
          const id = 2
          const actual = Endpoint.updateReportById(id)
          const expected = {
            method: 'post',
            url: `https://iq.bigtime.net/BigtimeData/api/v2/report/data/${id}?`
          }
          expect(actual).to.deep.eq(expected)
          expect(actual.method).to.eq(expected.method)
          expect(actual.url).to.eq(expected.url)
        })

      })

    })

  })

  describe('.projectsPicklist', () => {

    it('exists', () => {
      expect(Endpoint.projectsPicklist).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.projectsPicklist).to.be.an.instanceOf(Function)
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
        const actual = Endpoint.projectsPicklist(queryParams)
        const expected = {
          method: 'get',
          url: `https://iq.bigtime.net/BigtimeData/api/v2/picklist/projects?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
        }
        expect(actual).to.be.an.instanceOf(Object)
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

    context('when query params are not provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const actual = Endpoint.projectsPicklist()
        const expected = {
          method: 'get',
          url: 'https://iq.bigtime.net/BigtimeData/api/v2/picklist/projects?'
        }
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

  })

  describe('.staffPicklist', () => {

    it('exists', () => {
      expect(Endpoint.staffPicklist).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.staffPicklist).to.be.an.instanceOf(Function)
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
        const actual = Endpoint.staffPicklist(queryParams)
        const expected = {
          method: 'get',
          url: `https://iq.bigtime.net/BigtimeData/api/v2/picklist/staff?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
        }
        expect(actual).to.be.an.instanceOf(Object)
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

    context('when query params are not provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const actual = Endpoint.staffPicklist()
        const expected = {
          method: 'get',
          url: 'https://iq.bigtime.net/BigtimeData/api/v2/picklist/staff?'
        }
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

  })

  describe('.laborCodesPicklist', () => {

    it('exists', () => {
      expect(Endpoint.laborCodesPicklist).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.laborCodesPicklist).to.be.an.instanceOf(Function)
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
        const actual = Endpoint.laborCodesPicklist(queryParams)
        const expected = {
          method: 'get',
          url: `https://iq.bigtime.net/BigtimeData/api/v2/picklist/LaborCodes?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
        }
        expect(actual).to.be.an.instanceOf(Object)
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

    context('when query params are not provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const actual = Endpoint.laborCodesPicklist()
        const expected = {
          method: 'get',
          url: 'https://iq.bigtime.net/BigtimeData/api/v2/picklist/LaborCodes?'
        }
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

  })

  describe('.clientsPicklist', () => {

    it('exists', () => {
      expect(Endpoint.clientsPicklist).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.clientsPicklist).to.be.an.instanceOf(Function)
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
        const actual = Endpoint.clientsPicklist(queryParams)
        const expected = {
          method: 'get',
          url: `https://iq.bigtime.net/BigtimeData/api/v2/picklist/clients?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
        }
        expect(actual).to.be.an.instanceOf(Object)
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

    context('when query params are not provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const actual = Endpoint.clientsPicklist()
        const expected = {
          method: 'get',
          url: 'https://iq.bigtime.net/BigtimeData/api/v2/picklist/clients?'
        }
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

  })

  describe('.getProjectList', () => {

    it('exists', () => {
      expect(Endpoint.getProjectList).to.exist
    })

    it('is a function', () => {
      expect(Endpoint.getProjectList).to.be.an.instanceOf(Function)
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
        const actual = Endpoint.getProjectList(queryParams)
        const expected = {
          method: 'get',
          url: `https://iq.bigtime.net/BigtimeData/api/v2/project?string=bar&integer=123&empty=&html=${encodeURIComponent(queryParams.html)}&date=${encodeURIComponent(date.toISOString())}`
        }
        expect(actual).to.be.an.instanceOf(Object)
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

    context('when query params are not provided', () => {

      it('returns an object containing `method` and `url`', () => {
        const actual = Endpoint.getProjectList()
        const expected = {
          method: 'get',
          url: 'https://iq.bigtime.net/BigtimeData/api/v2/project?'
        }
        expect(actual).to.deep.eq(expected)
        expect(actual.method).to.eq(expected.method)
        expect(actual.url).to.eq(expected.url)
      })

    })

  })

})
