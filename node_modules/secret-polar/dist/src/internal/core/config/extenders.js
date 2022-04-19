"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtenderManager = void 0;
var ExtenderManager = /** @class */ (function () {
    function ExtenderManager() {
        this._extenders = [];
    }
    ExtenderManager.prototype.add = function (extender) {
        this._extenders.push(extender);
    };
    ExtenderManager.prototype.getExtenders = function () {
        return this._extenders;
    };
    return ExtenderManager;
}());
exports.ExtenderManager = ExtenderManager;
