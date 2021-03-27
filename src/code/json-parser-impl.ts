import { JSONReplacerToJSONImpl } from './json-replacer-tojson-impl';
import { JSONReviverImpl } from './json-reviver-impl';

import type { JSONFormatterData, JSONReplacerData, JSONReviverData } from './json-formatter';
import type { JSONParserInterface } from './json-parser';

export class JSONParserImpl implements JSONParserInterface {
    protected _jsonReplacerToJSON: JSONReplacerToJSONImpl;
    protected _jsonReviver: JSONReviverImpl;

    constructor() {
        this._jsonReplacerToJSON = new JSONReplacerToJSONImpl();
        this._jsonReviver = new JSONReviverImpl();
    }
    
    reviver<T>(reviver: JSONReviverData<T>): void {
        this._jsonReviver.reviver(reviver);
    }

    replacer<T>(replacer: JSONReplacerData<T>): void {
        this._jsonReplacerToJSON.replacer(replacer);
    }

    formatter<T>(jsonFormatter: JSONFormatterData<T>): void {
        this._jsonReplacerToJSON.replacer(jsonFormatter);
        this._jsonReviver.reviver(jsonFormatter);
    }

    install(): void {
        this._jsonReplacerToJSON.install();
    }

    uninstall(): void {
        this._jsonReplacerToJSON.uninstall();
    }

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        return this._jsonReplacerToJSON.stringify(value, replacer, space);
    }

    parse(text: string, reviver?: (key: any, value: any) => any): any {
        return this._jsonReviver.parse(text, reviver);
    }
}
