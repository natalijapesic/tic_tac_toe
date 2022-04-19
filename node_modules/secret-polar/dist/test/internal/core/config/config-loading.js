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
var path_1 = __importDefault(require("path"));
var task_names_1 = require("../../../../src/builtin-tasks/task-names");
var context_1 = require("../../../../src/internal/context");
var config_loading_1 = require("../../../../src/internal/core/config/config-loading");
var errors_list_1 = require("../../../../src/internal/core/errors-list");
var reset_1 = require("../../../../src/internal/reset");
var environment_1 = require("../../../helpers/environment");
var errors_1 = require("../../../helpers/errors");
var project_1 = require("../../../helpers/project");
var account_1 = require("../../../mocks/account");
describe("config loading", function () {
    describe("default config path", function () {
        project_1.useFixtureProject("config-project");
        environment_1.useEnvironment();
        it("should load the default config if none is given", function () {
            var a = this.env.config.networks;
            chai_1.assert.isDefined(a.localhost);
            chai_1.assert.deepEqual(a.localhost.accounts, [account_1.account]);
        });
    });
    describe("Config validation", function () {
        describe("When the config is invalid", function () {
            project_1.useFixtureProject("invalid-config");
            beforeEach(function () {
                context_1.PolarContext.createPolarContext();
            });
            afterEach(function () {
                reset_1.resetPolarContext();
            });
            it("Should throw the right error", function () {
                errors_1.expectPolarErrorAsync(function () { return config_loading_1.loadConfigAndTasks(); }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG).catch(function (err) { return console.log(err); });
            });
        });
    });
    describe("custom config path", function () {
        project_1.useFixtureProject("custom-config-file");
        beforeEach(function () {
            context_1.PolarContext.createPolarContext();
        });
        afterEach(function () {
            reset_1.resetPolarContext();
        });
        it("should accept a relative path from the CWD", function () {
            return __awaiter(this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, config_loading_1.loadConfigAndTasks({ config: "config.js" })];
                        case 1:
                            config = _a.sent();
                            if (!config.paths) {
                                chai_1.assert.fail("Project was not loaded");
                            }
                            chai_1.assert.equal(config.paths.configFile, path_1.default.normalize(path_1.default.join(process.cwd(), "config.js")));
                            return [2 /*return*/];
                    }
                });
            });
        });
        it("should accept an absolute path", function () {
            return __awaiter(this, void 0, void 0, function () {
                var fixtureDir, config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            fixtureDir = project_1.getFixtureProjectPath("custom-config-file");
                            return [4 /*yield*/, config_loading_1.loadConfigAndTasks({
                                    config: path_1.default.join(fixtureDir, "config.js")
                                })];
                        case 1:
                            config = _a.sent();
                            if (!config.paths) {
                                chai_1.assert.fail("Project was not loaded");
                            }
                            chai_1.assert.equal(config.paths.configFile, path_1.default.normalize(path_1.default.join(process.cwd(), "config.js")));
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
    describe("Tasks loading", function () {
        project_1.useFixtureProject("config-project");
        environment_1.useEnvironment();
        it("Should define the default tasks", function () {
            chai_1.assert.containsAllKeys(this.env.tasks, [
                task_names_1.TASK_CLEAN,
                task_names_1.TASK_INIT,
                task_names_1.TASK_HELP
            ]);
        });
        it("Should load custom tasks", function () {
            chai_1.assert.containsAllKeys(this.env.tasks, ["example"]);
        });
    });
    describe("Config env", function () {
        project_1.useFixtureProject("config-project");
        afterEach(function () {
            reset_1.resetPolarContext();
        });
        it("should remove everything from global state after loading", function () {
            return __awaiter(this, void 0, void 0, function () {
                var globalAsAny;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            globalAsAny = global;
                            context_1.PolarContext.createPolarContext();
                            return [4 /*yield*/, config_loading_1.loadConfigAndTasks()];
                        case 1:
                            _a.sent();
                            chai_1.assert.isUndefined(globalAsAny.internalTask);
                            chai_1.assert.isUndefined(globalAsAny.task);
                            chai_1.assert.isUndefined(globalAsAny.types);
                            chai_1.assert.isUndefined(globalAsAny.extendEnvironment);
                            chai_1.assert.isUndefined(globalAsAny.usePlugin);
                            reset_1.resetPolarContext();
                            context_1.PolarContext.createPolarContext();
                            return [4 /*yield*/, config_loading_1.loadConfigAndTasks()];
                        case 2:
                            _a.sent();
                            chai_1.assert.isUndefined(globalAsAny.internalTask);
                            chai_1.assert.isUndefined(globalAsAny.task);
                            chai_1.assert.isUndefined(globalAsAny.types);
                            chai_1.assert.isUndefined(globalAsAny.extendEnvironment);
                            chai_1.assert.isUndefined(globalAsAny.usePlugin);
                            reset_1.resetPolarContext();
                            return [2 /*return*/];
                    }
                });
            });
        });
    });
});
