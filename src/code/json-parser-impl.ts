import { JSONReplacerImpl } from './json-replacer-impl';
import { JSONReviverImpl } from './json-reviver-impl';

import type { JSONFormatterData, JSONReplacerData, JSONReviverData } from './json-formatter';
import type { JSONParserInterface } from './json-parser';

export class JSONParserImpl implements JSONParserInterface {
    protected _jsonReplacer: JSONReplacerImpl;
    protected _jsonReviver: JSONReviverImpl;

    constructor() {
        this._jsonReplacer = new JSONReplacerImpl();
        this._jsonReviver = new JSONReviverImpl();
    }
    
    reviver<T>(reviver: JSONReviverData<T>): void {
        this._jsonReviver.reviver(reviver);
    }

    replacer<T>(replacer: JSONReplacerData<T>): void {
        this._jsonReplacer.replacer(replacer);
    }

    formatter<T>(jsonFormatter: JSONFormatterData<T>): void {
        this._jsonReplacer.replacer(jsonFormatter);
        this._jsonReviver.reviver(jsonFormatter);
    }

    install(): void {
        this._jsonReplacer.install();
    }

    uninstall(): void {
        this._jsonReplacer.uninstall();
    }

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        return this._jsonReplacer.stringify(value, replacer, space);
    }

    parse(text: string, reviver?: (key: any, value: any) => any): any {
        return this._jsonReviver.parse(text, reviver);
    }
}
