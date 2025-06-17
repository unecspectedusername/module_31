import template from './template.html';
import {BasicDialogView} from "@components/Dialogs/BasicDialog/view";

export class CreateNewUserView extends BasicDialogView {
  constructor() {
    super();

    this.element.innerHTML = template;

    this.form = this.element.querySelector('[data-el="form"]');

    this.cancelButton = this.element.querySelector('[data-el="cancel"]');
    this.createButton = this.element.querySelector('[data-el="create"]');
  }

  addCancelAction(event, callback) {
    this.cancelButton.addEventListener(event, callback);
  }

  addCreateAction(event, callback) {
    this.createButton.addEventListener(event, callback);
  }
}