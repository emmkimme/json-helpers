import type { JSONFormatterData, JSONReplacerData, JSONReviverData } from "./json-formatter";

export namespace ToJSONConstants {
    export const JSON_TOKEN_UNDEFINED = '_/undefined/_';
}

export interface JSONLike {
    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
    parse(text: string, reviver?: (key: string, value: any) => any): any;
}

export function IsJSONLike(obj: any): obj is JSONLike {
    return ((typeof obj === 'object') && obj.stringify && obj.parse);
}

export interface JSONReplacer extends Pick<JSONLike, 'stringify'> {
    replacer<T>(replacer: JSONReplacerData<T>): void;
    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string;
}

export interface JSONReviver extends Pick<JSONLike, 'parse'> {
    reviver<T>(reviver: JSONReviverData<T>): void;
    parse(text: string, reviver?: (key: string, value: any) => any): any;
}

export interface JSONParserInterface extends JSONReplacer, JSONReviver, JSONLike {
    formatter<T>(jsonFormatter: JSONFormatterData<T>): void;
    install(): void;
    uninstall(): void;
}