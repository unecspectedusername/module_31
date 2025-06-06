import Data from "./models/Data";
import InstanceManager from "./models/InstanceManager";

export class State {
  constructor() {
    this.currentUser = null;
    this.data = null;
    this.defaultColumnSet = [
      'Backlog',
      'Ready',
      'In Progress',
      'Finished'
    ]
    this.instanceMap = new WeakMap();
    this.instanceManager = new InstanceManager();
  }
  set currentUser(user) {
    this._currentUser = user;
  }
  get currentUser() {
    return this._currentUser;
  }
}
