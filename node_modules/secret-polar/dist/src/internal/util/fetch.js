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
exports.fetchRepository = exports.copyTemplatetoDestination = exports.setUpTempDirectory = void 0;
var chalk_1 = __importDefault(require("chalk"));
var download_git_repo_1 = __importDefault(require("download-git-repo"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var tmp_1 = __importDefault(require("tmp"));
var util_1 = require("util");
/**
 * Creates a temporary directory in /tmp to download templates
 * eg. tmp-86625-iMiAxZVeTy1U/templates
 */
function setUpTempDirectory() {
    return __awaiter(this, void 0, void 0, function () {
        var options, tmpDir;
        return __generator(this, function (_a) {
            options = {
                unsafeCleanup: true
            };
            try {
                tmpDir = tmp_1.default.dirSync(options);
                return [2 /*return*/, {
                        path: path_1.default.join(tmpDir.name, "templates"),
                        cleanupCallback: tmpDir.removeCallback
                    }];
            }
            catch (error) {
                console.error('Failed to initialize');
                throw error;
            }
            return [2 /*return*/];
        });
    });
}
exports.setUpTempDirectory = setUpTempDirectory;
/**
 * Creates a prompt for each overwriting file, and confirms overwrite.
 * if overwrite is confirmed the file is deleted
 * @param contentCollisions Colliding files
 * @param destination location to copy template from tempDir
 */
function promptOverwrites(contentCollisions, destination) {
    return __awaiter(this, void 0, void 0, function () {
        var enquirer, overwriteContents, response, contentCollisions_1, contentCollisions_1_1, file, overwriteToggle, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("enquirer")); })];
                case 1:
                    enquirer = (_b.sent()).default;
                    overwriteContents = [];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 9]);
                    contentCollisions_1 = __values(contentCollisions), contentCollisions_1_1 = contentCollisions_1.next();
                    _b.label = 3;
                case 3:
                    if (!!contentCollisions_1_1.done) return [3 /*break*/, 6];
                    file = contentCollisions_1_1.value;
                    console.log(chalk_1.default.yellow(file + " already exists in this directory.."));
                    overwriteToggle = [
                        {
                            type: "Toggle",
                            name: "overwrite",
                            message: "Overwrite " + file + "?",
                            enabled: 'Yes',
                            disabled: 'No'
                        }
                    ];
                    return [4 /*yield*/, enquirer.prompt(overwriteToggle)];
                case 4:
                    response = _b.sent();
                    if (response.overwrite) {
                        fs_extra_1.default.removeSync(destination + "/" + file);
                        overwriteContents.push(file);
                    }
                    _b.label = 5;
                case 5:
                    contentCollisions_1_1 = contentCollisions_1.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (contentCollisions_1_1 && !contentCollisions_1_1.done && (_a = contentCollisions_1.return)) _a.call(contentCollisions_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/, overwriteContents];
            }
        });
    });
}
/**
 * Copies template files from tempory directory to destination directory.
 * If --force is not used, user is asked by a promt to overwrite colliding files or not
 * @param tmpDir template directory to copy from
 * @param destination directory to copy template to
 * @param force if true, the colliding files are overwritten by default
 */
function copyTemplatetoDestination(tmpDir, destination, force) {
    return __awaiter(this, void 0, void 0, function () {
        var templateContents, destinationContents, newContents, contentCollisions, shouldCopy, overwriteContents, shouldCopy_1, shouldCopy_1_1, file;
        var e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fs_extra_1.default.ensureDirSync(destination);
                    templateContents = fs_extra_1.default.readdirSync(tmpDir);
                    destinationContents = fs_extra_1.default.readdirSync(destination);
                    newContents = templateContents.filter(function (filename) { return !destinationContents.includes(filename); });
                    contentCollisions = templateContents.filter(function (filename) {
                        return destinationContents.includes(filename);
                    });
                    if (!force) return [3 /*break*/, 1];
                    shouldCopy = templateContents;
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, promptOverwrites(contentCollisions, destination)];
                case 2:
                    overwriteContents = _b.sent();
                    shouldCopy = __spreadArray(__spreadArray([], __read(newContents)), __read(overwriteContents));
                    _b.label = 3;
                case 3:
                    try {
                        for (shouldCopy_1 = __values(shouldCopy), shouldCopy_1_1 = shouldCopy_1.next(); !shouldCopy_1_1.done; shouldCopy_1_1 = shouldCopy_1.next()) {
                            file = shouldCopy_1_1.value;
                            fs_extra_1.default.copySync(tmpDir + "/" + file, destination + "/" + file);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (shouldCopy_1_1 && !shouldCopy_1_1.done && (_a = shouldCopy_1.return)) _a.call(shouldCopy_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.copyTemplatetoDestination = copyTemplatetoDestination;
/**
 * Downloads repo from git url to destination path
 * @param url git url (<organization/repo>)
 * @param destination location to download repo
 */
function fetchRepository(url, destination) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    return [4 /*yield*/, util_1.promisify(download_git_repo_1.default)(url, destination)];
                case 1:
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Failed to initialize " + url);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchRepository = fetchRepository;
