# json-helpers
Provide a new stringify/parser able to manage 'undefined', Date object and Buffer object.


# Installation
```Batchfile
npm install json-helpers
```

Dependencies
* http://nodejs.org/

# Sample
```js
const json_tools = require('json-helpers');

const busEvent = {
      channel: '/electron-common-ipc/myChannel/myRequest',
      sender: {
        id: 'MyPeer_1234567890',
        name: 'MyPeer_customName',
        date: new Date,
        process: {
          type: 'renderer',
          pid: 2000,
          rid: 2,
          wcid: 10,
          testUndefined: undefined
        },
        testArrayUndefined: [12, "str", undefined, 3, null, new Date(), "end"],
        testBuffer: Buffer.from('ceci est un test')
      },
      request: {
        replyChannel: '/electron-common-ipc/myChannel/myRequest/replyChannel',
        testDate: new Date()
      }
};

const resultStringify = json_tools.JSONParser.stringify(busEvent);
const mirror_busEvent = json_tools.JSONParser.parse(resultStringify);
// Date, Buffer, Error are properly restored
```

json_tools.JSONParserV2 is far more efficient for buffer serialization (x10 faster) but it overrides the default Buffer.toJSON function
So may break some compatibility

You can add your own formatter, calling setup()

```ts
const DateJSONFormatter: JSONFormatter<Date> = {
    objectConstructor: (Date as unknown) as ObjectConstructor, 
    serialize: (t: Date) => t.toISOString(), 
    unserialize: (data: string) => new Date(data)
};

json_tools.JSONParser.formatter<Date>(DateJSONFormatter);

```

# MIT License

Copyright (c) 2021 Emmanuel Kimmerlin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.