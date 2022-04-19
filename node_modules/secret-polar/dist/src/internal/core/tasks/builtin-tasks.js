"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.isSetupTask = void 0;
var path = __importStar(require("path"));
var tasks = __importStar(require("../../../builtin-tasks/task-names"));
var plugins_1 = require("../plugins");
function default_1() {
    var e_1, _a;
    var ts = new Map(Object.entries(tasks));
    ts.delete('TASK_TEST_EXAMPLE');
    ts.delete('TASK_TEST_GET_TEST_FILES');
    var basedir = path.join(__dirname, "..", "..", "..", "builtin-tasks");
    try {
        for (var ts_1 = __values(ts), ts_1_1 = ts_1.next(); !ts_1_1.done; ts_1_1 = ts_1.next()) {
            var t = ts_1_1.value;
            plugins_1.loadPluginFile(path.join(basedir, t[1]));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (ts_1_1 && !ts_1_1.done && (_a = ts_1.return)) _a.call(ts_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
exports.default = default_1;
// checks if the task name is not a setup kind of task
function isSetupTask(taskName) {
    return taskName === tasks.TASK_HELP ||
        taskName === tasks.TASK_INIT || taskName === tasks.TASK_INSTALL;
}
exports.isSetupTask = isSetupTask;
