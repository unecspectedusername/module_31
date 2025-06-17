import {View} from "@core/View";
import {dragManager} from "@core/DragManager";
import template from './template.html';

export class TaskView extends View {
  constructor(taskHeader = null) {
    super('li', 'kanban-board__task')

    this.element.innerHTML = template;

    this.textField = this.element.querySelector('[data-el="text"]');
    this.editButton = this.element.querySelector('[data-el="edit"]');
    this.removeButton = this.element.querySelector('[data-el="remove"]');

    this.textField.textContent = taskHeader;

    this.isDragging = false;

    dragManager.makeDraggable(this.element);
  }


  setDraggedState() {
    this.element.classList.add('is-dragging')
    this.isDragging = true;
  }

  unsetDraggedState() {
    this.element.classList.remove('is-dragging')
    this.isDragging = false;
  }

  focus() {
    this.textField.focus();
  }
}