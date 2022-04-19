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
exports.json = exports.inputFile = exports.float = exports.int = exports.boolean = exports.string = void 0;
var fs = __importStar(require("fs"));
var errors_1 = require("../errors");
var errors_list_1 = require("../errors-list");
/**
 * String type.
 *
 * Accepts any kind of string.
 */
exports.string = {
    name: "string",
    parse: function (argName, strValue) { return strValue; },
    /**
     * Check if argument value is of type "string"
     *
     * @param argName {string} argument's name - used for context in case of error.
     * @param value {any} argument's value to validate.
     *
     * @throws POLAR301 if value is not of type "string"
     */
    validate: function (argName, value) {
        var isString = typeof value === "string";
        if (!isString) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
                value: value,
                name: argName,
                type: exports.string.name
            });
        }
    }
};
/**
 * Boolean type.
 *
 * Accepts only 'true' or 'false' (case-insensitive).
 * @throws POLAR301
 */
exports.boolean = {
    name: "boolean",
    parse: function (argName, strValue) {
        if (strValue.toLowerCase() === "true") {
            return true;
        }
        if (strValue.toLowerCase() === "false") {
            return false;
        }
        throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
            value: strValue,
            name: argName,
            type: "boolean"
        });
    },
    /**
     * Check if argument value is of type "boolean"
     *
     * @param argName {string} argument's name - used for context in case of error.
     * @param value {any} argument's value to validate.
     *
     * @throws POLAR301 if value is not of type "boolean"
     */
    validate: function (argName, value) {
        var isBoolean = typeof value === "boolean";
        if (!isBoolean) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
                value: value,
                name: argName,
                type: exports.boolean.name
            });
        }
    }
};
/**
 * Int type.
 * Accepts either a decimal string integer or hexadecimal string integer.
 * @throws POLAR301
 */
exports.int = {
    name: "int",
    parse: function (argName, strValue) {
        var decimalPattern = /^\d+(?:[eE]\d+)?$/;
        var hexPattern = /^0[xX][\dABCDEabcde]+$/;
        if (strValue.match(decimalPattern) === null &&
            strValue.match(hexPattern) === null) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
                value: strValue,
                name: argName,
                type: exports.int.name
            });
        }
        return Number(strValue);
    },
    /**
     * Check if argument value is of type "int"
     *
     * @param argName {string} argument's name - used for context in case of error.
     * @param value {any} argument's value to validate.
     *
     * @throws POLAR301 if value is not of type "int"
     */
    validate: function (argName, value) {
        var isInt = Number.isInteger(value);
        if (!isInt) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
                value: value,
                name: argName,
                type: exports.int.name
            });
        }
    }
};
/**
 * Float type.
 * Accepts either a decimal string number or hexadecimal string number.
 * @throws POLAR301
 */
exports.float = {
    name: "float",
    parse: function (argName, strValue) {
        var decimalPattern = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE]\d+)?$/;
        var hexPattern = /^0[xX][\dABCDEabcde]+$/;
        if (strValue.match(decimalPattern) === null &&
            strValue.match(hexPattern) === null) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
                value: strValue,
                name: argName,
                type: exports.float.name
            });
        }
        return Number(strValue);
    },
    /**
     * Check if argument value is of type "float".
     * Both decimal and integer number values are valid.
     *
     * @param argName {string} argument's name - used for context in case of error.
     * @param value {any} argument's value to validate.
     *
     * @throws POLAR301 if value is not of type "number"
     */
    validate: function (argName, value) {
        var isFloatOrInteger = typeof value === "number" && !isNaN(value);
        if (!isFloatOrInteger) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
                value: value,
                name: argName,
                type: exports.float.name
            });
        }
    }
};
/**
 * Input file type.
 * Accepts a path to a readable file..
 * @throws POLAR302
 */
exports.inputFile = {
    name: "inputFile",
    parse: function (argName, strValue) {
        try {
            fs.accessSync(strValue, fs.constants.R_OK);
            var stats = fs.lstatSync(strValue);
            if (stats.isDirectory()) {
                // This is caught and encapsulated in a polar error.
                // tslint:disable-next-line only-polar-error
                throw new Error(strValue + " is a directory, not a file");
            }
        }
        catch (error) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_INPUT_FILE, {
                name: argName,
                value: strValue
            }, error);
        }
        return strValue;
    },
    /**
     * Check if argument value is of type "inputFile"
     * File string validation succeeds if it can be parsed, ie. is a valid accessible file dir
     *
     * @param argName {string} argument's name - used for context in case of error.
     * @param value {any} argument's value to validate.
     *
     * @throws POLAR301 if value is not of type "inputFile"
     */
    validate: function (argName, value) {
        try {
            exports.inputFile.parse(argName, value);
        }
        catch (error) {
            // the input value is considered invalid, throw error.
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
                value: value,
                name: argName,
                type: exports.inputFile.name
            }, error);
        }
    }
};
exports.json = {
    name: "json",
    parse: function (argName, strValue) {
        try {
            return JSON.parse(strValue);
        }
        catch (error) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_JSON_ARGUMENT, {
                param: argName,
                error: error.message
            }, error);
        }
    },
    /**
     * Check if argument value is of type "json". We consider everything except
     * undefined to be json.
     *
     * @param argName {string} argument's name - used for context in case of error.
     * @param value {any} argument's value to validate.
     *
     * @throws POLAR301 if value is not of type "json"
     */
    validate: function (argName, value) {
        if (value === undefined) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE, {
                value: value,
                name: argName,
                type: exports.json.name
            });
        }
    }
};
