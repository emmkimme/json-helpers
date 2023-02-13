import type { JSONReviver } from './json-parser';
import { ToJSONConstants } from './json-parser';
import type { JSONReviverData } from './json-formatter';

/** @internal */
export class JSONReviverImpl implements JSONReviver {
    private _jsonReviversMap: Map<string, JSONReviverData<any>>;
    private hasUndefined = false;

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
                this.hasUndefined = true;
                return value;
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
                this.hasUndefined = true;
                return reviver(key, value);
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

    parse(text: string, reviver?: (key: string, value: any) => any): any {
        const reviverCb = reviver ? this._reviverChain.bind(this, reviver) : this._reviver;
        const result = JSON.parse(text, reviverCb);
        if (this.hasUndefined) {
            this.insertUndefined(result);
            this.hasUndefined = false;
        }
        return result;
    }
    
    private insertUndefined(value: unknown, parent?: Object, key?: string | number): void {
        if (Array.isArray(value)) {
            value.forEach((itemValue, itemIndex) => this.insertUndefined(itemValue, value, itemIndex));
        } else if (typeof value === "object" && value !== null) {
            Object.entries(value).forEach(([entryKey, entryValue]) => this.insertUndefined(entryValue, value, entryKey));
        } else if (parent !== undefined && key !== undefined) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                (parent as Record<string | number, unknown>)[key] = undefined;
            }
        }
    }
}
