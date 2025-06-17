import {Model} from "@core/Model";

export class ColumnModel extends Model {
  constructor(index) {
    super();
    this.index = index;
    this.name = null;
  }
}