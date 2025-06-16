import {Model} from "@core/Model";
import {appState} from "@src/app";
import {TaskListController} from "@components/Kanban/TaskList/controller";

export class DropDownModel extends Model {
  constructor(index) {
    super();
    this.index = index;
    this.relatedTasks = null;
    this.ownTaskList = null;
    this.leftNeighbourTaskList = null;
  }
}