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
var _a = require("secret-polar"), Contract = _a.Contract, getAccountByName = _a.getAccountByName, getLogs = _a.getLogs;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var contract_owner, contract, deploy_response, contract_info, inc_response, response, transferAmount, customFees, ex_response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contract_owner = getAccountByName("account_0");
                    contract = new Contract("sample-project");
                    return [4 /*yield*/, contract.parseSchema()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, contract.deploy(contract_owner, {
                            amount: [{ amount: "750000", denom: "uscrt" }],
                            gas: "3000000",
                        })];
                case 2:
                    deploy_response = _a.sent();
                    console.log(deploy_response);
                    return [4 /*yield*/, contract.instantiate({ "count": 102 }, "deploy test", contract_owner)];
                case 3:
                    contract_info = _a.sent();
                    console.log(contract_info);
                    return [4 /*yield*/, contract.tx.increment({ account: contract_owner })];
                case 4:
                    inc_response = _a.sent();
                    console.log(inc_response);
                    return [4 /*yield*/, contract.query.get_count()];
                case 5:
                    response = _a.sent();
                    console.log(response);
                    transferAmount = [{ "denom": "uscrt", "amount": "15000000" }] // 15 SCRT
                    ;
                    customFees = {
                        amount: [{ amount: "750000", denom: "uscrt" }],
                        gas: "3000000",
                    };
                    return [4 /*yield*/, contract.tx.increment({ account: contract_owner, transferAmount: transferAmount })];
                case 6:
                    ex_response = _a.sent();
                    // const ex_response = await contract.tx.increment(
                    //   {account: contract_owner, transferAmount: transferAmount, customFees: customFees}
                    // );
                    console.log(ex_response);
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = { default: run };
