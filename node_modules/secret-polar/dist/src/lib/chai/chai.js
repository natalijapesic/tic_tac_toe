"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polarChai = void 0;
require("./types");
var changeScrtBalance_1 = require("./matchers/changeScrtBalance");
var changeTokenBalance_1 = require("./matchers/changeTokenBalance");
var changeTokenBalances_1 = require("./matchers/changeTokenBalances");
var properAddress_1 = require("./matchers/properAddress");
var properHex_1 = require("./matchers/properHex");
var properSecretAddress_1 = require("./matchers/properSecretAddress");
var response_1 = require("./matchers/response");
var revert_1 = require("./matchers/revert");
var revertWith_1 = require("./matchers/revertWith");
function polarChai(chai, utils) {
    properHex_1.supportProperHex(chai.Assertion);
    properAddress_1.supportProperAddress(chai.Assertion);
    properSecretAddress_1.supportProperSecretAddress(chai.Assertion);
    changeScrtBalance_1.supportChangeScrtBalance(chai.Assertion);
    changeTokenBalance_1.supportChangeTokenBalance(chai.Assertion);
    changeTokenBalances_1.supportChangeTokenBalances(chai.Assertion);
    revert_1.supportReverted(chai.Assertion);
    revertWith_1.supportRevertedWith(chai.Assertion);
    response_1.supportResponse(chai.Assertion);
}
exports.polarChai = polarChai;
