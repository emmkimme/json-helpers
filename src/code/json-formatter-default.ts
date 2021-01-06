import type { JSONFormatter } from './json-formatter';

export const DateJSONFormatter: JSONFormatter<Date> = {
    objectConstructor: (Date as unknown) as ObjectConstructor, 
    serialize: (t: Date) => t.valueOf(), 
    unserialize: (data: string) => new Date(data)
};

// We lost name and stack !
export const ErrorJSONFormatter: JSONFormatter<Error> = {
    objectConstructor: (Error as unknown) as ObjectConstructor, 
    serialize: (t: Error) => t.message, 
    unserialize: (data: string) => new Error(data)
};

// We lost name and stack !
export const TypeErrorJSONFormatter: JSONFormatter<TypeError> = {
    objectConstructor: (TypeError as unknown) as ObjectConstructor, 
    serialize: (t: TypeError) => t.message, 
    unserialize: (data: string) => new TypeError(data)
};

export const BufferJSONFormatter: JSONFormatter<Buffer> = {
    objectConstructor:  (Buffer as unknown) as ObjectConstructor,
    serialize: null, 
    unserialize: (data: string) => Buffer.from(data) 
};

export const BufferBinaryJSONFormatter: JSONFormatter<Buffer> = {
    objectConstructor: (Buffer as unknown) as ObjectConstructor,
    serialize: (t: Buffer) => t.toString('binary'), 
    unserialize: (data: string) => Buffer.from(data, 'binary')
};