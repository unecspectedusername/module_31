import {Model} from "../../../core/Model";

export class TaskModel extends Model{
  constructor(columnIndex, text) {
    super();

    this.columnIndex = columnIndex;
    this.text = text;
  }
}