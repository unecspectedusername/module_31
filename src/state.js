import Data from "./models/Data";
import InstanceManager from "./core/InstanceManager";
import {EventEmitter} from "./core/EventEmitter";
import {AppStorageManager} from "./core/AppStorageManager";

export class State {
  constructor() {
    this.currentUser = null;
    this.eventBus = new EventEmitter();
    this.storageManager = new AppStorageManager();
    this.data = null;
    this.defaultColumnSet = [
      'Backlog',
      'Ready',
      'In Progress',
      'Finished'
    ]
    this.instanceMap = new Map();
    this.instanceManager = new InstanceManager();
    // небольшой костыль для обхода проблемы с двойным кликом по кнопке
    // описание в components/Task/controller.js
    this.blurFired = false;
  }

  set currentUser(user) {
    this._currentUser = user;
  }

  get currentUser() {
    return this._currentUser;
  }
}
