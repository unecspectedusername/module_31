import {Model} from "@core/Model";

export class TaskCounterModel extends Model {
  constructor() {
    super();
    this.activeTasks = null;
    this.finishedTasks = null;
  }

}