import "./styles/main.scss"
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import defaultTemplate from "./templates/defaultPage.html";
import { User } from "./models/User";
import {changeContent, generateTestUser} from "./utils/utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import Board from "./models/KanbanBoard/Board";

export const appState = new State();

const loginForm = document.querySelector("#login-form");

generateTestUser(User);
changeContent(defaultTemplate);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  if (authUser(login, password)) {
    const user = appState.currentUser;
    const data = appState.data;
    Board.assemble(user, data);
  } else {
    changeContent(noAccessTemplate)
  }
});

function instantLogin() {
  const loginForm = document.querySelector('#login-form > input[type=text]:nth-child(1)');
  const passwordForm = document.querySelector('#login-form > input[type=password]:nth-child(2)');
  const button = document.querySelector('#login-form > button');
  loginForm.value = 'test';
  passwordForm.value = 'qwerty123';
  button.click();
}
instantLogin();