import { ToJSONReplacer, ToJSONReviver } from './tojson';
import { ToJSONReplacerImpl, ToJSONReviverImpl } from './tojson-impl';

import { JSONFormatter, JSONFormattersMap } from './json-formatter';
import { dateJSONSupport, errorJSONSupport, typeErrorJSONSupport, bufferJSONSupportBinary } from './json-formatter-default';

const jsonFormattersMap: JSONFormattersMap = new Map<string, JSONFormatter>();
jsonFormattersMap.set(dateJSONSupport.objectName, dateJSONSupport);
jsonFormattersMap.set(errorJSONSupport.objectName, errorJSONSupport);
jsonFormattersMap.set(typeErrorJSONSupport.objectName, typeErrorJSONSupport);
jsonFormattersMap.set(bufferJSONSupportBinary.objectName, bufferJSONSupportBinary);

const jsonReplacer = new ToJSONReplacerImpl(jsonFormattersMap);
ToJSONReplacer.GetV2 = (): ToJSONReplacer => {
    return jsonReplacer;
}

const jsonReviver = new ToJSONReviverImpl(jsonFormattersMap);
ToJSONReviver.GetV2 = (): ToJSONReviver => {
    return jsonReviver;
}
