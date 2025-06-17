import {EditTaskController} from "@components/Dialogs/EditTask/controller";
import {EditTaskModel} from "@components/Dialogs/EditTask/model";
import {EditTaskView} from "@components/Dialogs/EditTask/view";

export function initEditTask (initiatorController) {
  const header = initiatorController.model.header;
  const body = initiatorController.model.body;
  const model = new EditTaskModel(initiatorController);
  const view = new EditTaskView(header, body);
  const controller = new EditTaskController(view, model);
  return controller;
}