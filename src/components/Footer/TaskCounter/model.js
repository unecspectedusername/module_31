import {Model} from "@core/Model";
import {appState} from "@src/app";
import {ColumnController} from "@components/Kanban/Column/controller";
import {TaskController} from "@components/Kanban/Task/controller";

export class TaskCounterModel extends Model {
  constructor() {
    super();
    this.activeTasks = null;
    this.finishedTasks = null;
  }

}