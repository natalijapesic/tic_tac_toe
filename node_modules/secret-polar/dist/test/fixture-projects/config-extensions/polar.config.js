"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_env_1 = require("../../../src/internal/core/config/config-env");
config_env_1.extendConfig(function (config, _userConfig) {
    config.values = [1];
});
config_env_1.extendConfig(function (config, _userConfig) {
    config.values.push(2);
});
module.exports = {};
