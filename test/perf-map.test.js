const chai = require('chai');
const assert = chai.assert;

const { JSONFormatter } = require('../lib/code/json-formatter');
const { dateJSONSupport, errorJSONSupport, typeErrorJSONSupport, bufferJSONSupportBinary } = require('../lib/code/json-formatter-default');

describe('map travel', () => {
  const size = 10000;
  const jsonFormattersMap = new Map();
  before(() => {
    jsonFormattersMap.set(dateJSONSupport.objectName, dateJSONSupport);
    jsonFormattersMap.set(errorJSONSupport.objectName, errorJSONSupport);
    jsonFormattersMap.set(typeErrorJSONSupport.objectName, typeErrorJSONSupport);
    jsonFormattersMap.set(bufferJSONSupportBinary.objectName, bufferJSONSupportBinary);
  });

  it(`forEach`, () => {
    console.time('forEach');
    for (let i = 0; i < size; i++) {
      jsonFormattersMap.forEach((item) => {
        item.install();
      });
      jsonFormattersMap.forEach((item) => {
        item.uninstall();
      });
    }
    console.timeEnd('forEach');
  });

  it(`for of`, () => {
    console.time('for of');
    for (let i = 0; i < size; i++) {
      for (let [,item] of jsonFormattersMap) {
        item.install();
      }
      for (let [,item] of jsonFormattersMap) {
        item.uninstall();
      }
    }
    console.timeEnd('for of');
  });
});


