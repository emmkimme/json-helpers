
import { ToJSONReplacer, ToJSONReviver } from './tojson';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
export namespace JSONParser {

    export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        let toJSONReplacer = ToJSONReplacer.Create(replacer);
        return toJSONReplacer.stringify(value, space);
    }

   export function parse(text: string, reviver?: (key: any, value: any) => any): any {
        let toJSONReviver = ToJSONReviver.Create(reviver);
        return toJSONReviver.parse(text);
    }

}


// Purpose is to manage 'undefined', 'Buffer' and 'Date'
export namespace JSONParserV2 {

    export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        let toJSONReplacer = ToJSONReplacer.CreateV2(replacer);
        return toJSONReplacer.stringify(value, space);
    }

   export function parse(text: string, reviver?: (key: any, value: any) => any): any {
        let toJSONReviver = ToJSONReviver.CreateV2(reviver);
        return toJSONReviver.parse(text);
    }

}