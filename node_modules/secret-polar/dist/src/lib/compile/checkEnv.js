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
exports.canCompile = exports.getWebAssemblyInstalled = exports.getRustcVersion = void 0;
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var semver_1 = __importDefault(require("semver"));
var install_1 = require("../../builtin-tasks/install");
function getRustcVersion() {
    var _a;
    try {
        var versionData = child_process_1.execSync("rustc -V");
        var _b = __read(((_a = versionData.toString().split(/\s/)[1]) === null || _a === void 0 ? void 0 : _a.trim().split('-')) || [], 1), version = _b[0];
        var res = semver_1.default.valid(version);
        if (typeof res === "string") {
            return res;
        }
        else {
            throw new Error("Invalid rust version");
        }
    }
    catch (error) {
        throw new Error("Can't fetch rust version");
    }
}
exports.getRustcVersion = getRustcVersion;
function getWebAssemblyInstalled() {
    try {
        var stableVersionData = child_process_1.execSync("rustup target list --installed --toolchain stable");
        var stableVersion = stableVersionData.toString().split(/\n/) || [];
        if (!stableVersion.includes('wasm32-unknown-unknown')) {
            console.log("wasm stable compiler not installed. Try " + chalk_1.default.grey('rustup target add wasm32-unknown-unknown --toolchain stable'));
            return false;
        }
        return true;
    }
    catch (error) {
        return false;
    }
}
exports.getWebAssemblyInstalled = getWebAssemblyInstalled;
function canCompile(env) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var rustcCurrVersion, wasmInstalled, wantVersion;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    rustcCurrVersion = getRustcVersion();
                    wasmInstalled = getWebAssemblyInstalled();
                    wantVersion = (_b = (_a = env.config.rust) === null || _a === void 0 ? void 0 : _a.version) !== null && _b !== void 0 ? _b : rustcCurrVersion;
                    if (!!rustcCurrVersion) return [3 /*break*/, 2];
                    console.log("Warning: rustc not installed.");
                    console.log("Installing rust");
                    return [4 /*yield*/, install_1.setupRust(env)];
                case 1:
                    _d.sent();
                    return [3 /*break*/, 4];
                case 2:
                    if (!(rustcCurrVersion.localeCompare(wantVersion) !== 0)) return [3 /*break*/, 4];
                    console.log("warning: rustc version " + chalk_1.default.green(rustcCurrVersion) + " installed, required " + chalk_1.default.green((_c = env.config.rust) === null || _c === void 0 ? void 0 : _c.version) + ".");
                    console.log("Updating rust version");
                    return [4 /*yield*/, install_1.setupRust(env)];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    if (!wasmInstalled) {
                        child_process_1.execSync("rustup target add wasm32-unknown-unknown");
                    }
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.canCompile = canCompile;
