import { ToJSONReplacer, ToJSONReviver, ToJSONConstants } from './tojson';
import { JSONFormattersMap } from './json-formatter';

// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
/** @internal */
export class ToJSONReplacerImpl implements ToJSONReplacer {
    private _jsonFormattersMap: JSONFormattersMap;

    constructor(jsonFormattersMap: JSONFormattersMap) {
        this._jsonFormattersMap = jsonFormattersMap;
    }
    
    install(): void {
        this._jsonFormattersMap.forEach(item => {
            item.install();
        });
    }

    uninstall(): void {
        this._jsonFormattersMap.forEach(item => {
            item.uninstall();
        });
    }

    replacer(key: string, value: any): any {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return value;
    }

    replacerChain(replacer: (key: string, value: any) => any, key: string, value: any) {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return replacer(key, value);
    }

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        this.install();
        try {
            const replacerCb = replacer ? this.replacerChain.bind(this, replacer) : this.replacer.bind(this);
            const result = JSON.stringify(value, replacerCb, space);
            this.uninstall();
            return result;
        }
        catch (err) {
            this.uninstall();
            throw err;
        }
    }
}

/** @internal */
export class ToJSONReviverImpl implements ToJSONReviver {
    private _jsonFormattersMap: JSONFormattersMap;

    constructor(jsonFormattersMap: JSONFormattersMap) {
        this._jsonFormattersMap = jsonFormattersMap;
    }
   
    reviver(key: string, value: any) {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }

            // Is it JSONFormat ?
            if ((typeof value.type === 'string') && value.hasOwnProperty('data')) {
                const format = this._jsonFormattersMap.get(value.type);
                if (format) {
                    return format.create(value.data);
                }
            }
        }
        return value;
    }
    
    reviverChain(reviver: (key: string, value: any) => any, key: string, value: any): any {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            // Is it JSONFormat ?
            if ((typeof value.type === 'string') && value.hasOwnProperty('data')) {
                const format = this._jsonFormattersMap.get(value.type);
                if (format) {
                    return format.create(value.data);
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
