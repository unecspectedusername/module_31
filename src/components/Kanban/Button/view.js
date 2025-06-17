import {View} from "@core/View";
import plusIcon from "../../../templates/icons/plus.html";

export class ButtonView extends View {
  constructor() {
    super('div', 'kanban-board__button-wrapper')

    this.button = document.createElement('button');
    this.button.type = 'button';
    this.element.appendChild(this.button);

    this.state = null;

    this._listeners = [];
  }

  addButtonListener(type, callback, options) {
    this._listeners.push({type, callback, options});
    this.button.addEventListener(type, callback, options);
  }

  removeButtonListeners() {
    for (const {type, callback, options} of this._listeners) {
      this.button.removeEventListener(type, callback, options);
    }
    this._listeners.length = 0;
  }

  clear() {
    this.button.removeAttribute('aria-label');
    this.button.className = '';
    this.button.innerHTML = '';
  }

  createTemplate({
                   ariaLabel = 'Add card',
                   className = 'kanban-board__button',
                   icon = true,
                   textContent = 'Add card'
                 } = {}) {
    this.clear();
    this.button.setAttribute('aria-label', ariaLabel);
    this.button.className = className;
    if (icon) {
      const icon = document.createElement('i');
      icon.innerHTML = plusIcon;
      this.button.appendChild(icon);
    }
    const text = document.createTextNode(textContent)
    this.button.appendChild(text);
  }

  setDefaultState() {
    this.createTemplate();
    this.state = 'default';
  }

  setSubmitState() {
    this.clear();
    this.button.setAttribute('aria-label', 'Submit');
    this.button.className = 'kanban-board__button--submit';
    this.button.innerHTML = 'Submit';
    this.state = 'submit';
  }

  setDisabledState() {
    this.clear();
    this.removeButtonListeners();
    this.setDefaultState();
    this.button.classList.add('disabled');
    this.element.disabled = true;
    this.state = 'disabled';
  }

  setDropDownState(dropDownElement, callback) {
    this.clear();
    this.setDefaultState();
    this.removeButtonListeners();
    this.element.appendChild(dropDownElement);
    this.state = 'dropdown'
    this.addButtonListener('click', callback)
  }
}