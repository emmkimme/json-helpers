import type { JSONReplacer, JSONReviver } from './json-parser';
import { ToJSONConstants } from './json-parser';
import { JSONReplacerSetup } from './json-formatter-setup';
import type { JSONReplacerData, JSONReviverData } from './json-formatter';

// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
/** @internal */
export class JSONReplacerImpl implements JSONReplacer {
    private _jsonReplacerSetupsMap: Map<string, JSONReplacerSetup<any>>;
    private _installed: number;

    constructor() {
        this._jsonReplacerSetupsMap = new Map<string, JSONReplacerSetup<any>>();
        this._installed = 0;

        // callback
        this._replacer = this._replacer.bind(this)
    }

    replacer<T>(replacer: JSONReplacerData<T>) {
        const setup = new JSONReplacerSetup<T>(replacer);
        this._jsonReplacerSetupsMap.set(replacer.objectType, setup);
    }

    private _replacer(key: string, value: any): any {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return value;
    }

    private _replacerChain(replacer: (key: string, value: any) => any, key: string, value: any) {
        if (typeof key === 'undefined') {
            return ToJSONConstants.JSON_TOKEN_UNDEFINED;
        }
        return replacer(key, value);
    }
    
    install(): void {
        if (this._installed++ === 0) {
            this._jsonReplacerSetupsMap.forEach((item) => {
                item.install();
            });
        }
    }
    
    uninstall(): void {
        if (--this._installed === 0) {
            this._jsonReplacerSetupsMap.forEach((item) => {
                item.uninstall();
            });
        }
    }

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        try {
            this.install();
            const replacerCb = replacer ? this._replacerChain.bind(this, replacer) : this._replacer;
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
export class JSONReviverImpl implements JSONReviver {
    private _jsonReviversMap: Map<string, JSONReviverData<any>>;

    constructor() {
        this._jsonReviversMap = new Map<string, JSONReviverData<any>>();

        // callback
        this._reviver = this._reviver.bind(this)
    }

    reviver<T>(reviver: JSONReviverData<T>) {
        this._jsonReviversMap.set(reviver.objectType, reviver);
    }
   
    private _reviver(key: string, value: any) {
        if (value) {
            if (value === ToJSONConstants.JSON_TOKEN_UNDEFINED) {
                return undefined;
            }
            // Is it JSONFormatter ? - duck typing
            if ((typeof value.type === 'string') && value.hasOwnProperty('data')) {
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
            if ((typeof value.type === 'string') && value.hasOwnProperty('data')) {
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
        return JSON.parse(text, reviverCb);
    }
}
