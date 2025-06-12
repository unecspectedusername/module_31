import {Component} from "./Component";
import {appState} from "../app";

export class Controller extends Component {
  constructor(view, model) {
    super();
    this.view = view;
    this.model = model;

    // Сохраняем связь между контроллером компонента и DOM элементом для работы DragNDrop
    appState.instanceMap.set(this.view.element, this);
  }

  saveLinks(childController) {
    this.saveLink(childController);
    this.model.saveLink(childController.model);
    this.view.saveLink(childController.view);
  }

  removeLinks(childController) {
    this.removeLink(childController);
    this.model.removeLink(childController.model);
    this.view.removeLink(childController.view);
  }

  placeLinks(childController, index) {
    this.placeLink(childController, index);
    this.model.placeLink(childController.model, index);
    this.view.placeLink(childController.view, index);
  }

  addChild(childController) {
    this.saveLinks(childController);
    this.view.renderChild(childController.view);
  }

}