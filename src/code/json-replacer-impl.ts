import type { JSONReplacer } from './json-parser';
import { ToJSONConstants } from './json-parser';
import type { JSONReplacerData } from './json-formatter';

// Purpose is to manage 'undefined', 'Buffer', 'Date', 'Error', 'TypeError'
/** @internal */
export class JSONReplacerImpl implements JSONReplacer {
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

class JSONReplacerSetup<T extends Object> implements JSONReplacerData<T> {
    objectType: string;
    // objectInstance: T;
    objectConstructor: ObjectConstructor;
    serialize:(t: T) => any;
    toJSONPrototype: Object;
    
    protected _toJSONDescriptor: PropertyDescriptor;

    constructor(replacer: JSONReplacerData<T>) {
        // Object.assign(this, replacer);
        this.objectType = replacer.objectType;
        this.objectConstructor = replacer.objectConstructor;
        this.serialize = replacer.serialize;

        // const objectConstructor = replacer.objectInstance.constructor;
        const objectConstructor = this.objectConstructor;

        if (!this.findFunction(objectConstructor, 'toJSON') && !this.findFunction(objectConstructor, 'toString')) {
            this.toJSONPrototype = objectConstructor.prototype;
            this._toJSONDescriptor = {
                value: function (): any {
                    return this.toString();
                },
                configurable: true,
                enumerable: false,
                writable: true
            };
        }
    }
    
    protected findFunction(objectConstructor: Function, name: string) {
        let proto = objectConstructor.prototype;
        this._toJSONDescriptor = Object.getOwnPropertyDescriptor(proto, name);
        if (this._toJSONDescriptor) {
            this.toJSONPrototype = proto;
            return true;
        }
        else {
            proto = Object.getPrototypeOf(objectConstructor);
            while (proto) {
                this._toJSONDescriptor = Object.getOwnPropertyDescriptor(proto, name);
                if (this._toJSONDescriptor) {
                    this.toJSONPrototype = proto;
                    return true;
                }
                proto = Object.getPrototypeOf(proto);
            }
        }
        return false;
    }

    install() {
        if (this.toJSONPrototype) {
            try {
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
            catch (err) {
            }
        }
    }

    uninstall() {
        if (this.toJSONPrototype) {
            try {
                Object.defineProperty(this.toJSONPrototype, 'toJSON', this._toJSONDescriptor);
            }
            catch (err) {
            }
        }
    }

    // // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
    // // For test purpose, not called
    // // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
    // delete() {
    //     if (this.serialize) {
    //         try {
    //             if (this._toJSONDescriptor) {
    //                 const self = this;
    //                 Object.defineProperty(this._objectConstructor.prototype, 'toJSON', self._toJSONDescriptor);
    //             }
    //             else {
    //                 delete (this._objectConstructor.prototype as any)['toJSON' ];
    //             }
    //         }
    //         catch (err) {
    //         }
    //     }
    // }
}
