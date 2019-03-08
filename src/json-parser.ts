
import { ToJSONReplacer, ToJSONReviver } from './tojson';

// Purpose is to manage 'undefined', 'Buffer' and 'Date'
export namespace JSONParser {

    export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
        let toJSONReplacer = ToJSONReplacer.Create(replacer);
        toJSONReplacer.activate();

        try {
            let result = JSON.stringify(value, toJSONReplacer.replacer);
            toJSONReplacer.restore();
            return result;
        }
        catch (err) {
            toJSONReplacer.restore();
            throw err;
        }
    }

   export function parse(text: string, reviver?: (key: any, value: any) => any): any {
        let toJSONReviver = ToJSONReviver.Create(reviver);
        return JSON.parse(text, toJSONReviver.reviver);
    }

}