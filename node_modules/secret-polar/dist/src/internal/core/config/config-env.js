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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlugin = exports.extendConfig = exports.extendEnvironment = exports.types = exports.internalTask = exports.task = void 0;
var context_1 = require("../../context");
var argumentTypes = __importStar(require("../params/argument-types"));
var plugins_1 = require("../plugins");
function task(name, descriptionOrAction, action) {
    var ctx = context_1.PolarContext.getPolarContext();
    var dsl = ctx.tasksDSL;
    if (descriptionOrAction === undefined) {
        return dsl.task(name);
    }
    if (typeof descriptionOrAction !== "string") {
        return dsl.task(name, descriptionOrAction);
    }
    return dsl.task(name, descriptionOrAction, action);
}
exports.task = task;
function internalTask(name, descriptionOrAction, action) {
    var ctx = context_1.PolarContext.getPolarContext();
    var dsl = ctx.tasksDSL;
    if (descriptionOrAction === undefined) {
        return dsl.internalTask(name);
    }
    if (typeof descriptionOrAction !== "string") {
        return dsl.internalTask(name, descriptionOrAction);
    }
    return dsl.internalTask(name, descriptionOrAction, action);
}
exports.internalTask = internalTask;
exports.types = argumentTypes;
/**
 * Register an environment extender what will be run after the
 * polar Runtime Environment is initialized.
 *
 * @param extender A function that receives the polar Runtime
 * Environment.
 */
function extendEnvironment(extender) {
    var ctx = context_1.PolarContext.getPolarContext();
    var extenderManager = ctx.extendersManager;
    extenderManager.add(extender);
}
exports.extendEnvironment = extendEnvironment;
function extendConfig(extender) {
    var ctx = context_1.PolarContext.getPolarContext();
    ctx.configExtenders.push(extender);
}
exports.extendConfig = extendConfig;
/**
 * Loads a polar plugin
 * @param pluginName The plugin name.
 */
function usePlugin(pluginName) {
    var ctx = context_1.PolarContext.getPolarContext();
    plugins_1.usePlugin(ctx, pluginName);
}
exports.usePlugin = usePlugin;
