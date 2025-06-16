import {Model} from "@core/Model";

export class BoardModel extends Model{
  constructor() {
    super();
    this.defaultColumns = ['Backlog', 'Ready', 'In Progress', 'Finished'];
  }
}