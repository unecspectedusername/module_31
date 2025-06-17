import InstanceManager from "./InstanceManager";
import {EventEmitter} from "./EventEmitter";
import {storageManager} from "@src/app";

export class AppState {
  constructor() {
    this.currentUser = null;
    this.eventBus = new EventEmitter();
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

  checkSaveDataSetting() {
    return storageManager.getItem('saveData') === 'true';
  }

  clear() {
    this.currentUser = null;
    this.data.unsubscribe();
    this.data = null;
    for (const controller of this.instanceMap.values()) {
      controller.remove();
    }
    this.eventBus.unsubscribeEveryone();
    this.instanceMap.clear();
    this.blurFired = false;
  }
}
