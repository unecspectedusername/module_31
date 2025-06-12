import {View} from "../../../core/View";
import removeIcon from "../../../templates/icons/remove.html";
import {dragManager} from "../../../core/DragManager";

export class TaskView extends View {
  constructor(text = null) {
    super('li', 'kanban-board__task')

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

  focus() {
    this.textField.focus();
    const range = document.createRange();
    range.selectNodeContents(this.textField);
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}