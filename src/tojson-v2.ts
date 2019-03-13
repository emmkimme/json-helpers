
import { Buffer } from 'buffer';
import { ToJSONReplacer, ToJSONReviver, ToJSONConstants } from './tojson';

ToJSONReplacer.CreateV2 = (replacer?: (key: string, value: any) => any): ToJSONReplacer => {
    if (replacer) {
        return new ToJSONReplacerOverride(replacer);
    }
    else {
        return new ToJSONReplacerDirect();
    }
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

// toJSON is implemented by Buffer !
const bufferJSONSupport = new JSONFormatClass(
    'Buffer', 
    (TypeError as unknown) as ObjectConstructor, 
    null, 
    (data: string) => Buffer.from(data)
);
bufferJSONSupport;


// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
class ToJSONReplacerDirect implements ToJSONReplacer {
    // private static previousErrorToJSON = Error.prototype.toJSON;
    // private static previousTypeErrorToJSON = TypeError.prototype.toJSON;

    constructor() {
    }
   
    install(): void {
        JSONFormatClass.maps.forEach(item => {
            item.install();
        });
    }

    replacer(key: string, value: any): any {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return value;
    }

    uninstall(): void {
        JSONFormatClass.maps.forEach(item => {
            item.uninstall();
        });
    }
}

class ToJSONReplacerOverride extends ToJSONReplacerDirect {
    private _replacer: Function;

    constructor(replacer: (key: string, value: any) => any) {
        super();

        this._replacer = replacer;
    }

    replacer(key: string, value: any) {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return this._replacer(key, value);
    }
}

ToJSONReviver.CreateV2 = (reviver?: (key: string, value: any) => any): ToJSONReviver => {
    if (reviver) {
        return new ToJSONReviverOverride(reviver);
    }
    else {
        return new ToJSONReviverDirect();
    }
}

class ToJSONReviverDirect implements ToJSONReviver {
    constructor() {
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
}

class ToJSONReviverOverride extends ToJSONReviverDirect {
    private _reviver: Function;

    constructor(reviver: (key: string, value: any) => any) {
        super();

        this._reviver = reviver;
    }
   
    reviver(key: string, value: any): any {
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
        return this._reviver ? this._reviver(key, value) : value;
    }
}
