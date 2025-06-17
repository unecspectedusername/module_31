import {appState, storageManager} from "../app";
import {EVENTS} from "./events";
import {ColumnController} from "@components/Kanban/Column/controller";
import {TaskListController} from "@components/Kanban/TaskList/controller";

export default class Data {
  constructor(id) {
    this.storageKey = "data";
    this.id = id;
    this.stored = this.alreadyExists ? this.getUserDataById(this.id) : this.getBlankData();
    this._subscriptions = [];

    this.subscribe(EVENTS.TASK_UPDATED, () => this.save());
    this.subscribe(EVENTS.TASK_LIST_UPDATED, () => this.save());
  }

  subscribe(event, callback) {
    this._subscriptions.push({event, callback});
    appState.eventBus.on(event, callback);
  }

  unsubscribe() {
    for (const {event, callback} of this._subscriptions) {
      appState.eventBus.off(event, callback);
    }
  }

  getBlankData() {
    const columns = appState.defaultColumnSet
    const data = {};
    data.userId = appState.currentUser.id;
    data.content = columns.map(column => {
      return {
        name: column,
        tasks: []
      }
    })

    return data;
  }

  getUserDataById(id) {
    const dataBase = storageManager.getFromStorage(this.storageKey);
    return dataBase.find(data => data.userId === id);
  }

  update() {
    const data = [];
    const columns = appState.instanceManager.findInstances(ColumnController);
    const taskLists = appState.instanceManager.findInstances(TaskListController);
    columns.forEach(column => {
      const result = {};
      result.name = column.model.name;
      result.tasks = [];
      taskLists.forEach(list => {
        if (list.model.index === column.model.index) {
          list.model.savedLinks.forEach(link => {
            result.tasks.push({
              header: link.header,
              body: link.body
            });
          })
        }
      })
      data.push(result);
    })
    return data;
  }

  get alreadyExists() {
    const storedData = storageManager.getFromStorage(this.storageKey);
    if (storedData.length === 0) return false;
    if (storedData.some(el => el.userId === this.id)) return true;
    return false
  }

  save() {
    const newContent = this.update();
    if (this.alreadyExists) {
      const storedData = storageManager.getFromStorage(this.storageKey);
      const index = storedData.findIndex(el => el.userId === this.id);
      storedData[index].content = newContent;
      storageManager.setItem(this.storageKey, storedData);
    } else {
      const data = {
        userId: this.id,
        content: newContent
      };
      storageManager.addToStorage(this.storageKey, data)
    }
  }

  delete(userId) {
    let data = storageManager.getFromStorage(this.storageKey);
    data = data.filter(d => d.userId !== userId);
    storageManager.setItem(this.storageKey, data);
  }
}