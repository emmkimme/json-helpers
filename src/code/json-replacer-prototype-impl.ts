import type { JSONReplacer } from './json-parser';
import { ToJSONConstants } from './json-parser';
import type { JSONReplacerData } from './json-formatter';

// Purpose is to manage 'Buffer', 'Date', 'Error', 'TypeError'
class JSONReplacerSetup<T extends Object> implements JSONReplacerData<T> {
    objectType: string;
    // objectInstance: T;
    objectConstructor: ObjectConstructor;
    serialize: (t: T) => any;
    toJSONPrototype: Object;
    protected _toOriginalProtype: any;

    constructor(replacer: JSONReplacerData<T>) {
        // Object.assign(this, replacer);
        this.objectType = replacer.objectType;
        this.objectConstructor = replacer.objectConstructor;
        this.serialize = replacer.serialize;

        // const objectConstructor = replacer.objectInstance.constructor;
        const objectConstructor = this.objectConstructor;
        this._toOriginalProtype = objectConstructor.prototype;
        this.toJSONPrototype = Object.assign({}, this._toOriginalProtype);
        const self = this;
        Object.defineProperty(this.toJSONPrototype, 'toJSON', {
            // Beware the 'this' context is the object instance itself
            value: function (): any {
                return { type: self.objectType, data: self.serialize(this) };
            },
            configurable: true,
            enumerable: false,
            writable: true
        });

    }

    install() {
        try {
            Object.setPrototypeOf(this.objectConstructor, this.toJSONPrototype);
        }
        catch (err) {
            console.error(`${err}`);
        }
    }

    uninstall() {
        try {
            Object.setPrototypeOf(this.objectConstructor, this._toOriginalProtype);
        }
        catch (err) {
            console.error(`${err}`);
        }
    }
}

/** @internal */
export class JSONReplacerPrototypeImpl implements JSONReplacer {
    private _jsonReplacerSetupsMap: Map<Object, JSONReplacerSetup<any>>;
    private _installed: number;

    constructor() {
        this._jsonReplacerSetupsMap = new Map<Object, JSONReplacerSetup<any>>();
        this._installed = 0;

        // callback
        this._replacer = this._replacer.bind(this)
    }

    replacer<T>(replacer: JSONReplacerData<T>) {
        const setup = new JSONReplacerSetup<T>(replacer);
        if (replacer.serialize) {
            this._jsonReplacerSetupsMap.set(setup.toJSONPrototype, setup);
        }
        else {
            this._jsonReplacerSetupsMap.delete(setup.toJSONPrototype);
        }
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

