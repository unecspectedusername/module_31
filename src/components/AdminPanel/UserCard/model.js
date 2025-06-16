import {Model} from "@core/Model";

export class UserCardModel extends Model {
  constructor(id) {
    super();

    this.userID = id;
  }
}