import type { JSONFormatterData } from './json-formatter';

export const DateJSONFormatter: JSONFormatterData<globalThis.Date> = {
    objectType: 'Date',
    // objectInstance: new Date(),
    objectConstructor: (globalThis.Date as unknown) as ObjectConstructor, 
    serialize: (t: Date) => t.valueOf(),
    unserialize: (data: string) => new Date(data)
};

// We lost name and stack !
export const ErrorJSONFormatter: JSONFormatterData<globalThis.Error> = {
    objectType: 'Error',
    // objectInstance: new Error(),
    objectConstructor: (globalThis.Error as unknown) as ObjectConstructor, 
    serialize: (t: Error) => t.message,
    unserialize: (data: string) => new Error(data)
};

// We lost name and stack !
export const TypeErrorJSONFormatter: JSONFormatterData<globalThis.TypeError> = {
    objectType: 'TypeError',
    // objectInstance: new TypeError(),
    objectConstructor: (globalThis.TypeError as unknown) as ObjectConstructor, 
    serialize: (t: TypeError) => t.message,
    unserialize: (data: string) => new TypeError(data)
};

export const BufferJSONFormatter: JSONFormatterData<Buffer> = {
    objectType: 'Buffer',
    // objectInstance: Buffer.alloc(0),
    objectConstructor: (Buffer as unknown) as ObjectConstructor,
    serialize: null,
    unserialize: (data: string) => Buffer.from(data) 
};

export const BufferBinaryJSONFormatter: JSONFormatterData<Buffer> = {
    objectType: 'Buffer',
    // objectInstance: Buffer.alloc(0),
    objectConstructor: (Buffer as unknown) as ObjectConstructor,
    serialize: (t: Buffer) => t.toString('binary'),
    unserialize: (data: string) => Buffer.from(data, 'binary')
};

export const Uint8ArrayJSONFormatter: JSONFormatterData<Uint8Array> = {
    objectType: 'Uint8Array',
    // objectInstance: Buffer.alloc(0),
    objectConstructor: (Uint8Array as unknown) as ObjectConstructor,
    serialize: (t: Uint8Array) => Buffer.from(t.buffer).toString('binary'),
    unserialize: (data: string) => {
        const buffer = Buffer.from(data, 'binary');
        return new Uint8Array(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.length));
    }
};

// export const Uint8ArrayJSONFormatter: JSONFormatterData<Uint8Array> = {
//     objectType: 'Uint8Array',
//     // objectInstance: Buffer.alloc(0),
//     objectConstructor: (Uint8Array as unknown) as ObjectConstructor,
//     serialize: (t: Uint8Array) => Array.apply([], this),
//     unserialize: (data: any) => {
//         return new Uint8Array(data);
//     }
// };
