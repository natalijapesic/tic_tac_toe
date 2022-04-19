"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportReverted = void 0;
function supportReverted(Assertion) {
    Assertion.addProperty('reverted', function () {
        var _this = this;
        var promise = this._obj;
        var onSuccess = function (value) {
            _this.assert(false, 'Expected transaction to be reverted', 'Expected transaction NOT to be reverted', 'Transaction reverted.', 'Transaction NOT reverted.');
            return value;
        };
        var onError = function (error) {
            var message = (error instanceof Object && 'message' in error) ? error.message : JSON.stringify(error);
            var isReverted = message.search('failed to execute message') >= 0;
            _this.assert(isReverted, "Expected transaction to be reverted, but other exception was thrown: " + message, 'Expected transaction NOT to be reverted', 'Transaction reverted.', error);
            return error;
        };
        var derivedPromise = promise.then(onSuccess, onError);
        this.then = derivedPromise.then.bind(derivedPromise);
        this.catch = derivedPromise.catch.bind(derivedPromise);
        return this;
    });
}
exports.supportReverted = supportReverted;
