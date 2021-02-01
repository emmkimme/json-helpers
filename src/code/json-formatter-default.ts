import type { JSONFormatterData } from './json-formatter';

export const DateJSONFormatter: JSONFormatterData<Date> = {
    objectType: 'Date',
    // objectInstance: new Date(),
    objectConstructor: (Date as unknown) as ObjectConstructor, 
    serialize: (t: Date) => t.valueOf(),
    unserialize: (data: string) => new Date(data)
};

// We lost name and stack !
export const ErrorJSONFormatter: JSONFormatterData<Error> = {
    objectType: 'Error',
    // objectInstance: new Error(),
    objectConstructor: (Error as unknown) as ObjectConstructor, 
    serialize: (t: Error) => t.message,
    unserialize: (data: string) => new Error(data)
};

// We lost name and stack !
export const TypeErrorJSONFormatter: JSONFormatterData<TypeError> = {
    objectType: 'TypeError',
    // objectInstance: new TypeError(),
    objectConstructor: (TypeError as unknown) as ObjectConstructor, 
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