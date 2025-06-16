import {DropDownView} from "./view";
import {DropDownModel} from "./model";
import {DropDownController} from "./controller";

// компонент выпадающего списка может быть использован не только в kanban колонках,
// поэтому index и listElements необязательные аргументы
// Если мы создаем список из известных заранее элементов (для headerMenu), мы передаем
// список элементов. Если мы создаем список для
export function initDropDown(index = null, listElements = null) {
  const view = new DropDownView(listElements);
  const model = new DropDownModel(index);
  const controller = new DropDownController(view, model);
  controller.init();
  return controller;
}