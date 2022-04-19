"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
var chai_1 = require("chai");
var errors_list_1 = require("../../../src/internal/core/errors-list");
var arguments_parser_1 = require("../../../src/internal/cli/arguments-parser");
var argument_types_1 = require("../../../src/internal/core/params/argument-types");
var polar_params_1 = require("../../../src/internal/core/params/polar-params");
var task_definitions_1 = require("../../../src/internal/core/tasks/task-definitions");
var errors_1 = require("../../helpers/errors");
var SHOW_STACK = "--show-stack-traces";
function parseAndexpectPolarError(argumentsParser, envArgs, rawCLAs, errorDescriptor) {
    errors_1.expectPolarError(function () {
        return argumentsParser.parseRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, polar_params_1.POLAR_SHORT_PARAM_SUBSTITUTIONS, envArgs, rawCLAs);
    }, errorDescriptor);
}
describe("ArgumentsParser", function () {
    var argumentsParser;
    var envArgs;
    var taskDefinition;
    var overridenTaskDefinition;
    beforeEach(function () {
        argumentsParser = new arguments_parser_1.ArgumentsParser();
        envArgs = {
            network: "test",
            showStackTraces: false,
            version: false,
            help: false,
            verbose: false
        };
        taskDefinition = new task_definitions_1.SimpleTaskDefinition("compile", true)
            .addParam("param", "just a param", "a default value", argument_types_1.string)
            .addParam("bleep", "useless param", 1602, argument_types_1.int, true);
        var baseTaskDefinition = new task_definitions_1.SimpleTaskDefinition("overriddenTask")
            .addParam("strParam", "a str param", "defaultValue", argument_types_1.string)
            .addFlag("aFlag", "a flag param");
        overridenTaskDefinition = new task_definitions_1.OverriddenTaskDefinition(baseTaskDefinition)
            .addFlag("overriddenFlag", "added flag param")
            .addOptionalParam("overriddenOptParam", "added opt param");
    });
    it("should transform a param name into CLA", function () {
        chai_1.assert.equal(arguments_parser_1.ArgumentsParser.paramNameToCLA("showStackTraces"), SHOW_STACK);
        chai_1.assert.equal(arguments_parser_1.ArgumentsParser.paramNameToCLA("version"), "--version");
    });
    it("Should throw if a param name CLA isn't all lowercase", function () {
        errors_1.expectPolarError(function () { return arguments_parser_1.ArgumentsParser.cLAToParamName("--show-Stack-traces"); }, errors_list_1.ERRORS.ARGUMENTS.PARAM_NAME_INVALID_CASING);
        errors_1.expectPolarError(function () { return arguments_parser_1.ArgumentsParser.cLAToParamName("--shOw-stack-traces"); }, errors_list_1.ERRORS.ARGUMENTS.PARAM_NAME_INVALID_CASING);
        errors_1.expectPolarError(function () { return arguments_parser_1.ArgumentsParser.cLAToParamName("--show-stack-tRaces"); }, errors_list_1.ERRORS.ARGUMENTS.PARAM_NAME_INVALID_CASING);
    });
    it("should transform CLA into a param name", function () {
        chai_1.assert.equal(arguments_parser_1.ArgumentsParser.cLAToParamName("--run"), "run");
        chai_1.assert.equal(arguments_parser_1.ArgumentsParser.cLAToParamName(SHOW_STACK), "showStackTraces");
    });
    it("should detect param name format", function () {
        chai_1.assert.isTrue(argumentsParser._hasCLAParamNameFormat("--run"));
        chai_1.assert.isFalse(argumentsParser._hasCLAParamNameFormat("run"));
    });
    it("should detect parameter names", function () {
        chai_1.assert.isTrue(argumentsParser._isCLAParamName("--show-stack-traces", polar_params_1.POLAR_PARAM_DEFINITIONS));
        chai_1.assert.isFalse(argumentsParser._isCLAParamName("sarasa", polar_params_1.POLAR_PARAM_DEFINITIONS));
        chai_1.assert.isFalse(argumentsParser._isCLAParamName("--sarasa", polar_params_1.POLAR_PARAM_DEFINITIONS));
    });
    describe("polar arguments", function () {
        it("should parse polar arguments with task", function () {
            var rawCLAs = [
                SHOW_STACK,
                "--network",
                "local",
                "compile",
                "--task-param"
            ];
            var _a = argumentsParser.parseRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, polar_params_1.POLAR_SHORT_PARAM_SUBSTITUTIONS, envArgs, rawCLAs), runtimeArgs = _a.runtimeArgs, taskName = _a.taskName, unparsedCLAs = _a.unparsedCLAs;
            chai_1.assert.equal(taskName, "compile");
            chai_1.assert.equal(runtimeArgs.showStackTraces, true);
            chai_1.assert.equal(runtimeArgs.network, "local");
            chai_1.assert.equal(unparsedCLAs.length, 1);
            chai_1.assert.equal("--task-param", unparsedCLAs[0]);
        });
        it("should parse polar arguments after taskname", function () {
            var rawCLAs = [
                "compile",
                "--task-param",
                "--show-stack-traces",
                "--network",
                "local"
            ];
            var _a = argumentsParser.parseRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, polar_params_1.POLAR_SHORT_PARAM_SUBSTITUTIONS, envArgs, rawCLAs), runtimeArgs = _a.runtimeArgs, taskName = _a.taskName, unparsedCLAs = _a.unparsedCLAs;
            chai_1.assert.equal(taskName, "compile");
            chai_1.assert.equal(runtimeArgs.showStackTraces, true);
            chai_1.assert.equal(runtimeArgs.network, "local");
            chai_1.assert.equal(unparsedCLAs.length, 1);
            chai_1.assert.equal("--task-param", unparsedCLAs[0]);
        });
        it("should fail trying to parse task arguments before taskname", function () {
            var rawCLAs = [
                "--task-param",
                "compile",
                "--show-stack-traces",
                "--network",
                "local"
            ];
            parseAndexpectPolarError(argumentsParser, envArgs, rawCLAs, errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_COMMAND_LINE_ARG);
        });
        it("should parse a polar argument", function () {
            var rawCLAs = [
                "--show-stack-traces",
                "--network",
                "local",
                "compile"
            ];
            var runtimeArgs = {};
            chai_1.assert.equal(0, argumentsParser._parseArgumentAt(rawCLAs, 0, polar_params_1.POLAR_PARAM_DEFINITIONS, runtimeArgs));
            chai_1.assert.equal(runtimeArgs.showStackTraces, true);
            chai_1.assert.equal(2, argumentsParser._parseArgumentAt(rawCLAs, 1, polar_params_1.POLAR_PARAM_DEFINITIONS, runtimeArgs));
            chai_1.assert.equal(runtimeArgs.network, "local");
        });
        it("should fail trying to parse polar with invalid argument", function () {
            var rawCLAs = [
                SHOW_STACK,
                "--network",
                "local",
                "--invalid-param"
            ];
            parseAndexpectPolarError(argumentsParser, envArgs, rawCLAs, errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_COMMAND_LINE_ARG);
        });
        it("should fail trying to parse a repeated argument", function () {
            var rawCLAs = [
                SHOW_STACK,
                "--network",
                "local",
                "--network",
                "local",
                "compile"
            ];
            parseAndexpectPolarError(argumentsParser, envArgs, rawCLAs, errors_list_1.ERRORS.ARGUMENTS.REPEATED_PARAM);
        });
        it("should only add non-present arguments", function () {
            var runtimeArgs = argumentsParser._addBuilderDefaultArguments(polar_params_1.POLAR_PARAM_DEFINITIONS, envArgs, {
                showStackTraces: true
            });
            chai_1.assert.isTrue(runtimeArgs.showStackTraces);
        });
        it("should not change network unless specified by user", function () {
            var rawCLAs = [
                SHOW_STACK,
                "compile",
                "--task-param"
            ];
            var _a = argumentsParser.parseRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, polar_params_1.POLAR_SHORT_PARAM_SUBSTITUTIONS, envArgs, rawCLAs), runtimeArgs = _a.runtimeArgs, taskName = _a.taskName, unparsedCLAs = _a.unparsedCLAs;
            chai_1.assert.equal(taskName, "compile");
            chai_1.assert.equal(runtimeArgs.showStackTraces, true);
            chai_1.assert.equal(runtimeArgs.network, "test");
            chai_1.assert.equal(unparsedCLAs.length, 1);
            chai_1.assert.equal("--task-param", unparsedCLAs[0]);
        });
    });
    describe("tasks arguments", function () {
        it("should parse tasks arguments", function () {
            var rawCLAs = ["--param", "testing", "--bleep", "1337"];
            var _a = argumentsParser._parseTaskParamArguments(taskDefinition, rawCLAs), paramArguments = _a.paramArguments, rawPositionalArguments = _a.rawPositionalArguments;
            chai_1.assert.deepEqual(paramArguments, { param: "testing", bleep: 1337 });
            chai_1.assert.equal(rawPositionalArguments.length, 0);
        });
        it("should parse overridden tasks arguments", function () {
            var rawCLAs = [
                "--str-param",
                "testing",
                "--a-flag",
                "--overridden-flag",
                "--overridden-opt-param",
                "optValue"
            ];
            var _a = argumentsParser._parseTaskParamArguments(overridenTaskDefinition, rawCLAs), paramArguments = _a.paramArguments, rawPositionalArguments = _a.rawPositionalArguments;
            chai_1.assert.deepEqual(paramArguments, {
                strParam: "testing",
                aFlag: true,
                overriddenFlag: true,
                overriddenOptParam: "optValue"
            });
            chai_1.assert.equal(rawPositionalArguments.length, 0);
        });
        it("should parse task with variadic arguments", function () {
            taskDefinition.addVariadicPositionalParam("variadic", "a variadic params", [], argument_types_1.int);
            var rawPositionalArguments = ["16", "02"];
            var positionalArguments = argumentsParser._parsePositionalParamArgs(rawPositionalArguments, taskDefinition.positionalParamDefinitions);
            chai_1.assert.deepEqual(positionalArguments.variadic, [16, 2]);
        });
        it("should parse task with default variadic arguments", function () {
            taskDefinition.addVariadicPositionalParam("variadic", "a variadic params", [1729], argument_types_1.int);
            var rawPositionalArguments = [];
            // tslint:disable-next-line:no-string-literal
            var positionalArguments = argumentsParser._parsePositionalParamArgs(rawPositionalArguments, taskDefinition.positionalParamDefinitions);
            chai_1.assert.deepEqual(positionalArguments.variadic, [1729]);
        });
        it("should fail when passing invalid parameter", function () {
            errors_1.expectPolarError(function () {
                argumentsParser.parseTaskArguments(taskDefinition, ["--invalid-parameter", "not_valid"]);
            }, errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_PARAM_NAME);
        });
        it("should fail to parse task without non optional variadic arguments", function () {
            taskDefinition.addVariadicPositionalParam("variadic", "a variadic params");
            errors_1.expectPolarError(function () {
                argumentsParser.parseTaskArguments(taskDefinition, ["--param", "testing", "--bleep", "1337"]);
            }, errors_list_1.ERRORS.ARGUMENTS.MISSING_POSITIONAL_ARG);
        });
        it("should fail to parse task without non optional argument", function () {
            var definition = new task_definitions_1.SimpleTaskDefinition("compile", true);
            definition.addParam("param", "just a param");
            definition.addParam("bleep", "useless param", 1602, argument_types_1.int, true);
            errors_1.expectPolarError(function () {
                argumentsParser.parseTaskArguments(definition, []);
            }, errors_list_1.ERRORS.ARGUMENTS.MISSING_TASK_ARGUMENT);
        });
        it("should fail when passing unneeded arguments", function () {
            errors_1.expectPolarError(function () {
                argumentsParser.parseTaskArguments(taskDefinition, ["more", "arguments"]);
            }, errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_POSITIONAL_ARG);
        });
        it("should parse task with positional arguments", function () {
            var rawCLAs = [
                "--param",
                "testing",
                "--bleep",
                "1337",
                "foobar"
            ];
            taskDefinition.addPositionalParam("positional", "a posititon param");
            var args = argumentsParser.parseTaskArguments(taskDefinition, rawCLAs);
            chai_1.assert.deepEqual(args, {
                param: "testing",
                bleep: 1337,
                positional: "foobar"
            });
        });
        it("Should throw the right error if the last CLA is a non-flag --param", function () {
            var rawCLAs = ["--b"];
            taskDefinition = new task_definitions_1.SimpleTaskDefinition("t", false)
                .addOptionalParam("b", "A boolean", true, argument_types_1.boolean)
                .setAction(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); }); });
            errors_1.expectPolarError(function () { return argumentsParser.parseTaskArguments(taskDefinition, rawCLAs); }, errors_list_1.ERRORS.ARGUMENTS.MISSING_TASK_ARGUMENT);
        });
    });
});
