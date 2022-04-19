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
var debug_1 = __importDefault(require("debug"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var config_env_1 = require("../internal/core/config/config-env");
var errors_1 = require("../internal/core/errors");
var errors_list_1 = require("../internal/core/errors-list");
var project_structure_1 = require("../internal/core/project-structure");
var script_runner_1 = require("../internal/util/script-runner");
var files_1 = require("../lib/files");
var task_names_1 = require("./task-names");
function filterNonExistent(scripts) {
    return scripts.filter(function (script) { return !fs_extra_1.default.pathExistsSync(script); });
}
exports.filterNonExistent = filterNonExistent;
function runScripts(runtimeEnv, scriptNames, force, logDebugTag, allowWrite) {
    return __awaiter(this, void 0, void 0, function () {
        var log, scriptNames_1, scriptNames_1_1, relativeScriptPath, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    log = debug_1.default(logDebugTag);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 8]);
                    scriptNames_1 = __values(scriptNames), scriptNames_1_1 = scriptNames_1.next();
                    _b.label = 2;
                case 2:
                    if (!!scriptNames_1_1.done) return [3 /*break*/, 5];
                    relativeScriptPath = scriptNames_1_1.value;
                    log("Running script " + relativeScriptPath);
                    return [4 /*yield*/, script_runner_1.runScript(relativeScriptPath, runtimeEnv)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    scriptNames_1_1 = scriptNames_1.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (scriptNames_1_1 && !scriptNames_1_1.done && (_a = scriptNames_1.return)) _a.call(scriptNames_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function executeRunTask(_a, runtimeEnv
// eslint-disable-next-line
) {
    var scripts = _a.scripts, skipCheckpoints = _a.skipCheckpoints;
    return __awaiter(this, void 0, void 0, function () {
        var logDebugTag, nonExistent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logDebugTag = "polar:tasks:run";
                    nonExistent = filterNonExistent(scripts);
                    if (nonExistent.length !== 0) {
                        throw new errors_1.PolarError(errors_list_1.ERRORS.BUILTIN_TASKS.RUN_FILES_NOT_FOUND, {
                            scripts: nonExistent
                        });
                    }
                    if (skipCheckpoints) { // used by Contract() class to skip checkpoints
                        runtimeEnv.runtimeArgs.useCheckpoints = false;
                    }
                    return [4 /*yield*/, runScripts(runtimeEnv, files_1.assertDirChildren(project_structure_1.SCRIPTS_DIR, scripts), true, logDebugTag, false)];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function default_1() {
    config_env_1.task(task_names_1.TASK_RUN, "Runs a user-defined script after compiling the project")
        .addVariadicPositionalParam("scripts", "A js file to be run within polar's environment")
        .addFlag("skipCheckpoints", "do not read from or write checkpoints")
        .setAction(function (input, env) { return executeRunTask(input, env); });
}
exports.default = default_1;
