import {UserMenuModel} from "./model";
import {UserMenuView} from "./view";
import {UserMenuController} from "./controller";
import {appState} from "@src/app";

export function initUserMenu() {
  const model = new UserMenuModel();
  const userName = appState.currentUser.login;
  const view = new UserMenuView(userName);
  const controller = new UserMenuController(view, model);
  controller.init();
  return controller;
}