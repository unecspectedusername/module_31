import {View} from "@core/View";
import template from './template.html';

export class AdminPanelView extends View {
  constructor() {
    super('div', 'admin-panel');

    this.element.innerHTML = template;

    this.table = this.element.querySelector('[data-el="table"]')
    this.button = this.element.querySelector('[data-el="button"]')
  }

  renderChild(childView) {
    this.table.appendChild(childView.element);
  }

  addButtonListener(event, callback) {
    this.button.addEventListener(event, callback);
  }
}