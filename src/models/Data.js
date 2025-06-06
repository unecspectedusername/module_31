import { getFromStorage, addToStorage } from "../utils/utils";
import {appState} from "../app";

export default class Data {
    constructor(user) {
        this.userId = user.id;
        this.storageKey = "data";
        this.stored = this.exists ? this.getFromStorage() : this.getBlankData();
    }

    getBlankData() {
        const columns = appState.defaultColumnSet

        const data = {};

        data.userId = this.userId;

        data.content = columns.map(column => {
            return {
                columnName: column,
                taskList: [],
            }
        })

        return data;
    }

    get exists() {
        const storedData = getFromStorage(this.storageKey);
        if (storedData.length === 0) return false;
        if (storedData.some(el => el.userId === this.userId)) return true;
        return false
    }

    collectData() {
        const columns = document.querySelectorAll('.kanban-board__column');
        const data = Array.from(columns).map(column => {
            const columnName = column.querySelector('.kanban-board__column-header').textContent;
            const tasks = Array.from(column.querySelectorAll('.kanban-board__text-field')).map(task =>
                task.textContent.trim()
            );
            return {
                columnName,
                taskList: tasks
            };
        });
        return data;
    }

    save() {
        const newContent = this.collectData();
        if (this.exists) {
            const storedData = getFromStorage(this.storageKey);
            const index = storedData.findIndex(el => el.userId === this.userId);
            storedData[index].content = newContent;
            localStorage.setItem(this.storageKey, JSON.stringify(storedData));
        } else {
            const data = [];
            const content = {
                userId: this.userId,
                content: newContent
            }
            data.push(content)
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        }

    }
}