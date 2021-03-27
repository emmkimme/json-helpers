import type { JSONReplacer } from './json-parser';
import { ToJSONConstants } from './json-parser';
import type { JSONReplacerData } from './json-formatter';

function getObjectClass(constructor: any): string | null {
    if (typeof constructor === 'function') {
        /*
        *  for browsers which have name property in the constructor
        *  of the object,such as chrome 
        */
        if (constructor.name) {
            return constructor.name;
        }
        const str = constructor.toString();
        /*
        * executed if the return of object.constructor.toString() is 
        * "[object objectClass]"
        */
        if (str.charAt(0) == '[') {
            return str.subst(8, str.length - 1);
        }
        else {
            /*
            * executed if the return of object.constructor.toString() is 
            * "function objectClass () {}"
            * for IE Firefox
            */
            const arr = str.match(/function\s*(\w+)/);
            if (arr && arr.length == 2) {
                return arr[1];
            }
        }
    }
    return null;
}


// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
class JSONReplacerSetup<T extends Object> implements JSONReplacerData<T> {
    objectType: string;
    // objectInstance: T;
    objectConstructor: ObjectConstructor;
    serialize: (t: T) => any;
    objectClass: string;

    constructor(replacer: JSONReplacerData<T>) {
        // Object.assign(this, replacer);
        this.objectType = replacer.objectType;
        this.objectConstructor = replacer.objectConstructor;
        this.serialize = replacer.serialize;

        this.objectClass = getObjectClass(this.objectConstructor);
    }

    toJSON(obj: any) {
        return { type: this.objectType, data: this.serialize(obj) };
    }
}

/** @internal */
export class JSONReplacerInstanceOfImpl implements JSONReplacer {
    private _jsonReplacerSetupsMap: Map<string, JSONReplacerSetup<any>>;

    constructor() {
        this._jsonReplacerSetupsMap = new Map();

        // callback
        this._replacer = this._replacer.bind(this)
    }

    replacer<T>(replacer: JSONReplacerData<T>) {
        const setup = new JSONReplacerSetup<T>(replacer);
        if (replacer.serialize) {
            this._jsonReplacerSetupsMap.set(setup.objectClass, setup);
        }
        else {
            this._jsonReplacerSetupsMap.delete(setup.objectClass);
        }
    }

    private _replacer(key: string, value: any): any {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        if (value && value.constructor) {
            const objectClass = getObjectClass(value.constructor);
            if (objectClass) {
                const format = this._jsonReplacerSetupsMap.get(objectClass);
                if (format) {
                    return format.toJSON(value);
                }
            }
        }
        return value;
    }

    private _replacerChain(replacer: (key: string, value: any) => any, key: string, value: any) {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        if (value && value.constructor) {
            const objectClass = getObjectClass(value.constructor);
            if (objectClass) {
                const format = this._jsonReplacerSetupsMap.get(objectClass);
                if (format) {
                    return format.toJSON(value);
                }
            }
        }
        return replacer(key, value);
    }

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        const replacerCb = replacer ? this._replacerChain.bind(this, replacer) : this._replacer;
        return JSON.stringify(value, replacerCb, space);
    }
}

