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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.persistCheckpoint = exports.loadFromYamlFileSilent = exports.toMap = exports.loadCheckpoint = void 0;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var yaml_1 = __importDefault(require("yaml"));
function loadCheckpoint(checkpointName) {
    var e_1, _a;
    var _b;
    var checkpoints = loadFromYamlFileSilent(checkpointName, { mapAsMap: false });
    try {
        for (var _c = __values(Object.keys(checkpoints)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var k = _d.value;
            if ((_b = checkpoints[k]) === null || _b === void 0 ? void 0 : _b.metadata) {
                checkpoints[k].metadata = toMap(checkpoints[k].metadata);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return checkpoints;
}
exports.loadCheckpoint = loadCheckpoint;
// http://xahlee.info/js/js_object_to_map_datatype.html
function toMap(obj) {
    var mp = new Map();
    Object.keys(obj).forEach(function (k) { mp.set(k, obj[k]); });
    return mp;
}
exports.toMap = toMap;
function loadFromYamlFileSilent(filePath, options) {
    // Try-catch is the way:
    // https://nodejs.org/docs/latest/api/fs.html#fs_fs_stat_path_options_callback
    // Instead, user code should open/read/write the file directly and
    // handle the error raised if the file is not available
    try {
        return readYAML(filePath, options);
    }
    catch (e) {
        return defaultYamlValue(options);
    }
}
exports.loadFromYamlFileSilent = loadFromYamlFileSilent;
function readYAML(filePath, options) {
    return yaml_1.default.parse(fs_1.default.readFileSync(filePath).toString(), options);
}
function defaultYamlValue(options) {
    if (options === null || options === void 0 ? void 0 : options.mapAsMap) {
        return new Map(); // eslint-disable-line @typescript-eslint/no-explicit-any
    }
    return {};
}
function persistCheckpoint(contractPath, checkpoint) {
    var scriptDir = path_1.default.dirname(contractPath);
    fs_1.default.mkdirSync(scriptDir, { recursive: true });
    fs_1.default.writeFileSync(contractPath, yaml_1.default.stringify(checkpoint));
}
exports.persistCheckpoint = persistCheckpoint;
