import {BaseModel} from "./BaseModel";
import {appState, storageManager} from "../app";

export class User extends BaseModel {
  constructor(login, password, role = 'user') {
    super();
    this.login = login;
    this.password = password;
    this.storageKey = "users";
    this.role = role;
  }

  get hasAccess() {
    let users = storageManager.getFromStorage(this.storageKey);
    if (users.length == 0) return false;
    for (let user of users) {
      if (user.login === this.login && user.password === this.password) {
        this.id = user.id;
        this.role = user.role;
        return true;
      }
    }
    return false;
  }

  static save(user) {
    try {
      storageManager.addToStorage(user, user.storageKey);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  static delete(userId) {
    const storageKey = appState.currentUser.storageKey;
    let users = storageManager.getFromStorage(storageKey);
    users = users.filter(u => u.id !== userId);
    storageManager.setItem(users, storageKey);
  }
}
