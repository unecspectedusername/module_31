import {UserMenuModel} from "@components/Header/UserMenu/model";
import {UserMenuView} from "@components/Header/UserMenu/view";
import {UserMenuController} from "@components/Header/UserMenu/controller";
import {LoginFormModel} from "@components/Header/LoginForm/model";
import {LoginFormView} from "@components/Header/LoginForm/view";
import {LoginFormController} from "@components/Header/LoginForm/controller";

export function initLoginForm() {
  const model = new LoginFormModel();
  const view = new LoginFormView();
  const controller = new LoginFormController(view, model);
  controller.init();
  return controller;
}