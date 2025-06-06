import {appState} from "../app";
import TaskList from "./KanbanBoard/TaskList";

export default class InstanceManager {
    // В appState установлена связь между DOM элементами и экземплярами классов
    // с помощью WeakMap. Этот метод позволяет найти экземпляр класса элемента,
    // который мы нашли на странице с помощью querySelector.
    getInstance(element) {
        return appState.instanceMap.get(element);
    }

    // Каждый экземпляр класса хранит в себе записи о родительских элементах
    // После того, как задачу перетащили в другую колонку, эту информацию нужно обновить
    updateInstanceChildList(task, oldColumn, newList) {
        const taskInstance = this.getInstance(task);

        const oldColumnInstance = this.getInstance(oldColumn);
        const oldListInstance = oldColumnInstance.findRelative(TaskList);
        const newListInstance = this.getInstance(newList);

        taskInstance.parent = newList;
        oldListInstance.removeChild(task);
        newListInstance.children.push(task);
    }

}