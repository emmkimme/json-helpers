import { JSONFormatter } from './json-formatter';

export const dateJSONSupport = new JSONFormatter<Date>(
    (Date as unknown) as ObjectConstructor, 
    (t: Date) => t.valueOf(), 
    (data: string) => new Date(data)
);

// We lost name and stack !
export const errorJSONSupport = new JSONFormatter<Error>(
    (Error as unknown) as ObjectConstructor, 
    (t: Error) => t.message, 
    (data: string) => new Error(data)
);

// We lost name and stack !
export const typeErrorJSONSupport = new JSONFormatter<TypeError>(
    (TypeError as unknown) as ObjectConstructor, 
    (t: TypeError) => t.message, 
    (data: string) => new TypeError(data)
);

export const bufferJSONSupport = new JSONFormatter<Buffer>(
    (Buffer as unknown) as ObjectConstructor,
    null, 
    (data: string) => Buffer.from(data) 
);

export const bufferJSONSupportBinary = new JSONFormatter<Buffer>(
    (Buffer as unknown) as ObjectConstructor,
    (t: Buffer) => t.toString('binary'), 
    (data: string) => Buffer.from(data, 'binary')
);