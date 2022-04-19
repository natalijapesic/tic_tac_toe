"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPolarContext = void 0;
/**
 * This function resets the polar context.
 *
 * This doesn't unload any loaded Polar plugin, so those have to be unloaded
 * manually with `unloadModule`.
 */
var context_1 = require("./context");
var project_structure_1 = require("./core/project-structure");
function resetPolarContext() {
    var e_1, _a;
    if (context_1.PolarContext.isCreated()) {
        var ctx = context_1.PolarContext.getPolarContext();
        var globalAsAny = global; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (ctx.environment !== undefined) {
            try {
                for (var _b = __values(Object.keys(ctx.environment)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    globalAsAny[key] = undefined;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // unload config file too.
            if (ctx.environment.config.paths != null) {
                unloadModule(ctx.environment.config.paths.configFile);
            }
        }
        else {
            // We may get here if loading the config has thrown, so be unload it
            var configPath = void 0;
            try {
                configPath = project_structure_1.getUserConfigPath();
            }
            catch (error) {
                // We weren't in a polar project
            }
            if (configPath !== undefined) {
                unloadModule(configPath);
            }
        }
        context_1.PolarContext.deletePolarContext();
    }
    // Unload all the polar's entry-points.
    unloadModule("../register");
    unloadModule("./cli/cli");
    unloadModule("./lib/lib");
}
exports.resetPolarContext = resetPolarContext;
function unloadModule(path) {
    try {
        delete require.cache[require.resolve(path)];
    }
    catch (err) {
        // module wasn't loaded
    }
}
