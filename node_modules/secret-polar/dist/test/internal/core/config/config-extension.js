"use strict";
// extendConfig must be available
// extendConfig shouldn't let me modify th user config
// config extenders must run in order
// config extensions must be visible
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var context_1 = require("../../../../src/internal/context");
var reset_1 = require("../../../../src/internal/reset");
var environment_1 = require("../../../helpers/environment");
var project_1 = require("../../../helpers/project");
describe("Config extensions", function () {
    describe("Valid extenders", function () {
        project_1.useFixtureProject("config-extensions");
        environment_1.useEnvironment();
        it("Should expose the new values", function () {
            var config = this.env.config;
            chai_1.assert.isDefined(config.values);
        });
        it("Should execute extenders in order", function () {
            var config = this.env.config;
            chai_1.assert.deepEqual(config.values, [1, 2]);
        });
    });
    describe("Invalid extensions", function () {
        project_1.useFixtureProject("invalid-config-extension");
        beforeEach(function () {
            context_1.PolarContext.createPolarContext();
        });
        afterEach(function () {
            reset_1.resetPolarContext();
        });
    });
});
