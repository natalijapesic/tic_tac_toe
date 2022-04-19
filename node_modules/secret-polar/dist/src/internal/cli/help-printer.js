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
exports.HelpPrinter = void 0;
var errors_1 = require("../core/errors");
var errors_list_1 = require("../core/errors-list");
var strings_1 = require("../util/strings");
var arguments_parser_1 = require("./arguments-parser");
var getMax = function (a, b) { return Math.max(a, b); };
var HelpPrinter = /** @class */ (function () {
    function HelpPrinter(_programName, _version, _paramDefs, _tasks) {
        this._programName = _programName;
        this._version = _version;
        this._paramDefs = _paramDefs;
        this._tasks = _tasks;
    }
    HelpPrinter.prototype.printGlobalHelp = function (includeInternalTasks) {
        var e_1, _a, e_2, _b;
        if (includeInternalTasks === void 0) { includeInternalTasks = false; }
        console.log(this._programName + " version " + this._version + "\n");
        console.log("Usage: " + this._programName + " [GLOBAL OPTIONS] <TASK> [TASK OPTIONS]\n");
        console.log("GLOBAL OPTIONS:\n");
        this._printParamDetails(this._paramDefs);
        console.log("\n\nAVAILABLE TASKS:\n");
        var tasksToShow = {};
        try {
            for (var _c = __values(Object.entries(this._tasks)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), taskName = _e[0], taskDefinition = _e[1];
                if (includeInternalTasks || !taskDefinition.isInternal) {
                    tasksToShow[taskName] = taskDefinition;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var nameLength = Object.keys(tasksToShow)
            .map(function (n) { return n.length; })
            .reduce(function (a, b) { return Math.max(a, b); }, 0);
        try {
            for (var _f = __values(Object.keys(tasksToShow).sort(strings_1.cmpStr)), _g = _f.next(); !_g.done; _g = _f.next()) {
                var name_1 = _g.value;
                var _h = this._tasks[name_1].description, description = _h === void 0 ? "" : _h;
                console.log("  " + name_1.padEnd(nameLength) + "\t" + description);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
            }
            finally { if (e_2) throw e_2.error; }
        }
        console.log("");
        console.log("To get help for a specific task run: " + this._programName + " help [task]\n");
    };
    HelpPrinter.prototype.printTaskHelp = function (taskName) {
        var taskDefinition = this._tasks[taskName];
        if (taskDefinition === undefined) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_TASK, {
                task: taskName
            });
        }
        var _a = taskDefinition.description, description = _a === void 0 ? "" : _a, name = taskDefinition.name, paramDefinitions = taskDefinition.paramDefinitions, positionalParamDefinitions = taskDefinition.positionalParamDefinitions;
        console.log(this._programName + " version " + this._version + "\n");
        var paramsList = this._getParamsList(paramDefinitions);
        var positionalParamsList = this._getPositionalParamsList(positionalParamDefinitions);
        console.log("Usage: " + this._programName + " [GLOBAL OPTIONS] " + name + paramsList + positionalParamsList + "\n");
        if (Object.keys(paramDefinitions).length > 0) {
            console.log("OPTIONS:\n");
            this._printParamDetails(paramDefinitions);
            console.log("");
        }
        if (positionalParamDefinitions.length > 0) {
            console.log("POSITIONAL ARGUMENTS:\n");
            this._printPositionalParamDetails(positionalParamDefinitions);
            console.log("");
        }
        console.log(name + ": " + description + "\n");
        console.log("For global options help run: " + this._programName + " help\n");
    };
    HelpPrinter.prototype._getParamValueDescription = function (paramDefinition) {
        return "<" + paramDefinition.type.name.toUpperCase() + ">";
    };
    HelpPrinter.prototype._getParamsList = function (paramDefinitions) {
        var e_3, _a;
        var paramsList = "";
        try {
            for (var _b = __values(Object.keys(paramDefinitions).sort(strings_1.cmpStr)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_2 = _c.value;
                var definition = paramDefinitions[name_2];
                var defaultValue = definition.defaultValue, isFlag = definition.isFlag;
                paramsList += " ";
                if (defaultValue !== undefined) {
                    paramsList += "[";
                }
                paramsList += "" + arguments_parser_1.ArgumentsParser.paramNameToCLA(name_2);
                if (!isFlag) {
                    paramsList += " " + this._getParamValueDescription(definition);
                }
                if (defaultValue !== undefined) {
                    paramsList += "]";
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return paramsList;
    };
    HelpPrinter.prototype._getPositionalParamsList = function (positionalParamDefinitions) {
        var e_4, _a;
        var paramsList = "";
        try {
            for (var positionalParamDefinitions_1 = __values(positionalParamDefinitions), positionalParamDefinitions_1_1 = positionalParamDefinitions_1.next(); !positionalParamDefinitions_1_1.done; positionalParamDefinitions_1_1 = positionalParamDefinitions_1.next()) {
                var definition = positionalParamDefinitions_1_1.value;
                var defaultValue = definition.defaultValue, isVariadic = definition.isVariadic, name_3 = definition.name;
                paramsList += " ";
                if (defaultValue !== undefined) {
                    paramsList += "[";
                }
                if (isVariadic) {
                    paramsList += "...";
                }
                paramsList += name_3;
                if (defaultValue !== undefined) {
                    paramsList += "]";
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (positionalParamDefinitions_1_1 && !positionalParamDefinitions_1_1.done && (_a = positionalParamDefinitions_1.return)) _a.call(positionalParamDefinitions_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return paramsList;
    };
    HelpPrinter.prototype._printParamDetails = function (paramDefinitions) {
        var e_5, _a;
        var paramKeys = Object.keys(paramDefinitions);
        var shortParamsNameLength = paramKeys
            .map(function (n) { return arguments_parser_1.ArgumentsParser.shortParamNameToCLA(paramDefinitions[n].shortName).length; })
            .reduce(getMax, 0);
        var paramsNameLength = paramKeys
            .map(function (n) { return arguments_parser_1.ArgumentsParser.paramNameToCLA(n).length; })
            .reduce(getMax, 0);
        try {
            for (var _b = __values(paramKeys.sort(strings_1.cmpStr)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var name_4 = _c.value;
                var _d = paramDefinitions[name_4], description = _d.description, defaultValue = _d.defaultValue, isOptional = _d.isOptional, isFlag = _d.isFlag, shortName = _d.shortName;
                var paddedShortName = arguments_parser_1.ArgumentsParser.shortParamNameToCLA(shortName)
                    .padEnd(shortParamsNameLength) + (shortName ? "," : " ");
                var msg = "  " + paddedShortName + " ";
                msg += arguments_parser_1.ArgumentsParser.paramNameToCLA(name_4).padEnd(paramsNameLength) + "\t";
                if (description !== undefined) {
                    msg += description + " ";
                }
                if (isOptional && defaultValue !== undefined && !isFlag) {
                    msg += "(default: " + JSON.stringify(defaultValue) + ")";
                }
                console.log(msg);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    HelpPrinter.prototype._printPositionalParamDetails = function (positionalParamDefinitions) {
        var e_6, _a;
        var paramsNameLength = positionalParamDefinitions
            .map(function (d) { return d.name.length; })
            .reduce(function (a, b) { return Math.max(a, b); }, 0);
        try {
            for (var positionalParamDefinitions_2 = __values(positionalParamDefinitions), positionalParamDefinitions_2_1 = positionalParamDefinitions_2.next(); !positionalParamDefinitions_2_1.done; positionalParamDefinitions_2_1 = positionalParamDefinitions_2.next()) {
                var definition = positionalParamDefinitions_2_1.value;
                var name_5 = definition.name, description = definition.description, isOptional = definition.isOptional, defaultValue = definition.defaultValue;
                var msg = "  " + name_5.padEnd(paramsNameLength) + "\t";
                if (description !== undefined) {
                    msg += description + " ";
                }
                if (isOptional && defaultValue !== undefined) {
                    msg += "(default: " + JSON.stringify(defaultValue) + ")";
                }
                console.log(msg);
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (positionalParamDefinitions_2_1 && !positionalParamDefinitions_2_1.done && (_a = positionalParamDefinitions_2.return)) _a.call(positionalParamDefinitions_2);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    return HelpPrinter;
}());
exports.HelpPrinter = HelpPrinter;
