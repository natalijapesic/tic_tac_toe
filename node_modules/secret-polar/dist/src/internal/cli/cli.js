#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEnvironmentAndArgs = exports.gatherArguments = void 0;
// -*- mode: typescript -*- // https://github.com/syl20bnr/spacemacs/issues/13715
require("source-map-support/register");
var chalk_1 = __importDefault(require("chalk"));
var debug_1 = __importDefault(require("debug"));
var semver_1 = __importDefault(require("semver"));
var task_names_1 = require("../../builtin-tasks/task-names");
var context_1 = require("../context");
var config_loading_1 = require("../core/config/config-loading");
var errors_1 = require("../core/errors");
var errors_list_1 = require("../core/errors-list");
var env_variables_1 = require("../core/params/env-variables");
var polar_params_1 = require("../core/params/polar-params");
var project_structure_1 = require("../core/project-structure");
var runtime_env_1 = require("../core/runtime-env");
var builtin_tasks_1 = require("../core/tasks/builtin-tasks");
var packageInfo_1 = require("../util/packageInfo");
var arguments_parser_1 = require("./arguments-parser");
var POLAR_NAME = "polar";
var log = debug_1.default("polar:core:cli");
function printVersionMessage(packageJson) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(packageJson.version);
            return [2 /*return*/];
        });
    });
}
function ensureValidNodeVersion(packageJson) {
    var requirement = packageJson.engines.node;
    if (!semver_1.default.satisfies(process.version, requirement)) {
        throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.INVALID_NODE_VERSION, {
            requirement: requirement
        });
    }
}
function printErrRecur(error) {
    if (error.parent) {
        if (error.parent instanceof errors_1.PolarError) {
            printErrRecur(error.parent);
        }
        else {
            console.error(error.parent);
        }
    }
}
function printStackTraces(showStackTraces, error) {
    if (error === undefined) {
        return;
    }
    if (showStackTraces) {
        printErrRecur(error);
    }
    else {
        console.error("For more info run " + POLAR_NAME + " with --show-stack-traces or add --help to display task-specific help.");
    }
}
function gatherArguments() {
    return __awaiter(this, void 0, void 0, function () {
        var showStackTraces, packageJson, envVariableArguments, argumentsParser, _a, runtimeArgs, maybeTaskName, unparsedCLAs;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    showStackTraces = process.argv.includes("--show-stack-traces");
                    return [4 /*yield*/, packageInfo_1.getPackageJson()];
                case 1:
                    packageJson = _b.sent();
                    ensureValidNodeVersion(packageJson);
                    envVariableArguments = env_variables_1.getEnvRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, process.env);
                    argumentsParser = new arguments_parser_1.ArgumentsParser();
                    _a = argumentsParser.parseRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, polar_params_1.POLAR_SHORT_PARAM_SUBSTITUTIONS, envVariableArguments, process.argv.slice(2)), runtimeArgs = _a.runtimeArgs, maybeTaskName = _a.taskName, unparsedCLAs = _a.unparsedCLAs;
                    if (runtimeArgs.verbose) {
                        debug_1.default.enable("polar*");
                    }
                    showStackTraces = runtimeArgs.showStackTraces;
                    return [2 /*return*/, {
                            runtimeArgs: runtimeArgs,
                            unparsedCLAs: unparsedCLAs,
                            maybeTaskName: maybeTaskName,
                            showStackTraces: showStackTraces,
                            packageJson: packageJson,
                            argumentsParser: argumentsParser
                        }];
            }
        });
    });
}
exports.gatherArguments = gatherArguments;
function loadEnvironmentAndArgs(maybeTaskName, runtimeArgs, argumentsParser, unparsedCLAs) {
    return __awaiter(this, void 0, void 0, function () {
        var ctx, config, envExtenders, taskDefinitions, taskName, origTaskName, taskArguments, isSetup, env;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ctx = context_1.PolarContext.createPolarContext();
                    return [4 /*yield*/, config_loading_1.loadConfigAndTasks(runtimeArgs)];
                case 1:
                    config = _a.sent();
                    envExtenders = ctx.extendersManager.getExtenders();
                    taskDefinitions = ctx.tasksDSL.getTaskDefinitions();
                    taskName = maybeTaskName !== null && maybeTaskName !== void 0 ? maybeTaskName : task_names_1.TASK_HELP;
                    if (taskDefinitions[taskName] == null) {
                        throw new errors_1.PolarError(errors_list_1.ERRORS.ARGUMENTS.UNRECOGNIZED_TASK, {
                            task: taskName
                        });
                    }
                    origTaskName = taskName;
                    if (runtimeArgs.help && taskName !== task_names_1.TASK_HELP) {
                        taskArguments = { task: taskName };
                        taskName = task_names_1.TASK_HELP;
                    }
                    else {
                        taskArguments = argumentsParser.parseTaskArguments(taskDefinitions[taskName], unparsedCLAs);
                    }
                    isSetup = builtin_tasks_1.isSetupTask(taskName);
                    // Being inside of a project is non-mandatory for help and init
                    if (!isSetup && !project_structure_1.isCwdInsideProject()) {
                        throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.NOT_INSIDE_PROJECT, { task: origTaskName });
                    }
                    env = new runtime_env_1.Environment(config, runtimeArgs, taskDefinitions, envExtenders, !isSetup);
                    ctx.setRuntimeEnv(env);
                    return [2 /*return*/, {
                            env: env,
                            taskName: taskName,
                            taskArguments: taskArguments
                        }];
            }
        });
    });
}
exports.loadEnvironmentAndArgs = loadEnvironmentAndArgs;
/* eslint-disable sonarjs/cognitive-complexity */
function main() {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var showStackTraces, _b, runtimeArgs, unparsedCLAs, showStackTracesUpdate, packageJson, maybeTaskName, argumentsParser, _c, env, taskName, taskArguments, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    log("Initiating polar task !");
                    showStackTraces = false;
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, gatherArguments()];
                case 2:
                    _b = _d.sent(), runtimeArgs = _b.runtimeArgs, unparsedCLAs = _b.unparsedCLAs, showStackTracesUpdate = _b.showStackTraces, packageJson = _b.packageJson, maybeTaskName = _b.maybeTaskName, argumentsParser = _b.argumentsParser;
                    showStackTraces = showStackTracesUpdate;
                    if (!runtimeArgs.version) return [3 /*break*/, 4];
                    return [4 /*yield*/, printVersionMessage(packageJson)];
                case 3:
                    _d.sent();
                    return [2 /*return*/];
                case 4: return [4 /*yield*/, loadEnvironmentAndArgs(maybeTaskName, runtimeArgs, argumentsParser, unparsedCLAs)];
                case 5:
                    _c = _d.sent(), env = _c.env, taskName = _c.taskName, taskArguments = _c.taskArguments;
                    return [4 /*yield*/, env.run(taskName, taskArguments)];
                case 6:
                    _d.sent();
                    log("Quitting polar after successfully running task " + taskName);
                    return [3 /*break*/, 8];
                case 7:
                    error_1 = _d.sent();
                    if (errors_1.PolarError.isPolarError(error_1)) {
                        console.error(chalk_1.default.red("Error " + error_1.message));
                    }
                    else if (errors_1.PolarPluginError.isPolarPluginError(error_1)) {
                        console.error(chalk_1.default.red("Error in plugin " + ((_a = error_1.pluginName) !== null && _a !== void 0 ? _a : "") + ": " + error_1.message));
                    }
                    else if (error_1 instanceof Error) {
                        console.error(chalk_1.default.red("An unexpected error occurred:"), error_1.message);
                        showStackTraces = true;
                    }
                    else {
                        console.error(chalk_1.default.red("An unexpected error occurred."));
                        showStackTraces = true;
                    }
                    console.log("");
                    printStackTraces(showStackTraces, error_1);
                    process.exit(1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return process.exit(process.exitCode); })
    .catch(function (error) {
    console.error(error);
    process.exit(1);
});
