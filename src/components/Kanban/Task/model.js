import {Model} from "@core/Model";

export class TaskModel extends Model {
  constructor(taskHeader, taskBody, columnIndex) {
    super();

    //removeme логирование свойства индекса
    this._columnIndex = columnIndex;

    this.header = taskHeader;
    this.body = taskBody;
  }

  //removeme логирование свойства индекса
  get columnIndex() {
    return this._columnIndex;
  }

  //removeme логирование свойства индекса
  set columnIndex(value) {
    this._columnIndex = value;
  }
}