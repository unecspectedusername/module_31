import {Controller} from "@core/Controller";
import {appState} from "@src/app";
import {TaskListController} from "@components/Kanban/TaskList/controller";
import {EVENTS} from "@core/events";

export class DropDownController extends Controller {
  constructor(view, model) {
    super(view, model);

    this.subscribe(EVENTS.TASK_LIST_UPDATED, () => this.update())
  }

  init() {
    this.findRelatedTaskLists();
    this.getRelatedTasks();
    this.createTaskList();
  }

  update() {
    this.getRelatedTasks();
    this.createTaskList();
  }

  findRelatedTaskLists() {
    this.model.ownTaskList = appState.instanceManager.findInstanceByIndex(TaskListController, this.model.index);
    this.model.leftNeighbourTaskList = appState.instanceManager.findInstanceByIndex(TaskListController, this.model.index - 1);
  }

  getRelatedTasks() {
    this.model.relatedTasks = null;
    this.model.relatedTasks = this.model.leftNeighbourTaskList._savedLinks;
  }

  createTaskList() {
    const tasks = [];
    this.model.relatedTasks.forEach(taskController => {
      const obj = {};
      const self = this;
      obj.text = taskController.view.textField.textContent;
      obj.callback = function () {
        appState.instanceManager.moveTask(taskController, self.model.ownTaskList);
        appState.instanceManager.moveTaskInDOM(taskController, self.model.ownTaskList);
        appState.eventBus.emit(EVENTS.TASK_LIST_UPDATED);
      };
      tasks.push(obj);
    })
    this.view.createList(tasks);
  }
}