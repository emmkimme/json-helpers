export namespace ToJSONConstants {
    export const JSON_TOKEN_UNDEFINED = '_/undefined/_';
}

export namespace JSONReplacerFactory {
    export let GetV1: () => JSONReplacer;
    export let GetV2: () => JSONReplacer;
}

export interface JSONReplacer {
    install(): void;
    uninstall(): void;
    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string
}

export namespace JSONReviverFactory {
    export let GetV1: () => JSONReviver;
    export let GetV2: () => JSONReviver;
}

export interface JSONReviver {
    parse(text: string, reviver?: (key: string, value: any) => any): any;
}