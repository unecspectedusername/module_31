import {DropDownModel} from "./model";
import {DropDownView} from "./view";
import {DropDownController} from "./controller";

export function initDropDown(index) {
  const model = new DropDownModel(index);
  const view = new DropDownView();
  const controller = new DropDownController(view, model);
  controller.init();
  return controller;
}