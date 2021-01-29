const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const json_tools = require('../');

function ObjectEqual(a1, a2) {
  return JSON.stringify(a1) === JSON.stringify(a2);
}

describe('JSONParser', () => {
  function TestPerformanceTypeOf(myValue, nameTypeOf, compare) {
    it(`JSONParserV2.stringify - ${nameTypeOf}`, () => {
      let result;
      console.time(`JSONParser.stringify - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        result = json_tools.JSONParser.stringify(myValue);
      }
      console.timeEnd(`JSONParser.stringify - ${nameTypeOf}`);

      console.time(`JSONParserV2.stringify - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        result = json_tools.JSONParserV2.stringify(myValue);
      }
      console.timeEnd(`JSONParserV2.stringify - ${nameTypeOf}`);

      console.time(`JSON.stringify - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        let localResult = JSON.stringify(myValue, (k,v) => v);
        localResult;
      }
      console.timeEnd(`JSON.stringify - ${nameTypeOf}`);

      let resultParse;
      console.time(`JSONParser.parse - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        resultParse = json_tools.JSONParser.parse(result);
      }
      console.timeEnd(`JSONParser.parse - ${nameTypeOf}`);
      assert(compare(myValue, resultParse));

      console.time(`JSONParserV2.parse - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        resultParse = json_tools.JSONParserV2.parse(result);
      }
      console.timeEnd(`JSONParserV2.parse - ${nameTypeOf}`);
      assert(compare(myValue, resultParse));

      console.time(`JSON.parse - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        let localParse = JSON.parse(result, (k,v) => v);
        localParse;
      }
      console.timeEnd(`JSON.parse - ${nameTypeOf}`);
    });
  }

  function TestTypeOf(myValue, nameTypeOf, compare) {
    it(`JSONParserV2.stringify - ${nameTypeOf}`, () => {
      let result = json_tools.JSONParser.stringify(myValue);
      let resultParse = json_tools.JSONParser.parse(result);
      assert(compare(myValue, resultParse));

      resultParse = json_tools.JSONParserV2.parse(result);
      assert(compare(myValue, resultParse));
    });
  }

  describe('buffer json', () => {

    function allocateString(num) {
      num = Number(num) / 100;
      var str ='0123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789';
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

    let myBuffer = Buffer.from(allocateString(1024));
    TestTypeOf(myBuffer, "Buffer", (r1, r2) => r1.compare(r2) === 0 );
  });

  describe('Date json', () => {
    let myDate = new Date();
    TestTypeOf(myDate, "Date", (r1, r2) => r1.valueOf() == r2.valueOf() );
  });

  describe('Error json', () => {
    let myError = new Error();
    TestTypeOf(myError, "Error", (r1, r2) => r1.message == r2.message );
  });

  describe('TypeError json', () => {
    let myError = new TypeError();
    TestTypeOf(myError, "TypeError", (r1, r2) => r1.message == r2.message );
  });

  describe('TypeError json', () => {
    let myError = new TypeError();
    TestTypeOf(myError, "TypeError", (r1, r2) => r1.message == r2.message );
  });

  const bigJSON = require('./big-data.json');
  describe('big json', () => {
    TestTypeOf(bigJSON, "object", (r1, r2) => ObjectEqual(r1, r2));
  });

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
  describe('complex json', () => {
    TestTypeOf(complexJSON, "object", (r1, r2) => ObjectEqual(r1, r2));
  });

});