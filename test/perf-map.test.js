const chai = require('chai');
const assert = chai.assert;

const { JSONSetup } = require('../lib/code/json-setup');
const { DateJSONFormatter, ErrorJSONFormatter, TypeErrorJSONFormatter, BufferJSONFormatter } = require('../lib/code/json-formatter-default');

describe('map travel', () => {
  const size = 10000;
  const jsonSetupsMap = new Map();

  function setup(jsonFormatter) {
    const jsonSetup = new JSONSetup(jsonFormatter);
    jsonSetupsMap.set(jsonSetup.objectName, jsonSetup);
  }
  
  before(() => {
    setup(DateJSONFormatter);
    setup(ErrorJSONFormatter);
    setup(TypeErrorJSONFormatter);
    setup(BufferJSONFormatter);
  });

  it(`forEach`, () => {
    console.time('forEach');
    for (let i = 0; i < size; i++) {
      jsonSetupsMap.forEach((item) => {
        item.install();
      });
      jsonSetupsMap.forEach((item) => {
        item.uninstall();
      });
    }
    console.timeEnd('forEach');
  });

  it(`for of`, () => {
    console.time('for of');
    for (let i = 0; i < size; i++) {
      for (let [,item] of jsonSetupsMap) {
        item.install();
      }
      for (let [,item] of jsonSetupsMap) {
        item.uninstall();
      }
    }
    console.timeEnd('for of');
  });
  
});


