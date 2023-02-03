# json-helpers
Provide a JSON stringify/parser able to manage 'Date', 'Uint8Array' and 'Buffer'.
You can add your own class formatter.

This parser is pretty efficient as using the standard JSON implementation, just overriding the 'toJSON' methods of classes.  
To keep original implementations untouched, these overriding/s are done before stringify is called and restore after. If you want to save performance, you can call 'install()' method to setup redirections once and for all.


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
        },
        testArray: [12, "str", 3, null, new Date(), "end"],
        testBuffer: Buffer.from('ceci est un test')
      },
      request: {
        replyChannel: '/electron-common-ipc/myChannel/myRequest/replyChannel',
        testDate: new Date()
      }
};

// Date, Buffer, Error are properly restored
const resultStringify = json_tools.JSONParserV1.stringify(busEvent);
const mirror_busEvent = json_tools.JSONParserV1.parse(resultStringify);

// Setup 'toJSON' functions
json_tools.JSONParserV1.install();

```

json_tools.JSONParserV2 is far more efficient for buffer serialization (x10 faster) but it overrides the default Buffer.toJSON function
So may break some compatibility

# Formatter
You can add your own formatter, calling formatter()

```ts
const DateJSONFormatter: JSONFormatter<Date> = {
    objectType: 'MyDate',
    objectConstructor: (Date as unknown) as ObjectConstructor, 
    serialize: (t: Date) => t.toISOString(), 
    unserialize: (data: string) => new Date(data)
};

json_tools.JSONParserV1.formatter<Date>(DateJSONFormatter);

```

# MIT License

Copyright (c) 2021 Emmanuel Kimmerlin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.