import {Component} from "./Component";
import {appState} from "@src/app";

export class Controller extends Component {
  constructor(view, model) {
    super();
    this.view = view;
    this.model = model;

    this._subscriptions = [];

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

  subscribe(event, callback) {
    this._subscriptions.push({event, callback});
    appState.eventBus.on(event, callback);
  }

  unsubscribe() {
    if (this._subscriptions.length !== 0) {
      for (const {event, callback} of this._subscriptions) {
        appState.eventBus.off(event, callback);
      }
    }
  }

  remove() {
    this.unsubscribe();
    if (this.savedLinks.length !== 0) {
      this.savedLinks.forEach(link => {
        link.unsubscribe();
        link.remove();
      });
    }
    appState.instanceMap.delete(this.view.element);
    this.view.element.remove();
  }

}