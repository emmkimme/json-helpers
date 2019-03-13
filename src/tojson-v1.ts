
import { Buffer } from 'buffer';
import { ToJSONReplacer, ToJSONReviver, ToJSONConstants } from './tojson';

ToJSONReplacer.Create = ToJSONReplacer.CreateV1 = (replacer?: (key: string, value: any) => any): ToJSONReplacer => {
    return new ToJSONReplacerImpl(replacer);
}

// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
class ToJSONReplacerImpl implements ToJSONReplacer {
    private static previousDateToJSON = Date.prototype.toJSON;
    // private static previousErrorToJSON = Error.prototype.toJSON;
    // private static previousTypeErrorToJSON = TypeError.prototype.toJSON;

    private _replacer: Function;

    constructor(replacer: (key: string, value: any) => any) {
        this._replacer = replacer;
    }

    install(): void {
        Date.prototype.toJSON = function(key?: string): any {
            return { type: 'Date', data: this.valueOf() };
        };

        // We lost name and stack !
        try {
            Object.defineProperty(Error.prototype, 'toJSON', { 
                value: function(key?: string): any {
                    return { type: 'Error', data: this.message };
                },
                configurable: true
            });

            TypeError.name
            Object.defineProperty(TypeError.prototype, 'toJSON', { 
                value: function(key?: string): any {
                    return { type: 'TypeError', data: this.message };
                },
                configurable: true
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

    replacerChain(key: string, value: any) {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return this._replacer(key, value);
    }

    uninstall(): void {
        Date.prototype.toJSON = ToJSONReplacerImpl.previousDateToJSON;
        // Error.prototype['toJSON'] = ToJSONReplacer.previousErrorToJSON;
        // TypeError.prototype['toJSON'] = ToJSONReplacer.previousTypeErrorToJSON;
    }

    stringify(value: any, space?: string | number): string {
        this.install();
        try {
            let result = JSON.stringify(value, this._replacer ? this.replacerChain : this.replacer);
            this.uninstall();
            return result;
        }
        catch (err) {
            this.uninstall();
            throw err;
        }
    }
}

ToJSONReviver.Create = ToJSONReviver.CreateV1 = (reviver?: (key: string, value: any) => any): ToJSONReviver => {
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

    reviverChain(key: string, value: any): any {
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
        return this._reviver(key, value);
    }

    parse(text: string): any {
        return JSON.parse(text, this._reviver ? this.reviverChain : this.reviver);
    }
}
