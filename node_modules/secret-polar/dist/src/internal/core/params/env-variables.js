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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvRuntimeArgs = exports.getEnvVariablesMap = exports.paramNameToEnvVariable = void 0;
var arguments_parser_1 = require("../../cli/arguments-parser");
var unsafe_1 = require("../../util/unsafe");
var errors_1 = require("../errors");
var errors_list_1 = require("../errors-list");
var POLAR_ENV_ARGUMENT_PREFIX = "POLAR_";
function paramNameToEnvVariable(paramName) {
    // We create it starting from the result of ArgumentsParser.paramNameToCLA
    // so it's easier to explain and understand their equivalences.
    return arguments_parser_1.ArgumentsParser.paramNameToCLA(paramName)
        .replace(arguments_parser_1.ArgumentsParser.PARAM_PREFIX, POLAR_ENV_ARGUMENT_PREFIX)
        .replace(/-/g, "_")
        .toUpperCase();
}
exports.paramNameToEnvVariable = paramNameToEnvVariable;
function getEnvVariablesMap(runtimeArgs) {
    var e_1, _a;
    var values = {};
    try {
        for (var _b = __values(Object.entries(runtimeArgs)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), name_1 = _d[0], value = _d[1];
            if (value === undefined) {
                continue;
            }
            values[paramNameToEnvVariable(name_1)] = value.toString();
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return values;
}
exports.getEnvVariablesMap = getEnvVariablesMap;
function getEnvRuntimeArgs(paramDefinitions, envVariables) {
    var e_2, _a;
    var envArgs = {}; // eslint-disable-line
    try {
        for (var _b = __values(unsafe_1.unsafeObjectKeys(paramDefinitions)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var paramName = _c.value;
            var definition = paramDefinitions[paramName];
            var envVarName = paramNameToEnvVariable(paramName);
            var rawValue = envVariables[envVarName];
            if (rawValue !== undefined) {
                try {
                    envArgs[paramName] = definition.type.parse(paramName, rawValue);
                }
                catch (error) {
                    throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_ENV_VAR_VALUE, {
                        varName: envVarName,
                        value: rawValue
                    }, error);
                }
            }
            else {
                envArgs[paramName] = definition.defaultValue;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    delete envArgs.config;
    return envArgs;
}
exports.getEnvRuntimeArgs = getEnvRuntimeArgs;
