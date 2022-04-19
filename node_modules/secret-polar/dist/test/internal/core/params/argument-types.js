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
var chai_1 = require("chai");
var chalk_1 = __importDefault(require("chalk"));
var fsExtra = __importStar(require("fs-extra"));
var os = __importStar(require("os"));
var path = __importStar(require("path"));
var errors_list_1 = require("../../../../src/internal/core/errors-list");
var types = __importStar(require("../../../../src/internal/core/params/argument-types"));
var errors_1 = require("../../../helpers/errors");
describe("argumentTypes", function () {
    it("should set the right name to all the argument types", function () {
        var e_1, _a;
        try {
            for (var _b = __values(Object.keys(types)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var typeName = _c.value;
                var argumentTypesMap = types;
                chai_1.assert.equal(argumentTypesMap[typeName].name, typeName);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    describe("string type", function () {
        it("should work with valid values", function () {
            chai_1.assert.equal(types.string.parse("arg", "asd"), "asd");
            chai_1.assert.equal(types.string.parse("arg", "asd1"), "asd1");
            chai_1.assert.equal(types.string.parse("arg", "asd 123"), "asd 123");
            chai_1.assert.equal(types.string.parse("arg", "1"), "1");
            chai_1.assert.equal(types.string.parse("arg", ""), "");
        });
    });
    describe("boolean type", function () {
        it("should work with valid values", function () {
            chai_1.assert.equal(types.boolean.parse("arg", "true"), true);
            chai_1.assert.equal(types.boolean.parse("arg", "false"), false);
        });
        it("should throw the right error on invalid values", function () {
            errors_1.expectPolarError(function () { return types.boolean.parse("arg", "asd1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.boolean.parse("arg", "f"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.boolean.parse("arg", "t"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.boolean.parse("arg", "1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.boolean.parse("arg", "0"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.boolean.parse("arg", ""); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
        });
    });
    describe("int type", function () {
        it("should work with decimal values", function () {
            chai_1.assert.equal(types.int.parse("arg", "0"), 0);
            chai_1.assert.equal(types.int.parse("arg", "1"), 1);
            chai_1.assert.equal(types.int.parse("arg", "1123"), 1123);
            chai_1.assert.equal(types.int.parse("arg", "05678"), 5678);
        });
        it("should work with hex values", function () {
            chai_1.assert.equal(types.int.parse("arg", "0x0"), 0);
            chai_1.assert.equal(types.int.parse("arg", "0x1"), 1);
            chai_1.assert.equal(types.int.parse("arg", "0xA"), 0xa);
            chai_1.assert.equal(types.int.parse("arg", "0xa"), 0xa);
            chai_1.assert.equal(types.int.parse("arg", "0x0a"), 0x0a);
        });
        it("should work with decimal scientific notation", function () {
            chai_1.assert.equal(types.int.parse("arg", "1e0"), 1);
            chai_1.assert.equal(types.int.parse("arg", "1e123"), 1e123);
            chai_1.assert.equal(types.int.parse("arg", "12e0"), 12);
            chai_1.assert.equal(types.int.parse("arg", "012e1"), 120);
            chai_1.assert.equal(types.int.parse("arg", "0e12"), 0);
        });
        it("should fail with incorrect values", function () {
            errors_1.expectPolarError(function () { return types.int.parse("arg", ""); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.int.parse("arg", "1."); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.int.parse("arg", ".1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.int.parse("arg", "0.1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.int.parse("arg", "asdas"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.int.parse("arg", "a1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.int.parse("arg", "1a"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.int.parse("arg", "1 1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.int.parse("arg", "x123"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
        });
    });
    describe("float type", function () {
        it("should work with integer decimal values", function () {
            chai_1.assert.equal(types.float.parse("arg", "0"), 0);
            chai_1.assert.equal(types.float.parse("arg", "1"), 1);
            chai_1.assert.equal(types.float.parse("arg", "1123"), 1123);
            chai_1.assert.equal(types.float.parse("arg", "05678"), 5678);
        });
        it("should work with non-integer decimal values", function () {
            chai_1.assert.equal(types.float.parse("arg", "0.1"), 0.1);
            chai_1.assert.equal(types.float.parse("arg", "123.123"), 123.123);
            chai_1.assert.equal(types.float.parse("arg", ".123"), 0.123);
            chai_1.assert.equal(types.float.parse("arg", "0."), 0);
        });
        it("should work with integer hex values", function () {
            chai_1.assert.equal(types.float.parse("arg", "0x0"), 0);
            chai_1.assert.equal(types.float.parse("arg", "0x1"), 1);
            chai_1.assert.equal(types.float.parse("arg", "0xA"), 0xa);
            chai_1.assert.equal(types.float.parse("arg", "0xa"), 0xa);
            chai_1.assert.equal(types.float.parse("arg", "0x0a"), 0x0a);
        });
        it("should work with decimal scientific notation", function () {
            chai_1.assert.equal(types.float.parse("arg", "1e0"), 1);
            chai_1.assert.equal(types.float.parse("arg", "1e123"), 1e123);
            chai_1.assert.equal(types.float.parse("arg", "12e0"), 12);
            chai_1.assert.equal(types.float.parse("arg", "012e1"), 120);
            chai_1.assert.equal(types.float.parse("arg", "0e12"), 0);
            chai_1.assert.equal(types.float.parse("arg", "1.e123"), 1e123);
            chai_1.assert.equal(types.float.parse("arg", "1.0e123"), 1e123);
            chai_1.assert.equal(types.float.parse("arg", "1.0123e123"), 1.0123e123);
        });
        it("should fail with incorrect values", function () {
            errors_1.expectPolarError(function () { return types.float.parse("arg", ""); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "."); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", ".."); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "1..1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "1.asd"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "asd.123"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "asdas"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "a1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "1a"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "1 1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
            errors_1.expectPolarError(function () { return types.float.parse("arg", "x123"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_VALUE_FOR_TYPE);
        });
    });
    describe("Input file type", function () {
        it("Should return the file path if the file exists and is readable", function () {
            var output = types.inputFile.parse("A file", __filename);
            chai_1.assert.equal(output, __filename);
        });
        it("Should work with a relative path", function () {
            var relative = path.relative(process.cwd(), __filename);
            var output = types.inputFile.parse("A file", relative);
            chai_1.assert.equal(output, relative);
        });
        it("Should work with an absolute path", function () { return __awaiter(void 0, void 0, void 0, function () {
            var absolute, output;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fsExtra.realpath(__filename)];
                    case 1:
                        absolute = _a.sent();
                        output = types.inputFile.parse("A file", absolute);
                        chai_1.assert.equal(output, absolute);
                        return [2 /*return*/];
                }
            });
        }); });
        it("Should throw if the file doesnt exist", function () {
            errors_1.expectPolarError(function () { return types.inputFile.parse("A file", "NON_EXISTENT_FILE"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_INPUT_FILE);
        });
        it("Should throw if the file isn't readable", function () {
            var _this = this;
            var isRoot = process.getuid && process.getuid() === 0;
            if (os.type() === "Windows_NT" || isRoot) {
                console.warn(chalk_1.default.yellowBright("Skipping test: either OS is windows or tests are being run as root"));
                this.skip();
            }
            fsExtra.createFileSync("A");
            fsExtra.chmodSync("A", 0); // assign no permission [read-execute-write: 000]
            // check if permission set or not, if we are NOT able to access the file,
            // then 000 permission was successfully set, otherwise skip the test
            // (if system is reading it anyway)
            fsExtra.access("A", fsExtra.constants.R_OK, function (err) {
                if (err) {
                    console.warn(chalk_1.default.yellowBright("Skipping test: permission not set successfully"));
                    _this.skip();
                }
            });
            errors_1.expectPolarError(function () { return types.inputFile.parse("A file", "A"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_INPUT_FILE);
            fsExtra.unlinkSync("A");
        });
        it("Should throw if a directory is given", function () {
            errors_1.expectPolarError(function () { return types.inputFile.parse("A file", __dirname); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_INPUT_FILE);
        });
    });
    describe("JSON type", function () {
        it("Should fail if the argument isn't JSON", function () {
            errors_1.expectPolarError(function () { return types.json.parse("j", "a"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_JSON_ARGUMENT);
            errors_1.expectPolarError(function () { return types.json.parse("j", "{a:1"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_JSON_ARGUMENT);
            errors_1.expectPolarError(function () { return types.json.parse("j", "[1],"); }, errors_list_1.ERRORS.ARGUMENTS.INVALID_JSON_ARGUMENT);
        });
        it("Should parse an object successfully", function () {
            chai_1.assert.deepEqual(types.json.parse("j", '{"a":1}'), { a: 1 });
        });
        it("Should parse a number", function () {
            chai_1.assert.deepEqual(types.json.parse("j", "123"), 123);
        });
        it("Should parse a list", function () {
            chai_1.assert.deepEqual(types.json.parse("j", "[1,2]"), [1, 2]);
        });
        it("Should parse a string", function () {
            chai_1.assert.deepEqual(types.json.parse("j", '"a"'), "a");
        });
        it("Should accept anything except undefined as valid", function () {
            var validate = types.json.validate;
            if (validate === undefined) {
                chai_1.assert.fail("types.json.validate must exist");
                return;
            }
            chai_1.assert.doesNotThrow(function () { return validate("json", 1); });
            chai_1.assert.doesNotThrow(function () { return validate("json", "asd"); });
            chai_1.assert.doesNotThrow(function () { return validate("json", [1]); });
            chai_1.assert.doesNotThrow(function () { return validate("json", { a: 123 }); });
            chai_1.assert.doesNotThrow(function () { return validate("json", null); });
            chai_1.assert.throws(function () { return validate("json", undefined); });
        });
    });
});
