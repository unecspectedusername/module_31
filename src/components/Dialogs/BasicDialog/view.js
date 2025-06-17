import {View} from "@core/View";

export class BasicDialogView extends View {
  constructor() {
    super('div', 'dialog');
  }

  addBackDropAction(event, callback) {
    this.element.addEventListener(event, callback);
  }
}