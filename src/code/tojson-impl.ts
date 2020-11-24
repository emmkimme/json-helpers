import type { JSONReplacer, JSONReviver } from './tojson';
import { ToJSONConstants } from './tojson';
import type { JSONFormattersMap } from './json-formatter';

// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
/** @internal */
export class JSONReplacerImpl implements JSONReplacer {
    private _jsonFormattersMap: JSONFormattersMap;

    constructor(jsonFormattersMap: JSONFormattersMap) {
        this._jsonFormattersMap = jsonFormattersMap;
    }
    
    private replacer(key: string, value: any): any {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return value;
    }

    private replacerChain(replacer: (key: string, value: any) => any, key: string, value: any) {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return replacer(key, value);
    }

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        this._jsonFormattersMap.forEach((item) => {
            item.install();
        });
        try {
            const replacerCb = replacer ? this.replacerChain.bind(this, replacer) : this.replacer.bind(this);
            const result = JSON.stringify(value, replacerCb, space);
            this._jsonFormattersMap.forEach((item) => {
                item.uninstall();
            });
            return result;
        }
        catch (err) {
            this._jsonFormattersMap.forEach((item) => {
                item.uninstall();
            });
            throw err;
        }
    }
}

/** @internal */
export class JSONReviverImpl implements JSONReviver {
    private _jsonFormattersMap: JSONFormattersMap;

    constructor(jsonFormattersMap: JSONFormattersMap) {
        this._jsonFormattersMap = jsonFormattersMap;
    }
   
    private reviver(key: string, value: any) {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            // Is it JSONFormat ?
            if ((typeof value.type === 'string') && value.hasOwnProperty('data')) {
                const format = this._jsonFormattersMap.get(value.type);
                if (format) {
                    return format.unserialize(value.data);
                }
            }
        }
        return value;
    }
    
    private reviverChain(reviver: (key: string, value: any) => any, key: string, value: any): any {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            // Is it JSONFormat ?
            if ((typeof value.type === 'string') && value.hasOwnProperty('data')) {
                const format = this._jsonFormattersMap.get(value.type);
                if (format) {
                    return format.unserialize(value.data);
                }
            }
        }
        return reviver(key, value);
    }

    parse(text: string, reviver?: (key: string, value: any) => any): any {
        const reviverCb = reviver ? this.reviverChain.bind(this, reviver) : this.reviver.bind(this);
        return JSON.parse(text, reviverCb);
    }
}
