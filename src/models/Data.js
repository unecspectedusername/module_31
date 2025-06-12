import {getFromStorage, addToStorage} from "../utils/utils";
import {appState} from "../app";
import {EVENTS} from "../core/events";

export default class Data {
  constructor() {
    this.userId = appState.currentUser.id;
    this.storageKey = "data";
    this.stored = this.alreadyExists ? this.getCurrentUserData() : this.getBlankData();

    appState.eventBus.on(EVENTS.TASK_UPDATED, () => {
      this.save();
    })
  }

  getBlankData() {
    const columns = appState.defaultColumnSet
    const data = {};
    data.userId = this.userId;
    data.content = columns.map(column => {
      return {
        name: column,
        // removeme убери данные из массива
        // tasks: ['Test 1', 'Test 2', 'Test 3'],
        tasks: []
      }
    })

    return data;
  }

  getCurrentUserData() {
    const dataBase = appState.storageManager.getFromStorage(this.storageKey);
    return dataBase.find(data => data.userId === this.userId);
  }

  getData() {
    return {
      userId: this.userId,
      storageKey: this.storageKey,
      stored: this.stored,
    }
  }

  get alreadyExists() {
    const storedData = appState.storageManager.getFromStorage(this.storageKey);
    if (storedData.length === 0) return false;
    if (storedData.some(el => el.userId === this.userId)) return true;
    return false
  }
  save() {
    const newContent = appState.storageManager.collectData();
    if (this.alreadyExists) {
      const storedData = appState.storageManager.getFromStorage(this.storageKey);
      const index = storedData.findIndex(el => el.userId === this.userId);
      storedData[index].content = newContent;
      appState.storageManager.setItem(storedData, this.storageKey);
    } else {
      const data = {
        userId: this.userId,
        content: newContent
      };
      appState.storageManager.addToStorage(data, this.storageKey)
    }
  }
}