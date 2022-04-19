"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var context_1 = require("../../internal/context");
var errors_1 = require("../../internal/core/errors");
var errors_list_1 = require("../../internal/core/errors-list");
var project_structure_1 = require("../../internal/core/project-structure");
var strings_1 = require("../../internal/util/strings");
var compress_1 = require("../../lib/deploy/compress");
var checkpoints_1 = require("../checkpoints");
var client_1 = require("../client");
var abi_1 = require("./abi");
function checkCallArgs(args, argNames, msgName) {
    var e_1, _a, e_2, _b;
    var validArgs = [];
    try {
        for (var argNames_1 = __values(argNames), argNames_1_1 = argNames_1.next(); !argNames_1_1.done; argNames_1_1 = argNames_1.next()) {
            var argName = argNames_1_1.value;
            validArgs.push(argName.name);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (argNames_1_1 && !argNames_1_1.done && (_a = argNames_1.return)) _a.call(argNames_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (args !== undefined) {
        var argKeys = Object.keys(args);
        try {
            // argKeys should be a subset of validArgs
            for (var argKeys_1 = __values(argKeys), argKeys_1_1 = argKeys_1.next(); !argKeys_1_1.done; argKeys_1_1 = argKeys_1.next()) {
                var key = argKeys_1_1.value;
                if (!(validArgs.includes(key))) {
                    console.error("Invalid " + msgName + " call. Argument '" + key + "' not an argument of '" + msgName + "' method");
                    return false;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (argKeys_1_1 && !argKeys_1_1.done && (_b = argKeys_1.return)) _b.call(argKeys_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return true;
}
function buildCall(contract, msgName, argNames) {
    return function (args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!checkCallArgs(args, argNames, msgName)) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, contract.queryMsg(msgName, args !== undefined ? args : {})];
                    case 1: 
                    // Query function
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
}
function buildSend(contract, msgName, argNames) {
    return function (_a, args) {
        var account = _a.account, transferAmount = _a.transferAmount, customFees = _a.customFees;
        return __awaiter(this, void 0, void 0, function () {
            var accountVal;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (transferAmount === []) {
                            transferAmount = undefined;
                        }
                        if (!checkCallArgs(args, argNames, msgName)) {
                            return [2 /*return*/];
                        }
                        accountVal = account.account !== undefined
                            ? account.account : account;
                        return [4 /*yield*/, contract.executeMsg(msgName, args !== undefined ? args : {}, accountVal, transferAmount, customFees)];
                    case 1: 
                    // Execute function (write)
                    return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
}
var Contract = /** @class */ (function () {
    function Contract(contractName, instance) {
        var e_3, _a, e_4, _b;
        var _c, _d, _e;
        this.responsePaths = [];
        this.responseAbis = [];
        this.env = context_1.PolarContext.getPolarContext().getRuntimeEnv();
        this.contractName = strings_1.replaceAll(contractName, '-', '_');
        this.codeId = 0;
        this.contractCodeHash = "mock_hash";
        this.contractAddress = "mock_address";
        this.contractPath = path_1.default.join(project_structure_1.ARTIFACTS_DIR, "contracts", this.contractName + "_compressed.wasm");
        this.initSchemaPath = path_1.default.join(project_structure_1.SCHEMA_DIR, this.contractName, "init_msg.json");
        this.querySchemaPath = path_1.default.join(project_structure_1.SCHEMA_DIR, this.contractName, "query_msg.json");
        this.executeSchemaPath = path_1.default.join(project_structure_1.SCHEMA_DIR, this.contractName, "handle_msg.json");
        try {
            for (var _f = __values(fs_extra_1.default.readdirSync(path_1.default.join(project_structure_1.SCHEMA_DIR, this.contractName))), _g = _f.next(); !_g.done; _g = _f.next()) {
                var file = _g.value;
                if (file.split('.')[0].split('_')[1] !== "response") { // *_response.json
                    continue;
                }
                this.responsePaths.push(path_1.default.join(project_structure_1.SCHEMA_DIR, this.contractName, file));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (!fs_extra_1.default.existsSync(this.initSchemaPath)) {
            console.log("Warning: Init schema not found for contract ", chalk_1.default.cyan(contractName));
        }
        if (!fs_extra_1.default.existsSync(this.querySchemaPath)) {
            console.log("Warning: Query schema not found for contract ", chalk_1.default.cyan(contractName));
        }
        if (!fs_extra_1.default.existsSync(this.executeSchemaPath)) {
            console.log("Warning: Execute schema not found for contract ", chalk_1.default.cyan(contractName));
        }
        var initSchemaJson = fs_extra_1.default.readJsonSync(this.initSchemaPath);
        var querySchemaJson = fs_extra_1.default.readJsonSync(this.querySchemaPath);
        var executeSchemaJson = fs_extra_1.default.readJsonSync(this.executeSchemaPath);
        this.initAbi = new abi_1.Abi(initSchemaJson);
        this.queryAbi = new abi_1.Abi(querySchemaJson);
        this.executeAbi = new abi_1.Abi(executeSchemaJson);
        try {
            for (var _h = __values(this.responsePaths), _j = _h.next(); !_j.done; _j = _h.next()) {
                var file = _j.value;
                var responseSchemaJson = fs_extra_1.default.readJSONSync(file);
                var responseAbi = new abi_1.Abi(responseSchemaJson);
                this.responseAbis.push(responseAbi);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this.query = {};
        this.tx = {};
        this.responses = {};
        // Load checkpoints
        this.checkpointPath = path_1.default.join(project_structure_1.ARTIFACTS_DIR, "checkpoints", this.contractName + (instance !== null && instance !== void 0 ? instance : "") + ".yaml");
        // For multiple instances
        var mainContract = path_1.default.join(project_structure_1.ARTIFACTS_DIR, "checkpoints", this.contractName + ".yaml");
        if (fs_extra_1.default.existsSync(mainContract)) {
            var data = checkpoints_1.loadCheckpoint(mainContract);
            delete data[this.env.network.name].instantiateInfo;
            checkpoints_1.persistCheckpoint(this.checkpointPath, data);
        }
        // file exist load it else create new checkpoint
        // skip checkpoints if test command is run, or skip-checkpoints is passed
        if (fs_extra_1.default.existsSync(this.checkpointPath) &&
            this.env.runtimeArgs.useCheckpoints === true) {
            this.checkpointData = checkpoints_1.loadCheckpoint(this.checkpointPath);
            var contractHash = (_c = this.checkpointData[this.env.network.name].deployInfo) === null || _c === void 0 ? void 0 : _c.contractCodeHash;
            var contractCodeId = (_d = this.checkpointData[this.env.network.name].deployInfo) === null || _d === void 0 ? void 0 : _d.codeId;
            var contractAddr = (_e = this.checkpointData[this.env.network.name].instantiateInfo) === null || _e === void 0 ? void 0 : _e.contractAddress;
            this.contractCodeHash = contractHash !== null && contractHash !== void 0 ? contractHash : "mock_hash";
            this.codeId = contractCodeId !== null && contractCodeId !== void 0 ? contractCodeId : 0;
            this.contractAddress = contractAddr !== null && contractAddr !== void 0 ? contractAddr : "mock_address";
        }
        else {
            this.checkpointData = {};
        }
        this.client = client_1.getClient(this.env.network);
    }
    Contract.prototype.parseSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, message, msgName, args, _c, _d, message, msgName, args;
            var e_5, _e, e_6, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        if (!fs_extra_1.default.existsSync(this.querySchemaPath)) {
                            throw new errors_1.PolarError(errors_list_1.ERRORS.ARTIFACTS.QUERY_SCHEMA_NOT_FOUND, {
                                param: this.contractName
                            });
                        }
                        if (!fs_extra_1.default.existsSync(this.executeSchemaPath)) {
                            throw new errors_1.PolarError(errors_list_1.ERRORS.ARTIFACTS.EXEC_SCHEMA_NOT_FOUND, {
                                param: this.contractName
                            });
                        }
                        return [4 /*yield*/, this.queryAbi.parseSchema()];
                    case 1:
                        _g.sent();
                        return [4 /*yield*/, this.executeAbi.parseSchema()];
                    case 2:
                        _g.sent();
                        try {
                            for (_a = __values(this.queryAbi.messages), _b = _a.next(); !_b.done; _b = _a.next()) {
                                message = _b.value;
                                msgName = message.identifier;
                                args = message.args;
                                if (this.query[msgName] == null) {
                                    this.query[msgName] = buildCall(this, msgName, args);
                                }
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        try {
                            for (_c = __values(this.executeAbi.messages), _d = _c.next(); !_d.done; _d = _c.next()) {
                                message = _d.value;
                                msgName = message.identifier;
                                args = message.args;
                                if (this.tx[msgName] == null) {
                                    this.tx[msgName] = buildSend(this, msgName, args);
                                }
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Contract.prototype.deploy = function (account, customFees) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var accountVal, info, wasmFileContent, signingClient, uploadReceipt, codeId, contractCodeHash, deployInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accountVal = account.account !== undefined
                            ? account.account : account;
                        info = (_a = this.checkpointData[this.env.network.name]) === null || _a === void 0 ? void 0 : _a.deployInfo;
                        if (info) {
                            console.log("Warning: contract already deployed, using checkpoints");
                            return [2 /*return*/, info];
                        }
                        return [4 /*yield*/, compress_1.compress(this.contractName)];
                    case 1:
                        _b.sent();
                        wasmFileContent = fs_extra_1.default.readFileSync(this.contractPath);
                        return [4 /*yield*/, client_1.getSigningClient(this.env.network, accountVal)];
                    case 2:
                        signingClient = _b.sent();
                        return [4 /*yield*/, signingClient.upload(wasmFileContent, {}, "upload " + this.contractName, customFees)];
                    case 3:
                        uploadReceipt = _b.sent();
                        codeId = uploadReceipt.codeId;
                        return [4 /*yield*/, signingClient.restClient.getCodeHashByCodeId(codeId)];
                    case 4:
                        contractCodeHash = _b.sent();
                        this.codeId = codeId;
                        deployInfo = {
                            codeId: codeId,
                            contractCodeHash: contractCodeHash,
                            deployTimestamp: String(new Date())
                        };
                        if (this.env.runtimeArgs.useCheckpoints === true) {
                            this.checkpointData[this.env.network.name] = __assign(__assign({}, this.checkpointData[this.env.network.name]), { deployInfo: deployInfo });
                            checkpoints_1.persistCheckpoint(this.checkpointPath, this.checkpointData);
                        }
                        this.contractCodeHash = contractCodeHash;
                        return [2 /*return*/, deployInfo];
                }
            });
        });
    };
    Contract.prototype.instantiatedWithAddress = function (address, timestamp) {
        var initTimestamp = (timestamp !== undefined) ? String(timestamp) : String(new Date());
        // contract address already exists
        if (this.contractAddress !== "mock_address") {
            console.log("Contract " + this.contractName + " already has address: " + this.contractAddress + ", skipping");
            return;
        }
        else {
            this.contractAddress = address;
        }
        var instantiateInfo = {
            contractAddress: address,
            instantiateTimestamp: initTimestamp
        };
        // set init data (contract address, init timestamp) in checkpoints
        this.checkpointData[this.env.network.name] = __assign(__assign({}, this.checkpointData[this.env.network.name]), { instantiateInfo: instantiateInfo });
        checkpoints_1.persistCheckpoint(this.checkpointPath, this.checkpointData);
    };
    Contract.prototype.instantiate = function (initArgs, label, account, transferAmount, customFees) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var accountVal, info, signingClient, initTimestamp, contract, instantiateInfo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accountVal = account.account !== undefined
                            ? account.account : account;
                        if (this.contractCodeHash === "mock_hash") {
                            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.CONTRACT_NOT_DEPLOYED, {
                                param: this.contractName
                            });
                        }
                        info = (_a = this.checkpointData[this.env.network.name]) === null || _a === void 0 ? void 0 : _a.instantiateInfo;
                        if (info) {
                            console.log("Warning: contract already instantiated, using checkpoints");
                            return [2 /*return*/, info];
                        }
                        return [4 /*yield*/, client_1.getSigningClient(this.env.network, accountVal)];
                    case 1:
                        signingClient = _b.sent();
                        initTimestamp = String(new Date());
                        label = (this.env.runtimeArgs.command === "test")
                            ? "deploy " + this.contractName + " " + initTimestamp : label;
                        console.log("Instantiating with label: " + label);
                        return [4 /*yield*/, signingClient.instantiate(this.codeId, initArgs, label, "init " + this.contractName, transferAmount, customFees)];
                    case 2:
                        contract = _b.sent();
                        this.contractAddress = contract.contractAddress;
                        instantiateInfo = {
                            contractAddress: this.contractAddress,
                            instantiateTimestamp: initTimestamp
                        };
                        if (this.env.runtimeArgs.useCheckpoints === true) {
                            this.checkpointData[this.env.network.name] = __assign(__assign({}, this.checkpointData[this.env.network.name]), { instantiateInfo: instantiateInfo });
                            checkpoints_1.persistCheckpoint(this.checkpointPath, this.checkpointData);
                        }
                        return [2 /*return*/, instantiateInfo];
                }
            });
        });
    };
    Contract.prototype.queryMsg = function (methodName, callArgs) {
        return __awaiter(this, void 0, void 0, function () {
            var msgData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.contractAddress === "mock_address") {
                            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.CONTRACT_NOT_INSTANTIATED, {
                                param: this.contractName
                            });
                        }
                        // Query the contract
                        console.log('Querying contract for', methodName);
                        msgData = {};
                        msgData[methodName] = callArgs;
                        console.log(this.contractAddress, msgData);
                        return [4 /*yield*/, this.client.queryContractSmart(this.contractAddress, msgData)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Contract.prototype.executeMsg = function (methodName, callArgs, account, transferAmount, customFees) {
        return __awaiter(this, void 0, void 0, function () {
            var accountVal, signingClient, msgData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountVal = account.account !== undefined
                            ? account.account : account;
                        if (this.contractAddress === "mock_address") {
                            throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.CONTRACT_NOT_INSTANTIATED, {
                                param: this.contractName
                            });
                        }
                        return [4 /*yield*/, client_1.getSigningClient(this.env.network, accountVal)];
                    case 1:
                        signingClient = _a.sent();
                        msgData = {};
                        msgData[methodName] = callArgs;
                        console.log(this.contractAddress, msgData);
                        return [4 /*yield*/, signingClient.execute(this.contractAddress, msgData, "execute handle " + this.contractName, transferAmount, customFees)];
                    case 2: 
                    // Send the same handleMsg to increment multiple times
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Contract;
}());
exports.Contract = Contract;
