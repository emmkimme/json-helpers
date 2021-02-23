import { DateJSONFormatter, ErrorJSONFormatter, TypeErrorJSONFormatter, BufferBinaryJSONFormatter, Uint8ArrayJSONFormatter } from './json-formatter-default';
import { JSONParserImpl } from './json-parser-impl';
import type { JSONParserInterface } from './json-parser';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
class JSONParserV2Impl extends JSONParserImpl {
    constructor() {
        super();

        this.formatter<Date>(DateJSONFormatter);
        this.formatter<Error>(ErrorJSONFormatter);
        this.formatter<TypeError>(TypeErrorJSONFormatter);
        this.formatter<Buffer>(BufferBinaryJSONFormatter);
        this.formatter<Uint8Array>(Uint8ArrayJSONFormatter);
    }
}

export const JSONParserV2: JSONParserInterface = new JSONParserV2Impl();
