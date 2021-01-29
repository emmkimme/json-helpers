// unserialize data
export interface JSONReviverData<T> {
    objectType: string;
    unserialize: (data: any) => T;
}

// serialize data
export interface JSONReplacerData<T> {
    objectType: string;
    // serialize data
    objectInstance: T;
    // objectConstructor: ObjectConstructor,
    serialize: (t: T) => any;
}


export interface JSONFormatter<T> extends JSONReplacerData<T>, JSONReviverData<T> {
}
