import {View} from "@core/View";
import removeIcon from "@templates/icons/remove.html";
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
    // removeme TODO - остальной код на случай если при тесте обнаружится, что фокус работает некорректно на каких то устройствах. Если все будет ок, код можно удалить
    // const range = document.createRange();
    // range.selectNodeContents(this.textField);
    // range.collapse(true);
    // const sel = window.getSelection();
    // sel.removeAllRanges();
    // sel.addRange(range);
  }
}