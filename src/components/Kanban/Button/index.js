import {ButtonView} from "./view";
import {ButtonModel} from "./model";
import {ButtonController} from "./controller";

export function initButton(index) {
  const model = new ButtonModel(index);
  const view = new ButtonView();
  const controller = new ButtonController(view, model);
  controller.init();
  return controller;
}