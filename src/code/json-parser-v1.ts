import { DateJSONFormatter, ErrorJSONFormatter, TypeErrorJSONFormatter, BufferJSONFormatter } from './json-formatter-default';
import { JSONParserImpl } from './json-parser-impl';
import type { JSONParserInterface } from './json-parser';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
class JSONParserV1Impl extends JSONParserImpl {
    constructor() {
        super();

        this.formatter<Date>(DateJSONFormatter);
        this.formatter<Error>(ErrorJSONFormatter);
        this.formatter<TypeError>(TypeErrorJSONFormatter);
        this.formatter<Buffer>(BufferJSONFormatter);
    }
}

export const JSONParserV1: JSONParserInterface = new JSONParserV1Impl();
export const JSONParser = JSONParserV1;
