"use strict";
function run(runtimeEnv) {
    return new Promise(function (resolve) { return setTimeout(resolve, 100); });
}
module.exports = { default: run };
