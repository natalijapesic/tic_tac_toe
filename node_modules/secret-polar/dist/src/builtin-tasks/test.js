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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterNonExistent = void 0;
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var config_env_1 = require("../internal/core/config/config-env");
var errors_1 = require("../internal/core/errors");
var errors_list_1 = require("../internal/core/errors-list");
var project_structure_1 = require("../internal/core/project-structure");
var files_1 = require("../lib/files");
var task_names_1 = require("./task-names");
function filterNonExistent(scripts) {
    return scripts.filter(function (script) { return !fs_extra_1.default.pathExistsSync(script); });
}
exports.filterNonExistent = filterNonExistent;
function runTests(runtimeEnv, scriptNames, logDebugTag) {
    return __awaiter(this, void 0, void 0, function () {
        var Mocha, mocha, scriptNames_1, scriptNames_1_1, relativeScriptPath, testFailures;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require('mocha')); })];
                case 1:
                    Mocha = (_b.sent()).default;
                    mocha = new Mocha(runtimeEnv.config.mocha);
                    try {
                        for (scriptNames_1 = __values(scriptNames), scriptNames_1_1 = scriptNames_1.next(); !scriptNames_1_1.done; scriptNames_1_1 = scriptNames_1.next()) {
                            relativeScriptPath = scriptNames_1_1.value;
                            mocha.addFile(relativeScriptPath);
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (scriptNames_1_1 && !scriptNames_1_1.done && (_a = scriptNames_1.return)) _a.call(scriptNames_1);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            mocha.run(resolve);
                        })];
                case 2:
                    testFailures = _b.sent();
                    process.exitCode = testFailures;
                    return [2 /*return*/];
            }
        });
    });
}
function executeTestTask(_a, runtimeEnv) {
    var tests = _a.tests;
    return __awaiter(this, void 0, void 0, function () {
        var logDebugTag, _b, _c, file, nonExistent;
        var e_2, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    logDebugTag = "polar:tasks:test";
                    if (tests === undefined) {
                        tests = [];
                        try {
                            for (_b = __values(fs_extra_1.default.readdirSync(project_structure_1.TESTS_DIR)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                file = _c.value;
                                tests.push(path_1.default.join(project_structure_1.TESTS_DIR, file));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        console.log("Reading test files in " + chalk_1.default.cyan(project_structure_1.TESTS_DIR) + " directory");
                        console.log("Found " + tests.length + " test files: " + chalk_1.default.green(tests));
                    }
                    nonExistent = filterNonExistent(tests);
                    if (nonExistent.length !== 0) {
                        throw new errors_1.PolarError(errors_list_1.ERRORS.BUILTIN_TASKS.RUN_FILES_NOT_FOUND, {
                            scripts: nonExistent
                        });
                    }
                    runtimeEnv.runtimeArgs.command = "test"; // used by Contract() class to skip artifacts
                    runtimeEnv.runtimeArgs.useCheckpoints = false;
                    return [4 /*yield*/, runTests(runtimeEnv, files_1.assertDirChildren(project_structure_1.TESTS_DIR, tests), logDebugTag)];
                case 1:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function default_1() {
    config_env_1.task(task_names_1.TASK_TEST, "Runs a user-defined test script after compiling the project")
        .addOptionalVariadicPositionalParam("tests", "A js file to be run within polar's environment")
        .setAction(function (input, env) { return executeTestTask(input, env); });
}
exports.default = default_1;
