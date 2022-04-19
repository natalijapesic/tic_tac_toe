"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertDirChildren = void 0;
var path_1 = __importDefault(require("path"));
var errors_1 = require("../internal/core/errors");
var errors_list_1 = require("../internal/core/errors-list");
function normalizePaths(mainPath, paths) {
    return paths.map(function (n) { return path_1.default.relative(mainPath, n); });
}
function assertDirChildren(dir, scriptNames) {
    var normalized = normalizePaths(".", scriptNames);
    var nonScriptPaths = normalized
        .filter(function (scriptName) { return !path_1.default.relative(".", scriptName).startsWith(dir); });
    if (nonScriptPaths.length !== 0) {
        throw new errors_1.PolarError(errors_list_1.ERRORS.BUILTIN_TASKS.SCRIPTS_OUTSIDE_SCRIPTS_DIRECTORY, {
            scripts: nonScriptPaths
        });
    }
    return normalized;
}
exports.assertDirChildren = assertDirChildren;
