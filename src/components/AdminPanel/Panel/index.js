import {AdminPanelModel} from "@components/AdminPanel/Panel/model";
import {AdminPanelView} from "@components/AdminPanel/Panel/view";
import {AdminPanelController} from "@components/AdminPanel/Panel/controller";

export function initAdminPanel() {
  const model = new AdminPanelModel();
  const view = new AdminPanelView();
  const controller = new AdminPanelController(view, model);
  return controller;
}