import { ToJSONReplacer, ToJSONReviver } from './tojson';
import { ToJSONReplacerImpl, ToJSONReviverImpl } from './tojson-impl';

import { JSONFormatter, JSONFormattersMap } from './json-formatter';
import { dateJSONSupport, errorJSONSupport, typeErrorJSONSupport, bufferJSONSupport } from './json-formatter-default';

const jsonFormattersMap: JSONFormattersMap = new Map<string, JSONFormatter>();
jsonFormattersMap.set(dateJSONSupport.objectName, dateJSONSupport);
jsonFormattersMap.set(errorJSONSupport.objectName, errorJSONSupport);
jsonFormattersMap.set(typeErrorJSONSupport.objectName, typeErrorJSONSupport);
jsonFormattersMap.set(bufferJSONSupport.objectName, bufferJSONSupport);

const jsonReplacer = new ToJSONReplacerImpl(jsonFormattersMap);
ToJSONReplacer.Get = ToJSONReplacer.GetV1 = (): ToJSONReplacer => {
    return jsonReplacer;
}

const jsonReviver = new ToJSONReviverImpl(jsonFormattersMap);
ToJSONReviver.Get = ToJSONReviver.GetV1 = (): ToJSONReviver => {
    return jsonReviver;
}
