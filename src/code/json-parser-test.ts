import { DateJSONFormatter, ErrorJSONFormatter, TypeErrorJSONFormatter, BufferJSONFormatter, Uint8ArrayJSONFormatter } from './json-formatter-default';
import { JSONParserImpl } from './json-parser-impl';
import type { JSONParserInterface } from './json-parser';
import { JSONReplacerInstanceOfImpl as JSONReplacerTestInstance } from './json-replacer-instanceof-impl';
// import { JSONReplacerPrototypeImpl as JSONReplacerTestInstance } from './json-replacer-prototype-impl';
import type { JSONFormatterData } from './json-formatter';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
class JSONParserTestImpl extends JSONParserImpl {
    protected _jsonReplacerInstanceOf: JSONReplacerTestInstance;

    constructor() {
        super();

        this._jsonReplacerInstanceOf = new JSONReplacerTestInstance();

        this.formatter<Date>(DateJSONFormatter);
        this.formatter<Error>(ErrorJSONFormatter);
        this.formatter<TypeError>(TypeErrorJSONFormatter);
        this.formatter<Buffer>(BufferJSONFormatter);
        this.formatter<Uint8Array>(Uint8ArrayJSONFormatter);
    }

    formatter<T>(jsonFormatter: JSONFormatterData<T>): void {
        super.formatter<T>(jsonFormatter);
        this._jsonReplacerInstanceOf.replacer(jsonFormatter);
    }

    stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        return this._jsonReplacerInstanceOf.stringify(value, replacer, space);
    }
}

export const JSONParserTest: JSONParserInterface = new JSONParserTestImpl();
