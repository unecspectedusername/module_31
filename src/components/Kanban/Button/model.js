import {Model} from "@core/Model";

export class ButtonModel extends Model {
  constructor(index) {
    super();
    this.index = index;
    this.tasks = [];
  }
}