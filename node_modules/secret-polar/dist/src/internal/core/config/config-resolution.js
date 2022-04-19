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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveProjectPaths = exports.resolveConfig = void 0;
var deepmerge_1 = __importDefault(require("deepmerge"));
var path = __importStar(require("path"));
var lang_1 = require("../../util/lang");
function mergeUserAndDefaultConfigs(defaultConfig, userConfig) {
    return deepmerge_1.default(defaultConfig, userConfig, {
        arrayMerge: function (destination, source) { return source; } // eslint-disable-line @typescript-eslint/no-explicit-any
    });
}
/**
 * This functions resolves the polar config by merging the user provided config
 * and the polar default config.
 *
 * @param userConfigPath the user config filepath
 * @param defaultConfig  the polar's default config object
 * @param userConfig     the user config object
 * @param configExtenders An array of ConfigExtenders
 *
 * @returns the resolved config
 */
function resolveConfig(userConfigPath, defaultConfig, userConfig, configExtenders) {
    var e_1, _a;
    var _b;
    var config = mergeUserAndDefaultConfigs(defaultConfig, userConfig);
    var paths = userConfigPath !== undefined
        ? resolveProjectPaths(userConfigPath, userConfig.paths)
        : undefined;
    var resolved = __assign(__assign({}, config), { paths: paths, networks: (_b = config.networks) !== null && _b !== void 0 ? _b : {} });
    try {
        for (var configExtenders_1 = __values(configExtenders), configExtenders_1_1 = configExtenders_1.next(); !configExtenders_1_1.done; configExtenders_1_1 = configExtenders_1.next()) {
            var extender = configExtenders_1_1.value;
            extender(resolved, userConfig);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (configExtenders_1_1 && !configExtenders_1_1.done && (_a = configExtenders_1.return)) _a.call(configExtenders_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return resolved;
}
exports.resolveConfig = resolveConfig;
function resolvePathFrom(from, defaultPath, relativeOrAbsolutePath) {
    if (relativeOrAbsolutePath === void 0) { relativeOrAbsolutePath = defaultPath; }
    if (path.isAbsolute(relativeOrAbsolutePath)) {
        return relativeOrAbsolutePath;
    }
    return path.join(from, relativeOrAbsolutePath);
}
/**
 * This function resolves the ProjectPaths object from the user-provided config
 * and its path. The logic of this is not obvious and should well be document.
 * The good thing is that most users will never use this.
 *
 * Explanation:
 *    - paths.configFile is not overridable
 *    - If a path is absolute it is used "as is".
 *    - If the root path is relative, it's resolved from paths.configFile's dir.
 *    - If any other path is relative, it's resolved from paths.root.
 */
function resolveProjectPaths(userConfigPath, userPaths) {
    if (userPaths === void 0) { userPaths = {}; }
    var configDir = path.dirname(userConfigPath);
    var root = resolvePathFrom(configDir, "", userPaths.root);
    var otherPathsEntries = Object.entries(userPaths).map(function (_a) {
        var _b = __read(_a, 2), name = _b[0], value = _b[1];
        return [name, resolvePathFrom(root, value)];
    });
    var otherPaths = lang_1.fromEntries(otherPathsEntries);
    return __assign(__assign({}, otherPaths), { root: root, configFile: userConfigPath, sources: resolvePathFrom(root, "contracts", userPaths.sources), cache: resolvePathFrom(root, "cache", userPaths.cache), artifacts: resolvePathFrom(root, "artifacts", userPaths.artifacts), tests: resolvePathFrom(root, "test", userPaths.tests) });
}
exports.resolveProjectPaths = resolveProjectPaths;
