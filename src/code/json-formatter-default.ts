import type { JSONFormatter } from './json-formatter';

export const DateJSONFormatter: JSONFormatter<Date> = {
    objectInstance: new Date(),
    // objectConstructor: (Date as unknown) as ObjectConstructor, 
    serialize: (t: Date) => t.valueOf(), 
    unserialize: (data: string) => new Date(data)
};

// We lost name and stack !
export const ErrorJSONFormatter: JSONFormatter<Error> = {
    objectInstance: new Error(),
    // objectConstructor: (Error as unknown) as ObjectConstructor, 
    serialize: (t: Error) => t.message, 
    unserialize: (data: string) => new Error(data)
};

// We lost name and stack !
export const TypeErrorJSONFormatter: JSONFormatter<TypeError> = {
    objectInstance: new TypeError(),
    // objectConstructor: (TypeError as unknown) as ObjectConstructor, 
    serialize: (t: TypeError) => t.message, 
    unserialize: (data: string) => new TypeError(data)
};

export const BufferJSONFormatter: JSONFormatter<Buffer> = {
    objectInstance: Buffer.alloc(0),
    // objectConstructor: (Buffer as unknown) as ObjectConstructor,
    serialize: null, 
    unserialize: (data: string) => Buffer.from(data) 
};

export const BufferBinaryJSONFormatter: JSONFormatter<Buffer> = {
    objectInstance: Buffer.alloc(0),
    // objectConstructor: (Buffer as unknown) as ObjectConstructor,
    serialize: (t: Buffer) => t.toString('binary'), 
    unserialize: (data: string) => Buffer.from(data, 'binary')
};