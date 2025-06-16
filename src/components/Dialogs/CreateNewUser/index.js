import {CreateNewUserModel} from "@components/Dialogs/CreateNewUser/model";
import {CreateNewUserView} from "@components/Dialogs/CreateNewUser/view";
import {CreateNewUserController} from "@components/Dialogs/CreateNewUser/controller";

export function initCreateNewUser(initiatorController) {
  const model = new CreateNewUserModel(initiatorController);
  const view = new CreateNewUserView();
  const controller = new CreateNewUserController(view, model);
  return controller;
}