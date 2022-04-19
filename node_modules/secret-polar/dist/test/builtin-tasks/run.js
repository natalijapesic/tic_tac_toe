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
var chai_1 = require("chai");
var fs_1 = __importDefault(require("fs"));
var task_names_1 = require("../../src/builtin-tasks/task-names");
var errors_list_1 = require("../../src/internal/core/errors-list");
var constants_1 = require("../helpers/constants");
var environment_1 = require("../helpers/environment");
var errors_1 = require("../helpers/errors");
var project_1 = require("../helpers/project");
var script1 = "scripts/1.js";
var script2 = "scripts/2.js";
describe("Run task", function () {
    project_1.useFixtureProject("project-with-scripts");
    environment_1.useEnvironment();
    it("Should fail if a script doesn't exist", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, errors_1.expectPolarErrorAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                                            scripts: ["./scripts/does-not-exist"]
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }, errors_list_1.ERRORS.BUILTIN_TASKS.RUN_FILES_NOT_FOUND, "./scripts/does-not-exist")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should run the scripts to completion", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                            scripts: ["./scripts/async-script.js"]
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
describe("Run task + clean", function () {
    project_1.useCleanFixtureProject("scripts-dir");
    environment_1.useEnvironment();
    it("Should allow to run multiple scripts", function () {
        return __awaiter(this, void 0, void 0, function () {
            var scriptOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                            scripts: [script2, script1]
                        })];
                    case 1:
                        _a.sent();
                        scriptOutput = fs_1.default.readFileSync(constants_1.testFixtureOutputFile).toString();
                        chai_1.assert.equal(scriptOutput, "scripts directory: script 2 executed\nscripts directory: script 1 executed\n");
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should fail if any nonexistent scripts are passed", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, errors_1.expectPolarErrorAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                                            scripts: [script1, script2, "scripts/3.js"]
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }, errors_list_1.ERRORS.BUILTIN_TASKS.RUN_FILES_NOT_FOUND, "scripts/3.js")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should return the script's status code on failure", function () {
        return __awaiter(this, void 0, void 0, function () {
            var scriptOutput;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, errors_1.expectPolarErrorAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                                            scripts: ["scripts/other-scripts/1.js",
                                                "scripts/other-scripts/failing.js", "scripts/1.js"]
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }, errors_list_1.ERRORS.BUILTIN_TASKS.RUN_SCRIPT_ERROR, "scripts/other-scripts/failing.js")];
                    case 1:
                        _a.sent();
                        scriptOutput = fs_1.default.readFileSync(constants_1.testFixtureOutputFile).toString();
                        chai_1.assert.equal(scriptOutput, "other scripts directory: script 1 executed\n");
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should allow to rerun successful scripts twice", function () {
        return __awaiter(this, void 0, void 0, function () {
            var scriptOutput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                            scripts: [script2, script1]
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                                scripts: [script1, script2]
                            })];
                    case 2:
                        _a.sent();
                        scriptOutput = fs_1.default.readFileSync(constants_1.testFixtureOutputFile).toString();
                        chai_1.assert.equal(scriptOutput, "scripts directory: script 2 executed\nscripts directory: script 1 executed\nscripts directory: script 1 executed\nscripts directory: script 2 executed\n");
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should not create a snapshot", function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                            scripts: [script2]
                        })];
                    case 1:
                        _a.sent();
                        chai_1.assert.isFalse(fs_1.default.existsSync("artifacts/scripts/2.js"));
                        return [2 /*return*/];
                }
            });
        });
    });
    it("Should not allow scripts outside of scripts dir", function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, errors_1.expectPolarErrorAsync(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.env.run(task_names_1.TASK_RUN, {
                                            scripts: ["1.js", script2, script1]
                                        })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); }, errors_list_1.ERRORS.BUILTIN_TASKS.SCRIPTS_OUTSIDE_SCRIPTS_DIRECTORY, "1.js")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    });
});
