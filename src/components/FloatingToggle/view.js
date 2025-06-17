import {View} from "@core/View";
import template from './template.html';

export class FloatingToggleView extends View {
  constructor() {
    super('div', 'floating-toggle');

    this.element.innerHTML = template;
    this.checkbox = this.element.querySelector('[data-el="checkbox"]');
  }

  addListener(callback) {
      this.checkbox.addEventListener('change', callback)
  }
}