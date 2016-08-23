# BigTime SDK
Node wrapper for interacting with the [BigTime API](http://iq.bigtime.net/BigtimeData/api/v2/help/Overview).

## Installation

`npm i -D bigtime-sdk`

## Usage

```js
const BigTime = require('bigtime-sdk');

const bigTime = new BigTime({
  username: [YOUR_USERNAME_HERE],
  password: [YOUR_PASSWORD_HERE]
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

# To Do
- Tests
- Add more endpoints:
  - Picklists
  - Timers
  - Weekly start date
  - Expense entries
  - Projects
  - Tasks
  - Invoices
  - Reports
  - Transactions