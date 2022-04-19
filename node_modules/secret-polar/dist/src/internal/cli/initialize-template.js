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
exports.initialize = void 0;
var chalk_1 = __importDefault(require("chalk"));
var enquirer_1 = __importDefault(require("enquirer"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var fetch_1 = require("../util/fetch");
var project_creation_1 = require("./project-creation");
var TEMPLATES_GIT_REMOTE = 'arufa-research/polar-templates';
var DEFAULT_TEMPLATE = 'counter';
function isYarnProject(destination) {
    return fs_extra_1.default.existsSync(path_1.default.join(destination, "yarn.lock"));
}
/**
 * Confirm if user wants to install project dependencies in template directory
 * @param name Selected Dapp template name
 * @param destination location to initialize template
 */
function confirmDepInstallation(name, destination) {
    return __awaiter(this, void 0, void 0, function () {
        var enquirer, responses, packageManager, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("enquirer")); })];
                case 1:
                    enquirer = (_a.sent()).default;
                    packageManager = isYarnProject(destination) ? "yarn" : "npm";
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, enquirer.prompt([
                            project_creation_1.createConfirmationPrompt("shouldInstall", "Do you want to install template " + name + "'s dependencies with " + packageManager + " ?")
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
                case 5: return [2 /*return*/, responses.shouldInstall];
            }
        });
    });
}
/**
 * Checks if the destination directory is non-empty and confirm if the user
 * wants to proceed with the initializing, skips if --force is used.
 * @param destination location to initialize template
 * @param force true if --force flag is used
 */
function checkDir(destination, force) {
    return __awaiter(this, void 0, void 0, function () {
        var initDir, responses, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!force) return [3 /*break*/, 5];
                    initDir = fs_extra_1.default.readdirSync(destination);
                    responses = void 0;
                    if (!initDir.length) return [3 /*break*/, 5];
                    console.log("This directory is non-empty...");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, enquirer_1.default.prompt([
                            project_creation_1.createConfirmationPrompt("shouldProceedWithNonEmptyDir", "Do you want to proceed with the initialization?")
                        ])];
                case 2:
                    responses = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    if (e_2 === "") {
                        return [2 /*return*/];
                    }
                    throw e_2;
                case 4:
                    if (!responses.shouldProceedWithNonEmptyDir) {
                        console.log("Initialization cancelled");
                        process.exit();
                    }
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * Ensures that the template passed by user exists in arufa-research/polar-templates,
 * otherwise user can select a template from the existing templates or exit initialization
 * @param basePath path to temporary directory (contains all templates)
 * @param templateName template name passed by user (bare if no template name is passed)
 */
function checkTemplateExists(basePath, templateName) {
    return __awaiter(this, void 0, void 0, function () {
        var templatePath, prompt_1, response, dApps, dappsPrompt, selectedDapp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    templatePath = path_1.default.join(basePath, templateName);
                    if (!fs_extra_1.default.existsSync(templatePath)) return [3 /*break*/, 1];
                    return [2 /*return*/, [templatePath, templateName]];
                case 1:
                    console.log(chalk_1.default.red("Error occurred: template \"" + templateName + "\" does not exist in " + TEMPLATES_GIT_REMOTE));
                    prompt_1 = new enquirer_1.default.Select({
                        name: 'Select an option',
                        message: 'Do you want to pick an existing template or exit?',
                        choices: ['Pick an existing template', 'exit']
                    });
                    return [4 /*yield*/, prompt_1.run()];
                case 2:
                    response = _a.sent();
                    if (!(response === 'exit')) return [3 /*break*/, 3];
                    console.log("Initialization cancelled");
                    process.exit();
                    return [3 /*break*/, 5];
                case 3:
                    dApps = fs_extra_1.default.readdirSync(basePath, { withFileTypes: true })
                        .filter(function (dirent) { return dirent.isDirectory(); })
                        .map(function (dirent) { return dirent.name; });
                    dappsPrompt = new enquirer_1.default.Select({
                        name: 'dapps',
                        message: 'Pick a template',
                        choices: dApps
                    });
                    return [4 /*yield*/, dappsPrompt.run()];
                case 4:
                    selectedDapp = _a.sent();
                    return [2 /*return*/, [path_1.default.join(basePath, selectedDapp), selectedDapp]];
                case 5: return [2 /*return*/];
            }
        });
    });
}
/**
 * returns complete path (eg. "./" => current working directory)
 * @param destination base path
 */
function _normalizeDestination(destination) {
    var workingDirectory = process.cwd();
    if (!destination) {
        return workingDirectory;
    }
    if (path_1.default.isAbsolute(destination))
        return destination;
    return path_1.default.join(workingDirectory, destination);
}
/**
 * Initialize a template from 'arufa-research/polar-templates' with given name
 * and destination
 * @param force --force flag. If true then contents in destination directory are overwritten
 * @param templateName templateName to initialize from arufa-research/polar-templates.
 * @param destination destination directory to initialize template to.
 * Defaults to current working directory
 *  - If template name is not passed, the default template is initialized.
 *  - If template name passed is incorrect (template does not exist),
 *    then user is asked to initialize
 *    from one of the existing templates or exit initializing
 *  - If there are conflicting files while copying template,
 *    then user is asked to overwrite each file
 *     or not (if --force is not used).
 *  - If `--force` is used, then conflicting files are overwritten.
 */
function initialize(_a) {
    var force = _a.force, projectName = _a.projectName, templateName = _a.templateName, destination = _a.destination;
    return __awaiter(this, void 0, void 0, function () {
        var normalizedDestination, tempDir, tempDirPath, tempDirCleanup, templatePath, shouldInstallDependencies, packageManager, shouldShowInstallationInstructions, installed;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, project_creation_1.printWelcomeMessage()];
                case 1:
                    _c.sent();
                    normalizedDestination = _normalizeDestination(destination);
                    fs_extra_1.default.ensureDirSync(normalizedDestination);
                    return [4 /*yield*/, checkDir(normalizedDestination, force)];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, fetch_1.setUpTempDirectory()];
                case 3:
                    tempDir = _c.sent();
                    tempDirPath = tempDir.path;
                    tempDirCleanup = tempDir.cleanupCallback;
                    console.info("* Fetching templates from " + TEMPLATES_GIT_REMOTE + " *");
                    return [4 /*yield*/, fetch_1.fetchRepository(TEMPLATES_GIT_REMOTE, tempDirPath)];
                case 4:
                    _c.sent();
                    if (templateName === undefined) {
                        console.log("Template name not passed: using default template " + chalk_1.default.green(DEFAULT_TEMPLATE));
                        templateName = DEFAULT_TEMPLATE;
                    }
                    return [4 /*yield*/, checkTemplateExists(tempDirPath, templateName)];
                case 5:
                    _b = __read.apply(void 0, [_c.sent(), 2]), templatePath = _b[0], templateName = _b[1];
                    return [4 /*yield*/, fetch_1.copyTemplatetoDestination(templatePath, normalizedDestination, force)];
                case 6:
                    _c.sent();
                    tempDirCleanup(); // clean temporary directory
                    console.log(chalk_1.default.greenBright("\n\u2605 Template " + templateName + " initialized in " + normalizedDestination + " \u2605\n"));
                    return [4 /*yield*/, confirmDepInstallation(templateName, normalizedDestination)];
                case 7:
                    shouldInstallDependencies = _c.sent();
                    packageManager = isYarnProject(normalizedDestination) ? "yarn" : "npm";
                    if (!shouldInstallDependencies) return [3 /*break*/, 9];
                    return [4 /*yield*/, project_creation_1.installDependencies(packageManager, ['install'], normalizedDestination)];
                case 8:
                    installed = _c.sent();
                    if (!installed) {
                        console.warn(chalk_1.default.red("Failed to install the sample project's dependencies"));
                    }
                    shouldShowInstallationInstructions = !installed;
                    return [3 /*break*/, 10];
                case 9:
                    shouldShowInstallationInstructions = true;
                    _c.label = 10;
                case 10:
                    if (shouldShowInstallationInstructions) {
                        console.log(chalk_1.default.yellow("\nInstall your project dependencies using '" + packageManager + " install'"));
                    }
                    project_creation_1.printSuggestedCommands(projectName);
                    return [2 /*return*/];
            }
        });
    });
}
exports.initialize = initialize;
