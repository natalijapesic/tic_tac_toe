"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationErrors = exports.validateConfig = void 0;
var z = __importStar(require("zod"));
var zod_errors_1 = require("../../util/zod-errors");
var errors_1 = require("../errors");
var errors_list_1 = require("../errors-list");
var config_errors_1 = __importDefault(require("./config-errors"));
var AccountType = z.object({
    name: z.string(),
    address: z.string(),
    mnemonic: z.string()
});
var HttpNetworkType = z.object({
    accounts: z.array(AccountType).optional(),
    endpoint: z.string().optional(),
    nodeId: z.string().optional(),
    chainId: z.string().optional(),
    keyringBackend: z.string().optional()
}).nonstrict();
var NetworksType = z.record(HttpNetworkType);
var ProjectPaths = z.object({
    root: z.string().optional(),
    cache: z.string().optional(),
    artifacts: z.string().optional(),
    sources: z.string().optional(),
    tests: z.string().optional()
}).nonstrict();
var Config = z.object({
    networks: NetworksType.optional(),
    paths: ProjectPaths.optional()
}).nonstrict();
/**
 * Validates the config, throwing a BuilderError if invalid.
 * @param config
 */
function validateConfig(config) {
    var errors = getValidationErrors(config);
    if (errors.isEmpty()) {
        return;
    }
    var errorList = "  * " + errors.toString();
    throw new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.INVALID_CONFIG, { errors: errorList });
}
exports.validateConfig = validateConfig;
function getValidationErrors(config) {
    var e_1, _a;
    var errors = new config_errors_1.default();
    if (config !== undefined && typeof config.networks === "object") {
        try {
            for (var _b = __values(Object.entries(config.networks)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), net = _d[0], ncfg = _d[1];
                var accountsMap = new Map(); // {} as ([key: string]: number);
                var j = void 0;
                for (var i = 0; i < (ncfg.accounts || []).length; ++i) {
                    var a = ncfg.accounts[i];
                    var p = errors.putter(net + ".accounts", i.toString());
                    if (a.name === undefined) {
                        var errorMessage = "Account with index " + i + " does not have name specified";
                        p.push('name', errorMessage, 'string');
                    }
                    if (a.address === undefined) {
                        var errorMessage = "Account with index " + i + " does not have address specified";
                        p.push('address', errorMessage, 'string');
                    }
                    if (a.mnemonic === undefined) {
                        var errorMessage = "Account with index " + i + " does not have mnemonic specified";
                        p.push('mnemonic', errorMessage, 'string');
                    }
                    if ((j = accountsMap.get(a.name)) !== undefined) {
                        var errorMessage = "Account name " + String(a.name) + " already exists at index " + String(j);
                        p.push('name', errorMessage, 'string');
                    }
                    else {
                        accountsMap.set(a.name, i);
                    }
                }
                try {
                    HttpNetworkType.parse(ncfg);
                }
                catch (e) {
                    if (e instanceof z.ZodError) {
                        errors.appendErrors([zod_errors_1.parseZodError(e)]);
                    }
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
    }
    if (!errors.isEmpty()) {
        return errors;
    }
    try {
        Config.parse(config);
    }
    catch (e) {
        if (e instanceof z.ZodError) {
            errors.appendErrors([zod_errors_1.parseZodError(e)]);
        }
    }
    return errors;
}
exports.getValidationErrors = getValidationErrors;
// Reference: https://stackoverflow.com/questions/5717093
// eslint-disable-next-line
var exp = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '(localhost)|' + // localhost
    '((\\d{1,3}\\.){3}\\d{1,3}))'); // OR ip (v4) address
