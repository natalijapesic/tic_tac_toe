"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var errors_list_1 = require("../../../../src/internal/core/errors-list");
var env_variables_1 = require("../../../../src/internal/core/params/env-variables");
var polar_params_1 = require("../../../../src/internal/core/params/polar-params");
var errors_1 = require("../../../helpers/errors");
describe("paramNameToEnvVariable", function () {
    it("should convert camelCase to UPPER_CASE and prepend POLAR_", function () {
        chai_1.assert.equal(env_variables_1.paramNameToEnvVariable("a"), "POLAR_A");
        chai_1.assert.equal(env_variables_1.paramNameToEnvVariable("B"), "POLAR_B");
        chai_1.assert.equal(env_variables_1.paramNameToEnvVariable("AC"), "POLAR_A_C");
        chai_1.assert.equal(env_variables_1.paramNameToEnvVariable("aC"), "POLAR_A_C");
        chai_1.assert.equal(env_variables_1.paramNameToEnvVariable("camelCaseRight"), "POLAR_CAMEL_CASE_RIGHT");
        chai_1.assert.equal(env_variables_1.paramNameToEnvVariable("somethingAB"), "POLAR_SOMETHING_A_B");
    });
});
describe("Env vars arguments parsing", function () {
    it("Should use the default values if arguments are not defined", function () {
        var args = env_variables_1.getEnvRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, {
            IRRELEVANT_ENV_VAR: "123"
        });
        chai_1.assert.equal(args.help, polar_params_1.POLAR_PARAM_DEFINITIONS.help.defaultValue);
        chai_1.assert.equal(args.network, polar_params_1.POLAR_PARAM_DEFINITIONS.network.defaultValue);
        chai_1.assert.equal(args.showStackTraces, polar_params_1.POLAR_PARAM_DEFINITIONS.showStackTraces.defaultValue);
        chai_1.assert.equal(args.version, polar_params_1.POLAR_PARAM_DEFINITIONS.version.defaultValue);
    });
    it("Should accept values", function () {
        var args = env_variables_1.getEnvRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, {
            IRRELEVANT_ENV_VAR: "123",
            POLAR_NETWORK: "asd",
            POLAR_SHOW_STACK_TRACES: "true",
            POLAR_VERSION: "true",
            POLAR_HELP: "true"
        });
        chai_1.assert.equal(args.network, "asd");
        // These are not really useful, but we test them anyway
        chai_1.assert.equal(args.showStackTraces, true);
        chai_1.assert.equal(args.version, true);
        chai_1.assert.equal(args.help, true);
    });
    it("should throw if an invalid value is passed", function () {
        errors_1.expectPolarError(function () {
            return env_variables_1.getEnvRuntimeArgs(polar_params_1.POLAR_PARAM_DEFINITIONS, {
                POLAR_HELP: "123"
            });
        }, errors_list_1.ERRORS.ARGUMENTS.INVALID_ENV_VAR_VALUE);
    });
});
describe("getEnvVariablesMap", function () {
    it("Should return the right map", function () {
        chai_1.assert.deepEqual(env_variables_1.getEnvVariablesMap({
            network: "asd",
            help: true,
            showStackTraces: true,
            version: false,
            verbose: true,
            config: undefined // config is optional
        }), {
            POLAR_NETWORK: "asd",
            POLAR_HELP: "true",
            POLAR_SHOW_STACK_TRACES: "true",
            POLAR_VERSION: "false",
            POLAR_VERBOSE: "true"
        });
    });
});
