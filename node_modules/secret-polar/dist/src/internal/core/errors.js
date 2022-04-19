"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.assertPolarInvariant = exports.applyErrorMessageTemplate = exports.PolarPluginError = exports.PolarError = void 0;
var caller_package_1 = require("../util/caller-package");
var strings_1 = require("../util/strings");
var errors_list_1 = require("./errors-list");
var PolarError = /** @class */ (function (_super) {
    __extends(PolarError, _super);
    function PolarError(errorDescriptor, messageArguments, // eslint-disable-line  @typescript-eslint/no-explicit-any
    parentError) {
        if (messageArguments === void 0) { messageArguments = {}; }
        var _this = this;
        var prefix = errors_list_1.getErrorCode(errorDescriptor) + ": ";
        var formattedMessage = applyErrorMessageTemplate(errorDescriptor.message, messageArguments);
        _this = _super.call(this, prefix + formattedMessage) || this;
        _this.errorDescriptor = errorDescriptor;
        _this.number = errorDescriptor.number;
        _this.messageArguments = messageArguments;
        if (parentError instanceof Error) {
            _this.parent = parentError;
        }
        _this._isPolarError = true;
        Object.setPrototypeOf(_this, PolarError.prototype);
        return _this;
    }
    PolarError.isPolarError = function (other) {
        return (other !== undefined && other !== null && other._isPolarError === true);
    };
    PolarError.isPolarErrorType = function (other, // eslint-disable-line  
    descriptor) {
        return (PolarError.isPolarError(other) &&
            other.errorDescriptor.number === descriptor.number);
    };
    return PolarError;
}(Error));
exports.PolarError = PolarError;
/**
 * This class is used to throw errors from polar plugins made by third parties.
 */
var PolarPluginError = /** @class */ (function (_super) {
    __extends(PolarPluginError, _super);
    function PolarPluginError(pluginNameOrMessage, messageOrParent, parent) {
        var _this = this;
        if (typeof messageOrParent === 'string') {
            _this = _super.call(this, messageOrParent) || this;
            _this.pluginName = pluginNameOrMessage;
            _this.parent = parent;
        }
        else {
            _this = _super.call(this, pluginNameOrMessage) || this;
            // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
            _this.pluginName = caller_package_1.getClosestCallerPackage();
            _this.parent = messageOrParent;
        }
        _this._isPolarPluginError = true;
        Object.setPrototypeOf(_this, PolarPluginError.prototype);
        return _this;
    }
    PolarPluginError.isPolarPluginError = function (other) {
        return (other !== undefined &&
            other !== null &&
            other._isPolarPluginError === true);
    };
    return PolarPluginError;
}(Error));
exports.PolarPluginError = PolarPluginError;
/**
 * This function applies error messages templates like this:
 *
 *  - Template is a string which contains a variable tags. A variable tag is a
 *    a variable name surrounded by %. Eg: %plugin1%
 *  - A variable name is a string of alphanumeric ascii characters.
 *  - Every variable tag is replaced by its value.
 *  - %% is replaced by %.
 *  - Values can't contain variable tags.
 *  - If a variable is not present in the template, but present in the values
 *    object, an error is thrown.
 *
 * @param template The template string.
 * @param values A map of variable names to their values.
 */
function applyErrorMessageTemplate(template, 
// eslint-disable-next-line
values) {
    return _applyErrorMessageTemplate(template, values);
}
exports.applyErrorMessageTemplate = applyErrorMessageTemplate;
/* eslint-disable sonarjs/cognitive-complexity */
function _applyErrorMessageTemplate(template, 
// eslint-disable-next-line
values) {
    var e_1, _a;
    if (template.includes('%%')) {
        return template
            .split('%%')
            .map(function (part) { return _applyErrorMessageTemplate(part, values); })
            .join('%');
    }
    try {
        for (var _b = __values(Object.keys(values)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var variableName = _c.value;
            var value = void 0;
            if (values[variableName] === undefined) {
                value = 'undefined';
            }
            else if (values[variableName] === null) {
                value = 'null';
            }
            else {
                value = values[variableName].toString();
            }
            if (value === undefined) {
                value = 'undefined';
            }
            var variableTag = "%" + variableName + "%";
            template = strings_1.replaceAll(template, variableTag, value);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return template;
}
function assertPolarInvariant(invariant, message) {
    if (!invariant) {
        throw new PolarError(errors_list_1.ERRORS.GENERAL.ASSERTION_ERROR, { message: message });
    }
}
exports.assertPolarInvariant = assertPolarInvariant;
