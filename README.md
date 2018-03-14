# BigTime SDK
Node wrapper for interacting with the [BigTime API](http://iq.bigtime.net/BigtimeData/api/v2/help/Overview).

[![Travis CI Build Status](https://travis-ci.org/john-goldsmith/bigtime-sdk.svg?branch=master)](https://travis-ci.org/john-goldsmith/bigtime-sdk)
[![npm version](https://badge.fury.io/js/bigtime-sdk.svg)](https://badge.fury.io/js/bigtime-sdk)
[![Code Climate Maintainability](https://api.codeclimate.com/v1/badges/373d61ec523888da1663/maintainability)](https://codeclimate.com/github/john-goldsmith/bigtime-sdk/maintainability)
[![Code Climate Test Coverage](https://api.codeclimate.com/v1/badges/373d61ec523888da1663/test_coverage)](https://codeclimate.com/github/john-goldsmith/bigtime-sdk/test_coverage)
[![Coveralls Coverage Status](https://coveralls.io/repos/github/john-goldsmith/bigtime-sdk/badge.svg?branch=master)](https://coveralls.io/github/john-goldsmith/bigtime-sdk?branch=master)
[![David DM](https://david-dm.org/john-goldsmith/bigtime-sdk.svg)](https://david-dm.org/john-goldsmith/bigtime-sdk)

## Installation

`npm install --save bigtime-sdk`

## Usage

```js
const BigTime = require('bigtime-sdk');

const bigTime = new BigTime({
  username: YOUR_USERNAME_HERE,
  password: YOUR_PASSWORD_HERE
});

bigTime.createSession()
  .then(
    response => {
      // Do stuff with the response
      return bigTime.getStaffList();
    }
  )
  .then(
    response => {
      // Do stuff with the response
    }
  )
```


## Tests

`npm test`

```
-------------------------|----------|----------|----------|----------|----------------|
File                     |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------------|----------|----------|----------|----------|----------------|
All files                |      100 |      100 |      100 |      100 |                |
 src                     |      100 |      100 |      100 |      100 |                |
  base.js                |      100 |      100 |      100 |      100 |                |
  endpoint.js            |      100 |      100 |      100 |      100 |                |
  http-request.js        |      100 |      100 |      100 |      100 |                |
 src/util                |      100 |      100 |      100 |      100 |                |
  get-current-date.js    |      100 |      100 |      100 |      100 |                |
  index.js               |      100 |      100 |      100 |      100 |                |
  populate-url-params.js |      100 |      100 |      100 |      100 |                |
-------------------------|----------|----------|----------|----------|----------------|
```

## Documentation

`npm run docs`

![](./images/jsdoc.png)

## Linting
Refer to the [ESLint docs](https://eslint.org/docs/rules/) and [.eslintrc.json](./.eslintrc.json) for rules.

`npm run lint`

## To Do
- [ ] Normalize `HttpRequest[method]` signatures
- [ ] Use `async`/`await`
- [ ] Namespace resources (`bigTime.picklists.staff()`, etc.)
- [ ] Add timer endpoints
- [ ] Add weekly start date endpoints
- [ ] Add expense endpoints
- [ ] Add projects endpoints
- [ ] Add tasks endpoints
- [ ] Add invoice endpoints
- [ ] Add transaction endpoints
