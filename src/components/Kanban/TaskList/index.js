import {TaskListModel} from "./model";
import {TaskListView} from "./view";
import {TaskListController} from "./controller";

export function initTaskList(index) {
  const model = new TaskListModel(index);
  const view = new TaskListView();
  const controller = new TaskListController(view, model);
  return controller;
}