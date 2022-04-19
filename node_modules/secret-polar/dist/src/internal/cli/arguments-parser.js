"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.ArgumentsParser = void 0;
var errors_1 = require("../core/errors");
var errors_list_1 = require("../core/errors-list");
var ArgumentsParser = /** @class */ (function () {
    function ArgumentsParser() {
    }
    ArgumentsParser.paramNameToCLA = function (paramName) {
        return (ArgumentsParser.PARAM_PREFIX +
            paramName
                .split(/(?=[A-Z])/g)
                .map(function (s) { return s.toLowerCase(); })
                .join("-"));
    };
    ArgumentsParser.shortParamNameToCLA = function (paramName) {
        if (paramName) {
            return ArgumentsParser.SHORT_PARAM_PREFIX + paramName;
        }
        return "";
    };
    ArgumentsParser.cLAToParamName = function (cLA) {
        if (cLA.toLowerCase() !== cLA) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.PARAM_NAME_INVALID_CASING, {
                param: cLA
            });
        }
        var parts = cLA.slice(ArgumentsParser.PARAM_PREFIX.length).split("-");
        return (parts[0] +
            parts
                .slice(1)
                .map(function (s) { return s[0].toUpperCase() + s.slice(1); })
                .join(""));
    };
    ArgumentsParser.prototype._substituteShortParam = function (arg, shortParamSubs) {
        if (this._hasShortParamNameFormat(arg)) {
            var substitution = shortParamSubs[arg.substr(1)];
            if (substitution) {
                return ArgumentsParser.PARAM_PREFIX + substitution;
            }
        }
        return arg;
    };
    ArgumentsParser.prototype.parseRuntimeArgs = function (paramDefs, shortParamSubs, envVariableArguments, rawCLAs) {
        var runtimeArgs = {};
        var taskName;
        var unparsedCLAs = [];
        for (var i = 0; i < rawCLAs.length; i++) {
            rawCLAs[i] = this._substituteShortParam(rawCLAs[i], shortParamSubs);
            var arg = rawCLAs[i];
            if (taskName === undefined) {
                if (!this._hasCLAParamNameFormat(arg)) {
                    taskName = arg;
                    continue;
                }
                if (!this._isCLAParamName(arg, paramDefs)) {
                    throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_COMMAND_LINE_ARG, { argument: arg });
                }
            }
            else {
                if (!this._isCLAParamName(arg, paramDefs)) {
                    unparsedCLAs.push(arg);
                    continue;
                }
            }
            i = this._parseArgumentAt(rawCLAs, i, paramDefs, runtimeArgs);
        }
        return {
            runtimeArgs: this._addBuilderDefaultArguments(paramDefs, envVariableArguments, runtimeArgs),
            taskName: taskName,
            unparsedCLAs: unparsedCLAs
        };
    };
    ArgumentsParser.prototype.parseTaskArguments = function (taskDefinition, rawCLAs) {
        var _a = this._parseTaskParamArguments(taskDefinition, rawCLAs), paramArguments = _a.paramArguments, rawPositionalArguments = _a.rawPositionalArguments;
        var positionalArguments = this._parsePositionalParamArgs(rawPositionalArguments, taskDefinition.positionalParamDefinitions);
        return __assign(__assign({}, paramArguments), positionalArguments);
    };
    ArgumentsParser.prototype._parseTaskParamArguments = function (taskDefinition, rawCLAs
    // eslint-disable-next-line
    ) {
        var paramArguments = {};
        var rawPositionalArguments = [];
        for (var i = 0; i < rawCLAs.length; i++) {
            var arg = rawCLAs[i];
            if (!this._hasCLAParamNameFormat(arg)) {
                rawPositionalArguments.push(arg);
                continue;
            }
            if (!this._isCLAParamName(arg, taskDefinition.paramDefinitions)) {
                throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_PARAM_NAME, {
                    param: arg
                });
            }
            i = this._parseArgumentAt(rawCLAs, i, taskDefinition.paramDefinitions, paramArguments);
        }
        this._addTaskDefaultArguments(taskDefinition, paramArguments);
        return { paramArguments: paramArguments, rawPositionalArguments: rawPositionalArguments };
    };
    ArgumentsParser.prototype._addBuilderDefaultArguments = function (paramDefs, envVariableArguments, runtimeArgs) {
        return __assign(__assign({}, envVariableArguments), runtimeArgs);
    };
    ArgumentsParser.prototype._addTaskDefaultArguments = function (taskDefinition, taskArguments) {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(taskDefinition.paramDefinitions)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var paramName = _c.value;
                var definition = taskDefinition.paramDefinitions[paramName];
                if (taskArguments[paramName] !== undefined) {
                    continue;
                }
                if (!definition.isOptional) {
                    throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.MISSING_TASK_ARGUMENT, {
                        param: ArgumentsParser.paramNameToCLA(paramName)
                    });
                }
                taskArguments[paramName] = definition.defaultValue;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    ArgumentsParser.prototype._isCLAParamName = function (str, paramDefinitions) {
        if (!this._hasCLAParamNameFormat(str)) {
            return false;
        }
        var name = ArgumentsParser.cLAToParamName(str);
        return paramDefinitions[name] !== undefined;
    };
    ArgumentsParser.prototype._hasCLAParamNameFormat = function (str) {
        return str.startsWith(ArgumentsParser.PARAM_PREFIX);
    };
    ArgumentsParser.prototype._hasShortParamNameFormat = function (str) {
        return str.startsWith(ArgumentsParser.SHORT_PARAM_PREFIX) && str.length === 2;
    };
    ArgumentsParser.prototype._parseArgumentAt = function (rawCLAs, index, paramDefinitions, parsedArguments) {
        var claArg = rawCLAs[index];
        var paramName = ArgumentsParser.cLAToParamName(claArg);
        var definition = paramDefinitions[paramName];
        if (parsedArguments[paramName] !== undefined) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.REPEATED_PARAM, {
                param: claArg
            });
        }
        if (definition.isFlag) {
            parsedArguments[paramName] = true;
        }
        else {
            index++;
            var value = rawCLAs[index];
            if (value === undefined) {
                throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.MISSING_TASK_ARGUMENT, {
                    param: ArgumentsParser.paramNameToCLA(paramName)
                });
            }
            parsedArguments[paramName] = definition.type.parse(paramName, value);
        }
        return index;
    };
    ArgumentsParser.prototype._parsePositionalParamArgs = function (rawPositionalParamArgs, positionalParamDefinitions // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        var _a;
        var args = {};
        var _loop_1 = function (i) {
            var definition = positionalParamDefinitions[i];
            var rawArg = rawPositionalParamArgs[i];
            if (rawArg === undefined) {
                if (!definition.isOptional) {
                    throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.MISSING_POSITIONAL_ARG, {
                        param: definition.name
                    });
                }
                args[definition.name] = definition.defaultValue;
            }
            else if (!definition.isVariadic) {
                args[definition.name] = definition.type.parse(definition.name, rawArg);
            }
            else {
                args[definition.name] = rawPositionalParamArgs
                    .slice(i)
                    .map(function (raw) { return definition.type.parse(definition.name, raw); });
            }
        };
        for (var i = 0; i < positionalParamDefinitions.length; i++) {
            _loop_1(i);
        }
        var hasVariadicParam = (_a = positionalParamDefinitions[positionalParamDefinitions.length - 1]) === null || _a === void 0 ? void 0 : _a.isVariadic;
        if (!hasVariadicParam &&
            rawPositionalParamArgs.length > positionalParamDefinitions.length) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_POSITIONAL_ARG, {
                argument: rawPositionalParamArgs[positionalParamDefinitions.length]
            });
        }
        return args;
    };
    ArgumentsParser.PARAM_PREFIX = "--";
    ArgumentsParser.SHORT_PARAM_PREFIX = "-";
    return ArgumentsParser;
}());
exports.ArgumentsParser = ArgumentsParser;
