"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportRevertedWith = void 0;
function supportRevertedWith(Assertion) {
    Assertion.addMethod('revertedWith', function (revertReason) {
        var _this = this;
        var promise = this._obj;
        var onSuccess = function (value) {
            _this.assert(false, 'Expected transaction to be reverted', 'Expected transaction NOT to be reverted', 'Transaction reverted.', 'Transaction NOT reverted.');
            return value;
        };
        var onError = function (error) {
            var message = (error instanceof Object && 'message' in error) ? error.message : JSON.stringify(error);
            var isReverted = message.toLowerCase().includes(revertReason.toLowerCase());
            _this.assert(isReverted, "Expected transaction to be reverted with " + revertReason + ", but other exception was thrown: " + message, "Expected transaction NOT to be reverted with " + revertReason, "Transaction reverted with " + revertReason + ".", error);
            return error;
        };
        var derivedPromise = promise.then(onSuccess, onError);
        this.then = derivedPromise.then.bind(derivedPromise);
        this.catch = derivedPromise.catch.bind(derivedPromise);
        return this;
    });
}
exports.supportRevertedWith = supportRevertedWith;
