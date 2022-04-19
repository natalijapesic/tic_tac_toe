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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
var chai_1 = require("chai");
var errors_1 = require("../../../src/internal/core/errors");
var errors_list_1 = require("../../../src/internal/core/errors-list");
var unsafe_1 = require("../../../src/internal/util/unsafe");
var mockErrorDescriptor = {
    number: 123,
    message: "error message",
    title: "Mock error",
    description: "This is a mock error",
    shouldBeReported: false
};
describe("PolarError", function () {
    describe("Type guard", function () {
        it("Should return true for PolarErrors", function () {
            chai_1.assert.isTrue(errors_1.PolarError.isPolarError(new errors_1.PolarError(mockErrorDescriptor)));
        });
        it("Should return false for everything else", function () {
            chai_1.assert.isFalse(errors_1.PolarError.isPolarError(new Error()));
            chai_1.assert.isFalse(errors_1.PolarError.isPolarError(new errors_1.PolarPluginError("asd", "asd")));
            chai_1.assert.isFalse(errors_1.PolarError.isPolarError(undefined));
            chai_1.assert.isFalse(errors_1.PolarError.isPolarError(null));
            chai_1.assert.isFalse(errors_1.PolarError.isPolarError(123));
            chai_1.assert.isFalse(errors_1.PolarError.isPolarError("123"));
            chai_1.assert.isFalse(errors_1.PolarError.isPolarError({ asd: 123 }));
        });
    });
    describe("Without parent error", function () {
        it("should have the right error number", function () {
            var error = new errors_1.PolarError(mockErrorDescriptor);
            chai_1.assert.equal(error.number, mockErrorDescriptor.number);
        });
        it("should format the error code to 4 digits", function () {
            var error = new errors_1.PolarError(mockErrorDescriptor);
            chai_1.assert.equal(error.message.substr(0, 10), "PE123: err");
            chai_1.assert.equal(new errors_1.PolarError({
                number: 1,
                message: "",
                title: "Title",
                description: "Description",
                shouldBeReported: false
            }).message.substr(0, 8), "PE1: ");
        });
        it("should have the right error message", function () {
            var error = new errors_1.PolarError(mockErrorDescriptor);
            chai_1.assert.equal(error.message, "PE123: " + mockErrorDescriptor.message);
        });
        it("should format the error message with the template params", function () {
            var error = new errors_1.PolarError({
                number: 12,
                message: "%a% %b% %c%",
                title: "Title",
                description: "Description",
                shouldBeReported: false
            }, { a: "a", b: "b", c: 123 });
            chai_1.assert.equal(error.message, "PE12: a b 123");
        });
        it("shouldn't have a parent", function () {
            chai_1.assert.isUndefined(new errors_1.PolarError(mockErrorDescriptor).parent);
        });
        it("Should work with instanceof", function () {
            var error = new errors_1.PolarError(mockErrorDescriptor);
            chai_1.assert.instanceOf(error, errors_1.PolarError);
        });
    });
    describe("With parent error", function () {
        it("should have the right parent error", function () {
            var parent = new Error();
            var error = new errors_1.PolarError(mockErrorDescriptor, {}, parent);
            chai_1.assert.equal(error.parent, parent);
        });
        it("should format the error message with the template params", function () {
            var error = new errors_1.PolarError({
                number: 12,
                message: "%a% %b% %c%",
                title: "Title",
                description: "Description",
                shouldBeReported: false
            }, { a: "a", b: "b", c: 123 }, new Error());
            chai_1.assert.equal(error.message, "PE12: a b 123");
        });
        it("Should work with instanceof", function () {
            var parent = new Error();
            var error = new errors_1.PolarError(mockErrorDescriptor, {}, parent);
            chai_1.assert.instanceOf(error, errors_1.PolarError);
        });
    });
});
describe("Error ranges", function () {
    function inRange(n, min, max) {
        return n >= min && n <= max;
    }
    it("Should have max > min", function () {
        var e_1, _a;
        try {
            for (var _b = __values(unsafe_1.unsafeObjectKeys(errors_list_1.ERROR_RANGES)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var errorGroup = _c.value;
                var range = errors_list_1.ERROR_RANGES[errorGroup];
                chai_1.assert.isBelow(range.min, range.max, "Range of " + errorGroup + " is invalid");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    });
    it("Shouldn't overlap ranges", function () {
        var e_2, _a, e_3, _b;
        try {
            for (var _c = __values(unsafe_1.unsafeObjectKeys(errors_list_1.ERROR_RANGES)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var errorGroup = _d.value;
                var range = errors_list_1.ERROR_RANGES[errorGroup];
                try {
                    for (var _e = (e_3 = void 0, __values(unsafe_1.unsafeObjectKeys(errors_list_1.ERROR_RANGES))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var errorGroup2 = _f.value;
                        var range2 = errors_list_1.ERROR_RANGES[errorGroup2];
                        if (errorGroup === errorGroup2) {
                            continue;
                        }
                        chai_1.assert.isFalse(inRange(range2.min, range.min, range.max), "Ranges of " + errorGroup + " and " + errorGroup2 + " overlap");
                        chai_1.assert.isFalse(inRange(range2.max, range.min, range.max), "Ranges of " + errorGroup + " and " + errorGroup2 + " overlap");
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
    });
});
describe("Error descriptors", function () {
    it("Should have all errors inside their ranges", function () {
        var e_4, _a, e_5, _b;
        try {
            for (var _c = __values(unsafe_1.unsafeObjectKeys(errors_list_1.ERRORS)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var errorGroup = _d.value;
                var range = errors_list_1.ERROR_RANGES[errorGroup];
                try {
                    for (var _e = (e_5 = void 0, __values(Object.entries(errors_list_1.ERRORS[errorGroup]))), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var _g = __read(_f.value, 2), name_1 = _g[0], errorDescriptor = _g[1];
                        chai_1.assert.isAtLeast(errorDescriptor.number, range.min, "ERRORS." + errorGroup + "." + name_1 + "'s number is out of range");
                        chai_1.assert.isAtMost(errorDescriptor.number, range.max - 1, "ERRORS." + errorGroup + "." + name_1 + "'s number is out of range");
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_4) throw e_4.error; }
        }
    });
    it("Shouldn't repeat error numbers", function () {
        var e_6, _a, e_7, _b, e_8, _c;
        try {
            for (var _d = __values(unsafe_1.unsafeObjectKeys(errors_list_1.ERRORS)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var errorGroup = _e.value;
                try {
                    for (var _f = (e_7 = void 0, __values(Object.entries(errors_list_1.ERRORS[errorGroup]))), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var _h = __read(_g.value, 2), name_2 = _h[0], errorDescriptor = _h[1];
                        try {
                            for (var _j = (e_8 = void 0, __values(Object.entries(errors_list_1.ERRORS[errorGroup]))), _k = _j.next(); !_k.done; _k = _j.next()) {
                                var _l = __read(_k.value, 2), name2 = _l[0], errorDescriptor2 = _l[1];
                                if (name_2 !== name2) {
                                    chai_1.assert.notEqual(errorDescriptor.number, errorDescriptor2.number, "ERRORS." + errorGroup + "." + name_2 + " and " + errorGroup + "." + name2 + " have repeated numbers");
                                }
                            }
                        }
                        catch (e_8_1) { e_8 = { error: e_8_1 }; }
                        finally {
                            try {
                                if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                            }
                            finally { if (e_8) throw e_8.error; }
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_6) throw e_6.error; }
        }
    });
});
describe("PolarPluginError", function () {
    describe("Type guard", function () {
        it("Should return true for PolarPluginError", function () {
            chai_1.assert.isTrue(errors_1.PolarPluginError.isPolarPluginError(new errors_1.PolarPluginError("asd", "asd")));
        });
        it("Should return false for everything else", function () {
            chai_1.assert.isFalse(errors_1.PolarPluginError.isPolarPluginError(new Error()));
            chai_1.assert.isFalse(errors_1.PolarPluginError.isPolarPluginError(new errors_1.PolarError(errors_list_1.ERRORS.GENERAL.NOT_INSIDE_PROJECT)));
            chai_1.assert.isFalse(errors_1.PolarPluginError.isPolarPluginError(undefined));
            chai_1.assert.isFalse(errors_1.PolarPluginError.isPolarPluginError(null));
            chai_1.assert.isFalse(errors_1.PolarPluginError.isPolarPluginError(123));
            chai_1.assert.isFalse(errors_1.PolarPluginError.isPolarPluginError("123"));
            chai_1.assert.isFalse(errors_1.PolarPluginError.isPolarPluginError({ asd: 123 }));
        });
    });
    describe("constructors", function () {
        describe("automatic plugin name", function () {
            it("Should accept a parent error", function () {
                var message = "m";
                var parent = new Error();
                var error = new errors_1.PolarPluginError(message, parent);
                chai_1.assert.equal(error.message, message);
                chai_1.assert.equal(error.parent, parent);
            });
            it("Should work without a parent error", function () {
                var message = "m2";
                var error = new errors_1.PolarPluginError(message);
                chai_1.assert.equal(error.message, message);
                chai_1.assert.isUndefined(error.parent);
            });
            it("Should autodetect the plugin name", function () {
                var message = "m";
                var parent = new Error();
                var error = new errors_1.PolarPluginError(message, parent);
                // This is being called from mocha, so that would be used as plugin name
                chai_1.assert.equal(error.pluginName, "mocha");
            });
            it("Should work with instanceof", function () {
                var message = "m";
                var parent = new Error();
                var error = new errors_1.PolarPluginError(message, parent);
                chai_1.assert.instanceOf(error, errors_1.PolarPluginError);
            });
        });
        describe("explicit plugin name", function () {
            it("Should accept a parent error", function () {
                var plugin = "p";
                var message = "m";
                var parent = new Error();
                var error = new errors_1.PolarPluginError(plugin, message, parent);
                chai_1.assert.equal(error.pluginName, plugin);
                chai_1.assert.equal(error.message, message);
                chai_1.assert.equal(error.parent, parent);
            });
            it("Should work without a parent error", function () {
                var plugin = "p2";
                var message = "m2";
                var error = new errors_1.PolarPluginError(plugin, message);
                chai_1.assert.equal(error.pluginName, plugin);
                chai_1.assert.equal(error.message, message);
                chai_1.assert.isUndefined(error.parent);
            });
            it("Should work with instanceof", function () {
                var plugin = "p";
                var message = "m";
                var parent = new Error();
                var error = new errors_1.PolarPluginError(plugin, message, parent);
                chai_1.assert.instanceOf(error, errors_1.PolarPluginError);
            });
        });
    });
});
// describe("applyErrorMessageTemplate", () => {
//  describe("Variable names", () => {
//    it("Should reject invalid variable names", () => {
//      expectPolarError(
//        () => applyErrorMessageTemplate("", { "1": 1 }),
//        ERRORS.INTERNAL.TEMPLATE_INVALID_VARIABLE_NAME
//      );
//
//      expectPolarError(
//        () => applyErrorMessageTemplate("", { "asd%": 1 }),
//        ERRORS.INTERNAL.TEMPLATE_INVALID_VARIABLE_NAME
//      );
//
//      expectPolarError(
//        () => applyErrorMessageTemplate("", { "asd asd": 1 }),
//        ERRORS.INTERNAL.TEMPLATE_INVALID_VARIABLE_NAME
//      );
//    });
//  });
//
//  describe("Values", () => {
//    it("shouldn't contain valid variable tags", () => {
//      expectPolarError(
//        () => applyErrorMessageTemplate("%asd%", { asd: "%as%" }),
//        ERRORS.INTERNAL.TEMPLATE_VALUE_CONTAINS_VARIABLE_TAG
//      );
//
//      expectPolarError(
//        () => applyErrorMessageTemplate("%asd%", { asd: "%a123%" }),
//        ERRORS.INTERNAL.TEMPLATE_VALUE_CONTAINS_VARIABLE_TAG
//      );
//
//      expectPolarError(
//        () =>
//          applyErrorMessageTemplate("%asd%", {
//            asd: { toString: () => "%asd%" },
//          }),
//        ERRORS.INTERNAL.TEMPLATE_VALUE_CONTAINS_VARIABLE_TAG
//      );
//    });
//
//    it("Shouldn't contain the %% tag", () => {
//      expectPolarError(
//        () => applyErrorMessageTemplate("%asd%", { asd: "%%" }),
//        ERRORS.INTERNAL.TEMPLATE_VALUE_CONTAINS_VARIABLE_TAG
//      );
//    });
//  });
//
//  describe("Replacements", () => {
//    describe("String values", () => {
//      it("Should replace variable tags for the values", () => {
//        assert.equal(
//          applyErrorMessageTemplate("asd %asd% 123 %asd%", { asd: "r" }),
//          "asd r 123 r"
//        );
//
//        assert.equal(
//          applyErrorMessageTemplate("asd%asd% %asd% %fgh% 123", {
//            asd: "r",
//            fgh: "b",
//          }),
//          "asdr r b 123"
//        );
//
//        assert.equal(
//          applyErrorMessageTemplate("asd%asd% %asd% %fgh% 123", {
//            asd: "r",
//            fgh: "",
//          }),
//          "asdr r  123"
//        );
//      });
//    });
//
//    describe("Non-string values", () => {
//      it("Should replace undefined values for undefined", () => {
//        assert.equal(
//          applyErrorMessageTemplate("asd %asd% 123 %asd%", { asd: undefined }),
//          "asd undefined 123 undefined"
//        );
//      });
//
//      it("Should replace null values for null", () => {
//        assert.equal(
//          applyErrorMessageTemplate("asd %asd% 123 %asd%", { asd: null }),
//          "asd null 123 null"
//        );
//      });
//
//      it("Should use their toString methods", () => {
//        const toR = { toString: () => "r" };
//        const toB = { toString: () => "b" };
//        const toEmpty = { toString: () => "" };
//        const toUndefined = { toString: () => undefined };
//
//        assert.equal(
//          applyErrorMessageTemplate("asd %asd% 123 %asd%", { asd: toR }),
//          "asd r 123 r"
//        );
//
//        assert.equal(
//          applyErrorMessageTemplate("asd%asd% %asd% %fgh% 123", {
//            asd: toR,
//            fgh: toB,
//          }),
//          "asdr r b 123"
//        );
//
//        assert.equal(
//          applyErrorMessageTemplate("asd%asd% %asd% %fgh% 123", {
//            asd: toR,
//            fgh: toEmpty,
//          }),
//          "asdr r  123"
//        );
//
//        assert.equal(
//          applyErrorMessageTemplate("asd%asd% %asd% %fgh% 123", {
//            asd: toR,
//            fgh: toUndefined,
//          }),
//          "asdr r undefined 123"
//        );
//      });
//    });
//
//    describe("%% sign", () => {
//      it("Should be replaced with %", () => {
//        assert.equal(applyErrorMessageTemplate("asd%%asd", {}), "asd%asd");
//      });
//        assert.equal(
//          applyErrorMessageTemplate("asd%%asd%% %asd%", { asd: "123" }),
//          "asd%asd% 123"
//        );
//      });
//    });
//
//    describe("Missing variable tag", () => {
//      it("Should fail if a viable tag is missing and its value is not", () => {
//        expectPolarError(
//          () => applyErrorMessageTemplate("", { asd: "123" }),
//          ERRORS.INTERNAL.TEMPLATE_VARIABLE_TAG_MISSING
//        );
//      });
//    });
//
//    describe("Missing variable", () => {
//      it("Should work, leaving the variable tag", () => {
//        assert.equal(
//          applyErrorMessageTemplate("%asd% %fgh%", { asd: "123" }),
//          "123 %fgh%"
//        );
//      });
//    });
//  });
// });
