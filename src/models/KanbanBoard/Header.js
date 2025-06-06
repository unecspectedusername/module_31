import DOMObject from "./DOMObject";

export default class Header extends DOMObject {
    constructor(text) {
        super('h2', 'kanban-board__column-header');
        this.element.textContent = text;
    }
}