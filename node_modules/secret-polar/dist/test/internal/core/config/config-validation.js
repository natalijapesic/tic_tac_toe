"use strict";
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
var chai_1 = require("chai");
var config_validation_1 = require("../../../../src/internal/core/config/config-validation");
var errors_list_1 = require("../../../../src/internal/core/errors-list");
var errors_1 = require("../../../helpers/errors");
var accountStatic = {
    name: "staticAccount",
    address: 'secret13kulyh3gnm5rzhz0plxrtdmx6g0tup3t3k7eke',
    mnemonic: "misery into cram ugly primary since describe crystal mother tackle slow source"
};
describe("Config validation", function () {
    describe("paths config", function () {
        var invalidPaths = [
            { paths: 123 },
            { paths: { cache: 123 } },
            { paths: { artifacts: 123 } },
            { paths: { sources: 123 } },
            { paths: { tests: 123 } },
            { paths: { root: 123 } }
        ];
        it("Should fail with invalid types (paths)", function () {
            var e_1, _a;
            var _loop_1 = function (cfg) {
                errors_1.expectPolarError(function () { return config_validation_1.validateConfig(cfg); }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG, undefined, JSON.stringify(cfg));
            };
            try {
                for (var invalidPaths_1 = __values(invalidPaths), invalidPaths_1_1 = invalidPaths_1.next(); !invalidPaths_1_1.done; invalidPaths_1_1 = invalidPaths_1.next()) {
                    var cfg = invalidPaths_1_1.value;
                    _loop_1(cfg);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (invalidPaths_1_1 && !invalidPaths_1_1.done && (_a = invalidPaths_1.return)) _a.call(invalidPaths_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
        it("Shouldn't fail with an empty paths config", function () {
            var errors = config_validation_1.getValidationErrors({ paths: {} });
            chai_1.assert.isTrue(errors.isEmpty());
            errors = config_validation_1.getValidationErrors({});
            chai_1.assert.isTrue(errors.isEmpty());
        });
        it("Shouldn't fail with valid paths configs", function () {
            var errors = config_validation_1.getValidationErrors({
                paths: {
                    root: "root",
                    cache: "cache",
                    artifacts: "artifacts",
                    sources: "sources",
                    tests: "tests"
                }
            });
            chai_1.assert.isTrue(errors.isEmpty());
        });
        it("Shouldn't fail with unrecognized params", function () {
            var errors = config_validation_1.getValidationErrors({
                paths: {
                    unrecognized: 123
                }
            });
            chai_1.assert.isTrue(errors.isEmpty());
        });
    });
    describe("networks config", function () {
        it("Should fail with duplicated account ", function () {
            var cfg = {
                networks: {
                    default: {
                        accounts: [accountStatic, accountStatic],
                        endpoint: "localhost"
                    }
                }
            };
            errors_1.expectPolarError(function () { return config_validation_1.validateConfig(cfg); }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG, "Account name " + accountStatic.name + " already exists at index 0");
        });
        describe("Invalid types", function () {
            describe("Networks object", function () {
                it("Should fail with invalid types (networks)", function () {
                    errors_1.expectPolarError(function () { return config_validation_1.validateConfig({ networks: 123 }); }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG);
                    errors_1.expectPolarError(function () {
                        return config_validation_1.validateConfig({
                            networks: {
                                asd: 123
                            }
                        });
                    }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG);
                });
            });
            describe("HTTP network config", function () {
                describe("Accounts field", function () {
                    it("Shouldn't work with invalid types", function () {
                        errors_1.expectPolarError(function () {
                            return config_validation_1.validateConfig({
                                networks: {
                                    asd: {
                                        accounts: 123,
                                        endpoint: "localhost"
                                    }
                                }
                            });
                        }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG);
                        errors_1.expectPolarError(function () {
                            return config_validation_1.validateConfig({
                                networks: {
                                    asd: {
                                        accounts: {},
                                        endpoint: "localhost"
                                    }
                                }
                            });
                        }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG);
                        errors_1.expectPolarError(function () {
                            return config_validation_1.validateConfig({
                                networks: {
                                    asd: {
                                        accounts: { asd: 123 },
                                        endpoint: "localhost"
                                    }
                                }
                            });
                        }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG);
                    });
                    describe("OtherAccountsConfig", function () {
                        it("Should fail with invalid types", function () {
                            errors_1.expectPolarError(function () {
                                return config_validation_1.validateConfig({
                                    networks: {
                                        asd: {
                                            accounts: {
                                                type: 123
                                            },
                                            endpoint: "localhost"
                                        }
                                    }
                                });
                            }, errors_list_1.ERRORS.GENERAL.INVALID_CONFIG);
                        });
                    });
                });
            });
        });
    });
});
