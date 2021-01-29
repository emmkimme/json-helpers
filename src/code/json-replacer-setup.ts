import type { JSONReplacerData } from "./json-formatter";

export class JSONReplacerSetup<T extends Object> {
    readonly objectType: string;
    
    readonly serialize:(t: T) => any;
    
    protected _jsonReplacer: JSONReplacerData<T>;
    protected _toJSONDescriptor: PropertyDescriptor;
    protected _toJSONPrototype: Object;

    constructor(replacer: JSONReplacerData<T>) {
        this._jsonReplacer = replacer;

        const objectConstructor = replacer.objectInstance.constructor;

        this.objectType = replacer.objectType || objectConstructor.name;
        this.serialize = this._jsonReplacer.serialize;

        if (this.serialize && !this.findFunction(objectConstructor, 'toJSON') && !this.findFunction(objectConstructor, 'toString')) {
            this._toJSONPrototype = objectConstructor.prototype;
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
            this._toJSONPrototype = proto;
            return true;
        }
        else {
            proto = Object.getPrototypeOf(objectConstructor);
            while (proto) {
                this._toJSONDescriptor = Object.getOwnPropertyDescriptor(proto, name);
                if (this._toJSONDescriptor) {
                    this._toJSONPrototype = proto;
                    return true;
                }
                proto = Object.getPrototypeOf(proto);
            }
        }
        return false;
    }

    install() {
        if (this._toJSONPrototype) {
            try {
                const self = this;
                Object.defineProperty(this._toJSONPrototype, 'toJSON', {
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
        if (this._toJSONPrototype) {
            try {
                Object.defineProperty(this._toJSONPrototype, 'toJSON', this._toJSONDescriptor);
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
