export namespace ToJSONConstants {
    export const JSON_TOKEN_UNDEFINED = '_/undefined/_';
}

export namespace ToJSONReplacer {
    export let Get: () => ToJSONReplacer;
    export let GetV1: () => ToJSONReplacer;
    export let GetV2: () => ToJSONReplacer;
}

export interface ToJSONReplacer {
    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string
}

export namespace ToJSONReviver {
    export let Get: () => ToJSONReviver;
    export let GetV1: () => ToJSONReviver;
    export let GetV2: () => ToJSONReviver;
}

export interface ToJSONReviver {
    parse(text: string, reviver?: (key: string, value: any) => any): any;
}