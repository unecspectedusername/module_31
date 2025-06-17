import {FloatingToggleModel} from "@components/FloatingToggle/model";
import {FloatingToggleView} from "@components/FloatingToggle/view";
import {FloatingToggleController} from "@components/FloatingToggle/controller";

export function initFloatingToggle() {
  const model = new FloatingToggleModel();
  const view = new FloatingToggleView();
  const controller = new FloatingToggleController(view, model);
  return controller;
}