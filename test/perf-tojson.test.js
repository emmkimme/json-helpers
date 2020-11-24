const { JSONFormatter } = require('../lib/code/json-formatter');

const Conversions = {
  's': [1, 1e-9],
  'ms': [1e3, 1e-6],
  'us': [1e6, 1e-3],
  'ns': [1e9, 1]
};

describe(`Performance toJSON override`, () => {

  function test(objectName, objectConstructor, serialize, unserialize) {
    const jsonFormatter = new JSONFormatter(objectName, objectConstructor, serialize, unserialize);

    it(`${objectName} set object property`, (done) => {
      const time = process.hrtime();
      for (let i = 0; i < 100000; ++i) {
        jsonFormatter.install();
        jsonFormatter.uninstall();
      }
      const diff = process.hrtime(time);
      const diffms = diff[0] * Conversions.ms[0] + diff[1] * Conversions.ms[1];
      console.log(`${objectName} set object property ${diffms.toFixed(2)} ms`);
      done();
    });

    it(`${objectName} delete object property`, (done) => {
      const time = process.hrtime();
      for (let i = 0; i < 100000; ++i) {
        jsonFormatter.install();
        jsonFormatter.delete();
      }
      const diff = process.hrtime(time);
      const diffms = diff[0] * Conversions.ms[0] + diff[1] * Conversions.ms[1];
      console.log(`${objectName} delete object property ${diffms.toFixed(2)} ms`);
      done();
    });
  }


  test(
    'Date',
    Date,
    (t) => t.valueOf(),
    (data) => new Date(data)
  );

  test(
    'TypeError',
    TypeError,
    (t) => t.message,
    (data) => new TypeError(data)
  );

  test(
    'Buffer',
    Buffer,
    null,
    (data) => Buffer.from(data)
  );

  test(
    'Buffer',
    Buffer,
    (t) => t.toString('binary'),
    (data) => Buffer.from(data, 'binary')
  );

})
