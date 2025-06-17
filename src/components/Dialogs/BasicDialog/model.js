import {Model} from "@core/Model";

export class BasicDialogModel extends Model {
  constructor(initiatorController) {
    super();
    this.initiator = initiatorController;
  }
}