import "./styles/main.scss"
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateTestUser } from "./utils/utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import {addDragAndDrop} from "./utils/dragndrop";

export const appState = new State();

const loginForm = document.querySelector("#login-form");

generateTestUser(User);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  const content = document.querySelector("#content");
  if (authUser(login, password)) {
      content.innerHTML = taskFieldTemplate;
      addDragAndDrop();
  } else {
    content.innerHTML = noAccessTemplate;
  }
});

addDragAndDrop();
