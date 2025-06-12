import "./styles/main.scss"
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import defaultTemplate from "./templates/defaultPage.html";
import {User} from "./models/User";
import {changeContent, generateTestUser} from "./utils/utils";
import {State} from "./state";
import {authUser} from "./services/auth";
import Board from "./models/KanbanBoard/Board";
import {initBoard} from "./components/Kanban/Board";
import {initColumn} from "./components/Kanban/Column";
import {initTaskList} from "./components/Kanban/TaskList";
import {initTask} from "./components/Kanban/Task";
import {initButton} from "./components/Kanban/Button";
import {EVENTS} from "./core/events";

export const appState = new State();

const loginForm = document.querySelector("#login-form");

// generateTestUser(User);
changeContent(defaultTemplate);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  if (authUser(login, password)) {
    // очень важно соблюдать очередность рендеринга
    const user = appState.currentUser;
    const data = appState.data;
    const board = initBoard();

    const columns = data.stored.content;

    // создаем и рендерим колонки
    const columnComponents = columns.map((column, index) => {
      const newColumn = initColumn(column.name, index);
      board.addChild(newColumn);
      return newColumn;
    })

    // создаем колонки
    const taskLists = [];
    for (const index of columns.keys()) {
      const taskList = initTaskList(index);
      columnComponents[index].addChild(taskList, index);
      taskLists.push(taskList);
    }

    // Создаем кнопки
    columnComponents.forEach((column, index) => {
      const button = initButton(index);
      column.addChild(button);
    })

    // Создаем задачи
    data.stored.content.forEach((column, index) => {
      column.tasks.forEach(task => {
        const newTask = initTask(task, index);
        taskLists[index].addChild(newTask);
      })
    })

    appState.storageManager.collectData();

    appState.eventBus.emit(EVENTS.BOARD_RENDERED);
    const container = document.querySelector('#content');
    container.innerHTML = '';
    container.appendChild(board.view.element);
  } else {
    changeContent(noAccessTemplate)
  }
});



// loginForm.addEventListener("submit", function (e) {
//   e.preventDefault();
//   const formData = new FormData(loginForm);
//   const login = formData.get("login");
//   const password = formData.get("password");
//
//   if (authUser(login, password)) {
//     const user = appState.currentUser;
//     const data = appState.data;
//     Board.assemble(user, data);
//   } else {
//     changeContent(noAccessTemplate)
//   }
// });

function instantLogin() {
  const loginForm = document.querySelector('#login-form > input[type=text]:nth-child(1)');
  const passwordForm = document.querySelector('#login-form > input[type=password]:nth-child(2)');
  const button = document.querySelector('#login-form > button');
  loginForm.value = 'test';
  passwordForm.value = '123';
  button.click();
}

instantLogin();