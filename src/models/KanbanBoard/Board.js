import {debounce} from "../../utils/utils";
import {appState} from "../../app";
import DOMObject from "./DOMObject";
import Column from "./Column";
import Header from "./Header";
import TaskList from "./TaskList";
import Task from "./Task";
import Button from "./Button";
import TaskCounter from "./TaskCounter";
import ButtonWrapper from "./ButtonWrapper";

export default class Board extends DOMObject {
  constructor() {
    super('div', 'kanban-board');

    // Для отслеживания изменений и запуска сохранения
    // в localStorage добавляем MutationObserver с задержкой
    // в 500 мс. (чтобы не срабатывал во время ввода текста в задачу)
    this._observer = new MutationObserver(() => {
      this._onMutation();
    })

    this._observer.observe(this.element, {
      childList: true,
      subtree: true,
      characterData: true
    })

    this._debouncedSave = debounce(() => {
      appState.data.save();
    }, 500);
  }

  _onMutation() {
    TaskCounter.count();
    this._debouncedSave();
  }

  findChildColumns() {
    return Array.from(this.children).filter(child => child instanceof Column);
  }

  static assemble(user, data) {
    const board = new Board();

    data.stored.content.forEach(data => {

      const column = new Column();
      column.appendTo(board);

      const header = new Header(data.columnName);
      header.appendTo(column);

      const taskList = new TaskList();
      taskList.appendTo(column);

      if (data.tasks.length > 0) {
        data.tasks.forEach(taskText => {
          const task = new Task(taskText)
          task.appendTo(taskList);
        })
      }

      const buttonWrapper = new ButtonWrapper();
      buttonWrapper.appendTo(column)

      const button = new Button();
      button.appendTo(buttonWrapper);
      // инициализация кнопок должна выполнятся только после сборки всего интерфейса,
      // иначе прокси не сработает
      button.init();

    })


    const content = document.querySelector('#content');
    content.innerHTML = '';
    content.appendChild(board.element);
  }
}