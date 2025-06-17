import {TaskView} from "./view";
import {TaskModel} from "./model";
import {TaskController} from "./controller";

export function initTask(taskHeader, taskBody, columnIndex) {
  const view = new TaskView(taskHeader);
  const model = new TaskModel(taskHeader, taskBody, columnIndex);
  const controller = new TaskController(view, model);
  controller.init();
  return controller;
}