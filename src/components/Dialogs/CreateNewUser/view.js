import {View} from "@core/View";
import template from './template.html';

export class CreateNewUserView extends View {
  constructor() {
    super('div', 'dialog');

    this.element.innerHTML = template;

    this.form = this.element.querySelector('[data-el="form"]');

    this.cancelButton = this.element.querySelector('[data-el="cancel"]');
    this.createButton = this.element.querySelector('[data-el="create"]');
  }

  addBackDropAction(event, callback) {
    this.element.addEventListener(event, callback);
  }

  addCancelAction(event, callback) {
    this.cancelButton.addEventListener(event, callback);
  }

  addCreateAction(event, callback) {
    this.createButton.addEventListener(event, callback);
  }
}