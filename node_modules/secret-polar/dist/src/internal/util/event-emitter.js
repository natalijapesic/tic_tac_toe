"use strict";
/* eslint-disable @typescript-eslint/ban-types */
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitterWrapper = void 0;
// IMPORTANT NOTE: This class is type-checked against the currently installed
// version of @types/node (10.x atm), and manually checked to be compatible with
// Node.js up to 14.3.0 (the latest release atm). There's a test that ensures
// that we are exporting all the EventEmitter's members, but it can't check the
// actual types of those members if they are functions.
//
// If a new version of Node.js adds new members to EventEmitter or overloads
// existing ones this class has to be updated, even if it still type-checks.
// This is a serious limitation ot DefinitelyTyped when the original, un-typed,
// library can change because of the user having a different version.
var EventEmitterWrapper = /** @class */ (function () {
    function EventEmitterWrapper(_wrapped) {
        this._wrapped = _wrapped;
    }
    EventEmitterWrapper.prototype.addListener = function (event, 
    // eslint-disable-next-line
    listener) {
        this._wrapped.addListener(event, listener);
        return this;
    };
    // eslint-disable-next-line
    EventEmitterWrapper.prototype.on = function (event, listener) {
        this._wrapped.on(event, listener);
        return this;
    };
    EventEmitterWrapper.prototype.once = function (event, 
    // eslint-disable-next-line
    listener) {
        this._wrapped.once(event, listener);
        return this;
    };
    EventEmitterWrapper.prototype.prependListener = function (event, 
    // eslint-disable-next-line
    listener) {
        this._wrapped.prependListener(event, listener);
        return this;
    };
    EventEmitterWrapper.prototype.prependOnceListener = function (event, 
    // eslint-disable-next-line
    listener) {
        this._wrapped.prependOnceListener(event, listener);
        return this;
    };
    EventEmitterWrapper.prototype.removeListener = function (event, 
    // eslint-disable-next-line
    listener) {
        this._wrapped.removeListener(event, listener);
        return this;
    };
    // eslint-disable-next-line
    EventEmitterWrapper.prototype.off = function (event, listener) {
        this._wrapped.off(event, listener);
        return this;
    };
    EventEmitterWrapper.prototype.removeAllListeners = function (event) {
        this._wrapped.removeAllListeners(event);
        return this;
    };
    EventEmitterWrapper.prototype.setMaxListeners = function (n) {
        this._wrapped.setMaxListeners(n);
        return this;
    };
    EventEmitterWrapper.prototype.getMaxListeners = function () {
        return this._wrapped.getMaxListeners();
    };
    EventEmitterWrapper.prototype.listeners = function (event) {
        return this._wrapped.listeners(event);
    };
    EventEmitterWrapper.prototype.rawListeners = function (event) {
        return this._wrapped.rawListeners(event);
    };
    // eslint-disable-next-line
    EventEmitterWrapper.prototype.emit = function (event) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = this._wrapped).emit.apply(_a, __spreadArray([event], __read(args)));
    };
    EventEmitterWrapper.prototype.eventNames = function () {
        return this._wrapped.eventNames();
    };
    EventEmitterWrapper.prototype.listenerCount = function (type) {
        return this._wrapped.listenerCount(type);
    };
    return EventEmitterWrapper;
}());
exports.EventEmitterWrapper = EventEmitterWrapper;
