const Base = require('../../src/base')

describe('Base', () => {

  describe('constructor', () => {

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

  describe('#createSession()', () => {})

  describe('#getStaffList()', () => {})

  describe('#getStaffDetail()', () => {})

  describe('#getTimeSheetDateRange()', () => {})

  describe('#getDailyTotalDateRange()', () => {})

  describe('#getTimeEntry()', () => {})

  describe('#deleteTimeEntry()', () => {})

  describe('#findStaffByName()', () => {})

  describe('#getReportById()', () => {})

  describe('#updateReportById()', () => {})

  describe('#projectsPicklist()', () => {})

  describe('#staffPicklist()', () => {})

})