const Base = require('../../src/base')
const Endpoint = require('../../src/endpoint')
const HttpRequest = require('../../src/http-request')

describe('Base', () => {

  describe('constructor', () => {

    context('when no options are provided', () => {

      it('throws an error', () => {
        const actual = () => new Base()
        expect(actual).to.throw(Error, 'Missing username configuration value.')
      })

    })

    context('when a username is not provided', () => {

      it('throws an error', () => {
        const options = {
          password: 'Abc123'
        }
        const actual = () => new Base(options)
        expect(actual).to.throw(Error, 'Missing username configuration value.')
      })

    })

    context('when a password is not provided', () => {

      it('throws an error', () => {
        const options = {
          username: 'john'
        }
        const actual = () => new Base(options)
        expect(actual).to.throw(Error, 'Missing password configuration value.')
      })

    })

  })

  describe('#authHeaders', () => {

    context('when no session token is present', () => {

      it('throws an error', () => {
        const options = {
          username: 'john',
          password: 'Abc123'
        }
        const instance = new Base(options)
        const actual = () => instance.authHeaders
        expect(actual).to.throw(Error, 'Session token not present.')
      })

    })

    context('when no firm ID is present', () => {

      it('throws an error', () => {
        const options = {
          username: 'john',
          password: 'Abc123'
        }
        const instance = new Base(options)
        instance.sessionToken = 'xyz123'
        const actual = () => instance.authHeaders
        expect(actual).to.throw(Error, 'Firm ID not present.')
      })

    })

    context('when a session token and firm ID are provided', () => {

      it('returns an object', () => {
        const options = {
          username: 'john',
          password: 'Abc123'
        }
        const instance = new Base(options)
        instance.sessionToken = 'xyz123'
        instance.firm = 'ACME Co.'
        const actual = instance.authHeaders
        const expected = {
          'X-Auth-Token': 'xyz123',
          'X-Auth-Realm': 'ACME Co.'
        }
        expect(actual).to.deep.eq(expected)
      })

    })

  })

  describe('#createSession()', () => {

    context('when the request is successful', () => {

      let instance
      let endpointStub
      let httpRequestStub
      let response

      before(() => {
        const options = {
          username: 'john',
          password: 'Abc123'
        }
        response = {
          body: {
            token: 'abc-123',
            firm: 'ACME Co.',
            staffsid: 123,
            userid: 456
          }
        }
        instance = new Base(options)
        endpointStub = sinon.stub(Endpoint, 'createSession').returns({method: 'post', url: '/create-session'})
        httpRequestStub = sinon.stub(HttpRequest, 'post').resolves(response)
      })

      after(() => {
        endpointStub.restore()
        httpRequestStub.restore()
      })

      it('returns a Promise', () => {
        const actual = instance.createSession()
        expect(actual).to.be.an.instanceOf(Promise)
      })

      it('uses the corresponding endpoint', () => {
        instance.createSession()
        expect(endpointStub).to.have.been.calledWith({})
      })

      it('makes an HTTP request', () => {
        instance.createSession()
        expect(httpRequestStub).to.have.been.calledWith('/create-session', {UserId: 'john', Pwd: 'Abc123'})
      })

      it('sets `sessionToken` instance variable', () => {
        instance.createSession()
        expect(instance.sessionToken).to.eq(response.body.token)
      })

      it('sets `firm` instance variable', () => {
        instance.createSession()
        expect(instance.firm).to.eq(response.body.firm)
      })

      it('sets `staffSid` instance variable', () => {
        instance.createSession()
        expect(instance.staffSid).to.eq(response.body.staffsid)
      })

      it('sets `userId` instance variable', () => {
        instance.createSession()
        expect(instance.userId).to.eq(response.body.userid)
      })

      it('deletes `username` instance variable', () => {
        instance.createSession()
        expect(instance.username).to.eq(undefined)
      })

      it('deletes `password` instance variable', () => {
        instance.createSession()
        expect(instance.password).to.eq(undefined)
      })

    })

    context('when the request is unsuccessful', () => {

      let instance
      let endpointStub
      let httpRequestStub

      before(() => {
        const options = {
          username: 'john',
          password: 'Abc123'
        }
        instance = new Base(options)
        endpointStub = sinon.stub(Endpoint, 'createSession').returns({method: 'post', url: '/create-session'})
        httpRequestStub = sinon.stub(HttpRequest, 'post').rejects()
      })

      after(() => {
        endpointStub.restore()
        httpRequestStub.restore()
      })

      it('returns a rejected Promise', () => {
        const actual = instance.createSession()
        expect(actual).to.be.rejectedWith('Error creating session.')
        expect(actual).to.be.an.instanceOf(Promise)
      })

    })

  })

  describe('#getStaffList()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'getStaffList').returns({method: 'get', url: '/get-staff-list'})
      httpRequestStub = sinon.stub(HttpRequest, 'get').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    it('uses the corresponding endpoint', () => {
      instance.getStaffList()
      expect(endpointStub).to.have.been.calledWith({})
    })

    it('makes an HTTP request', () => {
      instance.getStaffList()
      expect(httpRequestStub).to.have.been.calledWith('/get-staff-list', authHeaders)
    })

    it('returns a Promise', () => {
      const actual = instance.getStaffList()
      expect(actual).to.be.an.instanceOf(Promise)
    })

  })

  describe('#getStaffDetail()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'getStaffDetail').returns({method: 'get', url: '/get-staff-detail'})
      httpRequestStub = sinon.stub(HttpRequest, 'get').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    it('uses the corresponding endpoint', () => {
      const queryParams = {}
      const staffId = 1
      instance.getStaffDetail(queryParams, staffId)
      expect(endpointStub).to.have.been.calledWith(staffId, queryParams)
    })

    it('makes an HTTP request', () => {
      instance.getStaffDetail()
      expect(httpRequestStub).to.have.been.calledWith('/get-staff-detail', authHeaders)
    })

    it('returns a Promise', () => {
      const actual = instance.getStaffDetail()
      expect(actual).to.be.an.instanceOf(Promise)
    })

  })

  describe('#getTimeSheetDateRange()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'getTimeSheetDateRange').returns({method: 'get', url: '/get-time-sheet-date-range'})
      httpRequestStub = sinon.stub(HttpRequest, 'get').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    it('uses the corresponding endpoint', () => {
      const queryParams = {}
      const staffId = 1
      instance.getTimeSheetDateRange(queryParams, staffId)
      expect(endpointStub).to.have.been.calledWith(staffId, queryParams)
    })

    it('makes an HTTP request', () => {
      instance.getTimeSheetDateRange()
      expect(httpRequestStub).to.have.been.calledWith('/get-time-sheet-date-range', authHeaders)
    })

    it('returns a Promise', () => {
      const actual = instance.getTimeSheetDateRange()
      expect(actual).to.be.an.instanceOf(Promise)
    })

  })

  describe('#getDailyTotalDateRange()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      instance.staffSid = 1
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'getDailyTotalDateRange').returns({method: 'get', url: '/get-daily-total-date-range'})
      httpRequestStub = sinon.stub(HttpRequest, 'get').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    it('uses the corresponding endpoint', () => {
      instance.getDailyTotalDateRange()
      expect(endpointStub).to.have.been.calledWith(1, {})
    })

    it('makes an HTTP request', () => {
      instance.getDailyTotalDateRange()
      expect(httpRequestStub).to.have.been.calledWith('/get-daily-total-date-range', authHeaders)
    })

    it('returns a Promise', () => {
      const actual = instance.getDailyTotalDateRange()
      expect(actual).to.be.an.instanceOf(Promise)
    })

  })

  describe('#getTimeEntry()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      instance.staffSid = 1
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'getTimeEntry').returns({method: 'get', url: '/get-time-entry'})
      httpRequestStub = sinon.stub(HttpRequest, 'get').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.getTimeEntry()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      it('uses the corresponding endpoint', () => {
        instance.getTimeEntry(1)
        expect(endpointStub).to.have.been.calledWith(1, {})
      })

      it('makes an HTTP request', () => {
        instance.getTimeEntry(2)
        expect(httpRequestStub).to.have.been.calledWith('/get-time-entry', authHeaders)
      })

      it('returns a Promise', () => {
        const actual = instance.getTimeEntry(3)
        expect(actual).to.be.an.instanceOf(Promise)
      })

    })

  })

  describe('#createTimeEntry', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      instance.staffSid = 1
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'createTimeEntry').returns({method: 'post', url: '/create-time-entry'})
      httpRequestStub = sinon.stub(HttpRequest, 'post').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    context('when no `Dt` body param is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.createTimeEntry()
        expect(actual).to.throw(Error, 'Missing date (`Dt` body param).')
      })

    })

    context('when no `ProjectSID` body param is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.createTimeEntry({Dt: 'foo'})
        expect(actual).to.throw(Error, 'Missing project system ID (`ProjectSID` body param).')
      })

    })

    context('when no `BudgCatID` body param is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.createTimeEntry({Dt: 'foo', ProjectSID: 'bar'})
        expect(actual).to.throw(Error, 'Missing budget category ID (`BudgCatID` body param).')
      })

    })

    context('when no `Hours_IN` body param is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.createTimeEntry({Dt: 'foo', ProjectSID: 'bar', BudgCatID: 'baz'})
        expect(actual).to.throw(Error, 'Missing hours (`Hours_IN` body param).')
      })

    })

    context('when the `Dt` body param is malformed', () => {

      it('throws an error', () => {
        const actual = () => instance.createTimeEntry({Dt: 'foo', ProjectSID: 'bar', BudgCatID: 'baz', Hours_IN: 'glah'})
        expect(actual).to.throw(Error, 'Date must be in YYYY-MM-DD format.')
      })

    })

    context('when the required body params are provided and valid', () => {

      const body = {
        Dt: '2018-01-01',
        ProjectSID: 'bar',
        BudgCatID: 'baz',
        Hours_IN: 'glah'
      }

      it('uses the corresponding endpoint', () => {
        instance.createTimeEntry(body)
        expect(endpointStub).to.have.been.calledWith({})
      })

      it('makes an HTTP request', () => {
        instance.createTimeEntry(body)
        const mergedBody = {
          Dt: body.Dt,
          ProjectSID: body.ProjectSID,
          StaffSID: 1,
          BudgCatID: body.BudgCatID,
          Hours_IN: body.Hours_IN
        }
        expect(httpRequestStub).to.have.been.calledWith('/create-time-entry', mergedBody, authHeaders)
      })

      it('returns a Promise', () => {
        const actual = instance.createTimeEntry(body)
        expect(actual).to.be.an.instanceOf(Promise)
      })

    })

  })

  describe('#updateTimeEntry', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'updateTimeEntry').returns({method: 'post', url: '/update-time-entry'})
      httpRequestStub = sinon.stub(HttpRequest, 'post').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.updateTimeEntry()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      context('when the `Dt` body param is missing', () => {

        it('throws an error', () => {
          const actual = () => instance.updateTimeEntry(1, {})
          expect(actual).to.throw(Error, 'Missing date (`Dt` body param)')
        })

      })

      context('when the `Dt` body param is malformed', () => {

        it('throws an error', () => {
          const actual = () => instance.updateTimeEntry(1, {Dt: 'foo'})
          expect(actual).to.throw(Error, 'Date must be in YYYY-MM-DD format.')
        })

      })

      context('when the `Dt` body param is provided and valid', () => {

        it('uses the corresponding endpoint', () => {
          instance.updateTimeEntry(1, {Dt: '2018-01-01'})
          expect(endpointStub).to.have.been.calledWith(1, {})
        })

        it('makes an HTTP request', () => {
          instance.updateTimeEntry(2, {Dt: '2018-01-01'})
          expect(httpRequestStub).to.have.been.calledWith('/update-time-entry', {Dt: '2018-01-01'}, authHeaders)
        })

        it('returns a Promise', () => {
          const actual = instance.updateTimeEntry(3, {Dt: '2018-01-01'})
          expect(actual).to.be.an.instanceOf(Promise)
        })

      })

    })

  })

  describe('#deleteTimeEntry()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      instance.staffSid = 1
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'deleteTimeEntry').returns({method: 'delete', url: '/delete-time-entry'})
      httpRequestStub = sinon.stub(HttpRequest, 'delete').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.deleteTimeEntry()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      it('uses the corresponding endpoint', () => {
        instance.deleteTimeEntry(1)
        expect(endpointStub).to.have.been.calledWith(1, {})
      })

      it('makes an HTTP request', () => {
        instance.deleteTimeEntry(2)
        expect(httpRequestStub).to.have.been.calledWith('/delete-time-entry', {}, authHeaders)
      })

      it('returns a Promise', () => {
        const actual = instance.deleteTimeEntry(3)
        expect(actual).to.be.an.instanceOf(Promise)
      })

    })

  })

  describe('#findStaffByName()', () => {

    let instance
    let response
    let getStaffListStub

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      response = {
        body: [
          {
            FName: 'JOHN',
            SName: 'DOE',
            FullName: 'JOHN DOE'
          }
        ]
      }
      instance = new Base(options)
      getStaffListStub = sinon.stub(instance, 'getStaffList').resolves(response)
    })

    after(() => {
      getStaffListStub.restore()
    })

    context('when the required options are not provided', () => {

      it('throws an error', () => {
        const actual = () => instance.findStaffByName()
        expect(actual).to.throw(Error, 'At least one of first name, last name, or full name are required.')
      })

    })

    context('when the `fistName` option is provided', () => {

      it('delegates to `getStaffList`', () => {
        const options = {
          firstName: 'john'
        }
        instance.findStaffByName(options)
        expect(getStaffListStub).to.have.been.calledWith({})
      })

    })

    context('when the `lastName` option is provided', () => {

      it('delegates to `getStaffList`', () => {
        const options = {
          lastName: 'doe'
        }
        instance.findStaffByName(options)
        expect(getStaffListStub).to.have.been.calledWith({})
      })

    })

    context('when the `fullName` option is provided', () => {

      it('delegates to `getStaffList`', () => {
        const options = {
          fullName: 'john doe'
        }
        instance.findStaffByName(options)
        expect(getStaffListStub).to.have.been.calledWith({})
      })

    })

    it('returns a Promise', () => {
      const options = {
        firstName: 'john'
      }
      const actual = instance.findStaffByName(options)
      expect(actual).to.be.an.instanceOf(Promise)
    })

  })

  describe('#getReportById()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      instance.staffSid = 1
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'getReportById').returns({method: 'get', url: '/get-report-by-id'})
      httpRequestStub = sinon.stub(HttpRequest, 'get').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.getReportById()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      it('uses the corresponding endpoint', () => {
        instance.getReportById(1)
        expect(endpointStub).to.have.been.calledWith(1, {})
      })

      it('makes an HTTP request', () => {
        instance.getReportById(2)
        expect(httpRequestStub).to.have.been.calledWith('/get-report-by-id', authHeaders)
      })

      it('returns a Promise', () => {
        const actual = instance.getReportById(3)
        expect(actual).to.be.an.instanceOf(Promise)
      })

    })

  })

  describe('#updateReportById()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      instance.staffSid = 1
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'updateReportById').returns({method: 'post', url: '/update-report-by-id'})
      httpRequestStub = sinon.stub(HttpRequest, 'post').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    context('when no `id` is provided', () => {

      it('throws an error', () => {
        const actual = () => instance.updateReportById()
        expect(actual).to.throw(Error, 'Missing id.')
      })

    })

    context('when an `id` is provided', () => {

      context('when no `DT_BEGIN` is provided', () => {

        it('throws an error', () => {
          const actual = () => instance.updateReportById(1)
          expect(actual).to.throw(Error, 'Missing start date (`DT_BEGIN body param`)')
        })

      })

      context('when no `DT_END` is provided', () => {

        it('throws an error', () => {
          const actual = () => instance.updateReportById(1, {DT_BEGIN: 'foo'})
          expect(actual).to.throw(Error, 'Missing end date (`DT_END body param`)')
        })

      })

      context('when `DT_BEGIN` is malformed', () => {

        it('throws an error', () => {
          const actual = () => instance.updateReportById(1, {DT_BEGIN: 'foo', DT_END: 'bar'})
          expect(actual).to.throw(Error, 'Start date must be in YYYY-MM-DD format.')
        })

      })

      context('when `DT_END` is malformed', () => {

        it('throws an error', () => {
          const actual = () => instance.updateReportById(1, {DT_BEGIN: '2018-01-01', DT_END: 'foo'})
          expect(actual).to.throw(Error, 'End date must be in YYYY-MM-DD format.')
        })

      })

      it('uses the corresponding endpoint', () => {
        instance.updateReportById(1, {DT_BEGIN: '2018-01-01', DT_END: '2018-12-31'})
        expect(endpointStub).to.have.been.calledWith(1, {})
      })

      it('makes an HTTP request', () => {
        const body = {
          DT_BEGIN: '2018-01-01',
          DT_END: '2018-12-31'
        }
        instance.updateReportById(2, body)
        expect(httpRequestStub).to.have.been.calledWith('/update-report-by-id', body, authHeaders)
      })

      it('returns a Promise', () => {
        const actual = instance.updateReportById(3, {DT_BEGIN: '2018-01-01', DT_END: '2018-12-31'})
        expect(actual).to.be.an.instanceOf(Promise)
      })

    })

  })

  describe('#projectsPicklist()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'projectsPicklist').returns({method: 'get', url: '/projects-picklist'})
      httpRequestStub = sinon.stub(HttpRequest, 'get').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    it('uses the corresponding endpoint', () => {
      instance.projectsPicklist()
      expect(endpointStub).to.have.been.calledWith({})
    })

    it('makes an HTTP request', () => {
      instance.projectsPicklist()
      expect(httpRequestStub).to.have.been.calledWith('/projects-picklist', authHeaders)
    })

    it('returns a Promise', () => {
      const actual = instance.projectsPicklist()
      expect(actual).to.be.an.instanceOf(Promise)
    })

  })

  describe('#staffPicklist()', () => {

    let instance
    let authHeadersStub
    let endpointStub
    let httpRequestStub
    let authHeaders

    before(() => {
      const options = {
        username: 'john',
        password: 'Abc123'
      }
      authHeaders = {
        'X-Auth-Token': 'abc-123',
        'X-Auth-Realm': 'ACME Co.'
      }
      instance = new Base(options)
      authHeadersStub = sinon.stub(instance, 'authHeaders').get(() => authHeaders)
      endpointStub = sinon.stub(Endpoint, 'staffPicklist').returns({method: 'get', url: '/staff-picklist'})
      httpRequestStub = sinon.stub(HttpRequest, 'get').resolves()
    })

    after(() => {
      endpointStub.restore()
      httpRequestStub.restore()
      authHeadersStub.restore()
    })

    it('uses the corresponding endpoint', () => {
      instance.staffPicklist()
      expect(endpointStub).to.have.been.calledWith({})
    })

    it('makes an HTTP request', () => {
      instance.staffPicklist()
      expect(httpRequestStub).to.have.been.calledWith('/staff-picklist', authHeaders)
    })

    it('returns a Promise', () => {
      const actual = instance.staffPicklist()
      expect(actual).to.be.an.instanceOf(Promise)
    })

  })

})