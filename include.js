/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = promisify;
const instances = [];

/**
 * @class Deferred
 */
class Deferred {
  /**
     * @param {Boolean} idRequired
     * @constructor
     */
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = (...args) => {
        resolve(...args);
        Deferred.removeById(this.id);
        return this.promise;
      };
      this.reject = (...args) => {
        reject(...args);
        Deferred.removeById(this.id);
        return this.promise;
      };
    });

    this.id = instances.push(this) - 1;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Deferred;


/**
 * @param {DeferredCaller} deferredCaller
 * @param {any} data
 * @return {any}
 */
Deferred.runByType = function runByType(deferredCaller, data) {
  const { id, type } = deferredCaller;
  const deferred = instances[id];

  if (!deferred) {
    return false;
  }
  if (type === "resolve") {
    return deferred.resolve(data);
  } else if (type === "reject") {
    return deferred.reject(data);
  } else {
    return removeById(id);
  }
};

/**
     * @param {number} id
     * @return {boolean}
     */
Deferred.removeById = function removeById(id) {
  delete instances[id];
};

/**
 *
 * @param {Function} fn
 * @return {Promise}
 */
function promisify(fn) {
  return ({ args }) => {
    const deferred = new Deferred();
    fn(...args, deferred.resolve);
    return deferred.promise;
  };
}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const id = 1502896887588.695 || "";

const CONTENT = `content${id}`;
/* harmony export (immutable) */ __webpack_exports__["b"] = CONTENT;

const INCLUDE = `include${id}`;
/* harmony export (immutable) */ __webpack_exports__["d"] = INCLUDE;

const BACKGROUND = `background${id}`;
/* harmony export (immutable) */ __webpack_exports__["a"] = BACKGROUND;


const INCLUDE_SEND = `chromex--${INCLUDE}--send-message`;
/* harmony export (immutable) */ __webpack_exports__["e"] = INCLUDE_SEND;

const CONTENT_SEND = `chromex--${CONTENT}--send-message`;
/* harmony export (immutable) */ __webpack_exports__["c"] = CONTENT_SEND;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__deferred__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__handler__ = __webpack_require__(3);



/**
 * @class Channel
 */
class Channel {
  /**
   * 
   * @param {*} data 
   * @param {*} to 
   * @param {*} from 
   * @param {*} port 
   */
  send(data, to, from, port = null) {
    return Promise.resolve();
  }

  /**
     * @method onmessage
     * @param {any} response
     * @param {any} port
     * @return {any}
     */
  _onMessage(response, port) {
    const { data, deferred, from } = response;
    const { handler } = data;
    const self = this;

    if (!handler) {
      return __WEBPACK_IMPORTED_MODULE_0__deferred__["a" /* default */].runByType(data.deferred, data.result);
    }

    if (port) {
      data.tab = port.sender.tab;
    }

    const resultHandle = type => {
      return result => {
        return self.send({ result, deferred: { id: deferred.id, type } }, from, undefined, port);
      };
    };

    return __WEBPACK_IMPORTED_MODULE_1__handler__["a" /* default */].callHandler(handler, data).then(resultHandle("resolve")).catch(resultHandle("reject"));
  }

  /**
     * @param {{handler: string, args: Array}} param0 
     * @return {Promise}
     */
  self({ handler, args }) {
    const deferred = new __WEBPACK_IMPORTED_MODULE_0__deferred__["a" /* default */]();
    return __WEBPACK_IMPORTED_MODULE_1__handler__["a" /* default */].callHandler(handler, {
      args
    }).then(deferred.resolve).catch(deferred.reject);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Channel;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const handlers = {};

/**
 * @class ChannelHandler
 */
class ChannelHandler {
  /**
   * @constructor
   * @param {ChannelHandlerStruct} handler
   */
  constructor(handler) {
    this.handler = handler.handler;
    this.name = handler.name;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ChannelHandler;


/**
   * @param {ChannerlHanlder} handler
   */
ChannelHandler.addHandler = handler => handlers[handler.name] = handler.handler;

/**
   * @param {Array} handlers
   */
ChannelHandler.addHandlers = (...handlers) => handlers.forEach(ChannelHandler.addHandler);

/**
   * @param {ChannerlHanlder} handler
   * @param {any} data
   * @return {Promise}
   */
ChannelHandler.callHandler = (handler, data) => {
  if (!handler) {
    return Promise.reject(new Error());
  }
  const name = typeof handler === "string" ? handler : handler.name;
  const handlerFunc = handlers[name];

  if (typeof handlerFunc !== "function") {
    return Promise.reject(new Error("Not implemented"));
  }
  return handlerFunc(data);
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * @param {string} eventType
 * @param {any} data
 * @param {any} el
 * @return {any}
 */
const triggerCustomEvent = (eventType, data, el = window.document) => el.dispatchEvent(new CustomEvent(eventType, {
  detail: data
}));
/* harmony export (immutable) */ __webpack_exports__["b"] = triggerCustomEvent;


/**
 * @param {string} type
 * @param {Function} handler
 * @param {any} el
 * @return {any}
 */
const bindCustomEvent = (type, handler, el = window.document) => el.addEventListener(type, handler);
/* harmony export (immutable) */ __webpack_exports__["a"] = bindCustomEvent;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__content__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__include__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__handler__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__deferred__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__background__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__content__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__include__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__handler__["a"]; });
/* unused harmony reexport Deferred */






__WEBPACK_IMPORTED_MODULE_4__deferred__["a" /* default */].promisify = __WEBPACK_IMPORTED_MODULE_4__deferred__["b" /* promisify */];



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__channel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__deferred__ = __webpack_require__(0);





/**
 * @class PortManager
 */
class PortManager {
  constructor() {
    this.ports = {};
    this._current = null;
  }

  /**
   * @param {any} cur
   */
  set current(cur) {
    if (cur) {
      this._current = cur;
      return;
    }

    const lastPort = Object.keys(this.ports).sort().shift();
    this._current = lastPort ? this.ports[lastPort] : null;
  }

  /**
   * 
   */
  get current() {
    return this._current;
  }

  /**
   * @param {*} port 
   */
  push(port) {
    this.ports[port.sender.tab.id] = port;
    this.current = port;
  }

  /**
   * @param {*} port 
   */
  remove(port) {
    if (this.current === port) {
      this.current = null;
    }
    delete this.ports[port.sender.tab.id];
  }

  /**
   * @param {*} clb
   * @return {Array<Promise<any>>}
   */
  all(clb) {
    return Object.values(this.ports).map(clb);
  }
}

const ports = new PortManager();

/**
 * @class BackgroundChannel
 */
class BackgroundChannel extends __WEBPACK_IMPORTED_MODULE_1__channel__["a" /* default */] {
  /**
   * @method connect
   */
  connect() {
    window.chrome.runtime.onConnect.addListener(port => {
      port.onMessage.addListener(this._onMessage.bind(this));
      port.onDisconnect.addListener(() => ports.remove(port));
      ports.push(port);
    });
  }

  /**
     * @param {any} data
     * @param {number} to
     * @param {number} from
     * @param {any} port
     * @return {Promise<any>}
     */
  send(data, to, from = __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BACKGROUND */], port = null) {
    const deferred = new __WEBPACK_IMPORTED_MODULE_2__deferred__["a" /* default */](true);
    const params = {
      from,
      to,
      data,
      deferred: { id: deferred.id }
    };

    if (port) {
      port.postMessage(params);
    } else if (ports.current) {
      ports.current.postMessage(params);
    } else {
      deferred.reject();
    }
    return deferred.promise;
  }

  /**
     * @param {any} data
     * @param {number} to
     * @return {Promise<any>}
     */
  send2All(data, to) {
    return Promise.all(ports.all(port => this.send(data, to, __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BACKGROUND */], port)));
  }

  /**
     * @param {any} data
     * @return {Promise}
     */
  sendToAllContent(data) {
    return this.send2All(data, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CONTENT */]);
  }

  /**
     * @param {any} data
     * @return {Promise}
     */
  sendToAllInclude(data) {
    return this.send2All(data, __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* INCLUDE */]);
  }
  /**
     * @param {any} data
     * @return {Promise}
     */
  sendToContent(data) {
    return this.send(data, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CONTENT */]);
  }
  /**
     * @param {any} data
     * @return {Promise}
     */
  sendToInclude(data) {
    return this.send(data, __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* INCLUDE */]);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackgroundChannel;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deferred__ = __webpack_require__(0);






let disconnected = false;

/**
 * @class Content
 */
class ContentChannel extends __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* default */] {
  /**
     * @method connect
     */
  connect() {
    if (disconnected) {
      return;
    }
    Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* bindCustomEvent */])(__WEBPACK_IMPORTED_MODULE_0__constants__["e" /* INCLUDE_SEND */], e => this.onMessage(JSON.parse(e.detail)));

    this.port = window.chrome.runtime.connect();
    this.port.onMessage.addListener(this.onMessage.bind(this));
    this.port.onDisconnect.addListener(() => disconnected = true);
  }

  /**
     * @param {any} response
     * @return {any}
     */
  onMessage(response) {
    const { from, to } = response;

    switch (to) {
      case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CONTENT */]:
        return this._onMessage(response);
      case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BACKGROUND */]:
      case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* INCLUDE */]:
      default:
        return this.send(response, to, from);
    }
  }

  /**
     * @param {Object} data
     * @param {Number} to
     * @param {Number} from
     * @param {any} port
     * @return {Promise}
     * @method send
     */
  send(data, to, from = __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CONTENT */], port) {
    let params;

    const deferred = new __WEBPACK_IMPORTED_MODULE_3__deferred__["a" /* default */](true);

    switch (from) {
      case __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CONTENT */]:
        params = { data, to, from, deferred: { id: deferred.id } };
        break;
      case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BACKGROUND */]:
      case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* INCLUDE */]:
      default:
        params = data;
        deferred.resolve(`Resend from ${from || ""} to ${to}`);
        break;
    }

    switch (to) {
      case __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* INCLUDE */]:
        Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["b" /* triggerCustomEvent */])(__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* CONTENT_SEND */], JSON.stringify(params));
        break;
      case __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BACKGROUND */]:
        if (disconnected) {
          return deferred.reject();
        }
        this.port.postMessage(params);
        break;
      default:
        break;
    }
    return deferred.promise;
  }

  /**
     * @method sendToInclude
     * @param {any} data
     * @return {Promise}
     */
  sendToInclude(data) {
    return this.send(data, __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* INCLUDE */]);
  }
  /**
     * @method sendToBackground
     * @param {any} data
     * @return {Promise}
     */
  sendToBackground(data) {
    return this.send(data, __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BACKGROUND */]);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ContentChannel;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__channel__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__deferred__ = __webpack_require__(0);







/**
 * @class Include
 */
class IncludeChannel extends __WEBPACK_IMPORTED_MODULE_2__channel__["a" /* default */] {
  /**
     * @method connect
     * @return {any}
     */
  connect() {
    return Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["a" /* bindCustomEvent */])(__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* CONTENT_SEND */], e => this.onMessage(JSON.parse(e.detail) || {}));
  }

  /**
     * @method onMessage
     * @param {Object|null} response
     * @return {any}
     */
  onMessage(response) {
    return this._onMessage(response);
  }

  /**
     * @method send
     * @param {any} data
     * @param {number} to
     * @param {number} from
     * @param {?Object} port
     * @return {Promise}
     */
  send(data, to, from = __WEBPACK_IMPORTED_MODULE_0__constants__["d" /* INCLUDE */], port) {
    const deferred = new __WEBPACK_IMPORTED_MODULE_3__deferred__["a" /* default */](true);
    const params = {
      data,
      to,
      from,
      deferred: { id: deferred.id }
    };
    Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["b" /* triggerCustomEvent */])(__WEBPACK_IMPORTED_MODULE_0__constants__["e" /* INCLUDE_SEND */], JSON.stringify(params));
    return deferred.promise;
  }

  /**
     * @param {any} data
     * @method sendToBackground
     * @return {Promise}
     */
  sendToBackground(data) {
    return this.send(data, __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* BACKGROUND */]);
  }
  /**
     * @param {any} data
     * @method sendToContent
     * @return {Promise}
     */
  sendToContent(data) {
    return this.send(data, __WEBPACK_IMPORTED_MODULE_0__constants__["b" /* CONTENT */]);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = IncludeChannel;


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chrome_ex__ = __webpack_require__(5);


const chan = new __WEBPACK_IMPORTED_MODULE_0_chrome_ex__["d" /* IncludeChannel */]();
chan.connect();

__WEBPACK_IMPORTED_MODULE_0_chrome_ex__["b" /* ChannelHandler */].addHandlers(new __WEBPACK_IMPORTED_MODULE_0_chrome_ex__["b" /* ChannelHandler */]({
  name: "makeSomething",
  handler: () => Promise.resolve("Hi from include")
}));

window.getSomeData = async () => {
  console.log((await Promise.all([chan.sendToContent({
    handler: "makeSomething"
  }), chan.sendToBackground({
    handler: "makeSomething"
  })])));
};

/***/ })
/******/ ]);