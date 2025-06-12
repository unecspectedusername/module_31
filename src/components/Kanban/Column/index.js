import {ColumnView} from "./view";
import {ColumnModel} from "./model";
import {ColumnController} from "./controller";

export function initColumn(name, index) {
  const view = new ColumnView(name);
  const model = new ColumnModel(index);
  model.name = name;
  const controller = new ColumnController(view, model);
  return controller;
}