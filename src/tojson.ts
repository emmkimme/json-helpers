
import { Buffer } from 'buffer';


export namespace ToJSONConstants {
    export const JSON_TOKEN_UNDEFINED = '_/undefined/_';
}

export namespace ToJSONReplacer {
    export function Create(replacer?: (key: string, value: any) => any): ToJSONReplacer {
        if (replacer) {
            return new ToJSONReplacerOverride(replacer);
        }
        else {
            return new ToJSONReplacerDirect();
        }
    }
}

export interface ToJSONReplacer {
    activate(): void;
    restore(): void;
    replacer(key: string, value: any): any;
}

// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
class ToJSONReplacerDirect implements ToJSONReplacer {
    private static previousDateToJSON = Date.prototype.toJSON;
    // private static previousErrorToJSON = Error.prototype.toJSON;
    // private static previousTypeErrorToJSON = TypeError.prototype.toJSON;

    constructor() {
    }
   
    activate(): void {
        Date.prototype.toJSON = function(key?: string): any {
            return { type: 'Date', data: this.valueOf() };
        };

        // We lost name and stack !
        try {
            Object.defineProperty(Error.prototype, 'toJSON', { 
                value: function(key?: string): any {
                    return { type: 'Error', data: this.message };
                }
            });

            TypeError.name
            Object.defineProperty(TypeError.prototype, 'toJSON', { 
                value: function(key?: string): any {
                    return { type: 'TypeError', data: this.message };
                }
            });
        }
        catch(err) {
        }
    }

    replacer(key: string, value: any): any {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return value;
    }

    restore(): void {
        Date.prototype.toJSON = ToJSONReplacerDirect.previousDateToJSON;
        // Error.prototype['toJSON'] = ToJSONReplacer.previousErrorToJSON;
        // TypeError.prototype['toJSON'] = ToJSONReplacer.previousTypeErrorToJSON;
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

export namespace ToJSONReviver {
    export function Create(reviver?: (key: string, value: any) => any): ToJSONReviver {
        if (reviver) {
            return new ToJSONReviverOverride(reviver);
        }
        else {
            return new ToJSONReviverDirect();
        }
    }
}

export interface ToJSONReviver {
    reviver(key: string, value: any): any;
}

class ToJSONReviverDirect implements ToJSONReviver {
    constructor() {
    }
   
    reviver(key: string, value: any) {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            if (value.hasOwnProperty('data') && value.type) {
                if (value.type === 'Buffer') {
                    return Buffer.from(value.data);
                }
                if (value.type === 'Date') {
                    return new Date(value.data);
                }
                if (value.type === 'Error') {
                    return new Error(value.data);
                }
                if (value.type === 'TypeError') {
                    return new TypeError(value.data);
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
            if (value.data && value.type) {
                if (value.type === 'Buffer') {
                    return Buffer.from(value.data);
                }
                if (value.type === 'Date') {
                    return new Date(value.data);
                }
                if (value.type === 'Error') {
                    return new Error(value.data);
                }
                if (value.type === 'TypeError') {
                    return new TypeError(value.data);
                }
            }
        }
        return this._reviver ? this._reviver(key, value) : value;
    }
}
