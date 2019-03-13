
// import { Buffer } from 'buffer';

// // Purpose is to manage 'undefined', 'Buffer' and 'Date'
// export namespace JSONCircularParser {
//     const JSON_TOKEN_UNDEFINED = '_/undefined/_';

//     export function stringify(value: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
//         let previousDateToJSON = Date.prototype.toJSON;
//         Date.prototype.toJSON = function(key?: string): any {
//             return {type: 'Date', data: this.valueOf()};
//         };
//         try {
//             let duplicateObjects = new Map<AnalyserNode, string>();
//             let result = JSON.stringify(value, (k, v) => {
//                 if (typeof v === 'undefined') {
//                     return JSON_TOKEN_UNDEFINED;
//                 }
//                 if (typeof v === 'object') {
//                     let duplicateObject = duplicateObjects.get(v);
//                     if (duplicateObject) {
//                         return duplicateObject;
//                     }
//                     else {
//                         if (v.toJSON) {
//                             duplicateObjects.set(v, v.toJSON());
//                         }
//                     }
//                 }
//                 return replacer ? replacer(k, v) : v;
//             });
//             Date.prototype.toJSON = previousDateToJSON;
//             return result;
//         }
//         catch (err) {
//             Date.prototype.toJSON = previousDateToJSON;
//             throw err;
//         }
//     }

//    export function parse(text: string, reviver?: (key: any, value: any) => any): any {
//         return JSON.parse(text, (k, v) => {
//             if (v) {
//                 if (v === JSON_TOKEN_UNDEFINED) {
//                     return undefined;
//                 }
//                 if (v.data && v.type) {
//                     if (v.type === 'Buffer') {
//                         return Buffer.from(v.data);
//                     }
//                     if (v.type === 'Date') {
//                         return new Date(v.data);
//                     }
//                 }
//             }
//             return reviver ? reviver(k, v) : v;
//         });
//     }

// }