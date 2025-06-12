import plusIcon from "../../templates/icons/plus.html";
import DOMObject from "./DOMObject";
import Task from "./Task";
import TaskList from "./TaskList";
import Board from "./Board";
import Column from "./Column";
import {appState} from "../../app";

export default class Button extends DOMObject {
  constructor() {
    super('button');
    this.element.type = 'button';

    // На этом моменте пришлось подумать.
    // По заданию, если создали новую задачу в списке и написали там текст,
    // а потом увели фокус, задача должна сохраниться.
    // При этом кнопка 'Add card' должа превращаться в 'Submit',
    // и при нажатии на нее задача тоже дожна сохраняться
    // Получилась ситуация, что если ввести текст в задачу и нажать submit,
    // задача сохранялась и сразу создавалась новая пустая задача т.к. на элементе списка
    // и кнопке висели два обработчика (один на 'blur', другой на 'click').
    // Сначала срабатывал blur и запускал setDefaultState(), а затем сразу 'click',
    // который добавлял новую задачу т.к. кнопка к этому моменту уже в дефолтном состоянии.
    // Чтобы этого избежать, пришлось создать прокси свойство и менять состояние кнопки после его изменения

    const stateTarget = {value: null};

    const self = this;

    this.state = new Proxy(stateTarget, {
      set: (obj, prop, newVal) => {
        if (prop === 'value') {
          if (newVal === 'default') {
            self.setDefaultState();
          } else if (newVal === 'submit') {
            self.setSubmitState();
          } else if (newVal === 'Dropdown') {
            self.setDropdownState();
          }
          obj[prop] = newVal;
          return true;
        }
        return false;
      }
    });
  }


  clear() {
    this.removeAllListeners();
    this.element.removeAttribute('aria-label');
    this.element.className = '';
    this.element.innerHTML = '';
  }

  init() {
    const parentColumn = this.findRelative(Column);
    if (parentColumn.index === 0) {
      this.setDefaultState();
    } else {
      this.setDisabledState()
    }
  }

  setTemplate({
                ariaLabel = 'Add card',
                className = 'kanban-board__button',
                icon = true,
                textContent = 'Add card'
              } = {}) {
    this.clear();
    this.element.setAttribute('aria-label', ariaLabel);
    this.element.className = className;
    if (icon) {
      const icon = document.createElement('i');
      icon.innerHTML = plusIcon;
      this.element.appendChild(icon);
    }
    const text = document.createTextNode(textContent)
    this.element.appendChild(text);
  }

  setDefaultState() {
    this.setTemplate();
    this.element.addEventListener('click', () => {
      this.addTask();
    })
  }

  setDisabledState() {
    this.setDefaultState();
    this.element.disabled = true;
  }

  setDropdownState() {
    // removeme
    console.log('Dropdown worked')
  }

  addTask() {
    const taskList = this.findRelative(TaskList);
    const task = new Task();
    task.appendTo(taskList);
    task.focus();
    task.textField.addEventListener('blur', () => {
      // removeme здесь должна быть логика, которая срабатывает при уводе фокуса из задачи
    }, {once: true});
  }

  // setDefaultState() {
  //     this.clear();
  //     this.element.setAttribute("aria-label", "Add card");
  //     this.element.className = 'kanban-board__button';
  //     const icon = new DOMObject('i');
  //     icon.element.innerHTML = plusIcon;
  //     icon.appendTo(this);
  //     const text = document.createTextNode('Add card');
  //     this.element.appendChild(text);
  //
  //     this.addEventListener('click', () => {
  //         const taskList = this.findRelative(TaskList);
  //         const task = new Task();
  //         task.appendTo(taskList);
  //         task.focus();
  //         this.state.value = 'submit';
  //         task.textField.addEventListener('blur', () => {
  //             task.submit();
  //             this.state.value = 'default';
  //         }, {once: true});
  //     })
  // }
  //
  // setSubmitState() {
  //     this.clear();
  //     this.element.setAttribute('aria-label', 'Submit');
  //     this.element.className = 'kanban-board__button--submit';
  //     this.element.innerHTML = 'Submit';
  //     this.addEventListener('click', () => {
  //         this.state.value = 'default';
  //     })
  // }
}