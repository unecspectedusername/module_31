import {User} from "@core/User";
import {appState, storageManager} from "@src/app";
import Data from "@core/Data";
import {changeContent} from "@src/utils/utils";
import {initBoard} from "@components/Kanban/Board";
import {initColumn} from "@components/Kanban/Column";
import {initTaskList} from "@components/Kanban/TaskList";
import {initButton} from "@components/Kanban/Button";
import {initTask} from "@components/Kanban/Task";
import {EVENTS} from "@core/events";
import {initLoginForm} from "@components/Header/LoginForm";
import noAccessTemplate from "@templates/noAccess.html";
import {initUserMenu} from "@components/Header/UserMenu";
import {initAdminPanel} from "@components/AdminPanel/Panel";
import {initTaskCounter} from "@components/Footer/TaskCounter";
import {initUserCard} from "@components/AdminPanel/UserCard";

export class AppController {
  constructor() {
    this.loginForm = null;
    this.userMenu = null;
    this.board = null;
    this.adminPanel = null;
    this.taskCounter = null;

    this.header = document.querySelector('header');
    this.mainContent = document.querySelector('#content');
    this.footer = document.querySelector('footer');
  }

  checkUserCredentials(login, password) {
    const user = new User(login, password);
    if (!user.hasAccess) return false;
    appState.currentUser = user;
    appState.data = new Data(user.id);
    appState.instanceMap.clear();
    return true;
  };

  //removeme метод для мгновенного логина для теста
  instantLogin() {
    this.signIn('test3', '123');
  }

  signIn(user, password) {
    if (this.checkUserCredentials(user, password)) {
      this.renderUserMenu();
      this.renderBoard(appState.data);
    } else {
      changeContent(noAccessTemplate)
    }
  }

  signOut() {
    appState.clear();
    this.removeBoard();
    this.adminPanel?.remove();
    this.userMenu.remove();
    this.renderLoginForm();
  }

  removeBoard() {
    this.board?.remove();
    this.taskCounter.remove();
  }

  renderLoginForm() {
    const loginForm = initLoginForm();
    this.loginForm = loginForm;
    const header = document.querySelector('header');
    header.appendChild(loginForm.view.element);
  }

  renderUserMenu() {
    this.loginForm.remove();
    const userMenu = initUserMenu()
    this.userMenu = userMenu;
    const header = document.querySelector('header');
    header.appendChild(userMenu.view.element);
  }

  render(component) {
    const container = document.querySelector('#content');
    container.innerHTML = '';
    container.appendChild(component.view.element);
  }

  renderBoard(data) {

    if (this.board) this.board.remove();

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
        const newTask = initTask(task.header, task.body, index);
        taskLists[index].addChild(newTask);
      })
    })

    appState.data.update();

    this.renderTaskCounter();

    appState.eventBus.emit(EVENTS.BOARD_RENDERED);

    this.board = board;
    this.render(board);
  }

  renderAdminPanel() {
    this.removeBoard();
    this.adminPanel = initAdminPanel();
    let users = storageManager.getFromStorage(appState.currentUser.storageKey);
    users = users.filter(user => user.id !== appState.currentUser.id);
    users.forEach(user => {
      const userCard = initUserCard(user);
      this.adminPanel.addChild(userCard);
    })
    this.render(this.adminPanel);
  }

  renderAdminPanelBoard(userId) {
    appState.data.unsubscribe();
    appState.data = new Data(userId);
    this.renderBoard(appState.data);
  }

  renderTaskCounter() {
    if (this.taskCounter) this.taskCounter.remove();
    this.taskCounter = initTaskCounter();
    this.footer.prepend(this.taskCounter.view.element);
  }
}