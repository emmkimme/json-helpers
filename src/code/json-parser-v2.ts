import { JSONReplacerImpl, JSONReviverImpl } from './json-formatter-impl';

import type { JSONFormatterData, JSONReplacerData, JSONReviverData } from './json-formatter';
import { DateJSONFormatter, ErrorJSONFormatter, TypeErrorJSONFormatter, BufferBinaryJSONFormatter } from './json-formatter-default';
import type { JSONParserInterface } from './json-parser';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
class JSONParserV2Impl implements JSONParserInterface {
    private _jsonReplacer: JSONReplacerImpl;
    private _jsonReviver: JSONReviverImpl;

    constructor() {
        this._jsonReplacer = new JSONReplacerImpl();
        this._jsonReviver = new JSONReviverImpl();

        this.formatter<Date>(DateJSONFormatter);
        this.formatter<Error>(ErrorJSONFormatter);
        this.formatter<TypeError>(TypeErrorJSONFormatter);
        this.formatter<Buffer>(BufferBinaryJSONFormatter);
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

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        return this._jsonReplacer.stringify(value, replacer, space);
    }

    parse(text: string, reviver?: (key: any, value: any) => any): any {
        return this._jsonReviver.parse(text, reviver);
    }
}

export const JSONParserV2: JSONParserInterface = new JSONParserV2Impl();
