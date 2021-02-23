import type { JSONFormatterData, JSONReplacerData, JSONReviverData } from "./json-formatter";

export namespace ToJSONConstants {
    export const JSON_TOKEN_UNDEFINED = '_/undefined/_';
}

export interface JSONReplacer {
    replacer<T>(replacer: JSONReplacerData<T>): void;
    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string
}

export interface JSONReviver {
    reviver<T>(reviver: JSONReviverData<T>): void;
    parse(text: string, reviver?: (key: string, value: any) => any): any;
}

export interface JSONParserInterface extends JSONReplacer, JSONReviver {
    formatter<T>(jsonFormatter: JSONFormatterData<T>): void;
    install(): void;
    uninstall(): void;
}