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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveBuilderRegisterPath = exports.runScript = void 0;
var debug_1 = __importDefault(require("debug"));
var path = __importStar(require("path"));
var errors_1 = require("../core/errors");
var errors_list_1 = require("../core/errors-list");
var log = debug_1.default("polar:core:scripts-runner");
// eslint-disable-next-line
function loadScript(relativeScriptPath) {
    return __awaiter(this, void 0, void 0, function () {
        var absoluteScriptPath;
        return __generator(this, function (_a) {
            absoluteScriptPath = path.join(process.cwd(), relativeScriptPath);
            try {
                return [2 /*return*/, require(absoluteScriptPath)];
            }
            catch (err) {
                throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.SCRIPT_LOAD_ERROR, {
                    script: absoluteScriptPath,
                    error: err.message
                });
            }
            return [2 /*return*/];
        });
    });
}
/** Returns error line number and position at line attached with path.
 * @param error Error
 * @param scriptPath relative path to script where error occured
 */
function attachLineNumbertoScriptPath(
// eslint-disable-next-line
error, scriptPath) {
    var e_1, _a;
    var _b;
    var stackTraces = error.stack.split('\n');
    try {
        for (var stackTraces_1 = __values(stackTraces), stackTraces_1_1 = stackTraces_1.next(); !stackTraces_1_1.done; stackTraces_1_1 = stackTraces_1.next()) {
            var trace = stackTraces_1_1.value;
            var line = (_b = trace === null || trace === void 0 ? void 0 : trace.split(scriptPath.concat(':'))[1]) === null || _b === void 0 ? void 0 : _b.slice(0, -1); // extract line number
            if (line) {
                var _c = __read(line.split(':'), 2), lineNo = _c[0], position = _c[1];
                return scriptPath.concat(":Line:" + lineNo + ",Position:" + position);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (stackTraces_1_1 && !stackTraces_1_1.done && (_a = stackTraces_1.return)) _a.call(stackTraces_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return scriptPath;
}
// eslint-disable-next-line
function displayErr(error, relativeScriptPath) {
    if (error instanceof errors_1.PolarError) {
        throw error;
    }
    var relativeScriptPathWithLine = attachLineNumbertoScriptPath(error, relativeScriptPath);
    throw new errors_1.PolarError(errors_list_1.ERRORS.BUILTIN_TASKS.RUN_SCRIPT_ERROR, {
        script: relativeScriptPathWithLine,
        error: error.message
    }, error);
}
function runScript(relativeScriptPath, runtimeEnv) {
    return __awaiter(this, void 0, void 0, function () {
        var requiredScript, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (relativeScriptPath.endsWith('.ts')) {
                        relativeScriptPath = path.join('build', relativeScriptPath.split('.ts')[0] + '.js');
                    }
                    log("Running " + relativeScriptPath + ".default()");
                    return [4 /*yield*/, loadScript(relativeScriptPath)];
                case 1:
                    requiredScript = _a.sent();
                    if (!requiredScript.default) {
                        throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.NO_DEFAULT_EXPORT_IN_SCRIPT, {
                            script: relativeScriptPath
                        });
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, requiredScript.default(runtimeEnv)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    displayErr(error_1, relativeScriptPath);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.runScript = runScript;
/**
 * Ensure polar/register source file path is resolved to compiled JS file
 * instead of TS source file, so we don't need to run ts-node unnecessarily.
 */
function resolveBuilderRegisterPath() {
    var polarCoreBaseDir = path.join(__dirname, "..", "..", "..");
    return path.join(polarCoreBaseDir, "dist/register.js");
}
exports.resolveBuilderRegisterPath = resolveBuilderRegisterPath;
