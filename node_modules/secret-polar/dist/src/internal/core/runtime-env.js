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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
var debug_1 = __importDefault(require("debug"));
var errors_1 = require("../core/errors");
var errors_list_1 = require("../core/errors-list");
var task_definitions_1 = require("./tasks/task-definitions");
var log = debug_1.default("polar:core:pre");
var Environment = /** @class */ (function () {
    /**
     * Initializes the polar Runtime Environment and the given
     * extender functions.
     *
     * @remarks The extenders' execution order is given by the order
     * of the requires in the polar's config file and its plugins.
     *
     * @param config The polar's config object.
     * @param runtimeArgs The parsed polar's arguments.
     * @param tasks A map of tasks.
     * @param extenders A list of extenders.
     * @param networkRequired if true it will assert that a requested network is defined.
     */
    function Environment(config, runtimeArgs, tasks, extenders, networkRequired) {
        var _this = this;
        if (extenders === void 0) { extenders = []; }
        if (networkRequired === void 0) { networkRequired = true; }
        this.config = config;
        this.runtimeArgs = runtimeArgs;
        this.tasks = tasks;
        /**
         * Executes the task with the given name.
         *
         * @param name The task's name.
         * @param taskArguments A map of task's arguments.
         *
         * @throws a POLAR303 if there aren't any defined tasks with the given name.
         * @returns a promise with the task's execution result.
         */
        this.run = function (name, taskArguments) {
            if (taskArguments === void 0) { taskArguments = {}; }
            return __awaiter(_this, void 0, void 0, function () {
                var taskDefinition, resolvedTaskArguments;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            taskDefinition = this.tasks[name];
                            log("Running task %s", name);
                            if (taskDefinition === undefined) {
                                throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_TASK, {
                                    task: name
                                });
                            }
                            resolvedTaskArguments = this._resolveValidTaskArguments(taskDefinition, taskArguments);
                            return [4 /*yield*/, this._runTaskDefinition(taskDefinition, resolvedTaskArguments)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        log("Creating RuntimeEnv");
        var ncfg = config.networks[runtimeArgs.network];
        // network configuration is required for all tasks except few setup tasks
        if (!ncfg && networkRequired) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.NETWORK.CONFIG_NOT_FOUND, {
                network: runtimeArgs.network
            });
        }
        log("Runtime environment NOOP (MM)");
        // this.provider .... -- creation goes here
        this._extenders = extenders;
        this.network = {
            name: runtimeArgs.network,
            config: ncfg
        };
        extenders.forEach(function (extender) { return extender(_this); });
    }
    /**
     * Injects the properties of `this` (the polar Runtime Environment) into the global scope.
     *
     * @param blacklist a list of property names that won't be injected.
     *
     * @returns a function that restores the previous environment.
     */
    Environment.prototype.injectToGlobal = function (blacklist) {
        var e_1, _a;
        var _this = this;
        if (blacklist === void 0) { blacklist = Environment._BLACKLISTED_PROPERTIES; }
        var globalAsAny = global; // eslint-disable-line @typescript-eslint/no-explicit-any
        var previousValues = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
        try {
            for (var _b = __values(Object.entries(this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (blacklist.includes(key)) {
                    continue;
                }
                previousValues[key] = globalAsAny[key];
                globalAsAny[key] = value;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return function () {
            var e_2, _a;
            try {
                for (var _b = __values(Object.entries(_this)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 1), key = _d[0];
                    if (blacklist.includes(key)) {
                        continue;
                    }
                    globalAsAny[key] = previousValues[key];
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
    };
    Environment.prototype._runTaskDefinition = function (taskDefinition, taskArguments) {
        return __awaiter(this, void 0, void 0, function () {
            var runSuperFunction, runSuper, globalAsAny, previousRunSuper, uninjectFromGlobal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (taskDefinition instanceof task_definitions_1.OverriddenTaskDefinition) {
                            runSuperFunction = function (_taskArguments) {
                                if (_taskArguments === void 0) { _taskArguments = taskArguments; }
                                return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                log("Running %s's super", taskDefinition.name);
                                                return [4 /*yield*/, this._runTaskDefinition(taskDefinition.parentTaskDefinition, _taskArguments)];
                                            case 1: return [2 /*return*/, _a.sent()];
                                        }
                                    });
                                });
                            };
                            runSuperFunction.isDefined = true;
                        }
                        else {
                            runSuperFunction = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.RUNSUPER_NOT_AVAILABLE, {
                                        taskName: taskDefinition.name
                                    });
                                });
                            }); };
                            runSuperFunction.isDefined = false;
                        }
                        runSuper = runSuperFunction;
                        globalAsAny = global;
                        previousRunSuper = globalAsAny.runSuper;
                        globalAsAny.runSuper = runSuper;
                        uninjectFromGlobal = this.injectToGlobal();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 4]);
                        return [4 /*yield*/, taskDefinition.action(taskArguments, this, runSuper)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        uninjectFromGlobal();
                        globalAsAny.runSuper = previousRunSuper;
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Check that task arguments are within TaskDefinition defined params constraints.
     * Also, populate missing, non-mandatory arguments with default param values (if any).
     *
     * @private
     * @throws PolarError if any of the following are true:
     *  > a required argument is missing
     *  > an argument's value's type doesn't match the defined param type
     *
     * @param taskDefinition
     * @param taskArguments
     * @returns resolvedTaskArguments
     */
    Environment.prototype._resolveValidTaskArguments = function (taskDefinition, taskArguments) {
        var _this = this;
        var paramDefinitions = taskDefinition.paramDefinitions, positionalParamDefinitions = taskDefinition.positionalParamDefinitions;
        var nonPositionalParamDefinitions = Object.values(paramDefinitions);
        // gather all task param definitions
        var allTaskParamDefinitions = __spreadArray(__spreadArray([], __read(nonPositionalParamDefinitions)), __read(positionalParamDefinitions));
        var initResolvedArguments = { errors: [], values: {} };
        var resolvedArguments = allTaskParamDefinitions.reduce(function (_a, paramDefinition) {
            var errors = _a.errors, values = _a.values;
            try {
                var paramName = paramDefinition.name;
                var argumentValue = taskArguments[paramName];
                var resolvedArgumentValue = _this._resolveArgument(paramDefinition, argumentValue);
                if (resolvedArgumentValue !== undefined) {
                    values[paramName] = resolvedArgumentValue;
                }
            }
            catch (error) {
                errors.push(error);
            }
            return { errors: errors, values: values };
        }, initResolvedArguments);
        var resolveErrors = resolvedArguments.errors, resolvedValues = resolvedArguments.values;
        // if has argument errors, throw the first one
        if (resolveErrors.length > 0) {
            throw resolveErrors[0];
        }
        // append the rest of arguments that where not in the task param definitions
        return __assign(__assign({}, taskArguments), resolvedValues);
    };
    /**
     * Resolves an argument according to a ParamDefinition rules.
     *
     * @param paramDefinition
     * @param argumentValue
     * @private
     */
    Environment.prototype._resolveArgument = function (paramDefinition, argumentValue // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        var name = paramDefinition.name, isOptional = paramDefinition.isOptional, defaultValue = paramDefinition.defaultValue;
        if (argumentValue === undefined) {
            if (isOptional) {
                // undefined & optional argument -> return defaultValue
                return defaultValue;
            }
            // undefined & mandatory argument -> error
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.MISSING_TASK_ARGUMENT, {
                param: name
            });
        }
        // arg was present -> validate type, if applicable
        this._checkTypeValidation(paramDefinition, argumentValue);
        return argumentValue;
    };
    /**
     * Checks if value is valid for the specified param definition.
     *
     * @param paramDefinition {ParamDefinition} - the param definition for validation
     * @param argumentValue - the value to be validated
     * @private
     * @throws POLAR301 if value is not valid for the param type
     */
    Environment.prototype._checkTypeValidation = function (paramDefinition, argumentValue // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        var e_3, _a;
        var paramName = paramDefinition.name, type = paramDefinition.type, isVariadic = paramDefinition.isVariadic;
        if (type === undefined || type.validate === undefined) {
            // no type or no validate() method defined, just skip validation.
            return;
        }
        // in case of variadic param, argValue is an array and the
        // type validation must pass for all values.
        // otherwise, it's a single value that is to be validated
        var argumentValueContainer = isVariadic ? argumentValue : [argumentValue];
        try {
            for (var argumentValueContainer_1 = __values(argumentValueContainer), argumentValueContainer_1_1 = argumentValueContainer_1.next(); !argumentValueContainer_1_1.done; argumentValueContainer_1_1 = argumentValueContainer_1.next()) {
                var value = argumentValueContainer_1_1.value;
                type.validate(paramName, value);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (argumentValueContainer_1_1 && !argumentValueContainer_1_1.done && (_a = argumentValueContainer_1.return)) _a.call(argumentValueContainer_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    Environment._BLACKLISTED_PROPERTIES = [
        "injectToGlobal",
        "_runTaskDefinition"
    ];
    return Environment;
}());
exports.Environment = Environment;
