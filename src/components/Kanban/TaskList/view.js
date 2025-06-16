import {View} from "@core/View";

export class TaskListView extends View {
  constructor() {
    super('ul', 'kanban-board__task-list')
  }

  appendTask(taskElement) {
    this.element.appendChild(taskElement);
  }
}