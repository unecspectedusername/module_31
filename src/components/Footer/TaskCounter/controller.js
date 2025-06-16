import {Controller} from "@core/Controller";
import {appState} from "@src/app";
import {ColumnController} from "@components/Kanban/Column/controller";
import {TaskController} from "@components/Kanban/Task/controller";
import {EVENTS} from "@core/events";

export class TaskCounterController extends Controller {
  constructor(view, model) {
    super(view, model);

    this.subscribe(EVENTS.BOARD_RENDERED, () => this.count());
    this.subscribe(EVENTS.TASK_UPDATED, () => this.count());
  }

  count() {
    const columns = appState.instanceManager.findInstances(ColumnController);
    const tasks = appState.instanceManager.findInstances(TaskController);

    this.model.activeTasks = tasks.filter(task => task.model.columnIndex < columns.length - 1).length;
    this.model.finishedTasks = tasks.filter(task => task.model.columnIndex === columns.length - 1).length;

    this.view.showNumberOfTasks(this.model.activeTasks, this.model.finishedTasks);
  }
}