"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDependencies = exports.createConfirmationPrompt = exports.createProject = exports.printSuggestedCommands = exports.printWelcomeMessage = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var contants_1 = require("../../lib/contants");
var errors_1 = require("../core/errors");
var errors_list_1 = require("../core/errors-list");
var execution_mode_1 = require("../core/execution-mode");
var packageInfo_1 = require("../util/packageInfo");
var initialize_template_1 = require("./initialize-template");
var SAMPLE_PROJECT_DEPENDENCIES = [
    "chai"
];
function printWelcomeMessage() {
    return __awaiter(this, void 0, void 0, function () {
        var packageJson;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, packageInfo_1.getPackageJson()];
                case 1:
                    packageJson = _a.sent();
                    console.log(chalk_1.default.cyan("\u2605 Welcome to " + contants_1.POLAR_NAME + " v" + packageJson.version));
                    return [2 /*return*/];
            }
        });
    });
}
exports.printWelcomeMessage = printWelcomeMessage;
function copySampleProject(projectName) {
    var packageRoot = packageInfo_1.getPackageRoot();
    var sampleProjDir = path_1.default.join(packageRoot, "sample-project");
    var currDir = process.cwd();
    var projectPath = path_1.default.join(currDir, projectName);
    console.log(chalk_1.default.greenBright("Initializing new project in " + projectPath + "."));
    fs_extra_1.default.copySync(sampleProjDir, projectPath, {
        // User doesn't choose the directory so overwrite should be avoided
        overwrite: false,
        filter: function (src, dest) {
            var relPath = path_1.default.relative(process.cwd(), dest);
            if (relPath === '') {
                return true;
            }
            if (path_1.default.basename(dest) === ".gitkeep") {
                return false;
            }
            if (fs_extra_1.default.pathExistsSync(dest)) {
                throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.INIT_INSIDE_PROJECT, {
                    clashingFile: relPath
                });
            }
            return true;
        }
    });
}
function printSuggestedCommands(projectName) {
    var currDir = process.cwd();
    var projectPath = path_1.default.join(currDir, projectName);
    console.log("Success! Created project at " + chalk_1.default.greenBright(projectPath) + ".");
    // TODO: console.log(`Inside that directory, you can run several commands:`);
    // list commands and respective description
    console.log("Begin by typing:");
    console.log("  cd " + projectName);
    console.log("  " + contants_1.POLAR_NAME + " help");
    console.log("  " + contants_1.POLAR_NAME + " compile");
}
exports.printSuggestedCommands = printSuggestedCommands;
function printPluginInstallationInstructions() {
    return __awaiter(this, void 0, void 0, function () {
        var cmd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("You need to install these dependencies to run the sample project:");
                    return [4 /*yield*/, npmInstallCmd()];
                case 1:
                    cmd = _a.sent();
                    console.log("  " + cmd.join(" "));
                    return [2 /*return*/];
            }
        });
    });
}
// eslint-disable-next-line
function createProject(projectName, templateName, destination) {
    return __awaiter(this, void 0, void 0, function () {
        var currDir, projectPath, shouldShowInstallationInstructions, installedRecommendedDeps, shouldInstall, installed;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(templateName !== undefined)) return [3 /*break*/, 2];
                    currDir = process.cwd();
                    projectPath = destination !== null && destination !== void 0 ? destination : path_1.default.join(currDir, projectName);
                    return [4 /*yield*/, initialize_template_1.initialize({
                            force: false,
                            projectName: projectName,
                            templateName: templateName,
                            destination: projectPath
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, printWelcomeMessage()];
                case 3:
                    _a.sent();
                    copySampleProject(projectName);
                    shouldShowInstallationInstructions = true;
                    return [4 /*yield*/, canInstallPlugin()];
                case 4:
                    if (!_a.sent()) return [3 /*break*/, 8];
                    installedRecommendedDeps = SAMPLE_PROJECT_DEPENDENCIES.filter(isInstalled);
                    if (!(installedRecommendedDeps.length === SAMPLE_PROJECT_DEPENDENCIES.length)) return [3 /*break*/, 5];
                    shouldShowInstallationInstructions = false;
                    return [3 /*break*/, 8];
                case 5:
                    if (!(installedRecommendedDeps.length === 0)) return [3 /*break*/, 8];
                    return [4 /*yield*/, confirmPluginInstallation()];
                case 6:
                    shouldInstall = _a.sent();
                    if (!shouldInstall) return [3 /*break*/, 8];
                    return [4 /*yield*/, installRecommendedDependencies()];
                case 7:
                    installed = _a.sent();
                    if (!installed) {
                        console.warn(chalk_1.default.red("Failed to install the sample project's dependencies"));
                    }
                    shouldShowInstallationInstructions = !installed;
                    _a.label = 8;
                case 8:
                    console.log("\n★", chalk_1.default.cyan("Project created"), "★\n");
                    if (!shouldShowInstallationInstructions) return [3 /*break*/, 10];
                    return [4 /*yield*/, printPluginInstallationInstructions()];
                case 9:
                    _a.sent();
                    console.log("");
                    _a.label = 10;
                case 10:
                    printSuggestedCommands(projectName);
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
function createConfirmationPrompt(name, message) {
    return {
        type: "confirm",
        name: name,
        message: message,
        initial: "y",
        default: "(Y/n)",
        isTrue: function (input) {
            if (typeof input === "string") {
                return input.toLowerCase() === "y";
            }
            return input;
        },
        isFalse: function (input) {
            if (typeof input === "string") {
                return input.toLowerCase() === "n";
            }
            return input;
        },
        format: function () {
            var that = this; // eslint-disable-line @typescript-eslint/no-explicit-any
            var value = that.value === true ? "y" : "n";
            if (that.state.submitted === true) {
                return that.styles.submitted(value);
            }
            return value;
        }
    };
}
exports.createConfirmationPrompt = createConfirmationPrompt;
function canInstallPlugin() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fs_extra_1.default.pathExists("package.json")];
                case 1: return [2 /*return*/, ((_a.sent()) &&
                        (execution_mode_1.getExecutionMode() === execution_mode_1.ExecutionMode.EXECUTION_MODE_LOCAL_INSTALLATION ||
                            execution_mode_1.getExecutionMode() === execution_mode_1.ExecutionMode.EXECUTION_MODE_LINKED) &&
                        // TODO: Figure out why this doesn't work on Win
                        os_1.default.type() !== "Windows_NT")];
            }
        });
    });
}
function isInstalled(dep) {
    var packageJson = fs_extra_1.default.readJSONSync("package.json");
    var allDependencies = __assign(__assign(__assign({}, packageJson.dependencies), packageJson.devDependencies), packageJson.optionalDependencies);
    return dep in allDependencies;
}
function isYarnProject() {
    return fs_extra_1.default.pathExistsSync("yarn.lock");
}
function installRecommendedDependencies() {
    return __awaiter(this, void 0, void 0, function () {
        var installCmd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("");
                    return [4 /*yield*/, npmInstallCmd()];
                case 1:
                    installCmd = _a.sent();
                    return [4 /*yield*/, installDependencies(installCmd[0], installCmd.slice(1))];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function confirmPluginInstallation() {
    return __awaiter(this, void 0, void 0, function () {
        var enquirer, responses, packageManager, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("enquirer")); })];
                case 1:
                    enquirer = (_a.sent()).default;
                    packageManager = isYarnProject() ? "yarn" : "npm";
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, enquirer.prompt([
                            createConfirmationPrompt("shouldInstallPlugin", "Do you want to install the sample project's dependencies with " + packageManager + " (" + SAMPLE_PROJECT_DEPENDENCIES.join(" ") + ")?")
                        ])];
                case 3:
                    responses = _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    if (e_1 === "") {
                        return [2 /*return*/, false];
                    }
                    throw e_1;
                case 5: return [2 /*return*/, responses.shouldInstallPlugin];
            }
        });
    });
}
function installDependencies(packageManager, args, location) {
    return __awaiter(this, void 0, void 0, function () {
        var spawn, childProcess;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("child_process")); })];
                case 1:
                    spawn = (_a.sent()).spawn;
                    console.log(packageManager + " " + args.join(" "));
                    childProcess = spawn(packageManager, args, {
                        stdio: "inherit",
                        cwd: location
                    });
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            childProcess.once("close", function (status) {
                                childProcess.removeAllListeners("error");
                                if (status === 0) {
                                    resolve(true);
                                    return;
                                }
                                reject(new Error("script process returned not 0 status"));
                            });
                            childProcess.once("error", function (status) {
                                childProcess.removeAllListeners("close");
                                reject(new Error("script process returned not 0 status"));
                            });
                        })];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.installDependencies = installDependencies;
function npmInstallCmd() {
    return __awaiter(this, void 0, void 0, function () {
        var isGlobal, cmd, npmInstall;
        return __generator(this, function (_a) {
            isGlobal = execution_mode_1.getExecutionMode() === execution_mode_1.ExecutionMode.EXECUTION_MODE_GLOBAL_INSTALLATION;
            if (isYarnProject()) {
                cmd = ["yarn"];
                if (isGlobal) {
                    cmd.push("global");
                }
                cmd.push.apply(cmd, __spreadArray(["add", "--dev"], __read(SAMPLE_PROJECT_DEPENDENCIES)));
                return [2 /*return*/, cmd];
            }
            npmInstall = ["npm", "install"];
            if (isGlobal) {
                npmInstall.push("--global");
            }
            return [2 /*return*/, __spreadArray(__spreadArray(__spreadArray([], __read(npmInstall)), ["--save-dev"]), __read(SAMPLE_PROJECT_DEPENDENCIES))];
        });
    });
}
