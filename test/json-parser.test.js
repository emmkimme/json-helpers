const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const json_tools = require('../lib/json-helpers');

function ObjectEqual(a1, a2) {
  return JSON.stringify(a1) === JSON.stringify(a2);
}

function TestPerformanceTypeOf(myValue, nameTypeOf, compare) {
  function TestParser(jsonparse) {
    const jsonparserName = jsonparse.constructor.name;
    it(`${jsonparserName} - ${nameTypeOf}`, () => {
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
  TestParser(json_tools.JSONParserV1);
  TestParser(json_tools.JSONParserV2);
  // TestParser(JSON);
}

function TestTypeOf(myValue, nameTypeOf, compare) {
  function TestParser(jsonparse) {
    const jsonparserName = jsonparse.constructor.name;
    it(`${jsonparserName} - ${nameTypeOf}`, () => {
      let result = jsonparse.stringify(myValue);
      let resultParse = jsonparse.parse(result);
      assert(compare(myValue, resultParse));
    });
  }
  TestParser(json_tools.JSONParserV1);
  TestParser(json_tools.JSONParserV2);
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
const myBuffer = Buffer.from(allocateString(1024));

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

const uint8Array = new Uint8Array([1,2,3,4,5]);

describe('JSONParser', () => {
  describe('buffer json', () => {
    TestTypeOf(myBuffer, "Buffer", (r1, r2) => r1.compare(r2) === 0);
  });

  describe('Uint8Array json', () => {
    TestTypeOf(uint8Array, "Uint8Array", (r1, r2) => r1.toString() === r2.toString());
  });

  describe('Date json', () => {
    let myDate = new Date();
    TestTypeOf(myDate, "Date", (r1, r2) => r1.valueOf() == r2.valueOf());
  });

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

// describe('JSONParser performance', () => {
//   describe('buffer json', () => {
//     TestPerformanceTypeOf(myBuffer, "Buffer", (r1, r2) => r1.compare(r2) === 0);
//   });

//   describe('Date json', () => {
//     let myDate = new Date();
//     TestPerformanceTypeOf(myDate, "Date", (r1, r2) => r1.valueOf() == r2.valueOf());
//   });

//   describe('Error json', () => {
//     let myError = new Error();
//     TestPerformanceTypeOf(myError, "Error", (r1, r2) => r1.message == r2.message);
//   });

//   describe('TypeError json', () => {
//     let myError = new TypeError();
//     TestPerformanceTypeOf(myError, "TypeError", (r1, r2) => r1.message == r2.message);
//   });

//   describe('TypeError json', () => {
//     let myError = new TypeError();
//     TestPerformanceTypeOf(myError, "TypeError", (r1, r2) => r1.message == r2.message);
//   });

//   describe('big json', () => {
//     TestPerformanceTypeOf(bigJSON, "object", (r1, r2) => ObjectEqual(r1, r2));
//   });

//   describe('complex json', () => {
//     TestPerformanceTypeOf(complexJSON, "object", (r1, r2) => ObjectEqual(r1, r2));
//   });
// });