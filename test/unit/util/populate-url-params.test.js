const populateUrlParams = require('../../../src/util/populate-url-params')

describe('populateUrlParams()', () => {

  context('when no `url` is provided', () => {

    it('returns', () => {
      const actual = populateUrlParams()
      expect(actual).to.eq('')
    })

  })

  context('when a `url` is provided', () => {

    context('when no `params` are provided', () => {

      it('throws an error', () => {
        const url = 'https://google.com/:foo/bar/:baz'
        const actual = () => populateUrlParams(url)
        expect(actual).to.throw('Expected "foo" to be a string')
      })

    })

    context('when `params` are provided', () => {

      it('returns', () => {
        const url = 'https://google.com/:foo/bar/:baz'
        const params = {
          foo: 'abc',
          baz: 123
        }
        const actual = populateUrlParams(url, params)
        expect(actual).to.eq('https://google.com/abc/bar/123')
      })

    })

  })

})