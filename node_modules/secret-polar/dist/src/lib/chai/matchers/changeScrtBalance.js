"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalanceChange = exports.supportChangeScrtBalance = void 0;
var chalk_1 = __importDefault(require("chalk"));
var context_1 = require("../../../internal/context");
var errors_1 = require("../../../internal/core/errors");
var errors_list_1 = require("../../../internal/core/errors-list");
var client_1 = require("../../client");
var contants_1 = require("../../contants");
function supportChangeScrtBalance(Assertion) {
    Assertion.addMethod('changeScrtBalance', function (// eslint-disable-line  @typescript-eslint/no-explicit-any
    account, balanceChange, includeFee, logResponse) {
        var _this = this;
        var subject = this._obj;
        if (account.account !== undefined) {
            account = account.account;
        }
        var accountAddr = account.address !== undefined
            ? account.address : account;
        var derivedPromise = Promise.all([
            getBalanceChange(subject, accountAddr, includeFee, logResponse)
        ]).then(function (_a) {
            var _b = __read(_a, 1), actualChange = _b[0];
            _this.assert(actualChange === balanceChange, "Expected \"" + accountAddr + "\" to change balance by " + balanceChange + " uscrt, " +
                ("but it has changed by " + actualChange + " uscrt"), "Expected \"" + accountAddr + "\" to not change balance by " + balanceChange + " uscrt,", balanceChange, actualChange);
        });
        this.then = derivedPromise.then.bind(derivedPromise);
        this.catch = derivedPromise.catch.bind(derivedPromise);
        this.promise = derivedPromise;
        return this;
    });
}
exports.supportChangeScrtBalance = supportChangeScrtBalance;
function extractScrtBalance(balances) {
    var e_1, _a;
    console.log(balances);
    try {
        for (var balances_1 = __values(balances), balances_1_1 = balances_1.next(); !balances_1_1.done; balances_1_1 = balances_1.next()) {
            var coin = balances_1_1.value;
            if (coin.denom === 'uscrt') {
                return Number(coin.amount);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (balances_1_1 && !balances_1_1.done && (_a = balances_1.return)) _a.call(balances_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return 0;
}
function getBalanceChange(// eslint-disable-line sonarjs/cognitive-complexity
transaction, // eslint-disable-line  @typescript-eslint/no-explicit-any
accountAddr, includeFee, logResponse) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var client, balanceBefore, _b, txResponse, txnEvents, msgEvent, txnEvents_1, txnEvents_1_1, event_1, msgEventKeys, _c, _d, attr, balanceAfter, _e, fees, _f, txnFees, _g, _h, _j, key, value;
        var e_2, _k, e_3, _l, e_4, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    if (typeof transaction !== 'function') {
                        throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.NOT_A_FUNCTION, {
                            param: transaction
                        });
                    }
                    client = client_1.getClient(context_1.PolarContext.getPolarContext().getRuntimeEnv().network);
                    _b = extractScrtBalance;
                    return [4 /*yield*/, client.getAccount(accountAddr)];
                case 1:
                    balanceBefore = _b.apply(void 0, [(_o.sent()).balance]);
                    return [4 /*yield*/, transaction()];
                case 2:
                    txResponse = _o.sent();
                    if (logResponse === true) {
                        console.log(chalk_1.default.green("Transaction response:") + " " + txResponse);
                    }
                    txnEvents = txResponse.logs[0].events;
                    try {
                        for (txnEvents_1 = __values(txnEvents), txnEvents_1_1 = txnEvents_1.next(); !txnEvents_1_1.done; txnEvents_1_1 = txnEvents_1.next()) {
                            event_1 = txnEvents_1_1.value;
                            if (event_1.type === 'message') {
                                msgEvent = event_1;
                                break;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (txnEvents_1_1 && !txnEvents_1_1.done && (_k = txnEvents_1.return)) _k.call(txnEvents_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    msgEventKeys = {};
                    try {
                        for (_c = __values(msgEvent.attributes), _d = _c.next(); !_d.done; _d = _c.next()) {
                            attr = _d.value;
                            msgEventKeys[attr.key] = attr.value;
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_l = _c.return)) _l.call(_c);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    _e = extractScrtBalance;
                    return [4 /*yield*/, client.getAccount(accountAddr)];
                case 3:
                    balanceAfter = _e.apply(void 0, [(_o.sent()).balance]);
                    fees = Object.assign(Object.assign({}, contants_1.defaultFees), ((_a = context_1.PolarContext.getPolarContext().getRuntimeEnv().network.config.fees) !== null && _a !== void 0 ? _a : {}));
                    _f = includeFee !== true;
                    if (!_f) return [3 /*break*/, 5];
                    return [4 /*yield*/, client.getAccount(accountAddr)];
                case 4:
                    _f = (_o.sent()).address === msgEventKeys.signer;
                    _o.label = 5;
                case 5:
                    if (!_f) return [3 /*break*/, 7];
                    return [4 /*yield*/, client.getAccount(accountAddr)];
                case 6:
                    if ((_o.sent()).address === msgEventKeys.signer) {
                        return [2 /*return*/, balanceAfter - balanceBefore];
                    }
                    else {
                        txnFees = 0;
                        try {
                            for (_g = __values(Object.entries(fees)), _h = _g.next(); !_h.done; _h = _g.next()) {
                                _j = __read(_h.value, 2), key = _j[0], value = _j[1];
                                if (key === msgEventKeys.action) {
                                    txnFees = Number(value);
                                    break;
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_m = _g.return)) _m.call(_g);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        return [2 /*return*/, balanceAfter + txnFees - balanceBefore];
                    }
                    return [3 /*break*/, 8];
                case 7: return [2 /*return*/, balanceBefore - balanceAfter];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.getBalanceChange = getBalanceChange;
