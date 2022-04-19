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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
var chai_1 = require("chai");
var errors_list_1 = require("../../../../src/internal/core/errors-list");
var types = __importStar(require("../../../../src/internal/core/params/argument-types"));
var task_definitions_1 = require("../../../../src/internal/core/tasks/task-definitions");
var unsafe_1 = require("../../../../src/internal/util/unsafe");
var errors_1 = require("../../../helpers/errors");
function expectThrowParamAlreadyDefinedError(f) {
    errors_1.expectPolarError(f, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_ALREADY_DEFINED);
}
function getLastPositionalParam(taskDefinition) {
    chai_1.assert.isNotEmpty(taskDefinition.positionalParamDefinitions);
    return taskDefinition.positionalParamDefinitions[taskDefinition.positionalParamDefinitions.length - 1];
}
function assertParamDefinition(actual, expected) {
    var e_1, _a;
    try {
        for (var _b = __values(unsafe_1.unsafeObjectKeys(actual)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (expected[key] !== undefined) {
                chai_1.assert.deepEqual(actual[key], expected[key]);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
var runSuperNop = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
runSuperNop.isDefined = false;
describe("SimpleTaskDefinition", function () {
    describe("construction", function () {
        var taskDefinition;
        before("init taskDefinition", function () {
            taskDefinition = new task_definitions_1.SimpleTaskDefinition("name", true);
        });
        it("gets the right name", function () {
            chai_1.assert.equal(taskDefinition.name, "name");
        });
        it("gets the right isInternal flag", function () {
            chai_1.assert.isTrue(taskDefinition.isInternal);
        });
        it("starts without any param defined", function () {
            chai_1.assert.deepEqual(taskDefinition.paramDefinitions, {});
            chai_1.assert.isEmpty(taskDefinition.positionalParamDefinitions);
        });
        it("starts without any description", function () {
            chai_1.assert.isUndefined(taskDefinition.description);
        });
        it("starts with an action that throws", function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, errors_1.expectPolarErrorAsync(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, taskDefinition.action({}, {}, runSuperNop)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }, errors_list_1.ERRORS.TASK_DEFINITIONS.ACTION_NOT_SET)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("setDescription", function () {
        it("Should change the description", function () {
            var taskDefinition = new task_definitions_1.SimpleTaskDefinition("name");
            chai_1.assert.isUndefined(taskDefinition.description);
            taskDefinition.setDescription("A");
            chai_1.assert.equal(taskDefinition.description, "A");
            taskDefinition.setDescription("B");
            chai_1.assert.equal(taskDefinition.description, "B");
        });
    });
    describe("setAction", function () {
        it("Should change the action", function () { return __awaiter(void 0, void 0, void 0, function () {
            var taskDefinition, result, obj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        taskDefinition = new task_definitions_1.SimpleTaskDefinition("name");
                        taskDefinition.setAction(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, 1];
                        }); }); });
                        return [4 /*yield*/, taskDefinition.action({}, {}, runSuperNop)];
                    case 1:
                        result = _a.sent();
                        chai_1.assert.equal(result, 1);
                        obj = {};
                        taskDefinition.setAction(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, obj];
                        }); }); });
                        return [4 /*yield*/, taskDefinition.action({}, {}, runSuperNop)];
                    case 2:
                        result = _a.sent();
                        chai_1.assert.equal(result, obj);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("param definition rules", function () {
        var taskDefinition;
        beforeEach("init taskDefinition", function () {
            taskDefinition = new task_definitions_1.SimpleTaskDefinition("name", true);
        });
        describe("param name repetitions", function () {
            beforeEach("set param with name 'name'", function () {
                taskDefinition.addParam("name", "a description", "asd");
            });
            it("should throw if addParam repeats a param name", function () {
                expectThrowParamAlreadyDefinedError(function () {
                    return taskDefinition.addParam("name", "another desc");
                });
            });
            it("should throw if addOptionalParam repeats a param name", function () {
                expectThrowParamAlreadyDefinedError(function () {
                    return taskDefinition.addOptionalParam("name", "another desc");
                });
            });
            it("should throw if addFlag repeats a param name", function () {
                expectThrowParamAlreadyDefinedError(function () {
                    return taskDefinition.addFlag("name", "another desc");
                });
            });
            it("should throw if addPositionalParam repeats a param name", function () {
                expectThrowParamAlreadyDefinedError(function () {
                    return taskDefinition.addPositionalParam("name", "another desc");
                });
            });
            it("should throw if addOptionalPositionalParam repeats a param name", function () {
                expectThrowParamAlreadyDefinedError(function () {
                    return taskDefinition.addOptionalPositionalParam("name", "another desc");
                });
            });
            it("should throw if addVariadicPositionalParam repeats a param name", function () {
                expectThrowParamAlreadyDefinedError(function () {
                    return taskDefinition.addVariadicPositionalParam("name", "another desc");
                });
            });
            it("should throw if addOptionalVariadicPositionalParam repeats a param name", function () {
                expectThrowParamAlreadyDefinedError(function () {
                    return taskDefinition.addOptionalVariadicPositionalParam("name", "another desc");
                });
            });
        });
        describe("param name clashes with polar's ones", function () {
            function testClashWith(name) {
                errors_1.expectPolarError(function () { return taskDefinition.addParam(name); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_CLASHES_WITH_POLAR_PARAM);
                errors_1.expectPolarError(function () { return taskDefinition.addOptionalParam(name); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_CLASHES_WITH_POLAR_PARAM);
                errors_1.expectPolarError(function () { return taskDefinition.addFlag(name); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_CLASHES_WITH_POLAR_PARAM);
                errors_1.expectPolarError(function () { return taskDefinition.addPositionalParam(name); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_CLASHES_WITH_POLAR_PARAM);
                errors_1.expectPolarError(function () { return taskDefinition.addOptionalPositionalParam(name); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_CLASHES_WITH_POLAR_PARAM);
                errors_1.expectPolarError(function () { return taskDefinition.addVariadicPositionalParam(name); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_CLASHES_WITH_POLAR_PARAM);
                errors_1.expectPolarError(function () { return taskDefinition.addOptionalVariadicPositionalParam(name); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_CLASHES_WITH_POLAR_PARAM);
            }
            it("Should throw if a param clashes", function () {
                // This is constructed to force a type error here if a polar arg is
                // added and not tested.
                var polarArgs = {
                    showStackTraces: true,
                    network: "",
                    version: false,
                    help: false,
                    verbose: false
                };
                Object.keys(polarArgs).forEach(function (name) { return testClashWith(name); });
            });
        });
        describe("positional param rules", function () {
            describe("no mandatory positional param after an optional one", function () {
                beforeEach("add optional positional", function () {
                    taskDefinition.addOptionalPositionalParam("asd");
                });
                it("throws when trying to add a new positional param", function () {
                    errors_1.expectPolarError(function () { return taskDefinition.addPositionalParam("asd2"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.MANDATORY_PARAM_AFTER_OPTIONAL);
                });
                it("throws when trying to add a new variadic positional param", function () {
                    errors_1.expectPolarError(function () { return taskDefinition.addVariadicPositionalParam("asd2"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.MANDATORY_PARAM_AFTER_OPTIONAL);
                });
                describe("should still accept non-positional ones", function () {
                    it("should accept a common param", function () {
                        taskDefinition.addParam("p");
                        chai_1.assert.notEqual(taskDefinition.paramDefinitions.p, undefined);
                    });
                    it("should accept an optional param", function () {
                        taskDefinition.addOptionalParam("p");
                        chai_1.assert.notEqual(taskDefinition.paramDefinitions.p, undefined);
                    });
                    it("should accept a flag", function () {
                        taskDefinition.addFlag("p");
                        chai_1.assert.notEqual(taskDefinition.paramDefinitions.p, undefined);
                    });
                });
            });
            describe("accepts multiple optional params", function () {
                beforeEach("add optional positional", function () {
                    taskDefinition.addOptionalPositionalParam("asd");
                });
                it("should accept an optional positional param", function () {
                    taskDefinition.addOptionalPositionalParam("asd2");
                    var last = getLastPositionalParam(taskDefinition);
                    chai_1.assert.equal(last.name, "asd2");
                    chai_1.assert.isTrue(last.isOptional);
                });
                it("should accept an optional variadic positional param", function () {
                    taskDefinition.addOptionalVariadicPositionalParam("asd2");
                    var last = getLastPositionalParam(taskDefinition);
                    chai_1.assert.equal(last.name, "asd2");
                    chai_1.assert.isTrue(last.isOptional);
                    chai_1.assert.isTrue(last.isVariadic);
                });
            });
            describe("no positional params after a variadic positional param", function () {
                beforeEach("add variadic param", function () {
                    taskDefinition.addVariadicPositionalParam("asd");
                });
                it("should throw on adding a positional param", function () {
                    errors_1.expectPolarError(function () { return taskDefinition.addPositionalParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_AFTER_VARIADIC);
                });
                it("should throw on adding an optional positional param", function () {
                    errors_1.expectPolarError(function () { return taskDefinition.addOptionalPositionalParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_AFTER_VARIADIC);
                });
                it("should throw on adding another variadic param", function () {
                    errors_1.expectPolarError(function () { return taskDefinition.addVariadicPositionalParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_AFTER_VARIADIC);
                });
                it("should throw on adding an optional variadic param", function () {
                    errors_1.expectPolarError(function () { return taskDefinition.addOptionalVariadicPositionalParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_AFTER_VARIADIC);
                });
                describe("should still accept non-positional ones", function () {
                    it("should accept a common param", function () {
                        taskDefinition.addParam("p");
                        chai_1.assert.notEqual(taskDefinition.paramDefinitions.p, undefined);
                    });
                    it("should accept an optional param", function () {
                        taskDefinition.addOptionalParam("p");
                        chai_1.assert.notEqual(taskDefinition.paramDefinitions.p, undefined);
                    });
                    it("should accept a flag", function () {
                        taskDefinition.addFlag("p");
                        chai_1.assert.notEqual(taskDefinition.paramDefinitions.p, undefined);
                    });
                });
            });
        });
    });
    describe("Setting params", function () {
        var taskDefinition;
        beforeEach("init taskDefinition", function () {
            taskDefinition = new task_definitions_1.SimpleTaskDefinition("name", true);
        });
        describe("addParam", function () {
            it("Should fail if the param name isn't camelCase", function () {
                errors_1.expectPolarError(function () { return taskDefinition.addParam("A"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING);
                errors_1.expectPolarError(function () { return taskDefinition.addParam("Aa"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING);
                errors_1.expectPolarError(function () { return taskDefinition.addParam("0"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING);
                errors_1.expectPolarError(function () { return taskDefinition.addParam("0a"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING);
                errors_1.expectPolarError(function () { return taskDefinition.addParam("a "); }, errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING);
                errors_1.expectPolarError(function () { return taskDefinition.addParam("a-1"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING);
                errors_1.expectPolarError(function () { return taskDefinition.addParam("a_"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING);
                errors_1.expectPolarError(function () { return taskDefinition.addParam("a_b"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.INVALID_PARAM_NAME_CASING);
            });
            it("should add the param correctly", function () {
                taskDefinition.addParam("p", "desc", 123, types.int, true);
                assertParamDefinition(taskDefinition.paramDefinitions.p, {
                    name: "p",
                    description: "desc",
                    defaultValue: 123,
                    type: types.int,
                    isOptional: true,
                    isVariadic: false,
                    isFlag: false
                });
            });
            it("should set isOptional if a default value is provided", function () {
                taskDefinition.addParam("p", "desc", 123, types.int);
                assertParamDefinition(taskDefinition.paramDefinitions.p, {
                    defaultValue: 123,
                    isOptional: true
                });
            });
            it("should accept an optional parm with undefined as default vlaue", function () {
                taskDefinition.addParam("p", "desc", undefined, types.int, true);
                assertParamDefinition(taskDefinition.paramDefinitions.p, {
                    defaultValue: undefined,
                    isOptional: true
                });
            });
            it("should use types.string as if non type is given", function () {
                taskDefinition.addParam("p");
                chai_1.assert.equal(taskDefinition.paramDefinitions.p.type, types.string);
            });
            it("should throw if a non-string default value is given but its type isn't set", function () {
                errors_1.expectPolarError(function () { return taskDefinition.addParam("p", "desc", 123); }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE);
            });
            it("should throw if a default value is set to a mandatory param", function () {
                errors_1.expectPolarError(function () { return taskDefinition.addParam("p", "desc", 123, types.int, false); }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_IN_MANDATORY_PARAM);
            });
        });
        describe("addOptionalParam", function () {
            it("should set the param correctly", function () {
                taskDefinition.addOptionalParam("p", "desc", 123, types.int);
                assertParamDefinition(taskDefinition.paramDefinitions.p, {
                    name: "p",
                    description: "desc",
                    defaultValue: 123,
                    type: types.int,
                    isOptional: true,
                    isVariadic: false,
                    isFlag: false
                });
            });
            it("should work with undefined as default value", function () {
                taskDefinition.addOptionalParam("p", "desc", undefined);
                assertParamDefinition(taskDefinition.paramDefinitions.p, {
                    defaultValue: undefined,
                    isOptional: true
                });
            });
            it("should use types.string as if non type is given", function () {
                taskDefinition.addOptionalParam("p");
                chai_1.assert.equal(taskDefinition.paramDefinitions.p.type, types.string);
            });
            it("should throw if a non-string default value is given but its type isn't set", function () {
                errors_1.expectPolarError(function () { return taskDefinition.addOptionalParam("p", "desc", 123); }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE);
            });
        });
        describe("addFlag", function () {
            it("should set an optional boolean param", function () {
                taskDefinition.addFlag("f", "d");
                assertParamDefinition(taskDefinition.paramDefinitions.f, {
                    name: "f",
                    description: "d",
                    defaultValue: false,
                    type: types.boolean,
                    isOptional: true,
                    isVariadic: false,
                    isFlag: true
                });
            });
        });
        describe("addPositionalParam", function () {
            it("shouldn't add the param definition to paramDefinitions", function () {
                taskDefinition.addPositionalParam("p", "desc");
                chai_1.assert.isUndefined(taskDefinition.paramDefinitions.p);
            });
            it("should add the param definition to positionalParamDefinitions", function () {
                taskDefinition.addPositionalParam("p", "desc", 123, types.int, true);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    name: "p",
                    description: "desc",
                    defaultValue: 123,
                    type: types.int,
                    isOptional: true,
                    isVariadic: false,
                    isFlag: false
                });
            });
            it("should work with undefined as default value", function () {
                taskDefinition.addPositionalParam("p", "desc", undefined, types.int, true);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    defaultValue: undefined,
                    isOptional: true
                });
            });
            it("should use types.string as if non type is given", function () {
                taskDefinition.addPositionalParam("p", "desc");
                var last = getLastPositionalParam(taskDefinition);
                chai_1.assert.equal(last.type, types.string);
            });
            it("should throw if a non-string default value is given but its type isn't set", function () {
                errors_1.expectPolarError(function () { return taskDefinition.addPositionalParam("p", "desc", 123); }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE);
            });
            it("should throw if a default value is set to a mandatory param", function () {
                errors_1.expectPolarError(function () {
                    return taskDefinition.addPositionalParam("p", "desc", 123, types.int, false);
                }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_IN_MANDATORY_PARAM);
            });
            it("should set isOptional if default value is provided", function () {
                taskDefinition.addPositionalParam("p", "desc", "A");
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    defaultValue: "A",
                    isOptional: true
                });
            });
        });
        describe("addOptionalPositionalParam", function () {
            it("shouldn't add the param definition to paramDefinitions", function () {
                taskDefinition.addOptionalPositionalParam("p", "desc");
                chai_1.assert.isUndefined(taskDefinition.paramDefinitions.p);
            });
            it("should add the param definition to positionalParamDefinitions", function () {
                taskDefinition.addOptionalPositionalParam("p", "desc", 123, types.int);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    name: "p",
                    description: "desc",
                    defaultValue: 123,
                    type: types.int,
                    isOptional: true,
                    isVariadic: false,
                    isFlag: false
                });
            });
            it("should work with undefined as default value", function () {
                taskDefinition.addOptionalPositionalParam("p", "desc", undefined, types.int);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    defaultValue: undefined,
                    isOptional: true
                });
            });
            it("should use types.string as if non type is given", function () {
                taskDefinition.addOptionalPositionalParam("p", "desc");
                var last = getLastPositionalParam(taskDefinition);
                chai_1.assert.equal(last.type, types.string);
            });
            it("should throw if a non-string default value is given but its type isn't set", function () {
                errors_1.expectPolarError(function () { return taskDefinition.addOptionalPositionalParam("p", "desc", 123); }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE);
            });
        });
        describe("addVariadicPositionalParam", function () {
            it("shouldn't add the param definition to paramDefinitions", function () {
                taskDefinition.addVariadicPositionalParam("p", "desc");
                chai_1.assert.isUndefined(taskDefinition.paramDefinitions.p);
            });
            it("should add the param definition to positionalParamDefinitions", function () {
                taskDefinition.addVariadicPositionalParam("p", "desc", [123], types.int, true);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    name: "p",
                    description: "desc",
                    defaultValue: [123],
                    type: types.int,
                    isOptional: true,
                    isVariadic: true,
                    isFlag: false
                });
            });
            it("should convert the default value into an array if necessary", function () {
                taskDefinition.addVariadicPositionalParam("p", "desc", 123, types.int, true);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    defaultValue: [123],
                    isVariadic: true
                });
            });
            it("should work with undefined as default value", function () {
                taskDefinition.addVariadicPositionalParam("p", "desc", undefined, types.int, true);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    defaultValue: undefined,
                    isOptional: true,
                    isVariadic: true
                });
            });
            it("should use types.string as if non type is given", function () {
                taskDefinition.addVariadicPositionalParam("p", "desc");
                var last = getLastPositionalParam(taskDefinition);
                chai_1.assert.equal(last.type, types.string);
            });
            it("should throw if a non-string default value is given but its type isn't set", function () {
                errors_1.expectPolarError(function () { return taskDefinition.addVariadicPositionalParam("p", "desc", 123); }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE);
                errors_1.expectPolarError(function () { return taskDefinition.addVariadicPositionalParam("p", "desc", [123]); }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE);
            });
            it("should throw if a default value is set to a mandatory param", function () {
                errors_1.expectPolarError(function () {
                    return taskDefinition.addVariadicPositionalParam("p", "desc", 123, types.int, false);
                }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_IN_MANDATORY_PARAM);
                errors_1.expectPolarError(function () {
                    return taskDefinition.addVariadicPositionalParam("p", "desc", [123], types.int, false);
                }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_IN_MANDATORY_PARAM);
            });
            it("should set isOptional if default value is provided", function () {
                taskDefinition.addVariadicPositionalParam("p", "desc", "A");
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    defaultValue: ["A"],
                    isOptional: true,
                    isVariadic: true
                });
            });
        });
        describe("addOptionalVariadicPositionalParam", function () {
            it("shouldn't add the param definition to paramDefinitions", function () {
                taskDefinition.addOptionalVariadicPositionalParam("p", "desc");
                chai_1.assert.isUndefined(taskDefinition.paramDefinitions.p);
            });
            it("should add the param definition to positionalParamDefinitions", function () {
                taskDefinition.addOptionalVariadicPositionalParam("p", "desc", [123], types.int);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    name: "p",
                    description: "desc",
                    defaultValue: [123],
                    type: types.int,
                    isOptional: true,
                    isVariadic: true,
                    isFlag: false
                });
            });
            it("should convert the default value into an array if necessary", function () {
                taskDefinition.addOptionalVariadicPositionalParam("p", "desc", 123, types.int);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    defaultValue: [123],
                    isVariadic: true
                });
            });
            it("should work with undefined as default value", function () {
                taskDefinition.addOptionalVariadicPositionalParam("p", "desc", undefined, types.int);
                assertParamDefinition(getLastPositionalParam(taskDefinition), {
                    defaultValue: undefined,
                    isOptional: true,
                    isVariadic: true
                });
            });
            it("should use types.string as if non type is given", function () {
                taskDefinition.addOptionalVariadicPositionalParam("p", "desc");
                var last = getLastPositionalParam(taskDefinition);
                chai_1.assert.equal(last.type, types.string);
            });
            it("should throw if a non-string default value is given but its type isn't set", function () {
                errors_1.expectPolarError(function () {
                    return taskDefinition.addOptionalVariadicPositionalParam("p", "desc", 123);
                }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE);
                errors_1.expectPolarError(function () {
                    return taskDefinition.addOptionalVariadicPositionalParam("p", "desc", [
                        123
                    ]);
                }, errors_list_1.ERRORS.TASK_DEFINITIONS.DEFAULT_VALUE_WRONG_TYPE);
            });
        });
    });
});
describe("OverriddenTaskDefinition", function () {
    var parentTask;
    var overriddenTask;
    beforeEach("init tasks", function () {
        parentTask = new task_definitions_1.SimpleTaskDefinition("t")
            .addParam("p", "desc")
            .addFlag("f")
            .addPositionalParam("pp", "positional param");
        overriddenTask = new task_definitions_1.OverriddenTaskDefinition(parentTask, true);
    });
    describe("construction", function () {
        it("should have the right name", function () {
            chai_1.assert.equal(overriddenTask.name, "t");
        });
        it("should set isInternal", function () {
            chai_1.assert.isTrue(overriddenTask.isInternal);
        });
        it("should set the parent task", function () {
            chai_1.assert.equal(overriddenTask.parentTaskDefinition, parentTask);
        });
    });
    describe("inherited properties", function () {
        it("should return the parent's name", function () {
            chai_1.assert.equal(overriddenTask.name, parentTask.name);
        });
        it("should return the parent's action", function () {
            chai_1.assert.equal(overriddenTask.action, parentTask.action);
        });
        it("should return the parent's description", function () {
            chai_1.assert.equal(overriddenTask.description, parentTask.description === undefined
                ? ""
                : parentTask.description);
        });
        it("should return the parent's param definitions", function () {
            chai_1.assert.equal(overriddenTask.paramDefinitions, parentTask.paramDefinitions);
        });
        it("should return the parent's positional param definitions", function () {
            chai_1.assert.equal(overriddenTask.positionalParamDefinitions, parentTask.positionalParamDefinitions);
        });
        it("should work with more than one level of chaining", function () {
            var overriddenAgain = new task_definitions_1.OverriddenTaskDefinition(overriddenTask, false);
            chai_1.assert.equal(overriddenAgain.isInternal, false);
            chai_1.assert.equal(overriddenAgain.name, parentTask.name);
            chai_1.assert.equal(overriddenAgain.action, parentTask.action);
            chai_1.assert.equal(overriddenAgain.description, parentTask.description === undefined
                ? ""
                : parentTask.description);
            chai_1.assert.equal(overriddenAgain.paramDefinitions, parentTask.paramDefinitions);
            chai_1.assert.equal(overriddenAgain.positionalParamDefinitions, parentTask.positionalParamDefinitions);
        });
        it("should return overridden actions", function () {
            chai_1.assert.equal(overriddenTask.action, parentTask.action);
            var action2 = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, 1];
            }); }); };
            overriddenTask.setAction(action2);
            chai_1.assert.equal(overriddenTask.action, action2);
            var action3 = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, 1];
            }); }); };
            overriddenTask.setAction(action3);
            chai_1.assert.equal(overriddenTask.action, action3);
            var overriddenAgain = new task_definitions_1.OverriddenTaskDefinition(overriddenTask);
            chai_1.assert.equal(overriddenAgain.action, action3);
            var action4 = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, 1];
            }); }); };
            overriddenAgain.setAction(action4);
            chai_1.assert.equal(overriddenTask.action, action3);
            chai_1.assert.equal(overriddenAgain.action, action4);
        });
        it("should return overridden descriptions", function () {
            chai_1.assert.equal(overriddenTask.description, parentTask.description === undefined
                ? ""
                : parentTask.description);
            overriddenTask.setDescription("d2");
            chai_1.assert.equal(overriddenTask.description, "d2");
            overriddenTask.setDescription("d3");
            chai_1.assert.equal(overriddenTask.description, "d3");
            var overriddenAgain = new task_definitions_1.OverriddenTaskDefinition(overriddenTask);
            chai_1.assert.equal(overriddenTask.description, "d3");
            overriddenAgain.setDescription("d4");
            chai_1.assert.equal(overriddenTask.description, "d3");
            chai_1.assert.equal(overriddenAgain.description, "d4");
        });
    });
    describe("Param definitions can be added only in compatible cases", function () {
        it("should add a flag param if addFlag is called", function () {
            overriddenTask.addFlag("flagParam", "flag in overriden task");
            assertParamDefinition(overriddenTask.paramDefinitions.flagParam, {
                name: "flagParam",
                description: "flag in overriden task",
                defaultValue: false,
                type: types.boolean,
                isOptional: true,
                isVariadic: false,
                isFlag: true
            });
        });
        it("should throw if adding a param of same name that was already defined in parent task", function () {
            var definedParamName = "f";
            // a param definition in an overridenTask is present in the parentTask ref as well
            chai_1.assert.isDefined(overriddenTask.paramDefinitions[definedParamName]);
            chai_1.assert.isDefined(parentTask.paramDefinitions[definedParamName]);
            // expect PARAM_ALREADY_DEFINED for add flag param
            errors_1.expectPolarError(function () { return overriddenTask.addFlag(definedParamName); }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_ALREADY_DEFINED);
            // expect PARAM_ALREADY_DEFINED for add optional param using addParam method
            errors_1.expectPolarError(function () {
                return overriddenTask.addParam(definedParamName, undefined, undefined, undefined, true);
            }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_ALREADY_DEFINED);
            // expect PARAM_ALREADY_DEFINED for add optional param using addParam method
            errors_1.expectPolarError(function () {
                return overriddenTask.addOptionalParam(definedParamName, undefined, undefined, undefined);
            }, errors_list_1.ERRORS.TASK_DEFINITIONS.PARAM_ALREADY_DEFINED);
        });
        it("should throw if addParam is called with isOptional = false", function () {
            errors_1.expectPolarError(function () { return overriddenTask.addParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_MANDATORY_PARAMS);
        });
        it("should add an optional param if addParam is called with isOptional = true", function () {
            var optParamName = "optParam";
            chai_1.assert.isUndefined(overriddenTask.paramDefinitions[optParamName], "");
            overriddenTask.addParam(optParamName, undefined, undefined, undefined, true);
            chai_1.assert.isDefined(overriddenTask.paramDefinitions[optParamName]);
        });
        it("should add an optional param if addOptionalParam is called", function () {
            var optParamName = "optParam";
            chai_1.assert.isUndefined(overriddenTask.paramDefinitions[optParamName], "");
            overriddenTask.addOptionalParam(optParamName);
            chai_1.assert.isDefined(overriddenTask.paramDefinitions[optParamName]);
        });
        it("should throw if addPositionalParam is called", function () {
            errors_1.expectPolarError(function () { return overriddenTask.addPositionalParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_POSITIONAL_PARAMS);
        });
        it("should throw if addOptionalPositionalParam is called", function () {
            errors_1.expectPolarError(function () { return overriddenTask.addOptionalPositionalParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_POSITIONAL_PARAMS);
        });
        it("should throw if addVariadicPositionalParam is called", function () {
            errors_1.expectPolarError(function () { return overriddenTask.addVariadicPositionalParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_VARIADIC_PARAMS);
        });
        it("should throw if addOptionalVariadicPositionalParam is called", function () {
            errors_1.expectPolarError(function () { return overriddenTask.addOptionalVariadicPositionalParam("p"); }, errors_list_1.ERRORS.TASK_DEFINITIONS.OVERRIDE_NO_VARIADIC_PARAMS);
        });
    });
});
