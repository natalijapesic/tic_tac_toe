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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClosestCallerPackage = void 0;
var find_up_1 = __importDefault(require("find-up"));
var path_1 = __importDefault(require("path"));
function findClosestPackageJson(file) {
    var _a;
    return (_a = find_up_1.default.sync('package.json', { cwd: path_1.default.dirname(file) })) !== null && _a !== void 0 ? _a : null;
}
/**
 * Returns the name of the closest package in the callstack that isn't this.
 */
function getClosestCallerPackage() {
    var e_1, _a;
    var previousPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (e, s) { return s; };
    var error = new Error();
    // eslint-disable-next-line
    var stack = error.stack;
    Error.prepareStackTrace = previousPrepareStackTrace;
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    var currentPackage = findClosestPackageJson(__filename);
    try {
        for (var stack_1 = __values(stack), stack_1_1 = stack_1.next(); !stack_1_1.done; stack_1_1 = stack_1.next()) {
            var callSite = stack_1_1.value;
            var fileName = callSite.getFileName();
            if (fileName !== null && path_1.default.isAbsolute(fileName)) {
                var callerPackage = findClosestPackageJson(fileName);
                if (callerPackage === currentPackage) {
                    continue;
                }
                if (callerPackage === null) {
                    return undefined;
                }
                return require(callerPackage).name; // eslint-disable-line @typescript-eslint/no-var-requires
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (stack_1_1 && !stack_1_1.done && (_a = stack_1.return)) _a.call(stack_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return undefined;
}
exports.getClosestCallerPackage = getClosestCallerPackage;
