import {UserCardModel} from "@components/AdminPanel/UserCard/model";
import {UserCardView} from "@components/AdminPanel/UserCard/view";
import {UserCardController} from "@components/AdminPanel/UserCard/controller";

export function initUserCard(user) {
  const {login, role, id} = user;
  const model = new UserCardModel(id);
  const view = new UserCardView(login, role);
  const controller = new UserCardController(view, model);
  return controller;
}