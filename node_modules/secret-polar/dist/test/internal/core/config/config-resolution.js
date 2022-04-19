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
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var path = __importStar(require("path"));
var context_1 = require("../../../../src/internal/context");
var config_loading_1 = require("../../../../src/internal/core/config/config-loading");
var config_resolution_1 = require("../../../../src/internal/core/config/config-resolution");
var reset_1 = require("../../../../src/internal/reset");
var project_1 = require("../../../helpers/project");
var account_1 = require("../../../mocks/account");
describe("Config resolution", function () {
    var _this = this;
    beforeEach(function () {
        context_1.PolarContext.createPolarContext();
    });
    afterEach(function () {
        reset_1.resetPolarContext();
    });
    describe("Default config merging", function () {
        describe("With custom config", function () {
            project_1.useFixtureProject("config-project");
            it("should return the config merged ", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, config_loading_1.loadConfigAndTasks()];
                        case 1:
                            config = _a.sent();
                            chai_1.assert.containsAllKeys(config.networks, ["localhost", "custom"]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should return the config merged ", function () { return __awaiter(_this, void 0, void 0, function () {
                var config, ncfg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, config_loading_1.loadConfigAndTasks()];
                        case 1:
                            config = _a.sent();
                            chai_1.assert.containsAllKeys(config.networks, ["localhost", "custom"]);
                            ncfg = config.networks.localhost;
                            chai_1.assert.equal(ncfg.endpoint, "http://127.0.0.1");
                            chai_1.assert.deepEqual(config.networks.localhost.accounts, [account_1.account]);
                            return [2 /*return*/];
                    }
                });
            }); });
            it("should keep any unknown field", function () { return __awaiter(_this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, config_loading_1.loadConfigAndTasks()];
                        case 1:
                            config = _a.sent();
                            chai_1.assert.deepEqual(config.unknown, { asd: 12 });
                            return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe("Paths resolution", function () {
        var cfg = {};
        it("Should return absolute paths", function () {
            var paths = config_resolution_1.resolveProjectPaths(__filename, cfg);
            var pathVals = Object.values(paths);
            pathVals.forEach(function (p) { return chai_1.assert.isTrue(path.isAbsolute(p)); });
        });
        it("Should use absolute paths 'as is'", function () {
            var paths = config_resolution_1.resolveProjectPaths(__filename, {
                root: "/root",
                sources: "/c",
                artifacts: "/a",
                cache: "/ca",
                tests: "/t"
            });
            chai_1.assert.equal(paths.root, "/root");
            chai_1.assert.equal(paths.sources, "/c");
            chai_1.assert.equal(paths.artifacts, "/a");
            chai_1.assert.equal(paths.cache, "/ca");
            chai_1.assert.equal(paths.tests, "/t");
        });
        it("Should resolve the root relative to the configFile", function () {
            var paths = config_resolution_1.resolveProjectPaths(__filename, {
                root: "blah"
            });
            chai_1.assert.equal(paths.root, path.join(__dirname, "blah"));
        });
        it("Should resolve the rest relative to the root", function () {
            var paths = config_resolution_1.resolveProjectPaths(__filename, {
                root: "blah",
                sources: "c",
                artifacts: "a",
                cache: "ca",
                tests: "t"
            });
            var root = path.join(__dirname, "blah");
            chai_1.assert.equal(paths.root, root);
            chai_1.assert.equal(paths.sources, path.join(root, "c"));
            chai_1.assert.equal(paths.artifacts, path.join(root, "a"));
            chai_1.assert.equal(paths.cache, path.join(root, "ca"));
            chai_1.assert.equal(paths.tests, path.join(root, "t"));
        });
        it("Should have the right default values", function () {
            var paths = config_resolution_1.resolveProjectPaths(__filename);
            chai_1.assert.equal(paths.root, __dirname);
            chai_1.assert.equal(paths.sources, path.join(__dirname, "contracts"));
            chai_1.assert.equal(paths.artifacts, path.join(__dirname, "artifacts"));
            chai_1.assert.equal(paths.cache, path.join(__dirname, "cache"));
            chai_1.assert.equal(paths.tests, path.join(__dirname, "test"));
        });
    });
});
