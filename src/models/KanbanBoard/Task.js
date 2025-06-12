import removeIcon from "../../templates/icons/remove.html";
import DOMObject from "./DOMObject";
import {dragManager} from "../../core/DragManager";
import TextField from "./TextField";
import TaskList from "./TaskList";

export default class Task extends DOMObject {
  constructor(text) {
    super('li', 'kanban-board__task');

    this.textField = new TextField()
    this.textField.element.textContent = text;
    this.textField.appendTo(this);

    const removeButton = new DOMObject('button', 'kanban-board__remove-button');
    removeButton.element.innerHTML = removeIcon;
    removeButton.addEventListener('click', () => this.remove());
    removeButton.appendTo(this);

    dragManager.makeDraggable(this.element);
  }

  focus() {
    this.textField.element.focus();
    const range = document.createRange();
    range.selectNodeContents(this.textField.element);
    range.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  submit() {
    if (!this.textField.element.textContent.trim()) this.remove();
  }

  remove() {
    const parent = this.findRelative(TaskList);
    parent.removeChild(this);
    this.element.remove();
    this.textField.removeAllListeners();
  }
}