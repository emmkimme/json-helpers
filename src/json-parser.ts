
import { ToJSONReplacer, ToJSONReviver } from './tojson';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
export namespace JSONParser {

    export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        let toJSONReplacer = ToJSONReplacer.Create(replacer);
        toJSONReplacer.install();

        try {
            let result = JSON.stringify(value, toJSONReplacer.replacer);
            toJSONReplacer.uninstall();
            return result;
        }
        catch (err) {
            toJSONReplacer.uninstall();
            throw err;
        }
    }

   export function parse(text: string, reviver?: (key: any, value: any) => any): any {
        let toJSONReviver = ToJSONReviver.Create(reviver);
        return JSON.parse(text, toJSONReviver.reviver);
    }

}


// Purpose is to manage 'undefined', 'Buffer' and 'Date'
export namespace JSONParserV2 {

    export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        let toJSONReplacer = ToJSONReplacer.CreateV2(replacer);
        toJSONReplacer.install();

        try {
            let result = JSON.stringify(value, toJSONReplacer.replacer);
            toJSONReplacer.uninstall();
            return result;
        }
        catch (err) {
            toJSONReplacer.uninstall();
            throw err;
        }
    }

   export function parse(text: string, reviver?: (key: any, value: any) => any): any {
        let toJSONReviver = ToJSONReviver.CreateV2(reviver);
        return JSON.parse(text, toJSONReviver.reviver);
    }

}