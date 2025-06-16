import {View} from "@core/View";

export class ColumnView extends View {
  constructor(name) {
    super();
    this.element = document.createElement('section');
    this.element.className = 'kanban-board__column';

    this.header = document.createElement('h2');
    this.header.className = 'kanban-board__column-header';
    this.header.textContent = name;
    this.element.appendChild(this.header);
  }
}