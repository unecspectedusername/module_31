import {Model} from "@core/Model";

export class TaskModel extends Model {
  constructor(taskHeader, taskBody, columnIndex) {
    super();

    this.columnIndex = columnIndex;

    this.header = taskHeader;
    this.body = taskBody;
  }
}