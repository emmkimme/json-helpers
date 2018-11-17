const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const json_tools = require('../lib/json-tools');

const bigData = require('./big-data.json');

function ObjectEqual(a1, a2) {
  return JSON.stringify(a1) === JSON.stringify(a2);
}

describe('JSON-Parser', () => {

  describe('big json', () => {
    it('JSON.stringify', () => {
      console.time('JSON.stringify - big json');
      let result = JSON.stringify(bigData);
      console.timeEnd('JSON.stringify - big json');

      console.time('JSON.parse - big json');
      let newbigdata = JSON.parse(result);
      console.timeEnd('JSON.parse - big json');
      assert(ObjectEqual(bigData, newbigdata));
    });

    it('JSON-Parser.stringify', () => {
      console.time('JSON-Parser.stringify - big json');
      let result = json_tools.JSONParser.stringify(bigData);
      console.timeEnd('JSON-Parser.stringify - big json');

      console.time('JSON-Parser.parse - big json');
      let newbigdata = json_tools.JSONParser.parse(result);
      console.timeEnd('JSON-Parser.parse - big json');
      assert(ObjectEqual(bigData, newbigdata));
    });
  });

  describe('small json', () => {
    let busEvent = {
      channel: '/electron-common-ipc/myChannel/myRequest',
      sender: {
        id: 'MyPeer_1234567890',
        name: 'MyPeer_customName',
        process: {
          type: 'renderer',
          pid: 2000,
          rid: 2,
          wcid: 10,
          testUndefined: undefined
        },
        testArrayUndefined: [12, "str", undefined, 3, null, "end"]
      },
      request: {
        replyChannel: '/electron-common-ipc/myChannel/myRequest/replyChannel',
      }
    };

    it('JSON.stringify - small json', () => {
      let result;
      console.time('JSON.stringify - small json');
      for (i = 0; i < 10000; ++i) {
        result = JSON.stringify(busEvent);
      }
      console.timeEnd('JSON.stringify - small json');

      let resultParse;
      console.time('JSON.parse - small json');
      for (i = 0; i < 10000; ++i) {
        resultParse = JSON.parse(result);
      }
      console.timeEnd('JSON.parse - small json');
    });

    it('JSON-Parser.stringify - small json', () => {
      let result;
      console.time('JSON-Parser.stringify - small json');
      for (i = 0; i < 10000; ++i) {
        result = json_tools.JSONParser.stringify(busEvent);
      }
      console.timeEnd('JSON-Parser.stringify - small json');

      let resultParse;
      console.time('JSON-Parser.parse - small json');
      for (i = 0; i < 10000; ++i) {
        resultParse = json_tools.JSONParser.parse(result);
      }
      console.timeEnd('JSON-Parser.parse - small json');
    });
  });

  describe('complex json', () => {
    let busEvent = {
      channel: '/electron-common-ipc/myChannel/myRequest',
      sender: {
        id: 'MyPeer_1234567890',
        name: 'MyPeer_customName',
        process: {
          type: 'renderer',
          pid: 2000,
          rid: 2,
          wcid: 10,
          testUndefined: undefined
        },
        testArrayUndefined: [12, "str", undefined, 3, null, "end"],
        testBuffer: Buffer.from('ceci est un test')
      },
      request: {
        replyChannel: '/electron-common-ipc/myChannel/myRequest/replyChannel',
        testDate: new Date()
      }
    };

    it('JSON-Parser.stringify - complex json', () => {
      let result;
      console.time('JSON-Parser.stringify - complex json');
      for (i = 0; i < 10000; ++i) {
        result = json_tools.JSONParser.stringify(busEvent);
      }
      console.timeEnd('JSON-Parser.stringify - complex json');

      let resultParse;
      console.time('JSON-Parser.parse - complex json');
      for (i = 0; i < 10000; ++i) {
        resultParse = json_tools.JSONParser.parse(result);
      }
      console.timeEnd('JSON-Parser.parse - complex json');
    });
  });


  describe('buffer json', () => {
    let myBuffer = Buffer.from('ceci est un test');

    it('JSON-Parser.stringify - buffer json', () => {
      let result;
      console.time('JSON-Parser.stringify - buffer json');
      for (i = 0; i < 10000; ++i) {
        result = json_tools.JSONParser.stringify(myBuffer);
      }
      console.timeEnd('JSON-Parser.stringify - buffer json');

      let resultParse;
      console.time('JSON-Parser.parse - buffer json');
      for (i = 0; i < 10000; ++i) {
        resultParse = json_tools.JSONParser.parse(result);
      }
      console.timeEnd('JSON-Parser.parse - buffer json');

      assert(myBuffer.compare(resultParse) === 0);
    });
  });

  describe('date json', () => {
    let myDate = new Date();

    it('JSON-Parser.stringify - date json', () => {
      let result;
      console.time('JSON-Parser.stringify - date json');
      for (i = 0; i < 10000; ++i) {
        result = json_tools.JSONParser.stringify(myDate);
      }
      console.timeEnd('JSON-Parser.stringify - date json');

      let resultParse;
      console.time('JSON-Parser.parse - date json');
      for (i = 0; i < 10000; ++i) {
        resultParse = json_tools.JSONParser.parse(result);
      }
      console.timeEnd('JSON-Parser.parse - date json');

      assert(myDate.valueOf() == resultParse.valueOf());
    });
  });

});