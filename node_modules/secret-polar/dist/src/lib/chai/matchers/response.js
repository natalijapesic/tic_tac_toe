"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportResponse = void 0;
function supportResponse(Assertion) {
    Assertion.addMethod('respondWith', function (// eslint-disable-line  @typescript-eslint/no-explicit-any
    responseMessage // eslint-disable-line  @typescript-eslint/no-explicit-any
    ) {
        var _this = this;
        var subject = this._obj;
        var strResponse = JSON.stringify(responseMessage);
        var derivedPromise = subject.then(function (response) {
            response = JSON.stringify(response);
            _this.assert(response === strResponse, "Expected response \"" + strResponse + "\" to be returned, but " + response + " was returned", "Expected response \"" + strResponse + "\" NOT to be returned, but it was");
        });
        this.then = derivedPromise.then.bind(derivedPromise);
        this.catch = derivedPromise.catch.bind(derivedPromise);
        this.promise = derivedPromise;
        this.responseMessage = responseMessage;
        return this;
    });
}
exports.supportResponse = supportResponse;
