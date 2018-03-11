# BigTime SDK
Node wrapper for interacting with the [BigTime API](http://iq.bigtime.net/BigtimeData/api/v2/help/Overview).

[![Travis CI Build Status](https://travis-ci.org/john-goldsmith/bigtime-sdk.svg?branch=master)](https://travis-ci.org/john-goldsmith/bigtime-sdk)
[![npm version](https://badge.fury.io/js/bigtime-sdk.svg)](https://badge.fury.io/js/bigtime-sdk)
[![Code Climate Maintainability](https://api.codeclimate.com/v1/badges/373d61ec523888da1663/maintainability)](https://codeclimate.com/github/john-goldsmith/bigtime-sdk/maintainability)
[![Code Climate Test Coverage](https://api.codeclimate.com/v1/badges/373d61ec523888da1663/test_coverage)](https://codeclimate.com/github/john-goldsmith/bigtime-sdk/test_coverage)
[![Coveralls Coverage Status](https://coveralls.io/repos/github/john-goldsmith/bigtime-sdk/badge.svg)](https://coveralls.io/github/john-goldsmith/bigtime-sdk)

## Installation

`npm install --save bigtime-sdk`

## Tests

`npm test`

## Documentation

`npm run docs`

## Linting

`npm run lint`

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

## To Do
- Normalize `HttpRequest[method]` signatures
- Use `async`/`await`
- Namespace resources (`bigTime.picklists.staff()`, etc.)
- Add more endpoints:
  - Timers
  - Weekly start date
  - Expense entries
  - Projects
  - Tasks
  - Invoices
  - Transactions