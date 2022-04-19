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
exports.createArtifacts = exports.generateSchema = exports.compileContract = exports.readContractName = exports.compile = void 0;
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var errors_1 = require("../../internal/core/errors");
var errors_list_1 = require("../../internal/core/errors-list");
var project_structure_1 = require("../../internal/core/project-structure");
var strings_1 = require("../../internal/util/strings");
function compile(docker, sourceDir, force, skipSchema) {
    return __awaiter(this, void 0, void 0, function () {
        var contractDirs, toml, paths, contractNames, paths_1, paths_1_1, p, contractPath, val, contractDirs_1, contractDirs_1_1, dir, contractName;
        var e_1, _a, e_2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, project_structure_1.assertDir(project_structure_1.CACHE_DIR)];
                case 1:
                    _c.sent();
                    contractDirs = [];
                    toml = "Cargo.toml";
                    // Contract(s) path given
                    if (sourceDir.length > 0) {
                        contractDirs = sourceDir;
                    }
                    else {
                        paths = fs_1.readdirSync(project_structure_1.CONTRACTS_DIR);
                        // Only one contract in the contracts dir and compile in contracts dir only
                        if (paths.includes(toml)) {
                            contractDirs.push(project_structure_1.CONTRACTS_DIR);
                        }
                        else {
                            contractNames = new Set();
                            try {
                                for (paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                                    p = paths_1_1.value;
                                    contractPath = path_1.default.join(project_structure_1.CONTRACTS_DIR, path_1.default.basename(p));
                                    val = readContractName(path_1.default.join(contractPath, toml));
                                    // Check for similar contract names before compiling contracts.
                                    // For contract with same names raise an error.
                                    if (contractNames.has(val)) {
                                        throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.SAME_CONTRACT_NAMES, {
                                            val: val
                                        });
                                    }
                                    else {
                                        contractNames.add(readContractName(path_1.default.join(contractPath, toml)));
                                        contractDirs.push(contractPath);
                                    }
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                    }
                    try {
                        for (contractDirs_1 = __values(contractDirs), contractDirs_1_1 = contractDirs_1.next(); !contractDirs_1_1.done; contractDirs_1_1 = contractDirs_1.next()) {
                            dir = contractDirs_1_1.value;
                            compileContract(dir, docker);
                            if (!skipSchema) { // only generate schema if this flag is not passed
                                generateSchema(dir, docker);
                            }
                            contractName = readContractName(path_1.default.join(dir, toml));
                            createArtifacts(project_structure_1.TARGET_DIR, path_1.default.join(project_structure_1.SCHEMA_DIR, contractName), path_1.default.join(project_structure_1.ARTIFACTS_DIR, project_structure_1.CONTRACTS_DIR), path_1.default.join(dir, "schema"), docker, skipSchema);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (contractDirs_1_1 && !contractDirs_1_1.done && (_b = contractDirs_1.return)) _b.call(contractDirs_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.compile = compile;
function readContractName(tomlFilePath) {
    var tomlFileContent = fs_extra_1.default.readFileSync(tomlFilePath, 'utf-8');
    return strings_1.replaceAll(tomlFileContent.split('\n')[1].split("\"")[1], '-', '_');
}
exports.readContractName = readContractName;
function compileContract(contractDir, docker) {
    var currDir = process.cwd();
    process.chdir(contractDir);
    console.log("\uD83D\uDEE0 Compiling your contract in directory: " + chalk_1.default.gray(contractDir));
    console.log("===========================================");
    // Compiles the contract and creates .wasm file alongside others
    try {
        child_process_1.execSync("RUSTFLAGS='-C link-arg=-s' cargo build --release --target wasm32-unknown-unknown", { stdio: 'inherit' });
    }
    catch (error) {
        if (error instanceof Error) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.RUST_COMPILE_ERROR);
        }
        else {
            throw error;
        }
    }
    process.chdir(currDir);
}
exports.compileContract = compileContract;
function generateSchema(contractDir, docker) {
    var currDir = process.cwd();
    process.chdir(contractDir);
    console.log("Creating schema for contract in directory: " + chalk_1.default.gray(contractDir));
    // Creates schema .json files
    child_process_1.execSync("cargo run --example schema", { stdio: 'inherit' });
    process.chdir(currDir);
}
exports.generateSchema = generateSchema;
function createArtifacts(targetDir, schemaDir, artifactsDir, sourceSchemaDir, docker, skipSchema) {
    var e_3, _a, e_4, _b;
    var paths = fs_extra_1.default.readdirSync(targetDir);
    // create nested dirs if not present
    if (!fs_extra_1.default.existsSync(artifactsDir)) {
        fs_extra_1.default.mkdirSync(artifactsDir, { recursive: true });
    }
    if (!fs_extra_1.default.existsSync(schemaDir)) {
        fs_extra_1.default.mkdirSync(schemaDir, { recursive: true });
    }
    try {
        for (var paths_2 = __values(paths), paths_2_1 = paths_2.next(); !paths_2_1.done; paths_2_1 = paths_2.next()) {
            var p = paths_2_1.value;
            var filename = path_1.default.basename(p);
            if (filename.split('.')[filename.split('.').length - 1] !== "wasm") {
                continue;
            }
            console.log("Copying file " + filename + " from " + chalk_1.default.gray(targetDir) + " to " + chalk_1.default.gray(artifactsDir));
            var sourcePath = path_1.default.resolve(targetDir, filename);
            var destPath = path_1.default.resolve(artifactsDir, filename);
            fs_extra_1.default.copyFileSync(sourcePath, destPath);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (paths_2_1 && !paths_2_1.done && (_a = paths_2.return)) _a.call(paths_2);
        }
        finally { if (e_3) throw e_3.error; }
    }
    if (skipSchema) { // do not copy schema to artifacts as there is none
        return;
    }
    var schemaPaths = fs_extra_1.default.readdirSync(sourceSchemaDir);
    try {
        for (var schemaPaths_1 = __values(schemaPaths), schemaPaths_1_1 = schemaPaths_1.next(); !schemaPaths_1_1.done; schemaPaths_1_1 = schemaPaths_1.next()) {
            var p = schemaPaths_1_1.value;
            var filename = path_1.default.basename(p);
            if (filename.split('.')[filename.split('.').length - 1] !== "json") {
                continue;
            }
            console.log("Copying file " + filename + " from " + chalk_1.default.gray(sourceSchemaDir) + " to " + chalk_1.default.gray(schemaDir));
            var sourcePath = path_1.default.resolve(sourceSchemaDir, filename);
            var destPath = path_1.default.resolve(schemaDir, filename);
            fs_extra_1.default.copyFileSync(sourcePath, destPath);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (schemaPaths_1_1 && !schemaPaths_1_1.done && (_b = schemaPaths_1.return)) _b.call(schemaPaths_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
exports.createArtifacts = createArtifacts;
