export type JSONFormattersMap = Map<string, JSONFormatter<any>>;

export class JSONFormatter<T extends Object> {
    objectName: string;
    serialize?: Function;
    unserialize?: Function;

    protected _objectConstructor: ObjectConstructor;
    protected _previousToJSON: PropertyDescriptor;

    constructor(objectConstructor: ObjectConstructor, serialize?: (t: T) => any, unserialize?: (data: any) => T) {
        this._objectConstructor = objectConstructor;
        this._previousToJSON = Object.getOwnPropertyDescriptor(objectConstructor.prototype, 'toJSON');

        this.objectName = objectConstructor.name;
        this.unserialize = unserialize;
        this.serialize = serialize;
    }

    install() {
        if (this.serialize) {
            try {
                const self = this;
                Object.defineProperty(this._objectConstructor.prototype, 'toJSON', {
                    value: function (): any {
                        return { type: self.objectName, data: self.serialize(this) };
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
        if (this.serialize) {
            try {
                if (this._previousToJSON) {
                    Object.defineProperty(this._objectConstructor.prototype, 'toJSON', this._previousToJSON);
                }
                else {
                    Object.defineProperty(this._objectConstructor.prototype, 'toJSON', {
                        value: function (): any {
                            return this.toString();
                        },
                        configurable: true,
                        enumerable: false,
                        writable: true
                    });
                }
            }
            catch (err) {
            }
        }
    }

    // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
    // For test purpose, not called
    // /!\ /!\ /!\ /!\ /!\ /!\ /!\ /!\
    delete() {
        if (this.serialize) {
            try {
                if (this._previousToJSON) {
                    const self = this;
                    Object.defineProperty(this._objectConstructor.prototype, 'toJSON', self._previousToJSON);
                }
                else {
                    delete (this._objectConstructor.prototype as any)['toJSON' ];
                }
            }
            catch (err) {
            }
        }
    }
}
