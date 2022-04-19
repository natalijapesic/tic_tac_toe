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
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectPolarErrorAsync = exports.expectPolarError = exports.expectErrorAsync = void 0;
var chai_1 = require("chai");
var errors_1 = require("../../src/internal/core/errors");
function expectErrorAsync(f, matchMessage) {
    return __awaiter(this, void 0, void 0, function () {
        var noError, message, notExactMatch, notRegexpMatch, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    noError = new chai_1.AssertionError("Async error was expected but no error was thrown");
                    message = "Async error should have had message \"" + String(matchMessage) + "\" but got \"";
                    notExactMatch = new chai_1.AssertionError(message);
                    notRegexpMatch = new chai_1.AssertionError(message);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, f()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    if (matchMessage === undefined) {
                        return [2 /*return*/];
                    }
                    if (typeof matchMessage === "string") {
                        if (err_1.message !== matchMessage) {
                            notExactMatch.message += String(err_1.message) + "\"";
                            throw notExactMatch; // eslint-disable-line @typescript-eslint/no-throw-literal
                        }
                    }
                    else {
                        if (matchMessage.exec(err_1.message) === null) {
                            notRegexpMatch.message += String(err_1.message) + "\"";
                            throw notRegexpMatch; // eslint-disable-line @typescript-eslint/no-throw-literal
                        }
                    }
                    return [2 /*return*/];
                case 4: throw noError; // eslint-disable-line @typescript-eslint/no-throw-literal
            }
        });
    });
}
exports.expectErrorAsync = expectErrorAsync;
function expectPolarError(f, errorDescriptor, matchMessage, errorMessage) {
    try {
        var returnValue = f();
        if (returnValue instanceof Promise) {
            throw new Error("Please use expectPolarErrorAsync() when working with async code");
        }
    }
    catch (error) {
        chai_1.assert.instanceOf(error, errors_1.PolarError, errorMessage);
        chai_1.assert.equal(error.number, errorDescriptor.number, errorMessage);
        chai_1.assert.notMatch(error.message, /%[a-zA-Z][a-zA-Z0-9]*%/, "PolarError has an non-replaced variable tag");
        if (typeof matchMessage === "string") {
            chai_1.assert.include(error.message, matchMessage, errorMessage);
        }
        else if (matchMessage !== undefined) {
            chai_1.assert.match(error.message, matchMessage, errorMessage);
        }
        return;
    }
    throw new chai_1.AssertionError(// eslint-disable-line @typescript-eslint/no-throw-literal
    "PolarError number " + errorDescriptor.number + " expected, but no Error was thrown");
}
exports.expectPolarError = expectPolarError;
function expectPolarErrorAsync(f, errorDescriptor, matchMessage) {
    return __awaiter(this, void 0, void 0, function () {
        var error, match, notExactMatch, notRegexpMatch, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = new chai_1.AssertionError("PolarError number " + errorDescriptor.number + " expected, but no Error was thrown");
                    match = String(matchMessage);
                    notExactMatch = new chai_1.AssertionError("PolarError was correct, but should have include \"" + match + "\" but got \"");
                    notRegexpMatch = new chai_1.AssertionError("PolarError was correct, but should have matched regex " + match + " but got \"");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, f()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    chai_1.assert.instanceOf(error_1, errors_1.PolarError);
                    chai_1.assert.equal(error_1.number, errorDescriptor.number);
                    chai_1.assert.notMatch(error_1.message, /%[a-zA-Z][a-zA-Z0-9]*%/, "PolarError has an non-replaced variable tag");
                    if (matchMessage !== undefined) {
                        if (typeof matchMessage === "string") {
                            if (!error_1.message.includes(matchMessage)) {
                                notExactMatch.message += "" + String(error_1.message);
                                throw notExactMatch; // eslint-disable-line @typescript-eslint/no-throw-literal
                            }
                        }
                        else {
                            if (matchMessage.exec(error_1.message) === null) {
                                notRegexpMatch.message += "" + String(error_1.message);
                                throw notRegexpMatch; // eslint-disable-line @typescript-eslint/no-throw-literal
                            }
                        }
                    }
                    return [2 /*return*/];
                case 4: throw error; // eslint-disable-line @typescript-eslint/no-throw-literal
            }
        });
    });
}
exports.expectPolarErrorAsync = expectPolarErrorAsync;
