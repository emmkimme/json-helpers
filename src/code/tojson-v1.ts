import { JSONReplacerFactory, JSONReviverFactory } from './tojson';
import type { JSONReplacer, JSONReviver } from './tojson';
import { JSONReplacerImpl, JSONReviverImpl } from './tojson-impl';

import type { JSONFormatter, JSONFormattersMap } from './json-formatter';
import { dateJSONSupport, errorJSONSupport, typeErrorJSONSupport, bufferJSONSupport } from './json-formatter-default';

const jsonFormattersMap: JSONFormattersMap = new Map<string, JSONFormatter<any>>();
jsonFormattersMap.set(dateJSONSupport.objectName, dateJSONSupport);
jsonFormattersMap.set(errorJSONSupport.objectName, errorJSONSupport);
jsonFormattersMap.set(typeErrorJSONSupport.objectName, typeErrorJSONSupport);
jsonFormattersMap.set(bufferJSONSupport.objectName, bufferJSONSupport);

const jsonReplacer = new JSONReplacerImpl(jsonFormattersMap);
JSONReplacerFactory.GetV1 = (): JSONReplacer => {
    return jsonReplacer;
}

const jsonReviver = new JSONReviverImpl(jsonFormattersMap);
JSONReviverFactory.GetV1 = (): JSONReviver => {
    return jsonReviver;
}

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
export namespace JSONParser {
    export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        return jsonReplacer.stringify(value, replacer, space);
    }

   export function parse(text: string, reviver?: (key: any, value: any) => any): any {
        return jsonReviver.parse(text, reviver);
    }
}
