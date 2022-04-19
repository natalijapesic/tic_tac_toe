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
exports.readPackageJson = exports.loadPluginFile = exports.usePlugin = void 0;
var debug_1 = __importDefault(require("debug"));
var path = __importStar(require("path"));
var semver = __importStar(require("semver"));
var errors_1 = require("../core/errors");
var errors_list_1 = require("../core/errors-list");
var execution_mode_1 = require("./execution-mode");
var log = debug_1.default("polar:core:plugins");
/**
 * Validates a plugin dependencies and loads it.
 * @param pluginName - The plugin name
 * @param PolarContext - The PolarContext
 * @param from - Where to resolve plugins and dependencies from. Only for
 * testing purposes.
 */
function usePlugin(PolarContext, pluginName, from) {
    log("Loading plugin %s", pluginName);
    // We have a special case for `ExecutionMode.EXECUTION_MODE_LINKED`
    //
    // If polar is linked, a require without `from` would be executed in the
    // context of polar, and not find any plugin (linked or not). We workaround
    // this by using the CWD here.
    //
    // This is not ideal, but the only reason to link polar is testing.
    if (from === undefined &&
        execution_mode_1.getExecutionMode() === execution_mode_1.ExecutionMode.EXECUTION_MODE_LINKED) {
        from = process.cwd();
        log("polar is linked, searching for plugin starting from CWD", from);
    }
    var globalFlag = "";
    var globalWarning = "";
    if (execution_mode_1.getExecutionMode() === execution_mode_1.ExecutionMode.EXECUTION_MODE_GLOBAL_INSTALLATION) {
        globalFlag = " --global";
        globalWarning =
            "You are using a global installation of polar. Plugins and their dependencies must also be global.\n";
    }
    var pluginPackageJson = readPackageJson(pluginName, from);
    if (pluginPackageJson === undefined) {
        var installExtraFlags = globalFlag;
        throw new errors_1.PolarError(errors_list_1.ERRORS.PLUGINS.NOT_INSTALLED, {
            plugin: pluginName,
            extraMessage: globalWarning,
            extraFlags: installExtraFlags
        });
    }
    // We use the package.json's version of the name, as it is normalized.
    pluginName = pluginPackageJson.name;
    if (PolarContext.loadedPlugins.includes(pluginName)) {
        return;
    }
    if (pluginPackageJson.peerDependencies !== undefined) {
        checkPeerDependencies(pluginPackageJson.peerDependencies, pluginName, from, globalFlag, globalWarning);
    }
    var options = from !== undefined ? { paths: [from] } : undefined;
    var pluginPath = require.resolve(pluginName, options);
    loadPluginFile(pluginPath);
    PolarContext.setPluginAsLoaded(pluginName);
}
exports.usePlugin = usePlugin;
function checkPeerDependencies(deps, pluginName, from, flag, warning) {
    var e_1, _a;
    try {
        for (var _b = __values(Object.entries(deps)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), dependencyName = _d[0], versionSpec = _d[1];
            var dependencyPackageJson = readPackageJson(dependencyName, from);
            var installExtraFlags = flag;
            if (versionSpec.match(/^[0-9]/) !== null) {
                installExtraFlags += " --save-exact";
            }
            if (dependencyPackageJson === undefined) {
                throw new errors_1.PolarError(errors_list_1.ERRORS.PLUGINS.MISSING_DEPENDENCIES, {
                    plugin: pluginName,
                    dependency: dependencyName,
                    extraMessage: warning,
                    extraFlags: installExtraFlags,
                    versionSpec: versionSpec
                });
            }
            var installedVersion = dependencyPackageJson.version;
            if (!semver.satisfies(installedVersion, versionSpec, {
                includePrerelease: true
            })) {
                throw new errors_1.PolarError(errors_list_1.ERRORS.PLUGINS.DEPENDENCY_VERSION_MISMATCH, {
                    plugin: pluginName,
                    dependency: dependencyName,
                    extraMessage: warning,
                    extraFlags: installExtraFlags,
                    versionSpec: versionSpec,
                    installedVersion: installedVersion
                });
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function loadPluginFile(absolutePluginFilePath) {
    log("Loading plugin file %s", absolutePluginFilePath);
    var imported = require(absolutePluginFilePath); // eslint-disable-line @typescript-eslint/no-var-requires
    var plugin = imported.default !== undefined ? imported.default : imported;
    if (typeof plugin === "function") {
        plugin();
    }
}
exports.loadPluginFile = loadPluginFile;
function readPackageJson(packageName, from) {
    try {
        var options = from !== undefined ? { paths: [from] } : undefined;
        var packageJsonPath = require.resolve(path.join(packageName, "package.json"), options);
        return require(packageJsonPath);
    }
    catch (error) {
        return undefined;
    }
}
exports.readPackageJson = readPackageJson;
