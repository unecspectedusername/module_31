import template from './template.html';
import {BasicDialogView} from "@components/Dialogs/BasicDialog/view";

export class EditTaskView extends BasicDialogView {
  constructor(header, body) {
    super();

    this.element.innerHTML = template;

    this.form = this.element.querySelector('[data-el="form"]');
    this.headerInput = this.element.querySelector('[data-el="header"]');
    this.headerInput.value = header;
    this.bodyInput = this.element.querySelector('[data-el="body"]');
    this.bodyInput.value = body;

    this.cancelButton = this.element.querySelector('[data-el="cancel"]');
    this.submitButton = this.element.querySelector('[data-el="submit"]');
  }

  addCancelAction(event, callback) {
    this.cancelButton.addEventListener(event, callback);
  }

  addSubmitAction(event, callback) {
    this.submitButton.addEventListener(event, callback);
  }
}