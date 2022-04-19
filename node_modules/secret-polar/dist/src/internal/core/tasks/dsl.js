"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksDSL = void 0;
var task_definitions_1 = require("./task-definitions");
/**
 * This class defines the DSL used in Polar config files
 * for creating and overriding tasks.
 */
var TasksDSL = /** @class */ (function () {
    function TasksDSL() {
        this._tasks = {};
    }
    TasksDSL.prototype.task = function (name, descriptionOrAction, action) {
        return this._addTask(name, descriptionOrAction, action, false);
    };
    TasksDSL.prototype.internalTask = function (name, descriptionOrAction, action) {
        return this._addTask(name, descriptionOrAction, action, true);
    };
    /**
     * Retrieves the task definitions.
     *
     * @returns The tasks container.
     */
    TasksDSL.prototype.getTaskDefinitions = function () {
        return this._tasks;
    };
    TasksDSL.prototype._addTask = function (name, descriptionOrAction, action, isInternal) {
        var parentTaskDefinition = this._tasks[name];
        var taskDefinition;
        if (parentTaskDefinition !== undefined) {
            taskDefinition = new task_definitions_1.OverriddenTaskDefinition(parentTaskDefinition, isInternal);
        }
        else {
            taskDefinition = new task_definitions_1.SimpleTaskDefinition(name, isInternal);
        }
        if (descriptionOrAction instanceof Function) {
            action = descriptionOrAction;
            descriptionOrAction = undefined;
        }
        if (descriptionOrAction !== undefined) {
            taskDefinition.setDescription(descriptionOrAction);
        }
        if (action !== undefined) {
            taskDefinition.setAction(action);
        }
        this._tasks[name] = taskDefinition;
        return taskDefinition;
    };
    return TasksDSL;
}());
exports.TasksDSL = TasksDSL;
