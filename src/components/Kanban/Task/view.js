import {View} from "@core/View";
import removeIcon from "@templates/icons/remove.html";
import {dragManager} from "@core/DragManager";

export class TaskView extends View {
  constructor(text = null) {
    super('li', 'kanban-board__task')

    this.isDragging = false;

    this.textField = document.createElement('span');
    this.textField.className = 'kanban-board__text-field';
    this.textField.setAttribute('contenteditable', 'true');
    this.element.appendChild(this.textField);
    if (text) this.textField.textContent = text;
    this.removeButton = document.createElement('button');
    this.removeButton.className = 'kanban-board__remove-button';
    this.removeButton.innerHTML = removeIcon;
    this.element.appendChild(this.removeButton);

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