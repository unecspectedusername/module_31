import {Model} from "@core/Model";

export class CreateNewUserModel extends Model {
  constructor(initiatorController) {
    super();
    this.initiator = initiatorController;
  }
}