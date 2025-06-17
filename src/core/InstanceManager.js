import {appState} from "../app";
import {TaskListController} from "../components/Kanban/TaskList/controller";
import {EVENTS} from "@core/events";

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

  findInstanceByIndex(controllerClass, index) {
    const controllers = this.findInstances(controllerClass);
    return controllers.find(controller => controller.model.index === index);
  }

  // Перемещаем задачу из одного списка в другой
  moveTask(taskController, newListController, index = null) {
    // Находим контроллер списка задач, в котором задача лежит изначально
    const oldListController = this.findInstanceByIndex(TaskListController, taskController.model.columnIndex)
    // Удаляем ссылки на задачу в старом контроллере списка
    oldListController.removeLinks(taskController);
    // Если передали индекс, будем размещать задачу в нужно месте
    // Если нет, поместим в конец
    const newIndex = index ? index : newListController._savedLinks.length;
    // Помещаем ссылку на задачу в контроллере нового списка задач
    newListController.placeLinks(taskController, newIndex);
    // Обновляем номер колонки в модели задачи
    taskController.model.columnIndex = newListController.model.index;
    appState.eventBus.emit(EVENTS.TASK_UPDATED, {
      columnIndex: newListController.model.index
    })
  }

  // Анимированное перемещение задачи в DOM.
  moveTaskInDOM(taskController, newListController) {
    const element = taskController.view.element;
    const rect = element.getBoundingClientRect();
    const clone = element.cloneNode(true);

    // 1. Добавляем клон
    document.body.appendChild(clone);
    clone.style.position = 'absolute';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.transition = 'all 0.5s ease';
    clone.style.listStyle = 'none';
    clone.style.display = 'block';
    clone.style.zIndex = '1000';

    // 2. Удаляем из текущего списка
    element.remove();

    // 3. Добавляем в новый список, но временно скрываем
    element.style.visibility = 'hidden';
    newListController.view.appendTask(element);

    // 4. Получаем координаты новой позиции
    const targetRect = element.getBoundingClientRect();

    // 5. Анимируем клон к новой позиции
    requestAnimationFrame(() => {
      clone.style.top = `${targetRect.top}px`;
      clone.style.left = `${targetRect.left}px`;

      // 6. После окончания анимации — удаляем клон, делаем элемент видимым
      clone.addEventListener('transitionend', () => {
        clone.remove();
        element.style.visibility = 'visible';
      }, {once: true});
    });
  }

  // Этот метод для перемещения задачи после drag n drop
  moveAfterDND(task, newList, index) {
    // Находим контроллер текущей задачи по ее DOM представлению
    const taskController = this.getController(task);
    // находим контроллер нового списка задач
    const newListController = this.getController(newList);
    // Перемещаем задачу
    this.moveTask(taskController, newListController, index);
  }
}