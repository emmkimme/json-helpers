import type { JSONReviver } from './json-parser';
import { ToJSONConstants } from './json-parser';
import type { JSONReviverData } from './json-formatter';

/** @internal */
export class JSONReviverImpl implements JSONReviver {
    private _jsonReviversMap: Map<string, JSONReviverData<any>>;

    constructor() {
        this._jsonReviversMap = new Map<string, JSONReviverData<any>>();

        // callback
        this._reviver = this._reviver.bind(this)
    }

    reviver<T>(reviver: JSONReviverData<T>) {
        if (reviver.unserialize) {
            this._jsonReviversMap.set(reviver.objectType, reviver);
        }
        else {
            this._jsonReviversMap.delete(reviver.objectType);
        }
    }
   
    private _reviver(key: string, value: any) {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            // Is it JSONFormatter ? - duck typing
            if ((typeof value.type === 'string') && ('data' in value)) {
                const format = this._jsonReviversMap.get(value.type);
                if (format) {
                    return format.unserialize(value.data);
                }
            }
        }
        return value;
    }
    
    private _reviverChain(reviver: (key: string, value: any) => any, key: string, value: any): any {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            // Is it JSONFormatter ? - duck typing
            if ((typeof value.type === 'string') && ('data' in value)) {
                const format = this._jsonReviversMap.get(value.type);
                if (format) {
                    return format.unserialize(value.data);
                }
            }
        }
        return reviver(key, value);
    }

    parse(text: string, reviver?: (this: any, key: string, value: any) => any): any {
        const reviverCb = reviver ? this._reviverChain.bind(this, reviver) : this._reviver;
        return JSON.parse(text, reviverCb);
    }
}
