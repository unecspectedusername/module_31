import DOMObject from "./DOMObject";

export default class TextField extends DOMObject {
  constructor() {
    super('span', 'kanban-board__text-field');
    this.element.setAttribute('contenteditable', 'true');
  }
}