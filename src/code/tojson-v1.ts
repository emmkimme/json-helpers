import { JSONReplacerImpl, JSONReviverImpl } from './tojson-impl';

import { JSONSetup, JSONSetupsMap } from './json-setup';
import type { JSONFormatter } from './json-formatter';
import { DateJSONFormatter, ErrorJSONFormatter, TypeErrorJSONFormatter, BufferJSONFormatter } from './json-formatter-default';
import type { JSONParser as JSONParserInterface } from './tojson';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
class JSONParserImpl implements JSONParserInterface {
    private _jsonSetupsMap: JSONSetupsMap;
    private _jsonReplacer: JSONReplacerImpl;
    private _jsonReviver: JSONReviverImpl;

    constructor() {
        this._jsonSetupsMap = new Map<string, JSONSetup<any>>();
        this._jsonReplacer = new JSONReplacerImpl(this._jsonSetupsMap);
        this._jsonReviver = new JSONReviverImpl(this._jsonSetupsMap);

        this.setup<Date>(DateJSONFormatter);
        this.setup<Error>(ErrorJSONFormatter);
        this.setup<TypeError>(TypeErrorJSONFormatter);
        this.setup<Buffer>(BufferJSONFormatter);
    }
    
    setup<T>(jsonFormatter: JSONFormatter<T>): void {
        const jsonSetup = new JSONSetup<T>(jsonFormatter);
        this._jsonSetupsMap.set(jsonSetup.objectType, jsonSetup);
    }

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        return this._jsonReplacer.stringify(value, replacer, space);
    }

    parse(text: string, reviver?: (key: any, value: any) => any): any {
        return this._jsonReviver.parse(text, reviver);
    }
}

export const JSONParser: JSONParserInterface = new JSONParserImpl();