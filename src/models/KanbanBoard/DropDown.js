import DOMObject from "./DOMObject";

export default class DropDown extends DOMObject {
    constructor() {
        super('div', 'kanban-board__dropdown');

        // создаем WeakMap для хранения элементов списка с привязкой к их экземплярам класса
        this.map = new WeakMap();
    }

    createElementFromTask(task) {
        const element = document.createElement('li');
        element.textContent = task.element.textContent;
        this.map.set(element, { relatedTask: task });
    }
}