import {Model} from "@core/Model";

export class TaskModel extends Model{
  constructor(columnIndex, text) {
    super();

    //removeme логирование свойства индекса
    this._columnIndex = columnIndex;

    // this.columnIndex = columnIndex;
    this.text = text;
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