import {Controller} from "@core/Controller";
import {appState} from "@src/app";
import {EVENTS} from "@core/events";
import {initTask} from "../Task";

export class TaskListController extends Controller {
  constructor(view, model) {
    super(view, model);

    // оборачиваем свойство в проски, чтобы эмитить события при изменении
    const self = this;
    this._savedLinks = [];
    this.savedLinks = new Proxy(this._savedLinks, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        const columnIndex = self.model.index;
        const initialLength = target.length;

        if (prop === 'splice' || prop === 'push') {
          return (...args) => {

            // Если колонка была пустой, и мы добавили задачу
            // эмитим событие
            if (initialLength === 0) {
              appState.eventBus.emit(EVENTS.COLUMN_NOT_EMPTY, {
                columnIndex,
                tasks: target,
              })
            }

            const result = value.apply(target, args);

            // Если в колонке теперь нет задач
            if (target.length === 0) {
              appState.eventBus.emit(EVENTS.COLUMN_IS_EMPTY, {
                columnIndex
              })
            }

            return result;
          };
        }
        return value;
      }
    });

    this.subscribe(EVENTS.TASK_CREATED, (data) => {
      if (data.columnIndex === this.model.index) {
        this.makeNewTask()
      }
    });

    this.subscribe(EVENTS.TASK_DELETED, (task) => {
      if (task.columnIndex === this.model.index) {
        this.removeLinks(task.controller);
        appState.eventBus.emit(EVENTS.TASK_LIST_UPDATED);
      }
    });
  }

  makeNewTask() {
    const newTask = initTask(null, null, this.model.index);
    this.addChild(newTask);
    newTask.view.focus();
  }

}