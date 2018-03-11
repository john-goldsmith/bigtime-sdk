const HttpRequest = require('../../src/http-request')

describe('HttpRequest', () => {

  describe('.get', () => {

    it('exists', () => {
      expect(HttpRequest.get).to.exist
    })

    it('is a function', () => {
      expect(HttpRequest.get).to.an.instanceOf(Function)
    })

    context('when no URL is provided', () => {

      it('throws an error', () => {
        const actual = () => HttpRequest.get()
        const expected = 'Base.get: a URL is required.'
        expect(actual).to.throw(Error, expected)
      })

    })

    context('when a URL is provided', () => {

      context('when headers are provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const headers = {
            'X-BigTime': 'Abc123'
          }
          const actual = HttpRequest.get(url, headers)
          expect(actual).be.an.instanceOf(Promise)
        })

      })


      context('when no headers are provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const actual = HttpRequest.get(url)
          expect(actual).be.an.instanceOf(Promise)
        })

      })

    })

  })

  describe('.post', () => {

    it('exists', () => {
      expect(HttpRequest.post).to.exist
    })

    it('is a function', () => {
      expect(HttpRequest.post).to.an.instanceOf(Function)
    })

    context('when no URL is provided', () => {

      it('throws an error', () => {
        const actual = () => HttpRequest.post()
        const expected = 'Base.post: a URL is required.'
        expect(actual).to.throw(Error, expected)
      })

    })

    context('when a URL is provided', () => {

      context('when a body is provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = {
            foo: 'bar'
          }
          const actual = HttpRequest.post(url, body)
          expect(actual).be.an.instanceOf(Promise)
        })

      })


      context('when no body is provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const actual = HttpRequest.post(url)
          expect(actual).be.an.instanceOf(Promise)
        })

      })

      context('when headers are provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = {
            foo: 'bar'
          }
          const headers = {
            'X-BigTime': 'Abc123'
          }
          const actual = HttpRequest.post(url, body, headers)
          expect(actual).be.an.instanceOf(Promise)
        })

      })


      context('when no headers are provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = null
          const actual = HttpRequest.post(url, body)
          expect(actual).be.an.instanceOf(Promise)
        })

      })

    })

  })

  describe('.put', () => {

    it('exists', () => {
      expect(HttpRequest.put).to.exist
    })

    it('is a function', () => {
      expect(HttpRequest.put).to.an.instanceOf(Function)
    })

    context('when no URL is provided', () => {

      it('throws an error', () => {
        const actual = () => HttpRequest.put()
        const expected = 'Base.put: a URL is required.'
        expect(actual).to.throw(Error, expected)
      })

    })

    context('when a URL is provided', () => {

      context('when a body is provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = {
            foo: 'bar'
          }
          const actual = HttpRequest.put(url, body)
          expect(actual).be.an.instanceOf(Promise)
        })

      })


      context('when no body is provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const actual = HttpRequest.put(url)
          expect(actual).be.an.instanceOf(Promise)
        })

      })

      context('when headers are provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = {
            foo: 'bar'
          }
          const headers = {
            'X-BigTime': 'Abc123'
          }
          const actual = HttpRequest.put(url, body, headers)
          expect(actual).be.an.instanceOf(Promise)
        })

      })


      context('when no headers are provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = null
          const actual = HttpRequest.put(url, body)
          expect(actual).be.an.instanceOf(Promise)
        })

      })

    })

  })

  describe('.delete', () => {

    it('exists', () => {
      expect(HttpRequest.delete).to.exist
    })

    it('is a function', () => {
      expect(HttpRequest.delete).to.an.instanceOf(Function)
    })

    context('when no URL is provided', () => {

      it('throws an error', () => {
        const actual = () => HttpRequest.delete()
        const expected = 'Base.delete: a URL is required.'
        expect(actual).to.throw(Error, expected)
      })

    })

    context('when a URL is provided', () => {

      context('when a body is provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = {
            foo: 'bar'
          }
          const actual = HttpRequest.delete(url, body)
          expect(actual).be.an.instanceOf(Promise)
        })

      })


      context('when no body is provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const actual = HttpRequest.delete(url)
          expect(actual).be.an.instanceOf(Promise)
        })

      })

      context('when headers are provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = {
            foo: 'bar'
          }
          const headers = {
            'X-BigTime': 'Abc123'
          }
          const actual = HttpRequest.delete(url, body, headers)
          expect(actual).be.an.instanceOf(Promise)
        })

      })


      context('when no headers are provided', () => {

        it('returns a Promise', () => {
          const url = 'https://google.com'
          const body = null
          const actual = HttpRequest.put(url, body)
          expect(actual).be.an.instanceOf(Promise)
        })

      })

    })

  })

})