/*
// import Api from './src/api'

// export default Api.BaseApi

import BigTimeApi from './src/api/bigtime-api'

(async () => {
  const b = new BigTimeApi()
  const res1 = await b.sessionsApi.create('john.goldsmith@verys.com', 'Verys123')
  console.log(b.sessionToken)
  const res2 = await b.sessionsApi.create('john.goldsmith@verys.com', 'Verys123')
})()

/*const b = new BigTimeApi()
b.firm = 'verys'
console.log(b.sessionsApi.firm)*

export default BigTimeApi*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseApi = /** @class */ (function () {
    function BaseApi() {
        this.foo = 1;
        // console.log('this BaseApi', this)
    }
    return BaseApi;
}());
var BigTimeApi = /** @class */ (function (_super) {
    __extends(BigTimeApi, _super);
    function BigTimeApi() {
        var _this = _super.call(this) || this;
        // console.log('this BigTimeApi', this)
        _this.sessionsApi = new SessionsApi();
        return _this;
    }
    return BigTimeApi;
}(BaseApi));
var SessionsApi = /** @class */ (function (_super) {
    __extends(SessionsApi, _super);
    function SessionsApi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // constructor() {
    //   super()
    // }
    SessionsApi.prototype.action = function () {
        console.log('setting foo...');
        console.log('this SessionsApi', this);
        // this.foo = 2
        _super.prototype.foo = 2;
        // console.log('ajlsd', this.foo)
    };
    return SessionsApi;
}(BaseApi));
var b = new BigTimeApi();
console.log('a', b);
console.log('b', b.foo);
console.log('c', b.sessionsApi.foo);
b.sessionsApi.action();
console.log('a', b);
console.log('b', b.foo);
console.log('c', b.sessionsApi.foo);
