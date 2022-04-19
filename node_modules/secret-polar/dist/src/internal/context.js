"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolarContext = void 0;
var extenders_1 = require("./core/config/extenders");
var errors_1 = require("./core/errors");
var errors_list_1 = require("./core/errors-list");
var dsl_1 = require("./core/tasks/dsl");
var PolarContext = /** @class */ (function () {
    function PolarContext() {
        this.tasksDSL = new dsl_1.TasksDSL();
        this.extendersManager = new extenders_1.ExtenderManager();
        this.loadedPlugins = [];
        this.configExtenders = [];
    }
    PolarContext.isCreated = function () {
        var globalWithPolarContext = global;
        return globalWithPolarContext.__polarContext !== undefined;
    };
    PolarContext.createPolarContext = function () {
        if (this.isCreated()) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.CONTEXT_ALREADY_CREATED);
        }
        var globalWithPolarContext = global;
        var ctx = new PolarContext();
        globalWithPolarContext.__polarContext = ctx;
        return ctx;
    };
    PolarContext.getPolarContext = function () {
        var globalWithPolarContext = global;
        var ctx = globalWithPolarContext.__polarContext;
        if (ctx === undefined) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.CONTEXT_NOT_CREATED);
        }
        return ctx;
    };
    PolarContext.deletePolarContext = function () {
        // eslint-disable-next-line
        var globalAsAny = global;
        globalAsAny.__polarContext = undefined;
    };
    PolarContext.prototype.setRuntimeEnv = function (env) {
        if (this.environment !== undefined) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.CONTEXT_PRE_ALREADY_DEFINED);
        }
        this.environment = env;
    };
    PolarContext.prototype.getRuntimeEnv = function () {
        if (this.environment === undefined) {
            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.CONTEXT_PRE_NOT_DEFINED);
        }
        return this.environment;
    };
    PolarContext.prototype.setPluginAsLoaded = function (pluginName) {
        this.loadedPlugins.push(pluginName);
    };
    return PolarContext;
}());
exports.PolarContext = PolarContext;
