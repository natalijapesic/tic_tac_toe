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
exports.getAccountByName = exports.UserAccountI = void 0;
var context_1 = require("../internal/context");
var errors_1 = require("../internal/core/errors");
var errors_list_1 = require("../internal/core/errors-list");
var client_1 = require("./client");
var UserAccountI = /** @class */ (function () {
    function UserAccountI(account, env) {
        this.account = account;
        this.client = client_1.getClient(env.network);
    }
    UserAccountI.prototype.getAccountInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getAccount(this.account.address)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserAccountI.prototype.getBalance = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getAccount(this.account.address)];
                    case 1:
                        info = _a.sent();
                        if ((info === null || info === void 0 ? void 0 : info.balance) === undefined) {
                            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.BALANCE_UNDEFINED);
                        }
                        return [2 /*return*/, info === null || info === void 0 ? void 0 : info.balance];
                }
            });
        });
    };
    UserAccountI.prototype.getPublicKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getAccount(this.account.address)];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, info === null || info === void 0 ? void 0 : info.pubkey];
                }
            });
        });
    };
    UserAccountI.prototype.getAccountNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getAccount(this.account.address)];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, info === null || info === void 0 ? void 0 : info.accountNumber];
                }
            });
        });
    };
    UserAccountI.prototype.getSequence = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.getAccount(this.account.address)];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, info === null || info === void 0 ? void 0 : info.sequence];
                }
            });
        });
    };
    return UserAccountI;
}());
exports.UserAccountI = UserAccountI;
function getAccountByName(name) {
    var e_1, _a;
    var env = context_1.PolarContext.getPolarContext().getRuntimeEnv();
    if (env.network.config.accounts === undefined) {
        throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.ACCOUNT_DOES_NOT_EXIST, { name: name });
    }
    try {
        for (var _b = __values(env.network.config.accounts), _c = _b.next(); !_c.done; _c = _b.next()) {
            var value = _c.value;
            if (value.name === name) {
                return new UserAccountI(value, env);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.ACCOUNT_DOES_NOT_EXIST, { name: name });
}
exports.getAccountByName = getAccountByName;
