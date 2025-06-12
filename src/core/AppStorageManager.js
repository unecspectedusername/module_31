import {getFromStorage} from "../utils/utils";
import {appState} from "../app";
import {ColumnController} from "../components/Kanban/Column/controller";
import {TaskListController} from "../components/Kanban/TaskList/controller";

export class AppStorageManager {
  constructor() {
    this.columns = null;
  }

  getFromStorage(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  };

  setItem(data, key) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  addToStorage(obj, key) {
    const storageData = this.getFromStorage(key);
    storageData.push(obj);
    this.setItem(storageData, key)
  };

  clear() {
    localStorage.clear();
  }

  collectData() {
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
            result.tasks.push(link.text);
          })
        }
      })
      data.push(result);
    })
    return data;
  }

}