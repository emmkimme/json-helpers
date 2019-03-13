export namespace ToJSONConstants {
    export const JSON_TOKEN_UNDEFINED = '_/undefined/_';
}

export namespace ToJSONReplacer {
    export let Create: (replacer?: (key: string, value: any) => any) => ToJSONReplacer;
    export let CreateV1: (replacer?: (key: string, value: any) => any) => ToJSONReplacer;
    export let CreateV2: (replacer?: (key: string, value: any) => any) => ToJSONReplacer;
}

export interface ToJSONReplacer {
    install(): void;
    uninstall(): void;
    replacer(key: string, value: any): any;
}

export namespace ToJSONReviver {
    export let Create: (reviver?: (key: string, value: any) => any) => ToJSONReviver;
    export let CreateV1: (reviver?: (key: string, value: any) => any) => ToJSONReviver;
    export let CreateV2: (reviver?: (key: string, value: any) => any) => ToJSONReviver;
}

export interface ToJSONReviver {
    reviver(key: string, value: any): any;
}