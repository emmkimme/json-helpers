export type JSONFormattersMap = Map<string, JSONFormatter>;

export class JSONFormatter {
    objectName: string;
    objectConstructor: ObjectConstructor;
    previousToJSON: PropertyDescriptor;
    serialize?: Function;
    unserialize?: Function;

    constructor(objectName: string, objectConstructor: ObjectConstructor, serialize?: (t: any) => any, unserialize?: (data: any) => any) {
        this.objectName = objectName;
        this.objectConstructor = objectConstructor;
        this.previousToJSON = Object.getOwnPropertyDescriptor(objectConstructor.prototype, 'toJSON');
        this.unserialize = unserialize;
        this.serialize = serialize;
    }

    create(data: any): any {
        return this.unserialize(data);
    }

    install() {
        if (this.serialize) {
            let self = this;
            Object.defineProperty(this.objectConstructor.prototype, 'toJSON', { 
                value: function(): any {
                    return { type: self.objectName, data: self.serialize(this) };
                },
                configurable: true
            });
        }
    }

    uninstall() {
        if (this.serialize) {
            if (this.previousToJSON) {
                let self = this;
                Object.defineProperty(this.objectConstructor.prototype, 'toJSON', self.previousToJSON);
            }
            else {
                Object.defineProperty(this.objectConstructor.prototype, 'toJSON', { 
                    value: function(): any {
                        return this.toString();
                    },
                    configurable: true,
                    enumerable: false
                });
            }
        }
    }
}
