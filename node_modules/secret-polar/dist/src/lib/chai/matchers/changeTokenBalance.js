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
exports.getBalanceChange = exports.supportChangeTokenBalance = void 0;
var chalk_1 = __importDefault(require("chalk"));
var context_1 = require("../../../internal/context");
var errors_1 = require("../../../internal/core/errors");
var errors_list_1 = require("../../../internal/core/errors-list");
var client_1 = require("../../client");
function supportChangeTokenBalance(Assertion) {
    Assertion.addMethod('changeTokenBalance', function (// eslint-disable-line  @typescript-eslint/no-explicit-any
    account, token, balanceChange, logResponse) {
        var _this = this;
        var subject = this._obj;
        if (account.account !== undefined) {
            account = account.account;
        }
        var accountAddr = account.address !== undefined
            ? account.address : account;
        var derivedPromise = Promise.all([
            getBalanceChange(subject, accountAddr, token, logResponse)
        ]).then(function (_a) {
            var _b = __read(_a, 1), actualChange = _b[0];
            _this.assert(actualChange === balanceChange, "Expected \"" + accountAddr + "\" to change balance by " + balanceChange + " " + token + ", " +
                ("but it has changed by " + actualChange + " " + token), "Expected \"" + accountAddr + "\" to not change balance by " + balanceChange + " " + token + ",", balanceChange, actualChange);
        });
        this.then = derivedPromise.then.bind(derivedPromise);
        this.catch = derivedPromise.catch.bind(derivedPromise);
        this.promise = derivedPromise;
        return this;
    });
}
exports.supportChangeTokenBalance = supportChangeTokenBalance;
function extractTokenBalance(balances, denom) {
    var e_1, _a;
    try {
        for (var balances_1 = __values(balances), balances_1_1 = balances_1.next(); !balances_1_1.done; balances_1_1 = balances_1.next()) {
            var coin = balances_1_1.value;
            if (coin.denom === denom) {
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
function getBalanceChange(transaction, // eslint-disable-line  @typescript-eslint/no-explicit-any
accountAddr, token, logResponse) {
    return __awaiter(this, void 0, void 0, function () {
        var client, balanceBefore, _a, txResponse, balanceAfter, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (typeof transaction !== 'function') {
                        throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.NOT_A_FUNCTION, {
                            param: transaction
                        });
                    }
                    client = client_1.getClient(context_1.PolarContext.getPolarContext().getRuntimeEnv().network);
                    _a = extractTokenBalance;
                    return [4 /*yield*/, client.getAccount(accountAddr)];
                case 1:
                    balanceBefore = _a.apply(void 0, [(_c.sent()).balance,
                        token]);
                    return [4 /*yield*/, transaction()];
                case 2:
                    txResponse = _c.sent();
                    if (logResponse === true) {
                        console.log(chalk_1.default.green("Transaction response:") + " " + txResponse);
                    }
                    _b = extractTokenBalance;
                    return [4 /*yield*/, client.getAccount(accountAddr)];
                case 3:
                    balanceAfter = _b.apply(void 0, [(_c.sent()).balance,
                        token]);
                    return [2 /*return*/, (balanceBefore - balanceAfter)];
            }
        });
    });
}
exports.getBalanceChange = getBalanceChange;
