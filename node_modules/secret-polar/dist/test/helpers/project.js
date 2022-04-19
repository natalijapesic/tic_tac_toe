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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCleanFixtureProject = exports.useFixtureProjectCopy = exports.getFixtureProjectPath = exports.useFixtureProject = void 0;
var fs = __importStar(require("fs"));
var fsExtra = __importStar(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var task_names_1 = require("../../src/builtin-tasks/task-names");
var constants_1 = require("./constants");
var environment_1 = require("./environment");
/**
 * This helper adds mocha hooks to run the tests inside one of the projects
 * from test/fixture-projects.
 *
 * @param projectName The base name of the folder with the project to use.
 */
function useFixtureProject(projectName) {
    var projectPath;
    var prevWorkingDir;
    before(function () {
        projectPath = getFixtureProjectPath(projectName);
        prevWorkingDir = process.cwd();
        process.chdir(projectPath);
    });
    after(function () {
        process.chdir(prevWorkingDir);
    });
}
exports.useFixtureProject = useFixtureProject;
function getFixtureProjectPath(projectName) {
    var projectPath = path_1.default.join(__dirname, "..", "fixture-projects", projectName);
    if (!fs.existsSync(projectPath)) {
        throw new Error("Fixture project " + projectName + " doesn't exist");
    }
    return fs.realpathSync(projectPath);
}
exports.getFixtureProjectPath = getFixtureProjectPath;
/**
 * Creates a fresh copy of a fixture project, and uses it for test (as `useFixtureProject`).
 * The copied project name is `projecName + "-tmp"`. If it already exists an exception
 * is thrown.
 */
function useFixtureProjectCopy(srcProjectName) {
    var project = srcProjectName + "-tmp";
    var srcProjectPath = getFixtureProjectPath(srcProjectName);
    var projectPath = path_1.default.join(srcProjectPath, "..", project);
    fsExtra.copySync(srcProjectPath, projectPath);
    useFixtureProject(project);
    after(function () { return fsExtra.removeSync(projectPath); });
}
exports.useFixtureProjectCopy = useFixtureProjectCopy;
/**
 * Allows tests to interact with a clean fixture project.
 * Allows to inspect the output file after running the test by cleaning before running.
 */
function useCleanFixtureProject(projectName) {
    var _this = this;
    useFixtureProject(projectName);
    environment_1.useEnvironment(function (polarEnv) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, polarEnv.run(task_names_1.TASK_CLEAN, {})];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); });
    beforeEach(function () {
        try {
            fs.unlinkSync(constants_1.testFixtureOutputFile);
        }
        catch (err) {
            // ignored
        }
    });
}
exports.useCleanFixtureProject = useCleanFixtureProject;
