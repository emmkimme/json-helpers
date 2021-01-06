export interface JSONFormatter<T> {
    objectConstructor: ObjectConstructor,
    objectType?: string,
    serialize?: (t: T) => any;
    unserialize?: (data: any) => T;
}
