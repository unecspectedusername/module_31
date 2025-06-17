import {Model} from "@core/Model";

export class DropDownModel extends Model {
  constructor(index) {
    super();
    this.index = index;
    this.relatedTasks = null;
    this.ownTaskList = null;
    this.leftNeighbourTaskList = null;
  }
}