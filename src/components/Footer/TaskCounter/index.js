import {TaskCounterModel} from "@components/Footer/TaskCounter/model";
import {TaskCounterView} from "@components/Footer/TaskCounter/view";
import {TaskCounterController} from "@components/Footer/TaskCounter/controller";

export function initTaskCounter() {
  const model = new TaskCounterModel();
  const view = new TaskCounterView();
  const controller = new TaskCounterController(view, model);
  return controller;
}