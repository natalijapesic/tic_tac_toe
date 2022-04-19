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
var errors_list_1 = require("../../../../src/internal/core/errors-list");
var dsl_1 = require("../../../../src/internal/core/tasks/dsl");
var errors_1 = require("../../../helpers/errors");
describe("TasksDSL", function () {
    var dsl;
    beforeEach(function () {
        dsl = new dsl_1.TasksDSL();
    });
    it("should add a task", function () {
        var taskName = "compile";
        var description = "compiler task description";
        var action = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var task = dsl.task(taskName, description, action);
        chai_1.assert.equal(task.name, taskName);
        chai_1.assert.equal(task.description, description);
        chai_1.assert.equal(task.action, action);
        chai_1.assert.isFalse(task.isInternal);
    });
    it("should add an internal task", function () {
        var action = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var task = dsl.internalTask("compile", "compiler task description", action);
        chai_1.assert.isTrue(task.isInternal);
    });
    it("should add a task without description", function () {
        var action = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var task = dsl.task("compile", action);
        chai_1.assert.isUndefined(task.description);
        chai_1.assert.equal(task.action, action);
    });
    it("should add a task with default action", function () { return __awaiter(void 0, void 0, void 0, function () {
        var task, runSuperNop;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    task = dsl.task("compile", "a description");
                    chai_1.assert.isDefined(task.description);
                    chai_1.assert.isDefined(task.action);
                    runSuperNop = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/];
                    }); }); };
                    runSuperNop.isDefined = false;
                    return [4 /*yield*/, errors_1.expectPolarErrorAsync(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, task.action({}, {}, runSuperNop)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }, errors_list_1.ERRORS.TASK_DEFINITIONS.ACTION_NOT_SET)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should override task", function () {
        var action = function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); };
        var builtin = dsl.task("compile", "built-in", action);
        var tasks = dsl.getTaskDefinitions();
        chai_1.assert.equal(tasks.compile, builtin);
        var custom = dsl.task("compile", "custom", action);
        tasks = dsl.getTaskDefinitions();
        chai_1.assert.equal(tasks.compile, custom);
    });
    it("should return added tasks", function () {
        var task = dsl.task("compile", "built-in");
        var tasks = dsl.getTaskDefinitions();
        chai_1.assert.deepEqual(tasks, { compile: task });
    });
});
