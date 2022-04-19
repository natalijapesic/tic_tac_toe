"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var SCRT_CHAIN_NAME = "testnet";
var cfg = {
    accounts: [],
    endpoint: SCRT_CHAIN_NAME
};
var defaultConfig = {
    networks: (_a = {},
        _a[SCRT_CHAIN_NAME] = cfg,
        _a),
    mocha: {
        timeout: 20000
    }
};
exports.default = defaultConfig;
