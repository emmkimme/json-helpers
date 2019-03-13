const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const json_tools = require('../lib/json-helpers');

describe('JSONParser', () => {

  function TestTypeOf(myValue, nameTypeOf, compare) {
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
});