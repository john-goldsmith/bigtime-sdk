const HttpRequest = require('../../src/http-request')
const nock = require('nock')
const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi

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

        const headers = {
          'X-BigTime': 'Abc123'
        }

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP GET requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().get('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const actual = await HttpRequest.get(url, headers)
            expect(actual).to.be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP GET requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().get('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            try {
              await HttpRequest.get(url, headers)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })


      context('when no headers are provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP GET requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().get('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const actual = await HttpRequest.get(url)
            expect(actual).to.be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP GET requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().get('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            try {
              await HttpRequest.get(url)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

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

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP POST requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().post('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const actual = await HttpRequest.post(url, body)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().post('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            try {
              await HttpRequest.post(url, body)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })


      context('when no body is provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().post('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const actual = await HttpRequest.post(url)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().post('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            try {
              await HttpRequest.post(url)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })

      context('when headers are provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().post('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const headers = {
              'X-BigTime': 'Abc123'
            }
            const actual = await HttpRequest.post(url, body, headers)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().post('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const headers = {
              'X-BigTime': 'Abc123'
            }
            try {
              await HttpRequest.post(url, body, headers)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })


      context('when no headers are provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().post('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = null
            const actual = await HttpRequest.post(url, body)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().post('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = null
            try {
              await HttpRequest.post(url, body)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

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

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().put('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const actual = await HttpRequest.put(url, body)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().put('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            try {
              await HttpRequest.put(url, body)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })

      context('when no body is provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().put('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const actual = await HttpRequest.put(url)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().put('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            try {
              await HttpRequest.put(url)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })

      context('when headers are provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().put('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const headers = {
              'X-BigTime': 'Abc123'
            }
            const actual = await HttpRequest.put(url, body, headers)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().put('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const headers = {
              'X-BigTime': 'Abc123'
            }
            try {
              await HttpRequest.put(url, body, headers)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })


      context('when no headers are provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().put('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = null
            const actual = await HttpRequest.put(url, body)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP requests so that the BigTime
             * API doesn't actually get hit while running unit tests.
             */
            nock(urlRegExp).persist().put('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = null
            try {
              await HttpRequest.put(url, body)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

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

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP DELETE requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().delete('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const actual = await HttpRequest.delete(url, body)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP DELETE requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().delete('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            try {
              await HttpRequest.delete(url, body)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })

      context('when no body is provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP DELETE requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().delete('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const actual = await HttpRequest.delete(url)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP DELETE requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().delete('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            try {
              await HttpRequest.delete(url)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })

      context('when headers are provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP DELETE requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().delete('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const headers = {
              'X-BigTime': 'Abc123'
            }
            const actual = await HttpRequest.delete(url, body, headers)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP DELETE requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().delete('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = {
              foo: 'bar'
            }
            const headers = {
              'X-BigTime': 'Abc123'
            }
            try {
              await HttpRequest.delete(url, body, headers)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })


      context('when no headers are provided', () => {

        context('when the request is successful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP DELETE requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().delete('/').reply(200, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = null
            const actual = await HttpRequest.delete(url, body)
            expect(actual).be.an.instanceOf(Response)
            expect(actual.headers).to.be.an.instanceOf(Headers)
            expect(actual.url).to.eq(url)
            expect(actual.status).to.eq(200)
            expect(actual.ok).to.eq(true)
          })

        })

        context('when the request is unsuccessful', () => {

          before(() => {
            /**
             * The following intercepts all HTTP DELETE requests so that
             * the BigTime API doesn't actually get hit while running
             * unit tests.
             */
            nock(urlRegExp).persist().delete('/').reply(400, {})
          })

          after(() => {
            nock.cleanAll()
          })

          it('returns a Response', async () => {
            const url = 'https://google.com'
            const body = null
            try {
              await HttpRequest.delete(url, body)
            } catch (actual) {
              expect(actual).to.be.an.instanceOf(Response)
              expect(actual.headers).to.be.an.instanceOf(Headers)
              expect(actual.url).to.eq(url)
              expect(actual.status).to.eq(400)
              expect(actual.ok).to.eq(false)
            }
          })

        })

      })

    })

  })

})