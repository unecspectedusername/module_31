import {TaskView} from "./view";
import {TaskModel} from "./model";
import {TaskController} from "./controller";

export function initTask(text, columnIndex) {
  const view = new TaskView(text);
  const model = new TaskModel(columnIndex, text);
  const controller = new TaskController(view, model);
  controller.init();
  return controller;
}