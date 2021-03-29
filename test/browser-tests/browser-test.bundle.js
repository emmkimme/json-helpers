(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (Buffer){(function (){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uint8ArrayJSONFormatter = exports.BufferBinaryJSONFormatter = exports.BufferJSONFormatter = exports.TypeErrorJSONFormatter = exports.ErrorJSONFormatter = exports.DateJSONFormatter = void 0;
exports.DateJSONFormatter = {
    objectType: 'Date',
    objectConstructor: globalThis.Date,
    serialize: (t) => t.valueOf(),
    unserialize: (data) => new Date(data)
};
exports.ErrorJSONFormatter = {
    objectType: 'Error',
    objectConstructor: globalThis.Error,
    serialize: (t) => t.message,
    unserialize: (data) => new Error(data)
};
exports.TypeErrorJSONFormatter = {
    objectType: 'TypeError',
    objectConstructor: globalThis.TypeError,
    serialize: (t) => t.message,
    unserialize: (data) => new TypeError(data)
};
exports.BufferJSONFormatter = {
    objectType: 'Buffer',
    objectConstructor: Buffer,
    serialize: null,
    unserialize: (data) => Buffer.from(data)
};
exports.BufferBinaryJSONFormatter = {
    objectType: 'Buffer',
    objectConstructor: Buffer,
    serialize: (t) => t.toString('binary'),
    unserialize: (data) => Buffer.from(data, 'binary')
};
exports.Uint8ArrayJSONFormatter = {
    objectType: 'Uint8Array',
    objectConstructor: Uint8Array,
    serialize: (t) => Buffer.from(t.buffer).toString('binary'),
    unserialize: (data) => {
        const buffer = Buffer.from(data, 'binary');
        return new Uint8Array(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.length));
    }
};

}).call(this)}).call(this,require("buffer").Buffer)
},{"buffer":14}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParserImpl = void 0;
const json_replacer_tojson_impl_1 = require("./json-replacer-tojson-impl");
const json_reviver_impl_1 = require("./json-reviver-impl");
class JSONParserImpl {
    constructor() {
        this._jsonReplacerToJSON = new json_replacer_tojson_impl_1.JSONReplacerToJSONImpl();
        this._jsonReviver = new json_reviver_impl_1.JSONReviverImpl();
    }
    reviver(reviver) {
        this._jsonReviver.reviver(reviver);
    }
    replacer(replacer) {
        this._jsonReplacerToJSON.replacer(replacer);
    }
    formatter(jsonFormatter) {
        this._jsonReplacerToJSON.replacer(jsonFormatter);
        this._jsonReviver.reviver(jsonFormatter);
    }
    install() {
        this._jsonReplacerToJSON.install();
    }
    uninstall() {
        this._jsonReplacerToJSON.uninstall();
    }
    stringify(value, replacer, space) {
        return this._jsonReplacerToJSON.stringify(value, replacer, space);
    }
    parse(text, reviver) {
        return this._jsonReviver.parse(text, reviver);
    }
}
exports.JSONParserImpl = JSONParserImpl;

},{"./json-replacer-tojson-impl":8,"./json-reviver-impl":9}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParserTest = void 0;
const json_formatter_default_1 = require("./json-formatter-default");
const json_parser_impl_1 = require("./json-parser-impl");
const json_replacer_instanceof_impl_1 = require("./json-replacer-instanceof-impl");
class JSONParserTestImpl extends json_parser_impl_1.JSONParserImpl {
    constructor() {
        super();
        this._jsonReplacerInstanceOf = new json_replacer_instanceof_impl_1.JSONReplacerInstanceOfImpl();
        this.formatter(json_formatter_default_1.DateJSONFormatter);
        this.formatter(json_formatter_default_1.ErrorJSONFormatter);
        this.formatter(json_formatter_default_1.TypeErrorJSONFormatter);
        this.formatter(json_formatter_default_1.BufferJSONFormatter);
        this.formatter(json_formatter_default_1.Uint8ArrayJSONFormatter);
    }
    formatter(jsonFormatter) {
        super.formatter(jsonFormatter);
        this._jsonReplacerInstanceOf.replacer(jsonFormatter);
    }
    stringify(value, replacer, space) {
        return this._jsonReplacerInstanceOf.stringify(value, replacer, space);
    }
}
exports.JSONParserTest = new JSONParserTestImpl();

},{"./json-formatter-default":1,"./json-parser-impl":2,"./json-replacer-instanceof-impl":7}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParser = exports.JSONParserV1 = void 0;
const json_formatter_default_1 = require("./json-formatter-default");
const json_parser_impl_1 = require("./json-parser-impl");
class JSONParserV1Impl extends json_parser_impl_1.JSONParserImpl {
    constructor() {
        super();
        this.formatter(json_formatter_default_1.DateJSONFormatter);
        this.formatter(json_formatter_default_1.ErrorJSONFormatter);
        this.formatter(json_formatter_default_1.TypeErrorJSONFormatter);
        this.formatter(json_formatter_default_1.BufferJSONFormatter);
        this.formatter(json_formatter_default_1.Uint8ArrayJSONFormatter);
    }
}
exports.JSONParserV1 = new JSONParserV1Impl();
exports.JSONParser = exports.JSONParserV1;

},{"./json-formatter-default":1,"./json-parser-impl":2}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONParserV2 = void 0;
const json_formatter_default_1 = require("./json-formatter-default");
const json_parser_impl_1 = require("./json-parser-impl");
class JSONParserV2Impl extends json_parser_impl_1.JSONParserImpl {
    constructor() {
        super();
        this.formatter(json_formatter_default_1.DateJSONFormatter);
        this.formatter(json_formatter_default_1.ErrorJSONFormatter);
        this.formatter(json_formatter_default_1.TypeErrorJSONFormatter);
        this.formatter(json_formatter_default_1.BufferBinaryJSONFormatter);
        this.formatter(json_formatter_default_1.Uint8ArrayJSONFormatter);
    }
}
exports.JSONParserV2 = new JSONParserV2Impl();

},{"./json-formatter-default":1,"./json-parser-impl":2}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsJSONLike = exports.ToJSONConstants = void 0;
var ToJSONConstants;
(function (ToJSONConstants) {
    ToJSONConstants.JSON_TOKEN_UNDEFINED = '_/undefined/_';
})(ToJSONConstants = exports.ToJSONConstants || (exports.ToJSONConstants = {}));
function IsJSONLike(obj) {
    return ((typeof obj === 'object') && obj.stringify && obj.parse);
}
exports.IsJSONLike = IsJSONLike;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONReplacerInstanceOfImpl = void 0;
const json_parser_1 = require("./json-parser");
function getObjectClass(constructor) {
    if (typeof constructor === 'function') {
        if (constructor.name) {
            return constructor.name;
        }
        const str = constructor.toString();
        if (str.charAt(0) == '[') {
            return str.subst(8, str.length - 1);
        }
        else {
            const arr = str.match(/function\s*(\w+)/);
            if (arr && arr.length == 2) {
                return arr[1];
            }
        }
    }
    return null;
}
class JSONReplacerSetup {
    constructor(replacer) {
        this.objectType = replacer.objectType;
        this.objectConstructor = replacer.objectConstructor;
        this.serialize = replacer.serialize;
        this.objectClass = getObjectClass(this.objectConstructor);
    }
    toJSON(obj) {
        return { type: this.objectType, data: this.serialize(obj) };
    }
}
class JSONReplacerInstanceOfImpl {
    constructor() {
        this._jsonReplacerSetupsMap = new Map();
        this._replacer = this._replacer.bind(this);
    }
    replacer(replacer) {
        const setup = new JSONReplacerSetup(replacer);
        if (replacer.serialize) {
            this._jsonReplacerSetupsMap.set(setup.objectClass, setup);
        }
        else {
            this._jsonReplacerSetupsMap.delete(setup.objectClass);
        }
    }
    _replacer(key, value) {
        if (typeof key === 'undefined') {
            return json_parser_1.ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        if ((typeof value === 'object') && value && value.constructor) {
            const objectClass = getObjectClass(value.constructor);
            if (objectClass) {
                const format = this._jsonReplacerSetupsMap.get(objectClass);
                if (format) {
                    return format.toJSON(value);
                }
            }
        }
        return value;
    }
    _replacerChain(replacer, key, value) {
        if (typeof key === 'undefined') {
            return json_parser_1.ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        if (value && value.constructor) {
            const objectClass = getObjectClass(value.constructor);
            if (objectClass) {
                const format = this._jsonReplacerSetupsMap.get(objectClass);
                if (format) {
                    return format.toJSON(value);
                }
            }
        }
        return replacer(key, value);
    }
    stringify(value, replacer, space) {
        const replacerCb = replacer ? this._replacerChain.bind(this, replacer) : this._replacer;
        return JSON.stringify(value, replacerCb, space);
    }
}
exports.JSONReplacerInstanceOfImpl = JSONReplacerInstanceOfImpl;

},{"./json-parser":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONReplacerToJSONImpl = void 0;
const json_parser_1 = require("./json-parser");
function findFunctionPrototype(objectConstructor, name) {
    let proto = objectConstructor.prototype;
    let toJSONDescriptor = Object.getOwnPropertyDescriptor(proto, name);
    if (toJSONDescriptor) {
        return [proto, toJSONDescriptor];
    }
    else {
        proto = Object.getPrototypeOf(objectConstructor);
        while (proto) {
            toJSONDescriptor = Object.getOwnPropertyDescriptor(proto, name);
            if (toJSONDescriptor) {
                return [proto, toJSONDescriptor];
            }
            proto = Object.getPrototypeOf(proto);
        }
    }
    return null;
}
class JSONReplacerSetup {
    constructor(replacer) {
        this.objectType = replacer.objectType;
        this.objectConstructor = replacer.objectConstructor;
        this.serialize = replacer.serialize;
        const objectConstructor = this.objectConstructor;
        this._toOriginalDescriptor = findFunctionPrototype(objectConstructor, 'toJSON');
        if (this._toOriginalDescriptor == null) {
            this._toOriginalDescriptor = [
                objectConstructor.prototype,
                {
                    value: undefined,
                    configurable: true,
                    enumerable: false,
                    writable: true
                }
            ];
        }
        if (this.serialize) {
            const self = this;
            this._toJSONDescriptor = {
                value: function () {
                    return { type: self.objectType, data: self.serialize(this) };
                },
                configurable: true,
                enumerable: false,
                writable: true
            };
        }
    }
    install() {
        if (this.serialize) {
            try {
                Object.defineProperty(this._toOriginalDescriptor[0], 'toJSON', this._toJSONDescriptor);
            }
            catch (err) {
                console.error(`${err}`);
            }
        }
    }
    uninstall() {
        if (this.serialize) {
            try {
                Object.defineProperty(this._toOriginalDescriptor[0], 'toJSON', this._toOriginalDescriptor[1]);
            }
            catch (err) {
            }
        }
    }
}
class JSONReplacerToJSONImpl {
    constructor() {
        this._jsonReplacerSetupsMap = new Map();
        this._installed = 0;
        this._replacer = this._replacer.bind(this);
    }
    replacer(replacer) {
        const setup = new JSONReplacerSetup(replacer);
        if (replacer.serialize) {
            this._jsonReplacerSetupsMap.set(setup.objectConstructor, setup);
        }
        else {
            this._jsonReplacerSetupsMap.delete(setup.objectConstructor);
        }
    }
    _replacer(key, value) {
        if (typeof key === 'undefined') {
            return json_parser_1.ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return value;
    }
    _replacerChain(replacer, key, value) {
        if (typeof key === 'undefined') {
            return json_parser_1.ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return replacer(key, value);
    }
    install() {
        if (this._installed++ === 0) {
            this._jsonReplacerSetupsMap.forEach((item) => {
                item.install();
            });
        }
    }
    uninstall() {
        if (--this._installed === 0) {
            this._jsonReplacerSetupsMap.forEach((item) => {
                item.uninstall();
            });
        }
    }
    stringify(value, replacer, space) {
        try {
            this.install();
            const replacerCb = replacer ? this._replacerChain.bind(this, replacer) : this._replacer;
            const result = JSON.stringify(value, replacerCb, space);
            this.uninstall();
            return result;
        }
        catch (err) {
            this.uninstall();
            throw err;
        }
    }
}
exports.JSONReplacerToJSONImpl = JSONReplacerToJSONImpl;

},{"./json-parser":6}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSONReviverImpl = void 0;
const json_parser_1 = require("./json-parser");
class JSONReviverImpl {
    constructor() {
        this._jsonReviversMap = new Map();
        this._reviver = this._reviver.bind(this);
    }
    reviver(reviver) {
        if (reviver.unserialize) {
            this._jsonReviversMap.set(reviver.objectType, reviver);
        }
        else {
            this._jsonReviversMap.delete(reviver.objectType);
        }
    }
    _reviver(key, value) {
        if (value) {
            if (value === json_parser_1.ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            if ((typeof value.type === 'string') && ('data' in value)) {
                const format = this._jsonReviversMap.get(value.type);
                if (format) {
                    return format.unserialize(value.data);
                }
            }
        }
        return value;
    }
    _reviverChain(reviver, key, value) {
        if (value) {
            if (value === json_parser_1.ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            if ((typeof value.type === 'string') && ('data' in value)) {
                const format = this._jsonReviversMap.get(value.type);
                if (format) {
                    return format.unserialize(value.data);
                }
            }
        }
        return reviver(key, value);
    }
    parse(text, reviver) {
        const reviverCb = reviver ? this._reviverChain.bind(this, reviver) : this._reviver;
        return JSON.parse(text, reviverCb);
    }
}
exports.JSONReviverImpl = JSONReviverImpl;

},{"./json-parser":6}],10:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./json-helpers-common"), exports);

},{"./json-helpers-common":11}],11:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./code/json-parser"), exports);
__exportStar(require("./code/json-parser-v1"), exports);
__exportStar(require("./code/json-parser-v2"), exports);
__exportStar(require("./code/json-parser-test"), exports);

},{"./code/json-parser":6,"./code/json-parser-test":3,"./code/json-parser-v1":4,"./code/json-parser-v2":5}],12:[function(require,module,exports){
/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
};

/*!
 * Primary Exports
 */

module.exports = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || AssertionError;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  } else {
    try {
      throw new Error();
    } catch(e) {
      this.stack = e.stack;
    }
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};

},{}],13:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],14:[function(require,module,exports){
(function (Buffer){(function (){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this)}).call(this,require("buffer").Buffer)
},{"base64-js":13,"buffer":14,"ieee754":51}],15:[function(require,module,exports){
module.exports = require('./lib/chai');

},{"./lib/chai":16}],16:[function(require,module,exports){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];

/*!
 * Chai version
 */

exports.version = '4.3.0';

/*!
 * Assertion Error
 */

exports.AssertionError = require('assertion-error');

/*!
 * Utils for plugins (not exported)
 */

var util = require('./chai/utils');

/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(exports, util);
    used.push(fn);
  }

  return exports;
};

/*!
 * Utility Functions
 */

exports.util = util;

/*!
 * Configuration
 */

var config = require('./chai/config');
exports.config = config;

/*!
 * Primary `Assertion` prototype
 */

var assertion = require('./chai/assertion');
exports.use(assertion);

/*!
 * Core Assertions
 */

var core = require('./chai/core/assertions');
exports.use(core);

/*!
 * Expect interface
 */

var expect = require('./chai/interface/expect');
exports.use(expect);

/*!
 * Should interface
 */

var should = require('./chai/interface/should');
exports.use(should);

/*!
 * Assert interface
 */

var assert = require('./chai/interface/assert');
exports.use(assert);

},{"./chai/assertion":17,"./chai/config":18,"./chai/core/assertions":19,"./chai/interface/assert":20,"./chai/interface/expect":21,"./chai/interface/should":22,"./chai/utils":37,"assertion-error":12}],17:[function(require,module,exports){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var config = require('./config');

module.exports = function (_chai, util) {
  /*!
   * Module dependencies.
   */

  var AssertionError = _chai.AssertionError
    , flag = util.flag;

  /*!
   * Module export.
   */

  _chai.Assertion = Assertion;

  /*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */

  function Assertion (obj, msg, ssfi, lockSsfi) {
    flag(this, 'ssfi', ssfi || Assertion);
    flag(this, 'lockSsfi', lockSsfi);
    flag(this, 'object', obj);
    flag(this, 'message', msg);

    return util.proxify(this);
  }

  Object.defineProperty(Assertion, 'includeStack', {
    get: function() {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      return config.includeStack;
    },
    set: function(value) {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      config.includeStack = value;
    }
  });

  Object.defineProperty(Assertion, 'showDiff', {
    get: function() {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      return config.showDiff;
    },
    set: function(value) {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      config.showDiff = value;
    }
  });

  Assertion.addProperty = function (name, fn) {
    util.addProperty(this.prototype, name, fn);
  };

  Assertion.addMethod = function (name, fn) {
    util.addMethod(this.prototype, name, fn);
  };

  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  Assertion.overwriteProperty = function (name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };

  Assertion.overwriteMethod = function (name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };

  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  /**
   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String|Function} message or function that returns message to display if expression fails
   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
   * @api private
   */

  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (false !== showDiff) showDiff = true;
    if (undefined === expected && undefined === _actual) showDiff = false;
    if (true !== config.showDiff) showDiff = false;

    if (!ok) {
      msg = util.getMessage(this, arguments);
      var actual = util.getActual(this, arguments);
      var assertionErrorObjectProperties = {
          actual: actual
        , expected: expected
        , showDiff: showDiff
      };

      var operator = util.getOperator(this, arguments);
      if (operator) {
        assertionErrorObjectProperties.operator = operator;
      }

      throw new AssertionError(
        msg,
        assertionErrorObjectProperties,
        (config.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };

  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

  Object.defineProperty(Assertion.prototype, '_obj',
    { get: function () {
        return flag(this, 'object');
      }
    , set: function (val) {
        flag(this, 'object', val);
      }
  });
};

},{"./config":18}],18:[function(require,module,exports){
module.exports = {

  /**
   * ### config.includeStack
   *
   * User configurable property, influences whether stack trace
   * is included in Assertion error message. Default of false
   * suppresses stack trace in the error message.
   *
   *     chai.config.includeStack = true;  // enable stack on error
   *
   * @param {Boolean}
   * @api public
   */

  includeStack: false,

  /**
   * ### config.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @param {Boolean}
   * @api public
   */

  showDiff: true,

  /**
   * ### config.truncateThreshold
   *
   * User configurable property, sets length threshold for actual and
   * expected values in assertion errors. If this threshold is exceeded, for
   * example for large data structures, the value is replaced with something
   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
   *
   * Set it to zero if you want to disable truncating altogether.
   *
   * This is especially userful when doing assertions on arrays: having this
   * set to a reasonable large value makes the failure messages readily
   * inspectable.
   *
   *     chai.config.truncateThreshold = 0;  // disable truncating
   *
   * @param {Number}
   * @api public
   */

  truncateThreshold: 40,

  /**
   * ### config.useProxy
   *
   * User configurable property, defines if chai will use a Proxy to throw
   * an error when a non-existent property is read, which protects users
   * from typos when using property-based assertions.
   *
   * Set it to false if you want to disable this feature.
   *
   *     chai.config.useProxy = false;  // disable use of Proxy
   *
   * This feature is automatically disabled regardless of this config value
   * in environments that don't support proxies.
   *
   * @param {Boolean}
   * @api public
   */

  useProxy: true,

  /**
   * ### config.proxyExcludedKeys
   *
   * User configurable property, defines which properties should be ignored
   * instead of throwing an error if they do not exist on the assertion.
   * This is only applied if the environment Chai is running in supports proxies and
   * if the `useProxy` configuration setting is enabled.
   * By default, `then` and `inspect` will not throw an error if they do not exist on the
   * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
   * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
   *
   *     // By default these keys will not throw an error if they do not exist on the assertion object
   *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
   *
   * @param {Array}
   * @api public
   */

  proxyExcludedKeys: ['then', 'catch', 'inspect', 'toJSON']
};

},{}],19:[function(require,module,exports){
/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, _) {
  var Assertion = chai.Assertion
    , AssertionError = chai.AssertionError
    , flag = _.flag;

  /**
   * ### Language Chains
   *
   * The following are provided as chainable getters to improve the readability
   * of your assertions.
   *
   * **Chains**
   *
   * - to
   * - be
   * - been
   * - is
   * - that
   * - which
   * - and
   * - has
   * - have
   * - with
   * - at
   * - of
   * - same
   * - but
   * - does
   * - still
   *
   * @name language chains
   * @namespace BDD
   * @api public
   */

  [ 'to', 'be', 'been', 'is'
  , 'and', 'has', 'have', 'with'
  , 'that', 'which', 'at', 'of'
  , 'same', 'but', 'does', 'still' ].forEach(function (chain) {
    Assertion.addProperty(chain);
  });

  /**
   * ### .not
   *
   * Negates all assertions that follow in the chain.
   *
   *     expect(function () {}).to.not.throw();
   *     expect({a: 1}).to.not.have.property('b');
   *     expect([1, 2]).to.be.an('array').that.does.not.include(3);
   *
   * Just because you can negate any assertion with `.not` doesn't mean you
   * should. With great power comes great responsibility. It's often best to
   * assert that the one expected output was produced, rather than asserting
   * that one of countless unexpected outputs wasn't produced. See individual
   * assertions for specific guidance.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.equal(1); // Not recommended
   *
   * @name not
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('not', function () {
    flag(this, 'negate', true);
  });

  /**
   * ### .deep
   *
   * Causes all `.equal`, `.include`, `.members`, `.keys`, and `.property`
   * assertions that follow in the chain to use deep equality instead of strict
   * (`===`) equality. See the `deep-eql` project page for info on the deep
   * equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.keys([{a: 1}]);
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * @name deep
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('deep', function () {
    flag(this, 'deep', true);
  });

  /**
   * ### .nested
   *
   * Enables dot- and bracket-notation in all `.property` and `.include`
   * assertions that follow in the chain.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *     expect({'.a': {'[b]': 'x'}}).to.nested.include({'\\.a.\\[b\\]': 'x'});
   *
   * `.nested` cannot be combined with `.own`.
   *
   * @name nested
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('nested', function () {
    flag(this, 'nested', true);
  });

  /**
   * ### .own
   *
   * Causes all `.property` and `.include` assertions that follow in the chain
   * to ignore inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.property('b');
   *     expect({a: 1}).to.not.have.own.property('b');
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * `.own` cannot be combined with `.nested`.
   *
   * @name own
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('own', function () {
    flag(this, 'own', true);
  });

  /**
   * ### .ordered
   *
   * Causes all `.members` assertions that follow in the chain to require that
   * members be in the same order.
   *
   *     expect([1, 2]).to.have.ordered.members([1, 2])
   *       .but.not.have.ordered.members([2, 1]);
   *
   * When `.include` and `.ordered` are combined, the ordering begins at the
   * start of both arrays.
   *
   *     expect([1, 2, 3]).to.include.ordered.members([1, 2])
   *       .but.not.include.ordered.members([2, 3]);
   *
   * @name ordered
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ordered', function () {
    flag(this, 'ordered', true);
  });

  /**
   * ### .any
   *
   * Causes all `.keys` assertions that follow in the chain to only require that
   * the target have at least one of the given keys. This is the opposite of
   * `.all`, which requires that the target have all of the given keys.
   *
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name any
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('any', function () {
    flag(this, 'any', true);
    flag(this, 'all', false);
  });

  /**
   * ### .all
   *
   * Causes all `.keys` assertions that follow in the chain to require that the
   * target have all of the given keys. This is the opposite of `.any`, which
   * only requires that the target have at least one of the given keys.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` are
   * added earlier in the chain. However, it's often best to add `.all` anyway
   * because it improves readability.
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name all
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('all', function () {
    flag(this, 'all', true);
    flag(this, 'any', false);
  });

  /**
   * ### .a(type[, msg])
   *
   * Asserts that the target's type is equal to the given string `type`. Types
   * are case insensitive. See the `type-detect` project page for info on the
   * type detection algorithm: https://github.com/chaijs/type-detect.
   *
   *     expect('foo').to.be.a('string');
   *     expect({a: 1}).to.be.an('object');
   *     expect(null).to.be.a('null');
   *     expect(undefined).to.be.an('undefined');
   *     expect(new Error).to.be.an('error');
   *     expect(Promise.resolve()).to.be.a('promise');
   *     expect(new Float32Array).to.be.a('float32array');
   *     expect(Symbol()).to.be.a('symbol');
   *
   * `.a` supports objects that have a custom type set via `Symbol.toStringTag`.
   *
   *     var myObj = {
   *       [Symbol.toStringTag]: 'myCustomType'
   *     };
   *
   *     expect(myObj).to.be.a('myCustomType').but.not.an('object');
   *
   * It's often best to use `.a` to check a target's type before making more
   * assertions on the same target. That way, you avoid unexpected behavior from
   * any assertion that does different things based on the target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.a`. However, it's often best to
   * assert that the target is the expected type, rather than asserting that it
   * isn't one of many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.an('array'); // Not recommended
   *
   * `.a` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     expect(1).to.be.a('string', 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.a('string');
   *
   * `.a` can also be used as a language chain to improve the readability of
   * your assertions.
   *
   *     expect({b: 2}).to.have.a.property('b');
   *
   * The alias `.an` can be used interchangeably with `.a`.
   *
   * @name a
   * @alias an
   * @param {String} type
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function an (type, msg) {
    if (msg) flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object')
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

    this.assert(
        type === _.type(obj).toLowerCase()
      , 'expected #{this} to be ' + article + type
      , 'expected #{this} not to be ' + article + type
    );
  }

  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);

  /**
   * ### .include(val[, msg])
   *
   * When the target is a string, `.include` asserts that the given string `val`
   * is a substring of the target.
   *
   *     expect('foobar').to.include('foo');
   *
   * When the target is an array, `.include` asserts that the given `val` is a
   * member of the target.
   *
   *     expect([1, 2, 3]).to.include(2);
   *
   * When the target is an object, `.include` asserts that the given object
   * `val`'s properties are a subset of the target's properties.
   *
   *     expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
   *
   * When the target is a Set or WeakSet, `.include` asserts that the given `val` is a
   * member of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Set([1, 2])).to.include(2);
   *
   * When the target is a Map, `.include` asserts that the given `val` is one of
   * the values of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.include(2);
   *
   * Because `.include` does different things based on the target's type, it's
   * important to check the target's type before using `.include`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *
   * By default, strict (`===`) equality is used to compare array members and
   * object properties. Add `.deep` earlier in the chain to use deep equality
   * instead (WeakSet targets are not supported). See the `deep-eql` project
   * page for info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   * By default, all of the target's properties are searched when working with
   * objects. This includes properties that are inherited and/or non-enumerable.
   * Add `.own` earlier in the chain to exclude the target's inherited
   * properties from the search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * Note that a target object is always only searched for `val`'s own
   * enumerable properties.
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({a: {b: 2}}).to.deep.own.include({a: {b: 2}});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 2}}).to.nested.include({'\\.a.\\[b\\]': 2});
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}}).to.deep.nested.include({'a.b[0]': {c: 3}});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.include`.
   *
   *     expect('foobar').to.not.include('taco');
   *     expect([1, 2, 3]).to.not.include(4);
   *
   * However, it's dangerous to negate `.include` when the target is an object.
   * The problem is that it creates uncertain expectations by asserting that the
   * target object doesn't have all of `val`'s key/value pairs but may or may
   * not have some of them. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target object isn't even expected to have `val`'s keys, it's
   * often best to assert exactly that.
   *
   *     expect({c: 3}).to.not.have.any.keys('a', 'b'); // Recommended
   *     expect({c: 3}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * When the target object is expected to have `val`'s keys, it's often best to
   * assert that each of the properties has its expected value, rather than
   * asserting that each property doesn't have one of many unexpected values.
   *
   *     expect({a: 3, b: 4}).to.include({a: 3, b: 4}); // Recommended
   *     expect({a: 3, b: 4}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * `.include` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.include(4, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.include(4);
   *
   * `.include` can also be used as a language chain, causing all `.members` and
   * `.keys` assertions that follow in the chain to require the target to be a
   * superset of the expected set, rather than an identical set. Note that
   * `.members` ignores duplicates in the subset when `.include` is added.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * Note that adding `.any` earlier in the chain causes the `.keys` assertion
   * to ignore `.include`.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *
   * The aliases `.includes`, `.contain`, and `.contains` can be used
   * interchangeably with `.include`.
   *
   * @name include
   * @alias contain
   * @alias includes
   * @alias contains
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function SameValueZero(a, b) {
    return (_.isNaN(a) && _.isNaN(b)) || a === b;
  }

  function includeChainingBehavior () {
    flag(this, 'contains', true);
  }

  function include (val, msg) {
    if (msg) flag(this, 'message', msg);

    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate')
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , descriptor = isDeep ? 'deep ' : '';

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    var included = false;

    switch (objType) {
      case 'string':
        included = obj.indexOf(val) !== -1;
        break;

      case 'weakset':
        if (isDeep) {
          throw new AssertionError(
            flagMsg + 'unable to use .deep.include with WeakSet',
            undefined,
            ssfi
          );
        }

        included = obj.has(val);
        break;

      case 'map':
        var isEql = isDeep ? _.eql : SameValueZero;
        obj.forEach(function (item) {
          included = included || isEql(item, val);
        });
        break;

      case 'set':
        if (isDeep) {
          obj.forEach(function (item) {
            included = included || _.eql(item, val);
          });
        } else {
          included = obj.has(val);
        }
        break;

      case 'array':
        if (isDeep) {
          included = obj.some(function (item) {
            return _.eql(item, val);
          })
        } else {
          included = obj.indexOf(val) !== -1;
        }
        break;

      default:
        // This block is for asserting a subset of properties in an object.
        // `_.expectTypes` isn't used here because `.include` should work with
        // objects with a custom `@@toStringTag`.
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + 'the given combination of arguments ('
            + objType + ' and '
            + _.type(val).toLowerCase() + ')'
            + ' is invalid for this assertion. '
            + 'You can use an array, a map, an object, a set, a string, '
            + 'or a weakset instead of a '
            + _.type(val).toLowerCase(),
            undefined,
            ssfi
          );
        }

        var props = Object.keys(val)
          , firstErr = null
          , numErrs = 0;

        props.forEach(function (prop) {
          var propAssertion = new Assertion(obj);
          _.transferFlags(this, propAssertion, true);
          flag(propAssertion, 'lockSsfi', true);

          if (!negate || props.length === 1) {
            propAssertion.property(prop, val[prop]);
            return;
          }

          try {
            propAssertion.property(prop, val[prop]);
          } catch (err) {
            if (!_.checkError.compatibleConstructor(err, AssertionError)) {
              throw err;
            }
            if (firstErr === null) firstErr = err;
            numErrs++;
          }
        }, this);

        // When validating .not.include with multiple properties, we only want
        // to throw an assertion error if all of the properties are included,
        // in which case we throw the first property assertion error that we
        // encountered.
        if (negate && props.length > 1 && numErrs === props.length) {
          throw firstErr;
        }
        return;
    }

    // Assert inclusion in collection or substring in a string.
    this.assert(
      included
      , 'expected #{this} to ' + descriptor + 'include ' + _.inspect(val)
      , 'expected #{this} to not ' + descriptor + 'include ' + _.inspect(val));
  }

  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
  Assertion.addChainableMethod('includes', include, includeChainingBehavior);

  /**
   * ### .ok
   *
   * Asserts that the target is a truthy value (considered `true` in boolean context).
   * However, it's often best to assert that the target is strictly (`===`) or
   * deeply equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.ok; // Not recommended
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.be.ok; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.ok`.
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.not.be.ok; // Not recommended
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.ok; // Not recommended
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.be.ok; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.be.ok; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.ok;
   *
   * @name ok
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ok', function () {
    this.assert(
        flag(this, 'object')
      , 'expected #{this} to be truthy'
      , 'expected #{this} to be falsy');
  });

  /**
   * ### .true
   *
   * Asserts that the target is strictly (`===`) equal to `true`.
   *
   *     expect(true).to.be.true;
   *
   * Add `.not` earlier in the chain to negate `.true`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `true`.
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.true; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.true; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.true;
   *
   * @name true
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('true', function () {
    this.assert(
        true === flag(this, 'object')
      , 'expected #{this} to be true'
      , 'expected #{this} to be false'
      , flag(this, 'negate') ? false : true
    );
  });

  /**
   * ### .false
   *
   * Asserts that the target is strictly (`===`) equal to `false`.
   *
   *     expect(false).to.be.false;
   *
   * Add `.not` earlier in the chain to negate `.false`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `false`.
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.not.be.false; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.false; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(true, 'nooo why fail??').to.be.false;
   *
   * @name false
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('false', function () {
    this.assert(
        false === flag(this, 'object')
      , 'expected #{this} to be false'
      , 'expected #{this} to be true'
      , flag(this, 'negate') ? true : false
    );
  });

  /**
   * ### .null
   *
   * Asserts that the target is strictly (`===`) equal to `null`.
   *
   *     expect(null).to.be.null;
   *
   * Add `.not` earlier in the chain to negate `.null`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `null`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.null; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.null;
   *
   * @name null
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('null', function () {
    this.assert(
        null === flag(this, 'object')
      , 'expected #{this} to be null'
      , 'expected #{this} not to be null'
    );
  });

  /**
   * ### .undefined
   *
   * Asserts that the target is strictly (`===`) equal to `undefined`.
   *
   *     expect(undefined).to.be.undefined;
   *
   * Add `.not` earlier in the chain to negate `.undefined`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `undefined`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.undefined; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.undefined;
   *
   * @name undefined
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('undefined', function () {
    this.assert(
        undefined === flag(this, 'object')
      , 'expected #{this} to be undefined'
      , 'expected #{this} not to be undefined'
    );
  });

  /**
   * ### .NaN
   *
   * Asserts that the target is exactly `NaN`.
   *
   *     expect(NaN).to.be.NaN;
   *
   * Add `.not` earlier in the chain to negate `.NaN`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `NaN`.
   *
   *     expect('foo').to.equal('foo'); // Recommended
   *     expect('foo').to.not.be.NaN; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.NaN;
   *
   * @name NaN
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('NaN', function () {
    this.assert(
        _.isNaN(flag(this, 'object'))
        , 'expected #{this} to be NaN'
        , 'expected #{this} not to be NaN'
    );
  });

  /**
   * ### .exist
   *
   * Asserts that the target is not strictly (`===`) equal to either `null` or
   * `undefined`. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.exist; // Not recommended
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.exist; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.exist`.
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.exist; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.exist; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(null, 'nooo why fail??').to.exist;
   *
   * @name exist
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('exist', function () {
    var val = flag(this, 'object');
    this.assert(
        val !== null && val !== undefined
      , 'expected #{this} to exist'
      , 'expected #{this} to not exist'
    );
  });

  /**
   * ### .empty
   *
   * When the target is a string or array, `.empty` asserts that the target's
   * `length` property is strictly (`===`) equal to `0`.
   *
   *     expect([]).to.be.empty;
   *     expect('').to.be.empty;
   *
   * When the target is a map or set, `.empty` asserts that the target's `size`
   * property is strictly equal to `0`.
   *
   *     expect(new Set()).to.be.empty;
   *     expect(new Map()).to.be.empty;
   *
   * When the target is a non-function object, `.empty` asserts that the target
   * doesn't have any own enumerable properties. Properties with Symbol-based
   * keys are excluded from the count.
   *
   *     expect({}).to.be.empty;
   *
   * Because `.empty` does different things based on the target's type, it's
   * important to check the target's type before using `.empty`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.empty`. However, it's often
   * best to assert that the target contains its expected number of values,
   * rather than asserting that it's not empty.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.not.be.empty; // Not recommended
   *
   *     expect(new Set([1, 2, 3])).to.have.property('size', 3); // Recommended
   *     expect(new Set([1, 2, 3])).to.not.be.empty; // Not recommended
   *
   *     expect(Object.keys({a: 1})).to.have.lengthOf(1); // Recommended
   *     expect({a: 1}).to.not.be.empty; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect([1, 2, 3], 'nooo why fail??').to.be.empty;
   *
   * @name empty
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('empty', function () {
    var val = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , itemsCount;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    switch (_.type(val).toLowerCase()) {
      case 'array':
      case 'string':
        itemsCount = val.length;
        break;
      case 'map':
      case 'set':
        itemsCount = val.size;
        break;
      case 'weakmap':
      case 'weakset':
        throw new AssertionError(
          flagMsg + '.empty was passed a weak collection',
          undefined,
          ssfi
        );
      case 'function':
        var msg = flagMsg + '.empty was passed a function ' + _.getName(val);
        throw new AssertionError(msg.trim(), undefined, ssfi);
      default:
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + '.empty was passed non-string primitive ' + _.inspect(val),
            undefined,
            ssfi
          );
        }
        itemsCount = Object.keys(val).length;
    }

    this.assert(
        0 === itemsCount
      , 'expected #{this} to be empty'
      , 'expected #{this} not to be empty'
    );
  });

  /**
   * ### .arguments
   *
   * Asserts that the target is an `arguments` object.
   *
   *     function test () {
   *       expect(arguments).to.be.arguments;
   *     }
   *
   *     test();
   *
   * Add `.not` earlier in the chain to negate `.arguments`. However, it's often
   * best to assert which type the target is expected to be, rather than
   * asserting that it’s not an `arguments` object.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.arguments; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({}, 'nooo why fail??').to.be.arguments;
   *
   * The alias `.Arguments` can be used interchangeably with `.arguments`.
   *
   * @name arguments
   * @alias Arguments
   * @namespace BDD
   * @api public
   */

  function checkArguments () {
    var obj = flag(this, 'object')
      , type = _.type(obj);
    this.assert(
        'Arguments' === type
      , 'expected #{this} to be arguments but got ' + type
      , 'expected #{this} to not be arguments'
    );
  }

  Assertion.addProperty('arguments', checkArguments);
  Assertion.addProperty('Arguments', checkArguments);

  /**
   * ### .equal(val[, msg])
   *
   * Asserts that the target is strictly (`===`) equal to the given `val`.
   *
   *     expect(1).to.equal(1);
   *     expect('foo').to.equal('foo');
   *
   * Add `.deep` earlier in the chain to use deep equality instead. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) equals `[1, 2]`
   *     expect([1, 2]).to.deep.equal([1, 2]);
   *     expect([1, 2]).to.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.equal`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to one of countless unexpected values.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.equal(2); // Not recommended
   *
   * `.equal` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.equal(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.equal(2);
   *
   * The aliases `.equals` and `eq` can be used interchangeably with `.equal`.
   *
   * @name equal
   * @alias equals
   * @alias eq
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEqual (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      var prevLockSsfi = flag(this, 'lockSsfi');
      flag(this, 'lockSsfi', true);
      this.eql(val);
      flag(this, 'lockSsfi', prevLockSsfi);
    } else {
      this.assert(
          val === obj
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{exp}'
        , val
        , this._obj
        , true
      );
    }
  }

  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);

  /**
   * ### .eql(obj[, msg])
   *
   * Asserts that the target is deeply equal to the given `obj`. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object is deeply (but not strictly) equal to {a: 1}
   *     expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});
   *
   *     // Target array is deeply (but not strictly) equal to [1, 2]
   *     expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.eql`. However, it's often best
   * to assert that the target is deeply equal to its expected value, rather
   * than not deeply equal to one of countless unexpected values.
   *
   *     expect({a: 1}).to.eql({a: 1}); // Recommended
   *     expect({a: 1}).to.not.eql({b: 2}); // Not recommended
   *
   * `.eql` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect({a: 1}).to.eql({b: 2}, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.eql({b: 2});
   *
   * The alias `.eqls` can be used interchangeably with `.eql`.
   *
   * The `.deep.equal` assertion is almost identical to `.eql` but with one
   * difference: `.deep.equal` causes deep equality comparisons to also be used
   * for any other assertions that follow in the chain.
   *
   * @name eql
   * @alias eqls
   * @param {Mixed} obj
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEql(obj, msg) {
    if (msg) flag(this, 'message', msg);
    this.assert(
        _.eql(obj, flag(this, 'object'))
      , 'expected #{this} to deeply equal #{exp}'
      , 'expected #{this} to not deeply equal #{exp}'
      , obj
      , this._obj
      , true
    );
  }

  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);

  /**
   * ### .above(n[, msg])
   *
   * Asserts that the target is a number or a date greater than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.above(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.above(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.above`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(1).to.not.be.above(2); // Not recommended
   *
   * `.above` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.above(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.above(2);
   *
   * The aliases `.gt` and `.greaterThan` can be used interchangeably with
   * `.above`.
   *
   * @name above
   * @alias gt
   * @alias greaterThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertAbove (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to above must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to above must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount > n
        , 'expected #{this} to have a ' + descriptor + ' above #{exp} but got #{act}'
        , 'expected #{this} to not have a ' + descriptor + ' above #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj > n
        , 'expected #{this} to be above #{exp}'
        , 'expected #{this} to be at most #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);

  /**
   * ### .least(n[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `n` respectively. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.at.least(1); // Not recommended
   *     expect(2).to.be.at.least(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.least(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.least`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.at.least(2); // Not recommended
   *
   * `.least` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.at.least(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.at.least(2);
   *
   * The alias `.gte` can be used interchangeably with `.least`.
   *
   * @name least
   * @alias gte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLeast (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to least must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to least must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount >= n
        , 'expected #{this} to have a ' + descriptor + ' at least #{exp} but got #{act}'
        , 'expected #{this} to have a ' + descriptor + ' below #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj >= n
        , 'expected #{this} to be at least #{exp}'
        , 'expected #{this} to be below #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);

  /**
   * ### .below(n[, msg])
   *
   * Asserts that the target is a number or a date less than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.below(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is less than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.below(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.length(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.below(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.below`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.below(1); // Not recommended
   *
   * `.below` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.below(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.below(1);
   *
   * The aliases `.lt` and `.lessThan` can be used interchangeably with
   * `.below`.
   *
   * @name below
   * @alias lt
   * @alias lessThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertBelow (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to below must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to below must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount < n
        , 'expected #{this} to have a ' + descriptor + ' below #{exp} but got #{act}'
        , 'expected #{this} to not have a ' + descriptor + ' below #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj < n
        , 'expected #{this} to be below #{exp}'
        , 'expected #{this} to be at least #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);

  /**
   * ### .most(n[, msg])
   *
   * Asserts that the target is a number or a date less than or equal to the given number
   * or date `n` respectively. However, it's often best to assert that the target is equal to its
   * expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.at.most(2); // Not recommended
   *     expect(1).to.be.at.most(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is less than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.most(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.most`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.at.most(1); // Not recommended
   *
   * `.most` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.at.most(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.at.most(1);
   *
   * The alias `.lte` can be used interchangeably with `.most`.
   *
   * @name most
   * @alias lte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertMost (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , errorMessage
      , shouldThrow = true;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to most must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to most must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount <= n
        , 'expected #{this} to have a ' + descriptor + ' at most #{exp} but got #{act}'
        , 'expected #{this} to have a ' + descriptor + ' above #{exp}'
        , n
        , itemsCount
      );
    } else {
      this.assert(
          obj <= n
        , 'expected #{this} to be at most #{exp}'
        , 'expected #{this} to be above #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);

  /**
   * ### .within(start, finish[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `start`, and less than or equal to the given number or date `finish` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.within(1, 3); // Not recommended
   *     expect(2).to.be.within(2, 3); // Not recommended
   *     expect(2).to.be.within(1, 2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the target's `length`
   * or `size` is greater than or equal to the given number `start`, and less
   * than or equal to the given number `finish`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.within(2, 4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.within(2, 4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.within`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.within(2, 4); // Not recommended
   *
   * `.within` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(4).to.be.within(1, 3, 'nooo why fail??');
   *     expect(4, 'nooo why fail??').to.be.within(1, 3);
   *
   * @name within
   * @param {Number} start lower bound inclusive
   * @param {Number} finish upper bound inclusive
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('within', function (start, finish, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , startType = _.type(start).toLowerCase()
      , finishType = _.type(finish).toLowerCase()
      , errorMessage
      , shouldThrow = true
      , range = (startType === 'date' && finishType === 'date')
          ? start.toUTCString() + '..' + finish.toUTCString()
          : start + '..' + finish;

    if (doLength && objType !== 'map' && objType !== 'set') {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && (startType !== 'date' || finishType !== 'date'))) {
      errorMessage = msgPrefix + 'the arguments to within must be dates';
    } else if ((startType !== 'number' || finishType !== 'number') && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the arguments to within must be numbers';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var descriptor = 'length'
        , itemsCount;
      if (objType === 'map' || objType === 'set') {
        descriptor = 'size';
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
          itemsCount >= start && itemsCount <= finish
        , 'expected #{this} to have a ' + descriptor + ' within ' + range
        , 'expected #{this} to not have a ' + descriptor + ' within ' + range
      );
    } else {
      this.assert(
          obj >= start && obj <= finish
        , 'expected #{this} to be within ' + range
        , 'expected #{this} to not be within ' + range
      );
    }
  });

  /**
   * ### .instanceof(constructor[, msg])
   *
   * Asserts that the target is an instance of the given `constructor`.
   *
   *     function Cat () { }
   *
   *     expect(new Cat()).to.be.an.instanceof(Cat);
   *     expect([1, 2]).to.be.an.instanceof(Array);
   *
   * Add `.not` earlier in the chain to negate `.instanceof`.
   *
   *     expect({a: 1}).to.not.be.an.instanceof(Array);
   *
   * `.instanceof` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.be.an.instanceof(Array, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.an.instanceof(Array);
   *
   * Due to limitations in ES5, `.instanceof` may not always work as expected
   * when using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing built-in object such as
   * `Array`, `Error`, and `Map`. See your transpiler's docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * The alias `.instanceOf` can be used interchangeably with `.instanceof`.
   *
   * @name instanceof
   * @param {Constructor} constructor
   * @param {String} msg _optional_
   * @alias instanceOf
   * @namespace BDD
   * @api public
   */

  function assertInstanceOf (constructor, msg) {
    if (msg) flag(this, 'message', msg);

    var target = flag(this, 'object')
    var ssfi = flag(this, 'ssfi');
    var flagMsg = flag(this, 'message');

    try {
      var isInstanceOf = target instanceof constructor;
    } catch (err) {
      if (err instanceof TypeError) {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
          flagMsg + 'The instanceof assertion needs a constructor but '
            + _.type(constructor) + ' was given.',
          undefined,
          ssfi
        );
      }
      throw err;
    }

    var name = _.getName(constructor);
    if (name === null) {
      name = 'an unnamed constructor';
    }

    this.assert(
        isInstanceOf
      , 'expected #{this} to be an instance of ' + name
      , 'expected #{this} to not be an instance of ' + name
    );
  };

  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);

  /**
   * ### .property(name[, val[, msg]])
   *
   * Asserts that the target has a property with the given key `name`.
   *
   *     expect({a: 1}).to.have.property('a');
   *
   * When `val` is provided, `.property` also asserts that the property's value
   * is equal to the given `val`.
   *
   *     expect({a: 1}).to.have.property('a', 1);
   *
   * By default, strict (`===`) equality is used. Add `.deep` earlier in the
   * chain to use deep equality instead. See the `deep-eql` project page for
   * info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * The target's enumerable and non-enumerable properties are always included
   * in the search. By default, both own and inherited properties are included.
   * Add `.own` earlier in the chain to exclude inherited properties from the
   * search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.own.property('a', 1);
   *     expect({a: 1}).to.have.property('b');
   *     expect({a: 1}).to.not.have.own.property('b');
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({x: {a: 1}}).to.have.deep.own.property('x', {a: 1});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}})
   *       .to.have.deep.nested.property('a.b[0]', {c: 3});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.property`.
   *
   *     expect({a: 1}).to.not.have.property('b');
   *
   * However, it's dangerous to negate `.property` when providing `val`. The
   * problem is that it creates uncertain expectations by asserting that the
   * target either doesn't have a property with the given key `name`, or that it
   * does have a property with the given key `name` but its value isn't equal to
   * the given `val`. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property with the given key
   * `name`, it's often best to assert exactly that.
   *
   *     expect({b: 2}).to.not.have.property('a'); // Recommended
   *     expect({b: 2}).to.not.have.property('a', 1); // Not recommended
   *
   * When the target is expected to have a property with the given key `name`,
   * it's often best to assert that the property has its expected value, rather
   * than asserting that it doesn't have one of many unexpected values.
   *
   *     expect({a: 3}).to.have.property('a', 3); // Recommended
   *     expect({a: 3}).to.not.have.property('a', 1); // Not recommended
   *
   * `.property` changes the target of any assertions that follow in the chain
   * to be the value of the property from the original target object.
   *
   *     expect({a: 1}).to.have.property('a').that.is.a('number');
   *
   * `.property` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing `val`, only use the
   * second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.property('a', 2, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.have.property('a', 2);
   *     expect({a: 1}, 'nooo why fail??').to.have.property('b');
   *
   *     // Not recommended
   *     expect({a: 1}).to.have.property('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `val`. Instead,
   * it's asserting that the target object has a `b` property that's equal to
   * `undefined`.
   *
   * The assertions `.ownProperty` and `.haveOwnProperty` can be used
   * interchangeably with `.own.property`.
   *
   * @name property
   * @param {String} name
   * @param {Mixed} val (optional)
   * @param {String} msg _optional_
   * @returns value of property for chaining
   * @namespace BDD
   * @api public
   */

  function assertProperty (name, val, msg) {
    if (msg) flag(this, 'message', msg);

    var isNested = flag(this, 'nested')
      , isOwn = flag(this, 'own')
      , flagMsg = flag(this, 'message')
      , obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , nameType = typeof name;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    if (isNested) {
      if (nameType !== 'string') {
        throw new AssertionError(
          flagMsg + 'the argument to property must be a string when using nested syntax',
          undefined,
          ssfi
        );
      }
    } else {
      if (nameType !== 'string' && nameType !== 'number' && nameType !== 'symbol') {
        throw new AssertionError(
          flagMsg + 'the argument to property must be a string, number, or symbol',
          undefined,
          ssfi
        );
      }
    }

    if (isNested && isOwn) {
      throw new AssertionError(
        flagMsg + 'The "nested" and "own" flags cannot be combined.',
        undefined,
        ssfi
      );
    }

    if (obj === null || obj === undefined) {
      throw new AssertionError(
        flagMsg + 'Target cannot be null or undefined.',
        undefined,
        ssfi
      );
    }

    var isDeep = flag(this, 'deep')
      , negate = flag(this, 'negate')
      , pathInfo = isNested ? _.getPathInfo(obj, name) : null
      , value = isNested ? pathInfo.value : obj[name];

    var descriptor = '';
    if (isDeep) descriptor += 'deep ';
    if (isOwn) descriptor += 'own ';
    if (isNested) descriptor += 'nested ';
    descriptor += 'property ';

    var hasProperty;
    if (isOwn) hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
    else if (isNested) hasProperty = pathInfo.exists;
    else hasProperty = _.hasProperty(obj, name);

    // When performing a negated assertion for both name and val, merely having
    // a property with the given name isn't enough to cause the assertion to
    // fail. It must both have a property with the given name, and the value of
    // that property must equal the given val. Therefore, skip this assertion in
    // favor of the next.
    if (!negate || arguments.length === 1) {
      this.assert(
          hasProperty
        , 'expected #{this} to have ' + descriptor + _.inspect(name)
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }

    if (arguments.length > 1) {
      this.assert(
          hasProperty && (isDeep ? _.eql(val, value) : val === value)
        , 'expected #{this} to have ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
        , 'expected #{this} to not have ' + descriptor + _.inspect(name) + ' of #{act}'
        , val
        , value
      );
    }

    flag(this, 'object', value);
  }

  Assertion.addMethod('property', assertProperty);

  function assertOwnProperty (name, value, msg) {
    flag(this, 'own', true);
    assertProperty.apply(this, arguments);
  }

  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

  /**
   * ### .ownPropertyDescriptor(name[, descriptor[, msg]])
   *
   * Asserts that the target has its own property descriptor with the given key
   * `name`. Enumerable and non-enumerable properties are included in the
   * search.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a');
   *
   * When `descriptor` is provided, `.ownPropertyDescriptor` also asserts that
   * the property's descriptor is deeply equal to the given `descriptor`. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * Add `.not` earlier in the chain to negate `.ownPropertyDescriptor`.
   *
   *     expect({a: 1}).to.not.have.ownPropertyDescriptor('b');
   *
   * However, it's dangerous to negate `.ownPropertyDescriptor` when providing
   * a `descriptor`. The problem is that it creates uncertain expectations by
   * asserting that the target either doesn't have a property descriptor with
   * the given key `name`, or that it does have a property descriptor with the
   * given key `name` but it’s not deeply equal to the given `descriptor`. It's
   * often best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property descriptor with the given
   * key `name`, it's often best to assert exactly that.
   *
   *     // Recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a');
   *
   *     // Not recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * When the target is expected to have a property descriptor with the given
   * key `name`, it's often best to assert that the property has its expected
   * descriptor, rather than asserting that it doesn't have one of many
   * unexpected descriptors.
   *
   *     // Recommended
   *     expect({a: 3}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 3,
   *     });
   *
   *     // Not recommended
   *     expect({a: 3}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * `.ownPropertyDescriptor` changes the target of any assertions that follow
   * in the chain to be the value of the property descriptor from the original
   * target object.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a')
   *       .that.has.property('enumerable', true);
   *
   * `.ownPropertyDescriptor` accepts an optional `msg` argument which is a
   * custom error message to show when the assertion fails. The message can also
   * be given as the second argument to `expect`. When not providing
   * `descriptor`, only use the second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     }, 'nooo why fail??');
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     });
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('b');
   *
   *     // Not recommended
   *     expect({a: 1})
   *       .to.have.ownPropertyDescriptor('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `descriptor`.
   * Instead, it's asserting that the target object has a `b` property
   * descriptor that's deeply equal to `undefined`.
   *
   * The alias `.haveOwnPropertyDescriptor` can be used interchangeably with
   * `.ownPropertyDescriptor`.
   *
   * @name ownPropertyDescriptor
   * @alias haveOwnPropertyDescriptor
   * @param {String} name
   * @param {Object} descriptor _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertOwnPropertyDescriptor (name, descriptor, msg) {
    if (typeof descriptor === 'string') {
      msg = descriptor;
      descriptor = null;
    }
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    if (actualDescriptor && descriptor) {
      this.assert(
          _.eql(descriptor, actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
        , descriptor
        , actualDescriptor
        , true
      );
    } else {
      this.assert(
          actualDescriptor
        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
      );
    }
    flag(this, 'object', actualDescriptor);
  }

  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);

  /**
   * ### .lengthOf(n[, msg])
   *
   * Asserts that the target's `length` or `size` is equal to the given number
   * `n`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *     expect('foo').to.have.lengthOf(3);
   *     expect(new Set([1, 2, 3])).to.have.lengthOf(3);
   *     expect(new Map([['a', 1], ['b', 2], ['c', 3]])).to.have.lengthOf(3);
   *
   * Add `.not` earlier in the chain to negate `.lengthOf`. However, it's often
   * best to assert that the target's `length` property is equal to its expected
   * value, rather than not equal to one of many unexpected values.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.not.have.lengthOf(4); // Not recommended
   *
   * `.lengthOf` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(2, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.have.lengthOf(2);
   *
   * `.lengthOf` can also be used as a language chain, causing all `.above`,
   * `.below`, `.least`, `.most`, and `.within` assertions that follow in the
   * chain to use the target's `length` property as the target. However, it's
   * often best to assert that the target's `length` property is equal to its
   * expected length, rather than asserting that its `length` property falls
   * within some range of values.
   *
   *     // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *
   *     // Not recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2);
   *     expect([1, 2, 3]).to.have.lengthOf.below(4);
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(3);
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(3);
   *     expect([1, 2, 3]).to.have.lengthOf.within(2,4);
   *
   * Due to a compatibility issue, the alias `.length` can't be chained directly
   * off of an uninvoked method such as `.a`. Therefore, `.length` can't be used
   * interchangeably with `.lengthOf` in every situation. It's recommended to
   * always use `.lengthOf` instead of `.length`.
   *
   *     expect([1, 2, 3]).to.have.a.length(3); // incompatible; throws error
   *     expect([1, 2, 3]).to.have.a.lengthOf(3);  // passes as expected
   *
   * @name lengthOf
   * @alias length
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLengthChain () {
    flag(this, 'doLength', true);
  }

  function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi')
      , descriptor = 'length'
      , itemsCount;

    switch (objType) {
      case 'map':
      case 'set':
        descriptor = 'size';
        itemsCount = obj.size;
        break;
      default:
        new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
        itemsCount = obj.length;
    }

    this.assert(
        itemsCount == n
      , 'expected #{this} to have a ' + descriptor + ' of #{exp} but got #{act}'
      , 'expected #{this} to not have a ' + descriptor + ' of #{act}'
      , n
      , itemsCount
    );
  }

  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addChainableMethod('lengthOf', assertLength, assertLengthChain);

  /**
   * ### .match(re[, msg])
   *
   * Asserts that the target matches the given regular expression `re`.
   *
   *     expect('foobar').to.match(/^foo/);
   *
   * Add `.not` earlier in the chain to negate `.match`.
   *
   *     expect('foobar').to.not.match(/taco/);
   *
   * `.match` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect('foobar').to.match(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.match(/taco/);
   *
   * The alias `.matches` can be used interchangeably with `.match`.
   *
   * @name match
   * @alias matches
   * @param {RegExp} re
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */
  function assertMatch(re, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        re.exec(obj)
      , 'expected #{this} to match ' + re
      , 'expected #{this} not to match ' + re
    );
  }

  Assertion.addMethod('match', assertMatch);
  Assertion.addMethod('matches', assertMatch);

  /**
   * ### .string(str[, msg])
   *
   * Asserts that the target string contains the given substring `str`.
   *
   *     expect('foobar').to.have.string('bar');
   *
   * Add `.not` earlier in the chain to negate `.string`.
   *
   *     expect('foobar').to.not.have.string('taco');
   *
   * `.string` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect('foobar').to.have.string('taco', 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.have.string('taco');
   *
   * @name string
   * @param {String} str
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('string', function (str, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).is.a('string');

    this.assert(
        ~obj.indexOf(str)
      , 'expected #{this} to contain ' + _.inspect(str)
      , 'expected #{this} to not contain ' + _.inspect(str)
    );
  });

  /**
   * ### .keys(key1[, key2[, ...]])
   *
   * Asserts that the target object, array, map, or set has the given keys. Only
   * the target's own inherited properties are included in the search.
   *
   * When the target is an object or array, keys can be provided as one or more
   * string arguments, a single array argument, or a single object argument. In
   * the latter case, only the keys in the given object matter; the values are
   * ignored.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *     expect(['x', 'y']).to.have.all.keys(0, 1);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
   *     expect(['x', 'y']).to.have.all.keys([0, 1]);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
   *     expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
   *
   * When the target is a map or set, each key must be provided as a separate
   * argument.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b');
   *     expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');
   *
   * Because `.keys` does different things based on the target's type, it's
   * important to check the target's type before using `.keys`. See the `.a` doc
   * for info on testing a target's type.
   *
   *     expect({a: 1, b: 2}).to.be.an('object').that.has.all.keys('a', 'b');
   *
   * By default, strict (`===`) equality is used to compare keys of maps and
   * sets. Add `.deep` earlier in the chain to use deep equality instead. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.all.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.all.keys([{a: 1}]);
   *
   * By default, the target must have all of the given keys and no more. Add
   * `.any` earlier in the chain to only require that the target have at least
   * one of the given keys. Also, add `.not` earlier in the chain to negate
   * `.keys`. It's often best to add `.any` when negating `.keys`, and to use
   * `.all` when asserting `.keys` without negation.
   *
   * When negating `.keys`, `.any` is preferred because `.not.any.keys` asserts
   * exactly what's expected of the output, whereas `.not.all.keys` creates
   * uncertain expectations.
   *
   *     // Recommended; asserts that target doesn't have any of the given keys
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   *     // Not recommended; asserts that target doesn't have all of the given
   *     // keys but may or may not have some of them
   *     expect({a: 1, b: 2}).to.not.have.all.keys('c', 'd');
   *
   * When asserting `.keys` without negation, `.all` is preferred because
   * `.all.keys` asserts exactly what's expected of the output, whereas
   * `.any.keys` creates uncertain expectations.
   *
   *     // Recommended; asserts that target has all the given keys
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   *     // Not recommended; asserts that target has at least one of the given
   *     // keys but may or may not have more of them
   *     expect({a: 1, b: 2}).to.have.any.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` appear
   * earlier in the chain. However, it's often best to add `.all` anyway because
   * it improves readability.
   *
   *     // Both assertions are identical
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b'); // Recommended
   *     expect({a: 1, b: 2}).to.have.keys('a', 'b'); // Not recommended
   *
   * Add `.include` earlier in the chain to require that the target's keys be a
   * superset of the expected keys, rather than identical sets.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   * However, if `.any` and `.include` are combined, only the `.any` takes
   * effect. The `.include` is ignored in this case.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.have.key('b');
   *
   * The alias `.key` can be used interchangeably with `.keys`.
   *
   * @name keys
   * @alias key
   * @param {...String|Array|Object} keys
   * @namespace BDD
   * @api public
   */

  function assertKeys (keys) {
    var obj = flag(this, 'object')
      , objType = _.type(obj)
      , keysType = _.type(keys)
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , str
      , deepStr = ''
      , actual
      , ok = true
      , flagMsg = flag(this, 'message');

    flagMsg = flagMsg ? flagMsg + ': ' : '';
    var mixedArgsMsg = flagMsg + 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments';

    if (objType === 'Map' || objType === 'Set') {
      deepStr = isDeep ? 'deeply ' : '';
      actual = [];

      // Map and Set '.keys' aren't supported in IE 11. Therefore, use .forEach.
      obj.forEach(function (val, key) { actual.push(key) });

      if (keysType !== 'Array') {
        keys = Array.prototype.slice.call(arguments);
      }
    } else {
      actual = _.getOwnEnumerableProperties(obj);

      switch (keysType) {
        case 'Array':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          break;
        case 'Object':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          keys = Object.keys(keys);
          break;
        default:
          keys = Array.prototype.slice.call(arguments);
      }

      // Only stringify non-Symbols because Symbols would become "Symbol()"
      keys = keys.map(function (val) {
        return typeof val === 'symbol' ? val : String(val);
      });
    }

    if (!keys.length) {
      throw new AssertionError(flagMsg + 'keys required', undefined, ssfi);
    }

    var len = keys.length
      , any = flag(this, 'any')
      , all = flag(this, 'all')
      , expected = keys;

    if (!any && !all) {
      all = true;
    }

    // Has any
    if (any) {
      ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });
    }

    // Has all
    if (all) {
      ok = expected.every(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });

      if (!flag(this, 'contains')) {
        ok = ok && keys.length == actual.length;
      }
    }

    // Key string
    if (len > 1) {
      keys = keys.map(function(key) {
        return _.inspect(key);
      });
      var last = keys.pop();
      if (all) {
        str = keys.join(', ') + ', and ' + last;
      }
      if (any) {
        str = keys.join(', ') + ', or ' + last;
      }
    } else {
      str = _.inspect(keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

    // Assertion
    this.assert(
        ok
      , 'expected #{this} to ' + deepStr + str
      , 'expected #{this} to not ' + deepStr + str
      , expected.slice(0).sort(_.compareByInspect)
      , actual.sort(_.compareByInspect)
      , true
    );
  }

  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);

  /**
   * ### .throw([errorLike], [errMsgMatcher], [msg])
   *
   * When no arguments are provided, `.throw` invokes the target function and
   * asserts that an error is thrown.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw();
   *
   * When one argument is provided, and it's an error constructor, `.throw`
   * invokes the target function and asserts that an error is thrown that's an
   * instance of that error constructor.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError);
   *
   * When one argument is provided, and it's an error instance, `.throw` invokes
   * the target function and asserts that an error is thrown that's strictly
   * (`===`) equal to that error instance.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(err);
   *
   * When one argument is provided, and it's a string, `.throw` invokes the
   * target function and asserts that an error is thrown with a message that
   * contains that string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw('salmon');
   *
   * When one argument is provided, and it's a regular expression, `.throw`
   * invokes the target function and asserts that an error is thrown with a
   * message that matches that regular expression.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(/salmon/);
   *
   * When two arguments are provided, and the first is an error instance or
   * constructor, and the second is a string or regular expression, `.throw`
   * invokes the function and asserts that an error is thrown that fulfills both
   * conditions as described above.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon');
   *     expect(badFn).to.throw(TypeError, /salmon/);
   *     expect(badFn).to.throw(err, 'salmon');
   *     expect(badFn).to.throw(err, /salmon/);
   *
   * Add `.not` earlier in the chain to negate `.throw`.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw();
   *
   * However, it's dangerous to negate `.throw` when providing any arguments.
   * The problem is that it creates uncertain expectations by asserting that the
   * target either doesn't throw an error, or that it throws an error but of a
   * different type than the given type, or that it throws an error of the given
   * type but with a message that doesn't include the given string. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to throw an error, it's often best to assert
   * exactly that.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw(); // Recommended
   *     expect(goodFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * When the target is expected to throw an error, it's often best to assert
   * that the error is of its expected type, and has a message that includes an
   * expected string, rather than asserting that it doesn't have one of many
   * unexpected types, and doesn't have a message that includes some string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon'); // Recommended
   *     expect(badFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * `.throw` changes the target of any assertions that follow in the chain to
   * be the error object that's thrown.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     err.code = 42;
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError).with.property('code', 42);
   *
   * `.throw` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`. When not providing two arguments, always use
   * the second form.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.throw(TypeError, 'x', 'nooo why fail??');
   *     expect(goodFn, 'nooo why fail??').to.throw();
   *
   * Due to limitations in ES5, `.throw` may not always work as expected when
   * using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing the built-in `Error` object and
   * then passing the subclassed constructor to `.throw`. See your transpiler's
   * docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * Beware of some common mistakes when using the `throw` assertion. One common
   * mistake is to accidentally invoke the function yourself instead of letting
   * the `throw` assertion invoke the function for you. For example, when
   * testing if a function named `fn` throws, provide `fn` instead of `fn()` as
   * the target for the assertion.
   *
   *     expect(fn).to.throw();     // Good! Tests `fn` as desired
   *     expect(fn()).to.throw();   // Bad! Tests result of `fn()`, not `fn`
   *
   * If you need to assert that your function `fn` throws when passed certain
   * arguments, then wrap a call to `fn` inside of another function.
   *
   *     expect(function () { fn(42); }).to.throw();  // Function expression
   *     expect(() => fn(42)).to.throw();             // ES6 arrow function
   *
   * Another common mistake is to provide an object method (or any stand-alone
   * function that relies on `this`) as the target of the assertion. Doing so is
   * problematic because the `this` context will be lost when the function is
   * invoked by `.throw`; there's no way for it to know what `this` is supposed
   * to be. There are two ways around this problem. One solution is to wrap the
   * method or function call inside of another function. Another solution is to
   * use `bind`.
   *
   *     expect(function () { cat.meow(); }).to.throw();  // Function expression
   *     expect(() => cat.meow()).to.throw();             // ES6 arrow function
   *     expect(cat.meow.bind(cat)).to.throw();           // Bind
   *
   * Finally, it's worth mentioning that it's a best practice in JavaScript to
   * only throw `Error` and derivatives of `Error` such as `ReferenceError`,
   * `TypeError`, and user-defined objects that extend `Error`. No other type of
   * value will generate a stack trace when initialized. With that said, the
   * `throw` assertion does technically support any type of value being thrown,
   * not just `Error` and its derivatives.
   *
   * The aliases `.throws` and `.Throw` can be used interchangeably with
   * `.throw`.
   *
   * @name throw
   * @alias throws
   * @alias Throw
   * @param {Error|ErrorConstructor} errorLike
   * @param {String|RegExp} errMsgMatcher error message
   * @param {String} msg _optional_
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @returns error for chaining (null if no error)
   * @namespace BDD
   * @api public
   */

  function assertThrows (errorLike, errMsgMatcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate') || false;
    new Assertion(obj, flagMsg, ssfi, true).is.a('function');

    if (errorLike instanceof RegExp || typeof errorLike === 'string') {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var caughtErr;
    try {
      obj();
    } catch (err) {
      caughtErr = err;
    }

    // If we have the negate flag enabled and at least one valid argument it means we do expect an error
    // but we want it to match a given set of criteria
    var everyArgIsUndefined = errorLike === undefined && errMsgMatcher === undefined;

    // If we've got the negate flag enabled and both args, we should only fail if both aren't compatible
    // See Issue #551 and PR #683@GitHub
    var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    var errorLikeFail = false;
    var errMsgMatcherFail = false;

    // Checking if error was thrown
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
      // We need this to display results correctly according to their types
      var errorLikeString = 'an error';
      if (errorLike instanceof Error) {
        errorLikeString = '#{exp}';
      } else if (errorLike) {
        errorLikeString = _.checkError.getConstructorName(errorLike);
      }

      this.assert(
          caughtErr
        , 'expected #{this} to throw ' + errorLikeString
        , 'expected #{this} to not throw an error but #{act} was thrown'
        , errorLike && errorLike.toString()
        , (caughtErr instanceof Error ?
            caughtErr.toString() : (typeof caughtErr === 'string' ? caughtErr : caughtErr &&
                                    _.checkError.getConstructorName(caughtErr)))
      );
    }

    if (errorLike && caughtErr) {
      // We should compare instances only if `errorLike` is an instance of `Error`
      if (errorLike instanceof Error) {
        var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);

        if (isCompatibleInstance === negate) {
          // These checks were created to ensure we won't fail too soon when we've got both args and a negate
          // See Issue #551 and PR #683@GitHub
          if (everyArgIsDefined && negate) {
            errorLikeFail = true;
          } else {
            this.assert(
                negate
              , 'expected #{this} to throw #{exp} but #{act} was thrown'
              , 'expected #{this} to not throw #{exp}' + (caughtErr && !negate ? ' but #{act} was thrown' : '')
              , errorLike.toString()
              , caughtErr.toString()
            );
          }
        }
      }

      var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
      if (isCompatibleConstructor === negate) {
        if (everyArgIsDefined && negate) {
            errorLikeFail = true;
        } else {
          this.assert(
              negate
            , 'expected #{this} to throw #{exp} but #{act} was thrown'
            , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
            , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
            , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
          );
        }
      }
    }

    if (caughtErr && errMsgMatcher !== undefined && errMsgMatcher !== null) {
      // Here we check compatible messages
      var placeholder = 'including';
      if (errMsgMatcher instanceof RegExp) {
        placeholder = 'matching'
      }

      var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
      if (isCompatibleMessage === negate) {
        if (everyArgIsDefined && negate) {
            errMsgMatcherFail = true;
        } else {
          this.assert(
            negate
            , 'expected #{this} to throw error ' + placeholder + ' #{exp} but got #{act}'
            , 'expected #{this} to throw error not ' + placeholder + ' #{exp}'
            ,  errMsgMatcher
            ,  _.checkError.getMessage(caughtErr)
          );
        }
      }
    }

    // If both assertions failed and both should've matched we throw an error
    if (errorLikeFail && errMsgMatcherFail) {
      this.assert(
        negate
        , 'expected #{this} to throw #{exp} but #{act} was thrown'
        , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
        , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
        , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
      );
    }

    flag(this, 'object', caughtErr);
  };

  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);

  /**
   * ### .respondTo(method[, msg])
   *
   * When the target is a non-function object, `.respondTo` asserts that the
   * target has a method with the given name `method`. The method can be own or
   * inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.respondTo('meow');
   *
   * When the target is a function, `.respondTo` asserts that the target's
   * `prototype` property has a method with the given name `method`. Again, the
   * method can be own or inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(Cat).to.respondTo('meow');
   *
   * Add `.itself` earlier in the chain to force `.respondTo` to treat the
   * target as a non-function object, even if it's a function. Thus, it asserts
   * that the target has a method with the given name `method`, rather than
   * asserting that the target's `prototype` property has a method with the
   * given name `method`.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * When not adding `.itself`, it's important to check the target's type before
   * using `.respondTo`. See the `.a` doc for info on checking a target's type.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.be.an('object').that.respondsTo('meow');
   *
   * Add `.not` earlier in the chain to negate `.respondTo`.
   *
   *     function Dog () {}
   *     Dog.prototype.bark = function () {};
   *
   *     expect(new Dog()).to.not.respondTo('meow');
   *
   * `.respondTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect({}).to.respondTo('meow', 'nooo why fail??');
   *     expect({}, 'nooo why fail??').to.respondTo('meow');
   *
   * The alias `.respondsTo` can be used interchangeably with `.respondTo`.
   *
   * @name respondTo
   * @alias respondsTo
   * @param {String} method
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function respondTo (method, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , itself = flag(this, 'itself')
      , context = ('function' === typeof obj && !itself)
        ? obj.prototype[method]
        : obj[method];

    this.assert(
        'function' === typeof context
      , 'expected #{this} to respond to ' + _.inspect(method)
      , 'expected #{this} to not respond to ' + _.inspect(method)
    );
  }

  Assertion.addMethod('respondTo', respondTo);
  Assertion.addMethod('respondsTo', respondTo);

  /**
   * ### .itself
   *
   * Forces all `.respondTo` assertions that follow in the chain to behave as if
   * the target is a non-function object, even if it's a function. Thus, it
   * causes `.respondTo` to assert that the target has a method with the given
   * name, rather than asserting that the target's `prototype` property has a
   * method with the given name.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * @name itself
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('itself', function () {
    flag(this, 'itself', true);
  });

  /**
   * ### .satisfy(matcher[, msg])
   *
   * Invokes the given `matcher` function with the target being passed as the
   * first argument, and asserts that the value returned is truthy.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 0;
   *     });
   *
   * Add `.not` earlier in the chain to negate `.satisfy`.
   *
   *     expect(1).to.not.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * `.satisfy` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 2;
   *     }, 'nooo why fail??');
   *
   *     expect(1, 'nooo why fail??').to.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * The alias `.satisfies` can be used interchangeably with `.satisfy`.
   *
   * @name satisfy
   * @alias satisfies
   * @param {Function} matcher
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function satisfy (matcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var result = matcher(obj);
    this.assert(
        result
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
      , flag(this, 'negate') ? false : true
      , result
    );
  }

  Assertion.addMethod('satisfy', satisfy);
  Assertion.addMethod('satisfies', satisfy);

  /**
   * ### .closeTo(expected, delta[, msg])
   *
   * Asserts that the target is a number that's within a given +/- `delta` range
   * of the given number `expected`. However, it's often best to assert that the
   * target is equal to its expected value.
   *
   *     // Recommended
   *     expect(1.5).to.equal(1.5);
   *
   *     // Not recommended
   *     expect(1.5).to.be.closeTo(1, 0.5);
   *     expect(1.5).to.be.closeTo(2, 0.5);
   *     expect(1.5).to.be.closeTo(1, 1);
   *
   * Add `.not` earlier in the chain to negate `.closeTo`.
   *
   *     expect(1.5).to.equal(1.5); // Recommended
   *     expect(1.5).to.not.be.closeTo(3, 1); // Not recommended
   *
   * `.closeTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1.5).to.be.closeTo(3, 1, 'nooo why fail??');
   *     expect(1.5, 'nooo why fail??').to.be.closeTo(3, 1);
   *
   * The alias `.approximately` can be used interchangeably with `.closeTo`.
   *
   * @name closeTo
   * @alias approximately
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function closeTo(expected, delta, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).is.a('number');
    if (typeof expected !== 'number' || typeof delta !== 'number') {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      var deltaMessage = delta === undefined ? ", and a delta is required" : "";
      throw new AssertionError(
          flagMsg + 'the arguments to closeTo or approximately must be numbers' + deltaMessage,
          undefined,
          ssfi
      );
    }

    this.assert(
        Math.abs(obj - expected) <= delta
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
    );
  }

  Assertion.addMethod('closeTo', closeTo);
  Assertion.addMethod('approximately', closeTo);

  // Note: Duplicates are ignored if testing for inclusion instead of sameness.
  function isSubsetOf(subset, superset, cmp, contains, ordered) {
    if (!contains) {
      if (subset.length !== superset.length) return false;
      superset = superset.slice();
    }

    return subset.every(function(elem, idx) {
      if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];

      if (!cmp) {
        var matchIdx = superset.indexOf(elem);
        if (matchIdx === -1) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      }

      return superset.some(function(elem2, matchIdx) {
        if (!cmp(elem, elem2)) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      });
    });
  }

  /**
   * ### .members(set[, msg])
   *
   * Asserts that the target array has the same members as the given array
   * `set`.
   *
   *     expect([1, 2, 3]).to.have.members([2, 1, 3]);
   *     expect([1, 2, 2]).to.have.members([2, 1, 2]);
   *
   * By default, members are compared using strict (`===`) equality. Add `.deep`
   * earlier in the chain to use deep equality instead. See the `deep-eql`
   * project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   * By default, order doesn't matter. Add `.ordered` earlier in the chain to
   * require that members appear in the same order.
   *
   *     expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
   *     expect([1, 2, 3]).to.have.members([2, 1, 3])
   *       .but.not.ordered.members([2, 1, 3]);
   *
   * By default, both arrays must be the same size. Add `.include` earlier in
   * the chain to require that the target's members be a superset of the
   * expected members. Note that duplicates are ignored in the subset when
   * `.include` is added.
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * `.deep`, `.ordered`, and `.include` can all be combined. However, if
   * `.include` and `.ordered` are combined, the ordering begins at the start of
   * both arrays.
   *
   *     expect([{a: 1}, {b: 2}, {c: 3}])
   *       .to.include.deep.ordered.members([{a: 1}, {b: 2}])
   *       .but.not.include.deep.ordered.members([{b: 2}, {c: 3}]);
   *
   * Add `.not` earlier in the chain to negate `.members`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the target array doesn't have all of the same members as
   * the given array `set` but may or may not have some of them. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     expect([1, 2]).to.not.include(3).and.not.include(4); // Recommended
   *     expect([1, 2]).to.not.have.members([3, 4]); // Not recommended
   *
   * `.members` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2]).to.have.members([1, 2, 3], 'nooo why fail??');
   *     expect([1, 2], 'nooo why fail??').to.have.members([1, 2, 3]);
   *
   * @name members
   * @param {Array} set
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('members', function (subset, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).to.be.an('array');
    new Assertion(subset, flagMsg, ssfi, true).to.be.an('array');

    var contains = flag(this, 'contains');
    var ordered = flag(this, 'ordered');

    var subject, failMsg, failNegateMsg;

    if (contains) {
      subject = ordered ? 'an ordered superset' : 'a superset';
      failMsg = 'expected #{this} to be ' + subject + ' of #{exp}';
      failNegateMsg = 'expected #{this} to not be ' + subject + ' of #{exp}';
    } else {
      subject = ordered ? 'ordered members' : 'members';
      failMsg = 'expected #{this} to have the same ' + subject + ' as #{exp}';
      failNegateMsg = 'expected #{this} to not have the same ' + subject + ' as #{exp}';
    }

    var cmp = flag(this, 'deep') ? _.eql : undefined;

    this.assert(
        isSubsetOf(subset, obj, cmp, contains, ordered)
      , failMsg
      , failNegateMsg
      , subset
      , obj
      , true
    );
  });

  /**
   * ### .oneOf(list[, msg])
   *
   * Asserts that the target is a member of the given array `list`. However,
   * it's often best to assert that the target is equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.oneOf([1, 2, 3]); // Not recommended
   *
   * Comparisons are performed using strict (`===`) equality.
   *
   * Add `.not` earlier in the chain to negate `.oneOf`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.oneOf([2, 3, 4]); // Not recommended
   *
   * It can also be chained with `.contain` or `.include`, which will work with
   * both arrays and strings:
   *
   *     expect('Today is sunny').to.contain.oneOf(['sunny', 'cloudy'])
   *     expect('Today is rainy').to.not.contain.oneOf(['sunny', 'cloudy'])
   *     expect([1,2,3]).to.contain.oneOf([3,4,5])
   *     expect([1,2,3]).to.not.contain.oneOf([4,5,6])
   *
   * `.oneOf` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.oneOf([2, 3, 4], 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.oneOf([2, 3, 4]);
   *
   * @name oneOf
   * @param {Array<*>} list
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function oneOf (list, msg) {
    if (msg) flag(this, 'message', msg);
    var expected = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi')
      , contains = flag(this, 'contains');
    new Assertion(list, flagMsg, ssfi, true).to.be.an('array');

    if (contains) {
      this.assert(
        list.some(function(possibility) { return expected.indexOf(possibility) > -1 })
        , 'expected #{this} to contain one of #{exp}'
        , 'expected #{this} to not contain one of #{exp}'
        , list
        , expected
      );
    } else {
      this.assert(
        list.indexOf(expected) > -1
        , 'expected #{this} to be one of #{exp}'
        , 'expected #{this} to not be one of #{exp}'
        , list
        , expected
      );
    }
  }

  Assertion.addMethod('oneOf', oneOf);

  /**
   * ### .change(subject[, prop[, msg]])
   *
   * When one argument is provided, `.change` asserts that the given function
   * `subject` returns a different value when it's invoked before the target
   * function compared to when it's invoked afterward. However, it's often best
   * to assert that `subject` is equal to its expected value.
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     // Recommended
   *     expect(getDots()).to.equal('');
   *     addDot();
   *     expect(getDots()).to.equal('.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(getDots);
   *
   * When two arguments are provided, `.change` asserts that the value of the
   * given object `subject`'s `prop` property is different before invoking the
   * target function compared to afterward.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     // Recommended
   *     expect(myObj).to.have.property('dots', '');
   *     addDot();
   *     expect(myObj).to.have.property('dots', '.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(myObj, 'dots');
   *
   * Strict (`===`) equality is used to compare before and after values.
   *
   * Add `.not` earlier in the chain to negate `.change`.
   *
   *     var dots = ''
   *       , noop = function () {}
   *       , getDots = function () { return dots; };
   *
   *     expect(noop).to.not.change(getDots);
   *
   *     var myObj = {dots: ''}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'dots');
   *
   * `.change` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     expect(addDot).to.not.change(myObj, 'dots', 'nooo why fail??');
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     expect(addDot, 'nooo why fail??').to.not.change(getDots);
   *
   * `.change` also causes all `.by` assertions that follow in the chain to
   * assert how much a numeric subject was increased or decreased by. However,
   * it's dangerous to use `.change.by`. The problem is that it creates
   * uncertain expectations by asserting that the subject either increases by
   * the given delta, or that it decreases by the given delta. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * The alias `.changes` can be used interchangeably with `.change`.
   *
   * @name change
   * @alias changes
   * @param {String} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertChanges (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    // This gets flagged because of the .by(delta) assertion
    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'change');
    flag(this, 'realDelta', final !== initial);

    this.assert(
      initial !== final
      , 'expected ' + msgObj + ' to change'
      , 'expected ' + msgObj + ' to not change'
    );
  }

  Assertion.addMethod('change', assertChanges);
  Assertion.addMethod('changes', assertChanges);

  /**
   * ### .increase(subject[, prop[, msg]])
   *
   * When one argument is provided, `.increase` asserts that the given function
   * `subject` returns a greater number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.increase` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * greater of a number is returned. It's often best to assert that the return
   * value increased by the expected amount, rather than asserting it increased
   * by any amount.
   *
   *     var val = 1
   *       , addTwo = function () { val += 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(addTwo).to.increase(getVal).by(2); // Recommended
   *     expect(addTwo).to.increase(getVal); // Not recommended
   *
   * When two arguments are provided, `.increase` asserts that the value of the
   * given object `subject`'s `prop` property is greater after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.increase(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.increase`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either decreases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to decrease, it's often best to assert that it
   * decreased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.not.increase(myObj, 'val'); // Not recommended
   *
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.increase(myObj, 'val'); // Not recommended
   *
   * `.increase` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.increase(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.increase(getVal);
   *
   * The alias `.increases` can be used interchangeably with `.increase`.
   *
   * @name increase
   * @alias increases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertIncreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'increase');
    flag(this, 'realDelta', final - initial);

    this.assert(
      final - initial > 0
      , 'expected ' + msgObj + ' to increase'
      , 'expected ' + msgObj + ' to not increase'
    );
  }

  Assertion.addMethod('increase', assertIncreases);
  Assertion.addMethod('increases', assertIncreases);

  /**
   * ### .decrease(subject[, prop[, msg]])
   *
   * When one argument is provided, `.decrease` asserts that the given function
   * `subject` returns a lesser number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.decrease` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * lesser of a number is returned. It's often best to assert that the return
   * value decreased by the expected amount, rather than asserting it decreased
   * by any amount.
   *
   *     var val = 1
   *       , subtractTwo = function () { val -= 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(subtractTwo).to.decrease(getVal).by(2); // Recommended
   *     expect(subtractTwo).to.decrease(getVal); // Not recommended
   *
   * When two arguments are provided, `.decrease` asserts that the value of the
   * given object `subject`'s `prop` property is lesser after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.decrease(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.decrease`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either increases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to increase, it's often best to assert that it
   * increased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * `.decrease` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.decrease(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.decrease(getVal);
   *
   * The alias `.decreases` can be used interchangeably with `.decrease`.
   *
   * @name decrease
   * @alias decreases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDecreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'decrease');
    flag(this, 'realDelta', initial - final);

    this.assert(
      final - initial < 0
      , 'expected ' + msgObj + ' to decrease'
      , 'expected ' + msgObj + ' to not decrease'
    );
  }

  Assertion.addMethod('decrease', assertDecreases);
  Assertion.addMethod('decreases', assertDecreases);

  /**
   * ### .by(delta[, msg])
   *
   * When following an `.increase` assertion in the chain, `.by` asserts that
   * the subject of the `.increase` assertion increased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   * When following a `.decrease` assertion in the chain, `.by` asserts that the
   * subject of the `.decrease` assertion decreased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2);
   *
   * When following a `.change` assertion in the chain, `.by` asserts that the
   * subject of the `.change` assertion either increased or decreased by the
   * given `delta`. However, it's dangerous to use `.change.by`. The problem is
   * that it creates uncertain expectations. It's often best to identify the
   * exact output that's expected, and then write an assertion that only accepts
   * that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.by`. However, it's often best
   * to assert that the subject changed by its expected delta, rather than
   * asserting that it didn't change by one of countless unexpected deltas.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     // Recommended
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   *     // Not recommended
   *     expect(addTwo).to.increase(myObj, 'val').but.not.by(3);
   *
   * `.by` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(3, 'nooo why fail??');
   *     expect(addTwo, 'nooo why fail??').to.increase(myObj, 'val').by(3);
   *
   * @name by
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDelta(delta, msg) {
    if (msg) flag(this, 'message', msg);

    var msgObj = flag(this, 'deltaMsgObj');
    var initial = flag(this, 'initialDeltaValue');
    var final = flag(this, 'finalDeltaValue');
    var behavior = flag(this, 'deltaBehavior');
    var realDelta = flag(this, 'realDelta');

    var expression;
    if (behavior === 'change') {
      expression = Math.abs(final - initial) === Math.abs(delta);
    } else {
      expression = realDelta === Math.abs(delta);
    }

    this.assert(
      expression
      , 'expected ' + msgObj + ' to ' + behavior + ' by ' + delta
      , 'expected ' + msgObj + ' to not ' + behavior + ' by ' + delta
    );
  }

  Assertion.addMethod('by', assertDelta);

  /**
   * ### .extensible
   *
   * Asserts that the target is extensible, which means that new properties can
   * be added to it. Primitives are never extensible.
   *
   *     expect({a: 1}).to.be.extensible;
   *
   * Add `.not` earlier in the chain to negate `.extensible`.
   *
   *     var nonExtensibleObject = Object.preventExtensions({})
   *       , sealedObject = Object.seal({})
   *       , frozenObject = Object.freeze({});
   *
   *     expect(nonExtensibleObject).to.not.be.extensible;
   *     expect(sealedObject).to.not.be.extensible;
   *     expect(frozenObject).to.not.be.extensible;
   *     expect(1).to.not.be.extensible;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(1, 'nooo why fail??').to.be.extensible;
   *
   * @name extensible
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('extensible', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
    // The following provides ES6 behavior for ES5 environments.

    var isExtensible = obj === Object(obj) && Object.isExtensible(obj);

    this.assert(
      isExtensible
      , 'expected #{this} to be extensible'
      , 'expected #{this} to not be extensible'
    );
  });

  /**
   * ### .sealed
   *
   * Asserts that the target is sealed, which means that new properties can't be
   * added to it, and its existing properties can't be reconfigured or deleted.
   * However, it's possible that its existing properties can still be reassigned
   * to different values. Primitives are always sealed.
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     expect(sealedObject).to.be.sealed;
   *     expect(frozenObject).to.be.sealed;
   *     expect(1).to.be.sealed;
   *
   * Add `.not` earlier in the chain to negate `.sealed`.
   *
   *     expect({a: 1}).to.not.be.sealed;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.sealed;
   *
   * @name sealed
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('sealed', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
    // The following provides ES6 behavior for ES5 environments.

    var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;

    this.assert(
      isSealed
      , 'expected #{this} to be sealed'
      , 'expected #{this} to not be sealed'
    );
  });

  /**
   * ### .frozen
   *
   * Asserts that the target is frozen, which means that new properties can't be
   * added to it, and its existing properties can't be reassigned to different
   * values, reconfigured, or deleted. Primitives are always frozen.
   *
   *     var frozenObject = Object.freeze({});
   *
   *     expect(frozenObject).to.be.frozen;
   *     expect(1).to.be.frozen;
   *
   * Add `.not` earlier in the chain to negate `.frozen`.
   *
   *     expect({a: 1}).to.not.be.frozen;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.frozen;
   *
   * @name frozen
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('frozen', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
    // The following provides ES6 behavior for ES5 environments.

    var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;

    this.assert(
      isFrozen
      , 'expected #{this} to be frozen'
      , 'expected #{this} to not be frozen'
    );
  });

  /**
   * ### .finite
   *
   * Asserts that the target is a number, and isn't `NaN` or positive/negative
   * `Infinity`.
   *
   *     expect(1).to.be.finite;
   *
   * Add `.not` earlier in the chain to negate `.finite`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either isn't a number, or that it's `NaN`, or
   * that it's positive `Infinity`, or that it's negative `Infinity`. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to be a number, it's often best to assert
   * that it's the expected type, rather than asserting that it isn't one of
   * many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.finite; // Not recommended
   *
   * When the target is expected to be `NaN`, it's often best to assert exactly
   * that.
   *
   *     expect(NaN).to.be.NaN; // Recommended
   *     expect(NaN).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be positive infinity, it's often best to
   * assert exactly that.
   *
   *     expect(Infinity).to.equal(Infinity); // Recommended
   *     expect(Infinity).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be negative infinity, it's often best to
   * assert exactly that.
   *
   *     expect(-Infinity).to.equal(-Infinity); // Recommended
   *     expect(-Infinity).to.not.be.finite; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect('foo', 'nooo why fail??').to.be.finite;
   *
   * @name finite
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('finite', function(msg) {
    var obj = flag(this, 'object');

    this.assert(
        typeof obj === 'number' && isFinite(obj)
      , 'expected #{this} to be a finite number'
      , 'expected #{this} to not be a finite number'
    );
  });
};

},{}],20:[function(require,module,exports){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expression, message)
   *
   * Write your own test expressions.
   *
   *     assert('foo' !== 'bar', 'foo is not bar');
   *     assert(Array.isArray([]), 'empty arrays are arrays');
   *
   * @param {Mixed} expression to test for truthiness
   * @param {String} message to display on error
   * @name assert
   * @namespace Assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null, null, chai.assert, true);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail([message])
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure. Node.js `assert` module-compatible.
   *
   *     assert.fail();
   *     assert.fail("custom error message");
   *     assert.fail(1, 2);
   *     assert.fail(1, 2, "custom error message");
   *     assert.fail(1, 2, "custom error message", ">");
   *     assert.fail(1, 2, undefined, ">");
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace Assert
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    if (arguments.length < 2) {
        // Comply with Node's fail([message]) interface

        message = actual;
        actual = undefined;
    }

    message = message || 'assert.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, assert.fail);
  };

  /**
   * ### .isOk(object, [message])
   *
   * Asserts that `object` is truthy.
   *
   *     assert.isOk('everything', 'everything is ok');
   *     assert.isOk(false, 'this will fail');
   *
   * @name isOk
   * @alias ok
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isOk = function (val, msg) {
    new Assertion(val, msg, assert.isOk, true).is.ok;
  };

  /**
   * ### .isNotOk(object, [message])
   *
   * Asserts that `object` is falsy.
   *
   *     assert.isNotOk('everything', 'this will fail');
   *     assert.isNotOk(false, 'this will pass');
   *
   * @name isNotOk
   * @alias notOk
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotOk = function (val, msg) {
    new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     assert.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.equal, true);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.notEqual, true);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Asserts strict equality (`===`) of `actual` and `expected`.
   *
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Asserts strict inequality (`!==`) of `actual` and `expected`.
   *
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
   *
   * @name notStrictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Asserts that `actual` is deeply equal to `expected`.
   *
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @alias deepStrictEqual
   * @namespace Assert
   * @api public
   */

  assert.deepEqual = assert.deepStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert that `actual` is not deeply equal to `expected`.
   *
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
  };

   /**
   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
   *
   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
   *
   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
   *
   * @name isAbove
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAbove
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAbove = function (val, abv, msg) {
    new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
  };

   /**
   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
   *
   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
   *
   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
   *
   * @name isAtLeast
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtLeast
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtLeast = function (val, atlst, msg) {
    new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
  };

   /**
   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
   *
   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
   *
   *     assert.isBelow(3, 6, '3 is strictly less than 6');
   *
   * @name isBelow
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeBelow
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBelow = function (val, blw, msg) {
    new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
  };

   /**
   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
   *
   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
   *
   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
   *
   * @name isAtMost
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtMost
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtMost = function (val, atmst, msg) {
    new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Asserts that `value` is true.
   *
   *     var teaServed = true;
   *     assert.isTrue(teaServed, 'the tea has been served');
   *
   * @name isTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg, assert.isTrue, true).is['true'];
  };

  /**
   * ### .isNotTrue(value, [message])
   *
   * Asserts that `value` is not true.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotTrue(tea, 'great, time for tea!');
   *
   * @name isNotTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotTrue = function (val, msg) {
    new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Asserts that `value` is false.
   *
   *     var teaServed = false;
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg, assert.isFalse, true).is['false'];
  };

  /**
   * ### .isNotFalse(value, [message])
   *
   * Asserts that `value` is not false.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotFalse(tea, 'great, time for tea!');
   *
   * @name isNotFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFalse = function (val, msg) {
    new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
  };

  /**
   * ### .isNull(value, [message])
   *
   * Asserts that `value` is null.
   *
   *     assert.isNull(err, 'there was no error');
   *
   * @name isNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg, assert.isNull, true).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Asserts that `value` is not null.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
  };

  /**
   * ### .isNaN
   *
   * Asserts that value is NaN.
   *
   *     assert.isNaN(NaN, 'NaN is NaN');
   *
   * @name isNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
  };

  /**
   * ### .isNotNaN
   *
   * Asserts that value is not NaN.
   *
   *     assert.isNotNaN(4, '4 is not NaN');
   *
   * @name isNotNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */
  assert.isNotNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNotNaN, true).not.to.be.NaN;
  };

  /**
   * ### .exists
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi';
   *
   *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
   *
   * @name exists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.exists = function (val, msg) {
    new Assertion(val, msg, assert.exists, true).to.exist;
  };

  /**
   * ### .notExists
   *
   * Asserts that the target is either `null` or `undefined`.
   *
   *     var bar = null
   *       , baz;
   *
   *     assert.notExists(bar);
   *     assert.notExists(baz, 'baz is either null or undefined');
   *
   * @name notExists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notExists = function (val, msg) {
    new Assertion(val, msg, assert.notExists, true).to.not.exist;
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Asserts that `value` is `undefined`.
   *
   *     var tea;
   *     assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg, assert.isUndefined, true).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Asserts that `value` is not `undefined`.
   *
   *     var tea = 'cup of chai';
   *     assert.isDefined(tea, 'tea has been defined');
   *
   * @name isDefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg, assert.isDefined, true).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Asserts that `value` is a function.
   *
   *     function serveTea() { return 'cup of tea'; };
   *     assert.isFunction(serveTea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg, assert.isFunction, true).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Asserts that `value` is _not_ a function.
   *
   *     var serveTea = [ 'heat', 'pour', 'sip' ];
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg, assert.isNotFunction, true).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
   * _The assertion does not match subclassed objects._
   *
   *     var selection = { name: 'Chai', serve: 'with spices' };
   *     assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg, assert.isObject, true).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
   *
   *     var selection = 'chai'
   *     assert.isNotObject(selection, 'tea selection is not an object');
   *     assert.isNotObject(null, 'null is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg, assert.isNotObject, true).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Asserts that `value` is an array.
   *
   *     var menu = [ 'green', 'chai', 'oolong' ];
   *     assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg, assert.isArray, true).to.be.an('array');
  };

  /**
   * ### .isNotArray(value, [message])
   *
   * Asserts that `value` is _not_ an array.
   *
   *     var menu = 'green|chai|oolong';
   *     assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg, assert.isNotArray, true).to.not.be.an('array');
  };

  /**
   * ### .isString(value, [message])
   *
   * Asserts that `value` is a string.
   *
   *     var teaOrder = 'chai';
   *     assert.isString(teaOrder, 'order placed');
   *
   * @name isString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg, assert.isString, true).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Asserts that `value` is _not_ a string.
   *
   *     var teaOrder = 4;
   *     assert.isNotString(teaOrder, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg, assert.isNotString, true).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Asserts that `value` is a number.
   *
   *     var cups = 2;
   *     assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNumber, true).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Asserts that `value` is _not_ a number.
   *
   *     var cups = '2 cups please';
   *     assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a('number');
  };

   /**
   * ### .isFinite(value, [message])
   *
   * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
   *
   *     var cups = 2;
   *     assert.isFinite(cups, 'how many cups');
   *
   *     assert.isFinite(NaN); // throws
   *
   * @name isFinite
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFinite = function (val, msg) {
    new Assertion(val, msg, assert.isFinite, true).to.be.finite;
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Asserts that `value` is a boolean.
   *
   *     var teaReady = true
   *       , teaServed = false;
   *
   *     assert.isBoolean(teaReady, 'is the tea ready');
   *     assert.isBoolean(teaServed, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isBoolean, true).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Asserts that `value` is _not_ a boolean.
   *
   *     var teaReady = 'yep'
   *       , teaServed = 'nope';
   *
   *     assert.isNotBoolean(teaReady, 'is the tea ready');
   *     assert.isNotBoolean(teaServed, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Asserts that `value`'s type is `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
   *     assert.typeOf('tea', 'string', 'we have a string');
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
   *     assert.typeOf(null, 'null', 'we have a null');
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.typeOf, true).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Asserts that `value`'s type is _not_ `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notTypeOf, true).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Asserts that `value` is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new Tea('chai');
   *
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Asserts `value` is not an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new String('chai');
   *
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notInstanceOf, true)
      .to.not.be.instanceOf(type);
  };

  /**
   * ### .include(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.include([1,2,3], 2, 'array contains value');
   *     assert.include('foobar', 'foo', 'string contains substring');
   *     assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
   *
   * Strict equality (===) is used. When asserting the inclusion of a value in
   * an array, the array is searched for an element that's strictly equal to the
   * given value. When asserting a subset of properties in an object, the object
   * is searched for the given property keys, checking that each one is present
   * and strictly equal to the given property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.include([obj1, obj2], obj1);
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
   *
   * @name include
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.include, true).include(inc);
  };

  /**
   * ### .notInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.notInclude([1,2,3], 4, "array doesn't contain value");
   *     assert.notInclude('foobar', 'baz', "string doesn't contain substring");
   *     assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
   *
   * Strict equality (===) is used. When asserting the absence of a value in an
   * array, the array is searched to confirm the absence of an element that's
   * strictly equal to the given value. When asserting a subset of properties in
   * an object, the object is searched to confirm that at least one of the given
   * property keys is either not present or not strictly equal to the given
   * property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notInclude([obj1, obj2], {a: 1});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
   *
   * @name notInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
  };

  /**
   * ### .deepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.deepInclude([obj1, obj2], {a: 1});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
   *
   * @name deepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
  };

  /**
   * ### .notDeepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notDeepInclude([obj1, obj2], {a: 9});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
   *
   * @name notDeepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
  };

  /**
   * ### .nestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.[b]': 'x'});
   *     assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
   *
   * @name nestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
  };

  /**
   * ### .notNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
   *     assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});
   *
   * @name notNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notNestedInclude, true)
      .not.nested.include(inc);
  };

  /**
   * ### .deepNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}});
   *     assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}});
   *
   * @name deepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepNestedInclude, true)
      .deep.nested.include(inc);
  };

  /**
   * ### .notDeepNestedInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   *
   *     assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}})
   *     assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});
   *
   * @name notDeepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepNestedInclude, true)
      .not.deep.nested.include(inc);
  };

  /**
   * ### .ownInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while ignoring inherited properties.
   *
   *     assert.ownInclude({ a: 1 }, { a: 1 });
   *
   * @name ownInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.ownInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
  };

  /**
   * ### .notOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while ignoring inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     assert.notOwnInclude({ a: 1 }, { b: 2 });
   *
   * @name notOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
  };

  /**
   * ### .deepOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an
   * object while ignoring inherited properties and checking for deep equality.
   *
   *      assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
   *
   * @name deepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepOwnInclude, true)
      .deep.own.include(inc);
  };

   /**
   * ### .notDeepOwnInclude(haystack, needle, [message])
   *
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an
   * object while ignoring inherited properties and checking for deep equality.
   *
   *      assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});
   *
   * @name notDeepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepOwnInclude, true)
      .not.deep.own.include(inc);
  };

  /**
   * ### .match(value, regexp, [message])
   *
   * Asserts that `value` matches the regular expression `regexp`.
   *
   *     assert.match('foobar', /^foo/, 'regexp matches');
   *
   * @name match
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg, assert.match, true).to.match(re);
  };

  /**
   * ### .notMatch(value, regexp, [message])
   *
   * Asserts that `value` does not match the regular expression `regexp`.
   *
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
   *
   * @name notMatch
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`.
   *
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
   *     assert.property({ tea: { green: 'matcha' }}, 'toString');
   *
   * @name property
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.property, true).to.have.property(prop);
  };

  /**
   * ### .notProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property`.
   *
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
   *
   * @name notProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notProperty, true)
      .to.not.have.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.propertyVal, true)
      .to.have.property(prop, val);
  };

  /**
   * ### .notPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
   *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
   *
   * @name notPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notPropertyVal, true)
      .to.not.have.property(prop, val);
  };

  /**
   * ### .deepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a deep equality check.
   *
   *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepPropertyVal, true)
      .to.have.deep.property(prop, val);
  };

  /**
   * ### .notDeepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a deep equality check.
   *
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *
   * @name notDeepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepPropertyVal, true)
      .to.not.have.deep.property(prop, val);
  };

  /**
   * ### .ownProperty(object, property, [message])
   *
   * Asserts that `object` has a direct property named by `property`. Inherited
   * properties aren't checked.
   *
   *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
   *
   * @name ownProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.ownProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.ownProperty, true)
      .to.have.own.property(prop);
  };

  /**
   * ### .notOwnProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by
   * `property`. Inherited properties aren't checked.
   *
   *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
   *     assert.notOwnProperty({}, 'toString');
   *
   * @name notOwnProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notOwnProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notOwnProperty, true)
      .to.not.have.own.property(prop);
  };

  /**
   * ### .ownPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a strict equality check (===).
   * Inherited properties aren't checked.
   *
   *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
   *
   * @name ownPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.ownPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.ownPropertyVal, true)
      .to.have.own.property(prop, value);
  };

  /**
   * ### .notOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a strict equality check
   * (===). Inherited properties aren't checked.
   *
   *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
   *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notOwnPropertyVal, true)
      .to.not.have.own.property(prop, value);
  };

  /**
   * ### .deepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a deep equality check. Inherited
   * properties aren't checked.
   *
   *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.deepOwnPropertyVal, true)
      .to.have.deep.own.property(prop, value);
  };

  /**
   * ### .notDeepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a deep equality check.
   * Inherited properties aren't checked.
   *
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notDeepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notDeepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notDeepOwnPropertyVal, true)
      .to.not.have.deep.own.property(prop, value);
  };

  /**
   * ### .nestedProperty(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`, which can be a string using dot- and bracket-notation for
   * nested reference.
   *
   *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name nestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.nestedProperty, true)
      .to.have.nested.property(prop);
  };

  /**
   * ### .notNestedProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`, which
   * can be a string using dot- and bracket-notation for nested reference. The
   * property cannot exist on the object nor anywhere in its prototype chain.
   *
   *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notNestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notNestedProperty, true)
      .to.not.have.nested.property(prop);
  };

  /**
   * ### .nestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a strict equality check (===).
   *
   *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name nestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.nestedPropertyVal, true)
      .to.have.nested.property(prop, val);
  };

  /**
   * ### .notNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a strict equality check (===).
   *
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
   *
   * @name notNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notNestedPropertyVal, true)
      .to.not.have.nested.property(prop, val);
  };

  /**
   * ### .deepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with a value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a deep equality check.
   *
   *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
   *
   * @name deepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepNestedPropertyVal, true)
      .to.have.deep.nested.property(prop, val);
  };

  /**
   * ### .notDeepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a deep equality check.
   *
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
   *
   * @name notDeepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepNestedPropertyVal, true)
      .to.not.have.deep.nested.property(prop, val);
  }

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Asserts that `object` has a `length` or `size` with the expected value.
   *
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
   *     assert.lengthOf('foobar', 6, 'string has length of 6');
   *     assert.lengthOf(new Set([1,2,3]), 3, 'set has size of 3');
   *     assert.lengthOf(new Map([['a',1],['b',2],['c',3]]), 3, 'map has size of 3');
   *
   * @name lengthOf
   * @param {Mixed} object
   * @param {Number} length
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
  };

  /**
   * ### .hasAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
   *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAnyKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
  }

  /**
   * ### .hasAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
   *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
  }

  /**
   * ### .containsAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}]);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name containsAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllKeys, true)
      .to.contain.all.keys(keys);
  }

  /**
   * ### .doesNotHaveAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAnyKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true)
      .to.not.have.any.keys(keys);
  }

  /**
   * ### .doesNotHaveAllKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllKeys, true)
      .to.not.have.all.keys(keys);
  }

  /**
   * ### .hasAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name hasAnyDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyDeepKeys, true)
      .to.have.any.deep.keys(keys);
  }

 /**
   * ### .hasAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name hasAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllDeepKeys, true)
      .to.have.all.deep.keys(keys);
  }

 /**
   * ### .containsAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` contains all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name containsAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllDeepKeys, true)
      .to.contain.all.deep.keys(keys);
  }

 /**
   * ### .doesNotHaveAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAnyDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyDeepKeys, true)
      .to.not.have.any.deep.keys(keys);
  }

 /**
   * ### .doesNotHaveAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllDeepKeys, true)
      .to.not.have.all.deep.keys(keys);
  }

 /**
   * ### .throws(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will have a
   * message matching `errMsgMatcher`.
   *
   *     assert.throws(fn, 'Error thrown must have this msg');
   *     assert.throws(fn, /Error thrown must have a msg that matches this/);
   *     assert.throws(fn, ReferenceError);
   *     assert.throws(fn, errorInstance);
   *     assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg');
   *     assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg');
   *     assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/);
   *     assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/);
   *
   * @name throws
   * @alias throw
   * @alias Throw
   * @param {Function} fn
   * @param {ErrorConstructor|Error} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.throws = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var assertErr = new Assertion(fn, msg, assert.throws, true)
      .to.throw(errorLike, errMsgMatcher);
    return flag(assertErr, 'object');
  };

  /**
   * ### .doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will _not_ throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is _not_ the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will _not_ have a
   * message matching `errMsgMatcher`.
   *
   *     assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
   *     assert.doesNotThrow(fn, /Any Error thrown must not match this/);
   *     assert.doesNotThrow(fn, Error);
   *     assert.doesNotThrow(fn, errorInstance);
   *     assert.doesNotThrow(fn, Error, 'Error must not have this message');
   *     assert.doesNotThrow(fn, errorInstance, 'Error must not have this message');
   *     assert.doesNotThrow(fn, Error, /Error must not match this/);
   *     assert.doesNotThrow(fn, errorInstance, /Error must not match this/);
   *
   * @name doesNotThrow
   * @param {Function} fn
   * @param {ErrorConstructor} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.doesNotThrow = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    new Assertion(fn, msg, assert.doesNotThrow, true)
      .to.not.throw(errorLike, errMsgMatcher);
  };

  /**
   * ### .operator(val1, operator, val2, [message])
   *
   * Compares two values using `operator`.
   *
   *     assert.operator(1, '<', 2, 'everything is ok');
   *     assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {Mixed} val1
   * @param {String} operator
   * @param {Mixed} val2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    var ok;
    switch(operator) {
      case '==':
        ok = val == val2;
        break;
      case '===':
        ok = val === val2;
        break;
      case '>':
        ok = val > val2;
        break;
      case '>=':
        ok = val >= val2;
        break;
      case '<':
        ok = val < val2;
        break;
      case '<=':
        ok = val <= val2;
        break;
      case '!=':
        ok = val != val2;
        break;
      case '!==':
        ok = val !== val2;
        break;
      default:
        msg = msg ? msg + ': ' : msg;
        throw new chai.AssertionError(
          msg + 'Invalid operator "' + operator + '"',
          undefined,
          assert.operator
        );
    }
    var test = new Assertion(ok, msg, assert.operator, true);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /**
   * ### .closeTo(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
   *
   * @name closeTo
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.closeTo = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
  };

  /**
   * ### .approximately(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
   *
   * @name approximately
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.approximately = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.approximately, true)
      .to.be.approximately(exp, delta);
  };

  /**
   * ### .sameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * strict equality check (===).
   *
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
   *
   * @name sameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameMembers, true)
      .to.have.same.members(set2);
  }

  /**
   * ### .notSameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a strict equality check (===).
   *
   *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
   *
   * @name notSameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameMembers, true)
      .to.not.have.same.members(set2);
  }

  /**
   * ### .sameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * deep equality check.
   *
   *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
   *
   * @name sameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepMembers, true)
      .to.have.same.deep.members(set2);
  }

  /**
   * ### .notSameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a deep equality check.
   *
   *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
   *
   * @name notSameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepMembers, true)
      .to.not.have.same.deep.members(set2);
  }

  /**
   * ### .sameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a strict equality check (===).
   *
   *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
   *
   * @name sameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameOrderedMembers, true)
      .to.have.same.ordered.members(set2);
  }

  /**
   * ### .notSameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a strict equality check (===).
   *
   *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
   *
   * @name notSameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameOrderedMembers, true)
      .to.not.have.same.ordered.members(set2);
  }

  /**
   * ### .sameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a deep equality check.
   *
   * assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
   *
   * @name sameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepOrderedMembers, true)
      .to.have.same.deep.ordered.members(set2);
  }

  /**
   * ### .notSameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a deep equality check.
   *
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
   *
   * @name notSameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepOrderedMembers, true)
      .to.not.have.same.deep.ordered.members(set2);
  }

  /**
   * ### .includeMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
   *
   * @name includeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeMembers, true)
      .to.include.members(subset);
  }

  /**
   * ### .notIncludeMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
   *
   * @name notIncludeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeMembers, true)
      .to.not.include.members(subset);
  }

  /**
   * ### .includeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a deep
   * equality check. Duplicates are ignored.
   *
   *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
   *
   * @name includeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepMembers, true)
      .to.include.deep.members(subset);
  }

  /**
   * ### .notIncludeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * deep equality check. Duplicates are ignored.
   *
   *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
   *
   * @name notIncludeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepMembers, true)
      .to.not.include.deep.members(subset);
  }

  /**
   * ### .includeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
   *
   * @name includeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeOrderedMembers, true)
      .to.include.ordered.members(subset);
  }

  /**
   * ### .notIncludeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
   *
   * @name notIncludeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeOrderedMembers, true)
      .to.not.include.ordered.members(subset);
  }

  /**
   * ### .includeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
   *
   * @name includeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepOrderedMembers, true)
      .to.include.deep.ordered.members(subset);
  }

  /**
   * ### .notIncludeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
   *
   * @name notIncludeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepOrderedMembers, true)
      .to.not.include.deep.ordered.members(subset);
  }

  /**
   * ### .oneOf(inList, list, [message])
   *
   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
   *
   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
   *
   * @name oneOf
   * @param {*} inList
   * @param {Array<*>} list
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.oneOf = function (inList, list, msg) {
    new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
  }

  /**
   * ### .changes(function, object, property, [message])
   *
   * Asserts that a function changes the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 22 };
   *     assert.changes(fn, obj, 'val');
   *
   * @name changes
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changes = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changes, true).to.change(obj, prop);
  }

   /**
   * ### .changesBy(function, object, property, delta, [message])
   *
   * Asserts that a function changes the value of a property by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 2 };
   *     assert.changesBy(fn, obj, 'val', 2);
   *
   * @name changesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesBy, true)
      .to.change(obj, prop).by(delta);
  }

   /**
   * ### .doesNotChange(function, object, property, [message])
   *
   * Asserts that a function does not change the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { console.log('foo'); };
   *     assert.doesNotChange(fn, obj, 'val');
   *
   * @name doesNotChange
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotChange = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotChange, true)
      .to.not.change(obj, prop);
  }

  /**
   * ### .changesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not change the value of a property or of a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.changesButNotBy(fn, obj, 'val', 5);
   *
   * @name changesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesButNotBy, true)
      .to.change(obj, prop).but.not.by(delta);
  }

  /**
   * ### .increases(function, object, property, [message])
   *
   * Asserts that a function increases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 13 };
   *     assert.increases(fn, obj, 'val');
   *
   * @name increases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.increases, true)
      .to.increase(obj, prop);
  }

  /**
   * ### .increasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function increases a numeric object property or a function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.increasesBy(fn, obj, 'val', 10);
   *
   * @name increasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesBy, true)
      .to.increase(obj, prop).by(delta);
  }

  /**
   * ### .doesNotIncrease(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 8 };
   *     assert.doesNotIncrease(fn, obj, 'val');
   *
   * @name doesNotIncrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotIncrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotIncrease, true)
      .to.not.increase(obj, prop);
  }

  /**
   * ### .increasesButNotBy(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property or function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.increasesButNotBy(fn, obj, 'val', 10);
   *
   * @name increasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesButNotBy, true)
      .to.increase(obj, prop).but.not.by(delta);
  }

  /**
   * ### .decreases(function, object, property, [message])
   *
   * Asserts that a function decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreases(fn, obj, 'val');
   *
   * @name decreases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.decreases, true)
      .to.decrease(obj, prop);
  }

  /**
   * ### .decreasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val -= 5 };
   *     assert.decreasesBy(fn, obj, 'val', 5);
   *
   * @name decreasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesBy, true)
      .to.decrease(obj, prop).by(delta);
  }

  /**
   * ### .doesNotDecrease(function, object, property, [message])
   *
   * Asserts that a function does not decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.doesNotDecrease(fn, obj, 'val');
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecrease, true)
      .to.not.decrease(obj, prop);
  }

  /**
   * ### .doesNotDecreaseBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.doesNotDecreaseBy(fn, obj, 'val', 1);
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecreaseBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecreaseBy, true)
      .to.not.decrease(obj, prop).by(delta);
  }

  /**
   * ### .decreasesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreasesButNotBy(fn, obj, 'val', 1);
   *
   * @name decreasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesButNotBy, true)
      .to.decrease(obj, prop).but.not.by(delta);
  }

  /*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   */

  assert.ifError = function (val) {
    if (val) {
      throw(val);
    }
  };

  /**
   * ### .isExtensible(object)
   *
   * Asserts that `object` is extensible (can have new properties added to it).
   *
   *     assert.isExtensible({});
   *
   * @name isExtensible
   * @alias extensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
  };

  /**
   * ### .isNotExtensible(object)
   *
   * Asserts that `object` is _not_ extensible.
   *
   *     var nonExtensibleObject = Object.preventExtensions({});
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     assert.isNotExtensible(nonExtensibleObject);
   *     assert.isNotExtensible(sealedObject);
   *     assert.isNotExtensible(frozenObject);
   *
   * @name isNotExtensible
   * @alias notExtensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
  };

  /**
   * ### .isSealed(object)
   *
   * Asserts that `object` is sealed (cannot have new properties added to it
   * and its existing properties cannot be removed).
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.seal({});
   *
   *     assert.isSealed(sealedObject);
   *     assert.isSealed(frozenObject);
   *
   * @name isSealed
   * @alias sealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
  };

  /**
   * ### .isNotSealed(object)
   *
   * Asserts that `object` is _not_ sealed.
   *
   *     assert.isNotSealed({});
   *
   * @name isNotSealed
   * @alias notSealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
  };

  /**
   * ### .isFrozen(object)
   *
   * Asserts that `object` is frozen (cannot have new properties added to it
   * and its existing properties cannot be modified).
   *
   *     var frozenObject = Object.freeze({});
   *     assert.frozen(frozenObject);
   *
   * @name isFrozen
   * @alias frozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
  };

  /**
   * ### .isNotFrozen(object)
   *
   * Asserts that `object` is _not_ frozen.
   *
   *     assert.isNotFrozen({});
   *
   * @name isNotFrozen
   * @alias notFrozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
  };

  /**
   * ### .isEmpty(target)
   *
   * Asserts that the target does not contain any values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isEmpty([]);
   *     assert.isEmpty('');
   *     assert.isEmpty(new Map);
   *     assert.isEmpty({});
   *
   * @name isEmpty
   * @alias empty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
  };

  /**
   * ### .isNotEmpty(target)
   *
   * Asserts that the target contains values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isNotEmpty([1, 2]);
   *     assert.isNotEmpty('34');
   *     assert.isNotEmpty(new Set([5, 6]));
   *     assert.isNotEmpty({ key: 7 });
   *
   * @name isNotEmpty
   * @alias notEmpty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('isOk', 'ok')
  ('isNotOk', 'notOk')
  ('throws', 'throw')
  ('throws', 'Throw')
  ('isExtensible', 'extensible')
  ('isNotExtensible', 'notExtensible')
  ('isSealed', 'sealed')
  ('isNotSealed', 'notSealed')
  ('isFrozen', 'frozen')
  ('isNotFrozen', 'notFrozen')
  ('isEmpty', 'empty')
  ('isNotEmpty', 'notEmpty');
};

},{}],21:[function(require,module,exports){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };

  /**
   * ### .fail([message])
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure.
   *
   *     expect.fail();
   *     expect.fail("custom error message");
   *     expect.fail(1, 2);
   *     expect.fail(1, 2, "custom error message");
   *     expect.fail(1, 2, "custom error message", ">");
   *     expect.fail(1, 2, undefined, ">");
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace BDD
   * @api public
   */

  chai.expect.fail = function (actual, expected, message, operator) {
    if (arguments.length < 2) {
        message = actual;
        actual = undefined;
    }

    message = message || 'expect.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, chai.expect.fail);
  };
};

},{}],22:[function(require,module,exports){
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

module.exports = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // explicitly define this method as function as to have it's name to include as `ssfi`
    function shouldGetter() {
      if (this instanceof String
          || this instanceof Number
          || this instanceof Boolean
          || typeof Symbol === 'function' && this instanceof Symbol
          || typeof BigInt === 'function' && this instanceof BigInt) {
        return new Assertion(this.valueOf(), null, shouldGetter);
      }
      return new Assertion(this, null, shouldGetter);
    }
    function shouldSetter(value) {
      // See https://github.com/chaijs/chai/issues/86: this makes
      // `whatever.should = someValue` actually set `someValue`, which is
      // especially useful for `global.should = require('chai').should()`.
      //
      // Note that we have to use [[DefineProperty]] instead of [[Put]]
      // since otherwise we would trigger this very setter!
      Object.defineProperty(this, 'should', {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should', {
      set: shouldSetter
      , get: shouldGetter
      , configurable: true
    });

    var should = {};

    /**
     * ### .fail([message])
     * ### .fail(actual, expected, [message], [operator])
     *
     * Throw a failure.
     *
     *     should.fail();
     *     should.fail("custom error message");
     *     should.fail(1, 2);
     *     should.fail(1, 2, "custom error message");
     *     should.fail(1, 2, "custom error message", ">");
     *     should.fail(1, 2, undefined, ">");
     *
     *
     * @name fail
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @param {String} operator
     * @namespace BDD
     * @api public
     */

    should.fail = function (actual, expected, message, operator) {
      if (arguments.length < 2) {
          message = actual;
          actual = undefined;
      }

      message = message || 'should.fail()';
      throw new chai.AssertionError(message, {
          actual: actual
        , expected: expected
        , operator: operator
      }, should.fail);
    };

    /**
     * ### .equal(actual, expected, [message])
     *
     * Asserts non-strict equality (`==`) of `actual` and `expected`.
     *
     *     should.equal(3, '3', '== coerces values to strings');
     *
     * @name equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
     *
     * Asserts that `function` will throw an error that is an instance of
     * `constructor`, or alternately that it will throw an error with message
     * matching `regexp`.
     *
     *     should.throw(fn, 'function throws a reference error');
     *     should.throw(fn, /function throws a reference error/);
     *     should.throw(fn, ReferenceError);
     *     should.throw(fn, ReferenceError, 'function throws a reference error');
     *     should.throw(fn, ReferenceError, /function throws a reference error/);
     *
     * @name throw
     * @alias Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };

    /**
     * ### .exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var foo = 'hi';
     *
     *     should.exist(foo, 'foo exists');
     *
     * @name exist
     * @namespace Should
     * @api public
     */

    should.exist = function (val, msg) {
      new Assertion(val, msg).to.exist;
    }

    // negation
    should.not = {}

    /**
     * ### .not.equal(actual, expected, [message])
     *
     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
     *
     *     should.not.equal(3, 4, 'these numbers are not equal');
     *
     * @name not.equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.not.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/regexp], [message])
     *
     * Asserts that `function` will _not_ throw an error that is an instance of
     * `constructor`, or alternately that it will not throw an error with message
     * matching `regexp`.
     *
     *     should.not.throw(fn, Error, 'function does not throw');
     *
     * @name not.throw
     * @alias not.Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.not.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };

    /**
     * ### .not.exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var bar = null;
     *
     *     should.not.exist(bar, 'bar does not exist');
     *
     * @name not.exist
     * @namespace Should
     * @api public
     */

    should.not.exist = function (val, msg) {
      new Assertion(val, msg).to.not.exist;
    }

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  };

  chai.should = loadShould;
  chai.Should = loadShould;
};

},{}],23:[function(require,module,exports){
/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var addLengthGuard = require('./addLengthGuard');
var chai = require('../../chai');
var flag = require('./flag');
var proxify = require('./proxify');
var transferFlags = require('./transferFlags');

/*!
 * Module variables
 */

// Check whether `Object.setPrototypeOf` is supported
var canSetPrototype = typeof Object.setPrototypeOf === 'function';

// Without `Object.setPrototypeOf` support, this module will need to add properties to a function.
// However, some of functions' own props are not configurable and should be skipped.
var testFn = function() {};
var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  var propDesc = Object.getOwnPropertyDescriptor(testFn, name);

  // Note: PhantomJS 1.x includes `callee` as one of `testFn`'s own properties,
  // but then returns `undefined` as the property descriptor for `callee`. As a
  // workaround, we perform an otherwise unnecessary type-check for `propDesc`,
  // and then filter it out if it's not an object as it should be.
  if (typeof propDesc !== 'object')
    return true;

  return !propDesc.configurable;
});

// Cache `Function` properties
var call  = Function.prototype.call,
    apply = Function.prototype.apply;

/**
 * ### .addChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @namespace Utils
 * @name addChainableMethod
 * @api public
 */

module.exports = function addChainableMethod(ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function') {
    chainingBehavior = function () { };
  }

  var chainableBehavior = {
      method: method
    , chainingBehavior: chainingBehavior
  };

  // save the methods so we can overwrite them later, if we need to.
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;

  Object.defineProperty(ctx, name,
    { get: function chainableMethodGetter() {
        chainableBehavior.chainingBehavior.call(this);

        var chainableMethodWrapper = function () {
          // Setting the `ssfi` flag to `chainableMethodWrapper` causes this
          // function to be the starting point for removing implementation
          // frames from the stack trace of a failed assertion.
          //
          // However, we only want to use this function as the starting point if
          // the `lockSsfi` flag isn't set.
          //
          // If the `lockSsfi` flag is set, then this assertion is being
          // invoked from inside of another assertion. In this case, the `ssfi`
          // flag has already been set by the outer assertion.
          //
          // Note that overwriting a chainable method merely replaces the saved
          // methods in `ctx.__methods` instead of completely replacing the
          // overwritten assertion. Therefore, an overwriting assertion won't
          // set the `ssfi` or `lockSsfi` flags.
          if (!flag(this, 'lockSsfi')) {
            flag(this, 'ssfi', chainableMethodWrapper);
          }

          var result = chainableBehavior.method.apply(this, arguments);
          if (result !== undefined) {
            return result;
          }

          var newAssertion = new chai.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };

        addLengthGuard(chainableMethodWrapper, name, true);

        // Use `Object.setPrototypeOf` if available
        if (canSetPrototype) {
          // Inherit all properties from the object by replacing the `Function` prototype
          var prototype = Object.create(this);
          // Restore the `call` and `apply` methods from `Function`
          prototype.call = call;
          prototype.apply = apply;
          Object.setPrototypeOf(chainableMethodWrapper, prototype);
        }
        // Otherwise, redefine all properties (slow!)
        else {
          var asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function (asserterName) {
            if (excludeNames.indexOf(asserterName) !== -1) {
              return;
            }

            var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(chainableMethodWrapper, asserterName, pd);
          });
        }

        transferFlags(this, chainableMethodWrapper);
        return proxify(chainableMethodWrapper);
      }
    , configurable: true
  });
};

},{"../../chai":16,"./addLengthGuard":24,"./flag":29,"./proxify":45,"./transferFlags":47}],24:[function(require,module,exports){
var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');

/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .addLengthGuard(fn, assertionName, isChainable)
 *
 * Define `length` as a getter on the given uninvoked method assertion. The
 * getter acts as a guard against chaining `length` directly off of an uninvoked
 * method assertion, which is a problem because it references `function`'s
 * built-in `length` property instead of Chai's `length` assertion. When the
 * getter catches the user making this mistake, it throws an error with a
 * helpful message.
 *
 * There are two ways in which this mistake can be made. The first way is by
 * chaining the `length` assertion directly off of an uninvoked chainable
 * method. In this case, Chai suggests that the user use `lengthOf` instead. The
 * second way is by chaining the `length` assertion directly off of an uninvoked
 * non-chainable method. Non-chainable methods must be invoked prior to
 * chaining. In this case, Chai suggests that the user consult the docs for the
 * given assertion.
 *
 * If the `length` property of functions is unconfigurable, then return `fn`
 * without modification.
 *
 * Note that in ES6, the function's `length` property is configurable, so once
 * support for legacy environments is dropped, Chai's `length` property can
 * replace the built-in function's `length` property, and this length guard will
 * no longer be necessary. In the mean time, maintaining consistency across all
 * environments is the priority.
 *
 * @param {Function} fn
 * @param {String} assertionName
 * @param {Boolean} isChainable
 * @namespace Utils
 * @name addLengthGuard
 */

module.exports = function addLengthGuard (fn, assertionName, isChainable) {
  if (!fnLengthDesc.configurable) return fn;

  Object.defineProperty(fn, 'length', {
    get: function () {
      if (isChainable) {
        throw Error('Invalid Chai property: ' + assertionName + '.length. Due' +
          ' to a compatibility issue, "length" cannot directly follow "' +
          assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
      }

      throw Error('Invalid Chai property: ' + assertionName + '.length. See' +
        ' docs for proper usage of "' + assertionName + '".');
    }
  });

  return fn;
};

},{}],25:[function(require,module,exports){
/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = require('./addLengthGuard');
var chai = require('../../chai');
var flag = require('./flag');
var proxify = require('./proxify');
var transferFlags = require('./transferFlags');

/**
 * ### .addMethod(ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @namespace Utils
 * @name addMethod
 * @api public
 */

module.exports = function addMethod(ctx, name, method) {
  var methodWrapper = function () {
    // Setting the `ssfi` flag to `methodWrapper` causes this function to be the
    // starting point for removing implementation frames from the stack trace of
    // a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', methodWrapper);
    }

    var result = method.apply(this, arguments);
    if (result !== undefined)
      return result;

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  addLengthGuard(methodWrapper, name, false);
  ctx[name] = proxify(methodWrapper, name);
};

},{"../../chai":16,"./addLengthGuard":24,"./flag":29,"./proxify":45,"./transferFlags":47}],26:[function(require,module,exports){
/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = require('../../chai');
var flag = require('./flag');
var isProxyEnabled = require('./isProxyEnabled');
var transferFlags = require('./transferFlags');

/**
 * ### .addProperty(ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @namespace Utils
 * @name addProperty
 * @api public
 */

module.exports = function addProperty(ctx, name, getter) {
  getter = getter === undefined ? function () {} : getter;

  Object.defineProperty(ctx, name,
    { get: function propertyGetter() {
        // Setting the `ssfi` flag to `propertyGetter` causes this function to
        // be the starting point for removing implementation frames from the
        // stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', propertyGetter);
        }

        var result = getter.call(this);
        if (result !== undefined)
          return result;

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};

},{"../../chai":16,"./flag":29,"./isProxyEnabled":40,"./transferFlags":47}],27:[function(require,module,exports){
/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var inspect = require('./inspect');

/**
 * ### .compareByInspect(mixed, mixed)
 *
 * To be used as a compareFunction with Array.prototype.sort. Compares elements
 * using inspect instead of default behavior of using toString so that Symbols
 * and objects with irregular/missing toString can still be sorted without a
 * TypeError.
 *
 * @param {Mixed} first element to compare
 * @param {Mixed} second element to compare
 * @returns {Number} -1 if 'a' should come before 'b'; otherwise 1
 * @name compareByInspect
 * @namespace Utils
 * @api public
 */

module.exports = function compareByInspect(a, b) {
  return inspect(a) < inspect(b) ? -1 : 1;
};

},{"./inspect":38}],28:[function(require,module,exports){
/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .expectTypes(obj, types)
 *
 * Ensures that the object being tested against is of a valid type.
 *
 *     utils.expectTypes(this, ['array', 'object', 'string']);
 *
 * @param {Mixed} obj constructed Assertion
 * @param {Array} type A list of allowed types for this assertion
 * @namespace Utils
 * @name expectTypes
 * @api public
 */

var AssertionError = require('assertion-error');
var flag = require('./flag');
var type = require('type-detect');

module.exports = function expectTypes(obj, types) {
  var flagMsg = flag(obj, 'message');
  var ssfi = flag(obj, 'ssfi');

  flagMsg = flagMsg ? flagMsg + ': ' : '';

  obj = flag(obj, 'object');
  types = types.map(function (t) { return t.toLowerCase(); });
  types.sort();

  // Transforms ['lorem', 'ipsum'] into 'a lorem, or an ipsum'
  var str = types.map(function (t, index) {
    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
    return or + art + ' ' + t;
  }).join(', ');

  var objType = type(obj).toLowerCase();

  if (!types.some(function (expected) { return objType === expected; })) {
    throw new AssertionError(
      flagMsg + 'object tested must be ' + str + ', but ' + objType + ' given',
      undefined,
      ssfi
    );
  }
};

},{"./flag":29,"assertion-error":12,"type-detect":53}],29:[function(require,module,exports){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .flag(object, key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @param {Object} object constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @namespace Utils
 * @name flag
 * @api private
 */

module.exports = function flag(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};

},{}],30:[function(require,module,exports){
/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getActual
 */

module.exports = function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
};

},{}],31:[function(require,module,exports){
/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getEnumerableProperties
 * @api public
 */

module.exports = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};

},{}],32:[function(require,module,exports){
/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var flag = require('./flag')
  , getActual = require('./getActual')
  , objDisplay = require('./objDisplay');

/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getMessage
 * @api public
 */

module.exports = function getMessage(obj, args) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = negate ? args[2] : args[1]
    , flagMsg = flag(obj, 'message');

  if(typeof msg === "function") msg = msg();
  msg = msg || '';
  msg = msg
    .replace(/#\{this\}/g, function () { return objDisplay(val); })
    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

  return flagMsg ? flagMsg + ': ' + msg : msg;
};

},{"./flag":29,"./getActual":30,"./objDisplay":41}],33:[function(require,module,exports){
var type = require('type-detect');

var flag = require('./flag');

function isObjectType(obj) {
  var objectType = type(obj);
  var objectTypes = ['Array', 'Object', 'function'];

  return objectTypes.indexOf(objectType) !== -1;
}

/**
 * ### .getOperator(message)
 *
 * Extract the operator from error message.
 * Operator defined is based on below link
 * https://nodejs.org/api/assert.html#assert_assert.
 *
 * Returns the `operator` or `undefined` value for an Assertion.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getOperator
 * @api public
 */

module.exports = function getOperator(obj, args) {
  var operator = flag(obj, 'operator');
  var negate = flag(obj, 'negate');
  var expected = args[3];
  var msg = negate ? args[2] : args[1];

  if (operator) {
    return operator;
  }

  if (typeof msg === 'function') msg = msg();

  msg = msg || '';
  if (!msg) {
    return undefined;
  }

  if (/\shave\s/.test(msg)) {
    return undefined;
  }

  var isObject = isObjectType(expected);
  if (/\snot\s/.test(msg)) {
    return isObject ? 'notDeepStrictEqual' : 'notStrictEqual';
  }

  return isObject ? 'deepStrictEqual' : 'strictEqual';
};

},{"./flag":29,"type-detect":53}],34:[function(require,module,exports){
/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var getOwnEnumerablePropertySymbols = require('./getOwnEnumerablePropertySymbols');

/**
 * ### .getOwnEnumerableProperties(object)
 *
 * This allows the retrieval of directly-owned enumerable property names and
 * symbols of an object. This function is necessary because Object.keys only
 * returns enumerable property names, not enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerableProperties
 * @api public
 */

module.exports = function getOwnEnumerableProperties(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
};

},{"./getOwnEnumerablePropertySymbols":35}],35:[function(require,module,exports){
/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getOwnEnumerablePropertySymbols(object)
 *
 * This allows the retrieval of directly-owned enumerable property symbols of an
 * object. This function is necessary because Object.getOwnPropertySymbols
 * returns both enumerable and non-enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerablePropertySymbols
 * @api public
 */

module.exports = function getOwnEnumerablePropertySymbols(obj) {
  if (typeof Object.getOwnPropertySymbols !== 'function') return [];

  return Object.getOwnPropertySymbols(obj).filter(function (sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
};

},{}],36:[function(require,module,exports){
/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getProperties(object)
 *
 * This allows the retrieval of property names of an object, enumerable or not,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getProperties
 * @api public
 */

module.exports = function getProperties(object) {
  var result = Object.getOwnPropertyNames(object);

  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }

  var proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
};

},{}],37:[function(require,module,exports){
/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Dependencies that are used for multiple exports are required here only once
 */

var pathval = require('pathval');

/*!
 * test utility
 */

exports.test = require('./test');

/*!
 * type utility
 */

exports.type = require('type-detect');

/*!
 * expectTypes utility
 */
exports.expectTypes = require('./expectTypes');

/*!
 * message utility
 */

exports.getMessage = require('./getMessage');

/*!
 * actual utility
 */

exports.getActual = require('./getActual');

/*!
 * Inspect util
 */

exports.inspect = require('./inspect');

/*!
 * Object Display util
 */

exports.objDisplay = require('./objDisplay');

/*!
 * Flag utility
 */

exports.flag = require('./flag');

/*!
 * Flag transferring utility
 */

exports.transferFlags = require('./transferFlags');

/*!
 * Deep equal utility
 */

exports.eql = require('deep-eql');

/*!
 * Deep path info
 */

exports.getPathInfo = pathval.getPathInfo;

/*!
 * Check if a property exists
 */

exports.hasProperty = pathval.hasProperty;

/*!
 * Function name
 */

exports.getName = require('get-func-name');

/*!
 * add Property
 */

exports.addProperty = require('./addProperty');

/*!
 * add Method
 */

exports.addMethod = require('./addMethod');

/*!
 * overwrite Property
 */

exports.overwriteProperty = require('./overwriteProperty');

/*!
 * overwrite Method
 */

exports.overwriteMethod = require('./overwriteMethod');

/*!
 * Add a chainable method
 */

exports.addChainableMethod = require('./addChainableMethod');

/*!
 * Overwrite chainable method
 */

exports.overwriteChainableMethod = require('./overwriteChainableMethod');

/*!
 * Compare by inspect method
 */

exports.compareByInspect = require('./compareByInspect');

/*!
 * Get own enumerable property symbols method
 */

exports.getOwnEnumerablePropertySymbols = require('./getOwnEnumerablePropertySymbols');

/*!
 * Get own enumerable properties method
 */

exports.getOwnEnumerableProperties = require('./getOwnEnumerableProperties');

/*!
 * Checks error against a given set of criteria
 */

exports.checkError = require('check-error');

/*!
 * Proxify util
 */

exports.proxify = require('./proxify');

/*!
 * addLengthGuard util
 */

exports.addLengthGuard = require('./addLengthGuard');

/*!
 * isProxyEnabled helper
 */

exports.isProxyEnabled = require('./isProxyEnabled');

/*!
 * isNaN method
 */

exports.isNaN = require('./isNaN');

/*!
 * getOperator method
 */

exports.getOperator = require('./getOperator');
},{"./addChainableMethod":23,"./addLengthGuard":24,"./addMethod":25,"./addProperty":26,"./compareByInspect":27,"./expectTypes":28,"./flag":29,"./getActual":30,"./getMessage":32,"./getOperator":33,"./getOwnEnumerableProperties":34,"./getOwnEnumerablePropertySymbols":35,"./inspect":38,"./isNaN":39,"./isProxyEnabled":40,"./objDisplay":41,"./overwriteChainableMethod":42,"./overwriteMethod":43,"./overwriteProperty":44,"./proxify":45,"./test":46,"./transferFlags":47,"check-error":48,"deep-eql":49,"get-func-name":50,"pathval":52,"type-detect":53}],38:[function(require,module,exports){
// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js

var getName = require('get-func-name');
var getProperties = require('./getProperties');
var getEnumerableProperties = require('./getEnumerableProperties');
var config = require('../config');

module.exports = inspect;

/**
 * ### .inspect(obj, [showHidden], [depth], [colors])
 *
 * Echoes the value of a value. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects. Default is false.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 * @namespace Utils
 * @name inspect
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

// Returns true if object is a DOM element.
var isDOMElement = function (object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object &&
      typeof object === 'object' &&
      'nodeType' in object &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string';
  }
};

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // If this is a DOM element, try to get the outer HTML.
  if (isDOMElement(value)) {
    if ('outerHTML' in value) {
      return value.outerHTML;
      // This value does not have an outerHTML attribute,
      //   it could still be an XML element
    } else {
      // Attempt to serialize it
      try {
        if (document.xmlVersion) {
          var xmlSerializer = new XMLSerializer();
          return xmlSerializer.serializeToString(value);
        } else {
          // Firefox 11- do not support outerHTML
          //   It does, however, support innerHTML
          //   Use the following to render the element
          var ns = "http://www.w3.org/1999/xhtml";
          var container = document.createElementNS(ns, '_');

          container.appendChild(value.cloneNode(false));
          var html = container.innerHTML
            .replace('><', '>' + value.innerHTML + '<');
          container.innerHTML = '';
          return html;
        }
      } catch (err) {
        // This could be a non-native DOM implementation,
        //   continue with the normal flow:
        //   printing the element as if it is an object.
      }
    }
  }

  // Look up the keys of the object.
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

  var name, nameSuffix;

  // Some type of object without properties can be shortcut.
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
  // a `stack` plus `description` property; ignore those for consistency.
  if (keys.length === 0 || (isError(value) && (
      (keys.length === 1 && keys[0] === 'stack') ||
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
     ))) {
    if (typeof value === 'function') {
      name = getName(value);
      nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = ''
    , array = false
    , typedArray = false
    , braces = ['{', '}'];

  if (isTypedArray(value)) {
    typedArray = true;
    braces = ['[', ']'];
  }

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    name = getName(value);
    nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    return formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else if (typedArray) {
    return formatTypedArray(value);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      if (value === 0 && (1/value) === -Infinity) {
        return ctx.stylize('-0', 'number');
      }
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');

    case 'symbol':
      return ctx.stylize(value.toString(), 'symbol');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}

function formatTypedArray(value) {
  var str = '[ ';

  for (var i = 0; i < value.length; ++i) {
    if (str.length >= config.truncateThreshold - 7) {
      str += '...';
      break;
    }
    str += value[i] + ', ';
  }
  str += ' ]';

  // Removing trailing `, ` if the array was not truncated
  if (str.indexOf(',  ]') !== -1) {
    str = str.replace(',  ]', ' ]');
  }

  return str;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name;
  var propDescriptor = Object.getOwnPropertyDescriptor(value, key);
  var str;

  if (propDescriptor) {
    if (propDescriptor.get) {
      if (propDescriptor.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (propDescriptor.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function isTypedArray(ar) {
  // Unfortunately there's no way to check if an object is a TypedArray
  // We have to check if it's one of these types
  return (typeof ar === 'object' && /\w+Array]$/.test(objectToString(ar)));
}

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

},{"../config":18,"./getEnumerableProperties":31,"./getProperties":36,"get-func-name":50}],39:[function(require,module,exports){
/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */

/**
 * ### .isNaN(value)
 *
 * Checks if the given value is NaN or not.
 *
 *     utils.isNaN(NaN); // true
 *
 * @param {Value} The value which has to be checked if it is NaN
 * @name isNaN
 * @api private
 */

function isNaN(value) {
  // Refer http://www.ecma-international.org/ecma-262/6.0/#sec-isnan-number
  // section's NOTE.
  return value !== value;
}

// If ECMAScript 6's Number.isNaN is present, prefer that.
module.exports = Number.isNaN || isNaN;

},{}],40:[function(require,module,exports){
var config = require('../config');

/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .isProxyEnabled()
 *
 * Helper function to check if Chai's proxy protection feature is enabled. If
 * proxies are unsupported or disabled via the user's Chai config, then return
 * false. Otherwise, return true.
 *
 * @namespace Utils
 * @name isProxyEnabled
 */

module.exports = function isProxyEnabled() {
  return config.useProxy &&
    typeof Proxy !== 'undefined' &&
    typeof Reflect !== 'undefined';
};

},{"../config":18}],41:[function(require,module,exports){
/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var inspect = require('./inspect');
var config = require('../config');

/**
 * ### .objDisplay(object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {Mixed} javascript object to inspect
 * @name objDisplay
 * @namespace Utils
 * @api public
 */

module.exports = function objDisplay(obj) {
  var str = inspect(obj)
    , type = Object.prototype.toString.call(obj);

  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === ''
        ? '[Function]'
        : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};

},{"../config":18,"./inspect":38}],42:[function(require,module,exports){
/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = require('../../chai');
var transferFlags = require('./transferFlags');

/**
 * ### .overwriteChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Overwrites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'lengthOf',
 *       function (_super) {
 *       }
 *     , function (_super) {
 *       }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.lengthOf(3);
 *     expect(myFoo).to.have.lengthOf.above(3);
 *
 * @param {Object} ctx object whose method / property is to be overwritten
 * @param {String} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @namespace Utils
 * @name overwriteChainableMethod
 * @api public
 */

module.exports = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];

  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  var _method = chainableBehavior.method;
  chainableBehavior.method = function overwritingChainableMethodWrapper() {
    var result = method(_method).apply(this, arguments);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
};

},{"../../chai":16,"./transferFlags":47}],43:[function(require,module,exports){
/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var addLengthGuard = require('./addLengthGuard');
var chai = require('../../chai');
var flag = require('./flag');
var proxify = require('./proxify');
var transferFlags = require('./transferFlags');

/**
 * ### .overwriteMethod(ctx, name, fn)
 *
 * Overwrites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @namespace Utils
 * @name overwriteMethod
 * @api public
 */

module.exports = function overwriteMethod(ctx, name, method) {
  var _method = ctx[name]
    , _super = function () {
      throw new Error(name + ' is not a function');
    };

  if (_method && 'function' === typeof _method)
    _super = _method;

  var overwritingMethodWrapper = function () {
    // Setting the `ssfi` flag to `overwritingMethodWrapper` causes this
    // function to be the starting point for removing implementation frames from
    // the stack trace of a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', overwritingMethodWrapper);
    }

    // Setting the `lockSsfi` flag to `true` prevents the overwritten assertion
    // from changing the `ssfi` flag. By this point, the `ssfi` flag is already
    // set to the correct starting point for this assertion.
    var origLockSsfi = flag(this, 'lockSsfi');
    flag(this, 'lockSsfi', true);
    var result = method(_super).apply(this, arguments);
    flag(this, 'lockSsfi', origLockSsfi);

    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  }

  addLengthGuard(overwritingMethodWrapper, name, false);
  ctx[name] = proxify(overwritingMethodWrapper, name);
};

},{"../../chai":16,"./addLengthGuard":24,"./flag":29,"./proxify":45,"./transferFlags":47}],44:[function(require,module,exports){
/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var chai = require('../../chai');
var flag = require('./flag');
var isProxyEnabled = require('./isProxyEnabled');
var transferFlags = require('./transferFlags');

/**
 * ### .overwriteProperty(ctx, name, fn)
 *
 * Overwrites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @namespace Utils
 * @name overwriteProperty
 * @api public
 */

module.exports = function overwriteProperty(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get

  Object.defineProperty(ctx, name,
    { get: function overwritingPropertyGetter() {
        // Setting the `ssfi` flag to `overwritingPropertyGetter` causes this
        // function to be the starting point for removing implementation frames
        // from the stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', overwritingPropertyGetter);
        }

        // Setting the `lockSsfi` flag to `true` prevents the overwritten
        // assertion from changing the `ssfi` flag. By this point, the `ssfi`
        // flag is already set to the correct starting point for this assertion.
        var origLockSsfi = flag(this, 'lockSsfi');
        flag(this, 'lockSsfi', true);
        var result = getter(_super).call(this);
        flag(this, 'lockSsfi', origLockSsfi);

        if (result !== undefined) {
          return result;
        }

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};

},{"../../chai":16,"./flag":29,"./isProxyEnabled":40,"./transferFlags":47}],45:[function(require,module,exports){
var config = require('../config');
var flag = require('./flag');
var getProperties = require('./getProperties');
var isProxyEnabled = require('./isProxyEnabled');

/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .proxify(object)
 *
 * Return a proxy of given object that throws an error when a non-existent
 * property is read. By default, the root cause is assumed to be a misspelled
 * property, and thus an attempt is made to offer a reasonable suggestion from
 * the list of existing properties. However, if a nonChainableMethodName is
 * provided, then the root cause is instead a failure to invoke a non-chainable
 * method prior to reading the non-existent property.
 *
 * If proxies are unsupported or disabled via the user's Chai config, then
 * return object without modification.
 *
 * @param {Object} obj
 * @param {String} nonChainableMethodName
 * @namespace Utils
 * @name proxify
 */

var builtins = ['__flags', '__methods', '_obj', 'assert'];

module.exports = function proxify(obj, nonChainableMethodName) {
  if (!isProxyEnabled()) return obj;

  return new Proxy(obj, {
    get: function proxyGetter(target, property) {
      // This check is here because we should not throw errors on Symbol properties
      // such as `Symbol.toStringTag`.
      // The values for which an error should be thrown can be configured using
      // the `config.proxyExcludedKeys` setting.
      if (typeof property === 'string' &&
          config.proxyExcludedKeys.indexOf(property) === -1 &&
          !Reflect.has(target, property)) {
        // Special message for invalid property access of non-chainable methods.
        if (nonChainableMethodName) {
          throw Error('Invalid Chai property: ' + nonChainableMethodName + '.' +
            property + '. See docs for proper usage of "' +
            nonChainableMethodName + '".');
        }

        // If the property is reasonably close to an existing Chai property,
        // suggest that property to the user. Only suggest properties with a
        // distance less than 4.
        var suggestion = null;
        var suggestionDistance = 4;
        getProperties(target).forEach(function(prop) {
          if (
            !Object.prototype.hasOwnProperty(prop) &&
            builtins.indexOf(prop) === -1
          ) {
            var dist = stringDistanceCapped(
              property,
              prop,
              suggestionDistance
            );
            if (dist < suggestionDistance) {
              suggestion = prop;
              suggestionDistance = dist;
            }
          }
        });

        if (suggestion !== null) {
          throw Error('Invalid Chai property: ' + property +
            '. Did you mean "' + suggestion + '"?');
        } else {
          throw Error('Invalid Chai property: ' + property);
        }
      }

      // Use this proxy getter as the starting point for removing implementation
      // frames from the stack trace of a failed assertion. For property
      // assertions, this prevents the proxy getter from showing up in the stack
      // trace since it's invoked before the property getter. For method and
      // chainable method assertions, this flag will end up getting changed to
      // the method wrapper, which is good since this frame will no longer be in
      // the stack once the method is invoked. Note that Chai builtin assertion
      // properties such as `__flags` are skipped since this is only meant to
      // capture the starting point of an assertion. This step is also skipped
      // if the `lockSsfi` flag is set, thus indicating that this assertion is
      // being called from within another assertion. In that case, the `ssfi`
      // flag is already set to the outer assertion's starting point.
      if (builtins.indexOf(property) === -1 && !flag(target, 'lockSsfi')) {
        flag(target, 'ssfi', proxyGetter);
      }

      return Reflect.get(target, property);
    }
  });
};

/**
 * # stringDistanceCapped(strA, strB, cap)
 * Return the Levenshtein distance between two strings, but no more than cap.
 * @param {string} strA
 * @param {string} strB
 * @param {number} number
 * @return {number} min(string distance between strA and strB, cap)
 * @api private
 */

function stringDistanceCapped(strA, strB, cap) {
  if (Math.abs(strA.length - strB.length) >= cap) {
    return cap;
  }

  var memo = [];
  // `memo` is a two-dimensional array containing distances.
  // memo[i][j] is the distance between strA.slice(0, i) and
  // strB.slice(0, j).
  for (var i = 0; i <= strA.length; i++) {
    memo[i] = Array(strB.length + 1).fill(0);
    memo[i][0] = i;
  }
  for (var j = 0; j < strB.length; j++) {
    memo[0][j] = j;
  }

  for (var i = 1; i <= strA.length; i++) {
    var ch = strA.charCodeAt(i - 1);
    for (var j = 1; j <= strB.length; j++) {
      if (Math.abs(i - j) >= cap) {
        memo[i][j] = cap;
        continue;
      }
      memo[i][j] = Math.min(
        memo[i - 1][j] + 1,
        memo[i][j - 1] + 1,
        memo[i - 1][j - 1] +
          (ch === strB.charCodeAt(j - 1) ? 0 : 1)
      );
    }
  }

  return memo[strA.length][strB.length];
}

},{"../config":18,"./flag":29,"./getProperties":36,"./isProxyEnabled":40}],46:[function(require,module,exports){
/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var flag = require('./flag');

/**
 * ### .test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name test
 */

module.exports = function test(obj, args) {
  var negate = flag(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
};

},{"./flag":29}],47:[function(require,module,exports){
/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .transferFlags(assertion, object, includeAll = true)
 *
 * Transfer all the flags for `assertion` to `object`. If
 * `includeAll` is set to `false`, then the base Chai
 * assertion flags (namely `object`, `ssfi`, `lockSsfi`,
 * and `message`) will not be transferred.
 *
 *
 *     var newAssertion = new Assertion();
 *     utils.transferFlags(assertion, newAssertion);
 *
 *     var anotherAssertion = new Assertion(myObj);
 *     utils.transferFlags(assertion, anotherAssertion, false);
 *
 * @param {Assertion} assertion the assertion to transfer the flags from
 * @param {Object} object the object to transfer the flags to; usually a new assertion
 * @param {Boolean} includeAll
 * @namespace Utils
 * @name transferFlags
 * @api private
 */

module.exports = function transferFlags(assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!object.__flags) {
    object.__flags = Object.create(null);
  }

  includeAll = arguments.length === 3 ? includeAll : true;

  for (var flag in flags) {
    if (includeAll ||
        (flag !== 'object' && flag !== 'ssfi' && flag !== 'lockSsfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};

},{}],48:[function(require,module,exports){
'use strict';

/* !
 * Chai - checkError utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .checkError
 *
 * Checks that an error conforms to a given set of criteria and/or retrieves information about it.
 *
 * @api public
 */

/**
 * ### .compatibleInstance(thrown, errorLike)
 *
 * Checks if two instances are compatible (strict equal).
 * Returns false if errorLike is not an instance of Error, because instances
 * can only be compatible if they're both error instances.
 *
 * @name compatibleInstance
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleInstance(thrown, errorLike) {
  return errorLike instanceof Error && thrown === errorLike;
}

/**
 * ### .compatibleConstructor(thrown, errorLike)
 *
 * Checks if two constructors are compatible.
 * This function can receive either an error constructor or
 * an error instance as the `errorLike` argument.
 * Constructors are compatible if they're the same or if one is
 * an instance of another.
 *
 * @name compatibleConstructor
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleConstructor(thrown, errorLike) {
  if (errorLike instanceof Error) {
    // If `errorLike` is an instance of any error we compare their constructors
    return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
  } else if (errorLike.prototype instanceof Error || errorLike === Error) {
    // If `errorLike` is a constructor that inherits from Error, we compare `thrown` to `errorLike` directly
    return thrown.constructor === errorLike || thrown instanceof errorLike;
  }

  return false;
}

/**
 * ### .compatibleMessage(thrown, errMatcher)
 *
 * Checks if an error's message is compatible with a matcher (String or RegExp).
 * If the message contains the String or passes the RegExp test,
 * it is considered compatible.
 *
 * @name compatibleMessage
 * @param {Error} thrown error
 * @param {String|RegExp} errMatcher to look for into the message
 * @namespace Utils
 * @api public
 */

function compatibleMessage(thrown, errMatcher) {
  var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
  if (errMatcher instanceof RegExp) {
    return errMatcher.test(comparisonString);
  } else if (typeof errMatcher === 'string') {
    return comparisonString.indexOf(errMatcher) !== -1; // eslint-disable-line no-magic-numbers
  }

  return false;
}

/**
 * ### .getFunctionName(constructorFn)
 *
 * Returns the name of a function.
 * This also includes a polyfill function if `constructorFn.name` is not defined.
 *
 * @name getFunctionName
 * @param {Function} constructorFn
 * @namespace Utils
 * @api private
 */

var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
  var name = '';
  if (typeof constructorFn.name === 'undefined') {
    // Here we run a polyfill if constructorFn.name is not defined
    var match = String(constructorFn).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    name = constructorFn.name;
  }

  return name;
}

/**
 * ### .getConstructorName(errorLike)
 *
 * Gets the constructor name for an Error instance or constructor itself.
 *
 * @name getConstructorName
 * @param {Error|ErrorConstructor} errorLike
 * @namespace Utils
 * @api public
 */

function getConstructorName(errorLike) {
  var constructorName = errorLike;
  if (errorLike instanceof Error) {
    constructorName = getFunctionName(errorLike.constructor);
  } else if (typeof errorLike === 'function') {
    // If `err` is not an instance of Error it is an error constructor itself or another function.
    // If we've got a common function we get its name, otherwise we may need to create a new instance
    // of the error just in case it's a poorly-constructed error. Please see chaijs/chai/issues/45 to know more.
    constructorName = getFunctionName(errorLike).trim() ||
        getFunctionName(new errorLike()); // eslint-disable-line new-cap
  }

  return constructorName;
}

/**
 * ### .getMessage(errorLike)
 *
 * Gets the error message from an error.
 * If `err` is a String itself, we return it.
 * If the error has no message, we return an empty string.
 *
 * @name getMessage
 * @param {Error|String} errorLike
 * @namespace Utils
 * @api public
 */

function getMessage(errorLike) {
  var msg = '';
  if (errorLike && errorLike.message) {
    msg = errorLike.message;
  } else if (typeof errorLike === 'string') {
    msg = errorLike;
  }

  return msg;
}

module.exports = {
  compatibleInstance: compatibleInstance,
  compatibleConstructor: compatibleConstructor,
  compatibleMessage: compatibleMessage,
  getMessage: getMessage,
  getConstructorName: getConstructorName,
};

},{}],49:[function(require,module,exports){
'use strict';
/* globals Symbol: false, Uint8Array: false, WeakMap: false */
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var type = require('type-detect');
function FakeMap() {
  this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}

FakeMap.prototype = {
  get: function getMap(key) {
    return key[this._key];
  },
  set: function setMap(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this._key, {
        value: value,
        configurable: true,
      });
    }
  },
};

var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return null;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result === 'boolean') {
      return result;
    }
  }
  return null;
}

/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    leftHandMap.set(rightHandOperand, result);
  } else {
    leftHandMap = new MemoizeMap();
    leftHandMap.set(rightHandOperand, result);
    memoizeMap.set(leftHandOperand, leftHandMap);
  }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;
module.exports.MemoizeMap = MemoizeMap;

/**
 * Assert deeply nested sameValue equality between two objects of any type.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
 */
function deepEqual(leftHandOperand, rightHandOperand, options) {
  // If we have a comparator, we can't assume anything; so bail to its check first.
  if (options && options.comparator) {
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }

  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  if (simpleResult !== null) {
    return simpleResult;
  }

  // Deeper comparisons are pushed through to a larger function
  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}

/**
 * Many comparisons can be canceled out early via simple equality or primitive checks.
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @return {Boolean|null} equal match
 */
function simpleEqual(leftHandOperand, rightHandOperand) {
  // Equal references (except for Numbers) can be returned early
  if (leftHandOperand === rightHandOperand) {
    // Handle +-0 cases
    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
  }

  // handle NaN cases
  if (
    leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
  ) {
    return true;
  }

  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
  // strings, and undefined, can be compared by reference.
  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    // Easy out b/c it would have passed the first equality check
    return false;
  }
  return null;
}

/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {};
  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator;

  // Check if a memoized result exists.
  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) {
    return memoizeResultLeft;
  }
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) {
    return memoizeResultRight;
  }

  // If a comparator is present, use it.
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    // Comparators may return null, in which case we want to go back to default behavior.
    if (comparatorResult === false || comparatorResult === true) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
      return comparatorResult;
    }
    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
    // what to do, we need to make sure to return the basic tests first before we move on.
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      // Don't memoize this, it takes longer to set/retrieve than to just compare.
      return simpleResult;
    }
  }

  var leftHandType = type(leftHandOperand);
  if (leftHandType !== type(rightHandOperand)) {
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
    return false;
  }

  // Temporarily set the operands in the memoize object to prevent blowing the stack
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);

  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
  return result;
}

function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Date':
      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case 'Promise':
    case 'Symbol':
    case 'function':
    case 'WeakMap':
    case 'WeakSet':
    case 'Error':
      return leftHandOperand === rightHandOperand;
    case 'Arguments':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Array':
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case 'RegExp':
      return regexpEqual(leftHandOperand, rightHandOperand);
    case 'Generator':
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case 'DataView':
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case 'ArrayBuffer':
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case 'Set':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case 'Map':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}

/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */

function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}

/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function entriesEqual(leftHandOperand, rightHandOperand, options) {
  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
  if (leftHandOperand.size !== rightHandOperand.size) {
    return false;
  }
  if (leftHandOperand.size === 0) {
    return true;
  }
  var leftHandItems = [];
  var rightHandItems = [];
  leftHandOperand.forEach(function gatherEntries(key, value) {
    leftHandItems.push([ key, value ]);
  });
  rightHandOperand.forEach(function gatherEntries(key, value) {
    rightHandItems.push([ key, value ]);
  });
  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}

/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) {
    return false;
  }
  if (length === 0) {
    return true;
  }
  var index = -1;
  while (++index < length) {
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}

/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */
function hasIteratorFunction(target) {
  return typeof Symbol !== 'undefined' &&
    typeof target === 'object' &&
    typeof Symbol.iterator !== 'undefined' &&
    typeof target[Symbol.iterator] === 'function';
}

/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) {
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {
      return [];
    }
  }
  return [];
}

/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */
function getGeneratorEntries(generator) {
  var generatorResult = generator.next();
  var accumulator = [ generatorResult.value ];
  while (generatorResult.done === false) {
    generatorResult = generator.next();
    accumulator.push(generatorResult.value);
  }
  return accumulator;
}

/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */
function getEnumerableKeys(target) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return keys;
}

/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
  var length = keys.length;
  if (length === 0) {
    return true;
  }
  for (var i = 0; i < length; i += 1) {
    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand);
  var rightHandKeys = getEnumerableKeys(rightHandOperand);
  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
    leftHandKeys.sort();
    rightHandKeys.sort();
    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
      return false;
    }
    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  }

  var leftHandEntries = getIteratorEntries(leftHandOperand);
  var rightHandEntries = getIteratorEntries(rightHandOperand);
  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
    leftHandEntries.sort();
    rightHandEntries.sort();
    return iterableEqual(leftHandEntries, rightHandEntries, options);
  }

  if (leftHandKeys.length === 0 &&
      leftHandEntries.length === 0 &&
      rightHandKeys.length === 0 &&
      rightHandEntries.length === 0) {
    return true;
  }

  return false;
}

/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */
function isPrimitive(value) {
  return value === null || typeof value !== 'object';
}

},{"type-detect":53}],50:[function(require,module,exports){
'use strict';

/* !
 * Chai - getFuncName utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getFuncName(constructorFn)
 *
 * Returns the name of a function.
 * When a non-function instance is passed, returns `null`.
 * This also includes a polyfill function if `aFunc.name` is not defined.
 *
 * @name getFuncName
 * @param {Function} funct
 * @namespace Utils
 * @api public
 */

var toString = Function.prototype.toString;
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
function getFuncName(aFunc) {
  if (typeof aFunc !== 'function') {
    return null;
  }

  var name = '';
  if (typeof Function.prototype.name === 'undefined' && typeof aFunc.name === 'undefined') {
    // Here we run a polyfill if Function does not support the `name` property and if aFunc.name is not defined
    var match = toString.call(aFunc).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    // If we've got a `name` property we just use it
    name = aFunc.name;
  }

  return name;
}

module.exports = getFuncName;

},{}],51:[function(require,module,exports){
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],52:[function(require,module,exports){
'use strict';

/* !
 * Chai - pathval utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/**
 * ### .hasProperty(object, name)
 *
 * This allows checking whether an object has own
 * or inherited from prototype chain named property.
 *
 * Basically does the same thing as the `in`
 * operator but works properly with null/undefined values
 * and other primitives.
 *
 *     var obj = {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *
 * The following would be the results.
 *
 *     hasProperty(obj, 'str');  // true
 *     hasProperty(obj, 'constructor');  // true
 *     hasProperty(obj, 'bar');  // false
 *
 *     hasProperty(obj.str, 'length'); // true
 *     hasProperty(obj.str, 1);  // true
 *     hasProperty(obj.str, 5);  // false
 *
 *     hasProperty(obj.arr, 'length');  // true
 *     hasProperty(obj.arr, 2);  // true
 *     hasProperty(obj.arr, 3);  // false
 *
 * @param {Object} object
 * @param {String|Symbol} name
 * @returns {Boolean} whether it exists
 * @namespace Utils
 * @name hasProperty
 * @api public
 */

function hasProperty(obj, name) {
  if (typeof obj === 'undefined' || obj === null) {
    return false;
  }

  // The `in` operator does not work with primitives.
  return name in Object(obj);
}

/* !
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `internalGetPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be infinitely deep and nested.
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

function parsePath(path) {
  var str = path.replace(/([^\\])\[/g, '$1.[');
  var parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function mapMatches(value) {
    if (
      value === 'constructor' ||
      value === '__proto__' ||
      value === 'prototype'
    ) {
      return {};
    }
    var regexp = /^\[(\d+)\]$/;
    var mArr = regexp.exec(value);
    var parsed = null;
    if (mArr) {
      parsed = { i: parseFloat(mArr[1]) };
    } else {
      parsed = { p: value.replace(/\\([.[\]])/g, '$1') };
    }

    return parsed;
  });
}

/* !
 * ## internalGetPathValue(obj, parsed[, pathDepth])
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(obj, parsed);
 *
 * @param {Object} object to search against
 * @param {Object} parsed definition from `parsePath`.
 * @param {Number} depth (nesting level) of the property we want to retrieve
 * @returns {Object|Undefined} value
 * @api private
 */

function internalGetPathValue(obj, parsed, pathDepth) {
  var temporaryValue = obj;
  var res = null;
  pathDepth = typeof pathDepth === 'undefined' ? parsed.length : pathDepth;

  for (var i = 0; i < pathDepth; i++) {
    var part = parsed[i];
    if (temporaryValue) {
      if (typeof part.p === 'undefined') {
        temporaryValue = temporaryValue[part.i];
      } else {
        temporaryValue = temporaryValue[part.p];
      }

      if (i === pathDepth - 1) {
        res = temporaryValue;
      }
    }
  }

  return res;
}

/* !
 * ## internalSetPathValue(obj, value, parsed)
 *
 * Companion function for `parsePath` that sets
 * the value located at a parsed address.
 *
 *  internalSetPathValue(obj, 'value', parsed);
 *
 * @param {Object} object to search and define on
 * @param {*} value to use upon set
 * @param {Object} parsed definition from `parsePath`
 * @api private
 */

function internalSetPathValue(obj, val, parsed) {
  var tempObj = obj;
  var pathDepth = parsed.length;
  var part = null;
  // Here we iterate through every part of the path
  for (var i = 0; i < pathDepth; i++) {
    var propName = null;
    var propVal = null;
    part = parsed[i];

    // If it's the last part of the path, we set the 'propName' value with the property name
    if (i === pathDepth - 1) {
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Now we set the property with the name held by 'propName' on object with the desired val
      tempObj[propName] = val;
    } else if (typeof part.p !== 'undefined' && tempObj[part.p]) {
      tempObj = tempObj[part.p];
    } else if (typeof part.i !== 'undefined' && tempObj[part.i]) {
      tempObj = tempObj[part.i];
    } else {
      // If the obj doesn't have the property we create one with that name to define it
      var next = parsed[i + 1];
      // Here we set the name of the property which will be defined
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Here we decide if this property will be an array or a new object
      propVal = typeof next.p === 'undefined' ? [] : {};
      tempObj[propName] = propVal;
      tempObj = tempObj[propName];
    }
  }
}

/**
 * ### .getPathInfo(object, path)
 *
 * This allows the retrieval of property info in an
 * object given a string path.
 *
 * The path info consists of an object with the
 * following properties:
 *
 * * parent - The parent object of the property referenced by `path`
 * * name - The name of the final property, a number if it was an array indexer
 * * value - The value of the property, if it exists, otherwise `undefined`
 * * exists - Whether the property exists or not
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} info
 * @namespace Utils
 * @name getPathInfo
 * @api public
 */

function getPathInfo(obj, path) {
  var parsed = parsePath(path);
  var last = parsed[parsed.length - 1];
  var info = {
    parent:
      parsed.length > 1 ?
        internalGetPathValue(obj, parsed, parsed.length - 1) :
        obj,
    name: last.p || last.i,
    value: internalGetPathValue(obj, parsed),
  };
  info.exists = hasProperty(info.parent, info.name);

  return info;
}

/**
 * ### .getPathValue(object, path)
 *
 * This allows the retrieval of values in an
 * object given a string path.
 *
 *     var obj = {
 *         prop1: {
 *             arr: ['a', 'b', 'c']
 *           , str: 'Hello'
 *         }
 *       , prop2: {
 *             arr: [ { nested: 'Universe' } ]
 *           , str: 'Hello again!'
 *         }
 *     }
 *
 * The following would be the results.
 *
 *     getPathValue(obj, 'prop1.str'); // Hello
 *     getPathValue(obj, 'prop1.att[2]'); // b
 *     getPathValue(obj, 'prop2.arr[0].nested'); // Universe
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} value or `undefined`
 * @namespace Utils
 * @name getPathValue
 * @api public
 */

function getPathValue(obj, path) {
  var info = getPathInfo(obj, path);
  return info.value;
}

/**
 * ### .setPathValue(object, path, value)
 *
 * Define the value in an object at a given string path.
 *
 * ```js
 * var obj = {
 *     prop1: {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *   , prop2: {
 *         arr: [ { nested: 'Universe' } ]
 *       , str: 'Hello again!'
 *     }
 * };
 * ```
 *
 * The following would be acceptable.
 *
 * ```js
 * var properties = require('tea-properties');
 * properties.set(obj, 'prop1.str', 'Hello Universe!');
 * properties.set(obj, 'prop1.arr[2]', 'B');
 * properties.set(obj, 'prop2.arr[0].nested.value', { hello: 'universe' });
 * ```
 *
 * @param {Object} object
 * @param {String} path
 * @param {Mixed} value
 * @api private
 */

function setPathValue(obj, path, val) {
  var parsed = parsePath(path);
  internalSetPathValue(obj, val, parsed);
  return obj;
}

module.exports = {
  hasProperty: hasProperty,
  getPathInfo: getPathInfo,
  getPathValue: getPathValue,
  setPathValue: setPathValue,
};

},{}],53:[function(require,module,exports){
(function (global){(function (){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.typeDetect = factory());
}(this, (function () { 'use strict';

/* !
 * type-detect
 * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
 * MIT Licensed
 */
var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : global; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  // Not caching existence of `window` and related properties due to potential
  // for `window` to be unset before tests in quasi-browser environments.
  if (typeof window === 'object' && window !== null) {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (typeof window.location === 'object' && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (typeof window.document === 'object' && obj === window.document) {
      return 'Document';
    }

    if (typeof window.navigator === 'object') {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
       *  - IE <=10 === "[object MSMimeTypesCollection]"
       */
      if (typeof window.navigator.mimeTypes === 'object' &&
          obj === window.navigator.mimeTypes) {
        return 'MimeTypeArray';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
       * Test: `Object.prototype.toString.call(navigator.plugins)``
       *  - IE <=10 === "[object MSPluginsCollection]"
       */
      if (typeof window.navigator.plugins === 'object' &&
          obj === window.navigator.plugins) {
        return 'PluginArray';
      }
    }

    if ((typeof window.HTMLElement === 'function' ||
        typeof window.HTMLElement === 'object') &&
        obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],54:[function(require,module,exports){
module.exports=[
  {
    "_id": "5bf07ca4d97a2ccdd9a83feb",
    "index": 0,
    "guid": "817bd4d1-3146-44e8-9afc-62207afd27a6",
    "isActive": false,
    "balance": "$1,347.62",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "brown",
    "name": "Candace Hines",
    "gender": "female",
    "company": "IDEGO",
    "email": "candacehines@idego.com",
    "phone": "+1 (908) 556-2760",
    "address": "421 Auburn Place, Gardiner, Colorado, 9894",
    "about": "Lorem minim ut eiusmod et ullamco non adipisicing elit sint ullamco. Amet proident laboris aliquip minim deserunt ea ad do et. Deserunt ipsum sit dolore ut et culpa amet id nisi aute consectetur ad quis. Cillum commodo cillum consequat et. Esse do laboris minim aliqua. Eiusmod laborum enim est ex cupidatat incididunt et deserunt consequat Lorem cillum culpa consectetur mollit.\r\n",
    "registered": "2014-07-12T08:51:48 -02:00",
    "latitude": 66.728132,
    "longitude": -129.161397,
    "tags": [
      "nulla",
      "sint",
      "aute",
      "sint",
      "proident",
      "consequat",
      "culpa"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Josephine English"
      },
      {
        "id": 1,
        "name": "Peters Bryant"
      },
      {
        "id": 2,
        "name": "Wolf Guerra"
      }
    ],
    "greeting": "Hello, Candace Hines! You have 1 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca408b8cd47fcb7f683",
    "index": 1,
    "guid": "5fcbb43f-5c30-44d9-b916-1de804797487",
    "isActive": false,
    "balance": "$3,281.21",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "brown",
    "name": "Leann Tran",
    "gender": "female",
    "company": "COFINE",
    "email": "leanntran@cofine.com",
    "phone": "+1 (842) 431-2586",
    "address": "982 Ellery Street, Zortman, Alaska, 1722",
    "about": "Tempor culpa elit aliqua irure dolore deserunt non occaecat. Nostrud minim id ex dolore do nisi velit incididunt sunt esse deserunt minim in eu. Id eu ad esse pariatur magna irure amet ad enim sunt consectetur. Ullamco commodo excepteur officia velit magna irure nulla quis. Amet qui velit do voluptate adipisicing amet dolor dolor incididunt duis do ullamco. Consectetur commodo ipsum duis nostrud commodo ipsum incididunt ut.\r\n",
    "registered": "2017-05-20T04:35:30 -02:00",
    "latitude": -50.274007,
    "longitude": 83.481581,
    "tags": [
      "ullamco",
      "consequat",
      "in",
      "eiusmod",
      "enim",
      "exercitation",
      "Lorem"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Underwood Farrell"
      },
      {
        "id": 1,
        "name": "Suzette Roth"
      },
      {
        "id": 2,
        "name": "Marci Gibbs"
      }
    ],
    "greeting": "Hello, Leann Tran! You have 8 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4caf3d8b78aac6db0",
    "index": 2,
    "guid": "aec32193-da0a-450e-a431-076375a5af01",
    "isActive": false,
    "balance": "$1,988.36",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "blue",
    "name": "Dixon Padilla",
    "gender": "male",
    "company": "ATGEN",
    "email": "dixonpadilla@atgen.com",
    "phone": "+1 (862) 436-3635",
    "address": "616 Gerritsen Avenue, Ola, Utah, 241",
    "about": "Est sit cupidatat ad irure ut ullamco dolore. Adipisicing consequat fugiat dolore cupidatat irure eiusmod deserunt tempor est. Voluptate sunt et do anim occaecat ut magna enim dolor velit sit nisi pariatur. Laborum labore id ullamco sint non elit exercitation laboris duis aliqua qui.\r\n",
    "registered": "2018-07-23T08:55:25 -02:00",
    "latitude": -31.399589,
    "longitude": -141.003098,
    "tags": [
      "aliqua",
      "ut",
      "ut",
      "voluptate",
      "ex",
      "velit",
      "in"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Naomi Woodward"
      },
      {
        "id": 1,
        "name": "Garrett Valdez"
      },
      {
        "id": 2,
        "name": "Salinas Townsend"
      }
    ],
    "greeting": "Hello, Dixon Padilla! You have 9 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4baa2f847bd7e778d",
    "index": 3,
    "guid": "ed6c77d5-6dd8-49bf-930b-03fdffa789bc",
    "isActive": false,
    "balance": "$1,569.74",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "brown",
    "name": "Tammy Villarreal",
    "gender": "female",
    "company": "KNEEDLES",
    "email": "tammyvillarreal@kneedles.com",
    "phone": "+1 (954) 487-2111",
    "address": "447 Hewes Street, Toftrees, Washington, 2729",
    "about": "Esse velit ut velit eiusmod ex nulla exercitation amet cupidatat dolore anim est veniam laboris. Quis aliquip anim et velit commodo ex esse id eu eiusmod deserunt officia culpa. Velit sit mollit non minim dolor nisi pariatur qui ullamco amet cupidatat. Nisi velit reprehenderit commodo fugiat eiusmod elit sunt eu.\r\n",
    "registered": "2018-09-27T10:50:17 -02:00",
    "latitude": -15.840659,
    "longitude": -147.838227,
    "tags": [
      "ipsum",
      "veniam",
      "laboris",
      "elit",
      "id",
      "aute",
      "dolore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Holt Harvey"
      },
      {
        "id": 1,
        "name": "Stephanie Monroe"
      },
      {
        "id": 2,
        "name": "Baird Lawrence"
      }
    ],
    "greeting": "Hello, Tammy Villarreal! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4eeaa2b32a73d408e",
    "index": 4,
    "guid": "05f006e9-a1b5-48d5-8850-a94e9776c5d0",
    "isActive": false,
    "balance": "$2,752.07",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "blue",
    "name": "Marcie Gregory",
    "gender": "female",
    "company": "BARKARAMA",
    "email": "marciegregory@barkarama.com",
    "phone": "+1 (817) 441-3974",
    "address": "529 Celeste Court, Kenmar, Iowa, 9218",
    "about": "Labore consequat do sit fugiat. Eiusmod laboris quis eu esse dolore magna laborum. Exercitation enim voluptate dolore veniam irure proident qui cillum reprehenderit.\r\n",
    "registered": "2014-10-15T01:34:44 -02:00",
    "latitude": 49.333665,
    "longitude": -73.530425,
    "tags": [
      "deserunt",
      "adipisicing",
      "est",
      "occaecat",
      "non",
      "mollit",
      "minim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Tammi Stevens"
      },
      {
        "id": 1,
        "name": "Aline Pennington"
      },
      {
        "id": 2,
        "name": "Casey Cleveland"
      }
    ],
    "greeting": "Hello, Marcie Gregory! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4f7d9240b794d8c6e",
    "index": 5,
    "guid": "876fc1b1-5891-48d5-a9cd-801d93b42cf8",
    "isActive": false,
    "balance": "$1,713.36",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "green",
    "name": "Bobbi Hudson",
    "gender": "female",
    "company": "BLEENDOT",
    "email": "bobbihudson@bleendot.com",
    "phone": "+1 (894) 463-3522",
    "address": "115 Loring Avenue, Maxville, Kansas, 1580",
    "about": "Anim ad cillum Lorem eiusmod culpa irure aute cillum consequat est proident aute quis. Tempor ipsum qui aute duis. In non sunt Lorem non veniam duis eiusmod.\r\n",
    "registered": "2016-07-05T03:06:00 -02:00",
    "latitude": 56.301003,
    "longitude": 120.736767,
    "tags": [
      "adipisicing",
      "enim",
      "irure",
      "ullamco",
      "nulla",
      "cupidatat",
      "est"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Flynn Montgomery"
      },
      {
        "id": 1,
        "name": "Leta Fernandez"
      },
      {
        "id": 2,
        "name": "Nona Noel"
      }
    ],
    "greeting": "Hello, Bobbi Hudson! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca439c3d815d007e386",
    "index": 6,
    "guid": "5953c644-bd94-483f-8754-11cf2842608a",
    "isActive": true,
    "balance": "$2,117.29",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "blue",
    "name": "Collier Hooper",
    "gender": "male",
    "company": "ACRODANCE",
    "email": "collierhooper@acrodance.com",
    "phone": "+1 (909) 551-3116",
    "address": "868 Vine Street, Beyerville, Texas, 6397",
    "about": "Velit ea aute et dolore aliquip. Velit ullamco reprehenderit incididunt amet ipsum. Veniam culpa ea eiusmod sint deserunt non irure. Minim dolor excepteur incididunt aliqua exercitation irure culpa aliquip aute excepteur.\r\n",
    "registered": "2018-03-12T05:18:24 -01:00",
    "latitude": 60.808009,
    "longitude": 53.596965,
    "tags": [
      "commodo",
      "proident",
      "nulla",
      "ut",
      "amet",
      "elit",
      "sit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Payne Mckenzie"
      },
      {
        "id": 1,
        "name": "Fernandez Green"
      },
      {
        "id": 2,
        "name": "Vance Rosales"
      }
    ],
    "greeting": "Hello, Collier Hooper! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca418f7af627dd357ab",
    "index": 7,
    "guid": "dfb1e8af-5ed5-453b-91a6-9696171724a0",
    "isActive": false,
    "balance": "$1,076.83",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "green",
    "name": "Merrill Puckett",
    "gender": "male",
    "company": "CALCU",
    "email": "merrillpuckett@calcu.com",
    "phone": "+1 (976) 588-2734",
    "address": "901 Plymouth Street, Gwynn, Illinois, 4934",
    "about": "Duis Lorem quis est consectetur officia mollit pariatur velit in velit eiusmod. Duis ut nulla eiusmod voluptate quis aute minim veniam commodo ex labore eu. Eiusmod irure laborum tempor dolor aute. Elit anim laboris exercitation laborum aliqua laboris velit nulla et.\r\n",
    "registered": "2014-10-19T03:59:13 -02:00",
    "latitude": -50.265167,
    "longitude": 123.048318,
    "tags": [
      "eu",
      "veniam",
      "irure",
      "quis",
      "sunt",
      "laborum",
      "culpa"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Clemons Strong"
      },
      {
        "id": 1,
        "name": "Mariana Booker"
      },
      {
        "id": 2,
        "name": "Alexander Stein"
      }
    ],
    "greeting": "Hello, Merrill Puckett! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca49987b9475ce2e059",
    "index": 8,
    "guid": "b0967608-3982-469d-92fd-341bd8df1e95",
    "isActive": true,
    "balance": "$1,524.55",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "blue",
    "name": "Henrietta Moreno",
    "gender": "female",
    "company": "LIMOZEN",
    "email": "henriettamoreno@limozen.com",
    "phone": "+1 (955) 440-3587",
    "address": "835 Butler Street, Mahtowa, Virginia, 3234",
    "about": "Dolor velit dolore in laboris esse cupidatat. Nisi irure magna aliquip aute tempor nostrud sit deserunt ullamco. Eu exercitation ullamco quis excepteur sint exercitation laboris ullamco. Ad ullamco cupidatat nostrud amet voluptate. Est cillum irure ea dolor. Deserunt eu labore anim consectetur quis pariatur excepteur enim Lorem enim enim ut aliquip. Non velit irure ex est.\r\n",
    "registered": "2018-05-07T06:19:41 -02:00",
    "latitude": -7.818466,
    "longitude": -129.733963,
    "tags": [
      "commodo",
      "esse",
      "deserunt",
      "velit",
      "amet",
      "in",
      "occaecat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Alison Frederick"
      },
      {
        "id": 1,
        "name": "Holland Conner"
      },
      {
        "id": 2,
        "name": "Graciela Olsen"
      }
    ],
    "greeting": "Hello, Henrietta Moreno! You have 4 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca409bd253aeafad2af",
    "index": 9,
    "guid": "bf9b74da-4e1a-41b7-b515-bd5006248c4f",
    "isActive": false,
    "balance": "$1,948.95",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "brown",
    "name": "Mcdowell Yates",
    "gender": "male",
    "company": "AUTOMON",
    "email": "mcdowellyates@automon.com",
    "phone": "+1 (868) 434-3934",
    "address": "510 Dinsmore Place, Albany, Maine, 8506",
    "about": "Non amet nulla qui excepteur nostrud nulla ea in qui non esse ex reprehenderit. Deserunt id enim occaecat pariatur. Proident duis veniam deserunt ea enim amet cillum. Duis tempor non amet ut adipisicing excepteur exercitation in consectetur elit commodo ad excepteur. Velit adipisicing mollit mollit eiusmod cupidatat et sint dolore.\r\n",
    "registered": "2014-12-11T10:23:40 -01:00",
    "latitude": -30.732462,
    "longitude": 132.122066,
    "tags": [
      "do",
      "ullamco",
      "cupidatat",
      "id",
      "eiusmod",
      "esse",
      "ut"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Olive Knapp"
      },
      {
        "id": 1,
        "name": "Nielsen Blackwell"
      },
      {
        "id": 2,
        "name": "Potter Ortiz"
      }
    ],
    "greeting": "Hello, Mcdowell Yates! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca46cf81670a745fb72",
    "index": 10,
    "guid": "fe395160-f875-4f3f-b72a-d25a52292cd1",
    "isActive": true,
    "balance": "$3,290.19",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "brown",
    "name": "Selma Mendoza",
    "gender": "female",
    "company": "EYERIS",
    "email": "selmamendoza@eyeris.com",
    "phone": "+1 (943) 593-3212",
    "address": "644 Macdougal Street, Martell, Oregon, 612",
    "about": "Sint in qui incididunt in nulla Lorem officia fugiat eiusmod magna do. Adipisicing mollit ullamco fugiat sunt. Ipsum dolor tempor qui officia minim consequat minim laboris proident dolore velit elit.\r\n",
    "registered": "2017-01-13T06:18:34 -01:00",
    "latitude": -41.312628,
    "longitude": 96.816711,
    "tags": [
      "eiusmod",
      "eiusmod",
      "cupidatat",
      "commodo",
      "amet",
      "aliqua",
      "irure"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Dollie Wilkinson"
      },
      {
        "id": 1,
        "name": "Curtis Browning"
      },
      {
        "id": 2,
        "name": "Laurie Marshall"
      }
    ],
    "greeting": "Hello, Selma Mendoza! You have 5 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca42516397955123b0f",
    "index": 11,
    "guid": "77bc3c94-519b-4588-8ac2-bcad45c7a30d",
    "isActive": false,
    "balance": "$1,968.91",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "green",
    "name": "Benjamin Carlson",
    "gender": "male",
    "company": "OCTOCORE",
    "email": "benjamincarlson@octocore.com",
    "phone": "+1 (878) 478-2348",
    "address": "347 Lester Court, Maybell, New Jersey, 7143",
    "about": "Mollit et mollit ipsum esse voluptate nostrud. Duis laboris cillum incididunt voluptate fugiat laborum. In officia laborum voluptate consectetur. In aute velit aute dolor. Velit ipsum anim qui aute enim duis sunt labore id irure. Do non elit in dolor.\r\n",
    "registered": "2016-03-12T11:20:12 -01:00",
    "latitude": 42.320099,
    "longitude": -75.241114,
    "tags": [
      "adipisicing",
      "voluptate",
      "adipisicing",
      "aute",
      "tempor",
      "consectetur",
      "proident"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Dyer Pruitt"
      },
      {
        "id": 1,
        "name": "Cecile Salazar"
      },
      {
        "id": 2,
        "name": "Lorrie Warner"
      }
    ],
    "greeting": "Hello, Benjamin Carlson! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca49329119504ea910a",
    "index": 12,
    "guid": "0dd37223-0e06-4cfe-b29b-aa3f51a9e325",
    "isActive": false,
    "balance": "$1,954.41",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "blue",
    "name": "Villarreal Workman",
    "gender": "male",
    "company": "KOFFEE",
    "email": "villarrealworkman@koffee.com",
    "phone": "+1 (897) 509-3311",
    "address": "881 Beekman Place, Greenfields, Michigan, 2947",
    "about": "Aute amet sint exercitation laboris adipisicing. Tempor exercitation in laborum dolor veniam do do et ex sunt nulla. Culpa nulla officia non qui laboris velit non labore fugiat cillum consectetur. Cillum nulla dolore ad officia nostrud exercitation cupidatat aliquip eiusmod commodo ad aute aute. Nulla minim aliqua dolor velit ad do irure eu do deserunt laboris sit.\r\n",
    "registered": "2014-12-18T01:54:12 -01:00",
    "latitude": -26.790418,
    "longitude": -82.803994,
    "tags": [
      "commodo",
      "id",
      "officia",
      "cupidatat",
      "anim",
      "elit",
      "et"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Foster Burt"
      },
      {
        "id": 1,
        "name": "Fran Walter"
      },
      {
        "id": 2,
        "name": "Lambert Jacobson"
      }
    ],
    "greeting": "Hello, Villarreal Workman! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4e70394adbcc5704f",
    "index": 13,
    "guid": "020846f5-3182-4bd8-ac08-c3e031dd5e3e",
    "isActive": false,
    "balance": "$1,815.59",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "blue",
    "name": "Holmes Williams",
    "gender": "male",
    "company": "ZAJ",
    "email": "holmeswilliams@zaj.com",
    "phone": "+1 (999) 483-3177",
    "address": "241 Montrose Avenue, Woodruff, District Of Columbia, 1766",
    "about": "Enim eiusmod irure elit magna aute. Ad aliquip culpa duis et do reprehenderit velit consequat ipsum amet. Mollit Lorem qui elit exercitation. Enim adipisicing ullamco dolor voluptate ipsum. Voluptate duis velit deserunt labore.\r\n",
    "registered": "2015-04-26T07:36:10 -02:00",
    "latitude": -36.001719,
    "longitude": -1.397821,
    "tags": [
      "non",
      "quis",
      "mollit",
      "ut",
      "id",
      "nisi",
      "pariatur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Snyder Clay"
      },
      {
        "id": 1,
        "name": "Ursula Callahan"
      },
      {
        "id": 2,
        "name": "Neal Weeks"
      }
    ],
    "greeting": "Hello, Holmes Williams! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca49673c3309c316ed4",
    "index": 14,
    "guid": "5dad121e-5b84-4ad6-a120-4f0ee832a3b1",
    "isActive": true,
    "balance": "$1,873.79",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "green",
    "name": "Lucia Garrett",
    "gender": "female",
    "company": "GLEAMINK",
    "email": "luciagarrett@gleamink.com",
    "phone": "+1 (973) 553-2162",
    "address": "256 Sharon Street, Chestnut, Indiana, 7507",
    "about": "Dolore non do eu cupidatat est officia aliquip eiusmod eu enim mollit deserunt. Dolor adipisicing nostrud est tempor nulla reprehenderit laborum incididunt ullamco excepteur excepteur. Sit qui velit officia qui ad sint consequat. Eiusmod deserunt aute consectetur in excepteur ex occaecat elit ullamco duis.\r\n",
    "registered": "2014-09-22T02:10:47 -02:00",
    "latitude": 46.378803,
    "longitude": 27.011218,
    "tags": [
      "aliqua",
      "labore",
      "occaecat",
      "minim",
      "est",
      "mollit",
      "elit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Anna Calderon"
      },
      {
        "id": 1,
        "name": "Meadows Herrera"
      },
      {
        "id": 2,
        "name": "Loraine Mcconnell"
      }
    ],
    "greeting": "Hello, Lucia Garrett! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca43e8d74faa60b8e12",
    "index": 15,
    "guid": "f7e1511e-ce20-40bb-aeea-9ce4bd4c80b3",
    "isActive": false,
    "balance": "$2,165.52",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "brown",
    "name": "Bird Lucas",
    "gender": "male",
    "company": "PRIMORDIA",
    "email": "birdlucas@primordia.com",
    "phone": "+1 (816) 418-2597",
    "address": "176 Stryker Street, Weogufka, Marshall Islands, 4057",
    "about": "Occaecat in proident duis dolore magna sint nulla id consectetur non. Anim commodo dolore laboris deserunt minim do proident nisi et officia veniam ut Lorem est. Ad reprehenderit do sunt sunt veniam commodo proident dolor nostrud sit id qui in. Amet in nostrud magna fugiat. Qui deserunt magna nulla cillum laborum Lorem ad reprehenderit officia ullamco sint do ex qui. Qui ut sint labore amet voluptate qui culpa in excepteur. Lorem fugiat aliquip ut aute labore in labore irure.\r\n",
    "registered": "2014-05-22T08:04:30 -02:00",
    "latitude": 38.264223,
    "longitude": 53.740522,
    "tags": [
      "et",
      "dolor",
      "eiusmod",
      "est",
      "nisi",
      "proident",
      "esse"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Avis Short"
      },
      {
        "id": 1,
        "name": "Carrillo Leblanc"
      },
      {
        "id": 2,
        "name": "Duke Giles"
      }
    ],
    "greeting": "Hello, Bird Lucas! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca47d627f04c53f7fe0",
    "index": 16,
    "guid": "5a848821-3d5d-4a1e-b6da-04311480127f",
    "isActive": false,
    "balance": "$2,584.05",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "green",
    "name": "Gabrielle Sampson",
    "gender": "female",
    "company": "INRT",
    "email": "gabriellesampson@inrt.com",
    "phone": "+1 (948) 444-3743",
    "address": "478 Farragut Place, Loretto, Arizona, 5544",
    "about": "Nostrud fugiat dolore nulla est pariatur ex aute consequat Lorem adipisicing. Minim proident culpa laborum ea deserunt sit esse cupidatat consectetur. Aliqua et aute deserunt eu ea excepteur. Labore quis cillum nostrud deserunt sunt velit dolore. Incididunt exercitation aliquip esse velit ullamco magna labore. Commodo adipisicing dolore officia laborum laborum ullamco laboris anim.\r\n",
    "registered": "2014-08-01T12:34:16 -02:00",
    "latitude": 28.158144,
    "longitude": -136.436268,
    "tags": [
      "id",
      "ullamco",
      "ex",
      "minim",
      "consequat",
      "ex",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Wise Rivers"
      },
      {
        "id": 1,
        "name": "Concetta Mclean"
      },
      {
        "id": 2,
        "name": "Betty Mcdonald"
      }
    ],
    "greeting": "Hello, Gabrielle Sampson! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca440eb5bdcd1e5cd67",
    "index": 17,
    "guid": "37c70484-ebed-40ee-9bfb-c43ed2e42398",
    "isActive": true,
    "balance": "$3,222.41",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "brown",
    "name": "Jolene Duran",
    "gender": "female",
    "company": "SKYPLEX",
    "email": "joleneduran@skyplex.com",
    "phone": "+1 (808) 416-2898",
    "address": "481 Tapscott Street, Dunlo, Ohio, 906",
    "about": "Consectetur irure pariatur elit exercitation. Amet aliqua dolor id qui aliqua fugiat laborum laboris dolore sunt minim irure. Magna aute duis ex nisi aute exercitation duis consequat ipsum. Lorem nostrud exercitation culpa nulla tempor ex elit sunt aliquip aliqua amet. Nulla fugiat sint occaecat dolore sit enim proident.\r\n",
    "registered": "2018-02-19T08:50:34 -01:00",
    "latitude": -22.372519,
    "longitude": 33.556449,
    "tags": [
      "proident",
      "labore",
      "nisi",
      "occaecat",
      "labore",
      "dolore",
      "enim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Sims Huber"
      },
      {
        "id": 1,
        "name": "Cobb Lyons"
      },
      {
        "id": 2,
        "name": "Norton Dale"
      }
    ],
    "greeting": "Hello, Jolene Duran! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca46791b04789854b07",
    "index": 18,
    "guid": "02d7f0a5-8be6-4ae8-a75a-32a8ecaab05e",
    "isActive": false,
    "balance": "$1,924.03",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "green",
    "name": "Shepard Kinney",
    "gender": "male",
    "company": "CYCLONICA",
    "email": "shepardkinney@cyclonica.com",
    "phone": "+1 (859) 429-3206",
    "address": "752 Division Place, Boomer, Virgin Islands, 5377",
    "about": "Eiusmod ut fugiat minim commodo fugiat quis incididunt elit incididunt labore et culpa deserunt. Ullamco nostrud adipisicing eiusmod cillum do nisi et. Aute Lorem reprehenderit laboris deserunt do est adipisicing voluptate. Anim ea eiusmod est dolore non ut sit duis esse Lorem tempor cillum. Consectetur eiusmod elit sunt aliquip deserunt ut aute magna sit reprehenderit reprehenderit.\r\n",
    "registered": "2017-06-20T07:52:23 -02:00",
    "latitude": 38.711542,
    "longitude": 175.280132,
    "tags": [
      "non",
      "laboris",
      "esse",
      "magna",
      "sint",
      "elit",
      "eiusmod"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Oneal Trujillo"
      },
      {
        "id": 1,
        "name": "Tonia Pena"
      },
      {
        "id": 2,
        "name": "Rich Owen"
      }
    ],
    "greeting": "Hello, Shepard Kinney! You have 9 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4687333ff62af544d",
    "index": 19,
    "guid": "cdd0e99b-ec82-43f5-b364-e5aea508ea9b",
    "isActive": true,
    "balance": "$1,404.16",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "brown",
    "name": "Lester Stephens",
    "gender": "male",
    "company": "OPTICALL",
    "email": "lesterstephens@opticall.com",
    "phone": "+1 (894) 513-3178",
    "address": "889 Lamont Court, Cornucopia, New Mexico, 9961",
    "about": "Ad et ullamco adipisicing amet minim aliqua dolor dolor aliquip magna reprehenderit. Dolor sunt veniam nulla esse. Culpa eiusmod occaecat enim laboris dolor deserunt commodo et aliqua officia qui.\r\n",
    "registered": "2016-07-16T11:49:56 -02:00",
    "latitude": -58.42316,
    "longitude": -61.13171,
    "tags": [
      "veniam",
      "commodo",
      "quis",
      "non",
      "pariatur",
      "eu",
      "id"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Latasha Stevenson"
      },
      {
        "id": 1,
        "name": "Lola Christensen"
      },
      {
        "id": 2,
        "name": "Fields Crane"
      }
    ],
    "greeting": "Hello, Lester Stephens! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4a0ff84437e7c52f8",
    "index": 20,
    "guid": "34fe962d-af10-41f2-9854-08f430cb94ef",
    "isActive": false,
    "balance": "$1,671.47",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "brown",
    "name": "Contreras Brewer",
    "gender": "male",
    "company": "PAPRIKUT",
    "email": "contrerasbrewer@paprikut.com",
    "phone": "+1 (838) 423-3134",
    "address": "791 Wolf Place, Fannett, Vermont, 979",
    "about": "Ipsum Lorem nisi aliqua aute excepteur pariatur quis sint eiusmod. Eu laborum in nulla nostrud pariatur elit commodo labore mollit. Enim sunt anim eiusmod commodo aliquip mollit amet. Ullamco aliquip pariatur elit in duis do in proident exercitation. Proident eu ut ea commodo tempor incididunt incididunt cillum cupidatat.\r\n",
    "registered": "2017-10-28T09:43:50 -02:00",
    "latitude": -66.61617,
    "longitude": -159.415097,
    "tags": [
      "nisi",
      "voluptate",
      "commodo",
      "in",
      "aliqua",
      "excepteur",
      "dolore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Bush Webster"
      },
      {
        "id": 1,
        "name": "Velez Dotson"
      },
      {
        "id": 2,
        "name": "Fisher Hicks"
      }
    ],
    "greeting": "Hello, Contreras Brewer! You have 2 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca40aa53ea57dd58284",
    "index": 21,
    "guid": "e88e4b83-0e9f-48a2-9710-f6f00911bb8b",
    "isActive": false,
    "balance": "$2,238.31",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "blue",
    "name": "Prince Cooke",
    "gender": "male",
    "company": "WRAPTURE",
    "email": "princecooke@wrapture.com",
    "phone": "+1 (936) 435-3484",
    "address": "277 Manhattan Court, Gila, New Hampshire, 9448",
    "about": "Ad laborum laboris nulla eiusmod laborum esse. Lorem reprehenderit in voluptate duis minim veniam exercitation proident elit sint eu ex. Cupidatat dolore do pariatur officia. Occaecat laboris duis aliquip irure Lorem consectetur labore.\r\n",
    "registered": "2017-08-10T08:33:40 -02:00",
    "latitude": 72.092162,
    "longitude": 50.215993,
    "tags": [
      "tempor",
      "cillum",
      "deserunt",
      "cupidatat",
      "pariatur",
      "aute",
      "sunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Malone Parks"
      },
      {
        "id": 1,
        "name": "James Bernard"
      },
      {
        "id": 2,
        "name": "Boyd Bauer"
      }
    ],
    "greeting": "Hello, Prince Cooke! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4c0de66dc24395ab3",
    "index": 22,
    "guid": "2afaeb31-910b-4da9-9c32-416e2ad81dc0",
    "isActive": true,
    "balance": "$1,700.14",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "green",
    "name": "Mullins Franklin",
    "gender": "male",
    "company": "GROK",
    "email": "mullinsfranklin@grok.com",
    "phone": "+1 (995) 551-3168",
    "address": "857 Chauncey Street, Morningside, Tennessee, 9823",
    "about": "Veniam anim laboris ea id nostrud anim adipisicing occaecat enim eu. Sint quis ullamco qui ea nostrud consequat nulla do ea id non. Aliqua minim anim quis laborum eu do duis esse do ut elit elit aute magna. Duis sunt eu tempor cillum sint dolore eu laborum culpa dolore eu reprehenderit. Dolore consequat tempor ex commodo officia proident tempor do sunt adipisicing cillum. Occaecat nisi ut amet culpa consectetur sunt ad in qui sint dolore et labore. Ea id consectetur commodo velit incididunt.\r\n",
    "registered": "2014-04-05T02:44:11 -02:00",
    "latitude": 9.940074,
    "longitude": 23.035629,
    "tags": [
      "eu",
      "proident",
      "labore",
      "labore",
      "elit",
      "aliquip",
      "nisi"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Dena Porter"
      },
      {
        "id": 1,
        "name": "Estelle Humphrey"
      },
      {
        "id": 2,
        "name": "Pierce Merrill"
      }
    ],
    "greeting": "Hello, Mullins Franklin! You have 8 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca42317e252c8f816a1",
    "index": 23,
    "guid": "1e1a6345-5518-44ad-a33b-d8cb9162795e",
    "isActive": true,
    "balance": "$1,672.56",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "blue",
    "name": "Dana Ferguson",
    "gender": "female",
    "company": "AQUAMATE",
    "email": "danaferguson@aquamate.com",
    "phone": "+1 (897) 400-2043",
    "address": "521 Holly Street, Waterford, Massachusetts, 6098",
    "about": "Lorem ut dolore anim consequat dolore sunt non dolore eu esse in est. Elit labore pariatur excepteur ipsum dolor ut incididunt. Sint culpa consequat consectetur culpa deserunt officia nulla excepteur cupidatat id tempor fugiat cupidatat. Culpa ex occaecat amet sint nisi dolore eiusmod magna amet ad. Deserunt laborum sint veniam fugiat sunt veniam enim laboris. Nulla ut sint sunt dolore adipisicing ex dolor ex labore aliqua irure aliquip tempor. Ea deserunt duis qui sunt dolor enim reprehenderit eu cillum fugiat.\r\n",
    "registered": "2014-03-21T02:57:33 -01:00",
    "latitude": 37.254802,
    "longitude": -67.166861,
    "tags": [
      "ea",
      "cupidatat",
      "eiusmod",
      "elit",
      "nisi",
      "ut",
      "deserunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hines Dyer"
      },
      {
        "id": 1,
        "name": "Adeline Myers"
      },
      {
        "id": 2,
        "name": "Jackie Cortez"
      }
    ],
    "greeting": "Hello, Dana Ferguson! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4f3d4b291ec165f4d",
    "index": 24,
    "guid": "e8660c50-85c7-4eb7-a19e-318dfdac8847",
    "isActive": false,
    "balance": "$2,026.05",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "green",
    "name": "Cline Rowe",
    "gender": "male",
    "company": "MEDCOM",
    "email": "clinerowe@medcom.com",
    "phone": "+1 (847) 462-2364",
    "address": "834 Randolph Street, Driftwood, Pennsylvania, 6029",
    "about": "Occaecat mollit labore non tempor minim dolore. Eiusmod ullamco anim laborum laboris nulla sint nulla qui nostrud laborum Lorem elit ipsum. Adipisicing cillum duis adipisicing aute aliqua laboris ad veniam reprehenderit adipisicing. Consequat incididunt officia est et anim anim cupidatat nostrud. Nulla ipsum ad fugiat consectetur sint laboris proident proident esse cillum. Quis eu cupidatat labore aliqua esse aute.\r\n",
    "registered": "2017-04-27T06:42:19 -02:00",
    "latitude": 67.438005,
    "longitude": -110.740901,
    "tags": [
      "consectetur",
      "deserunt",
      "occaecat",
      "commodo",
      "ex",
      "dolore",
      "enim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Katharine Chase"
      },
      {
        "id": 1,
        "name": "Vilma Wilder"
      },
      {
        "id": 2,
        "name": "Pearl Whitehead"
      }
    ],
    "greeting": "Hello, Cline Rowe! You have 8 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca49265e117184090c4",
    "index": 25,
    "guid": "3f77c71a-6319-4153-8d58-7cc2795896e5",
    "isActive": true,
    "balance": "$2,623.65",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "brown",
    "name": "Richards Martin",
    "gender": "male",
    "company": "KIGGLE",
    "email": "richardsmartin@kiggle.com",
    "phone": "+1 (979) 473-3955",
    "address": "602 Schenck Street, Harleigh, Wyoming, 6451",
    "about": "Amet id culpa ipsum do exercitation esse deserunt duis consectetur laboris proident. Sint magna ullamco sint velit esse non sint exercitation id. Reprehenderit aute velit ullamco tempor nostrud id amet eiusmod ad consequat.\r\n",
    "registered": "2014-01-11T08:49:51 -01:00",
    "latitude": -88.586932,
    "longitude": 83.019187,
    "tags": [
      "reprehenderit",
      "incididunt",
      "minim",
      "ea",
      "eiusmod",
      "laboris",
      "ipsum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Lynette Cook"
      },
      {
        "id": 1,
        "name": "Foley Greer"
      },
      {
        "id": 2,
        "name": "Jacobson Winters"
      }
    ],
    "greeting": "Hello, Richards Martin! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4d28534d76f3edf23",
    "index": 26,
    "guid": "9a4777ee-41d8-4234-9898-a4b209c046f5",
    "isActive": false,
    "balance": "$1,212.79",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "green",
    "name": "Maritza Holmes",
    "gender": "female",
    "company": "WEBIOTIC",
    "email": "maritzaholmes@webiotic.com",
    "phone": "+1 (988) 473-2434",
    "address": "144 Woods Place, Shelby, Palau, 6230",
    "about": "Ut veniam culpa ullamco ea id ipsum do mollit in aliquip. Culpa minim cupidatat cupidatat amet dolor nostrud. Qui voluptate aliquip commodo nulla aute. Laboris ad ullamco ullamco dolore et consectetur consectetur sint consectetur aute velit.\r\n",
    "registered": "2017-06-10T01:19:39 -02:00",
    "latitude": -0.8359,
    "longitude": -77.715462,
    "tags": [
      "fugiat",
      "cillum",
      "culpa",
      "nisi",
      "ad",
      "et",
      "ullamco"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Griffin Camacho"
      },
      {
        "id": 1,
        "name": "Gay Chandler"
      },
      {
        "id": 2,
        "name": "Gould Bennett"
      }
    ],
    "greeting": "Hello, Maritza Holmes! You have 2 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4782695da5e204b61",
    "index": 27,
    "guid": "c5362fdb-6452-4121-b02e-6f227b7b01be",
    "isActive": true,
    "balance": "$3,233.57",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "blue",
    "name": "Schwartz Kent",
    "gender": "male",
    "company": "BRAINQUIL",
    "email": "schwartzkent@brainquil.com",
    "phone": "+1 (876) 586-3655",
    "address": "214 Ferris Street, Bellamy, American Samoa, 8418",
    "about": "Sit elit duis aute excepteur id id non. Reprehenderit excepteur cillum commodo exercitation culpa. Enim exercitation magna tempor adipisicing sit qui incididunt ad incididunt eu.\r\n",
    "registered": "2016-05-30T09:27:27 -02:00",
    "latitude": -59.279955,
    "longitude": -73.541767,
    "tags": [
      "laborum",
      "nostrud",
      "labore",
      "voluptate",
      "culpa",
      "ipsum",
      "aute"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Tucker Holden"
      },
      {
        "id": 1,
        "name": "Russo Gaines"
      },
      {
        "id": 2,
        "name": "Hinton Guthrie"
      }
    ],
    "greeting": "Hello, Schwartz Kent! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca452997a1959269654",
    "index": 28,
    "guid": "1dfcbdb7-19ae-4da0-af93-44d8ba53525a",
    "isActive": false,
    "balance": "$1,254.91",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "brown",
    "name": "Hilda Fry",
    "gender": "female",
    "company": "MACRONAUT",
    "email": "hildafry@macronaut.com",
    "phone": "+1 (897) 563-3983",
    "address": "910 Diamond Street, Como, Rhode Island, 5750",
    "about": "Officia incididunt elit culpa laborum do veniam. Lorem aute irure do consectetur esse proident proident. Consequat voluptate sit id sit occaecat aute excepteur consectetur Lorem occaecat nisi. Aliqua esse nulla dolore ad ut tempor ipsum nostrud magna incididunt. Magna fugiat dolor consequat magna duis pariatur incididunt in culpa id. Laboris eu culpa sint aliquip cillum.\r\n",
    "registered": "2014-12-13T11:30:37 -01:00",
    "latitude": 53.830879,
    "longitude": 132.398656,
    "tags": [
      "ex",
      "velit",
      "nulla",
      "et",
      "exercitation",
      "mollit",
      "aliquip"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Candice Freeman"
      },
      {
        "id": 1,
        "name": "Ola Miller"
      },
      {
        "id": 2,
        "name": "Isabelle Cabrera"
      }
    ],
    "greeting": "Hello, Hilda Fry! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4ac4b491a21c46b18",
    "index": 29,
    "guid": "bf635f67-d46e-4f96-b3e2-4c7406c97e86",
    "isActive": true,
    "balance": "$2,448.76",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "green",
    "name": "Frazier Mejia",
    "gender": "male",
    "company": "PHOLIO",
    "email": "fraziermejia@pholio.com",
    "phone": "+1 (807) 528-3672",
    "address": "214 Willow Street, Sylvanite, Montana, 6819",
    "about": "Eiusmod voluptate ipsum occaecat sit dolor consequat. Dolore cillum do Lorem ut aliqua amet laboris irure. Nisi id voluptate consequat esse veniam voluptate tempor proident consequat nulla. Ad aliquip incididunt cillum reprehenderit mollit anim incididunt sint ad. Do commodo labore elit sit Lorem velit irure ex adipisicing commodo cillum anim. Voluptate pariatur elit voluptate amet sunt aliquip sit labore enim sunt quis elit consequat pariatur. Est sint sit pariatur nisi sint consequat occaecat ea qui officia.\r\n",
    "registered": "2016-05-18T01:25:08 -02:00",
    "latitude": -56.99058,
    "longitude": -83.479576,
    "tags": [
      "aliqua",
      "velit",
      "ea",
      "consequat",
      "esse",
      "duis",
      "ea"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Alma Shepard"
      },
      {
        "id": 1,
        "name": "Annabelle Jordan"
      },
      {
        "id": 2,
        "name": "Trina Woodard"
      }
    ],
    "greeting": "Hello, Frazier Mejia! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4953c542aa6869aaf",
    "index": 30,
    "guid": "de32ce3e-bd19-444f-a942-98e36634803e",
    "isActive": false,
    "balance": "$2,001.20",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "blue",
    "name": "Hillary Burch",
    "gender": "female",
    "company": "SUSTENZA",
    "email": "hillaryburch@sustenza.com",
    "phone": "+1 (815) 542-3577",
    "address": "455 Portal Street, Rivers, Connecticut, 1250",
    "about": "Lorem ipsum duis nostrud incididunt eu voluptate do ipsum nisi ex nisi. Minim aute nulla consectetur Lorem duis nisi Lorem voluptate. Consequat fugiat laborum cillum cillum amet cupidatat nostrud. Aliqua reprehenderit exercitation ea velit culpa.\r\n",
    "registered": "2016-10-17T08:15:59 -02:00",
    "latitude": 87.98678,
    "longitude": -102.425761,
    "tags": [
      "et",
      "magna",
      "magna",
      "excepteur",
      "commodo",
      "ad",
      "excepteur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Paige Key"
      },
      {
        "id": 1,
        "name": "Paulette Harding"
      },
      {
        "id": 2,
        "name": "Jennifer Singleton"
      }
    ],
    "greeting": "Hello, Hillary Burch! You have 8 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4d2b3100a264376b0",
    "index": 31,
    "guid": "45f0696e-5822-43ed-9aef-4c3307bbad5f",
    "isActive": true,
    "balance": "$2,761.87",
    "picture": "http://placehold.it/32x32",
    "age": 24,
    "eyeColor": "blue",
    "name": "Gallagher Marsh",
    "gender": "male",
    "company": "LIQUICOM",
    "email": "gallaghermarsh@liquicom.com",
    "phone": "+1 (880) 555-3488",
    "address": "719 Albemarle Terrace, Utting, Minnesota, 4764",
    "about": "Anim irure amet eu mollit Lorem aliquip dolor eiusmod dolor commodo. In eu pariatur et aliquip irure cillum sunt consectetur. Laborum id magna adipisicing amet deserunt adipisicing. Laboris officia officia fugiat eiusmod dolor ea incididunt quis adipisicing. Irure ex esse commodo laboris. Incididunt ex proident irure reprehenderit do enim labore reprehenderit minim minim irure nostrud ut.\r\n",
    "registered": "2015-03-07T09:58:10 -01:00",
    "latitude": 0.10502,
    "longitude": -136.673309,
    "tags": [
      "ipsum",
      "enim",
      "incididunt",
      "consectetur",
      "aute",
      "magna",
      "sint"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Aguilar Irwin"
      },
      {
        "id": 1,
        "name": "Effie Steele"
      },
      {
        "id": 2,
        "name": "Fannie Spencer"
      }
    ],
    "greeting": "Hello, Gallagher Marsh! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca470c6085f44bc883b",
    "index": 32,
    "guid": "87acc95b-05ee-4ec8-a166-3968e4998428",
    "isActive": false,
    "balance": "$3,598.02",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "green",
    "name": "Hutchinson Garner",
    "gender": "male",
    "company": "SEALOUD",
    "email": "hutchinsongarner@sealoud.com",
    "phone": "+1 (812) 482-3680",
    "address": "644 Hendrickson Place, Inkerman, North Dakota, 3697",
    "about": "Incididunt dolor id Lorem do nisi est occaecat dolor aute veniam. Consequat sit ipsum sint quis proident laboris qui culpa anim exercitation laborum consectetur consequat mollit. Enim in do aliquip proident culpa est magna.\r\n",
    "registered": "2018-01-31T10:56:39 -01:00",
    "latitude": -35.744192,
    "longitude": 49.273391,
    "tags": [
      "sunt",
      "anim",
      "sunt",
      "veniam",
      "velit",
      "sit",
      "dolor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Morgan Joyner"
      },
      {
        "id": 1,
        "name": "Florine Witt"
      },
      {
        "id": 2,
        "name": "Claudine Patton"
      }
    ],
    "greeting": "Hello, Hutchinson Garner! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca41b3e6331cee44f56",
    "index": 33,
    "guid": "139282bb-e6e2-4641-99ca-e7fd260ad478",
    "isActive": false,
    "balance": "$1,961.81",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "green",
    "name": "Emerson Zimmerman",
    "gender": "male",
    "company": "RODEOMAD",
    "email": "emersonzimmerman@rodeomad.com",
    "phone": "+1 (923) 426-3589",
    "address": "133 Turnbull Avenue, Choctaw, Idaho, 5394",
    "about": "Excepteur deserunt eiusmod voluptate voluptate et. Sunt dolore nisi pariatur commodo cillum labore. Cupidatat et fugiat velit ex. Do nisi adipisicing Lorem cupidatat est. Elit dolor commodo esse ex anim deserunt fugiat. Ullamco laboris labore minim id occaecat eiusmod tempor est commodo voluptate irure. Nisi minim minim ut excepteur eu reprehenderit.\r\n",
    "registered": "2014-06-25T05:01:39 -02:00",
    "latitude": 37.417552,
    "longitude": -134.27535,
    "tags": [
      "adipisicing",
      "sit",
      "tempor",
      "eu",
      "anim",
      "exercitation",
      "ea"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Maryanne Adkins"
      },
      {
        "id": 1,
        "name": "Nixon Kelley"
      },
      {
        "id": 2,
        "name": "Brown Keller"
      }
    ],
    "greeting": "Hello, Emerson Zimmerman! You have 9 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca46bf76baa9796c7b9",
    "index": 34,
    "guid": "fdbdc19c-b91a-4f24-8949-24c370f9cf53",
    "isActive": true,
    "balance": "$3,992.26",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "blue",
    "name": "Short Ramirez",
    "gender": "male",
    "company": "FLUM",
    "email": "shortramirez@flum.com",
    "phone": "+1 (910) 496-3871",
    "address": "197 Cumberland Walk, Cetronia, Nevada, 5620",
    "about": "Minim commodo nostrud Lorem aliqua magna in deserunt fugiat nisi labore laboris enim duis. Aliqua nulla est esse tempor. Pariatur commodo est aute exercitation nostrud in in.\r\n",
    "registered": "2018-11-11T10:50:44 -01:00",
    "latitude": -1.383076,
    "longitude": -113.908598,
    "tags": [
      "eu",
      "ullamco",
      "laboris",
      "officia",
      "exercitation",
      "officia",
      "ut"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Carlson Austin"
      },
      {
        "id": 1,
        "name": "Marisol Cooley"
      },
      {
        "id": 2,
        "name": "Kaitlin Sellers"
      }
    ],
    "greeting": "Hello, Short Ramirez! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4070f0ed788340273",
    "index": 35,
    "guid": "7263e888-83d3-4749-9197-4ec600c4a739",
    "isActive": false,
    "balance": "$3,170.63",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "brown",
    "name": "Wong Cobb",
    "gender": "male",
    "company": "ACCUFARM",
    "email": "wongcobb@accufarm.com",
    "phone": "+1 (965) 495-3443",
    "address": "684 Dumont Avenue, Broadlands, Florida, 6525",
    "about": "Sit anim est proident commodo in ea enim magna veniam eiusmod est proident. Id laboris in officia proident nulla non consequat in dolore. Ut anim et Lorem ea nostrud.\r\n",
    "registered": "2016-08-25T07:11:20 -02:00",
    "latitude": 10.570999,
    "longitude": 101.905633,
    "tags": [
      "eiusmod",
      "labore",
      "proident",
      "esse",
      "pariatur",
      "consectetur",
      "nostrud"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hester Osborn"
      },
      {
        "id": 1,
        "name": "Vincent Booth"
      },
      {
        "id": 2,
        "name": "Horne Sweeney"
      }
    ],
    "greeting": "Hello, Wong Cobb! You have 8 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca45627f6cc6f35aca1",
    "index": 36,
    "guid": "4e6e844f-8047-42fa-ba15-d6b73581af92",
    "isActive": false,
    "balance": "$2,383.08",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "green",
    "name": "Lisa Manning",
    "gender": "female",
    "company": "ACUSAGE",
    "email": "lisamanning@acusage.com",
    "phone": "+1 (972) 514-2503",
    "address": "425 Middleton Street, Oasis, Delaware, 2324",
    "about": "Occaecat sunt consequat sit enim anim sit enim proident. Eiusmod Lorem occaecat duis fugiat commodo pariatur mollit nostrud reprehenderit exercitation. Velit quis qui non consectetur proident excepteur ipsum magna. Officia laborum eiusmod ea ipsum tempor labore.\r\n",
    "registered": "2017-07-28T03:38:51 -02:00",
    "latitude": 22.175463,
    "longitude": -81.701937,
    "tags": [
      "in",
      "nisi",
      "Lorem",
      "labore",
      "cupidatat",
      "veniam",
      "labore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Estes Sharp"
      },
      {
        "id": 1,
        "name": "Dina Head"
      },
      {
        "id": 2,
        "name": "Boyle Caldwell"
      }
    ],
    "greeting": "Hello, Lisa Manning! You have 2 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca42a8b770585917fd6",
    "index": 37,
    "guid": "e6c5635e-a071-4f96-85d7-1e13270e9cef",
    "isActive": false,
    "balance": "$2,220.76",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "green",
    "name": "Ramsey Meadows",
    "gender": "male",
    "company": "INTRADISK",
    "email": "ramseymeadows@intradisk.com",
    "phone": "+1 (920) 448-2826",
    "address": "763 Utica Avenue, Gracey, Wisconsin, 4035",
    "about": "Aliqua do cupidatat laborum deserunt cillum sunt proident velit cillum sit cupidatat. Sint magna elit anim officia est adipisicing eiusmod ad exercitation proident ullamco nulla qui. Ex dolore in labore id velit aliqua labore aute. Voluptate dolore fugiat est eu tempor non.\r\n",
    "registered": "2015-08-02T07:41:48 -02:00",
    "latitude": 7.741521,
    "longitude": -131.309928,
    "tags": [
      "excepteur",
      "sint",
      "aliquip",
      "aute",
      "ad",
      "aliquip",
      "consequat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Zimmerman Raymond"
      },
      {
        "id": 1,
        "name": "Holly Cunningham"
      },
      {
        "id": 2,
        "name": "Singleton Hampton"
      }
    ],
    "greeting": "Hello, Ramsey Meadows! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4e3cb926d1583b6c1",
    "index": 38,
    "guid": "3bfcda23-7001-4b49-8573-38ce689393d6",
    "isActive": false,
    "balance": "$3,450.13",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "green",
    "name": "Valencia Hendrix",
    "gender": "male",
    "company": "HALAP",
    "email": "valenciahendrix@halap.com",
    "phone": "+1 (811) 567-3203",
    "address": "706 Scholes Street, Emory, New York, 3524",
    "about": "Eiusmod minim magna eu culpa eu. Non est consectetur anim ipsum eu commodo voluptate amet. Est nisi non aute commodo irure nostrud quis est esse mollit. Excepteur voluptate eu in exercitation velit cupidatat in. Ex anim exercitation commodo laborum ullamco.\r\n",
    "registered": "2015-01-16T05:38:40 -01:00",
    "latitude": 81.403064,
    "longitude": -90.035256,
    "tags": [
      "do",
      "dolor",
      "elit",
      "ut",
      "aliqua",
      "deserunt",
      "cupidatat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Vargas Alford"
      },
      {
        "id": 1,
        "name": "Brittany Rodriguez"
      },
      {
        "id": 2,
        "name": "Vinson Black"
      }
    ],
    "greeting": "Hello, Valencia Hendrix! You have 8 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca44ce0f509be9eb8c4",
    "index": 39,
    "guid": "2c08b592-c8bf-4bfd-8587-402e1c25061b",
    "isActive": false,
    "balance": "$1,019.33",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "blue",
    "name": "Deana Armstrong",
    "gender": "female",
    "company": "EXODOC",
    "email": "deanaarmstrong@exodoc.com",
    "phone": "+1 (920) 519-3922",
    "address": "492 Milford Street, Nogal, Oklahoma, 7434",
    "about": "Consequat esse Lorem officia sit nisi velit pariatur dolore occaecat exercitation sunt consectetur. Minim proident aliquip commodo laboris commodo aliquip est deserunt in labore tempor aliqua elit. Eiusmod commodo deserunt eu ea nulla laboris ex dolor exercitation. Nisi officia enim ex eiusmod cillum voluptate consectetur.\r\n",
    "registered": "2015-04-01T06:48:14 -02:00",
    "latitude": 63.614561,
    "longitude": 129.864077,
    "tags": [
      "consectetur",
      "amet",
      "tempor",
      "est",
      "consequat",
      "proident",
      "cupidatat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mcneil Holloway"
      },
      {
        "id": 1,
        "name": "Jacqueline Daniel"
      },
      {
        "id": 2,
        "name": "Susana Rosario"
      }
    ],
    "greeting": "Hello, Deana Armstrong! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4b54fa702f8ae0bf2",
    "index": 40,
    "guid": "e7433b9a-e2c7-4169-868b-10ea880ec5e0",
    "isActive": true,
    "balance": "$1,589.65",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "blue",
    "name": "Parrish Estrada",
    "gender": "male",
    "company": "EMTRAC",
    "email": "parrishestrada@emtrac.com",
    "phone": "+1 (887) 494-2294",
    "address": "643 Branton Street, Leola, North Carolina, 5658",
    "about": "Deserunt ea mollit enim non pariatur id ut elit nisi. Est elit eu commodo et duis. Consequat aliquip irure qui irure dolore reprehenderit esse elit velit dolore commodo enim aliqua Lorem. Deserunt adipisicing nulla esse nostrud magna in occaecat nulla deserunt ipsum nisi non. Aliquip voluptate nostrud ut magna tempor dolor. Officia labore qui dolore ullamco adipisicing in amet adipisicing eu. Occaecat fugiat commodo ipsum aliquip cillum eu.\r\n",
    "registered": "2017-05-06T12:17:47 -02:00",
    "latitude": 55.426145,
    "longitude": 2.115886,
    "tags": [
      "ipsum",
      "amet",
      "deserunt",
      "anim",
      "voluptate",
      "anim",
      "deserunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Walton Tanner"
      },
      {
        "id": 1,
        "name": "Kenya Morales"
      },
      {
        "id": 2,
        "name": "Alexandria Jimenez"
      }
    ],
    "greeting": "Hello, Parrish Estrada! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca446cf2b907fa3b8f3",
    "index": 41,
    "guid": "aedd0957-337b-47b3-b9b2-17c579feccc5",
    "isActive": true,
    "balance": "$1,374.97",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "green",
    "name": "Beulah Nelson",
    "gender": "female",
    "company": "BUGSALL",
    "email": "beulahnelson@bugsall.com",
    "phone": "+1 (966) 551-2794",
    "address": "469 Townsend Street, Ruckersville, Arkansas, 8541",
    "about": "Laboris est officia proident labore velit excepteur ipsum reprehenderit excepteur minim id laborum incididunt. Proident ipsum aute laboris ad excepteur irure nulla culpa do excepteur eu consequat reprehenderit eu. Id exercitation veniam magna dolore culpa occaecat esse duis. In excepteur mollit ipsum ut.\r\n",
    "registered": "2015-09-07T11:56:35 -02:00",
    "latitude": -27.578583,
    "longitude": 141.647282,
    "tags": [
      "laborum",
      "fugiat",
      "mollit",
      "do",
      "veniam",
      "incididunt",
      "nostrud"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Staci Petersen"
      },
      {
        "id": 1,
        "name": "Sherrie Hutchinson"
      },
      {
        "id": 2,
        "name": "Martha Mccall"
      }
    ],
    "greeting": "Hello, Beulah Nelson! You have 5 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4713872a3199e6e4d",
    "index": 42,
    "guid": "ea37447d-2f35-458e-b322-7c88d822c1ac",
    "isActive": true,
    "balance": "$2,432.84",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "green",
    "name": "Manning Mcbride",
    "gender": "male",
    "company": "ENTHAZE",
    "email": "manningmcbride@enthaze.com",
    "phone": "+1 (836) 428-2176",
    "address": "942 Sullivan Street, Cecilia, Maryland, 8616",
    "about": "Consectetur voluptate do duis ex occaecat velit occaecat mollit. Ut amet laborum Lorem ea magna velit nostrud adipisicing aliqua duis nostrud occaecat. Proident reprehenderit nostrud aliquip ea culpa.\r\n",
    "registered": "2015-02-25T10:16:46 -01:00",
    "latitude": -54.025068,
    "longitude": -107.96785,
    "tags": [
      "aliqua",
      "deserunt",
      "incididunt",
      "magna",
      "culpa",
      "voluptate",
      "esse"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Vera Hurst"
      },
      {
        "id": 1,
        "name": "Bishop Conway"
      },
      {
        "id": 2,
        "name": "Bowen Wilcox"
      }
    ],
    "greeting": "Hello, Manning Mcbride! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4b3ba4f7fd2352514",
    "index": 43,
    "guid": "33bd95ea-52f8-42a3-b418-2d5459c40a47",
    "isActive": true,
    "balance": "$2,008.10",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "green",
    "name": "Hanson Compton",
    "gender": "male",
    "company": "TALENDULA",
    "email": "hansoncompton@talendula.com",
    "phone": "+1 (990) 409-3597",
    "address": "539 Withers Street, Cannondale, Nebraska, 7707",
    "about": "Nisi magna nulla quis laboris quis pariatur tempor nulla cupidatat consequat do. Enim ipsum Lorem ut laboris ex cupidatat adipisicing reprehenderit nostrud. Laborum ullamco veniam anim culpa esse laborum esse. Fugiat cupidatat duis amet ad quis. Esse aliquip fugiat eu in consequat elit minim reprehenderit minim non nulla. Est ad et labore sunt aute nisi commodo et. Laborum laboris magna dolore esse.\r\n",
    "registered": "2016-07-02T01:59:27 -02:00",
    "latitude": -89.155017,
    "longitude": 37.13812,
    "tags": [
      "incididunt",
      "ea",
      "incididunt",
      "cillum",
      "nulla",
      "commodo",
      "et"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Selena Lane"
      },
      {
        "id": 1,
        "name": "Munoz Aguilar"
      },
      {
        "id": 2,
        "name": "Lupe Riley"
      }
    ],
    "greeting": "Hello, Hanson Compton! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca400d849366239819a",
    "index": 44,
    "guid": "0a58d549-e20c-4dc3-839b-7c238df52acb",
    "isActive": false,
    "balance": "$2,845.82",
    "picture": "http://placehold.it/32x32",
    "age": 24,
    "eyeColor": "green",
    "name": "Huber Hopper",
    "gender": "male",
    "company": "PYRAMIS",
    "email": "huberhopper@pyramis.com",
    "phone": "+1 (890) 461-2264",
    "address": "568 Furman Street, Cherokee, South Carolina, 2835",
    "about": "Consequat aliqua anim ex officia non adipisicing irure in magna elit. Nostrud consectetur enim ipsum ex proident mollit nisi anim do pariatur aliquip exercitation. Aute fugiat aute dolor sunt consequat ea adipisicing proident eu et sit quis commodo ut. Mollit eu aute non fugiat excepteur Lorem eu sunt eiusmod ex. Magna Lorem pariatur enim excepteur tempor magna duis incididunt deserunt consequat occaecat. In sint ex quis et Lorem.\r\n",
    "registered": "2018-01-23T05:46:02 -01:00",
    "latitude": -38.773456,
    "longitude": 159.648834,
    "tags": [
      "adipisicing",
      "sint",
      "commodo",
      "est",
      "aute",
      "nostrud",
      "cupidatat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Maggie Calhoun"
      },
      {
        "id": 1,
        "name": "Wilkinson Fuentes"
      },
      {
        "id": 2,
        "name": "Davidson Douglas"
      }
    ],
    "greeting": "Hello, Huber Hopper! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca44b2782cb2b7e5224",
    "index": 45,
    "guid": "da91a89d-138c-4d13-8ace-731bb8e6e1eb",
    "isActive": true,
    "balance": "$1,425.54",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "brown",
    "name": "Winters Solomon",
    "gender": "male",
    "company": "ISOLOGIX",
    "email": "winterssolomon@isologix.com",
    "phone": "+1 (966) 541-3435",
    "address": "482 Montauk Avenue, Epworth, California, 1153",
    "about": "Culpa reprehenderit duis aute consectetur laborum consequat. In id eu qui laborum quis et culpa cupidatat labore minim exercitation Lorem exercitation. Pariatur pariatur elit adipisicing do tempor in culpa in.\r\n",
    "registered": "2017-03-26T01:39:18 -02:00",
    "latitude": 67.364468,
    "longitude": 70.793559,
    "tags": [
      "est",
      "Lorem",
      "est",
      "sit",
      "pariatur",
      "ad",
      "fugiat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Adams Gilbert"
      },
      {
        "id": 1,
        "name": "Anita Maxwell"
      },
      {
        "id": 2,
        "name": "Patrick Richardson"
      }
    ],
    "greeting": "Hello, Winters Solomon! You have 10 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca45c5e133ddce18ed3",
    "index": 46,
    "guid": "73317faa-6a3f-42d6-bdd2-96403c5380ea",
    "isActive": false,
    "balance": "$3,981.81",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "brown",
    "name": "Mia Kirkland",
    "gender": "female",
    "company": "CALLFLEX",
    "email": "miakirkland@callflex.com",
    "phone": "+1 (901) 510-2218",
    "address": "976 Caton Avenue, Cucumber, Alabama, 4915",
    "about": "Eu consectetur do ipsum reprehenderit ipsum. Incididunt ex tempor laborum est ex excepteur nisi amet exercitation veniam mollit aute. Commodo fugiat elit sunt id eiusmod ut. Culpa exercitation consectetur in tempor excepteur non laboris officia. Duis magna commodo magna ullamco fugiat enim minim nulla dolor do excepteur anim elit. Aliqua reprehenderit occaecat nostrud sit do laboris et velit qui cillum.\r\n",
    "registered": "2016-09-17T09:51:52 -02:00",
    "latitude": -79.50996,
    "longitude": -46.1616,
    "tags": [
      "ut",
      "labore",
      "dolor",
      "nisi",
      "elit",
      "mollit",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Alyson Best"
      },
      {
        "id": 1,
        "name": "Stokes Houston"
      },
      {
        "id": 2,
        "name": "Willie Bright"
      }
    ],
    "greeting": "Hello, Mia Kirkland! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4c9e20704126d4ce7",
    "index": 47,
    "guid": "2ecde606-d79f-4f55-aa23-36c5371cd955",
    "isActive": true,
    "balance": "$1,303.71",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "blue",
    "name": "House Rosa",
    "gender": "male",
    "company": "SULTRAXIN",
    "email": "houserosa@sultraxin.com",
    "phone": "+1 (960) 576-2874",
    "address": "184 Bridgewater Street, Crisman, Kentucky, 5868",
    "about": "Amet in do labore exercitation labore. Qui laboris incididunt id laboris aliqua dolor sint nostrud veniam magna dolore cupidatat. Duis fugiat dolor aliqua voluptate ullamco consequat anim anim et. Sint commodo laboris pariatur magna consequat adipisicing aliquip consectetur. Ex aliquip ullamco nisi consequat id cillum aliquip ea laboris. Nisi et enim magna nostrud laborum.\r\n",
    "registered": "2014-02-10T11:27:35 -01:00",
    "latitude": 55.836504,
    "longitude": -88.879286,
    "tags": [
      "veniam",
      "deserunt",
      "velit",
      "commodo",
      "cupidatat",
      "sint",
      "esse"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Christine Coffey"
      },
      {
        "id": 1,
        "name": "Bertie Sanchez"
      },
      {
        "id": 2,
        "name": "Rollins Stanley"
      }
    ],
    "greeting": "Hello, House Rosa! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4be4ea4205cb61d45",
    "index": 48,
    "guid": "7c4b3ef5-2336-4fa1-b0ed-b4d7db72bc65",
    "isActive": true,
    "balance": "$2,443.58",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "green",
    "name": "Reyes Payne",
    "gender": "male",
    "company": "VIAGRAND",
    "email": "reyespayne@viagrand.com",
    "phone": "+1 (968) 454-3612",
    "address": "257 Conover Street, Riviera, Louisiana, 6708",
    "about": "Et reprehenderit pariatur consequat ad minim est esse nulla dolore velit est sunt do. Anim do eiusmod aute duis do cillum do cupidatat veniam. Irure reprehenderit amet incididunt qui officia enim fugiat enim et incididunt officia et nulla ea.\r\n",
    "registered": "2017-12-20T10:02:46 -01:00",
    "latitude": -71.533152,
    "longitude": 118.464827,
    "tags": [
      "incididunt",
      "qui",
      "duis",
      "cillum",
      "dolor",
      "id",
      "minim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Moran Gillespie"
      },
      {
        "id": 1,
        "name": "Edwina Anthony"
      },
      {
        "id": 2,
        "name": "Joanne Logan"
      }
    ],
    "greeting": "Hello, Reyes Payne! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca460748c702b057436",
    "index": 49,
    "guid": "a04e9a2e-940b-4835-a788-09cd8658aeeb",
    "isActive": false,
    "balance": "$3,163.92",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "green",
    "name": "Tracie Frank",
    "gender": "female",
    "company": "CORPORANA",
    "email": "traciefrank@corporana.com",
    "phone": "+1 (912) 438-2809",
    "address": "359 Minna Street, Yogaville, Guam, 4250",
    "about": "Duis incididunt et amet laboris consectetur. Elit velit cillum et minim et ut ea. Ea officia cupidatat duis elit nisi aliqua commodo duis minim eiusmod esse in laboris. Officia pariatur Lorem eu eu pariatur consequat pariatur proident mollit non quis. Do eu qui cillum excepteur incididunt minim.\r\n",
    "registered": "2017-01-23T07:32:05 -01:00",
    "latitude": 72.359118,
    "longitude": -118.588454,
    "tags": [
      "et",
      "non",
      "proident",
      "aliquip",
      "incididunt",
      "qui",
      "mollit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Joyce Benjamin"
      },
      {
        "id": 1,
        "name": "Elsie Everett"
      },
      {
        "id": 2,
        "name": "Bernadine Burris"
      }
    ],
    "greeting": "Hello, Tracie Frank! You have 4 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca47c8783f4b70cd17b",
    "index": 50,
    "guid": "78da5cc9-cfaa-4eb1-b102-cdd76b717896",
    "isActive": true,
    "balance": "$3,165.25",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "blue",
    "name": "Stanton Bridges",
    "gender": "male",
    "company": "MEGALL",
    "email": "stantonbridges@megall.com",
    "phone": "+1 (830) 450-3315",
    "address": "711 Seigel Court, Konterra, South Dakota, 8581",
    "about": "Nostrud et culpa qui fugiat adipisicing. Nostrud est veniam duis cupidatat est sit irure id. Deserunt anim consequat cupidatat nulla deserunt ad Lorem fugiat non minim et. Aute anim ad incididunt culpa non.\r\n",
    "registered": "2016-05-05T06:08:24 -02:00",
    "latitude": -52.57927,
    "longitude": -70.077462,
    "tags": [
      "nulla",
      "tempor",
      "consequat",
      "amet",
      "sunt",
      "culpa",
      "minim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hawkins Carson"
      },
      {
        "id": 1,
        "name": "Giles Cruz"
      },
      {
        "id": 2,
        "name": "Vega Oneill"
      }
    ],
    "greeting": "Hello, Stanton Bridges! You have 1 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca427e67b725127bbff",
    "index": 51,
    "guid": "b215e079-e37b-4f2a-aa67-dcdf00f9a02f",
    "isActive": false,
    "balance": "$3,947.74",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "brown",
    "name": "Nina Barrera",
    "gender": "female",
    "company": "NORALEX",
    "email": "ninabarrera@noralex.com",
    "phone": "+1 (902) 523-3223",
    "address": "855 Argyle Road, Camino, Federated States Of Micronesia, 423",
    "about": "Consectetur nisi incididunt tempor occaecat magna fugiat irure fugiat dolor qui labore commodo. Commodo et qui et eu consequat. Nisi proident irure ea anim amet eiusmod adipisicing enim reprehenderit ullamco laborum velit.\r\n",
    "registered": "2017-08-16T01:00:33 -02:00",
    "latitude": -81.691414,
    "longitude": 133.425976,
    "tags": [
      "dolor",
      "occaecat",
      "ipsum",
      "eiusmod",
      "anim",
      "voluptate",
      "et"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Eleanor Cross"
      },
      {
        "id": 1,
        "name": "Rosales Matthews"
      },
      {
        "id": 2,
        "name": "Maryellen Kirby"
      }
    ],
    "greeting": "Hello, Nina Barrera! You have 2 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca412665fa6c4daa8b1",
    "index": 52,
    "guid": "4c9ffb48-f918-49df-a484-a3898b602172",
    "isActive": false,
    "balance": "$3,763.99",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "blue",
    "name": "Franklin Evans",
    "gender": "male",
    "company": "CORIANDER",
    "email": "franklinevans@coriander.com",
    "phone": "+1 (920) 584-2735",
    "address": "997 Nassau Street, Mulino, Mississippi, 2928",
    "about": "Consectetur et consectetur deserunt irure anim nisi est. Elit cupidatat aliquip duis id adipisicing cillum id proident amet ad est qui do cupidatat. Ea deserunt fugiat et consequat consectetur cupidatat occaecat sunt id minim duis. Nostrud sint aliquip laboris consequat in labore fugiat deserunt do ad Lorem minim. Eiusmod tempor esse eu tempor ea eiusmod aliqua mollit.\r\n",
    "registered": "2018-03-08T08:52:01 -01:00",
    "latitude": 48.09097,
    "longitude": 59.939163,
    "tags": [
      "in",
      "dolor",
      "tempor",
      "eiusmod",
      "aliqua",
      "sint",
      "sint"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mccormick Chaney"
      },
      {
        "id": 1,
        "name": "Kari Hunter"
      },
      {
        "id": 2,
        "name": "Tiffany Church"
      }
    ],
    "greeting": "Hello, Franklin Evans! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4fec0d831933dc6a8",
    "index": 53,
    "guid": "5d8cc5ec-f990-4b22-8e3b-717e4a073f4d",
    "isActive": false,
    "balance": "$1,083.08",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "blue",
    "name": "Young Avila",
    "gender": "male",
    "company": "QUADEEBO",
    "email": "youngavila@quadeebo.com",
    "phone": "+1 (965) 457-2824",
    "address": "637 Pierrepont Street, Aguila, Northern Mariana Islands, 2432",
    "about": "Ex elit occaecat enim enim ipsum adipisicing eu proident. Elit sint aute ullamco nostrud incididunt labore aliqua non cupidatat eiusmod. Aliquip nostrud nisi exercitation cillum anim magna adipisicing eiusmod ullamco incididunt. Dolore do ullamco incididunt enim. Eu voluptate mollit ipsum exercitation laboris id quis fugiat eiusmod sit. Officia nisi in occaecat excepteur.\r\n",
    "registered": "2017-09-25T04:02:32 -02:00",
    "latitude": -20.669749,
    "longitude": 119.77514,
    "tags": [
      "nostrud",
      "labore",
      "anim",
      "nostrud",
      "in",
      "do",
      "non"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Deanne Pearson"
      },
      {
        "id": 1,
        "name": "Maxine Alexander"
      },
      {
        "id": 2,
        "name": "Pansy Byrd"
      }
    ],
    "greeting": "Hello, Young Avila! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4ce88f65fc288d24c",
    "index": 54,
    "guid": "952a3d5a-e690-4272-adf2-25087af8c052",
    "isActive": true,
    "balance": "$2,258.48",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "brown",
    "name": "Silva Macdonald",
    "gender": "male",
    "company": "ZILLAR",
    "email": "silvamacdonald@zillar.com",
    "phone": "+1 (852) 420-3230",
    "address": "811 Winthrop Street, Innsbrook, Hawaii, 795",
    "about": "Minim enim ad id tempor minim ea pariatur. Cupidatat quis sint culpa proident laboris in. Voluptate non est nostrud irure et anim aliquip enim elit cupidatat minim irure. Ea pariatur exercitation cupidatat ad et veniam Lorem nisi amet aliquip culpa reprehenderit proident. Exercitation dolor esse tempor laboris nostrud fugiat proident cillum ad ut pariatur consequat nulla. Sit eiusmod cillum officia mollit voluptate reprehenderit. Deserunt est veniam do cillum est veniam do cillum excepteur in.\r\n",
    "registered": "2015-07-16T04:21:13 -02:00",
    "latitude": 78.355424,
    "longitude": 112.496447,
    "tags": [
      "cupidatat",
      "in",
      "ullamco",
      "culpa",
      "ea",
      "sit",
      "sint"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Espinoza Shepherd"
      },
      {
        "id": 1,
        "name": "Natasha Mckee"
      },
      {
        "id": 2,
        "name": "Hubbard Gutierrez"
      }
    ],
    "greeting": "Hello, Silva Macdonald! You have 9 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca479fc5797207f88a6",
    "index": 55,
    "guid": "a0ff3982-3582-4075-bd39-66a9e054c504",
    "isActive": true,
    "balance": "$2,658.29",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "blue",
    "name": "Griffith Britt",
    "gender": "male",
    "company": "SURELOGIC",
    "email": "griffithbritt@surelogic.com",
    "phone": "+1 (951) 541-2370",
    "address": "369 Mill Lane, Zeba, Puerto Rico, 6349",
    "about": "Aliqua amet cupidatat fugiat amet est nisi sint aliquip ea deserunt excepteur aliqua pariatur exercitation. Aliquip minim nostrud est duis reprehenderit dolor non ullamco nulla ex fugiat. Id deserunt ipsum sit sint magna nisi elit excepteur officia minim. Aute consectetur exercitation ad ex.\r\n",
    "registered": "2017-01-04T05:32:00 -01:00",
    "latitude": -19.611088,
    "longitude": 34.35741,
    "tags": [
      "ex",
      "ut",
      "commodo",
      "commodo",
      "amet",
      "ut",
      "aliquip"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mamie Atkins"
      },
      {
        "id": 1,
        "name": "Middleton Hoover"
      },
      {
        "id": 2,
        "name": "Parker Cochran"
      }
    ],
    "greeting": "Hello, Griffith Britt! You have 2 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca424793e6e5d13c027",
    "index": 56,
    "guid": "0c2e8c41-c267-4fff-8165-14810a2fd92b",
    "isActive": true,
    "balance": "$2,614.79",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "brown",
    "name": "Debra Gardner",
    "gender": "female",
    "company": "UNISURE",
    "email": "debragardner@unisure.com",
    "phone": "+1 (857) 541-2932",
    "address": "938 Llama Court, Lindcove, West Virginia, 7089",
    "about": "Consectetur quis ipsum ad consequat anim laboris fugiat. Cupidatat commodo duis qui minim ad amet sit ipsum aliqua ad exercitation tempor sit elit. Excepteur sit officia id reprehenderit anim aute incididunt eiusmod dolor.\r\n",
    "registered": "2018-02-08T12:00:52 -01:00",
    "latitude": 17.198023,
    "longitude": -132.973179,
    "tags": [
      "voluptate",
      "et",
      "sunt",
      "dolor",
      "incididunt",
      "incididunt",
      "est"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Kerry Mcpherson"
      },
      {
        "id": 1,
        "name": "Mccray Ewing"
      },
      {
        "id": 2,
        "name": "Mathews Hill"
      }
    ],
    "greeting": "Hello, Debra Gardner! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca43530d807b5a9cd7c",
    "index": 57,
    "guid": "ebc6bf80-a6e0-490c-8ec1-99efe61829ee",
    "isActive": true,
    "balance": "$2,256.49",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "blue",
    "name": "Anastasia Burns",
    "gender": "female",
    "company": "KONGLE",
    "email": "anastasiaburns@kongle.com",
    "phone": "+1 (950) 554-3247",
    "address": "828 Elliott Place, Woodlands, Missouri, 3455",
    "about": "Eiusmod sint velit ex magna eu mollit ullamco aliqua incididunt commodo velit culpa incididunt elit. Consequat id eu Lorem elit incididunt commodo cupidatat aliquip exercitation. Fugiat deserunt qui Lorem non cillum commodo ad ad excepteur veniam excepteur. Laboris commodo consectetur sit pariatur fugiat nisi proident ipsum in proident labore mollit culpa ut. Exercitation nisi laboris excepteur laboris mollit velit in veniam in. Sint duis in fugiat anim qui ad velit magna. Proident fugiat adipisicing amet nulla exercitation id nostrud nisi.\r\n",
    "registered": "2014-02-24T04:12:39 -01:00",
    "latitude": -5.487159,
    "longitude": -137.587209,
    "tags": [
      "voluptate",
      "mollit",
      "tempor",
      "ea",
      "minim",
      "consectetur",
      "sunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Viola Buck"
      },
      {
        "id": 1,
        "name": "Glenn Hayden"
      },
      {
        "id": 2,
        "name": "Webster Gonzales"
      }
    ],
    "greeting": "Hello, Anastasia Burns! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4afeb51867dddd040",
    "index": 58,
    "guid": "2074ea6f-1c5b-441e-8753-b5a0e4ea2f1a",
    "isActive": false,
    "balance": "$1,470.28",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "blue",
    "name": "Morse Nieves",
    "gender": "male",
    "company": "GORGANIC",
    "email": "morsenieves@gorganic.com",
    "phone": "+1 (931) 541-3442",
    "address": "583 Commerce Street, Machias, Colorado, 1412",
    "about": "Dolor reprehenderit consequat adipisicing laborum aliqua nisi. Nostrud qui sunt non labore sunt quis culpa ex dolor magna sint. Exercitation veniam exercitation esse consectetur Lorem amet enim sit excepteur magna consectetur. Incididunt consequat reprehenderit incididunt occaecat cupidatat occaecat pariatur labore. Nisi laborum adipisicing sit ut laboris. Irure aliqua fugiat esse amet sit ut dolore aliquip elit id laboris.\r\n",
    "registered": "2016-10-08T12:35:08 -02:00",
    "latitude": 72.530901,
    "longitude": 6.797184,
    "tags": [
      "est",
      "ea",
      "veniam",
      "sunt",
      "proident",
      "veniam",
      "commodo"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Victoria Thornton"
      },
      {
        "id": 1,
        "name": "Davis Wilkerson"
      },
      {
        "id": 2,
        "name": "Noble Allen"
      }
    ],
    "greeting": "Hello, Morse Nieves! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4b4cfaf9d4ee1e0ae",
    "index": 59,
    "guid": "135e3685-23f4-49a8-9ee8-e4da5917f82e",
    "isActive": true,
    "balance": "$2,708.22",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "blue",
    "name": "Coffey Case",
    "gender": "male",
    "company": "ESSENSIA",
    "email": "coffeycase@essensia.com",
    "phone": "+1 (950) 594-3606",
    "address": "997 Brightwater Court, Chalfant, Alaska, 8555",
    "about": "Et Lorem mollit aliquip velit consequat enim commodo do. Voluptate nulla adipisicing magna anim eiusmod aliqua deserunt consectetur quis velit exercitation. Laboris nostrud anim ipsum exercitation ad velit fugiat eu. Officia velit consectetur adipisicing duis cupidatat. Eiusmod sunt ea qui irure duis eiusmod dolore quis non culpa aute aute anim.\r\n",
    "registered": "2015-02-10T01:53:18 -01:00",
    "latitude": 31.090846,
    "longitude": -166.472563,
    "tags": [
      "incididunt",
      "sit",
      "commodo",
      "sunt",
      "anim",
      "enim",
      "esse"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Francis Norman"
      },
      {
        "id": 1,
        "name": "Hardy Barnett"
      },
      {
        "id": 2,
        "name": "Britt Bender"
      }
    ],
    "greeting": "Hello, Coffey Case! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4d5b3cc22c10befe1",
    "index": 60,
    "guid": "75e572d2-e41a-422c-8e22-5fd19456bc2e",
    "isActive": false,
    "balance": "$3,649.35",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "blue",
    "name": "Christian Noble",
    "gender": "male",
    "company": "EMOLTRA",
    "email": "christiannoble@emoltra.com",
    "phone": "+1 (873) 549-3981",
    "address": "306 Alton Place, Itmann, Utah, 7202",
    "about": "Aliquip est amet incididunt non adipisicing veniam qui. Sit officia eiusmod sit fugiat cupidatat ullamco aute veniam nisi irure. Laboris proident eiusmod dolore pariatur est sint nisi irure duis. Consectetur voluptate minim proident laborum et eu dolore id exercitation cupidatat qui. Occaecat irure id irure aliquip culpa sint quis ipsum. Lorem sint laborum elit labore.\r\n",
    "registered": "2016-09-12T08:43:14 -02:00",
    "latitude": 65.049215,
    "longitude": 101.813885,
    "tags": [
      "aliquip",
      "minim",
      "nostrud",
      "eu",
      "irure",
      "pariatur",
      "dolore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hattie Lindsay"
      },
      {
        "id": 1,
        "name": "Bowers York"
      },
      {
        "id": 2,
        "name": "Pauline Chang"
      }
    ],
    "greeting": "Hello, Christian Noble! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca40e7207f462beb428",
    "index": 61,
    "guid": "9e3432e6-50be-4533-a45b-5fece9a08d7c",
    "isActive": false,
    "balance": "$1,484.36",
    "picture": "http://placehold.it/32x32",
    "age": 24,
    "eyeColor": "green",
    "name": "Sofia Hinton",
    "gender": "female",
    "company": "HOMELUX",
    "email": "sofiahinton@homelux.com",
    "phone": "+1 (845) 587-3667",
    "address": "430 Cozine Avenue, Rivereno, Washington, 1584",
    "about": "Laborum velit qui ut deserunt. Proident commodo commodo id veniam cillum in tempor aliquip anim laborum. Excepteur reprehenderit quis nostrud officia voluptate eu sint eu velit excepteur veniam consectetur commodo. Eu nostrud Lorem ipsum adipisicing excepteur non adipisicing laborum ullamco nostrud. Quis laboris cillum reprehenderit culpa adipisicing quis labore sit tempor id. Ipsum do cillum duis minim mollit excepteur labore fugiat eu veniam enim.\r\n",
    "registered": "2016-07-23T09:15:08 -02:00",
    "latitude": -20.974367,
    "longitude": -49.181693,
    "tags": [
      "occaecat",
      "occaecat",
      "cillum",
      "elit",
      "sunt",
      "tempor",
      "aute"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Le Hartman"
      },
      {
        "id": 1,
        "name": "Patrice Mcknight"
      },
      {
        "id": 2,
        "name": "Lavonne Madden"
      }
    ],
    "greeting": "Hello, Sofia Hinton! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4aacff0922c85ef45",
    "index": 62,
    "guid": "7f7b27a8-5391-4be5-a359-e932f78566ba",
    "isActive": false,
    "balance": "$2,511.22",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "blue",
    "name": "Mccullough Potter",
    "gender": "male",
    "company": "BITREX",
    "email": "mcculloughpotter@bitrex.com",
    "phone": "+1 (809) 583-3895",
    "address": "669 Dare Court, Joes, Iowa, 253",
    "about": "Reprehenderit magna consequat consectetur minim do eu ad adipisicing id. Adipisicing mollit ut ea eu in labore velit do. Proident irure sunt aute voluptate laboris est cupidatat fugiat do elit. Culpa est exercitation veniam esse.\r\n",
    "registered": "2018-02-06T12:46:26 -01:00",
    "latitude": 12.326588,
    "longitude": 68.401606,
    "tags": [
      "nostrud",
      "ullamco",
      "commodo",
      "mollit",
      "esse",
      "culpa",
      "cillum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Verna Alvarado"
      },
      {
        "id": 1,
        "name": "Washington Schwartz"
      },
      {
        "id": 2,
        "name": "Cathleen Bray"
      }
    ],
    "greeting": "Hello, Mccullough Potter! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4359b73880fabc1f0",
    "index": 63,
    "guid": "96b3107b-5d7c-4c22-bc91-d036ccca6218",
    "isActive": true,
    "balance": "$1,163.76",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "blue",
    "name": "Miranda Webb",
    "gender": "male",
    "company": "OBLIQ",
    "email": "mirandawebb@obliq.com",
    "phone": "+1 (935) 416-3475",
    "address": "628 Blake Court, Baker, Kansas, 7675",
    "about": "Laboris veniam reprehenderit irure commodo amet laborum non dolor culpa culpa esse. Aliquip ipsum adipisicing do adipisicing. Est fugiat nisi aliquip consectetur enim in et sit aute mollit laboris in velit elit. Duis officia ex quis mollit duis mollit duis. Mollit fugiat commodo fugiat reprehenderit fugiat.\r\n",
    "registered": "2017-11-20T05:45:46 -01:00",
    "latitude": 3.001623,
    "longitude": -126.514069,
    "tags": [
      "reprehenderit",
      "nostrud",
      "irure",
      "cillum",
      "ea",
      "id",
      "exercitation"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Margo Combs"
      },
      {
        "id": 1,
        "name": "Strong Skinner"
      },
      {
        "id": 2,
        "name": "Billie Grant"
      }
    ],
    "greeting": "Hello, Miranda Webb! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca434d0e0f8d0868efc",
    "index": 64,
    "guid": "e4372f79-b765-4934-9835-49d50f5cec62",
    "isActive": true,
    "balance": "$1,798.84",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "brown",
    "name": "Blevins Rivas",
    "gender": "male",
    "company": "VIASIA",
    "email": "blevinsrivas@viasia.com",
    "phone": "+1 (983) 426-3705",
    "address": "335 Dobbin Street, Farmers, Texas, 4647",
    "about": "Velit est et do exercitation qui incididunt veniam aliqua. Aliqua commodo aute pariatur cillum nostrud nulla laborum irure consequat in aliqua. Deserunt aliquip reprehenderit do ullamco magna eu deserunt aliqua.\r\n",
    "registered": "2017-10-05T05:58:49 -02:00",
    "latitude": 86.87034,
    "longitude": -13.167169,
    "tags": [
      "incididunt",
      "incididunt",
      "sint",
      "in",
      "reprehenderit",
      "adipisicing",
      "velit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Elliott Campbell"
      },
      {
        "id": 1,
        "name": "Ashley Ryan"
      },
      {
        "id": 2,
        "name": "Beryl Frye"
      }
    ],
    "greeting": "Hello, Blevins Rivas! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca494fed5113a70c0fd",
    "index": 65,
    "guid": "235ec9d3-310c-4546-ae7d-09d8ec4ffe21",
    "isActive": true,
    "balance": "$2,592.96",
    "picture": "http://placehold.it/32x32",
    "age": 36,
    "eyeColor": "green",
    "name": "Meghan Parsons",
    "gender": "female",
    "company": "PYRAMIA",
    "email": "meghanparsons@pyramia.com",
    "phone": "+1 (937) 512-3937",
    "address": "286 Vista Place, Tibbie, Illinois, 2803",
    "about": "Do Lorem magna eu Lorem. Irure esse culpa laborum in proident commodo enim ullamco ea. Aliquip exercitation fugiat amet duis sint sit anim sunt qui qui nostrud duis. Ea ullamco Lorem nisi sunt nisi consequat pariatur officia. Exercitation duis elit nulla ex nostrud reprehenderit ullamco occaecat esse ullamco ad id. Nisi ad minim ipsum exercitation magna elit ullamco cupidatat duis. Sunt pariatur adipisicing ut incididunt nostrud exercitation laborum.\r\n",
    "registered": "2017-12-22T07:50:35 -01:00",
    "latitude": 30.196313,
    "longitude": 123.091461,
    "tags": [
      "irure",
      "enim",
      "sunt",
      "sit",
      "sunt",
      "quis",
      "cupidatat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Cook Willis"
      },
      {
        "id": 1,
        "name": "Golden Russell"
      },
      {
        "id": 2,
        "name": "Nicole Carver"
      }
    ],
    "greeting": "Hello, Meghan Parsons! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca41b447177ef195fd7",
    "index": 66,
    "guid": "7039fe49-f473-47a2-a83b-5f0f8a5d42fd",
    "isActive": false,
    "balance": "$3,784.01",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "blue",
    "name": "Rush Keith",
    "gender": "male",
    "company": "COMBOGEN",
    "email": "rushkeith@combogen.com",
    "phone": "+1 (891) 581-3958",
    "address": "463 Troy Avenue, Calvary, Virginia, 8748",
    "about": "Officia elit sint mollit ipsum tempor consequat qui amet nisi et exercitation dolore do. Veniam eu aliquip nostrud exercitation dolor mollit ex. Sint pariatur ipsum duis amet fugiat nulla aliquip labore ut cupidatat sunt. Nisi pariatur ad exercitation esse dolore dolore ullamco anim pariatur nisi eu voluptate. Et in occaecat ipsum ad commodo tempor occaecat Lorem ea. Ex aliquip enim enim eiusmod adipisicing id ea mollit do magna magna deserunt. Culpa proident magna amet laboris voluptate velit sint non eu.\r\n",
    "registered": "2016-10-07T09:51:50 -02:00",
    "latitude": 25.721964,
    "longitude": -100.068623,
    "tags": [
      "amet",
      "occaecat",
      "esse",
      "nisi",
      "est",
      "tempor",
      "labore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Fern Vance"
      },
      {
        "id": 1,
        "name": "Mckee Reeves"
      },
      {
        "id": 2,
        "name": "Flowers Trevino"
      }
    ],
    "greeting": "Hello, Rush Keith! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4163c383fca327ba5",
    "index": 67,
    "guid": "e354e629-8a37-4c7e-ab73-7df019f338c4",
    "isActive": true,
    "balance": "$3,959.76",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "green",
    "name": "Jocelyn Reynolds",
    "gender": "female",
    "company": "REPETWIRE",
    "email": "jocelynreynolds@repetwire.com",
    "phone": "+1 (902) 543-2357",
    "address": "793 Taylor Street, Wikieup, Maine, 9108",
    "about": "Veniam consectetur aliqua tempor do officia nisi. Sunt et ea officia in sint amet ullamco commodo consequat adipisicing ex enim aliquip Lorem. Ipsum nulla reprehenderit Lorem aliquip.\r\n",
    "registered": "2018-07-24T05:10:35 -02:00",
    "latitude": -4.392185,
    "longitude": -38.588353,
    "tags": [
      "dolore",
      "laborum",
      "cupidatat",
      "do",
      "ullamco",
      "dolore",
      "enim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Simon Hammond"
      },
      {
        "id": 1,
        "name": "Colette Wood"
      },
      {
        "id": 2,
        "name": "Park Russo"
      }
    ],
    "greeting": "Hello, Jocelyn Reynolds! You have 5 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca48e6a99afa53544a3",
    "index": 68,
    "guid": "3f324fb6-772e-4e0d-aed3-531d0aa92552",
    "isActive": true,
    "balance": "$1,096.77",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "blue",
    "name": "Mcmillan Mack",
    "gender": "male",
    "company": "KNOWLYSIS",
    "email": "mcmillanmack@knowlysis.com",
    "phone": "+1 (800) 497-2702",
    "address": "450 Kingsway Place, Whitewater, Oregon, 6642",
    "about": "Aliqua ex ut et consectetur cupidatat labore qui sit. Labore id id pariatur ea mollit. Nostrud culpa ad sunt ut irure non pariatur adipisicing. Sit sunt amet voluptate tempor non eu exercitation veniam est cupidatat consequat non in. Magna cupidatat aute labore officia quis ullamco amet est consequat aliqua. Fugiat qui duis irure ea eu amet sit officia commodo officia ipsum minim ipsum ea.\r\n",
    "registered": "2014-07-02T08:12:06 -02:00",
    "latitude": 2.865024,
    "longitude": 55.701875,
    "tags": [
      "ipsum",
      "dolor",
      "dolor",
      "laboris",
      "eiusmod",
      "nulla",
      "cupidatat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mcgowan Spence"
      },
      {
        "id": 1,
        "name": "Landry Talley"
      },
      {
        "id": 2,
        "name": "Rowe Colon"
      }
    ],
    "greeting": "Hello, Mcmillan Mack! You have 2 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4b2255432cd77b376",
    "index": 69,
    "guid": "8e8a592f-4c7d-4db1-bdd7-71b6471a5f58",
    "isActive": true,
    "balance": "$1,264.84",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "brown",
    "name": "Cleo Dickerson",
    "gender": "female",
    "company": "STROZEN",
    "email": "cleodickerson@strozen.com",
    "phone": "+1 (938) 567-3169",
    "address": "100 Emerald Street, Salvo, New Jersey, 4012",
    "about": "Minim minim magna reprehenderit ut esse pariatur id excepteur dolore et veniam deserunt id. Anim consequat ad nostrud ea non deserunt elit. Reprehenderit elit ut adipisicing incididunt anim sunt amet culpa Lorem laboris velit. Voluptate sit aliquip nulla occaecat do officia eiusmod dolor deserunt aliquip anim pariatur voluptate.\r\n",
    "registered": "2018-10-28T02:35:37 -01:00",
    "latitude": 69.142459,
    "longitude": -31.846806,
    "tags": [
      "exercitation",
      "irure",
      "reprehenderit",
      "dolore",
      "ut",
      "pariatur",
      "culpa"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Arline Parrish"
      },
      {
        "id": 1,
        "name": "Combs Harper"
      },
      {
        "id": 2,
        "name": "Dona Mckinney"
      }
    ],
    "greeting": "Hello, Cleo Dickerson! You have 2 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca44f3596725393bd3e",
    "index": 70,
    "guid": "3968fcda-39ba-4f3d-b8ad-4d5e4edcbe56",
    "isActive": false,
    "balance": "$3,738.47",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "blue",
    "name": "Delores Clayton",
    "gender": "female",
    "company": "KONNECT",
    "email": "deloresclayton@konnect.com",
    "phone": "+1 (917) 495-2560",
    "address": "261 Stillwell Place, Deercroft, Michigan, 9935",
    "about": "Enim consequat elit voluptate cupidatat minim laborum deserunt enim ad aute. Exercitation deserunt occaecat do amet aute irure officia non eu deserunt dolor nostrud consequat. Ex laboris veniam eiusmod exercitation est laborum cupidatat excepteur adipisicing quis incididunt laborum sunt consequat.\r\n",
    "registered": "2018-05-05T01:33:03 -02:00",
    "latitude": 40.808952,
    "longitude": 179.278547,
    "tags": [
      "ea",
      "do",
      "do",
      "culpa",
      "sunt",
      "enim",
      "ex"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Bennett Cooper"
      },
      {
        "id": 1,
        "name": "Helga Blevins"
      },
      {
        "id": 2,
        "name": "Roth Phelps"
      }
    ],
    "greeting": "Hello, Delores Clayton! You have 1 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca424892a6178731a65",
    "index": 71,
    "guid": "874b81d5-e8ed-4ab9-9892-14ec24e7096d",
    "isActive": true,
    "balance": "$1,914.11",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "brown",
    "name": "Belinda Mcdowell",
    "gender": "female",
    "company": "IMAGINART",
    "email": "belindamcdowell@imaginart.com",
    "phone": "+1 (880) 551-2118",
    "address": "689 Lloyd Court, Shindler, District Of Columbia, 7694",
    "about": "Culpa laboris tempor duis occaecat qui. Nulla id cupidatat consectetur qui non cupidatat laborum velit commodo. Ad consequat laborum aute proident exercitation anim enim ipsum ullamco veniam cupidatat duis ad.\r\n",
    "registered": "2014-03-28T10:16:08 -01:00",
    "latitude": 88.931417,
    "longitude": -108.893701,
    "tags": [
      "tempor",
      "deserunt",
      "deserunt",
      "deserunt",
      "nostrud",
      "do",
      "aliqua"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Caroline Reilly"
      },
      {
        "id": 1,
        "name": "Gladys Alston"
      },
      {
        "id": 2,
        "name": "Gloria Mckay"
      }
    ],
    "greeting": "Hello, Belinda Mcdowell! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca412438b87130b35fb",
    "index": 72,
    "guid": "dcaae363-cce9-4a6d-98a4-b2bdafbc8261",
    "isActive": true,
    "balance": "$2,591.55",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "green",
    "name": "Jeannette Valencia",
    "gender": "female",
    "company": "COMTEXT",
    "email": "jeannettevalencia@comtext.com",
    "phone": "+1 (811) 495-2725",
    "address": "943 Dekalb Avenue, Dupuyer, Indiana, 4965",
    "about": "Est culpa aliquip non culpa proident anim in minim. Labore nisi adipisicing enim qui sint magna quis reprehenderit dolor velit. Aliqua voluptate velit cillum minim et amet ullamco do esse nisi culpa non enim minim. Voluptate minim consequat commodo amet ex Lorem veniam deserunt exercitation sunt quis ullamco dolor. Et anim esse aliquip esse cillum. Officia incididunt et fugiat tempor esse nisi est laborum.\r\n",
    "registered": "2014-10-07T02:31:45 -02:00",
    "latitude": -80.166926,
    "longitude": -84.217259,
    "tags": [
      "eiusmod",
      "officia",
      "sint",
      "dolore",
      "velit",
      "minim",
      "et"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Lorena Vaughan"
      },
      {
        "id": 1,
        "name": "Penelope Merritt"
      },
      {
        "id": 2,
        "name": "Tanya Preston"
      }
    ],
    "greeting": "Hello, Jeannette Valencia! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca44fe26e90d98eda9c",
    "index": 73,
    "guid": "ae994f1e-c524-4a77-b17e-88f5da256db3",
    "isActive": true,
    "balance": "$3,035.78",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "brown",
    "name": "Barbara Richmond",
    "gender": "female",
    "company": "LETPRO",
    "email": "barbararichmond@letpro.com",
    "phone": "+1 (960) 475-3307",
    "address": "108 Ebony Court, Sunriver, Marshall Islands, 5750",
    "about": "Nisi et fugiat ipsum voluptate do. Aliqua aute non est dolore elit fugiat reprehenderit aliqua. Et dolore ad sit nostrud cillum nisi ut veniam non. Ex velit enim labore occaecat esse dolore in proident sunt adipisicing ut ipsum duis voluptate.\r\n",
    "registered": "2015-11-24T04:04:53 -01:00",
    "latitude": -63.60618,
    "longitude": 172.083165,
    "tags": [
      "aute",
      "duis",
      "officia",
      "duis",
      "ea",
      "culpa",
      "et"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Alyce Moon"
      },
      {
        "id": 1,
        "name": "Dorothea Santana"
      },
      {
        "id": 2,
        "name": "Mcfadden Robles"
      }
    ],
    "greeting": "Hello, Barbara Richmond! You have 5 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca40ee1803b3fcd6e02",
    "index": 74,
    "guid": "594c17f0-f0af-4a28-b363-009e8cbe9ef4",
    "isActive": false,
    "balance": "$3,336.70",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "green",
    "name": "Campos Marquez",
    "gender": "male",
    "company": "ISBOL",
    "email": "camposmarquez@isbol.com",
    "phone": "+1 (831) 583-2469",
    "address": "966 Lawrence Street, Needmore, Arizona, 6483",
    "about": "Dolore officia aliqua occaecat proident pariatur magna nisi proident consequat incididunt sint. Ipsum esse commodo anim cillum non quis culpa nulla duis mollit sint eu. Deserunt amet aute dolore esse amet commodo laboris magna et reprehenderit laboris enim amet anim.\r\n",
    "registered": "2016-09-19T12:45:05 -02:00",
    "latitude": 73.762414,
    "longitude": 133.396404,
    "tags": [
      "sint",
      "labore",
      "ut",
      "Lorem",
      "non",
      "labore",
      "culpa"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Bernadette Olson"
      },
      {
        "id": 1,
        "name": "Melendez Howe"
      },
      {
        "id": 2,
        "name": "Jana Campos"
      }
    ],
    "greeting": "Hello, Campos Marquez! You have 9 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca48dc4d6061fe6b802",
    "index": 75,
    "guid": "1ed0ccbf-d204-45bd-bce5-990e2134ec8d",
    "isActive": false,
    "balance": "$2,445.65",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "green",
    "name": "Shari Hall",
    "gender": "female",
    "company": "DOGNOSIS",
    "email": "sharihall@dognosis.com",
    "phone": "+1 (962) 500-2362",
    "address": "523 Graham Avenue, Topaz, Ohio, 6937",
    "about": "Velit excepteur nostrud non aliqua ea fugiat do non. Aliquip incididunt voluptate deserunt velit. Irure Lorem dolore commodo commodo. Laborum dolore fugiat laboris pariatur occaecat dolore ullamco ullamco magna amet. Et deserunt adipisicing Lorem deserunt ullamco esse sint velit eu aute incididunt in. Anim ex nulla fugiat in culpa aliqua.\r\n",
    "registered": "2018-10-17T08:46:09 -02:00",
    "latitude": 0.346145,
    "longitude": 7.604727,
    "tags": [
      "voluptate",
      "ut",
      "incididunt",
      "ut",
      "culpa",
      "ex",
      "laboris"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Jenny Stone"
      },
      {
        "id": 1,
        "name": "Shawn Mcgee"
      },
      {
        "id": 2,
        "name": "Angelica Avery"
      }
    ],
    "greeting": "Hello, Shari Hall! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4ef3967e9b9ba2243",
    "index": 76,
    "guid": "1ea73712-242e-48cc-892c-37515e5c93bf",
    "isActive": false,
    "balance": "$3,120.52",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "brown",
    "name": "Guadalupe Pope",
    "gender": "female",
    "company": "SCENTY",
    "email": "guadalupepope@scenty.com",
    "phone": "+1 (949) 421-2848",
    "address": "436 Lewis Place, Ironton, Virgin Islands, 2841",
    "about": "Anim officia consectetur amet proident exercitation excepteur. Magna dolor ea nulla duis amet. Ut duis incididunt consectetur et Lorem quis velit nisi ipsum Lorem mollit ad sunt. Aliquip cupidatat incididunt reprehenderit commodo reprehenderit adipisicing officia reprehenderit ullamco reprehenderit deserunt.\r\n",
    "registered": "2015-12-22T08:00:50 -01:00",
    "latitude": 43.234074,
    "longitude": -47.457031,
    "tags": [
      "ipsum",
      "consequat",
      "minim",
      "consectetur",
      "consequat",
      "fugiat",
      "consectetur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Joan Bowen"
      },
      {
        "id": 1,
        "name": "Higgins Mcclain"
      },
      {
        "id": 2,
        "name": "Gay Nichols"
      }
    ],
    "greeting": "Hello, Guadalupe Pope! You have 10 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca48a8d6182a022f3bd",
    "index": 77,
    "guid": "f88c37a4-f6e3-4c06-baf7-e4d13cc2e1b9",
    "isActive": true,
    "balance": "$1,289.76",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "brown",
    "name": "Serrano Maddox",
    "gender": "male",
    "company": "PERKLE",
    "email": "serranomaddox@perkle.com",
    "phone": "+1 (977) 414-2655",
    "address": "636 Bayard Street, Hatteras, New Mexico, 7855",
    "about": "Mollit voluptate laborum cillum deserunt et nostrud irure ullamco qui magna qui ad fugiat. Qui ullamco quis Lorem incididunt commodo ut esse occaecat pariatur ea nostrud sunt velit ad. Sunt sint anim ad in id non nisi eu quis sit do veniam cupidatat culpa. Est eu laboris mollit pariatur occaecat ipsum nisi consectetur.\r\n",
    "registered": "2018-01-30T03:24:22 -01:00",
    "latitude": 89.092208,
    "longitude": 160.523181,
    "tags": [
      "enim",
      "culpa",
      "laborum",
      "eiusmod",
      "aute",
      "amet",
      "est"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Lara Curry"
      },
      {
        "id": 1,
        "name": "Gomez Molina"
      },
      {
        "id": 2,
        "name": "Reynolds Day"
      }
    ],
    "greeting": "Hello, Serrano Maddox! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca451f61b4ade2330d0",
    "index": 78,
    "guid": "b6e2ec1b-0c41-4904-919b-bda5e73009a4",
    "isActive": false,
    "balance": "$2,471.98",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "green",
    "name": "Alford Waller",
    "gender": "male",
    "company": "ZANILLA",
    "email": "alfordwaller@zanilla.com",
    "phone": "+1 (873) 442-2331",
    "address": "405 Hillel Place, Delwood, Vermont, 1293",
    "about": "Qui irure magna laborum minim mollit mollit excepteur amet labore reprehenderit voluptate enim aliquip. Irure velit velit ipsum in esse ipsum elit aliquip exercitation nostrud velit ea labore. Labore mollit qui in duis consectetur veniam ex eiusmod ad aute veniam nisi aliqua.\r\n",
    "registered": "2015-12-01T02:21:49 -01:00",
    "latitude": 50.020786,
    "longitude": -63.531364,
    "tags": [
      "irure",
      "velit",
      "proident",
      "laboris",
      "cupidatat",
      "ad",
      "excepteur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Paula Cannon"
      },
      {
        "id": 1,
        "name": "Carrie Barton"
      },
      {
        "id": 2,
        "name": "Freida Mueller"
      }
    ],
    "greeting": "Hello, Alford Waller! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4b6fac252c8a41edb",
    "index": 79,
    "guid": "a5267622-4286-4b8f-9d10-812b9c0a9668",
    "isActive": true,
    "balance": "$1,855.46",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "green",
    "name": "Araceli Mccullough",
    "gender": "female",
    "company": "MOMENTIA",
    "email": "aracelimccullough@momentia.com",
    "phone": "+1 (882) 546-2290",
    "address": "779 Durland Place, Oneida, New Hampshire, 9586",
    "about": "Irure non exercitation non commodo aliqua aliquip tempor magna est elit laboris dolore. Aute elit tempor eu amet do anim. Esse minim qui non culpa labore consequat amet sunt. Veniam esse non veniam elit quis esse qui quis ut nulla in reprehenderit ullamco. Nisi non veniam ut labore et consequat nostrud aliquip excepteur.\r\n",
    "registered": "2014-09-03T03:51:29 -02:00",
    "latitude": -4.271391,
    "longitude": 42.816453,
    "tags": [
      "pariatur",
      "ipsum",
      "sunt",
      "id",
      "eiusmod",
      "quis",
      "adipisicing"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Brooks Silva"
      },
      {
        "id": 1,
        "name": "Tanner Pollard"
      },
      {
        "id": 2,
        "name": "Genevieve Delacruz"
      }
    ],
    "greeting": "Hello, Araceli Mccullough! You have 1 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4191df23935d386c5",
    "index": 80,
    "guid": "4c2235f1-e986-42d1-b0d3-6104edec483b",
    "isActive": true,
    "balance": "$1,375.62",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "blue",
    "name": "Bridgette Salas",
    "gender": "female",
    "company": "DIGIGENE",
    "email": "bridgettesalas@digigene.com",
    "phone": "+1 (841) 426-2963",
    "address": "936 Sackman Street, Kilbourne, Tennessee, 6959",
    "about": "Sunt enim aliquip id sit do cillum. Consequat exercitation in commodo velit excepteur et occaecat exercitation Lorem in. Esse nostrud aliquip occaecat ex elit dolor aliqua Lorem voluptate.\r\n",
    "registered": "2014-05-07T04:10:38 -02:00",
    "latitude": 17.495352,
    "longitude": -179.814671,
    "tags": [
      "ex",
      "sint",
      "excepteur",
      "commodo",
      "qui",
      "anim",
      "anim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Spencer Mcmillan"
      },
      {
        "id": 1,
        "name": "Wallace Bullock"
      },
      {
        "id": 2,
        "name": "Carver Berg"
      }
    ],
    "greeting": "Hello, Bridgette Salas! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca46811af80fdaec8bc",
    "index": 81,
    "guid": "d0acba11-54e0-43ea-9388-e03e26f0af03",
    "isActive": false,
    "balance": "$3,432.31",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "green",
    "name": "Murphy Delgado",
    "gender": "male",
    "company": "APEX",
    "email": "murphydelgado@apex.com",
    "phone": "+1 (838) 422-2737",
    "address": "360 Doscher Street, Grahamtown, Massachusetts, 8676",
    "about": "Ipsum Lorem minim cupidatat enim elit exercitation sint ad irure pariatur. Reprehenderit nostrud eiusmod consequat elit magna. Laborum sint elit sunt anim duis consectetur ex irure enim ea elit id. Labore mollit quis officia esse aute ad ipsum velit deserunt nostrud laborum et enim anim. Nostrud excepteur Lorem est id occaecat in cillum consequat. Incididunt dolor esse amet elit occaecat incididunt velit pariatur consectetur amet irure sunt incididunt voluptate.\r\n",
    "registered": "2018-06-10T04:24:36 -02:00",
    "latitude": -35.455867,
    "longitude": -152.789021,
    "tags": [
      "adipisicing",
      "ex",
      "tempor",
      "enim",
      "voluptate",
      "consectetur",
      "ipsum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Ray Ochoa"
      },
      {
        "id": 1,
        "name": "Christian Beck"
      },
      {
        "id": 2,
        "name": "Rose Acevedo"
      }
    ],
    "greeting": "Hello, Murphy Delgado! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4e39bc44adc9ce401",
    "index": 82,
    "guid": "d5d6a97c-7d4a-4c99-9cf7-dc73d1924638",
    "isActive": false,
    "balance": "$1,661.84",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "blue",
    "name": "Olga Hewitt",
    "gender": "female",
    "company": "BOILCAT",
    "email": "olgahewitt@boilcat.com",
    "phone": "+1 (945) 593-2485",
    "address": "377 Seacoast Terrace, Rehrersburg, Pennsylvania, 7194",
    "about": "Lorem mollit in consequat incididunt est. Amet enim est proident veniam aliqua non nulla id duis amet ea elit proident irure. Cupidatat incididunt aute sunt irure.\r\n",
    "registered": "2015-12-18T05:40:00 -01:00",
    "latitude": 29.732734,
    "longitude": -60.322878,
    "tags": [
      "amet",
      "est",
      "id",
      "mollit",
      "et",
      "minim",
      "elit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Harrington Cohen"
      },
      {
        "id": 1,
        "name": "Maureen Gallegos"
      },
      {
        "id": 2,
        "name": "Deborah Rollins"
      }
    ],
    "greeting": "Hello, Olga Hewitt! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca48df89149d3a82f74",
    "index": 83,
    "guid": "4be8304a-8f45-4270-b2a1-7f4d7e06f0ed",
    "isActive": true,
    "balance": "$3,523.85",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "brown",
    "name": "Noel Stark",
    "gender": "male",
    "company": "MANGLO",
    "email": "noelstark@manglo.com",
    "phone": "+1 (852) 541-3345",
    "address": "829 Whitney Avenue, Bellfountain, Wyoming, 6400",
    "about": "In ipsum non officia fugiat irure culpa. Deserunt magna tempor sunt labore et deserunt et reprehenderit elit non. Cupidatat amet exercitation laboris excepteur tempor qui nulla irure eu non anim.\r\n",
    "registered": "2016-11-20T06:43:32 -01:00",
    "latitude": -89.562555,
    "longitude": 84.199593,
    "tags": [
      "ea",
      "irure",
      "consectetur",
      "id",
      "Lorem",
      "dolor",
      "veniam"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Lillie Allison"
      },
      {
        "id": 1,
        "name": "Burt Espinoza"
      },
      {
        "id": 2,
        "name": "Christie Hale"
      }
    ],
    "greeting": "Hello, Noel Stark! You have 5 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca497a61ea96b769c71",
    "index": 84,
    "guid": "4d47262d-8a21-4780-94cd-f3e163abfaeb",
    "isActive": true,
    "balance": "$2,877.77",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "blue",
    "name": "Ortiz Swanson",
    "gender": "male",
    "company": "ZENTIA",
    "email": "ortizswanson@zentia.com",
    "phone": "+1 (828) 463-2046",
    "address": "406 Rutherford Place, Southview, Palau, 433",
    "about": "Amet qui esse voluptate fugiat laboris officia officia anim eu commodo veniam ex dolor dolor. Minim tempor magna veniam exercitation ullamco ipsum aliqua aliquip magna. Dolore et nostrud veniam nisi ut dolore ipsum ex magna amet.\r\n",
    "registered": "2014-09-25T01:00:49 -02:00",
    "latitude": -0.542618,
    "longitude": 67.788247,
    "tags": [
      "sunt",
      "elit",
      "nulla",
      "quis",
      "occaecat",
      "sint",
      "cillum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Marissa Wagner"
      },
      {
        "id": 1,
        "name": "Sosa Hardy"
      },
      {
        "id": 2,
        "name": "Geneva Turner"
      }
    ],
    "greeting": "Hello, Ortiz Swanson! You have 4 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca465dcd19d942b5714",
    "index": 85,
    "guid": "fb38b831-9ae1-49ed-aea1-92702f0060c6",
    "isActive": false,
    "balance": "$2,408.24",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "green",
    "name": "Cathy Valenzuela",
    "gender": "female",
    "company": "CORECOM",
    "email": "cathyvalenzuela@corecom.com",
    "phone": "+1 (867) 594-3185",
    "address": "153 Voorhies Avenue, Marbury, American Samoa, 3439",
    "about": "Nisi adipisicing labore aute nisi. Aute laborum minim sunt occaecat tempor irure aliquip velit anim sunt. Amet occaecat do cupidatat incididunt sit et id cillum sunt laboris deserunt.\r\n",
    "registered": "2018-06-03T01:20:34 -02:00",
    "latitude": -76.277619,
    "longitude": 54.930971,
    "tags": [
      "proident",
      "duis",
      "nostrud",
      "elit",
      "pariatur",
      "amet",
      "proident"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mona Wade"
      },
      {
        "id": 1,
        "name": "Rosa Ayala"
      },
      {
        "id": 2,
        "name": "Cabrera Roy"
      }
    ],
    "greeting": "Hello, Cathy Valenzuela! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca45d238fb9bad612f0",
    "index": 86,
    "guid": "ad492d87-cb79-4aad-9900-43d6531fe105",
    "isActive": false,
    "balance": "$2,357.58",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "blue",
    "name": "Livingston Moses",
    "gender": "male",
    "company": "SLOFAST",
    "email": "livingstonmoses@slofast.com",
    "phone": "+1 (837) 403-3842",
    "address": "558 Bowery Street, Coloma, Rhode Island, 5568",
    "about": "In quis ad nostrud ullamco. Non proident eu cillum magna incididunt tempor pariatur quis labore. Consectetur laborum cillum mollit culpa in est nulla laboris consequat nulla fugiat do incididunt. Sint ea consequat laborum id laborum quis mollit aliquip nostrud.\r\n",
    "registered": "2017-01-21T10:38:30 -01:00",
    "latitude": 47.021311,
    "longitude": 93.601901,
    "tags": [
      "pariatur",
      "fugiat",
      "culpa",
      "proident",
      "ea",
      "enim",
      "voluptate"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Clayton Hancock"
      },
      {
        "id": 1,
        "name": "Sylvia Dunn"
      },
      {
        "id": 2,
        "name": "Sullivan Walls"
      }
    ],
    "greeting": "Hello, Livingston Moses! You have 4 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4aa60f69d7dbb4c4b",
    "index": 87,
    "guid": "bf43df80-4ef6-4d3c-a23a-f8aeca841122",
    "isActive": true,
    "balance": "$2,879.41",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "green",
    "name": "Sheppard Holder",
    "gender": "male",
    "company": "HAWKSTER",
    "email": "sheppardholder@hawkster.com",
    "phone": "+1 (892) 548-3809",
    "address": "991 Hoyt Street, Worcester, Montana, 1336",
    "about": "Nostrud Lorem elit ex id in mollit eiusmod nostrud. Aute laborum sit minim aliqua reprehenderit. Ut fugiat voluptate velit officia esse est aliqua minim cillum do laborum. Ut reprehenderit qui ipsum pariatur voluptate duis irure anim excepteur officia eiusmod magna. Aliqua sit id cillum velit consequat commodo aliqua veniam consequat consequat. Exercitation magna sit nulla aute ex enim excepteur ut mollit irure Lorem laboris labore pariatur. Laboris est sit Lorem exercitation excepteur magna mollit consequat Lorem amet irure id anim et.\r\n",
    "registered": "2016-02-07T11:02:59 -01:00",
    "latitude": -21.970258,
    "longitude": 172.565353,
    "tags": [
      "reprehenderit",
      "labore",
      "pariatur",
      "do",
      "sunt",
      "reprehenderit",
      "quis"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Barry Mitchell"
      },
      {
        "id": 1,
        "name": "Shelton Arnold"
      },
      {
        "id": 2,
        "name": "Kramer Dillard"
      }
    ],
    "greeting": "Hello, Sheppard Holder! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4df02d6dc84cbdfd6",
    "index": 88,
    "guid": "52442a89-2700-4088-bb7d-203c6a9e0d72",
    "isActive": false,
    "balance": "$3,877.19",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "brown",
    "name": "Katheryn Bryan",
    "gender": "female",
    "company": "ENDICIL",
    "email": "katherynbryan@endicil.com",
    "phone": "+1 (939) 565-2387",
    "address": "347 Balfour Place, Bodega, Connecticut, 4412",
    "about": "Ea do in deserunt deserunt do tempor aliqua nulla culpa occaecat labore fugiat proident. Aliqua nisi culpa cupidatat labore sit laborum. Id ut incididunt Lorem magna id eiusmod eu in. Ipsum commodo aliquip cupidatat pariatur elit. Eu cupidatat nisi fugiat amet tempor Lorem cillum duis sit labore non consectetur.\r\n",
    "registered": "2014-02-14T09:11:34 -01:00",
    "latitude": -85.094308,
    "longitude": 64.966849,
    "tags": [
      "enim",
      "et",
      "minim",
      "ipsum",
      "pariatur",
      "enim",
      "culpa"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Whitaker Wyatt"
      },
      {
        "id": 1,
        "name": "Erna Wooten"
      },
      {
        "id": 2,
        "name": "Kaufman Hanson"
      }
    ],
    "greeting": "Hello, Katheryn Bryan! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca453ad1739218259a3",
    "index": 89,
    "guid": "f57b3804-7802-4a40-8672-577420fcfbe2",
    "isActive": false,
    "balance": "$1,583.98",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "brown",
    "name": "Tyson Robbins",
    "gender": "male",
    "company": "ENAUT",
    "email": "tysonrobbins@enaut.com",
    "phone": "+1 (810) 539-3288",
    "address": "931 Cheever Place, Bainbridge, Minnesota, 4841",
    "about": "Reprehenderit et minim voluptate officia aute ad tempor pariatur. In dolore mollit duis laborum culpa sint sint duis reprehenderit est est. Pariatur cupidatat reprehenderit aute officia exercitation. Qui sint fugiat officia amet nulla Lorem proident nostrud labore dolor ipsum. Sit ullamco deserunt ut aliqua duis ex est nisi laborum irure.\r\n",
    "registered": "2018-02-22T08:52:05 -01:00",
    "latitude": 64.9314,
    "longitude": 10.894724,
    "tags": [
      "consectetur",
      "laboris",
      "nisi",
      "dolor",
      "in",
      "enim",
      "ex"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Tisha Garcia"
      },
      {
        "id": 1,
        "name": "Gena Schneider"
      },
      {
        "id": 2,
        "name": "Ericka Pittman"
      }
    ],
    "greeting": "Hello, Tyson Robbins! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4a1f8960d8cf1c0fc",
    "index": 90,
    "guid": "ac7f3811-c7f0-43b6-9958-5473b5dae7e6",
    "isActive": false,
    "balance": "$3,005.15",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "green",
    "name": "Hannah Spears",
    "gender": "female",
    "company": "PIVITOL",
    "email": "hannahspears@pivitol.com",
    "phone": "+1 (859) 520-2297",
    "address": "334 Rodney Street, Yettem, North Dakota, 3881",
    "about": "Exercitation eiusmod duis id do incididunt cupidatat sit dolor ullamco incididunt est tempor. Irure mollit culpa veniam deserunt dolore aute et sit nulla. Amet consequat do do tempor fugiat irure ad dolore qui. Laboris elit nisi ullamco ut cillum ea voluptate. Sunt in aliqua est et in aliqua. Quis minim non elit non eu dolor cupidatat.\r\n",
    "registered": "2017-12-24T01:14:16 -01:00",
    "latitude": 46.901496,
    "longitude": 42.622096,
    "tags": [
      "esse",
      "non",
      "nisi",
      "ullamco",
      "enim",
      "laborum",
      "fugiat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Cameron Rasmussen"
      },
      {
        "id": 1,
        "name": "Charmaine Jefferson"
      },
      {
        "id": 2,
        "name": "Marisa Santiago"
      }
    ],
    "greeting": "Hello, Hannah Spears! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca455bc78b4c89f0b23",
    "index": 91,
    "guid": "bee9977a-79ce-4188-b200-c089aef6c220",
    "isActive": true,
    "balance": "$1,506.68",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "brown",
    "name": "Jefferson Le",
    "gender": "male",
    "company": "EQUITOX",
    "email": "jeffersonle@equitox.com",
    "phone": "+1 (876) 506-2753",
    "address": "802 Hudson Avenue, Navarre, Idaho, 3288",
    "about": "Nulla sunt ut labore laboris occaecat ea duis ea do excepteur reprehenderit dolor tempor dolore. Lorem culpa excepteur ex laboris cillum eu. Proident laborum proident aute consequat sint amet amet laboris anim aliqua laboris consequat in. Laborum occaecat exercitation commodo do excepteur. Aliqua laboris id dolor labore aliquip excepteur anim proident. Deserunt id consequat magna ad est amet ex aute reprehenderit duis. Amet magna eiusmod adipisicing laborum excepteur cillum elit cupidatat.\r\n",
    "registered": "2016-05-12T10:26:48 -02:00",
    "latitude": -44.271899,
    "longitude": -77.603068,
    "tags": [
      "fugiat",
      "quis",
      "nisi",
      "sunt",
      "anim",
      "esse",
      "cupidatat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Diaz Carey"
      },
      {
        "id": 1,
        "name": "Patsy Bean"
      },
      {
        "id": 2,
        "name": "Carolyn Little"
      }
    ],
    "greeting": "Hello, Jefferson Le! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4213f24f3c4aa51b3",
    "index": 92,
    "guid": "6cabe682-98dc-4313-9619-9f9032e220c5",
    "isActive": false,
    "balance": "$3,942.01",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "brown",
    "name": "Tommie Whitaker",
    "gender": "female",
    "company": "GEOSTELE",
    "email": "tommiewhitaker@geostele.com",
    "phone": "+1 (883) 440-3029",
    "address": "336 Hemlock Street, Bonanza, Nevada, 1326",
    "about": "Excepteur irure quis laboris aliquip irure. Fugiat aliquip elit quis et est exercitation nulla in laborum incididunt pariatur laborum. Voluptate adipisicing occaecat eu ex ipsum minim ipsum qui veniam cupidatat deserunt minim ex fugiat. Commodo culpa duis pariatur eu labore fugiat non laborum nulla fugiat id laboris aliqua eu.\r\n",
    "registered": "2016-08-18T03:36:08 -02:00",
    "latitude": 75.315985,
    "longitude": -175.514248,
    "tags": [
      "ut",
      "ut",
      "quis",
      "ullamco",
      "laboris",
      "deserunt",
      "culpa"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Finley Watkins"
      },
      {
        "id": 1,
        "name": "Mara Duncan"
      },
      {
        "id": 2,
        "name": "Cassie Robertson"
      }
    ],
    "greeting": "Hello, Tommie Whitaker! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca44ac2ae746d9cb9f8",
    "index": 93,
    "guid": "93328d8b-1a3e-4347-ac6b-1cc850b7bc56",
    "isActive": false,
    "balance": "$2,987.51",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "blue",
    "name": "Louise Hayes",
    "gender": "female",
    "company": "ELECTONIC",
    "email": "louisehayes@electonic.com",
    "phone": "+1 (859) 493-3889",
    "address": "699 Quay Street, Saticoy, Florida, 2918",
    "about": "Labore tempor culpa aliqua excepteur in aliqua et nisi nulla ullamco magna ea tempor minim. Esse nisi qui laboris et mollit nisi velit labore occaecat commodo aliqua sit nulla nisi. Fugiat anim commodo non non proident magna labore irure amet occaecat. Minim cillum cupidatat consequat quis qui sit nisi laboris incididunt do dolor deserunt voluptate.\r\n",
    "registered": "2017-11-20T11:31:04 -01:00",
    "latitude": 76.26828,
    "longitude": 59.625357,
    "tags": [
      "ad",
      "consequat",
      "nostrud",
      "eiusmod",
      "laboris",
      "fugiat",
      "elit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Melinda Guzman"
      },
      {
        "id": 1,
        "name": "Lowe Goodwin"
      },
      {
        "id": 2,
        "name": "Rowena Page"
      }
    ],
    "greeting": "Hello, Louise Hayes! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca45199daf66557a1f1",
    "index": 94,
    "guid": "6d0d5a61-591c-416a-8122-785291b8efac",
    "isActive": true,
    "balance": "$2,759.50",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "blue",
    "name": "Janette Oneal",
    "gender": "female",
    "company": "PATHWAYS",
    "email": "janetteoneal@pathways.com",
    "phone": "+1 (998) 509-2333",
    "address": "713 Sedgwick Place, Richmond, Delaware, 9742",
    "about": "Qui excepteur consectetur est adipisicing reprehenderit nostrud nulla et qui magna enim. Incididunt elit dolor deserunt exercitation officia reprehenderit consectetur enim elit labore aliquip exercitation. Proident nulla ipsum id nostrud aute adipisicing sit irure ad id. Duis culpa enim nisi magna non ipsum minim ut culpa ex consequat. Non elit tempor pariatur ea et ex officia aliqua dolore cillum. Pariatur adipisicing aute culpa enim aliquip sunt eiusmod esse labore sint dolore.\r\n",
    "registered": "2015-06-17T05:43:34 -02:00",
    "latitude": 46.584214,
    "longitude": 109.559855,
    "tags": [
      "aute",
      "anim",
      "enim",
      "ut",
      "cupidatat",
      "dolor",
      "nisi"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Keisha Brady"
      },
      {
        "id": 1,
        "name": "Josefa Kim"
      },
      {
        "id": 2,
        "name": "Mckinney Washington"
      }
    ],
    "greeting": "Hello, Janette Oneal! You have 8 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca423ec982e3f5e4413",
    "index": 95,
    "guid": "9f3321e4-61fd-4eb0-acd6-5d24ed60f1e9",
    "isActive": true,
    "balance": "$3,464.85",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "green",
    "name": "Bettye Huffman",
    "gender": "female",
    "company": "GLUID",
    "email": "bettyehuffman@gluid.com",
    "phone": "+1 (976) 586-3496",
    "address": "634 Amherst Street, Cuylerville, Wisconsin, 3197",
    "about": "Ad quis ut laborum reprehenderit ipsum deserunt reprehenderit enim. Tempor non ad deserunt occaecat ipsum pariatur exercitation velit anim reprehenderit laboris. Nostrud deserunt culpa culpa et deserunt adipisicing.\r\n",
    "registered": "2014-03-08T08:13:34 -01:00",
    "latitude": -59.507068,
    "longitude": -141.05231,
    "tags": [
      "ullamco",
      "non",
      "Lorem",
      "veniam",
      "anim",
      "dolor",
      "cillum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Dora Shelton"
      },
      {
        "id": 1,
        "name": "Erika Cardenas"
      },
      {
        "id": 2,
        "name": "Rosie Ruiz"
      }
    ],
    "greeting": "Hello, Bettye Huffman! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca406f7ce6057147201",
    "index": 96,
    "guid": "6ca27d75-c6f6-4cf9-b425-85155c3d0a32",
    "isActive": false,
    "balance": "$2,348.25",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "green",
    "name": "Fuentes Cash",
    "gender": "male",
    "company": "ZERBINA",
    "email": "fuentescash@zerbina.com",
    "phone": "+1 (983) 400-2637",
    "address": "339 Williams Place, Bartonsville, New York, 473",
    "about": "Dolore cillum officia labore laborum nostrud dolore velit ea ea elit. Nulla ullamco est magna amet commodo culpa reprehenderit cupidatat. Tempor quis cillum duis non enim deserunt non nisi aliqua occaecat. Anim irure officia ut est duis sit nisi amet. Veniam occaecat fugiat cillum velit veniam id voluptate. Veniam laboris voluptate nisi velit proident id tempor voluptate cillum.\r\n",
    "registered": "2016-07-23T10:05:03 -02:00",
    "latitude": 10.121901,
    "longitude": -104.312454,
    "tags": [
      "qui",
      "reprehenderit",
      "culpa",
      "sit",
      "mollit",
      "voluptate",
      "est"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Nash Fowler"
      },
      {
        "id": 1,
        "name": "Wanda Lott"
      },
      {
        "id": 2,
        "name": "Nettie Petty"
      }
    ],
    "greeting": "Hello, Fuentes Cash! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4f5df5698342d3bdb",
    "index": 97,
    "guid": "365c64aa-d8ad-46d5-8c48-35a20dd5df95",
    "isActive": true,
    "balance": "$1,045.15",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "blue",
    "name": "Goodwin Malone",
    "gender": "male",
    "company": "EXTRAWEAR",
    "email": "goodwinmalone@extrawear.com",
    "phone": "+1 (815) 406-3776",
    "address": "254 Quincy Street, Stockdale, Oklahoma, 9386",
    "about": "Amet ut nulla consectetur eiusmod tempor ullamco pariatur quis Lorem sunt consequat. Cupidatat aliquip quis id veniam consectetur magna nostrud anim proident amet. Commodo incididunt proident culpa consequat adipisicing quis cillum nisi tempor laboris nostrud. Dolore elit non reprehenderit veniam consectetur proident pariatur veniam sint nostrud. Aute esse id consectetur non dolor nisi labore. Dolor dolor sunt ullamco est eiusmod velit Lorem incididunt.\r\n",
    "registered": "2016-09-05T07:16:41 -02:00",
    "latitude": -46.379906,
    "longitude": -177.551562,
    "tags": [
      "pariatur",
      "nulla",
      "proident",
      "incididunt",
      "et",
      "est",
      "enim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Yates Robinson"
      },
      {
        "id": 1,
        "name": "Watson Watts"
      },
      {
        "id": 2,
        "name": "Consuelo Ford"
      }
    ],
    "greeting": "Hello, Goodwin Malone! You have 10 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4972458fc202d3d4d",
    "index": 98,
    "guid": "cc4548b4-f2d1-4c88-b425-9635b49b0d2d",
    "isActive": true,
    "balance": "$2,104.17",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "brown",
    "name": "Tonya Bradley",
    "gender": "female",
    "company": "PHUEL",
    "email": "tonyabradley@phuel.com",
    "phone": "+1 (978) 453-2920",
    "address": "483 Louis Place, Onton, North Carolina, 5014",
    "about": "Ad consequat ipsum exercitation nisi laborum nisi irure occaecat. Incididunt qui nulla pariatur aliquip fugiat aliquip eu dolore ullamco id reprehenderit sint labore. Elit minim reprehenderit laborum dolore. Duis non deserunt dolor consequat dolor nostrud aliquip officia ullamco. Adipisicing fugiat velit labore laboris ex.\r\n",
    "registered": "2014-12-30T04:44:45 -01:00",
    "latitude": 81.379664,
    "longitude": -60.301754,
    "tags": [
      "ipsum",
      "cupidatat",
      "adipisicing",
      "incididunt",
      "laborum",
      "voluptate",
      "do"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Olivia Hogan"
      },
      {
        "id": 1,
        "name": "Liliana Ramsey"
      },
      {
        "id": 2,
        "name": "Bonnie Rodriquez"
      }
    ],
    "greeting": "Hello, Tonya Bradley! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4ae66ed9aebd28e5f",
    "index": 99,
    "guid": "aab39b69-a6f0-4268-8219-c3e8eb0aa332",
    "isActive": false,
    "balance": "$2,211.00",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "brown",
    "name": "Malinda Rose",
    "gender": "female",
    "company": "ACLIMA",
    "email": "malindarose@aclima.com",
    "phone": "+1 (871) 515-2297",
    "address": "726 Columbus Place, Camptown, Arkansas, 9110",
    "about": "Elit ut elit ea sunt occaecat culpa et excepteur sunt irure deserunt pariatur non. Et adipisicing ex sunt qui nulla consectetur occaecat qui ad. Consequat consectetur magna cillum sit id magna non pariatur. Aliqua esse excepteur elit enim. Ut elit anim aliqua qui ipsum tempor consectetur dolor velit reprehenderit commodo.\r\n",
    "registered": "2015-10-28T04:33:56 -01:00",
    "latitude": 62.588821,
    "longitude": 74.716509,
    "tags": [
      "pariatur",
      "eu",
      "labore",
      "deserunt",
      "magna",
      "ad",
      "irure"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Robyn Collier"
      },
      {
        "id": 1,
        "name": "Evangelina Howell"
      },
      {
        "id": 2,
        "name": "Erickson Clarke"
      }
    ],
    "greeting": "Hello, Malinda Rose! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca40b5d7409456b8206",
    "index": 100,
    "guid": "db412756-8dc0-4eb0-8c85-7500a79165d5",
    "isActive": true,
    "balance": "$2,119.93",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "green",
    "name": "Goff Sherman",
    "gender": "male",
    "company": "XANIDE",
    "email": "goffsherman@xanide.com",
    "phone": "+1 (830) 452-3808",
    "address": "481 Classon Avenue, Sims, Maryland, 5450",
    "about": "Tempor elit velit reprehenderit do velit consequat velit qui veniam veniam cillum ut. Ut sunt est elit eu et dolor consequat non fugiat exercitation dolor in elit. Sit minim deserunt amet anim pariatur mollit laborum.\r\n",
    "registered": "2017-07-13T08:31:52 -02:00",
    "latitude": 83.79175,
    "longitude": -91.936813,
    "tags": [
      "et",
      "et",
      "ex",
      "Lorem",
      "fugiat",
      "consectetur",
      "aliquip"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Fay Eaton"
      },
      {
        "id": 1,
        "name": "Johnnie Hurley"
      },
      {
        "id": 2,
        "name": "Ball Sparks"
      }
    ],
    "greeting": "Hello, Goff Sherman! You have 1 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4606f709fb2a37162",
    "index": 101,
    "guid": "ad4f0d57-62ec-43b7-a88a-dc8ecb6a35c8",
    "isActive": false,
    "balance": "$2,013.34",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "brown",
    "name": "Marva Graham",
    "gender": "female",
    "company": "DANCERITY",
    "email": "marvagraham@dancerity.com",
    "phone": "+1 (951) 415-3107",
    "address": "497 Cortelyou Road, Bascom, Nebraska, 5997",
    "about": "Aute non pariatur cupidatat quis adipisicing id nostrud pariatur est voluptate et fugiat ullamco minim. Sunt nisi do esse pariatur officia enim do. Minim id eu nostrud esse aute non aliqua adipisicing pariatur est tempor nulla sint. Excepteur eu velit fugiat nulla deserunt.\r\n",
    "registered": "2016-12-03T01:25:51 -01:00",
    "latitude": -77.585957,
    "longitude": 38.376482,
    "tags": [
      "duis",
      "aliquip",
      "duis",
      "dolor",
      "adipisicing",
      "ullamco",
      "dolor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Stanley Crawford"
      },
      {
        "id": 1,
        "name": "Houston Klein"
      },
      {
        "id": 2,
        "name": "Yesenia Guy"
      }
    ],
    "greeting": "Hello, Marva Graham! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4a8ca453c500bd8ed",
    "index": 102,
    "guid": "4c25b2ec-d858-48f6-8d00-221273346247",
    "isActive": false,
    "balance": "$3,694.71",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "brown",
    "name": "Jacklyn Griffith",
    "gender": "female",
    "company": "MEDALERT",
    "email": "jacklyngriffith@medalert.com",
    "phone": "+1 (942) 524-2665",
    "address": "631 Atlantic Avenue, Venice, South Carolina, 1019",
    "about": "Cupidatat qui esse occaecat Lorem incididunt enim officia elit ipsum ea. Aute dolore do eiusmod amet laborum ullamco ipsum reprehenderit Lorem consectetur culpa consequat est excepteur. Ullamco voluptate aliqua consectetur ex ad tempor sint elit et excepteur. Cupidatat labore proident ipsum esse. Ea velit incididunt excepteur do ex dolor nisi nisi dolor ad dolore aliqua fugiat mollit.\r\n",
    "registered": "2017-07-21T09:36:57 -02:00",
    "latitude": -36.206942,
    "longitude": 51.984946,
    "tags": [
      "do",
      "qui",
      "anim",
      "magna",
      "deserunt",
      "aliquip",
      "duis"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Melva Gilliam"
      },
      {
        "id": 1,
        "name": "Colon Gibson"
      },
      {
        "id": 2,
        "name": "Rachael Craft"
      }
    ],
    "greeting": "Hello, Jacklyn Griffith! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca414f2f978845d8890",
    "index": 103,
    "guid": "728c10a2-1bb4-4073-9f0c-1d645955bfd5",
    "isActive": true,
    "balance": "$1,224.09",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "blue",
    "name": "Atkins Mayo",
    "gender": "male",
    "company": "BLANET",
    "email": "atkinsmayo@blanet.com",
    "phone": "+1 (822) 488-2008",
    "address": "248 Brightwater Avenue, Disautel, California, 4535",
    "about": "Pariatur ad adipisicing consequat culpa adipisicing fugiat exercitation non. Esse do ipsum mollit proident esse pariatur eiusmod ut excepteur cillum aliquip excepteur. Occaecat cillum Lorem mollit magna commodo adipisicing incididunt Lorem sit proident cillum.\r\n",
    "registered": "2014-09-05T07:52:51 -02:00",
    "latitude": 45.692927,
    "longitude": 89.322039,
    "tags": [
      "enim",
      "sint",
      "proident",
      "cupidatat",
      "et",
      "quis",
      "Lorem"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Ashley Boyd"
      },
      {
        "id": 1,
        "name": "Galloway Holt"
      },
      {
        "id": 2,
        "name": "Cervantes Mcclure"
      }
    ],
    "greeting": "Hello, Atkins Mayo! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4870509cbb0f1285c",
    "index": 104,
    "guid": "6a3fa5b2-0ffe-4f30-a8d0-14e2a4f5e53a",
    "isActive": true,
    "balance": "$1,603.59",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "blue",
    "name": "Battle Clemons",
    "gender": "male",
    "company": "MUSANPOLY",
    "email": "battleclemons@musanpoly.com",
    "phone": "+1 (822) 548-3736",
    "address": "447 Visitation Place, Coleville, Alabama, 9962",
    "about": "Id adipisicing magna esse velit enim adipisicing enim dolore. Labore consequat ut ut magna laboris cillum culpa laborum elit consectetur laboris in ut sit. Reprehenderit minim eiusmod exercitation sit exercitation enim. Sit magna nisi labore reprehenderit aliquip exercitation eiusmod irure. Id ad sit incididunt commodo in commodo irure laboris do minim laboris labore enim. Nostrud ad id sit pariatur.\r\n",
    "registered": "2018-01-11T08:23:58 -01:00",
    "latitude": -20.337554,
    "longitude": -10.783988,
    "tags": [
      "voluptate",
      "fugiat",
      "eiusmod",
      "ut",
      "nostrud",
      "duis",
      "do"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Odonnell Macias"
      },
      {
        "id": 1,
        "name": "Sargent Cummings"
      },
      {
        "id": 2,
        "name": "Merritt Morgan"
      }
    ],
    "greeting": "Hello, Battle Clemons! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4ef0113fe955bef44",
    "index": 105,
    "guid": "801f9a23-ef94-4a5d-a8de-b2cf50c92b7b",
    "isActive": false,
    "balance": "$3,673.27",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "green",
    "name": "Ingram Walker",
    "gender": "male",
    "company": "COMSTRUCT",
    "email": "ingramwalker@comstruct.com",
    "phone": "+1 (826) 600-3086",
    "address": "882 Adler Place, Morgandale, Kentucky, 986",
    "about": "Eu dolore consequat nisi non dolore ad irure nostrud aliqua. Tempor incididunt magna in reprehenderit laboris incididunt adipisicing commodo. Aliqua nulla ea nisi quis aliqua.\r\n",
    "registered": "2017-01-05T01:36:51 -01:00",
    "latitude": 58.846652,
    "longitude": -82.281942,
    "tags": [
      "ex",
      "nulla",
      "ullamco",
      "ex",
      "quis",
      "id",
      "labore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Aimee Hebert"
      },
      {
        "id": 1,
        "name": "Margaret Estes"
      },
      {
        "id": 2,
        "name": "Harriett Mccarty"
      }
    ],
    "greeting": "Hello, Ingram Walker! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca40c7b86705ed012e1",
    "index": 106,
    "guid": "3e4000b3-c89b-4951-b528-59afec564589",
    "isActive": true,
    "balance": "$1,427.06",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "eyeColor": "brown",
    "name": "Margie Wall",
    "gender": "female",
    "company": "ZOMBOID",
    "email": "margiewall@zomboid.com",
    "phone": "+1 (911) 495-3912",
    "address": "316 Lafayette Avenue, Bowmansville, Louisiana, 1994",
    "about": "Voluptate officia non fugiat est quis reprehenderit. Velit voluptate ullamco nulla id tempor elit exercitation aute duis ipsum esse aute est. Ex incididunt sit et sunt nulla Lorem nostrud fugiat magna excepteur non ea. Laborum ea Lorem nostrud minim qui cupidatat sunt reprehenderit mollit dolor. Id dolore excepteur incididunt voluptate eu ad sunt. Fugiat nulla voluptate Lorem exercitation et fugiat irure dolore aliquip proident qui.\r\n",
    "registered": "2018-09-08T08:44:00 -02:00",
    "latitude": -53.698302,
    "longitude": 74.817175,
    "tags": [
      "non",
      "dolor",
      "incididunt",
      "ut",
      "amet",
      "proident",
      "elit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Gail Cantu"
      },
      {
        "id": 1,
        "name": "Carolina William"
      },
      {
        "id": 2,
        "name": "Armstrong Garza"
      }
    ],
    "greeting": "Hello, Margie Wall! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4c1e909c9e8879d41",
    "index": 107,
    "guid": "1c4d7116-1f5d-4c3e-9b61-91005af26953",
    "isActive": true,
    "balance": "$1,297.54",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "green",
    "name": "Wilma Gentry",
    "gender": "female",
    "company": "SPLINX",
    "email": "wilmagentry@splinx.com",
    "phone": "+1 (889) 420-2192",
    "address": "102 Nostrand Avenue, Movico, Guam, 9800",
    "about": "Aute excepteur excepteur cillum dolor excepteur laborum elit id aute consequat occaecat ut ea magna. Proident aliquip non cillum laborum irure enim eiusmod. Officia nostrud est laborum non officia. Nisi pariatur consectetur non dolor. Amet exercitation sit anim nulla proident laboris eiusmod elit cupidatat. Officia sit culpa sint laborum esse nisi deserunt cupidatat incididunt. Nostrud est elit minim dolor culpa dolore cillum fugiat enim veniam duis labore proident aute.\r\n",
    "registered": "2017-08-16T08:55:20 -02:00",
    "latitude": 1.792533,
    "longitude": -94.68702,
    "tags": [
      "cupidatat",
      "nostrud",
      "Lorem",
      "mollit",
      "non",
      "occaecat",
      "esse"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Leach Thomas"
      },
      {
        "id": 1,
        "name": "Rios Joyce"
      },
      {
        "id": 2,
        "name": "Leonard Powers"
      }
    ],
    "greeting": "Hello, Wilma Gentry! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4fb47ab942d3b0787",
    "index": 108,
    "guid": "5bebee53-4dce-4f9b-b9d3-7bdd15e235e5",
    "isActive": true,
    "balance": "$2,126.54",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "blue",
    "name": "Mckay Zamora",
    "gender": "male",
    "company": "VISALIA",
    "email": "mckayzamora@visalia.com",
    "phone": "+1 (936) 573-3070",
    "address": "619 Brooklyn Road, Trail, South Dakota, 1686",
    "about": "Nisi consectetur sit laboris quis. Do voluptate tempor deserunt dolor fugiat culpa labore adipisicing sit elit aliqua. Labore labore anim tempor sint cillum minim ipsum ex. Qui consectetur Lorem non ex. Sit ut qui ullamco qui aliqua qui ex reprehenderit occaecat minim sunt commodo. Dolor nisi consectetur labore Lorem aliqua dolor. Elit cillum cillum deserunt ea dolor et occaecat velit do magna in.\r\n",
    "registered": "2018-08-27T02:27:28 -02:00",
    "latitude": -44.317576,
    "longitude": 20.428229,
    "tags": [
      "pariatur",
      "irure",
      "non",
      "elit",
      "reprehenderit",
      "pariatur",
      "dolore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "May Park"
      },
      {
        "id": 1,
        "name": "Madge Murphy"
      },
      {
        "id": 2,
        "name": "Jody Hull"
      }
    ],
    "greeting": "Hello, Mckay Zamora! You have 2 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca439673cbb21da4392",
    "index": 109,
    "guid": "f98abddd-5880-4893-8fb1-3ce3b3a2ca46",
    "isActive": false,
    "balance": "$3,837.82",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "green",
    "name": "Morris Richard",
    "gender": "male",
    "company": "RECOGNIA",
    "email": "morrisrichard@recognia.com",
    "phone": "+1 (890) 434-2291",
    "address": "406 Vernon Avenue, Coultervillle, Federated States Of Micronesia, 5897",
    "about": "Sit ipsum nostrud sit aliquip aliqua ad. Velit ex laborum fugiat pariatur id consectetur cillum commodo reprehenderit officia. Adipisicing ullamco excepteur ex Lorem quis laborum culpa velit ex tempor magna amet. Ea ullamco officia dolore proident eiusmod minim ex aute amet laborum nisi magna laboris. Ea sunt reprehenderit ex cupidatat non reprehenderit eu adipisicing. Officia cillum voluptate qui proident aute esse id fugiat aliqua.\r\n",
    "registered": "2017-05-02T12:38:23 -02:00",
    "latitude": 79.885976,
    "longitude": -15.207962,
    "tags": [
      "pariatur",
      "incididunt",
      "fugiat",
      "do",
      "eu",
      "velit",
      "pariatur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Cunningham Lancaster"
      },
      {
        "id": 1,
        "name": "Floyd Ellison"
      },
      {
        "id": 2,
        "name": "Autumn Prince"
      }
    ],
    "greeting": "Hello, Morris Richard! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca42a0bf7e00483bba0",
    "index": 110,
    "guid": "2d86e76f-ba6d-4e58-9bb8-ef5fc0ed4746",
    "isActive": true,
    "balance": "$3,759.90",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "brown",
    "name": "Richardson West",
    "gender": "male",
    "company": "EBIDCO",
    "email": "richardsonwest@ebidco.com",
    "phone": "+1 (818) 537-3325",
    "address": "723 Drew Street, Eagletown, Mississippi, 4424",
    "about": "Tempor sit minim laborum commodo ea adipisicing ea veniam. Duis et magna sit id et magna adipisicing exercitation irure consectetur. Veniam duis enim amet minim et consequat aute est fugiat cillum eu pariatur non reprehenderit. Elit eu Lorem officia ad excepteur eiusmod aliqua nisi.\r\n",
    "registered": "2016-03-11T03:15:47 -01:00",
    "latitude": -16.95739,
    "longitude": -95.742126,
    "tags": [
      "nostrud",
      "pariatur",
      "mollit",
      "aliquip",
      "excepteur",
      "deserunt",
      "do"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Ana Stout"
      },
      {
        "id": 1,
        "name": "Castaneda Bonner"
      },
      {
        "id": 2,
        "name": "Robert Terrell"
      }
    ],
    "greeting": "Hello, Richardson West! You have 4 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4494624d095905809",
    "index": 111,
    "guid": "40b5f4dd-b23f-48a3-870e-b711fb6593e7",
    "isActive": false,
    "balance": "$3,836.71",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "brown",
    "name": "Carey Cervantes",
    "gender": "male",
    "company": "TRIPSCH",
    "email": "careycervantes@tripsch.com",
    "phone": "+1 (870) 551-3863",
    "address": "900 Roebling Street, Calverton, Northern Mariana Islands, 9940",
    "about": "Tempor elit adipisicing ullamco veniam velit sint aliquip. Ea nostrud esse officia enim nisi. Cillum do reprehenderit enim cupidatat. Ad voluptate fugiat exercitation sunt anim fugiat enim. Et sint ut voluptate qui ex eiusmod anim quis id. Minim duis magna aliqua do sit exercitation do et mollit consectetur aute. Aliqua commodo elit exercitation laborum mollit aliqua.\r\n",
    "registered": "2015-11-24T08:16:21 -01:00",
    "latitude": 24.508678,
    "longitude": 89.970409,
    "tags": [
      "amet",
      "aute",
      "commodo",
      "id",
      "velit",
      "ut",
      "sunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Lenore Hensley"
      },
      {
        "id": 1,
        "name": "Lacy Watson"
      },
      {
        "id": 2,
        "name": "Sykes Baxter"
      }
    ],
    "greeting": "Hello, Carey Cervantes! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca418cfeb7a2e19e2d5",
    "index": 112,
    "guid": "4dc9c923-9735-46ab-a2fa-11c76e1496ac",
    "isActive": true,
    "balance": "$2,835.57",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "green",
    "name": "Molina Gonzalez",
    "gender": "male",
    "company": "GRAINSPOT",
    "email": "molinagonzalez@grainspot.com",
    "phone": "+1 (895) 478-2164",
    "address": "619 Grimes Road, Shepardsville, Hawaii, 1685",
    "about": "Nisi consequat et velit ex dolore nulla deserunt. Consequat velit commodo in fugiat consectetur. Sunt proident velit exercitation occaecat nisi. Veniam eiusmod sit anim velit voluptate elit minim nulla excepteur duis id id aute. Ex officia duis nulla esse aute et id Lorem laboris cillum consectetur elit. Eiusmod excepteur ad cillum esse commodo minim nulla. Consectetur reprehenderit eu ad dolore sit est esse pariatur deserunt non sit nostrud.\r\n",
    "registered": "2014-05-20T07:46:08 -02:00",
    "latitude": -84.929525,
    "longitude": -80.386978,
    "tags": [
      "cillum",
      "in",
      "cupidatat",
      "ipsum",
      "commodo",
      "officia",
      "occaecat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Reilly Newman"
      },
      {
        "id": 1,
        "name": "Kelley Franks"
      },
      {
        "id": 2,
        "name": "Mayo Kennedy"
      }
    ],
    "greeting": "Hello, Molina Gonzalez! You have 5 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4e248610770a01d16",
    "index": 113,
    "guid": "32ec28b5-27fc-4859-bc3e-1041f4232168",
    "isActive": true,
    "balance": "$1,572.02",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "green",
    "name": "Mitchell Welch",
    "gender": "male",
    "company": "KOZGENE",
    "email": "mitchellwelch@kozgene.com",
    "phone": "+1 (929) 503-3893",
    "address": "235 Dikeman Street, Teasdale, Puerto Rico, 350",
    "about": "Nostrud ex dolor consectetur anim consequat voluptate sunt. Ipsum sit et ipsum reprehenderit. Laborum tempor nostrud aute cupidatat laboris esse laboris sint consectetur est magna ipsum. Lorem sit aute nostrud nostrud voluptate mollit labore occaecat minim eu.\r\n",
    "registered": "2016-09-19T06:40:44 -02:00",
    "latitude": 59.531924,
    "longitude": -45.362265,
    "tags": [
      "culpa",
      "consectetur",
      "elit",
      "nisi",
      "in",
      "nulla",
      "nulla"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Angelia Blanchard"
      },
      {
        "id": 1,
        "name": "Delaney Reese"
      },
      {
        "id": 2,
        "name": "Rosalyn Sanford"
      }
    ],
    "greeting": "Hello, Mitchell Welch! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4ddaf0fc7bcb87b1f",
    "index": 114,
    "guid": "d33a2347-717c-445e-acb7-e4c88f7b5580",
    "isActive": true,
    "balance": "$3,660.44",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "blue",
    "name": "Mayer Rojas",
    "gender": "male",
    "company": "ILLUMITY",
    "email": "mayerrojas@illumity.com",
    "phone": "+1 (993) 599-3335",
    "address": "645 India Street, Norvelt, West Virginia, 6900",
    "about": "Ipsum pariatur amet aliquip veniam velit aliqua. Ad reprehenderit Lorem deserunt exercitation. Veniam do non excepteur do fugiat laborum Lorem veniam ullamco.\r\n",
    "registered": "2014-02-23T02:29:14 -01:00",
    "latitude": 34.396039,
    "longitude": -110.761732,
    "tags": [
      "sunt",
      "deserunt",
      "ipsum",
      "aliqua",
      "consequat",
      "aute",
      "adipisicing"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Whitney Mccray"
      },
      {
        "id": 1,
        "name": "Earline French"
      },
      {
        "id": 2,
        "name": "Kane Montoya"
      }
    ],
    "greeting": "Hello, Mayer Rojas! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca44ebed09d7b010a45",
    "index": 115,
    "guid": "7cb4a66f-4e6e-4dd7-962b-8b7294f84591",
    "isActive": true,
    "balance": "$1,866.95",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "blue",
    "name": "Leola Bentley",
    "gender": "female",
    "company": "JUMPSTACK",
    "email": "leolabentley@jumpstack.com",
    "phone": "+1 (857) 433-3539",
    "address": "939 Highland Place, Wattsville, Missouri, 8905",
    "about": "Ad enim proident excepteur ullamco Lorem eu. Sint commodo commodo amet aute cillum incididunt exercitation occaecat. Id non nostrud officia qui laboris anim reprehenderit commodo eiusmod aliquip in irure labore Lorem. Et labore officia sint commodo cupidatat. Culpa id irure dolore consequat consequat. Sit amet eiusmod aliqua culpa laboris. Sunt anim ullamco deserunt excepteur.\r\n",
    "registered": "2016-08-29T05:46:50 -02:00",
    "latitude": -15.21114,
    "longitude": -83.027373,
    "tags": [
      "velit",
      "commodo",
      "minim",
      "irure",
      "elit",
      "elit",
      "pariatur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Ryan Burks"
      },
      {
        "id": 1,
        "name": "Desiree Barber"
      },
      {
        "id": 2,
        "name": "Jenifer Meyer"
      }
    ],
    "greeting": "Hello, Leola Bentley! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca493aaca035c47c824",
    "index": 116,
    "guid": "64d86a0e-ea3d-42fa-ab4c-71d23906c209",
    "isActive": true,
    "balance": "$2,505.95",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "green",
    "name": "Wolfe Beasley",
    "gender": "male",
    "company": "HARMONEY",
    "email": "wolfebeasley@harmoney.com",
    "phone": "+1 (898) 584-2784",
    "address": "538 Madoc Avenue, Tonopah, Colorado, 974",
    "about": "Excepteur non excepteur Lorem aliquip. Non in et consectetur laboris ex sit sit aliqua in et pariatur laboris. Sunt laborum minim amet commodo commodo tempor. Voluptate enim amet amet sint eu voluptate cupidatat quis reprehenderit aute ad cupidatat. Sint dolor elit exercitation reprehenderit amet do deserunt cillum enim sunt occaecat nostrud quis dolor. Culpa est id voluptate ea officia elit consequat est et magna. Commodo eiusmod voluptate irure id est cupidatat eiusmod irure elit.\r\n",
    "registered": "2015-12-03T12:33:14 -01:00",
    "latitude": -19.181173,
    "longitude": -3.680141,
    "tags": [
      "velit",
      "nisi",
      "nulla",
      "adipisicing",
      "ea",
      "labore",
      "id"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Reese Quinn"
      },
      {
        "id": 1,
        "name": "Dee Horn"
      },
      {
        "id": 2,
        "name": "Janna Mullins"
      }
    ],
    "greeting": "Hello, Wolfe Beasley! You have 2 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca474c5061bf1ab8999",
    "index": 117,
    "guid": "6e182796-bfa2-4ee2-84e7-63981eb066d6",
    "isActive": true,
    "balance": "$1,415.00",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "green",
    "name": "Conley Mooney",
    "gender": "male",
    "company": "OVOLO",
    "email": "conleymooney@ovolo.com",
    "phone": "+1 (842) 576-2315",
    "address": "562 Albee Square, Snyderville, Alaska, 2626",
    "about": "Ullamco elit aute commodo commodo. Tempor excepteur laboris et in reprehenderit minim anim incididunt irure. Proident magna nisi eiusmod occaecat aute officia enim Lorem. Cupidatat labore deserunt excepteur quis consectetur proident.\r\n",
    "registered": "2014-05-22T08:38:52 -02:00",
    "latitude": -44.986544,
    "longitude": -34.672627,
    "tags": [
      "quis",
      "consectetur",
      "sunt",
      "amet",
      "do",
      "ut",
      "do"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Meyer Lindsey"
      },
      {
        "id": 1,
        "name": "Daugherty Baldwin"
      },
      {
        "id": 2,
        "name": "Enid Wiggins"
      }
    ],
    "greeting": "Hello, Conley Mooney! You have 5 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca417ddf0b927b4bed4",
    "index": 118,
    "guid": "529396d2-be6d-4403-a2c7-2d89fc54bb53",
    "isActive": true,
    "balance": "$3,741.24",
    "picture": "http://placehold.it/32x32",
    "age": 36,
    "eyeColor": "blue",
    "name": "Church Cain",
    "gender": "male",
    "company": "ENERSOL",
    "email": "churchcain@enersol.com",
    "phone": "+1 (868) 512-3774",
    "address": "767 Ira Court, Clara, Utah, 9874",
    "about": "Nisi dolor quis voluptate anim quis cupidatat irure esse irure sint sit. Officia veniam proident sint Lorem ea. Labore pariatur id incididunt occaecat pariatur sint ipsum sunt labore velit est excepteur elit. Ut in id ad Lorem qui exercitation consequat cupidatat ad Lorem nisi ipsum consectetur eiusmod.\r\n",
    "registered": "2015-10-03T08:26:22 -02:00",
    "latitude": 37.334944,
    "longitude": -155.776791,
    "tags": [
      "cillum",
      "qui",
      "laboris",
      "ipsum",
      "dolor",
      "tempor",
      "sint"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Ross Rush"
      },
      {
        "id": 1,
        "name": "Paul Schroeder"
      },
      {
        "id": 2,
        "name": "Bullock Albert"
      }
    ],
    "greeting": "Hello, Church Cain! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca424260a34fed40051",
    "index": 119,
    "guid": "1870a49e-70d5-48db-bac6-834cf4467385",
    "isActive": true,
    "balance": "$3,511.75",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "brown",
    "name": "Irwin Fuller",
    "gender": "male",
    "company": "RAMEON",
    "email": "irwinfuller@rameon.com",
    "phone": "+1 (950) 546-3056",
    "address": "137 Dahill Road, Wilmington, Washington, 5369",
    "about": "Est pariatur nisi adipisicing adipisicing. Amet exercitation aliquip do sit ipsum sint exercitation voluptate cupidatat. Officia non velit ad ullamco magna officia culpa ullamco in consectetur reprehenderit proident. Eu excepteur anim Lorem sit irure.\r\n",
    "registered": "2018-08-26T09:45:05 -02:00",
    "latitude": 45.884233,
    "longitude": 105.244476,
    "tags": [
      "voluptate",
      "reprehenderit",
      "exercitation",
      "velit",
      "sunt",
      "fugiat",
      "ex"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Graves Marks"
      },
      {
        "id": 1,
        "name": "Beatrice Nguyen"
      },
      {
        "id": 2,
        "name": "Terrie Diaz"
      }
    ],
    "greeting": "Hello, Irwin Fuller! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4fe5034eeb6b06a6e",
    "index": 120,
    "guid": "9ef2f9d0-88d1-43b0-831f-d50599c922a8",
    "isActive": true,
    "balance": "$3,598.00",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "green",
    "name": "Cash Pace",
    "gender": "male",
    "company": "QUONATA",
    "email": "cashpace@quonata.com",
    "phone": "+1 (932) 442-3669",
    "address": "156 Ingraham Street, Shrewsbury, Iowa, 429",
    "about": "Adipisicing aliqua deserunt pariatur mollit elit enim commodo exercitation quis occaecat reprehenderit anim exercitation tempor. Adipisicing eu nisi pariatur excepteur nulla commodo voluptate. Fugiat ex tempor magna duis sunt adipisicing veniam elit labore mollit ea excepteur. Ipsum cillum culpa exercitation pariatur duis duis labore ipsum cupidatat ut deserunt ipsum aute. Dolor proident consequat enim nulla magna adipisicing aliqua sit in id. Enim labore amet exercitation velit dolore consequat laborum non irure eiusmod officia.\r\n",
    "registered": "2017-04-07T07:31:36 -02:00",
    "latitude": 50.35542,
    "longitude": -154.042356,
    "tags": [
      "ad",
      "velit",
      "irure",
      "voluptate",
      "eiusmod",
      "dolore",
      "incididunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Grant Hays"
      },
      {
        "id": 1,
        "name": "Carlene Daniels"
      },
      {
        "id": 2,
        "name": "Tameka Davis"
      }
    ],
    "greeting": "Hello, Cash Pace! You have 5 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca41e4147ec766ea141",
    "index": 121,
    "guid": "fe5e6070-1893-4a1d-b3cd-b7ee62d8aaaf",
    "isActive": false,
    "balance": "$1,306.96",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "brown",
    "name": "Pruitt Walters",
    "gender": "male",
    "company": "PARCOE",
    "email": "pruittwalters@parcoe.com",
    "phone": "+1 (841) 583-3694",
    "address": "274 Halsey Street, Falmouth, Kansas, 4166",
    "about": "Reprehenderit id culpa commodo consequat tempor commodo consectetur nisi do id sit dolore. Irure mollit ullamco adipisicing officia eiusmod anim laborum ipsum et proident. Cupidatat laborum mollit sit nisi.\r\n",
    "registered": "2017-08-08T01:45:55 -02:00",
    "latitude": -78.817228,
    "longitude": 60.592674,
    "tags": [
      "velit",
      "ea",
      "est",
      "tempor",
      "consequat",
      "quis",
      "veniam"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Aurelia Duke"
      },
      {
        "id": 1,
        "name": "Tabatha Daugherty"
      },
      {
        "id": 2,
        "name": "Jeanette Glenn"
      }
    ],
    "greeting": "Hello, Pruitt Walters! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca48f7a74dfbe071da0",
    "index": 122,
    "guid": "b6108d19-bb05-4927-b40c-de399d1661af",
    "isActive": true,
    "balance": "$3,319.06",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "blue",
    "name": "Hayden Herring",
    "gender": "male",
    "company": "ELPRO",
    "email": "haydenherring@elpro.com",
    "phone": "+1 (986) 514-3610",
    "address": "236 Indiana Place, Guilford, Texas, 692",
    "about": "Laboris dolore proident ullamco esse laboris adipisicing proident commodo ullamco ullamco. Minim Lorem deserunt consectetur consectetur cupidatat minim non. Deserunt do nostrud labore deserunt aliqua incididunt consectetur id nisi ullamco.\r\n",
    "registered": "2015-10-15T12:08:13 -02:00",
    "latitude": 32.015464,
    "longitude": 103.066544,
    "tags": [
      "laborum",
      "mollit",
      "do",
      "excepteur",
      "labore",
      "ad",
      "reprehenderit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Bernice Hoffman"
      },
      {
        "id": 1,
        "name": "Helena Landry"
      },
      {
        "id": 2,
        "name": "Krystal White"
      }
    ],
    "greeting": "Hello, Hayden Herring! You have 8 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4649a6a43389e0794",
    "index": 123,
    "guid": "ef4fc256-7839-4a4c-b1a1-5c60b105270e",
    "isActive": true,
    "balance": "$2,788.09",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "blue",
    "name": "Barton Waters",
    "gender": "male",
    "company": "KINDALOO",
    "email": "bartonwaters@kindaloo.com",
    "phone": "+1 (878) 570-2506",
    "address": "580 Creamer Street, Brethren, Illinois, 6363",
    "about": "Nostrud magna adipisicing quis amet ex irure. Commodo magna proident minim dolor velit. Officia pariatur ipsum ipsum ipsum. Eu amet voluptate sunt fugiat pariatur do est dolor nostrud sint voluptate aliqua sunt mollit. Do elit elit culpa quis sint eiusmod. Magna voluptate non minim esse in incididunt laborum. Reprehenderit irure esse et voluptate ad sunt irure velit veniam excepteur incididunt ut proident officia.\r\n",
    "registered": "2018-08-20T02:14:00 -02:00",
    "latitude": 54.415531,
    "longitude": -114.062412,
    "tags": [
      "excepteur",
      "sint",
      "ullamco",
      "sunt",
      "magna",
      "officia",
      "ex"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Robbins Haney"
      },
      {
        "id": 1,
        "name": "Owen Goff"
      },
      {
        "id": 2,
        "name": "Judy Carr"
      }
    ],
    "greeting": "Hello, Barton Waters! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4c1c426138338d1d2",
    "index": 124,
    "guid": "0c905460-a959-4ace-8816-b03b2a5f922a",
    "isActive": false,
    "balance": "$2,879.97",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "blue",
    "name": "Emily Wise",
    "gender": "female",
    "company": "VIRVA",
    "email": "emilywise@virva.com",
    "phone": "+1 (937) 497-3618",
    "address": "115 Calyer Street, Dale, Virginia, 9326",
    "about": "Anim consectetur commodo eu cupidatat consectetur aliquip nisi magna exercitation commodo. Magna culpa do quis ipsum enim tempor officia quis. Laboris fugiat tempor laboris et in ut. Ut qui in anim in cillum laboris nisi reprehenderit amet. Qui ea consectetur elit laboris consectetur ipsum elit nulla non incididunt eu irure cillum. Labore qui officia aute excepteur dolor incididunt Lorem minim ipsum sint adipisicing.\r\n",
    "registered": "2016-11-21T03:10:20 -01:00",
    "latitude": 21.22387,
    "longitude": -98.584444,
    "tags": [
      "nostrud",
      "amet",
      "duis",
      "ad",
      "sunt",
      "id",
      "laborum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Tabitha Miles"
      },
      {
        "id": 1,
        "name": "Carson Hendricks"
      },
      {
        "id": 2,
        "name": "Tanisha Ross"
      }
    ],
    "greeting": "Hello, Emily Wise! You have 9 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca477561d80d072bd7b",
    "index": 125,
    "guid": "3792e137-217d-4f53-820c-e96926f60e66",
    "isActive": false,
    "balance": "$3,170.90",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "green",
    "name": "Marion Whitney",
    "gender": "female",
    "company": "FLEXIGEN",
    "email": "marionwhitney@flexigen.com",
    "phone": "+1 (833) 448-3931",
    "address": "498 Dorchester Road, Roberts, Maine, 2631",
    "about": "Laborum nostrud nostrud aute officia adipisicing est officia do quis exercitation elit id Lorem et. Eu nostrud aute elit nulla veniam cupidatat excepteur reprehenderit veniam dolore aute proident. Quis anim sit laboris non ut laborum qui adipisicing sit. Voluptate nostrud amet esse id qui dolore veniam aliqua ea. Incididunt veniam cupidatat occaecat eu duis pariatur quis sit magna culpa do.\r\n",
    "registered": "2014-06-30T08:31:24 -02:00",
    "latitude": 21.653897,
    "longitude": 173.176098,
    "tags": [
      "elit",
      "dolore",
      "non",
      "exercitation",
      "non",
      "ad",
      "incididunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Marylou Peck"
      },
      {
        "id": 1,
        "name": "Lynda Reed"
      },
      {
        "id": 2,
        "name": "Holman Kemp"
      }
    ],
    "greeting": "Hello, Marion Whitney! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4213f7c1e8628a46f",
    "index": 126,
    "guid": "420e41c9-873f-4494-8dd8-35cde04825cf",
    "isActive": true,
    "balance": "$2,109.68",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "brown",
    "name": "Mcleod Holcomb",
    "gender": "male",
    "company": "PODUNK",
    "email": "mcleodholcomb@podunk.com",
    "phone": "+1 (953) 546-2669",
    "address": "456 McKibben Street, Smeltertown, Oregon, 2836",
    "about": "Ex laborum excepteur irure sint. Enim excepteur nisi exercitation cupidatat minim. Elit ea ea veniam esse occaecat est ullamco ea in cillum. Cupidatat non occaecat occaecat anim exercitation magna magna mollit est eu deserunt. Lorem pariatur exercitation quis non labore eu incididunt proident cupidatat dolore voluptate tempor ipsum Lorem. Voluptate dolore commodo ad officia aliquip est. Eu dolor Lorem pariatur ipsum consequat culpa.\r\n",
    "registered": "2017-07-04T07:03:20 -02:00",
    "latitude": 43.942376,
    "longitude": -92.226177,
    "tags": [
      "ipsum",
      "enim",
      "et",
      "enim",
      "dolore",
      "reprehenderit",
      "amet"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Pearson Leach"
      },
      {
        "id": 1,
        "name": "Santiago Rivera"
      },
      {
        "id": 2,
        "name": "Renee Stafford"
      }
    ],
    "greeting": "Hello, Mcleod Holcomb! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4b4d8202214a5b127",
    "index": 127,
    "guid": "d8c6acbe-b246-408f-a312-3c253c5c8f45",
    "isActive": true,
    "balance": "$2,961.90",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "blue",
    "name": "Lee Oneil",
    "gender": "male",
    "company": "POLARIUM",
    "email": "leeoneil@polarium.com",
    "phone": "+1 (973) 584-2522",
    "address": "329 Miller Avenue, Belmont, New Jersey, 8947",
    "about": "Consectetur magna dolore eiusmod excepteur velit non exercitation laboris enim ex in cillum deserunt cillum. Deserunt enim dolor in duis dolor aliquip ea. Nostrud velit cupidatat voluptate mollit non mollit ex in nostrud cupidatat labore commodo dolor duis. Commodo ex enim laboris consequat nostrud. Elit adipisicing magna id ullamco elit officia excepteur est in quis magna. Excepteur ea cillum minim deserunt sunt commodo elit aute esse voluptate eiusmod. In mollit consequat amet aliquip laborum irure laborum.\r\n",
    "registered": "2017-09-22T02:35:46 -02:00",
    "latitude": 25.196339,
    "longitude": -141.253667,
    "tags": [
      "minim",
      "consequat",
      "velit",
      "irure",
      "reprehenderit",
      "est",
      "elit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Ophelia Glass"
      },
      {
        "id": 1,
        "name": "Therese Adams"
      },
      {
        "id": 2,
        "name": "Wyatt Young"
      }
    ],
    "greeting": "Hello, Lee Oneil! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca440497ac369918c0d",
    "index": 128,
    "guid": "af9d1fed-6290-45fd-985f-96fb66c5d1ab",
    "isActive": false,
    "balance": "$2,650.14",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "green",
    "name": "Yolanda Flores",
    "gender": "female",
    "company": "IMKAN",
    "email": "yolandaflores@imkan.com",
    "phone": "+1 (858) 541-3015",
    "address": "350 Pioneer Street, Chautauqua, Michigan, 5219",
    "about": "Amet duis mollit qui non ullamco in mollit aliquip voluptate. Esse proident non anim non adipisicing ea commodo nostrud est cillum proident amet sint. Minim tempor eiusmod qui esse consectetur eiusmod aliqua veniam cillum tempor qui adipisicing eu elit. Minim amet eu mollit nulla nostrud proident labore. Cupidatat fugiat Lorem ut et aliqua sit pariatur consequat reprehenderit fugiat. Qui aliquip Lorem minim qui anim sit et pariatur dolore qui et fugiat mollit. Excepteur est velit consectetur ea ad incididunt quis voluptate adipisicing qui.\r\n",
    "registered": "2018-08-06T07:02:59 -02:00",
    "latitude": 50.199424,
    "longitude": -159.273501,
    "tags": [
      "duis",
      "esse",
      "cillum",
      "eu",
      "reprehenderit",
      "qui",
      "ea"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Janell Blankenship"
      },
      {
        "id": 1,
        "name": "Morrow Golden"
      },
      {
        "id": 2,
        "name": "Pitts Hughes"
      }
    ],
    "greeting": "Hello, Yolanda Flores! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca45cb1540e314df20a",
    "index": 129,
    "guid": "26b0f4b9-080c-4ad8-b2e5-ec387afc1113",
    "isActive": false,
    "balance": "$3,597.55",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "green",
    "name": "Buckley Crosby",
    "gender": "male",
    "company": "DEVILTOE",
    "email": "buckleycrosby@deviltoe.com",
    "phone": "+1 (929) 534-3154",
    "address": "195 Macon Street, Brady, District Of Columbia, 1686",
    "about": "Do quis excepteur aliquip anim. Qui consequat veniam ullamco voluptate mollit. Non consequat minim consequat do ut culpa occaecat.\r\n",
    "registered": "2015-03-02T06:46:03 -01:00",
    "latitude": -52.963936,
    "longitude": 178.497064,
    "tags": [
      "est",
      "Lorem",
      "incididunt",
      "ex",
      "mollit",
      "eiusmod",
      "duis"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Pamela Abbott"
      },
      {
        "id": 1,
        "name": "Browning Mcgowan"
      },
      {
        "id": 2,
        "name": "Owens Mann"
      }
    ],
    "greeting": "Hello, Buckley Crosby! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4c74f410b20cdc159",
    "index": 130,
    "guid": "76118e5b-3569-4e75-a8e9-1198b2a9183f",
    "isActive": false,
    "balance": "$1,864.53",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "blue",
    "name": "Isabel Moran",
    "gender": "female",
    "company": "BIFLEX",
    "email": "isabelmoran@biflex.com",
    "phone": "+1 (817) 482-2255",
    "address": "295 Bedell Lane, Statenville, Indiana, 8203",
    "about": "Adipisicing labore ea enim anim occaecat commodo aliqua. Duis veniam dolore voluptate labore duis aute proident elit dolore quis aliquip ipsum. Veniam sit voluptate dolor magna laboris consequat sint amet reprehenderit esse aliquip adipisicing voluptate cillum. Tempor adipisicing do incididunt sunt incididunt consequat. Fugiat ut laborum cillum amet aute consequat sint exercitation enim nisi dolor nulla commodo.\r\n",
    "registered": "2014-05-04T05:48:19 -02:00",
    "latitude": 65.496064,
    "longitude": -163.057679,
    "tags": [
      "pariatur",
      "nulla",
      "enim",
      "est",
      "labore",
      "in",
      "nostrud"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Fitzpatrick Hawkins"
      },
      {
        "id": 1,
        "name": "Dalton Shaw"
      },
      {
        "id": 2,
        "name": "Arlene Graves"
      }
    ],
    "greeting": "Hello, Isabel Moran! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4c30e4d4e25dbc6b2",
    "index": 131,
    "guid": "0250232e-74c4-4ec6-96e2-c477daa07516",
    "isActive": true,
    "balance": "$2,117.76",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "brown",
    "name": "Page Flowers",
    "gender": "male",
    "company": "OPTICON",
    "email": "pageflowers@opticon.com",
    "phone": "+1 (904) 591-3000",
    "address": "905 Troutman Street, Osmond, Marshall Islands, 3307",
    "about": "Ea nostrud ad laborum elit. Lorem eiusmod officia nostrud tempor excepteur nulla incididunt occaecat do. Fugiat laborum fugiat ipsum voluptate proident id cillum.\r\n",
    "registered": "2018-10-26T09:19:17 -02:00",
    "latitude": 32.154368,
    "longitude": -22.11682,
    "tags": [
      "velit",
      "minim",
      "reprehenderit",
      "non",
      "ut",
      "excepteur",
      "ipsum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mendoza Wilson"
      },
      {
        "id": 1,
        "name": "Nikki Travis"
      },
      {
        "id": 2,
        "name": "Lorraine Patterson"
      }
    ],
    "greeting": "Hello, Page Flowers! You have 10 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca41b8a471de039899a",
    "index": 132,
    "guid": "28a119a1-3e11-44f9-bcb5-738be2386282",
    "isActive": true,
    "balance": "$3,828.26",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "brown",
    "name": "Holden Dawson",
    "gender": "male",
    "company": "KENEGY",
    "email": "holdendawson@kenegy.com",
    "phone": "+1 (987) 485-2902",
    "address": "539 Maple Avenue, Idamay, Arizona, 5552",
    "about": "Magna tempor commodo ad do nisi sunt culpa fugiat incididunt aliqua id qui excepteur veniam. Tempor occaecat tempor laboris est. Magna magna irure esse sunt in commodo. Sint nisi in cillum id velit commodo officia do exercitation eiusmod consequat eiusmod. Commodo tempor magna amet excepteur irure.\r\n",
    "registered": "2014-07-03T10:35:55 -02:00",
    "latitude": 5.749455,
    "longitude": 31.836524,
    "tags": [
      "amet",
      "consectetur",
      "dolore",
      "officia",
      "culpa",
      "ea",
      "sit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Barrett Justice"
      },
      {
        "id": 1,
        "name": "Workman Rhodes"
      },
      {
        "id": 2,
        "name": "Dolly Berger"
      }
    ],
    "greeting": "Hello, Holden Dawson! You have 1 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4adbe9325f32b57ba",
    "index": 133,
    "guid": "4d3fe5b0-8fbe-45aa-9080-20064aa72aa7",
    "isActive": false,
    "balance": "$3,488.34",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "green",
    "name": "Nell Harmon",
    "gender": "female",
    "company": "MUSAPHICS",
    "email": "nellharmon@musaphics.com",
    "phone": "+1 (951) 553-2764",
    "address": "943 Bedford Avenue, Hartsville/Hartley, Ohio, 9860",
    "about": "Consequat amet nulla excepteur incididunt eu esse excepteur esse proident. Ad esse sunt cillum reprehenderit ea veniam adipisicing est. Ullamco duis Lorem eu irure aliqua deserunt. Magna sunt adipisicing in quis laborum consectetur adipisicing reprehenderit magna id. Voluptate qui deserunt sit elit amet nisi est aliquip. Laboris culpa aliqua in ut nisi irure cupidatat ipsum aliqua id et aliquip duis excepteur.\r\n",
    "registered": "2017-02-01T09:36:18 -01:00",
    "latitude": -10.505039,
    "longitude": -135.444183,
    "tags": [
      "minim",
      "do",
      "excepteur",
      "qui",
      "cillum",
      "ut",
      "dolor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mccoy Sanders"
      },
      {
        "id": 1,
        "name": "Lottie Chen"
      },
      {
        "id": 2,
        "name": "Nolan Henderson"
      }
    ],
    "greeting": "Hello, Nell Harmon! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4e2af682c376b2695",
    "index": 134,
    "guid": "4356671e-d1b1-4377-9829-478ecaa95f92",
    "isActive": true,
    "balance": "$3,030.25",
    "picture": "http://placehold.it/32x32",
    "age": 24,
    "eyeColor": "blue",
    "name": "Sheila Langley",
    "gender": "female",
    "company": "DATAGENE",
    "email": "sheilalangley@datagene.com",
    "phone": "+1 (943) 591-2161",
    "address": "650 Johnson Avenue, Dubois, Virgin Islands, 5269",
    "about": "Do ullamco irure occaecat excepteur exercitation ullamco. Fugiat dolore ullamco dolor consectetur nulla ex dolore officia sint cupidatat qui. Pariatur voluptate magna laborum in duis aliqua. Officia mollit aliqua in consequat nulla reprehenderit.\r\n",
    "registered": "2015-04-26T06:33:29 -02:00",
    "latitude": -25.9003,
    "longitude": 57.63391,
    "tags": [
      "adipisicing",
      "do",
      "non",
      "esse",
      "officia",
      "aliqua",
      "aute"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Kathleen Ellis"
      },
      {
        "id": 1,
        "name": "Etta Conrad"
      },
      {
        "id": 2,
        "name": "Anderson Benton"
      }
    ],
    "greeting": "Hello, Sheila Langley! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca40e0f5b4698b9a455",
    "index": 135,
    "guid": "d3205e9c-9b52-401d-ac9d-5563ce0b8d52",
    "isActive": true,
    "balance": "$1,973.57",
    "picture": "http://placehold.it/32x32",
    "age": 20,
    "eyeColor": "blue",
    "name": "Sandra Mathews",
    "gender": "female",
    "company": "TALKALOT",
    "email": "sandramathews@talkalot.com",
    "phone": "+1 (815) 489-2361",
    "address": "275 Onderdonk Avenue, Gilgo, New Mexico, 8522",
    "about": "Dolor Lorem fugiat quis ipsum dolore consectetur excepteur irure sint. Commodo tempor labore incididunt id qui labore incididunt. Proident Lorem officia minim ea adipisicing do mollit amet mollit quis. Enim nisi ex irure velit anim irure Lorem minim eiusmod labore eiusmod minim. Occaecat eu aute aliquip eiusmod velit enim.\r\n",
    "registered": "2014-02-23T11:05:06 -01:00",
    "latitude": 33.811734,
    "longitude": -134.868362,
    "tags": [
      "sunt",
      "reprehenderit",
      "quis",
      "occaecat",
      "proident",
      "proident",
      "dolore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hilary Peterson"
      },
      {
        "id": 1,
        "name": "Madelyn Galloway"
      },
      {
        "id": 2,
        "name": "Maddox Battle"
      }
    ],
    "greeting": "Hello, Sandra Mathews! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4a6cffdc54c74babb",
    "index": 136,
    "guid": "4ee24d3e-143d-4632-9070-e9a0b6d21138",
    "isActive": true,
    "balance": "$2,926.40",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "green",
    "name": "Hazel Frazier",
    "gender": "female",
    "company": "GINK",
    "email": "hazelfrazier@gink.com",
    "phone": "+1 (879) 526-2168",
    "address": "124 Pierrepont Place, Wyoming, Vermont, 3573",
    "about": "Duis non dolor veniam dolore dolor ipsum veniam sunt amet deserunt elit proident. Ex occaecat magna id aute labore qui ea velit id magna ullamco. Voluptate dolor culpa nisi duis adipisicing exercitation fugiat nulla reprehenderit fugiat pariatur. Lorem enim cillum eiusmod irure voluptate officia nostrud dolor quis nulla duis ut et. Do occaecat non laboris ad quis fugiat. Officia cillum velit laboris officia ex ipsum magna laborum veniam commodo do do laborum dolore. Consequat tempor voluptate occaecat veniam aliquip in ipsum laborum.\r\n",
    "registered": "2017-05-15T11:10:09 -02:00",
    "latitude": -87.519823,
    "longitude": 176.012106,
    "tags": [
      "aute",
      "ad",
      "consectetur",
      "do",
      "ipsum",
      "ex",
      "reprehenderit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Rhonda Burke"
      },
      {
        "id": 1,
        "name": "Darcy Powell"
      },
      {
        "id": 2,
        "name": "Knowles Ramos"
      }
    ],
    "greeting": "Hello, Hazel Frazier! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4440a1e1dfea86066",
    "index": 137,
    "guid": "ac523a8a-33e7-4357-b288-52319f4681a3",
    "isActive": false,
    "balance": "$3,286.15",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "blue",
    "name": "Whitehead Underwood",
    "gender": "male",
    "company": "BLUEGRAIN",
    "email": "whiteheadunderwood@bluegrain.com",
    "phone": "+1 (843) 447-2759",
    "address": "133 Seigel Street, Chesapeake, New Hampshire, 8102",
    "about": "Irure consectetur excepteur nisi veniam officia est ex eu est sunt ut tempor. Excepteur consequat est consectetur incididunt. Non cupidatat tempor pariatur reprehenderit duis eu non elit Lorem do labore mollit sint. Duis in dolore tempor do occaecat irure. Amet enim id eiusmod ea ea dolore quis do laboris ullamco ea sint. Exercitation aliqua mollit nulla aliquip. Ex mollit ea dolore occaecat deserunt occaecat laborum minim.\r\n",
    "registered": "2018-11-14T11:12:43 -01:00",
    "latitude": 7.812046,
    "longitude": 36.722057,
    "tags": [
      "consequat",
      "culpa",
      "ipsum",
      "irure",
      "ex",
      "elit",
      "quis"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Decker Huff"
      },
      {
        "id": 1,
        "name": "Koch Lester"
      },
      {
        "id": 2,
        "name": "Shannon Henry"
      }
    ],
    "greeting": "Hello, Whitehead Underwood! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca47d594c60a19d1bdf",
    "index": 138,
    "guid": "530d08c8-f845-4f76-8920-f31471be1342",
    "isActive": false,
    "balance": "$2,891.83",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "brown",
    "name": "Hodge Oliver",
    "gender": "male",
    "company": "PHARMACON",
    "email": "hodgeoliver@pharmacon.com",
    "phone": "+1 (810) 599-2925",
    "address": "853 Surf Avenue, Nescatunga, Tennessee, 3102",
    "about": "Aute deserunt do magna sint elit ullamco duis nulla ad irure aliqua exercitation consequat dolor. Mollit ipsum officia do reprehenderit sint nisi aliquip cillum enim. Occaecat mollit non non ad cupidatat qui in ad mollit. Sit velit Lorem sit in dolor dolore.\r\n",
    "registered": "2014-09-12T07:14:47 -02:00",
    "latitude": -20.639352,
    "longitude": -132.615791,
    "tags": [
      "cupidatat",
      "velit",
      "aliquip",
      "fugiat",
      "ea",
      "sunt",
      "dolore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Joann Beard"
      },
      {
        "id": 1,
        "name": "Danielle Ballard"
      },
      {
        "id": 2,
        "name": "Baldwin Paul"
      }
    ],
    "greeting": "Hello, Hodge Oliver! You have 7 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4de4ab731c6a8bbfa",
    "index": 139,
    "guid": "1e8145ce-6045-4a72-9dc9-c29e1b5b5262",
    "isActive": false,
    "balance": "$3,758.63",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "green",
    "name": "King Greene",
    "gender": "male",
    "company": "SENTIA",
    "email": "kinggreene@sentia.com",
    "phone": "+1 (980) 476-3125",
    "address": "528 Colonial Court, Wheatfields, Massachusetts, 1420",
    "about": "Deserunt irure commodo enim ea veniam sit incididunt qui consequat in ea amet in occaecat. Eiusmod cupidatat in anim minim labore deserunt. Mollit consectetur consequat minim excepteur veniam magna excepteur.\r\n",
    "registered": "2014-02-05T10:32:07 -01:00",
    "latitude": 77.887372,
    "longitude": 38.299775,
    "tags": [
      "duis",
      "excepteur",
      "officia",
      "mollit",
      "ex",
      "amet",
      "pariatur"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Marian Ayers"
      },
      {
        "id": 1,
        "name": "Wheeler Johnston"
      },
      {
        "id": 2,
        "name": "Hurst Mercado"
      }
    ],
    "greeting": "Hello, King Greene! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4817ec28568d1c018",
    "index": 140,
    "guid": "3e99f0fe-e3c4-477a-bd8a-ecacf8aca8cc",
    "isActive": false,
    "balance": "$1,367.62",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "blue",
    "name": "Benton Fisher",
    "gender": "male",
    "company": "NURPLEX",
    "email": "bentonfisher@nurplex.com",
    "phone": "+1 (872) 549-3445",
    "address": "752 Powers Street, Mooresburg, Pennsylvania, 2975",
    "about": "Sit magna elit tempor velit ea aliquip. Ipsum ullamco nostrud nostrud ad qui proident aliquip labore nisi ea laborum ullamco sunt. Qui labore culpa ad deserunt laboris occaecat velit Lorem tempor aliqua nulla dolor. Consectetur nostrud aute cillum sit sint magna et. Ex pariatur non non deserunt anim id ullamco. Nostrud id amet tempor irure ex consectetur cillum. Eiusmod cillum sit incididunt ipsum eu ut laboris occaecat nulla sit laboris elit enim consectetur.\r\n",
    "registered": "2017-05-11T11:03:33 -02:00",
    "latitude": -28.417237,
    "longitude": -32.447424,
    "tags": [
      "pariatur",
      "sint",
      "velit",
      "ea",
      "nostrud",
      "tempor",
      "adipisicing"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Albert Banks"
      },
      {
        "id": 1,
        "name": "Osborne Clements"
      },
      {
        "id": 2,
        "name": "Raquel Todd"
      }
    ],
    "greeting": "Hello, Benton Fisher! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca48de25cbb8f3ac04e",
    "index": 141,
    "guid": "eb1b033b-3021-4f07-aeed-f6e9ae134c92",
    "isActive": true,
    "balance": "$3,346.05",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "blue",
    "name": "Barrera Barron",
    "gender": "male",
    "company": "ENJOLA",
    "email": "barrerabarron@enjola.com",
    "phone": "+1 (937) 588-2355",
    "address": "348 Blake Avenue, Blackgum, Wyoming, 8439",
    "about": "Amet consectetur consequat qui deserunt. Veniam tempor sunt ullamco Lorem cillum fugiat aute consectetur nostrud eiusmod in in ea. Magna proident magna fugiat dolor. Est Lorem Lorem laborum laboris do proident non voluptate duis duis eiusmod adipisicing. Veniam consequat ex ullamco id dolore mollit.\r\n",
    "registered": "2015-01-08T01:24:45 -01:00",
    "latitude": -44.669236,
    "longitude": -15.415424,
    "tags": [
      "qui",
      "adipisicing",
      "laboris",
      "consequat",
      "tempor",
      "veniam",
      "ipsum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Aisha Bolton"
      },
      {
        "id": 1,
        "name": "Chaney Castaneda"
      },
      {
        "id": 2,
        "name": "Leonor Floyd"
      }
    ],
    "greeting": "Hello, Barrera Barron! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4215bd55f1b2e9dfe",
    "index": 142,
    "guid": "3d06d941-0451-478f-a287-1aaee7cd89c6",
    "isActive": true,
    "balance": "$1,156.13",
    "picture": "http://placehold.it/32x32",
    "age": 37,
    "eyeColor": "blue",
    "name": "Roy Walsh",
    "gender": "male",
    "company": "NETPLODE",
    "email": "roywalsh@netplode.com",
    "phone": "+1 (801) 598-3919",
    "address": "922 Woodhull Street, Cornfields, Palau, 8838",
    "about": "Elit ad Lorem amet aliqua. Exercitation aute Lorem et deserunt fugiat anim occaecat. Irure pariatur consectetur magna dolore elit pariatur. Duis officia consectetur occaecat sit reprehenderit id dolore ullamco veniam anim. Adipisicing aliquip laborum sit eu ex commodo nulla.\r\n",
    "registered": "2014-09-14T02:40:26 -02:00",
    "latitude": 65.017998,
    "longitude": 138.065364,
    "tags": [
      "laboris",
      "proident",
      "dolor",
      "pariatur",
      "quis",
      "esse",
      "enim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Love Nicholson"
      },
      {
        "id": 1,
        "name": "Tricia King"
      },
      {
        "id": 2,
        "name": "Pat Gordon"
      }
    ],
    "greeting": "Hello, Roy Walsh! You have 2 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4eaf261ae9654ad0c",
    "index": 143,
    "guid": "91bd1549-e205-450a-b01a-2728ab56501c",
    "isActive": false,
    "balance": "$2,128.09",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "blue",
    "name": "Blanchard Castro",
    "gender": "male",
    "company": "ISONUS",
    "email": "blanchardcastro@isonus.com",
    "phone": "+1 (909) 590-2892",
    "address": "691 Preston Court, Connerton, American Samoa, 7149",
    "about": "Fugiat pariatur sint mollit aliquip ut. Consequat nulla magna consectetur amet exercitation anim esse nulla. Aute nisi velit amet ipsum in. Sint Lorem elit ad amet magna. Est elit sit ex consectetur aute deserunt. Velit ea proident veniam adipisicing excepteur minim amet dolor non ad Lorem.\r\n",
    "registered": "2016-01-01T02:53:42 -01:00",
    "latitude": -81.693012,
    "longitude": 6.584838,
    "tags": [
      "anim",
      "laboris",
      "laboris",
      "dolore",
      "ad",
      "minim",
      "est"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Dillard Kaufman"
      },
      {
        "id": 1,
        "name": "Nelson Bradshaw"
      },
      {
        "id": 2,
        "name": "Tamera Buckley"
      }
    ],
    "greeting": "Hello, Blanchard Castro! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca44da9d7c2b6e7f104",
    "index": 144,
    "guid": "c73dbd4b-005a-4a95-a972-cd1c1ce7f7df",
    "isActive": true,
    "balance": "$1,868.74",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "blue",
    "name": "Frieda Sloan",
    "gender": "female",
    "company": "PYRAMAX",
    "email": "friedasloan@pyramax.com",
    "phone": "+1 (937) 519-3559",
    "address": "477 Applegate Court, Hillsboro, Rhode Island, 8502",
    "about": "Ipsum ullamco qui adipisicing proident aute mollit nostrud ex anim voluptate. Nulla adipisicing qui sit nisi excepteur cillum veniam aute. Ipsum nisi eu aute laboris occaecat exercitation sit fugiat aliquip adipisicing. Consequat velit do sunt et laborum laborum veniam mollit exercitation ex ex laboris quis culpa. Adipisicing non ea esse consectetur incididunt est labore dolore nisi.\r\n",
    "registered": "2018-07-17T06:18:40 -02:00",
    "latitude": -88.656435,
    "longitude": 170.699736,
    "tags": [
      "deserunt",
      "enim",
      "do",
      "Lorem",
      "non",
      "occaecat",
      "nostrud"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Head Stephenson"
      },
      {
        "id": 1,
        "name": "Weber Berry"
      },
      {
        "id": 2,
        "name": "Hall Atkinson"
      }
    ],
    "greeting": "Hello, Frieda Sloan! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca474467e055cfd3068",
    "index": 145,
    "guid": "c5093c4c-633c-4a3e-8015-79d747591690",
    "isActive": false,
    "balance": "$2,343.31",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "blue",
    "name": "Boyer Carney",
    "gender": "male",
    "company": "HANDSHAKE",
    "email": "boyercarney@handshake.com",
    "phone": "+1 (805) 417-2566",
    "address": "828 Union Avenue, Gouglersville, Montana, 4604",
    "about": "In ad magna voluptate laboris nulla pariatur quis aliquip ea pariatur in non exercitation anim. Deserunt est laborum esse cillum sit. In duis dolore reprehenderit et. Voluptate ut cillum sunt adipisicing ut dolor dolore id consectetur. Deserunt commodo minim nisi pariatur enim dolor aliqua laboris sit cillum. Cupidatat ea eu ut qui. Mollit pariatur nulla voluptate esse quis tempor ullamco sint eu minim cupidatat.\r\n",
    "registered": "2016-05-08T04:01:39 -02:00",
    "latitude": -1.376279,
    "longitude": 104.816403,
    "tags": [
      "pariatur",
      "non",
      "ut",
      "non",
      "voluptate",
      "in",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Debora Branch"
      },
      {
        "id": 1,
        "name": "Calderon Saunders"
      },
      {
        "id": 2,
        "name": "Daniels Mosley"
      }
    ],
    "greeting": "Hello, Boyer Carney! You have 8 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4f54a3c860eb09af4",
    "index": 146,
    "guid": "6b21c7fa-5d4c-4ca5-9bc9-0c8571271f0e",
    "isActive": true,
    "balance": "$3,382.23",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "green",
    "name": "Jamie Velasquez",
    "gender": "female",
    "company": "ESCENTA",
    "email": "jamievelasquez@escenta.com",
    "phone": "+1 (882) 596-2459",
    "address": "768 Henderson Walk, Outlook, Connecticut, 7720",
    "about": "Dolore qui fugiat Lorem Lorem sit aute magna ut eiusmod irure. Aute magna esse adipisicing est non. Sit sint culpa laboris cillum aliquip ad veniam aliquip. Aute laborum culpa ullamco ex et enim. Occaecat veniam officia amet culpa quis velit deserunt. Veniam cillum veniam cillum veniam do elit sint velit. Incididunt enim Lorem quis fugiat aute labore quis.\r\n",
    "registered": "2015-08-04T09:16:59 -02:00",
    "latitude": 44.105447,
    "longitude": -132.989166,
    "tags": [
      "sit",
      "nostrud",
      "officia",
      "proident",
      "anim",
      "fugiat",
      "minim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Brenda Morse"
      },
      {
        "id": 1,
        "name": "Phillips Guerrero"
      },
      {
        "id": 2,
        "name": "Caldwell Goodman"
      }
    ],
    "greeting": "Hello, Jamie Velasquez! You have 2 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4201758545cb85523",
    "index": 147,
    "guid": "81cd6b0d-e077-4531-9aa8-c91b19048119",
    "isActive": true,
    "balance": "$1,480.49",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "brown",
    "name": "Alyssa Hart",
    "gender": "female",
    "company": "VURBO",
    "email": "alyssahart@vurbo.com",
    "phone": "+1 (924) 453-3597",
    "address": "757 Interborough Parkway, Norfolk, Minnesota, 5350",
    "about": "Nisi ea velit nostrud laborum tempor excepteur pariatur commodo aute reprehenderit. Lorem excepteur aliqua proident ipsum. Occaecat sit officia in pariatur est in. Non incididunt amet cillum veniam cupidatat ipsum qui anim pariatur. Amet aliqua officia commodo commodo mollit duis aliqua velit duis in dolore exercitation labore.\r\n",
    "registered": "2014-11-11T08:32:44 -01:00",
    "latitude": 51.65744,
    "longitude": -158.715129,
    "tags": [
      "mollit",
      "do",
      "in",
      "ex",
      "ullamco",
      "dolore",
      "do"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Susie Baker"
      },
      {
        "id": 1,
        "name": "Rosanna Terry"
      },
      {
        "id": 2,
        "name": "Julie Mathis"
      }
    ],
    "greeting": "Hello, Alyssa Hart! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca431f0c3471c831a23",
    "index": 148,
    "guid": "ae1f14eb-267e-4ebe-8dd9-bae69364c783",
    "isActive": false,
    "balance": "$3,349.76",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "blue",
    "name": "Stacie George",
    "gender": "female",
    "company": "BIOLIVE",
    "email": "staciegeorge@biolive.com",
    "phone": "+1 (876) 599-2022",
    "address": "801 Porter Avenue, Taycheedah, North Dakota, 6921",
    "about": "Ad commodo velit est do aute pariatur do qui aliqua ea irure. Elit qui ea mollit reprehenderit sint laboris. Eiusmod esse consectetur incididunt ad eiusmod. Eiusmod elit voluptate voluptate Lorem eu incididunt ut nisi. Cillum ipsum anim veniam excepteur enim nisi Lorem quis aliqua. Consectetur et reprehenderit labore mollit sint commodo do.\r\n",
    "registered": "2018-07-23T07:11:42 -02:00",
    "latitude": 48.216866,
    "longitude": -127.168881,
    "tags": [
      "culpa",
      "laborum",
      "aliqua",
      "exercitation",
      "tempor",
      "et",
      "in"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Judith Mcmahon"
      },
      {
        "id": 1,
        "name": "Millicent Taylor"
      },
      {
        "id": 2,
        "name": "Abigail Hopkins"
      }
    ],
    "greeting": "Hello, Stacie George! You have 7 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca44ae1ebd794b8e741",
    "index": 149,
    "guid": "dfb15a24-ed8c-405e-a5d7-a175b337ed39",
    "isActive": false,
    "balance": "$1,772.25",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "green",
    "name": "Ford Edwards",
    "gender": "male",
    "company": "TRANSLINK",
    "email": "fordedwards@translink.com",
    "phone": "+1 (878) 567-2993",
    "address": "755 Gelston Avenue, Herlong, Idaho, 7384",
    "about": "Anim sunt non ullamco et magna id. Laboris deserunt officia nulla sit eu elit reprehenderit irure nostrud enim incididunt pariatur pariatur eiusmod. Culpa consectetur eiusmod Lorem sit elit non incididunt consectetur adipisicing eiusmod ea amet ea.\r\n",
    "registered": "2014-10-09T01:41:58 -02:00",
    "latitude": 81.414096,
    "longitude": 121.10439,
    "tags": [
      "adipisicing",
      "sint",
      "deserunt",
      "magna",
      "irure",
      "cillum",
      "ullamco"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hale Lee"
      },
      {
        "id": 1,
        "name": "Elaine Randolph"
      },
      {
        "id": 2,
        "name": "Ethel Small"
      }
    ],
    "greeting": "Hello, Ford Edwards! You have 10 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4c77874252375d9ee",
    "index": 150,
    "guid": "c74dfa7d-a1cf-400e-ac3e-2ff76ac2a6b2",
    "isActive": false,
    "balance": "$3,511.27",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "eyeColor": "blue",
    "name": "Lessie Suarez",
    "gender": "female",
    "company": "OLYMPIX",
    "email": "lessiesuarez@olympix.com",
    "phone": "+1 (996) 466-3489",
    "address": "543 Forest Place, Snelling, Nevada, 4914",
    "about": "Aliquip sunt duis incididunt eu velit aliquip quis qui Lorem veniam anim commodo pariatur. Excepteur voluptate officia ipsum ea aliqua consectetur amet veniam. Laborum aliquip nisi cillum aliqua cupidatat. Veniam labore Lorem minim fugiat.\r\n",
    "registered": "2017-03-23T01:20:06 -01:00",
    "latitude": 69.219287,
    "longitude": 6.937446,
    "tags": [
      "nisi",
      "elit",
      "fugiat",
      "eiusmod",
      "sunt",
      "cillum",
      "cupidatat"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Harding Fitzgerald"
      },
      {
        "id": 1,
        "name": "Duran Cole"
      },
      {
        "id": 2,
        "name": "Alana Franco"
      }
    ],
    "greeting": "Hello, Lessie Suarez! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4ff4a04a5e49c6230",
    "index": 151,
    "guid": "19b2c53d-9039-4c9e-9c90-a35313cac504",
    "isActive": true,
    "balance": "$3,882.09",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "eyeColor": "brown",
    "name": "Jimenez Gross",
    "gender": "male",
    "company": "GINKOGENE",
    "email": "jimenezgross@ginkogene.com",
    "phone": "+1 (807) 422-2343",
    "address": "160 Everett Avenue, Frierson, Florida, 6531",
    "about": "Tempor voluptate exercitation voluptate ad aute eu mollit duis incididunt mollit do. Non exercitation commodo ipsum exercitation et non aute. Incididunt fugiat consectetur labore adipisicing nulla occaecat ex. Occaecat duis excepteur ad excepteur et sunt quis excepteur sint amet. Laborum magna ipsum deserunt qui reprehenderit. Id aliqua anim occaecat minim qui qui magna nisi tempor sint consectetur. Nisi et laboris aute velit sunt sunt occaecat cupidatat amet.\r\n",
    "registered": "2015-08-18T06:58:21 -02:00",
    "latitude": -46.90434,
    "longitude": -36.962235,
    "tags": [
      "laboris",
      "in",
      "consequat",
      "amet",
      "Lorem",
      "cupidatat",
      "reprehenderit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Kirsten James"
      },
      {
        "id": 1,
        "name": "Alba Potts"
      },
      {
        "id": 2,
        "name": "Eula Dodson"
      }
    ],
    "greeting": "Hello, Jimenez Gross! You have 6 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca48c9beb80090867ee",
    "index": 152,
    "guid": "ae2c0b09-61c1-4aac-9515-e372050e7169",
    "isActive": false,
    "balance": "$1,202.95",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "brown",
    "name": "Twila Morris",
    "gender": "female",
    "company": "ECOLIGHT",
    "email": "twilamorris@ecolight.com",
    "phone": "+1 (918) 415-3206",
    "address": "644 Ruby Street, Leeper, Delaware, 837",
    "about": "Amet enim commodo consequat minim eu dolore ex eiusmod dolor. Culpa velit veniam voluptate quis consequat excepteur dolore pariatur aliqua. Ex elit ipsum culpa do sint voluptate ad. Laborum minim culpa nostrud incididunt id fugiat eu id excepteur ipsum esse pariatur. Quis minim dolor in excepteur excepteur enim elit. In pariatur nostrud commodo excepteur aliqua.\r\n",
    "registered": "2015-12-13T09:52:40 -01:00",
    "latitude": -60.20021,
    "longitude": -116.578309,
    "tags": [
      "pariatur",
      "ex",
      "deserunt",
      "consectetur",
      "et",
      "eiusmod",
      "cillum"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Chambers Carrillo"
      },
      {
        "id": 1,
        "name": "Sherman Navarro"
      },
      {
        "id": 2,
        "name": "Peck Tillman"
      }
    ],
    "greeting": "Hello, Twila Morris! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca485769ba5fdeb7bba",
    "index": 153,
    "guid": "6c11214f-81d1-493c-acfd-0fc7161046a6",
    "isActive": true,
    "balance": "$2,448.11",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "brown",
    "name": "Delacruz Fulton",
    "gender": "male",
    "company": "XSPORTS",
    "email": "delacruzfulton@xsports.com",
    "phone": "+1 (899) 460-3815",
    "address": "959 Cyrus Avenue, Silkworth, Wisconsin, 9566",
    "about": "Nisi sint anim quis irure dolore pariatur aute aute ut eu do est nostrud. Nulla ullamco commodo anim excepteur. Velit esse tempor occaecat consequat adipisicing nostrud deserunt elit occaecat. Sit laborum commodo labore qui.\r\n",
    "registered": "2015-02-26T12:49:27 -01:00",
    "latitude": -63.437683,
    "longitude": -100.992755,
    "tags": [
      "ea",
      "excepteur",
      "voluptate",
      "labore",
      "do",
      "id",
      "ut"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Bryant Pickett"
      },
      {
        "id": 1,
        "name": "Weeks Chan"
      },
      {
        "id": 2,
        "name": "Reed Davenport"
      }
    ],
    "greeting": "Hello, Delacruz Fulton! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca440b0c4a51821b709",
    "index": 154,
    "guid": "e118287a-ed62-45e9-b16b-be8751e10cbd",
    "isActive": true,
    "balance": "$3,707.63",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "blue",
    "name": "Allyson Mcleod",
    "gender": "female",
    "company": "DIGIPRINT",
    "email": "allysonmcleod@digiprint.com",
    "phone": "+1 (819) 453-3317",
    "address": "751 Mersereau Court, Eastmont, New York, 7853",
    "about": "Do sint officia commodo sunt enim velit enim dolor. Consectetur deserunt id exercitation reprehenderit. Aliquip veniam id pariatur excepteur qui consequat. Dolore ea sint minim quis labore ex aliqua incididunt proident id dolore aliqua non duis.\r\n",
    "registered": "2014-06-16T01:42:21 -02:00",
    "latitude": -26.763822,
    "longitude": 112.576993,
    "tags": [
      "sunt",
      "aliqua",
      "reprehenderit",
      "non",
      "quis",
      "ullamco",
      "sunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Gross Heath"
      },
      {
        "id": 1,
        "name": "Jami Kerr"
      },
      {
        "id": 2,
        "name": "Hays Harrison"
      }
    ],
    "greeting": "Hello, Allyson Mcleod! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca44c3f4a04c06c3dc9",
    "index": 155,
    "guid": "4e41f619-429d-4075-9015-8c4f88875133",
    "isActive": true,
    "balance": "$2,649.15",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "blue",
    "name": "Cooley Newton",
    "gender": "male",
    "company": "PLASMOSIS",
    "email": "cooleynewton@plasmosis.com",
    "phone": "+1 (937) 541-3364",
    "address": "700 Dooley Street, Coldiron, Oklahoma, 3034",
    "about": "Labore mollit fugiat esse sit ipsum est reprehenderit sint laboris proident. Nisi nisi mollit anim officia cupidatat eu qui officia laborum exercitation ut aute amet. Adipisicing commodo sint Lorem labore. Do excepteur est do tempor sint. Laborum sunt ad in sunt ad commodo eiusmod tempor voluptate irure nulla nostrud. Aute aliqua et elit cillum.\r\n",
    "registered": "2016-06-24T03:45:26 -02:00",
    "latitude": -25.922649,
    "longitude": 131.441889,
    "tags": [
      "elit",
      "duis",
      "excepteur",
      "veniam",
      "irure",
      "deserunt",
      "anim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Denise Richards"
      },
      {
        "id": 1,
        "name": "Lewis Weiss"
      },
      {
        "id": 2,
        "name": "Karyn Deleon"
      }
    ],
    "greeting": "Hello, Cooley Newton! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca44cc4d3af48183d36",
    "index": 156,
    "guid": "c7e06d1d-cf47-4c91-a30b-d20ea3f08849",
    "isActive": true,
    "balance": "$3,068.41",
    "picture": "http://placehold.it/32x32",
    "age": 40,
    "eyeColor": "blue",
    "name": "Evans Dunlap",
    "gender": "male",
    "company": "KYAGORO",
    "email": "evansdunlap@kyagoro.com",
    "phone": "+1 (924) 480-3831",
    "address": "333 Coventry Road, Jacksonburg, North Carolina, 6325",
    "about": "Laboris ipsum est commodo excepteur ut ullamco commodo et consectetur ea excepteur. Dolor consequat pariatur laborum mollit cillum. Laborum culpa cillum aliqua ea eiusmod qui in laborum officia pariatur. Velit reprehenderit et magna aliquip elit nostrud laboris exercitation sunt deserunt pariatur ad eiusmod.\r\n",
    "registered": "2014-12-28T12:56:57 -01:00",
    "latitude": 33.520919,
    "longitude": 59.276534,
    "tags": [
      "elit",
      "labore",
      "sunt",
      "laborum",
      "sit",
      "sint",
      "qui"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Estrada Weaver"
      },
      {
        "id": 1,
        "name": "Glass Hamilton"
      },
      {
        "id": 2,
        "name": "Dennis Rice"
      }
    ],
    "greeting": "Hello, Evans Dunlap! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca40e63440d64b602a5",
    "index": 157,
    "guid": "0ca08946-c209-4835-b1ea-83e93e098ed3",
    "isActive": true,
    "balance": "$3,989.46",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "brown",
    "name": "Gilbert Vincent",
    "gender": "male",
    "company": "QUINEX",
    "email": "gilbertvincent@quinex.com",
    "phone": "+1 (815) 514-2898",
    "address": "359 Quentin Street, Bentonville, Arkansas, 5895",
    "about": "Deserunt deserunt ullamco minim velit elit in fugiat proident consectetur non non. Veniam ea anim voluptate ea. Veniam exercitation ipsum commodo voluptate. Velit aute excepteur ex fugiat sit quis nisi consectetur officia. Fugiat elit laborum nostrud Lorem tempor adipisicing exercitation.\r\n",
    "registered": "2016-09-18T02:31:47 -02:00",
    "latitude": 15.446273,
    "longitude": -173.29822,
    "tags": [
      "nostrud",
      "consectetur",
      "labore",
      "adipisicing",
      "magna",
      "tempor",
      "incididunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Gillespie Gamble"
      },
      {
        "id": 1,
        "name": "Perkins Fitzpatrick"
      },
      {
        "id": 2,
        "name": "Sheryl Frost"
      }
    ],
    "greeting": "Hello, Gilbert Vincent! You have 5 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4679f849352f89429",
    "index": 158,
    "guid": "9d183537-17a4-4285-af88-a85abbf8a34b",
    "isActive": false,
    "balance": "$2,022.97",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "eyeColor": "blue",
    "name": "Lawanda Beach",
    "gender": "female",
    "company": "IDETICA",
    "email": "lawandabeach@idetica.com",
    "phone": "+1 (983) 571-2396",
    "address": "488 Junius Street, Beaulieu, Maryland, 4228",
    "about": "Id in amet sint pariatur cupidatat duis. Lorem exercitation deserunt deserunt sint ut laboris proident do ad culpa sint nulla eiusmod veniam. Laborum ex labore deserunt eiusmod occaecat exercitation.\r\n",
    "registered": "2016-01-02T02:07:41 -01:00",
    "latitude": -47.264305,
    "longitude": -127.348954,
    "tags": [
      "duis",
      "ad",
      "fugiat",
      "anim",
      "eiusmod",
      "aliqua",
      "nisi"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Meredith Peters"
      },
      {
        "id": 1,
        "name": "Ann Henson"
      },
      {
        "id": 2,
        "name": "Pollard Herman"
      }
    ],
    "greeting": "Hello, Lawanda Beach! You have 10 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4366c32b540725163",
    "index": 159,
    "guid": "cc4f4c70-fb7f-491e-b718-e405dbc0c667",
    "isActive": true,
    "balance": "$1,852.58",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "brown",
    "name": "Moody Warren",
    "gender": "male",
    "company": "PEARLESSA",
    "email": "moodywarren@pearlessa.com",
    "phone": "+1 (998) 483-2200",
    "address": "408 Garland Court, Tampico, Nebraska, 998",
    "about": "Ad sint culpa irure velit minim dolor voluptate nisi qui. Est in Lorem esse non velit quis. Et veniam laborum ex laborum eiusmod sint ipsum velit. Minim magna eiusmod veniam amet anim id esse eiusmod. Excepteur id ut dolore esse pariatur sit nostrud pariatur dolor. Aute commodo velit enim duis enim et nisi.\r\n",
    "registered": "2017-03-17T05:33:08 -01:00",
    "latitude": 50.146863,
    "longitude": -8.059754,
    "tags": [
      "sunt",
      "dolor",
      "consequat",
      "dolore",
      "velit",
      "non",
      "incididunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Eloise Larsen"
      },
      {
        "id": 1,
        "name": "Rasmussen Foreman"
      },
      {
        "id": 2,
        "name": "Schneider Vaughn"
      }
    ],
    "greeting": "Hello, Moody Warren! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca49cc9af0fed499ab6",
    "index": 160,
    "guid": "f0abbe54-64ed-40db-b2b2-c9968582bbb1",
    "isActive": true,
    "balance": "$1,821.95",
    "picture": "http://placehold.it/32x32",
    "age": 21,
    "eyeColor": "blue",
    "name": "Jeanne Williamson",
    "gender": "female",
    "company": "SOLGAN",
    "email": "jeannewilliamson@solgan.com",
    "phone": "+1 (821) 486-2185",
    "address": "391 Holt Court, Coral, South Carolina, 3748",
    "about": "Pariatur sit veniam enim esse Lorem nulla nostrud exercitation. Anim quis nisi esse elit consectetur ipsum. Qui laborum mollit elit cupidatat mollit nisi ea. Nostrud mollit eu consequat sit ex sunt aute eiusmod eu. Qui esse ullamco do fugiat consequat in aliquip consequat. Exercitation pariatur velit aliqua voluptate exercitation nulla est culpa sint. Do in cupidatat consequat incididunt.\r\n",
    "registered": "2015-02-04T09:45:34 -01:00",
    "latitude": -49.039268,
    "longitude": -141.950298,
    "tags": [
      "labore",
      "anim",
      "cillum",
      "in",
      "sunt",
      "est",
      "labore"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Riddle Conley"
      },
      {
        "id": 1,
        "name": "Morton Mclaughlin"
      },
      {
        "id": 2,
        "name": "Carpenter Donovan"
      }
    ],
    "greeting": "Hello, Jeanne Williamson! You have 1 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca445433cb08fa361aa",
    "index": 161,
    "guid": "7a052410-fa4f-40fe-a8a1-7bffbf1c01ed",
    "isActive": false,
    "balance": "$1,206.63",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "brown",
    "name": "Esperanza Lynn",
    "gender": "female",
    "company": "ASSISTIA",
    "email": "esperanzalynn@assistia.com",
    "phone": "+1 (809) 501-2247",
    "address": "476 Cherry Street, Conway, California, 5486",
    "about": "Et adipisicing nostrud aliqua tempor proident proident nostrud magna quis. Est mollit ipsum culpa deserunt dolor cupidatat amet commodo enim sint duis aute. Quis sint sint labore tempor laborum eu reprehenderit velit fugiat sit anim ad. Elit in cillum sunt anim velit voluptate laboris.\r\n",
    "registered": "2014-02-07T11:17:16 -01:00",
    "latitude": 34.530088,
    "longitude": -2.255467,
    "tags": [
      "minim",
      "nostrud",
      "ullamco",
      "aliqua",
      "esse",
      "nostrud",
      "adipisicing"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Frost Reid"
      },
      {
        "id": 1,
        "name": "Faith Butler"
      },
      {
        "id": 2,
        "name": "Teri Gomez"
      }
    ],
    "greeting": "Hello, Esperanza Lynn! You have 8 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4ad80da419613aa79",
    "index": 162,
    "guid": "6266542e-bc8d-4e70-b72e-62916781e4a1",
    "isActive": false,
    "balance": "$3,824.03",
    "picture": "http://placehold.it/32x32",
    "age": 29,
    "eyeColor": "blue",
    "name": "Marietta Weber",
    "gender": "female",
    "company": "NURALI",
    "email": "mariettaweber@nurali.com",
    "phone": "+1 (908) 539-3246",
    "address": "849 Gotham Avenue, Logan, Alabama, 2282",
    "about": "Laboris aliquip aliquip commodo ullamco ea dolore eiusmod incididunt nostrud. Ex eiusmod sit ipsum et esse cillum aliqua sunt aliquip nisi exercitation qui. Proident velit eiusmod dolor enim cillum eiusmod sint officia aliquip.\r\n",
    "registered": "2015-04-26T07:31:32 -02:00",
    "latitude": -68.077051,
    "longitude": 96.798471,
    "tags": [
      "consectetur",
      "ea",
      "eiusmod",
      "ullamco",
      "magna",
      "ullamco",
      "exercitation"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Beard Sexton"
      },
      {
        "id": 1,
        "name": "Polly Dominguez"
      },
      {
        "id": 2,
        "name": "Franco Andrews"
      }
    ],
    "greeting": "Hello, Marietta Weber! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4939dc65295c1ec21",
    "index": 163,
    "guid": "de464a3e-6140-4f7b-bb92-e33e1f9ed184",
    "isActive": false,
    "balance": "$3,410.87",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "green",
    "name": "Mandy Lowe",
    "gender": "female",
    "company": "APEXIA",
    "email": "mandylowe@apexia.com",
    "phone": "+1 (864) 477-2809",
    "address": "222 Ivan Court, Madaket, Kentucky, 5812",
    "about": "Ipsum officia reprehenderit cillum minim deserunt. Laboris excepteur cillum nulla aliqua do occaecat ipsum veniam quis nulla minim enim labore. Proident sint amet deserunt commodo. Sunt sint mollit do cillum tempor voluptate tempor sunt dolor et. Ut aliqua aute laboris consectetur eiusmod consequat ea occaecat aliquip cupidatat veniam. Incididunt nostrud eu do dolor laboris aliqua voluptate est do enim ut reprehenderit nisi.\r\n",
    "registered": "2014-01-01T01:02:54 -01:00",
    "latitude": -19.211721,
    "longitude": 39.417175,
    "tags": [
      "in",
      "eiusmod",
      "minim",
      "cupidatat",
      "Lorem",
      "elit",
      "sunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Katrina Randall"
      },
      {
        "id": 1,
        "name": "Bridges Lang"
      },
      {
        "id": 2,
        "name": "Kimberley Boyer"
      }
    ],
    "greeting": "Hello, Mandy Lowe! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4be2bbabbc733b25e",
    "index": 164,
    "guid": "70d85d9e-6933-4ff7-a649-c8bb7f845028",
    "isActive": true,
    "balance": "$3,310.98",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "eyeColor": "brown",
    "name": "Crane Solis",
    "gender": "male",
    "company": "EXOVENT",
    "email": "cranesolis@exovent.com",
    "phone": "+1 (932) 519-2935",
    "address": "503 Montague Street, Edinburg, Louisiana, 3963",
    "about": "Aute cupidatat et quis Lorem aliqua sit et minim. Commodo in adipisicing consectetur proident amet deserunt consequat Lorem magna sunt irure adipisicing aliqua. Velit excepteur ipsum cupidatat quis. Officia consequat do amet esse elit occaecat fugiat. Excepteur exercitation elit consequat velit et aliquip elit commodo mollit eiusmod eu duis ea do. Ad consectetur aliqua laboris commodo pariatur exercitation nostrud sunt laborum mollit laborum proident est ut. Ea ea ad fugiat in labore nostrud quis nulla ea sit est irure veniam.\r\n",
    "registered": "2017-10-01T10:53:48 -02:00",
    "latitude": 63.775636,
    "longitude": 138.443954,
    "tags": [
      "ad",
      "nostrud",
      "occaecat",
      "aliquip",
      "ex",
      "do",
      "adipisicing"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Elva Bass"
      },
      {
        "id": 1,
        "name": "Deena Roach"
      },
      {
        "id": 2,
        "name": "Downs Summers"
      }
    ],
    "greeting": "Hello, Crane Solis! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca485f9db73a6a17d9f",
    "index": 165,
    "guid": "fb205cd6-0b67-4b6b-baad-2b02cd560787",
    "isActive": false,
    "balance": "$2,256.60",
    "picture": "http://placehold.it/32x32",
    "age": 26,
    "eyeColor": "blue",
    "name": "Carter Fox",
    "gender": "male",
    "company": "TROLLERY",
    "email": "carterfox@trollery.com",
    "phone": "+1 (890) 591-2673",
    "address": "136 Amber Street, Chaparrito, Guam, 5115",
    "about": "Ut proident veniam ut id labore reprehenderit minim eu esse officia. Excepteur irure anim enim dolor commodo deserunt ad nulla ullamco. In nostrud sit velit ipsum consectetur ad reprehenderit esse culpa ex. Eu dolor sunt velit ea.\r\n",
    "registered": "2017-03-26T06:25:34 -02:00",
    "latitude": 24.062696,
    "longitude": 62.362102,
    "tags": [
      "ea",
      "Lorem",
      "ea",
      "ex",
      "incididunt",
      "eu",
      "reprehenderit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Mullen Kirk"
      },
      {
        "id": 1,
        "name": "Mcdonald Brown"
      },
      {
        "id": 2,
        "name": "Jacquelyn Romero"
      }
    ],
    "greeting": "Hello, Carter Fox! You have 1 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4d8f0c9056397f3ae",
    "index": 166,
    "guid": "b4ba849a-15cd-44ab-920c-db2130e820f3",
    "isActive": true,
    "balance": "$2,915.55",
    "picture": "http://placehold.it/32x32",
    "age": 25,
    "eyeColor": "green",
    "name": "Lily Griffin",
    "gender": "female",
    "company": "CUBICIDE",
    "email": "lilygriffin@cubicide.com",
    "phone": "+1 (951) 579-2225",
    "address": "893 Cox Place, Goodville, South Dakota, 9065",
    "about": "Ullamco nulla irure consequat anim in do sunt nulla velit ut sunt tempor. Veniam cupidatat ullamco duis nostrud. Occaecat nulla sunt aute magna ex non consequat. Proident eu sunt id pariatur est sint nulla aliquip. Deserunt ea dolor mollit irure do et reprehenderit. Nisi proident adipisicing reprehenderit veniam laborum sit tempor ex do sit reprehenderit labore labore proident. Officia proident eu quis elit pariatur.\r\n",
    "registered": "2017-07-11T04:37:15 -02:00",
    "latitude": 27.568553,
    "longitude": 77.382107,
    "tags": [
      "ut",
      "ea",
      "eu",
      "id",
      "sint",
      "sint",
      "exercitation"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Marjorie Anderson"
      },
      {
        "id": 1,
        "name": "Rodriquez Christian"
      },
      {
        "id": 2,
        "name": "Bates Foley"
      }
    ],
    "greeting": "Hello, Lily Griffin! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4ef8e2f675687a084",
    "index": 167,
    "guid": "997db142-5f24-430d-8def-5a3a74ad33a7",
    "isActive": true,
    "balance": "$3,497.48",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "blue",
    "name": "Cross Jennings",
    "gender": "male",
    "company": "SNORUS",
    "email": "crossjennings@snorus.com",
    "phone": "+1 (927) 582-2140",
    "address": "699 Tapscott Avenue, Marion, Federated States Of Micronesia, 5427",
    "about": "Eu voluptate tempor adipisicing id irure officia id proident eu aliqua consequat. Proident laboris cillum ea nulla reprehenderit voluptate exercitation. Ex ex velit ullamco in reprehenderit Lorem occaecat.\r\n",
    "registered": "2016-07-26T06:37:43 -02:00",
    "latitude": 83.322241,
    "longitude": -79.557996,
    "tags": [
      "ut",
      "mollit",
      "fugiat",
      "pariatur",
      "officia",
      "eiusmod",
      "minim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Frye Miranda"
      },
      {
        "id": 1,
        "name": "Imelda Sosa"
      },
      {
        "id": 2,
        "name": "Greene Nolan"
      }
    ],
    "greeting": "Hello, Cross Jennings! You have 9 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca47130776dd3b1c658",
    "index": 168,
    "guid": "30fad231-5d36-4e46-a6bf-5de5fed529f6",
    "isActive": true,
    "balance": "$3,005.34",
    "picture": "http://placehold.it/32x32",
    "age": 28,
    "eyeColor": "brown",
    "name": "Juliana Vinson",
    "gender": "female",
    "company": "POWERNET",
    "email": "julianavinson@powernet.com",
    "phone": "+1 (854) 439-3078",
    "address": "114 Prospect Avenue, Dixie, Mississippi, 7164",
    "about": "Elit veniam aute commodo aute nulla sit. Nisi sit ad quis in aliquip. Enim consequat irure qui ex ex eu ea id dolor id voluptate deserunt nostrud sit. Commodo non aliquip qui duis cupidatat laboris minim duis. Enim et deserunt dolore nisi voluptate exercitation quis.\r\n",
    "registered": "2017-07-21T11:24:39 -02:00",
    "latitude": -4.616525,
    "longitude": -30.707886,
    "tags": [
      "officia",
      "mollit",
      "Lorem",
      "elit",
      "ex",
      "cillum",
      "commodo"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Benita Doyle"
      },
      {
        "id": 1,
        "name": "Roseann Simpson"
      },
      {
        "id": 2,
        "name": "Elma Tyler"
      }
    ],
    "greeting": "Hello, Juliana Vinson! You have 1 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca411b235a71f7e0c56",
    "index": 169,
    "guid": "94c1cd0c-fae4-4b28-84cd-aec25e28e3e1",
    "isActive": true,
    "balance": "$1,269.69",
    "picture": "http://placehold.it/32x32",
    "age": 38,
    "eyeColor": "blue",
    "name": "Tracey Yang",
    "gender": "female",
    "company": "GLOBOIL",
    "email": "traceyyang@globoil.com",
    "phone": "+1 (983) 470-3917",
    "address": "208 Herkimer Place, Courtland, Northern Mariana Islands, 9721",
    "about": "Eu nulla ad cupidatat ut veniam reprehenderit quis laboris adipisicing ullamco adipisicing ullamco. Mollit duis Lorem mollit qui fugiat quis laboris commodo quis excepteur aliquip. Eu commodo qui reprehenderit enim pariatur culpa fugiat proident exercitation nulla in velit Lorem.\r\n",
    "registered": "2018-01-06T12:10:59 -01:00",
    "latitude": -26.564329,
    "longitude": 97.26221,
    "tags": [
      "fugiat",
      "ea",
      "adipisicing",
      "duis",
      "ad",
      "anim",
      "mollit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Kellie Savage"
      },
      {
        "id": 1,
        "name": "Mays Gill"
      },
      {
        "id": 2,
        "name": "Abby Sutton"
      }
    ],
    "greeting": "Hello, Tracey Yang! You have 4 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4fde5331582c688a2",
    "index": 170,
    "guid": "a0a6a480-1310-4eba-a7f0-0776b3be972c",
    "isActive": true,
    "balance": "$1,656.35",
    "picture": "http://placehold.it/32x32",
    "age": 22,
    "eyeColor": "green",
    "name": "Valerie Price",
    "gender": "female",
    "company": "MINGA",
    "email": "valerieprice@minga.com",
    "phone": "+1 (880) 539-3817",
    "address": "274 Kaufman Place, Ferney, Hawaii, 9664",
    "about": "Exercitation sint sint nisi aute ex consequat esse aliquip enim sit consequat irure ut. Esse incididunt est cupidatat aliquip veniam deserunt ea id sunt duis eiusmod ex commodo. Anim excepteur ullamco cillum amet.\r\n",
    "registered": "2017-12-17T09:26:52 -01:00",
    "latitude": -57.150785,
    "longitude": -90.532576,
    "tags": [
      "incididunt",
      "nostrud",
      "elit",
      "velit",
      "occaecat",
      "veniam",
      "voluptate"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Melton Riddle"
      },
      {
        "id": 1,
        "name": "Dejesus Bailey"
      },
      {
        "id": 2,
        "name": "Mason Bond"
      }
    ],
    "greeting": "Hello, Valerie Price! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca42ab95c5c8e11d345",
    "index": 171,
    "guid": "969b3619-a2f9-4bee-8f19-4bfc0578505e",
    "isActive": false,
    "balance": "$3,365.87",
    "picture": "http://placehold.it/32x32",
    "age": 24,
    "eyeColor": "blue",
    "name": "Teresa Stanton",
    "gender": "female",
    "company": "ROBOID",
    "email": "teresastanton@roboid.com",
    "phone": "+1 (981) 484-2615",
    "address": "116 Brooklyn Avenue, Nipinnawasee, Puerto Rico, 9765",
    "about": "In ullamco ut Lorem exercitation voluptate aute in irure proident. Ex consectetur culpa incididunt do esse ipsum velit ad. Nostrud aliquip eu anim reprehenderit exercitation nostrud qui ullamco voluptate adipisicing aute aliqua eiusmod. Eu irure ex elit et Lorem sunt consequat laborum culpa do culpa consequat.\r\n",
    "registered": "2015-04-14T10:40:10 -02:00",
    "latitude": -77.448699,
    "longitude": 118.676635,
    "tags": [
      "ea",
      "esse",
      "ullamco",
      "ut",
      "pariatur",
      "enim",
      "deserunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Joanna Sims"
      },
      {
        "id": 1,
        "name": "Pace Copeland"
      },
      {
        "id": 2,
        "name": "Eugenia Glover"
      }
    ],
    "greeting": "Hello, Teresa Stanton! You have 8 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4ab8495b909f40032",
    "index": 172,
    "guid": "012a8fe7-44c7-4875-b6a8-245138427157",
    "isActive": false,
    "balance": "$3,235.78",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "brown",
    "name": "Fowler Mays",
    "gender": "male",
    "company": "RAMJOB",
    "email": "fowlermays@ramjob.com",
    "phone": "+1 (913) 428-3185",
    "address": "774 Hope Street, Stevens, West Virginia, 2091",
    "about": "Cillum in nostrud dolor incididunt magna ullamco excepteur. Ut culpa nisi eiusmod ex consectetur culpa do ut reprehenderit. Amet magna deserunt irure sit pariatur nostrud labore culpa laborum deserunt ipsum commodo sint non.\r\n",
    "registered": "2018-09-05T07:18:02 -02:00",
    "latitude": -5.963694,
    "longitude": 155.838688,
    "tags": [
      "velit",
      "nisi",
      "id",
      "proident",
      "eiusmod",
      "pariatur",
      "Lorem"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Romero Knight"
      },
      {
        "id": 1,
        "name": "Sellers Maldonado"
      },
      {
        "id": 2,
        "name": "Roman Hickman"
      }
    ],
    "greeting": "Hello, Fowler Mays! You have 3 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca442700e400f000659",
    "index": 173,
    "guid": "e689d4d4-f941-494e-b38e-feced3fd368d",
    "isActive": true,
    "balance": "$1,704.85",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "eyeColor": "brown",
    "name": "Mooney Finch",
    "gender": "male",
    "company": "NEXGENE",
    "email": "mooneyfinch@nexgene.com",
    "phone": "+1 (918) 451-2309",
    "address": "413 Tudor Terrace, Boyd, Missouri, 6847",
    "about": "Ullamco do exercitation voluptate mollit amet in velit ex excepteur duis sunt. Culpa irure sint nisi aute aliqua minim voluptate elit magna Lorem dolor. Tempor quis occaecat culpa consectetur cupidatat reprehenderit dolore eiusmod sit magna Lorem nulla quis ea. Veniam ex nulla labore Lorem sint sit Lorem sint nulla.\r\n",
    "registered": "2015-04-26T10:12:10 -02:00",
    "latitude": 84.062772,
    "longitude": -94.367257,
    "tags": [
      "labore",
      "in",
      "pariatur",
      "labore",
      "voluptate",
      "labore",
      "minim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Bolton Fischer"
      },
      {
        "id": 1,
        "name": "Cortez Melendez"
      },
      {
        "id": 2,
        "name": "Sutton Soto"
      }
    ],
    "greeting": "Hello, Mooney Finch! You have 3 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca49a2732d5b5f2c865",
    "index": 174,
    "guid": "bbb7ef94-9f82-4357-9204-290de41c9235",
    "isActive": true,
    "balance": "$2,926.60",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "brown",
    "name": "Shauna Tyson",
    "gender": "female",
    "company": "ZENTURY",
    "email": "shaunatyson@zentury.com",
    "phone": "+1 (821) 501-2853",
    "address": "110 Crescent Street, Independence, Colorado, 3353",
    "about": "Velit cillum minim magna in in. Dolore deserunt tempor nostrud veniam minim ex minim culpa cillum magna duis est. Aute id ullamco consectetur amet adipisicing consequat cillum. Voluptate nostrud Lorem esse exercitation nostrud qui proident. In fugiat fugiat proident dolor labore nulla excepteur. Velit ad labore aliqua incididunt laborum pariatur ad amet dolor proident ut. Proident et cillum excepteur culpa tempor in laborum.\r\n",
    "registered": "2014-06-14T12:41:45 -02:00",
    "latitude": 83.429197,
    "longitude": 133.138977,
    "tags": [
      "qui",
      "ad",
      "aute",
      "ea",
      "in",
      "dolore",
      "deserunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Chrystal Drake"
      },
      {
        "id": 1,
        "name": "Coleman Velez"
      },
      {
        "id": 2,
        "name": "Angie Vargas"
      }
    ],
    "greeting": "Hello, Shauna Tyson! You have 6 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4f7924140565ce47f",
    "index": 175,
    "guid": "0feab4e8-3f87-48df-901b-6ac7780846bc",
    "isActive": true,
    "balance": "$3,103.20",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "blue",
    "name": "Francesca Rich",
    "gender": "female",
    "company": "GEOFORM",
    "email": "francescarich@geoform.com",
    "phone": "+1 (847) 497-3003",
    "address": "104 Norman Avenue, Moscow, Alaska, 5277",
    "about": "Cillum nulla pariatur fugiat occaecat amet. Do aliquip pariatur ex amet deserunt. Ipsum velit nisi et officia est sit. Velit ullamco ea duis consequat velit. Cillum duis aute officia eu et commodo sint elit adipisicing sit. Eu cillum commodo in eiusmod sint Lorem cillum deserunt.\r\n",
    "registered": "2017-04-27T08:45:56 -02:00",
    "latitude": -59.105057,
    "longitude": 97.551442,
    "tags": [
      "dolor",
      "fugiat",
      "culpa",
      "ipsum",
      "magna",
      "enim",
      "magna"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Gill Mccoy"
      },
      {
        "id": 1,
        "name": "Roach Charles"
      },
      {
        "id": 2,
        "name": "Rice Francis"
      }
    ],
    "greeting": "Hello, Francesca Rich! You have 8 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca42afe11852e40ab95",
    "index": 176,
    "guid": "438e9405-9141-4f30-a852-a453ccd39c82",
    "isActive": true,
    "balance": "$2,177.31",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "blue",
    "name": "Mari Mason",
    "gender": "female",
    "company": "XLEEN",
    "email": "marimason@xleen.com",
    "phone": "+1 (894) 500-3755",
    "address": "670 Bushwick Place, Savage, Utah, 7859",
    "about": "Reprehenderit laborum irure dolor ut sint non anim in in commodo sunt ex ipsum est. Esse magna consectetur officia consequat id. Voluptate occaecat tempor nisi ullamco pariatur ad non eiusmod proident ea voluptate aliquip magna dolore. Ea nostrud anim magna in esse anim. Minim quis ea proident ullamco laborum consectetur proident consectetur. Eu ullamco nostrud nulla adipisicing in pariatur commodo excepteur velit adipisicing qui incididunt. Lorem laboris ut cillum anim dolor magna quis enim culpa do sunt.\r\n",
    "registered": "2018-03-03T03:09:31 -01:00",
    "latitude": -76.715431,
    "longitude": 11.587178,
    "tags": [
      "dolore",
      "laboris",
      "excepteur",
      "sunt",
      "qui",
      "et",
      "id"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Kathrine Patrick"
      },
      {
        "id": 1,
        "name": "Blanche Mccormick"
      },
      {
        "id": 2,
        "name": "Myrna Higgins"
      }
    ],
    "greeting": "Hello, Mari Mason! You have 3 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4796eb59bc2652648",
    "index": 177,
    "guid": "02a1be7c-b402-495e-9879-0e977aee26fa",
    "isActive": false,
    "balance": "$2,468.55",
    "picture": "http://placehold.it/32x32",
    "age": 33,
    "eyeColor": "green",
    "name": "Levine Contreras",
    "gender": "male",
    "company": "CRUSTATIA",
    "email": "levinecontreras@crustatia.com",
    "phone": "+1 (904) 589-2418",
    "address": "424 Crawford Avenue, Hiwasse, Washington, 2087",
    "about": "Exercitation officia ex laborum veniam mollit elit aliquip. In amet aute commodo ex exercitation exercitation. Sit sit velit qui officia ullamco tempor ex.\r\n",
    "registered": "2015-01-20T10:07:03 -01:00",
    "latitude": -4.923854,
    "longitude": -162.205403,
    "tags": [
      "adipisicing",
      "officia",
      "id",
      "ullamco",
      "voluptate",
      "mollit",
      "tempor"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Moore Mcdaniel"
      },
      {
        "id": 1,
        "name": "Ingrid Finley"
      },
      {
        "id": 2,
        "name": "Richmond Shannon"
      }
    ],
    "greeting": "Hello, Levine Contreras! You have 10 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca4520f747db7fa794d",
    "index": 178,
    "guid": "54f3d19f-7211-469a-aa33-18d855b4e247",
    "isActive": false,
    "balance": "$2,412.34",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "brown",
    "name": "Margret Obrien",
    "gender": "female",
    "company": "KAGE",
    "email": "margretobrien@kage.com",
    "phone": "+1 (877) 550-2653",
    "address": "843 Oceanic Avenue, Lookingglass, Iowa, 9319",
    "about": "Esse ad non in esse duis eiusmod mollit proident laborum laboris tempor irure aliqua sunt. Elit nostrud ut excepteur est dolor elit. Nisi commodo occaecat excepteur sit ut.\r\n",
    "registered": "2018-02-23T05:54:03 -01:00",
    "latitude": 88.255318,
    "longitude": -11.991078,
    "tags": [
      "eu",
      "est",
      "enim",
      "cillum",
      "aliquip",
      "in",
      "proident"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Debbie Gay"
      },
      {
        "id": 1,
        "name": "Misty Ward"
      },
      {
        "id": 2,
        "name": "Erica Ratliff"
      }
    ],
    "greeting": "Hello, Margret Obrien! You have 8 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4ea0133b5a74e230e",
    "index": 179,
    "guid": "06e8ad7b-d7f4-4d8a-9390-3e590b439e83",
    "isActive": true,
    "balance": "$1,801.42",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "green",
    "name": "Geraldine Wolf",
    "gender": "female",
    "company": "BYTREX",
    "email": "geraldinewolf@bytrex.com",
    "phone": "+1 (807) 524-2760",
    "address": "724 Brown Street, Trona, Kansas, 1635",
    "about": "Consequat sit anim adipisicing exercitation in non commodo qui amet laboris. Aute consequat do cillum cillum reprehenderit incididunt commodo sunt est elit. Laboris proident cupidatat proident do labore. Ad deserunt anim excepteur incididunt. Tempor consequat eiusmod mollit eu qui duis voluptate sunt ut anim.\r\n",
    "registered": "2014-11-24T05:13:20 -01:00",
    "latitude": -89.803968,
    "longitude": -123.962619,
    "tags": [
      "do",
      "adipisicing",
      "eiusmod",
      "commodo",
      "occaecat",
      "quis",
      "do"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Dodson Ingram"
      },
      {
        "id": 1,
        "name": "Vicky Acosta"
      },
      {
        "id": 2,
        "name": "Monroe Morrison"
      }
    ],
    "greeting": "Hello, Geraldine Wolf! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca44ecdc9457ca34e35",
    "index": 180,
    "guid": "8951dddd-60a9-4088-95d0-459977d27009",
    "isActive": true,
    "balance": "$3,797.82",
    "picture": "http://placehold.it/32x32",
    "age": 32,
    "eyeColor": "blue",
    "name": "Rhoda Horton",
    "gender": "female",
    "company": "OVERPLEX",
    "email": "rhodahorton@overplex.com",
    "phone": "+1 (864) 448-3618",
    "address": "668 Fleet Street, Detroit, Texas, 8880",
    "about": "Irure commodo nostrud voluptate deserunt dolor nulla anim amet tempor officia. Non nisi non laboris id minim dolor esse. Non aliqua sint ad nostrud proident nisi aliqua non aliqua incididunt. Exercitation eiusmod elit ex irure cillum incididunt adipisicing duis aliquip.\r\n",
    "registered": "2016-06-14T11:39:40 -02:00",
    "latitude": -31.290992,
    "longitude": 71.624212,
    "tags": [
      "nulla",
      "in",
      "enim",
      "aute",
      "do",
      "aliqua",
      "commodo"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Walter Scott"
      },
      {
        "id": 1,
        "name": "Julianne Downs"
      },
      {
        "id": 2,
        "name": "Valenzuela Levine"
      }
    ],
    "greeting": "Hello, Rhoda Horton! You have 5 unread messages.",
    "favoriteFruit": "apple"
  },
  {
    "_id": "5bf07ca408c123aec03204a8",
    "index": 181,
    "guid": "38163aee-71a1-415d-8f8e-dac10cce25ee",
    "isActive": false,
    "balance": "$3,222.29",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "brown",
    "name": "Thomas Bradford",
    "gender": "male",
    "company": "OATFARM",
    "email": "thomasbradford@oatfarm.com",
    "phone": "+1 (837) 566-3207",
    "address": "966 Vandervoort Avenue, Sunnyside, Illinois, 3825",
    "about": "Ea eu excepteur excepteur mollit commodo. Voluptate excepteur aute sit voluptate. Velit ipsum veniam elit sint officia dolor esse. Pariatur fugiat ex anim officia minim dolore qui.\r\n",
    "registered": "2017-04-11T04:16:17 -02:00",
    "latitude": 30.065242,
    "longitude": -86.919652,
    "tags": [
      "est",
      "excepteur",
      "duis",
      "sit",
      "laboris",
      "sunt",
      "nisi"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hansen Farley"
      },
      {
        "id": 1,
        "name": "Wall Dudley"
      },
      {
        "id": 2,
        "name": "Greer Blackburn"
      }
    ],
    "greeting": "Hello, Thomas Bradford! You have 10 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4d5ec2faa39ffe800",
    "index": 182,
    "guid": "20dbf6c0-83b1-4c15-90f1-57426566440b",
    "isActive": true,
    "balance": "$1,161.18",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "blue",
    "name": "Gregory Wheeler",
    "gender": "male",
    "company": "NIKUDA",
    "email": "gregorywheeler@nikuda.com",
    "phone": "+1 (877) 522-3224",
    "address": "682 Knapp Street, Temperanceville, Virginia, 2125",
    "about": "Lorem et esse consequat elit reprehenderit incididunt ea aute. Consectetur in deserunt minim enim Lorem culpa consectetur deserunt elit ipsum qui et. Excepteur in Lorem nulla sunt quis culpa veniam ipsum et. Culpa labore aliquip nisi enim. Aliquip eiusmod mollit proident id.\r\n",
    "registered": "2018-06-16T06:13:32 -02:00",
    "latitude": 61.495981,
    "longitude": -8.408251,
    "tags": [
      "aliqua",
      "dolore",
      "proident",
      "et",
      "laborum",
      "esse",
      "proident"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Wagner Sears"
      },
      {
        "id": 1,
        "name": "Riggs Perez"
      },
      {
        "id": 2,
        "name": "Lesley Hernandez"
      }
    ],
    "greeting": "Hello, Gregory Wheeler! You have 2 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4a574ad1ceb898a7f",
    "index": 183,
    "guid": "cb2e6049-d1fb-4bb6-93d6-4c98b0b467d8",
    "isActive": false,
    "balance": "$1,273.81",
    "picture": "http://placehold.it/32x32",
    "age": 27,
    "eyeColor": "blue",
    "name": "Ruth Owens",
    "gender": "female",
    "company": "CONFERIA",
    "email": "ruthowens@conferia.com",
    "phone": "+1 (817) 469-3648",
    "address": "980 Harway Avenue, Barstow, Maine, 1250",
    "about": "Veniam reprehenderit nulla laboris enim aliqua. Labore tempor magna dolor nisi id dolor voluptate esse sunt nostrud. Veniam enim sint eiusmod enim labore. Occaecat voluptate id do eu eu aliqua adipisicing culpa commodo incididunt officia sint ut. Enim id reprehenderit ad adipisicing duis officia exercitation veniam.\r\n",
    "registered": "2018-02-19T05:06:36 -01:00",
    "latitude": 24.624132,
    "longitude": -0.601672,
    "tags": [
      "dolore",
      "labore",
      "enim",
      "sunt",
      "in",
      "commodo",
      "reprehenderit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Haney Lopez"
      },
      {
        "id": 1,
        "name": "Molly Brennan"
      },
      {
        "id": 2,
        "name": "Buchanan Holman"
      }
    ],
    "greeting": "Hello, Ruth Owens! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4b058b53f12b91dd7",
    "index": 184,
    "guid": "ebb21957-d246-412b-87c0-f42987b4b476",
    "isActive": false,
    "balance": "$2,490.28",
    "picture": "http://placehold.it/32x32",
    "age": 39,
    "eyeColor": "green",
    "name": "Pearlie Emerson",
    "gender": "female",
    "company": "CONJURICA",
    "email": "pearlieemerson@conjurica.com",
    "phone": "+1 (915) 523-2047",
    "address": "328 Turner Place, Eastvale, Oregon, 9690",
    "about": "Ullamco occaecat deserunt exercitation mollit non sit veniam proident dolor aliquip voluptate irure fugiat sint. Occaecat ut sunt qui quis cillum labore ipsum non tempor nostrud anim mollit laboris. Ullamco veniam excepteur consequat pariatur deserunt eiusmod mollit sunt laboris do et labore. Et consectetur dolore nulla sit exercitation fugiat excepteur eu et aute excepteur. Est occaecat pariatur ex fugiat reprehenderit enim officia sit cillum minim. Qui in ex voluptate sunt quis incididunt. Nisi nisi est reprehenderit consequat cupidatat eiusmod velit.\r\n",
    "registered": "2017-09-30T07:36:51 -02:00",
    "latitude": -12.335534,
    "longitude": 122.159093,
    "tags": [
      "minim",
      "culpa",
      "esse",
      "sint",
      "nisi",
      "et",
      "adipisicing"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Gonzalez Pitts"
      },
      {
        "id": 1,
        "name": "Klein Kramer"
      },
      {
        "id": 2,
        "name": "Woodard Cantrell"
      }
    ],
    "greeting": "Hello, Pearlie Emerson! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca454816dd9f5ecccca",
    "index": 185,
    "guid": "daaefdab-9bd9-4c9b-92b7-3fc17176e82b",
    "isActive": false,
    "balance": "$1,216.13",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "brown",
    "name": "Boone Burnett",
    "gender": "male",
    "company": "VALPREAL",
    "email": "booneburnett@valpreal.com",
    "phone": "+1 (898) 449-3235",
    "address": "202 Bleecker Street, Clay, New Jersey, 1488",
    "about": "Do velit sint cupidatat occaecat irure voluptate mollit. Id sint quis ea exercitation consectetur quis officia aute ea officia id pariatur id. Deserunt duis exercitation laborum enim ex anim id. Dolore dolor do velit anim incididunt duis aliquip magna. Labore ex aliquip sit pariatur commodo qui eiusmod.\r\n",
    "registered": "2016-07-03T08:39:00 -02:00",
    "latitude": 46.083643,
    "longitude": -175.661399,
    "tags": [
      "sunt",
      "quis",
      "duis",
      "irure",
      "do",
      "culpa",
      "proident"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hopper Barrett"
      },
      {
        "id": 1,
        "name": "Cohen Barry"
      },
      {
        "id": 2,
        "name": "Kidd Wells"
      }
    ],
    "greeting": "Hello, Boone Burnett! You have 4 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca4001eb672782953af",
    "index": 186,
    "guid": "5d80ceee-66ad-4ea7-a9a6-323100e0bdb8",
    "isActive": false,
    "balance": "$2,146.91",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "brown",
    "name": "Mitzi Massey",
    "gender": "female",
    "company": "EXOZENT",
    "email": "mitzimassey@exozent.com",
    "phone": "+1 (965) 566-3379",
    "address": "820 Columbia Street, Germanton, Michigan, 1489",
    "about": "Elit mollit nulla minim excepteur dolor duis tempor laborum exercitation minim. Pariatur laboris et mollit est anim irure commodo cupidatat reprehenderit duis laboris. Commodo ut voluptate tempor dolor esse voluptate nulla aute laborum do. Ullamco ullamco irure fugiat minim nisi quis est commodo enim qui labore voluptate voluptate. Ullamco adipisicing ex occaecat exercitation commodo. Ipsum eu occaecat minim aliqua velit qui magna aute elit velit proident culpa aliquip.\r\n",
    "registered": "2016-01-28T02:17:55 -01:00",
    "latitude": 0.781807,
    "longitude": 0.139241,
    "tags": [
      "aute",
      "ullamco",
      "tempor",
      "ut",
      "nostrud",
      "incididunt",
      "reprehenderit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Hardin Alvarez"
      },
      {
        "id": 1,
        "name": "Nicholson Lewis"
      },
      {
        "id": 2,
        "name": "Russell Mullen"
      }
    ],
    "greeting": "Hello, Mitzi Massey! You have 5 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca4b3b1701015291f0b",
    "index": 187,
    "guid": "82222c63-cf5a-4fe6-984b-c08ab2e360bb",
    "isActive": false,
    "balance": "$2,373.17",
    "picture": "http://placehold.it/32x32",
    "age": 31,
    "eyeColor": "blue",
    "name": "Tamra Durham",
    "gender": "female",
    "company": "CHILLIUM",
    "email": "tamradurham@chillium.com",
    "phone": "+1 (913) 450-2417",
    "address": "379 Adams Street, Neahkahnie, District Of Columbia, 1987",
    "about": "Veniam incididunt dolore sint labore non est minim do minim ea irure. Non do ad voluptate adipisicing cupidatat reprehenderit enim cupidatat. Et occaecat officia sint qui non pariatur elit. Qui sint amet ullamco in fugiat Lorem consequat nostrud consequat ipsum. Dolor anim commodo tempor est quis eu consectetur deserunt ea laboris excepteur incididunt. Excepteur proident eiusmod ut nulla adipisicing minim nulla.\r\n",
    "registered": "2017-01-24T02:26:30 -01:00",
    "latitude": 44.559815,
    "longitude": -112.187752,
    "tags": [
      "ex",
      "deserunt",
      "Lorem",
      "ex",
      "qui",
      "consequat",
      "veniam"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Barron Mcneil"
      },
      {
        "id": 1,
        "name": "Fulton Cherry"
      },
      {
        "id": 2,
        "name": "Lindsey Baird"
      }
    ],
    "greeting": "Hello, Tamra Durham! You have 9 unread messages.",
    "favoriteFruit": "strawberry"
  },
  {
    "_id": "5bf07ca496329cac324a90fd",
    "index": 188,
    "guid": "52696195-6f07-4686-b38b-f42a2d398a2e",
    "isActive": false,
    "balance": "$1,497.39",
    "picture": "http://placehold.it/32x32",
    "age": 23,
    "eyeColor": "blue",
    "name": "Wilkins Hester",
    "gender": "male",
    "company": "ZIORE",
    "email": "wilkinshester@ziore.com",
    "phone": "+1 (806) 567-3790",
    "address": "590 Hubbard Place, Caroline, Indiana, 9390",
    "about": "Commodo consequat cillum nisi consectetur sit officia Lorem dolor et quis aute tempor ut veniam. Qui proident nostrud anim cupidatat labore voluptate consectetur labore sint laborum sint. Non do ea occaecat consequat quis qui ad id fugiat fugiat laborum veniam id. Laboris ullamco amet non do reprehenderit est. Laborum minim consectetur consequat commodo commodo mollit. Quis consequat nostrud tempor dolore nulla deserunt.\r\n",
    "registered": "2014-11-11T06:41:38 -01:00",
    "latitude": -76.059786,
    "longitude": 178.626577,
    "tags": [
      "sint",
      "aliquip",
      "in",
      "aute",
      "proident",
      "dolore",
      "anim"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Roberta Dejesus"
      },
      {
        "id": 1,
        "name": "Montoya Sargent"
      },
      {
        "id": 2,
        "name": "Jannie Knowles"
      }
    ],
    "greeting": "Hello, Wilkins Hester! You have 6 unread messages.",
    "favoriteFruit": "banana"
  },
  {
    "_id": "5bf07ca45a0df166245fd9f1",
    "index": 189,
    "guid": "576a864c-e687-4ebc-8a26-7b287d33b879",
    "isActive": true,
    "balance": "$3,528.39",
    "picture": "http://placehold.it/32x32",
    "age": 34,
    "eyeColor": "green",
    "name": "Jarvis Phillips",
    "gender": "male",
    "company": "SOFTMICRO",
    "email": "jarvisphillips@softmicro.com",
    "phone": "+1 (951) 519-3858",
    "address": "403 Radde Place, Lisco, Marshall Islands, 497",
    "about": "Officia ullamco pariatur ullamco dolore aliquip sunt elit incididunt pariatur do duis. Laboris laboris voluptate ipsum sint ex aliquip. Culpa sint ullamco labore nisi. Proident minim est sunt velit nisi nisi deserunt magna nulla magna officia ipsum. Mollit non quis occaecat pariatur ullamco. Eiusmod sit sunt quis proident et dolor. Sit mollit consequat aliquip irure consectetur adipisicing dolore occaecat laborum ea duis labore officia.\r\n",
    "registered": "2016-02-06T09:22:39 -01:00",
    "latitude": 9.588261,
    "longitude": -102.288002,
    "tags": [
      "ipsum",
      "qui",
      "eiusmod",
      "laborum",
      "nostrud",
      "veniam",
      "officia"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Deidre Chambers"
      },
      {
        "id": 1,
        "name": "Lilly Levy"
      },
      {
        "id": 2,
        "name": "Roslyn Jackson"
      }
    ],
    "greeting": "Hello, Jarvis Phillips! You have 7 unread messages.",
    "favoriteFruit": "banana"
  }
]
},{}],55:[function(require,module,exports){
require('../json-parser.test');

},{"../json-parser.test":56}],56:[function(require,module,exports){
(function (Buffer){(function (){
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const json_tools = require('../lib/json-helpers');

function ObjectEqual(a1, a2) {
  return JSON.stringify(a1) === JSON.stringify(a2);
}

function TestPerformance(myValue, nameTypeOf, compare, jsonparse) {
  const jsonparserName = jsonparse.constructor.name;
  it(`Performance ${jsonparserName} - ${nameTypeOf}`, () => {
    let result;
    console.time(`${jsonparserName}.stringify - ${nameTypeOf}`);
    for (i = 0; i < 1000; ++i) {
      result = jsonparse.stringify(myValue);
    }
    console.timeEnd(`${jsonparserName}.stringify - ${nameTypeOf}`);

    let resultParse;
    console.time(`${jsonparserName}.parse - ${nameTypeOf}`);
    for (i = 0; i < 1000; ++i) {
      resultParse = jsonparse.parse(result);
    }
    console.timeEnd(`${jsonparserName}.parse - ${nameTypeOf}`);
  });
}

function TestParser(myValue, nameTypeOf, compare, jsonparse) {
  const jsonparserName = jsonparse.constructor.name;
  it(`Parser ${jsonparserName} - ${nameTypeOf}`, () => {
    let result = jsonparse.stringify(myValue);
    let resultParse = jsonparse.parse(result);
    assert(compare(myValue, resultParse));
  });
}

function TestTypeOf(myValue, nameTypeOf, compare) {
  // TestParser(myValue, nameTypeOf, compare, json_tools.JSONParserV1);
  // TestParser(myValue, nameTypeOf, compare, json_tools.JSONParserV2);
  // TestParser(myValue, nameTypeOf, compare, json_tools.JSONParserTest);
  TestPerformance(myValue, nameTypeOf, compare, json_tools.JSONParserV1);
  TestPerformance(myValue, nameTypeOf, compare, json_tools.JSONParserV2);
  TestPerformance(myValue, nameTypeOf, compare, json_tools.JSONParserTest);
  // TestParser(JSON);
}

function allocateString(num) {
  num = Number(num) / 100;
  var str = '0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789';
  var result = '';
  while (true) {
    if (num & 1) { // (1)
      result += str;
    }
    num >>>= 1; // (2)
    if (num <= 0) break;
    str += str;
  }
  return result;
}
const myBuffer = {
  myBuffer: Buffer.from(allocateString(1024))
}

const bigJSON = require('./big-data.json');

const complexJSON = {
  channel: '/electron-common-ipc/myChannel/myRequest',
  sender: {
    id: 'MyPeer_1234567890',
    name: 'MyPeer_customName',
    date: new Date(),
    process: {
      type: 'renderer',
      pid: 2000,
      rid: 2,
      wcid: 10,
      testUndefined: undefined
    },
    testArrayUndefined: [12, "str", undefined, 3, null, new Date(), "end"]
  },
  request: {
    replyChannel: '/electron-common-ipc/myChannel/myRequest/replyChannel',
  }
};

const uint8Array = {
  myUint8Array: new Uint8Array([1, 2, 3, 4, 5])
}

describe('JSONParser', () => {
  describe('buffer json', () => {
    TestTypeOf(myBuffer, "Buffer", (r1, r2) => r1.compare(r2) === 0);
  });

  describe('Uint8Array json', () => {
    TestTypeOf(uint8Array, "Uint8Array", (r1, r2) => r1.toString() === r2.toString());
  });

  // describe('Date json', () => {
  //   let myDate = new Date();
  //   TestTypeOf(myDate, "Date", (r1, r2) => r1.valueOf() == r2.valueOf());
  // });

  describe('Error json', () => {
    let myError = new Error();
    TestTypeOf(myError, "Error", (r1, r2) => r1.message == r2.message);
  });

  describe('TypeError json', () => {
    let myError = new TypeError();
    TestTypeOf(myError, "TypeError", (r1, r2) => r1.message == r2.message);
  });

  describe('TypeError json', () => {
    let myError = new TypeError();
    TestTypeOf(myError, "TypeError", (r1, r2) => r1.message == r2.message);
  });

  describe('big json', () => {
    TestTypeOf(bigJSON, "object", (r1, r2) => ObjectEqual(r1, r2));
  });

  describe('complex json', () => {
    TestTypeOf(complexJSON, "object", (r1, r2) => ObjectEqual(r1, r2));
  });
});

describe('IsJSONLike', () => {
  it('JSONParse1', () => {
    assert(json_tools.IsJSONLike(json_tools.JSONParserV1));
  });
  it('JSONParse2', () => {
    assert(json_tools.IsJSONLike(json_tools.JSONParserV2));
  });
  it('JSON', () => {
    assert(json_tools.IsJSONLike(JSON));
  });
});


}).call(this)}).call(this,require("buffer").Buffer)
},{"../lib/json-helpers":10,"./big-data.json":54,"buffer":14,"chai":15}]},{},[55]);
