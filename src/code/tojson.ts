import type { JSONFormatter } from "./json-formatter";

export namespace ToJSONConstants {
    export const JSON_TOKEN_UNDEFINED = '_/undefined/_';
}

export interface JSONReplacer {
    install(): void;
    uninstall(): void;
    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string
}

export interface JSONReviver {
    parse(text: string, reviver?: (key: string, value: any) => any): any;
}

export interface JSONParser {
    formatter<T>(jsonFormatter: JSONFormatter<T>): void;
    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string
    parse(text: string, reviver?: (key: string, value: any) => any): any;
}