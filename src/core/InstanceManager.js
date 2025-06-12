import {appState} from "../app";
import {TaskController} from "../components/Kanban/Task/controller";
import {TaskListController} from "../components/Kanban/TaskList/controller";
import {ColumnController} from "../components/Kanban/Column/controller";

export default class InstanceManager {
  // В appState установлена связь между DOM элементами и контроллерами компонентов
  // с помощью WeakMap. Этот метод позволяет найти контроллер, который отвечает за DOM элемент,
  // который мы нашли на странице с помощью querySelector.
  getController(element) {
    return appState.instanceMap.get(element);
  }

  findInstances(controllerClass) {
    const instances = [...appState.instanceMap]
      .filter(([_, value]) => value instanceof controllerClass)
      .map(([_, value]) => value);
    return instances;
  }

  // Каждый элемент компонента (модель, представлении и контроллер) хранит в себе информацию
  // о модели, представлении или контроллере дочерних элементов.
  // После того, как задачу перетащили в другую колонку, эту информацию нужно обновить.
  updateInstanceChildList(task, index, oldColumn, newList) {
    // контроллер текущей задачи
    const taskController = this.getController(task);
    // контроллер старой колонки
    const oldColumnController = this.getController(oldColumn);
    // находим в ссылках старой колонки контроллер ее списка задач
    const oldListController = oldColumnController.savedLinks.find(link => link instanceof TaskListController);
    // находим контроллер нового списка задач
    const newListController = this.getController(newList);
    // Удаляем ссылки на задачу из старого списка задач
    oldListController.removeLinks(taskController);
    // Добавляем задачу в новый список
    newListController.placeLinks(taskController, index);
    // Обновляем информацию о колонке в модели задачи
    taskController.model.columnIndex = newListController.model.index;
  }

  removeElement(controller) {
    appState.instanceMap.delete(controller);
  }
}