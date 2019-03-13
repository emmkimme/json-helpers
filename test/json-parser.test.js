const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const json_tools = require('../lib/json-helpers');

const bigData = require('./big-data.json');

function ObjectEqual(a1, a2) {
  return JSON.stringify(a1) === JSON.stringify(a2);
}

describe('JSONParser', () => {

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

  //   it('JSONParser.stringify', () => {
  //     console.time('JSONParser.stringify - big json');
  //     let result = json_tools.JSONParser.stringify(bigData);
  //     console.timeEnd('JSONParser.stringify - big json');

  //     console.time('JSONParser.parse - big json');
  //     let newbigdata = json_tools.JSONParser.parse(result);
  //     console.timeEnd('JSONParser.parse - big json');
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

  //   it('JSONParser.stringify - small json', () => {
  //     let result;
  //     console.time('JSONParser.stringify - small json');
  //     for (i = 0; i < 10000; ++i) {
  //       result = json_tools.JSONParser.stringify(busEvent);
  //     }
  //     console.timeEnd('JSONParser.stringify - small json');

  //     let resultParse;
  //     console.time('JSONParser.parse - small json');
  //     for (i = 0; i < 10000; ++i) {
  //       resultParse = json_tools.JSONParser.parse(result);
  //     }
  //     console.timeEnd('JSONParser.parse - small json');
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

  //   it('JSONParser.stringify - complex json', () => {
  //     let result;
  //     console.time('JSONParser.stringify - complex json');
  //     for (i = 0; i < 10000; ++i) {
  //       result = json_tools.JSONParser.stringify(busEvent);
  //     }
  //     console.timeEnd('JSONParser.stringify - complex json');

  //     let resultParse;
  //     console.time('JSONParser.parse - complex json');
  //     for (i = 0; i < 10000; ++i) {
  //       resultParse = json_tools.JSONParser.parse(result);
  //     }
  //     console.timeEnd('JSONParser.parse - complex json');
  //   });
  // });
});