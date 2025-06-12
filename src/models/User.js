import {BaseModel} from "./BaseModel";
import {getFromStorage, addToStorage} from "../utils/utils";
import {appState} from "../app";

export class User extends BaseModel {
  constructor(login, password) {
    super();
    this.login = login;
    this.password = password;
    this.storageKey = "users";
  }

  get hasAccess() {
    let users = appState.storageManager.getFromStorage(this.storageKey);
    if (users.length == 0) return false;
    for (let user of users) {
      if (user.login === this.login && user.password === this.password) {
        this.id = user.id;
        return true;
      }
    }
    return false;
  }

  static save(user) {
    try {
      appState.storageManager.addToStorage(user, user.storageKey);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }
}
