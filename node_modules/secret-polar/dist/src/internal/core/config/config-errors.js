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
exports.ErrorPutter = exports.mkErrorMessage = void 0;
function stringify(v) {
    if (typeof v === "number" && !isFinite(v)) {
        if (isNaN(v)) {
            return "NaN";
        }
        return v > 0 ? "Infinity" : "-Infinity";
    }
    return JSON.stringify(v);
}
function mkErrorMessage(path, value, expectedType) {
    return "Invalid value " + stringify(value) + " for " + path + " - Expected a value of type " + expectedType + ".";
}
exports.mkErrorMessage = mkErrorMessage;
var CfgErrors = /** @class */ (function () {
    function CfgErrors(prefix) {
        if (prefix === void 0) { prefix = "config.networks"; }
        this.errors = [];
        this.prefix = prefix;
    }
    CfgErrors.prototype.push = function (net, field, val, expectedType) {
        this.errors.push(mkErrorMessage(this.prefix + "." + net + "." + field, val, expectedType));
    };
    CfgErrors.prototype.appendErrors = function (errors) {
        var e_1, _a;
        try {
            for (var errors_1 = __values(errors), errors_1_1 = errors_1.next(); !errors_1_1.done; errors_1_1 = errors_1.next()) {
                var e = errors_1_1.value;
                this.errors.push(e);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (errors_1_1 && !errors_1_1.done && (_a = errors_1.return)) _a.call(errors_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    CfgErrors.prototype.isEmpty = function () {
        return this.errors.length === 0;
    };
    CfgErrors.prototype.toString = function () {
        return this.errors.join("\n  * ");
    };
    CfgErrors.prototype.putter = function (net, field) {
        return new ErrorPutter(this, net, field);
    };
    return CfgErrors;
}());
exports.default = CfgErrors;
var ErrorPutter = /** @class */ (function () {
    function ErrorPutter(errs, net, field) {
        this.isEmpty = true;
        this.errs = errs;
        this.net = net;
        this.field = field;
    }
    // wraps CfgErrors.put and always returns false.
    ErrorPutter.prototype.push = function (field, val, expectedType) {
        if (field === "") {
            field = this.field;
        }
        else {
            field = this.field + "." + field;
        }
        this.errs.push(this.net, field, val, expectedType);
        this.isEmpty = false;
        return false;
    };
    return ErrorPutter;
}());
exports.ErrorPutter = ErrorPutter;
