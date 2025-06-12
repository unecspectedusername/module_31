import {View} from "../../../core/View";
import plusIcon from "../../../templates/icons/plus.html";
import {appState} from "../../../app";
import {EVENTS} from "../../../core/events";

export class DropDownView extends View {
  constructor() {
    super('div', 'kanban-board__dropdown-wrapper')

    this.list = document.createElement('ul');
    this.element.appendChild(this.list);
  }

  createListElement(text) {
    const listElement = document.createElement('li');
    this.list.appendChild(listElement);
  }
}