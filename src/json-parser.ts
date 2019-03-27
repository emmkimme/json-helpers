
import { ToJSONReplacer, ToJSONReviver } from './tojson';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
export namespace JSONParser {

    export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        let toJSONReplacer = ToJSONReplacer.Get();
        return toJSONReplacer.stringify(value, replacer, space);
    }

   export function parse(text: string, reviver?: (key: any, value: any) => any): any {
        let toJSONReviver = ToJSONReviver.Get();
        return toJSONReviver.parse(text, reviver);
    }

}


// Purpose is to manage 'undefined', 'Buffer' and 'Date'
export namespace JSONParserV2 {

    export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        let toJSONReplacer = ToJSONReplacer.GetV2();
        return toJSONReplacer.stringify(value, replacer, space);
    }

   export function parse(text: string, reviver?: (key: any, value: any) => any): any {
        let toJSONReviver = ToJSONReviver.GetV2();
        return toJSONReviver.parse(text, reviver);
    }

}