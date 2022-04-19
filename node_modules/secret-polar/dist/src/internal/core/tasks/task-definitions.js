"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverriddenTaskDefinition = exports.SimpleTaskDefinition = void 0;
var errors_1 = require("../errors");
var errors_list_1 = require("../errors-list");
var types = __importStar(require("../params/argument-types"));
var polar_params_1 = require("../params/polar-params");
/**
 * This class creates a task definition, which consists of:
 * * a name, that should be unique and will be used to call the task.
 * * a description. This is optional.
 * * the action that the task will execute.
 * * a set of parameters that can be used by the action.
 *
 */
var SimpleTaskDefinition = /** @class */ (function () {
    /**
     * Creates an empty task definition.
     *
     * This definition will have no params, and will throw a POLAR_ERROR205 if executed.
     *
     * @param name The task's name.
     * @param isInternal `true` if the task is internal, `false` otherwise.
     */
    function SimpleTaskDefinition(name, isInternal) {
        if (isInternal === void 0) { isInternal = false; }
        this.name = name;
        this.isInternal = isInternal;
        this.paramDefinitions = {};
        this.positionalParamDefinitions = [];
        this._positionalParamNames = new Set();
        this._hasVariadicParam = false;
        this._hasOptionalPositionalParam = false;
        this.action = function () {
            throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.ACTION_NOT_SET, {
                taskName: name
            });
        };
    }
    Object.defineProperty(SimpleTaskDefinition.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the task's description.
     * @param description The description.
     */
    SimpleTaskDefinition.prototype.setDescription = function (description) {
        this._description = description;
        return this;
    };
    /**
     * Sets the task's action.
     * @param action The action.
     */
    SimpleTaskDefinition.prototype.setAction = function (action) {
        // TODO: There's probably something bad here. See types.ts for more info.
        this.action = action;
        return this;
    };
    /**
     * Adds a paramater to the task's definition.
     *
     * @remarks This will throw if the `name` is already used by this task or
     * by Polar's global parameters.
     *
     * @param name The parameter's name.
     * @param description The parameter's description.
     * @param defaultValue A default value. This must be `undefined` if `isOptional` is `true`.
     * @param type The param's `ArgumentType`. It will parse and validate the user's input.
     * @param isOptional `true` if the parameter is optional.
         It's default value is `true` if `defaultValue` is not `undefined`.
     */
    SimpleTaskDefinition.prototype.addParam = function (name, description, defaultValue, type, isOptional) {
        if (isOptional === void 0) { isOptional = defaultValue !== undefined; }
        if (type === undefined) {
            if (defaultValue === undefined) {
                return this.addParam(name, description, undefined, types.string, isOptional);
            }
            if (typeof defaultValue !== "string") {
                throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE, {
                    paramName: name,
                    taskName: this.name
                });
            }
            return this.addParam(name, description, defaultValue, types.string, isOptional);
        }
        this._validateParamNameCasing(name);
        this._validateNameNotUsed(name);
        this._validateNoDefaultValueForMandatoryParam(defaultValue, isOptional, name);
        this.paramDefinitions[name] = {
            name: name,
            defaultValue: defaultValue,
            type: type,
            description: description,
            isOptional: isOptional,
            isFlag: false,
            isVariadic: false
        };
        return this;
    };
    /**
     * Adds an optional paramater to the task's definition.
     *
     * @see addParam.
     *
     * @param name the parameter's name.
     * @param description the parameter's description.
     * @param defaultValue a default value.
     * @param type param's type.
     */
    SimpleTaskDefinition.prototype.addOptionalParam = function (name, description, defaultValue, type) {
        return this.addParam(name, description, defaultValue, type, true);
    };
    /**
     * Adds a boolean paramater or flag to the task's definition.
     *
     * Flags are params with default value set to `false`, and that don't expect
     * values to be set in the CLI. A normal boolean param must be called with
     * `--param true`, while a flag is called with `--flag`.
     *
     * @param name the parameter's name.
     * @param description the parameter's description.
     */
    SimpleTaskDefinition.prototype.addFlag = function (name, description) {
        this._validateParamNameCasing(name);
        this._validateNameNotUsed(name);
        this.paramDefinitions[name] = {
            name: name,
            defaultValue: false,
            type: types.boolean,
            description: description,
            isFlag: true,
            isOptional: true,
            isVariadic: false
        };
        return this;
    };
    /**
     * Adds a positional paramater to the task's definition.
     *
     * @remarks This will throw if the `name` is already used by this task or
     * by Polar's global parameters.
     * @remarks This will throw if `isOptional` is `false` and an optional positional
     * param was already set.
     * @remarks This will throw if a variadic positional param is already set.
     *
     * @param name The parameter's name.
     * @param description The parameter's description.
     * @param defaultValue A default value. This must be `undefined` if `isOptional` is `true`.
     * @param type The param's `ArgumentType`. It will parse and validate the user's input.
     * @param isOptional `true` if the parameter is optional. It's default value is `true`
         if `defaultValue` is not `undefined`.
     */
    SimpleTaskDefinition.prototype.addPositionalParam = function (name, description, defaultValue, type, isOptional) {
        if (isOptional === void 0) { isOptional = defaultValue !== undefined; }
        if (type === undefined) {
            if (defaultValue === undefined) {
                return this.addPositionalParam(name, description, undefined, types.string, isOptional);
            }
            if (typeof defaultValue !== "string") {
                throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE, {
                    paramName: name,
                    taskName: this.name
                });
            }
            return this.addPositionalParam(name, description, defaultValue, types.string, isOptional);
        }
        this._validateParamNameCasing(name);
        this._validateNameNotUsed(name);
        this._validateNotAfterVariadicParam(name);
        this._validateNoMandatoryParamAfterOptionalOnes(name, isOptional);
        this._validateNoDefaultValueForMandatoryParam(defaultValue, isOptional, name);
        var definition = {
            name: name,
            defaultValue: defaultValue,
            type: type,
            description: description,
            isVariadic: false,
            isOptional: isOptional,
            isFlag: false
        };
        this._addPositionalParamDefinition(definition);
        return this;
    };
    /**
     * Adds an optional positional paramater to the task's definition.
     *
     * @see addPositionalParam.
     *
     * @param name the parameter's name.
     * @param description the parameter's description.
     * @param defaultValue a default value.
     * @param type param's type.
     */
    SimpleTaskDefinition.prototype.addOptionalPositionalParam = function (name, description, defaultValue, type) {
        return this.addPositionalParam(name, description, defaultValue, type, true);
    };
    /**
     * Adds a variadic positional paramater to the task's definition. Variadic
     * positional params act as `...rest` parameters in JavaScript.
     *
     * @param name The parameter's name.
     * @param description The parameter's description.
     * @param defaultValue A default value. This must be `undefined` if `isOptional` is `true`.
     * @param type The param's `ArgumentType`. It will parse and validate the user's input.
     * @param isOptional `true` if the parameter is optional.
         It's default value is `true` if `defaultValue` is not `undefined`.
     */
    SimpleTaskDefinition.prototype.addVariadicPositionalParam = function (name, description, defaultValue, type, isOptional) {
        if (isOptional === void 0) { isOptional = defaultValue !== undefined; }
        if (defaultValue !== undefined && !Array.isArray(defaultValue)) {
            defaultValue = [defaultValue];
        }
        if (type === undefined) {
            if (defaultValue === undefined) {
                return this.addVariadicPositionalParam(name, description, undefined, types.string, isOptional);
            }
            if (!this._isStringArray(defaultValue)) {
                throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE, {
                    paramName: name,
                    taskName: this.name
                });
            }
            return this.addVariadicPositionalParam(name, description, defaultValue, types.string, isOptional);
        }
        this._validateParamNameCasing(name);
        this._validateNameNotUsed(name);
        this._validateNotAfterVariadicParam(name);
        this._validateNoMandatoryParamAfterOptionalOnes(name, isOptional);
        this._validateNoDefaultValueForMandatoryParam(defaultValue, isOptional, name);
        var definition = {
            name: name,
            defaultValue: defaultValue,
            type: type,
            description: description,
            isVariadic: true,
            isOptional: isOptional,
            isFlag: false
        };
        this._addPositionalParamDefinition(definition);
        return this;
    };
    /**
     * Adds a positional paramater to the task's definition.
     *
     * This will check if the `name` is already used and
     * if the parameter is being added after a varidic argument.
     *
     * @param name the parameter's name.
     * @param description the parameter's description.
     * @param defaultValue a default value.
     * @param type param's type.
     */
    SimpleTaskDefinition.prototype.addOptionalVariadicPositionalParam = function (name, description, defaultValue, type) {
        return this.addVariadicPositionalParam(name, description, defaultValue, type, true);
    };
    /**
     * Adds a positional paramater to the task's definition.
     *
     * @param definition the param's definition
     */
    SimpleTaskDefinition.prototype._addPositionalParamDefinition = function (definition) {
        if (definition.isVariadic) {
            this._hasVariadicParam = true;
        }
        if (definition.isOptional) {
            this._hasOptionalPositionalParam = true;
        }
        this._positionalParamNames.add(definition.name);
        this.positionalParamDefinitions.push(definition);
    };
    /**
     * Validates if the given param's name is after a variadic parameter.
     * @param name the param's name.
     * @throws POLAR_ERROR200
     */
    SimpleTaskDefinition.prototype._validateNotAfterVariadicParam = function (name) {
        if (this._hasVariadicParam) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_AFTER_VARIADIC, {
                paramName: name,
                taskName: this.name
            });
        }
    };
    /**
     * Validates if the param's name is already used.
     * @param name the param's name.
     *
     * @throws POLAR_ERROR201 if `name` is already used as a param.
     * @throws POLAR_ERROR202 if `name` is already used as a param by Polar
     */
    SimpleTaskDefinition.prototype._validateNameNotUsed = function (name) {
        if (this._hasParamDefined(name)) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_ALREADY_DEFINED, {
                paramName: name,
                taskName: this.name
            });
        }
        if (Object.keys(polar_params_1.POLAR_PARAM_DEFINITIONS).includes(name)) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_CLASHES_WITH_POLAR_PARAM, {
                paramName: name,
                taskName: this.name
            });
        }
    };
    /**
     * Checks if the given name is already used.
     * @param name the param's name.
     */
    SimpleTaskDefinition.prototype._hasParamDefined = function (name) {
        return (this.paramDefinitions[name] !== undefined ||
            this._positionalParamNames.has(name));
    };
    /**
     * Validates if a mandatory param is being added after optional params.
     *
     * @param name the param's name to be added.
     * @param isOptional true if the new param is optional, false otherwise.
     *
     * @throws POLAR_ERROR203 if validation fail
     */
    SimpleTaskDefinition.prototype._validateNoMandatoryParamAfterOptionalOnes = function (name, isOptional) {
        if (!isOptional && this._hasOptionalPositionalParam) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.MANDATORY_PARAM_AFTER_OPTIONAL, {
                paramName: name,
                taskName: this.name
            });
        }
    };
    SimpleTaskDefinition.prototype._validateParamNameCasing = function (name) {
        var pattern = /^[a-z]+([a-zA-Z0-9])*$/;
        var match = name.match(pattern);
        if (match === null) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING, {
                paramName: name,
                taskName: this.name
            });
        }
    };
    SimpleTaskDefinition.prototype._validateNoDefaultValueForMandatoryParam = function (defaultValue, // eslint-disable-line @typescript-eslint/no-explicit-any
    isOptional, name) {
        if (defaultValue !== undefined && !isOptional) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_IN_MANDATORY_PARAM, {
                paramName: name,
                taskName: this.name
            });
        }
    };
    SimpleTaskDefinition.prototype._isStringArray = function (values) {
        return Array.isArray(values) && values.every(function (v) { return typeof v === "string"; });
    };
    return SimpleTaskDefinition;
}());
exports.SimpleTaskDefinition = SimpleTaskDefinition;
/**
 * Allows you to override a previously defined task.
 *
 * When overriding a task you can:
 *  * flag it as internal
 *  * set a new description
 *  * set a new action
 *
 */
var OverriddenTaskDefinition = /** @class */ (function () {
    function OverriddenTaskDefinition(parentTaskDefinition, isInternal) {
        if (isInternal === void 0) { isInternal = false; }
        this.parentTaskDefinition = parentTaskDefinition;
        this.isInternal = isInternal;
        this.isInternal = isInternal;
        this.parentTaskDefinition = parentTaskDefinition;
    }
    OverriddenTaskDefinition.prototype.setDescription = function (description) {
        this._description = description;
        return this;
    };
    /**
     * Overrides the parent task's action.
     * @param action the action.
     */
    OverriddenTaskDefinition.prototype.setAction = function (action) {
        // TODO: There's probably something bad here. See types.ts for more info.
        this._action = action;
        return this;
    };
    Object.defineProperty(OverriddenTaskDefinition.prototype, "name", {
        /**
         * Retrieves the parent task's name.
         */
        get: function () {
            return this.parentTaskDefinition.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverriddenTaskDefinition.prototype, "description", {
        /**
         * Retrieves, if defined, the description of the overriden task,
         * otherwise retrieves the description of the parent task.
         */
        get: function () {
            var _a;
            if (this._description !== undefined) {
                return this._description;
            }
            return (_a = this.parentTaskDefinition.description) !== null && _a !== void 0 ? _a : "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverriddenTaskDefinition.prototype, "action", {
        /**
         * Retrieves, if defined, the action of the overriden task,
         * otherwise retrieves the action of the parent task.
         */
        get: function () {
            if (this._action !== undefined) {
                return this._action;
            }
            return this.parentTaskDefinition.action;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverriddenTaskDefinition.prototype, "paramDefinitions", {
        /**
         * Retrieves the parent task's param definitions.
         */
        get: function () {
            return this.parentTaskDefinition.paramDefinitions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverriddenTaskDefinition.prototype, "positionalParamDefinitions", {
        /**
         * Retrieves the parent task's positional param definitions.
         */
        get: function () {
            return this.parentTaskDefinition.positionalParamDefinitions;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Overriden tasks can't add new parameters.
     */
    OverriddenTaskDefinition.prototype.addParam = function (name, description, defaultValue, type, isOptional) {
        if (isOptional === undefined || !isOptional) {
            return this._throwNoParamsOverrideError(errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_MANDATORY_PARAMS);
        }
        return this.addOptionalParam(name, description, defaultValue, type);
    };
    /**
     * Overriden tasks can't add new parameters.
     */
    OverriddenTaskDefinition.prototype.addOptionalParam = function (name, description, defaultValue, type) {
        this.parentTaskDefinition.addOptionalParam(name, description, defaultValue, type);
        return this;
    };
    /**
     * Overriden tasks can't add new parameters.
     */
    OverriddenTaskDefinition.prototype.addPositionalParam = function (name, description, defaultValue, type, isOptional) {
        return this._throwNoParamsOverrideError(errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_POSITIONAL_PARAMS);
    };
    /* eslint-disable sonarjs/no-identical-functions */
    /**
     * Overriden tasks can't add new parameters.
     */
    OverriddenTaskDefinition.prototype.addOptionalPositionalParam = function (name, description, defaultValue, type) {
        return this._throwNoParamsOverrideError(errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_POSITIONAL_PARAMS);
    };
    /**
     * Overriden tasks can't add new parameters.
     */
    OverriddenTaskDefinition.prototype.addVariadicPositionalParam = function (name, description, defaultValue, type, isOptional) {
        return this._throwNoParamsOverrideError(errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_VARIADIC_PARAMS);
    };
    /**
     * Overriden tasks can't add new parameters.
     */
    OverriddenTaskDefinition.prototype.addOptionalVariadicPositionalParam = function (name, description, defaultValue, type) {
        return this._throwNoParamsOverrideError(errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_VARIADIC_PARAMS);
    };
    /**
     * Add a flag param to the overridden task.
     * @throws POLAR_ERROR201 if param name was already defined in any parent task.
     * @throws POLAR_ERROR209 if param name is not in camelCase.
     */
    OverriddenTaskDefinition.prototype.addFlag = function (name, description) {
        this.parentTaskDefinition.addFlag(name, description);
        return this;
    };
    OverriddenTaskDefinition.prototype._throwNoParamsOverrideError = function (errorDescriptor) {
        throw new errors_1.PolarError(errorDescriptor, {
            taskName: this.name
        });
    };
    return OverriddenTaskDefinition;
}());
exports.OverriddenTaskDefinition = OverriddenTaskDefinition;
