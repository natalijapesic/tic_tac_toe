"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogs = void 0;
// Parses the response from contract query, init, deploy or execute
// and returns logs as a {key: value} object
function getLogs(response // eslint-disable-line  @typescript-eslint/no-explicit-any
) {
    var e_1, _a;
    var logs = {};
    try {
        for (var _b = __values(response.logs[0].events[1].attributes), _c = _b.next(); !_c.done; _c = _b.next()) {
            var log = _c.value;
            if (log.key in logs) {
                var presentVal = logs[log.key];
                var newVal = [];
                if (Array.isArray(presentVal)) {
                    newVal = presentVal;
                    newVal.push(log.value);
                }
                else {
                    newVal.push(presentVal);
                    newVal.push(log.val);
                }
                logs[log.key] = newVal;
            }
            else {
                logs[log.key] = log.value;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return logs;
}
exports.getLogs = getLogs;
