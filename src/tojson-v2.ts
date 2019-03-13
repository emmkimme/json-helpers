
import { Buffer } from 'buffer';
import { ToJSONReplacer, ToJSONReviver, ToJSONConstants } from './tojson';

ToJSONReplacer.CreateV2 = (replacer?: (key: string, value: any) => any): ToJSONReplacer => {
    return new ToJSONReplacerImpl(replacer);
}

export interface JSONFormat {
    type: string;
    data: string;
}

class JSONFormatClass {
    static maps: Map<string, JSONFormatClass> = new Map<string, JSONFormatClass>();

    objectName: string;
    objectConstructor: ObjectConstructor;
    previousToJSON: PropertyDescriptor;
    serialize?: Function;
    unserialize?: Function;

    constructor(objectName: string, objectConstructor: ObjectConstructor, serialize?: (t: any) => any, unserialize?: (data: any) => any) {
        this.objectName = objectName;
        this.objectConstructor = objectConstructor;
        this.previousToJSON = Object.getOwnPropertyDescriptor(objectConstructor.prototype, 'toJSON');
        this.unserialize = unserialize;
        this.serialize = serialize;

        JSONFormatClass.maps.set(objectName, this);
    }

    create(data: any): any {
        return this.unserialize(data);
    }

    install() {
        if (this.serialize) {
            let self = this;
            Object.defineProperty(this.objectConstructor.prototype, 'toJSON', { 
                value: function(): any {
                    return { type: self.objectName, data: self.serialize(this) };
                },
                configurable: true
            });
        }
    }

    uninstall() {
        if (this.serialize) {
            if (this.previousToJSON) {
                let self = this;
                Object.defineProperty(this.objectConstructor.prototype, 'toJSON', self.previousToJSON);
            }
            else {
                Object.defineProperty(this.objectConstructor.prototype, 'toJSON', { 
                    value: function(): any {
                        return this.toString();
                    },
                    configurable: true,
                    enumerable: false
                });
            }
        }
    }
}

const dateJSONSupport = new JSONFormatClass(
    'Date', (
    Date as unknown) as ObjectConstructor, 
    (t: Date) => t.valueOf(), 
    (data: string) => new Date(data)
);
dateJSONSupport;

// We lost name and stack !
const errorJSONSupport = new JSONFormatClass(
    'Error', 
    (Error as unknown) as ObjectConstructor, 
    (t: Error) => t.message, 
    (data: string) => new Error(data)
);
errorJSONSupport;

// We lost name and stack !
const typeErrorJSONSupport = new JSONFormatClass(
    'TypeError', 
    (TypeError as unknown) as ObjectConstructor, 
    (t: TypeError) => t.message, 
    (data: string) => new TypeError(data)
);
typeErrorJSONSupport;


const bufferJSONSupport = new JSONFormatClass(
    'Buffer', 
    (Buffer as unknown) as ObjectConstructor,
    // null, 
    // (data: string) => Buffer.from(data) 
    (t: Buffer) => t.toString('binary'), 
    (data: string) => Buffer.from(data, 'binary')
);
bufferJSONSupport;


// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
class ToJSONReplacerImpl implements ToJSONReplacer {
    private _replacer: Function;

    constructor(replacer: (key: string, value: any) => any) {
        this._replacer = replacer;
    }
    
    install(): void {
        JSONFormatClass.maps.forEach(item => {
            item.install();
        });
    }

    uninstall(): void {
        JSONFormatClass.maps.forEach(item => {
            item.uninstall();
        });
    }

    replacer(key: string, value: any): any {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return value;
    }

    replacerChain(key: string, value: any) {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return this._replacer(key, value);
    }

    stringify(value: any, space?: string | number): string {
        this.install();
        try {
            let result = JSON.stringify(value, this._replacer ? this.replacerChain : this.replacer, space);
            this.uninstall();
            return result;
        }
        catch (err) {
            this.uninstall();
            throw err;
        }
    }
}

ToJSONReviver.CreateV2 = (reviver?: (key: string, value: any) => any): ToJSONReviver => {
    return new ToJSONReviverImpl(reviver);
}

class ToJSONReviverImpl implements ToJSONReviver {
    private _reviver: Function;

    constructor(reviver: (key: string, value: any) => any) {
        this._reviver = reviver;
    }
   
    reviver(key: string, value: any) {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }

            // Is it JSONFormat ?
            if ((typeof value.type === 'string') && value.hasOwnProperty('data')) {
                const format = JSONFormatClass.maps.get(value.type);
                if (format) {
                    return format.create(value.data);
                }
            }
        }
        return value;
    }
    
    reviverChain(key: string, value: any): any {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            // Is it JSONFormat ?
            if ((typeof value.type === 'string') && value.hasOwnProperty('data')) {
                const format = JSONFormatClass.maps.get(value.type);
                if (format) {
                    return format.create(value.data);
                }
            }
        }
        return this._reviver(key, value);
    }

    parse(text: string): any {
        return JSON.parse(text, this._reviver ? this.reviverChain : this.reviver);
    }
}
