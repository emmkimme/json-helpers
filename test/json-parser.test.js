const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const json_tools = require('../lib/json-helpers');

const bigData = require('./big-data.json');

function ObjectEqual(a1, a2) {
  return JSON.stringify(a1) === JSON.stringify(a2);
}

describe('JSON-Parser', () => {

  // describe('big json', () => {
  //   it('JSON.stringify', () => {
  //     console.time('JSON.stringify - big json');
  //     let result = JSON.stringify(bigData);
  //     console.timeEnd('JSON.stringify - big json');

  //     console.time('JSON.parse - big json');
  //     let newbigdata = JSON.parse(result);
  //     console.timeEnd('JSON.parse - big json');
  //     assert(ObjectEqual(bigData, newbigdata));
  //   });

  //   it('JSON-Parser.stringify', () => {
  //     console.time('JSON-Parser.stringify - big json');
  //     let result = json_tools.JSONParser.stringify(bigData);
  //     console.timeEnd('JSON-Parser.stringify - big json');

  //     console.time('JSON-Parser.parse - big json');
  //     let newbigdata = json_tools.JSONParser.parse(result);
  //     console.timeEnd('JSON-Parser.parse - big json');
  //     assert(ObjectEqual(bigData, newbigdata));
  //   });
  // });

  // describe('small json', () => {
  //   let busEvent = {
  //     channel: '/electron-common-ipc/myChannel/myRequest',
  //     sender: {
  //       id: 'MyPeer_1234567890',
  //       name: 'MyPeer_customName',
  //       process: {
  //         type: 'renderer',
  //         pid: 2000,
  //         rid: 2,
  //         wcid: 10,
  //         testUndefined: undefined
  //       },
  //       testArrayUndefined: [12, "str", undefined, 3, null, "end"]
  //     },
  //     request: {
  //       replyChannel: '/electron-common-ipc/myChannel/myRequest/replyChannel',
  //     }
  //   };

  //   it('JSON.stringify - small json', () => {
  //     let result;
  //     console.time('JSON.stringify - small json');
  //     for (i = 0; i < 10000; ++i) {
  //       result = JSON.stringify(busEvent);
  //     }
  //     console.timeEnd('JSON.stringify - small json');

  //     let resultParse;
  //     console.time('JSON.parse - small json');
  //     for (i = 0; i < 10000; ++i) {
  //       resultParse = JSON.parse(result);
  //     }
  //     console.timeEnd('JSON.parse - small json');
  //   });

  //   it('JSON-Parser.stringify - small json', () => {
  //     let result;
  //     console.time('JSON-Parser.stringify - small json');
  //     for (i = 0; i < 10000; ++i) {
  //       result = json_tools.JSONParser.stringify(busEvent);
  //     }
  //     console.timeEnd('JSON-Parser.stringify - small json');

  //     let resultParse;
  //     console.time('JSON-Parser.parse - small json');
  //     for (i = 0; i < 10000; ++i) {
  //       resultParse = json_tools.JSONParser.parse(result);
  //     }
  //     console.timeEnd('JSON-Parser.parse - small json');
  //   });
  // });

  // describe('complex json', () => {
  //   let busEvent = {
  //     channel: '/electron-common-ipc/myChannel/myRequest',
  //     sender: {
  //       id: 'MyPeer_1234567890',
  //       name: 'MyPeer_customName',
  //       process: {
  //         type: 'renderer',
  //         pid: 2000,
  //         rid: 2,
  //         wcid: 10,
  //         testUndefined: undefined
  //       },
  //       testArrayUndefined: [12, "str", undefined, 3, null, "end"],
  //       testBuffer: Buffer.from('ceci est un test'),
  //       testError: new Error('Test Error'),
  //       testTypeError: new TypeError('Test TypeError'),
  //     },
  //     request: {
  //       replyChannel: '/electron-common-ipc/myChannel/myRequest/replyChannel',
  //       testDate: new Date()
  //     }
  //   };

  //   it('JSON-Parser.stringify - complex json', () => {
  //     let result;
  //     console.time('JSON-Parser.stringify - complex json');
  //     for (i = 0; i < 10000; ++i) {
  //       result = json_tools.JSONParser.stringify(busEvent);
  //     }
  //     console.timeEnd('JSON-Parser.stringify - complex json');

  //     let resultParse;
  //     console.time('JSON-Parser.parse - complex json');
  //     for (i = 0; i < 10000; ++i) {
  //       resultParse = json_tools.JSONParser.parse(result);
  //     }
  //     console.timeEnd('JSON-Parser.parse - complex json');
  //   });
  // });

  function TestTypeOf(myValue, nameTypeOf, compare) {
    it(`JSON-Parser.stringify - ${nameTypeOf}`, () => {
      let result;
      console.time(`JSON-Parser.stringify - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        result = json_tools.JSONParser.stringify(myValue);
      }
      console.timeEnd(`JSON-Parser.stringify - ${nameTypeOf}`);

      console.time(`JSON.stringify - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        let localResult = JSON.stringify(myValue, (k,v) => v);
        localResult;
      }
      console.timeEnd(`JSON.stringify - ${nameTypeOf}`);

      let resultParse;
      console.time(`JSON-Parser.parse - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        resultParse = json_tools.JSONParser.parse(result);
      }
      console.timeEnd(`JSON-Parser.parse - ${nameTypeOf}`);

      console.time(`JSON.parse - ${nameTypeOf}`);
      for (i = 0; i < 10000; ++i) {
        let localParse = JSON.parse(result, (k,v) => v);
        localParse;
      }
      console.timeEnd(`JSON.parse - ${nameTypeOf}`);

      assert(compare(myValue, resultParse));
    });
  }

  describe('buffer json', () => {
    let myBuffer = Buffer.from('ceci est un test');
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