"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseZodError = void 0;
var ZodError_1 = require("zod/lib/src/ZodError");
function parseZodSubError(e, indent) {
    if (e.code === ZodError_1.ZodErrorCode.invalid_union) {
        return e.unionErrors
            .map(function (ue) { return parseZodErrorInternal(ue, indent + 2); })
            .join("");
    }
    return "";
}
function parseZodErrorInternal(ze, indent) {
    return ze.errors
        .map(function (e) {
        return " ".repeat(indent) +
            "[" + e.path.join(", ") + "]" +
            ": " + e.message + "\n" +
            parseZodSubError(e, indent);
    })
        .join("\n");
}
function parseZodError(ze) {
    return parseZodErrorInternal(ze, 10);
}
exports.parseZodError = parseZodError;
